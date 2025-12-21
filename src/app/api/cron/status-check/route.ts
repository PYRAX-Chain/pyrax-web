import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This endpoint should be called by a cron job every minute
// In production, use Vercel Cron or an external service like cron-job.org

const CRON_SECRET = process.env.CRON_SECRET || "pyrax-status-cron-secret";

/**
 * GET /api/cron/status-check
 * Automated health check for all services
 * Should be called by cron every minute
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const providedSecret = authHeader?.replace("Bearer ", "") || 
                          request.nextUrl.searchParams.get("secret");
    
    if (providedSecret !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all services that need checking
    const services = await prisma.statusService.findMany({
      where: { url: { not: null } },
    });

    const results: { serviceId: string; name: string; status: string; responseTime: number | null; error: string | null }[] = [];
    const now = new Date();
    const hourBucket = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());

    for (const service of services) {
      if (!service.url) continue;

      let status = "OPERATIONAL";
      let responseTime: number | null = null;
      let statusCode: number | null = null;
      let error: string | null = null;

      try {
        const startTime = Date.now();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), service.timeout * 1000);

        const response = await fetch(service.url, {
          method: "GET",
          signal: controller.signal,
          headers: {
            "User-Agent": "PYRAX-Status-Monitor/1.0",
          },
        });

        clearTimeout(timeout);
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
        if (err.name === "AbortError") {
          status = "MAJOR_OUTAGE";
          error = "Request timeout";
        } else {
          status = "MAJOR_OUTAGE";
          error = err.message || "Connection failed";
        }
      }

      // Record the check
      await prisma.statusCheck.create({
        data: {
          serviceId: service.id,
          status: status as any,
          responseTime,
          statusCode,
          error,
          checkedFrom: "primary",
        },
      });

      // Update service status
      const previousStatus = service.status;
      const statusChanged = previousStatus !== status;

      await prisma.statusService.update({
        where: { id: service.id },
        data: {
          status: status as any,
          lastCheckedAt: now,
          responseTime,
          lastStatusChange: statusChanged ? now : service.lastStatusChange,
        },
      });

      // Update hourly metrics
      await prisma.statusMetric.upsert({
        where: {
          serviceId_hour: {
            serviceId: service.id,
            hour: hourBucket,
          },
        },
        update: {
          checksTotal: { increment: 1 },
          checksSuccess: status === "OPERATIONAL" ? { increment: 1 } : undefined,
          checksFailed: status !== "OPERATIONAL" ? { increment: 1 } : undefined,
        },
        create: {
          serviceId: service.id,
          hour: hourBucket,
          checksTotal: 1,
          checksSuccess: status === "OPERATIONAL" ? 1 : 0,
          checksFailed: status !== "OPERATIONAL" ? 1 : 0,
          avgResponseTime: responseTime,
          minResponseTime: responseTime,
          maxResponseTime: responseTime,
          uptimePercent: status === "OPERATIONAL" ? 100 : 0,
        },
      });

      // Auto-create incident if status changed to outage
      if (statusChanged && (status === "MAJOR_OUTAGE" || status === "PARTIAL_OUTAGE")) {
        // Check if there's already an active incident for this service
        const existingIncident = await prisma.statusIncident.findFirst({
          where: {
            serviceId: service.id,
            status: { not: "RESOLVED" },
          },
        });

        if (!existingIncident) {
          await prisma.statusIncident.create({
            data: {
              serviceId: service.id,
              title: `${service.name} is experiencing issues`,
              description: `Automated detection: ${error || status}`,
              severity: status === "MAJOR_OUTAGE" ? "CRITICAL" : "MAJOR",
              status: "INVESTIGATING",
            },
          });

          // TODO: Send email notifications to subscribers
          await notifySubscribers(service.id, service.name, status, error);
        }
      }

      // Auto-resolve incident if status recovered
      if (statusChanged && status === "OPERATIONAL" && previousStatus !== "OPERATIONAL") {
        const activeIncident = await prisma.statusIncident.findFirst({
          where: {
            serviceId: service.id,
            status: { not: "RESOLVED" },
          },
        });

        if (activeIncident) {
          await prisma.statusIncident.update({
            where: { id: activeIncident.id },
            data: {
              status: "RESOLVED",
              resolvedAt: now,
              impactEnd: now,
            },
          });

          await prisma.incidentUpdate.create({
            data: {
              incidentId: activeIncident.id,
              status: "RESOLVED",
              message: "Service has recovered and is now operational.",
              authorName: "System",
            },
          });

          // TODO: Send recovery notification
          await notifySubscribers(service.id, service.name, "RECOVERED", null);
        }
      }

      results.push({
        serviceId: service.id,
        name: service.name,
        status,
        responseTime,
        error,
      });
    }

    // Calculate and update uptime percentages for all services
    await updateUptimePercentages();

    return NextResponse.json({
      success: true,
      checked: results.length,
      results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Status check cron error:", error);
    return NextResponse.json({ error: "Failed to run status checks" }, { status: 500 });
  }
}

async function notifySubscribers(serviceId: string, serviceName: string, status: string, error: string | null) {
  try {
    // Get verified subscribers
    const subscribers = await prisma.statusSubscriber.findMany({
      where: {
        verified: true,
        unsubscribedAt: null,
        OR: [
          { notifyAll: true },
          { notifyServices: { has: serviceId } },
        ],
      },
    });

    // In production, integrate with email service (SendGrid, SES, etc.)
    console.log(`[STATUS] Notifying ${subscribers.length} subscribers about ${serviceName}: ${status}`);
    
    // TODO: Implement actual email sending
    // for (const subscriber of subscribers) {
    //   await sendEmail(subscriber.email, {
    //     subject: `[PYRAX Status] ${serviceName} - ${status}`,
    //     body: `...`,
    //   });
    // }
  } catch (err) {
    console.error("Failed to notify subscribers:", err);
  }
}

async function updateUptimePercentages() {
  try {
    const services = await prisma.statusService.findMany();
    const now = new Date();

    for (const service of services) {
      // Calculate 24h uptime
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const dayChecks = await prisma.statusCheck.findMany({
        where: { serviceId: service.id, createdAt: { gte: dayAgo } },
      });
      const dayUptime = dayChecks.length > 0
        ? (dayChecks.filter(c => c.status === "OPERATIONAL").length / dayChecks.length) * 100
        : 100;

      // Calculate 7d uptime
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weekChecks = await prisma.statusCheck.findMany({
        where: { serviceId: service.id, createdAt: { gte: weekAgo } },
      });
      const weekUptime = weekChecks.length > 0
        ? (weekChecks.filter(c => c.status === "OPERATIONAL").length / weekChecks.length) * 100
        : 100;

      // Calculate 30d uptime
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const monthChecks = await prisma.statusCheck.findMany({
        where: { serviceId: service.id, createdAt: { gte: monthAgo } },
      });
      const monthUptime = monthChecks.length > 0
        ? (monthChecks.filter(c => c.status === "OPERATIONAL").length / monthChecks.length) * 100
        : 100;

      await prisma.statusService.update({
        where: { id: service.id },
        data: {
          uptimeDay: Math.round(dayUptime * 100) / 100,
          uptimeWeek: Math.round(weekUptime * 100) / 100,
          uptimeMonth: Math.round(monthUptime * 100) / 100,
          uptimePercent: Math.round(monthUptime * 100) / 100,
        },
      });
    }
  } catch (err) {
    console.error("Failed to update uptime percentages:", err);
  }
}
