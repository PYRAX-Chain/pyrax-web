// Crucible Jobs API - Production endpoints for AI inference jobs
// POST: Create new job | GET: List user's jobs

import { NextRequest, NextResponse } from "next/server";
import { createCrucibleJob, getUserJobs, getUserJobStats, getOrCreateUser } from "@/lib/services/job-service";

export async function POST(request: NextRequest) {
  try {
    // Get wallet address from header or body
    const body = await request.json();
    const walletAddress = body.walletAddress || request.headers.get("x-wallet-address");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 401 }
      );
    }

    // Validate required fields
    const { type, model, prompt, ...options } = body;

    if (!type || !model) {
      return NextResponse.json(
        { success: false, error: "type and model are required" },
        { status: 400 }
      );
    }

    // Create the job
    const job = await createCrucibleJob({
      userId: "", // Will be resolved from wallet
      walletAddress,
      type,
      model,
      input: {
        prompt,
        ...options,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        model: job.model,
        estimatedCost: Number(job.estimatedCost),
        createdAt: job.createdAt.toISOString(),
      },
      message: "Job created successfully. Poll /api/v1/crucible/jobs/{jobId} for status.",
    });
  } catch (error) {
    console.error("Crucible job creation error:", error);
    const message = error instanceof Error ? error.message : "Failed to create job";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("wallet") || request.headers.get("x-wallet-address");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 401 }
      );
    }

    // Get or create user
    const user = await getOrCreateUser(walletAddress);

    // Get query parameters
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Filter for Crucible jobs only
    const typeFilter = type ? 
      `CRUCIBLE_${type.toUpperCase()}` as any : 
      undefined;

    // Get jobs
    const { jobs, total } = await getUserJobs(user.id, {
      type: typeFilter,
      status: status?.toUpperCase() as any,
      limit,
      offset,
    });

    // Filter to only Crucible jobs if no specific type
    const crucibleJobs = type ? jobs : jobs.filter((j: { type: string }) => j.type.startsWith("CRUCIBLE_"));

    // Get stats
    const stats = await getUserJobStats(user.id);

    return NextResponse.json({
      success: true,
      data: {
        jobs: crucibleJobs.map((j: any) => ({
          id: j.id,
          type: j.type.replace("CRUCIBLE_", "").toLowerCase(),
          status: j.status.toLowerCase(),
          model: j.model,
          input: j.input,
          output: j.output,
          estimatedCost: Number(j.estimatedCost),
          actualCost: j.actualCost ? Number(j.actualCost) : null,
          createdAt: j.createdAt.toISOString(),
          startedAt: j.startedAt?.toISOString(),
          completedAt: j.completedAt?.toISOString(),
          error: j.error,
        })),
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
        stats: {
          pending: stats.pending,
          processing: stats.processing + stats.queued,
          completed: stats.completed,
          failed: stats.failed,
        },
      },
    });
  } catch (error) {
    console.error("Crucible jobs fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
