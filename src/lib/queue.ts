import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";

// Redis connection - use environment variable or default to localhost
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Create Redis connection
let connection: IORedis | null = null;

export function getRedisConnection(): IORedis {
  if (!connection) {
    connection = new IORedis(REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
  return connection;
}

// Queue names
export const QUEUE_NAMES = {
  STATUS_CHECK: "status-check",
  EMAIL_NOTIFICATION: "email-notification",
  INCIDENT_ALERT: "incident-alert",
  METRICS_AGGREGATION: "metrics-aggregation",
  CLEANUP: "cleanup",
} as const;

// Create queues
export function createQueue(name: string): Queue {
  return new Queue(name, {
    connection: getRedisConnection(),
    defaultJobOptions: {
      removeOnComplete: 100,
      removeOnFail: 500,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    },
  });
}

// Queue instances (lazy initialization)
let statusCheckQueue: Queue | null = null;
let emailQueue: Queue | null = null;
let incidentQueue: Queue | null = null;
let metricsQueue: Queue | null = null;
let cleanupQueue: Queue | null = null;

export function getStatusCheckQueue(): Queue {
  if (!statusCheckQueue) {
    statusCheckQueue = createQueue(QUEUE_NAMES.STATUS_CHECK);
  }
  return statusCheckQueue;
}

export function getEmailQueue(): Queue {
  if (!emailQueue) {
    emailQueue = createQueue(QUEUE_NAMES.EMAIL_NOTIFICATION);
  }
  return emailQueue;
}

export function getIncidentQueue(): Queue {
  if (!incidentQueue) {
    incidentQueue = createQueue(QUEUE_NAMES.INCIDENT_ALERT);
  }
  return incidentQueue;
}

export function getMetricsQueue(): Queue {
  if (!metricsQueue) {
    metricsQueue = createQueue(QUEUE_NAMES.METRICS_AGGREGATION);
  }
  return metricsQueue;
}

export function getCleanupQueue(): Queue {
  if (!cleanupQueue) {
    cleanupQueue = createQueue(QUEUE_NAMES.CLEANUP);
  }
  return cleanupQueue;
}

// Job types
export interface StatusCheckJob {
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  url: string | null;
  timeout: number;
}

export interface EmailNotificationJob {
  to: string;
  subject: string;
  template: "incident_created" | "incident_updated" | "incident_resolved" | "subscription_verify" | "subscription_welcome";
  data: Record<string, unknown>;
}

export interface IncidentAlertJob {
  incidentId: string;
  type: "created" | "updated" | "resolved";
  severity: string;
  serviceName: string;
  title: string;
  message: string;
}

export interface MetricsAggregationJob {
  serviceId: string;
  period: "hourly" | "daily" | "weekly" | "monthly";
}

export interface CleanupJob {
  type: "old_checks" | "old_metrics" | "expired_tokens";
  olderThan: number; // Days
}

// Helper to add jobs
export async function addStatusCheckJob(data: StatusCheckJob): Promise<Job> {
  const queue = getStatusCheckQueue();
  return queue.add("check", data, {
    jobId: `status-${data.serviceSlug}-${Date.now()}`,
  });
}

export async function addEmailJob(data: EmailNotificationJob): Promise<Job> {
  const queue = getEmailQueue();
  return queue.add("send", data, {
    priority: data.template.includes("incident") ? 1 : 5,
  });
}

export async function addIncidentAlertJob(data: IncidentAlertJob): Promise<Job> {
  const queue = getIncidentQueue();
  return queue.add("alert", data, {
    priority: data.severity === "CRITICAL" ? 1 : data.severity === "MAJOR" ? 2 : 3,
  });
}

export async function addMetricsJob(data: MetricsAggregationJob): Promise<Job> {
  const queue = getMetricsQueue();
  return queue.add("aggregate", data);
}

export async function addCleanupJob(data: CleanupJob): Promise<Job> {
  const queue = getCleanupQueue();
  return queue.add("cleanup", data);
}

// Schedule recurring jobs
export async function scheduleRecurringJobs(): Promise<void> {
  const statusQueue = getStatusCheckQueue();
  const metricsQueue = getMetricsQueue();
  const cleanupQueue = getCleanupQueue();

  // Status checks every minute
  await statusQueue.add(
    "scheduled-check",
    { trigger: "cron" },
    {
      repeat: { pattern: "* * * * *" }, // Every minute
      jobId: "scheduled-status-check",
    }
  );

  // Hourly metrics aggregation
  await metricsQueue.add(
    "hourly-aggregation",
    { period: "hourly" },
    {
      repeat: { pattern: "0 * * * *" }, // Every hour
      jobId: "hourly-metrics",
    }
  );

  // Daily metrics aggregation
  await metricsQueue.add(
    "daily-aggregation",
    { period: "daily" },
    {
      repeat: { pattern: "0 0 * * *" }, // Midnight
      jobId: "daily-metrics",
    }
  );

  // Daily cleanup
  await cleanupQueue.add(
    "daily-cleanup",
    { type: "old_checks", olderThan: 90 },
    {
      repeat: { pattern: "0 2 * * *" }, // 2 AM
      jobId: "daily-cleanup",
    }
  );

  console.log("[QUEUE] Recurring jobs scheduled");
}

// Graceful shutdown
export async function closeQueues(): Promise<void> {
  const queues = [statusCheckQueue, emailQueue, incidentQueue, metricsQueue, cleanupQueue];
  await Promise.all(queues.filter(Boolean).map((q) => q?.close()));
  if (connection) {
    await connection.quit();
    connection = null;
  }
}
