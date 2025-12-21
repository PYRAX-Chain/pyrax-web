import { Worker, Job } from "bullmq";
import { getRedisConnection, QUEUE_NAMES, addIncidentAlertJob, addEmailJob } from "../lib/queue";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface StatusCheckJob {
  serviceId?: string;
  serviceSlug?: string;
  serviceName?: string;
  url?: string | null;
  timeout?: number;
  trigger?: string;
}

async function checkService(service: {
  id: string;
  slug: string;
  name: string;
  url: string | null;
  timeout: number;
  status: string;
}): Promise<{
  status: string;
  responseTime: number | null;
  statusCode: number | null;
  error: string | null;
}> {
  if (!service.url) {
    return { status: "OPERATIONAL", responseTime: null, statusCode: null, error: null };
  }

  const startTime = Date.now();
  let status = "OPERATIONAL";
  let responseTime: number | null = null;
  let statusCode: number | null = null;
  let error: string | null = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), service.timeout * 1000);

    const response = await fetch(service.url, {
      method: "GET",
      signal: controller.signal,
      headers: { "User-Agent": "PYRAX-Status-Monitor/1.0" },
    });

    clearTimeout(timeoutId);
    responseTime = Date.now() - startTime;
    statusCode = response.status;

    if (!response.ok) {
      if (response.status >= 500) {
        status = "MAJOR_OUTAGE";
        error = `HTTP ${response.status}`;
      } else if (response.status >= 400) {
        status = "DEGRADED";
        error = `HTTP ${response.status}`;
      }
    } else if (responseTime > 5000) {
      status = "DEGRADED";
      error = "Slow response";
    }
  } catch (err: any) {
    responseTime = Date.now() - startTime;
    if (err.name === "AbortError") {
      status = "MAJOR_OUTAGE";
      error = "Request timeout";
    } else {
      status = "MAJOR_OUTAGE";
      error = err.message || "Connection failed";
    }
  }

  return { status, responseTime, statusCode, error };
}

