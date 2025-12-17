// Foundry Jobs API - Production endpoints for ML training jobs
// POST: Create new training job | GET: List user's training jobs

import { NextRequest, NextResponse } from "next/server";
import { createFoundryJob, getUserJobs, getUserJobStats, getOrCreateUser } from "@/lib/services/job-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const walletAddress = body.walletAddress || request.headers.get("x-wallet-address");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 401 }
      );
    }

    // Validate required fields
    const { type, baseModel, datasetUrl, datasetId, config = {} } = body;

    if (!type || !baseModel) {
      return NextResponse.json(
        { success: false, error: "type and baseModel are required" },
        { status: 400 }
      );
    }

    if (!datasetUrl && !datasetId) {
      return NextResponse.json(
        { success: false, error: "datasetUrl or datasetId is required" },
        { status: 400 }
      );
    }

    // Create the training job
    const job = await createFoundryJob({
      userId: "",
      walletAddress,
      type,
      baseModel,
      datasetUrl,
      datasetId,
      config: {
        epochs: config.epochs || 3,
        batchSize: config.batchSize || 4,
        learningRate: config.learningRate || "2e-5",
        maxBudget: config.maxBudget || 500,
        outputName: config.outputName || `${baseModel}-finetuned-${Date.now()}`,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        baseModel: job.model,
        estimatedCost: Number(job.estimatedCost),
        config: job.input,
        createdAt: job.createdAt.toISOString(),
      },
      message: "Training job created successfully. Poll /api/v1/foundry/jobs/{jobId} for status.",
    });
  } catch (error) {
    console.error("Foundry job creation error:", error);
    const message = error instanceof Error ? error.message : "Failed to create training job";
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

    const user = await getOrCreateUser(walletAddress);

    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Get all jobs
    const { jobs, total } = await getUserJobs(user.id, {
      status: status?.toUpperCase() as any,
      limit,
      offset,
    });

    // Filter to only Foundry jobs
    const foundryJobs = jobs.filter((j: { type: string }) => j.type.startsWith("FOUNDRY_"));

    // Get stats
    const stats = await getUserJobStats(user.id);

    return NextResponse.json({
      success: true,
      data: {
        jobs: foundryJobs.map((j: any) => ({
          id: j.id,
          type: j.type.replace("FOUNDRY_", "").toLowerCase(),
          status: j.status.toLowerCase(),
          baseModel: j.model,
          config: j.input,
          output: j.output,
          estimatedCost: Number(j.estimatedCost),
          actualCost: j.actualCost ? Number(j.actualCost) : null,
          createdAt: j.createdAt.toISOString(),
          startedAt: j.startedAt?.toISOString(),
          completedAt: j.completedAt?.toISOString(),
          error: j.error,
        })),
        pagination: {
          total: foundryJobs.length,
          limit,
          offset,
        },
        stats: {
          pending: stats.pending,
          training: stats.processing + stats.queued,
          completed: stats.completed,
          failed: stats.failed,
        },
      },
    });
  } catch (error) {
    console.error("Foundry jobs fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch training jobs" },
      { status: 500 }
    );
  }
}
