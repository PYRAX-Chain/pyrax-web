import { NextRequest, NextResponse } from "next/server";
import { type Job, type JobStatus } from "@/lib/pyrax-client";

// In-memory job store (production uses database)
const jobs: Map<string, Job> = new Map();

// GET /api/v1/factory/jobs - List jobs for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status") as JobStatus | null;
    const type = searchParams.get("type");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    let userJobs = Array.from(jobs.values()).filter(j => j.userId === userId);

    if (status) {
      userJobs = userJobs.filter(j => j.status === status);
    }

    if (type) {
      userJobs = userJobs.filter(j => j.type.includes(type));
    }

    // Sort by creation date, newest first
    userJobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Calculate stats
    const stats = {
      total: userJobs.length,
      running: userJobs.filter(j => j.status === "processing").length,
      queued: userJobs.filter(j => j.status === "queued" || j.status === "pending").length,
      completed: userJobs.filter(j => j.status === "completed").length,
      failed: userJobs.filter(j => j.status === "failed").length,
    };

    return NextResponse.json({
      success: true,
      data: { jobs: userJobs, stats },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST /api/v1/factory/jobs - Submit a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, model, input, maxCost } = body;

    if (!userId || !type || !model) {
      return NextResponse.json(
        { success: false, error: "userId, type, and model are required" },
        { status: 400 }
      );
    }

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const job: Job = {
      id: jobId,
      userId,
      type,
      status: "pending",
      model,
      input: input || {},
      cost: 0,
      createdAt: new Date(),
    };

    jobs.set(jobId, job);

    // Simulate job processing (in production, this goes to the job queue)
    setTimeout(() => {
      const j = jobs.get(jobId);
      if (j) {
        j.status = "queued";
        jobs.set(jobId, j);
      }
    }, 500);

    setTimeout(() => {
      const j = jobs.get(jobId);
      if (j) {
        j.status = "processing";
        j.startedAt = new Date();
        jobs.set(jobId, j);
      }
    }, 2000);

    setTimeout(() => {
      const j = jobs.get(jobId);
      if (j) {
        j.status = "completed";
        j.completedAt = new Date();
        j.output = { result: "Job completed successfully" };
        j.cost = Math.random() * 10;
        jobs.set(jobId, j);
      }
    }, 5000 + Math.random() * 5000);

    return NextResponse.json({
      success: true,
      data: { job },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create job" },
      { status: 500 }
    );
  }
}
