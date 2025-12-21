import { Worker, Job } from "bullmq";
import { getRedisConnection, QUEUE_NAMES, IncidentAlertJob, addEmailJob } from "../lib/queue";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function processIncidentAlert(job: Job<IncidentAlertJob>): Promise<void> {
  const { incidentId, type, severity, serviceName, title, message } = job.data;

  console.log(`[INCIDENT-WORKER] Processing ${type} alert for incident ${incidentId}`);

  // Get all verified subscribers
  const subscribers = await prisma.statusSubscriber.findMany({
    where: {
      verified: true,
      unsubscribedAt: null,
      OR: [
        { notifyAll: true },
        { notifyMajor: severity !== "MINOR" },
      ],
    },
  });

  if (subscribers.length === 0) {
    console.log("[INCIDENT-WORKER] No subscribers to notify");
    return;
  }

  // Get incident details
  const incident = await prisma.statusIncident.findUnique({
    where: { id: incidentId },
    include: {
      service: true,
      updates: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!incident) {
    console.log(`[INCIDENT-WORKER] Incident ${incidentId} not found`);
    return;
  }

  // Calculate duration if resolved
  let duration = "";
  if (incident.resolvedAt && incident.impactStart) {
    const durationMs = incident.resolvedAt.getTime() - incident.impactStart.getTime();
    const minutes = Math.floor(durationMs / 60000);
    if (minutes < 60) {
      duration = `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      duration = `${hours}h ${mins}m`;
    }
  }

  // Queue email for each subscriber
  const template = type === "created" ? "incident_created" :
                   type === "resolved" ? "incident_resolved" : "incident_updated";

  const latestUpdate = incident.updates[0];

  for (const subscriber of subscribers) {
    const unsubscribeUrl = `https://status.pyrax.org/api/status/subscribe?action=unsubscribe&token=${subscriber.unsubscribeToken}`;

    await addEmailJob({
      to: subscriber.email,
      subject: "", // Will use template default
      template,
      data: {
        serviceName: incident.service?.name || serviceName || "System",
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        impactStart: incident.impactStart.toISOString(),
        resolvedAt: incident.resolvedAt?.toISOString() || "",
        duration,
        updateStatus: latestUpdate?.status || "",
        updateMessage: latestUpdate?.message || "",
        updateTime: latestUpdate?.createdAt.toISOString() || "",
        unsubscribeUrl,
      },
    });
  }

  console.log(`[INCIDENT-WORKER] Queued ${subscribers.length} notification emails for ${type} alert`);

  // Send Discord webhook if configured
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    try {
      const color = type === "resolved" ? 0x22c55e :
                    severity === "CRITICAL" ? 0xdc2626 :
                    severity === "MAJOR" ? 0xf97316 : 0xeab308;

      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `${type === "resolved" ? "✅" : "🚨"} ${title}`,
            description: message,
            color,
            fields: [
              { name: "Service", value: serviceName || "System", inline: true },
              { name: "Severity", value: severity, inline: true },
              { name: "Status", value: type.charAt(0).toUpperCase() + type.slice(1), inline: true },
            ],
            footer: { text: "PYRAX Status Monitor" },
            timestamp: new Date().toISOString(),
          }],
        }),
      });
      console.log("[INCIDENT-WORKER] Sent Discord notification");
    } catch (err) {
      console.error("[INCIDENT-WORKER] Failed to send Discord notification:", err);
    }
  }
}

export function createIncidentWorker(): Worker {
  const worker = new Worker(QUEUE_NAMES.INCIDENT_ALERT, processIncidentAlert, {
    connection: getRedisConnection(),
    concurrency: 5,
  });

  worker.on("completed", (job) => {
    console.log(`[INCIDENT-WORKER] Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[INCIDENT-WORKER] Job ${job?.id} failed:`, err.message);
  });

  return worker;
}

if (require.main === module) {
  console.log("[INCIDENT-WORKER] Starting...");
  const worker = createIncidentWorker();

  process.on("SIGTERM", async () => {
    console.log("[INCIDENT-WORKER] Shutting down...");
    await worker.close();
    await prisma.$disconnect();
    process.exit(0);
  });
}
