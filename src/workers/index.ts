/**
 * PYRAX Workers Entry Point
 * Starts all background workers for status monitoring, notifications, etc.
 */

import { createStatusWorker } from "./status-worker";
import { createEmailWorker } from "./email-worker";
import { createIncidentWorker } from "./incident-worker";
import { scheduleRecurringJobs, closeQueues } from "../lib/queue";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=".repeat(50));
  console.log("PYRAX Background Workers Starting...");
  console.log("=".repeat(50));

  // Start all workers
  const statusWorker = createStatusWorker();
  console.log("✓ Status monitoring worker started");

  const emailWorker = createEmailWorker();
  console.log("✓ Email notification worker started");

  const incidentWorker = createIncidentWorker();
  console.log("✓ Incident alert worker started");

  // Schedule recurring jobs
  await scheduleRecurringJobs();
  console.log("✓ Recurring jobs scheduled");

  console.log("=".repeat(50));
  console.log("All workers running. Press Ctrl+C to stop.");
  console.log("=".repeat(50));

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    await Promise.all([
      statusWorker.close(),
      emailWorker.close(),
      incidentWorker.close(),
    ]);

    await closeQueues();
    await prisma.$disconnect();

    console.log("Workers stopped. Goodbye!");
    process.exit(0);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((err) => {
  console.error("Failed to start workers:", err);
  process.exit(1);
});