async function processStatusCheck(job: Job<StatusCheckJob>): Promise<void> {
  const { trigger } = job.data;

  // If this is a scheduled check, check all services
  if (trigger === "cron") {
    const services = await prisma.statusService.findMany({
      where: { isPublic: true },
    });

    console.log(`[STATUS-WORKER] Checking ${services.length} services...`);

    for (const service of services) {
      const result = await checkService(service);
      const now = new Date();
      const hourBucket = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());

      // Record the check
      await prisma.statusCheck.create({
        data: {
          serviceId: service.id,
          status: result.status as any,
          responseTime: result.responseTime,
          statusCode: result.statusCode,
          error: result.error,
          checkedFrom: "worker",
        },
      });

      // Update metrics
      await prisma.statusMetric.upsert({
        where: {
          serviceId_hour: { serviceId: service.id, hour: hourBucket },
        },
        update: {
          checksTotal: { increment: 1 },
          checksSuccess: result.status === "OPERATIONAL" ? { increment: 1 } : undefined,
          checksFailed: result.status !== "OPERATIONAL" ? { increment: 1 } : undefined,
        },
        create: {
          serviceId: service.id,
          hour: hourBucket,
          checksTotal: 1,
          checksSuccess: result.status === "OPERATIONAL" ? 1 : 0,
          checksFailed: result.status !== "OPERATIONAL" ? 1 : 0,
          avgResponseTime: result.responseTime,
          uptimePercent: result.status === "OPERATIONAL" ? 100 : 0,
        },
      });

      // Check for status changes
      const previousStatus = service.status;
      const statusChanged = previousStatus !== result.status;

      if (statusChanged) {
        // Update service status
        await prisma.statusService.update({
          where: { id: service.id },
          data: {
            status: result.status as any,
            lastCheckedAt: now,
            responseTime: result.responseTime,
            lastStatusChange: now,
          },
        });

        // Handle status degradation
        if (result.status !== "OPERATIONAL" && previousStatus === "OPERATIONAL") {
          // Check for existing active incident
          const existingIncident = await prisma.statusIncident.findFirst({
            where: { serviceId: service.id, status: { not: "RESOLVED" } },
          });

          if (!existingIncident) {
            // Create incident
            const severity = result.status === "MAJOR_OUTAGE" ? "CRITICAL" : "MAJOR";
            const incident = await prisma.statusIncident.create({
              data: {
                serviceId: service.id,
                title: `${service.name} is experiencing ${result.status === "MAJOR_OUTAGE" ? "an outage" : "degraded performance"}`,
                description: `Automated detection: ${result.error || result.status}`,
                severity: severity as any,
                status: "INVESTIGATING",
                impactStart: now,
              },
            });

            await prisma.incidentUpdate.create({
              data: {
                incidentId: incident.id,
                status: "INVESTIGATING",
                message: `Automated detection: ${result.error || "Service unavailable"}`,
                authorName: "System Monitor",
              },
            });

            // Queue incident alert
            await addIncidentAlertJob({
              incidentId: incident.id,
              type: "created",
              severity,
              serviceName: service.name,
              title: incident.title,
              message: incident.description,
            });

            console.log(`[STATUS-WORKER] Created incident for ${service.name}: ${result.status}`);
          }
        }

        // Handle recovery
        if (result.status === "OPERATIONAL" && previousStatus !== "OPERATIONAL") {
          const activeIncident = await prisma.statusIncident.findFirst({
            where: { serviceId: service.id, status: { not: "RESOLVED" } },
          });

          if (activeIncident) {
            await prisma.statusIncident.update({
              where: { id: activeIncident.id },
              data: { status: "RESOLVED", resolvedAt: now, impactEnd: now },
            });

            await prisma.incidentUpdate.create({
              data: {
                incidentId: activeIncident.id,
                status: "RESOLVED",
                message: "Service has recovered and is now operational.",
                authorName: "System Monitor",
              },
            });

            await addIncidentAlertJob({
              incidentId: activeIncident.id,
              type: "resolved",
              severity: activeIncident.severity,
              serviceName: service.name,
              title: activeIncident.title,
              message: "Service recovered",
            });

            console.log(`[STATUS-WORKER] Resolved incident for ${service.name}`);
          }
        }
      } else {
        // Just update last checked time
        await prisma.statusService.update({
          where: { id: service.id },
          data: { lastCheckedAt: now, responseTime: result.responseTime },
        });
      }
    }

    // Update uptime percentages
    await updateUptimePercentages();
  }
}

async function updateUptimePercentages(): Promise<void> {
  const services = await prisma.statusService.findMany();
  const now = new Date();

  for (const service of services) {
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [dayChecks, weekChecks, monthChecks] = await Promise.all([
      prisma.statusCheck.findMany({ where: { serviceId: service.id, createdAt: { gte: dayAgo } } }),
      prisma.statusCheck.findMany({ where: { serviceId: service.id, createdAt: { gte: weekAgo } } }),
      prisma.statusCheck.findMany({ where: { serviceId: service.id, createdAt: { gte: monthAgo } } }),
    ]);

    const calcUptime = (checks: any[]) =>
      checks.length > 0 ? (checks.filter((c) => c.status === "OPERATIONAL").length / checks.length) * 100 : 100;

    await prisma.statusService.update({
      where: { id: service.id },
      data: {
        uptimeDay: Math.round(calcUptime(dayChecks) * 100) / 100,
        uptimeWeek: Math.round(calcUptime(weekChecks) * 100) / 100,
        uptimeMonth: Math.round(calcUptime(monthChecks) * 100) / 100,
        uptimePercent: Math.round(calcUptime(monthChecks) * 100) / 100,
      },
    });
  }
}

// Create and start worker
export function createStatusWorker(): Worker {
  const worker = new Worker(QUEUE_NAMES.STATUS_CHECK, processStatusCheck, {
    connection: getRedisConnection(),
    concurrency: 5,
  });

  worker.on("completed", (job) => {
    console.log(`[STATUS-WORKER] Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[STATUS-WORKER] Job ${job?.id} failed:`, err.message);
  });

  return worker;
}

// Run standalone
if (require.main === module) {
  console.log("[STATUS-WORKER] Starting...");
  const worker = createStatusWorker();

  process.on("SIGTERM", async () => {
    console.log("[STATUS-WORKER] Shutting down...");
    await worker.close();
    await prisma.$disconnect();
    process.exit(0);
  });
}
