// Worker Registration & Management API
// Allows desktop app to register GPUs for Crucible and Foundry

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface WorkerRegistration {
  walletAddress: string;
  hostname: string;
  
  // Hardware specs
  gpuCount: number;
  gpuModels: string[];
  totalVram: number;
  cpuModel: string;
  cpuCores: number;
  ramGb: number;
  
  // Capabilities
  capabilities: {
    crucible: boolean;
    foundry: boolean;
    streamA: boolean;
    streamB: boolean;
    streamC: boolean;
  };
  
  // Network info
  publicIp?: string;
  p2pPort: number;
  region?: string;
}

// GET /api/v1/workers - List all workers or filter by wallet
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    const status = searchParams.get("status");

    const where: any = {};
    if (wallet) where.walletAddress = wallet;
    if (status) where.status = status.toUpperCase();

    const workers = await prisma.worker.findMany({
      where,
      orderBy: { lastSeen: "desc" },
      take: 100,
    });

    // Calculate summary stats
    const summary = {
      total: workers.length,
      online: workers.filter(w => w.status === "ONLINE").length,
      offline: workers.filter(w => w.status === "OFFLINE").length,
      totalGpus: workers.reduce((acc, w) => acc + (w.gpuCount || 0), 0),
      totalVram: workers.reduce((acc, w) => acc + (w.totalVram || 0), 0),
    };

    return NextResponse.json({
      success: true,
      data: {
        workers: workers.map(w => ({
          id: w.id,
          walletAddress: w.walletAddress,
          hostname: w.hostname,
          status: w.status.toLowerCase(),
          gpuCount: w.gpuCount,
          gpuModels: w.gpuModels,
          totalVram: w.totalVram,
          capabilities: w.capabilities,
          region: w.region,
          lastSeen: w.lastSeen?.toISOString(),
          createdAt: w.createdAt.toISOString(),
        })),
        summary,
      },
    });
  } catch (error) {
    console.error("Workers fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch workers" },
      { status: 500 }
    );
  }
}

// POST /api/v1/workers - Register a new worker
export async function POST(request: NextRequest) {
  try {
    const body: WorkerRegistration = await request.json();
    
    if (!body.walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 400 }
      );
    }

    // Check if worker already exists
    const existingWorker = await prisma.worker.findFirst({
      where: {
        walletAddress: body.walletAddress,
        hostname: body.hostname,
      },
    });

    let worker;
    if (existingWorker) {
      // Update existing worker
      worker = await prisma.worker.update({
        where: { id: existingWorker.id },
        data: {
          status: "ONLINE",
          gpuCount: body.gpuCount,
          gpuModels: body.gpuModels,
          totalVram: body.totalVram,
          cpuModel: body.cpuModel,
          cpuCores: body.cpuCores,
          ramGb: body.ramGb,
          capabilities: body.capabilities,
          publicIp: body.publicIp,
          p2pPort: body.p2pPort,
          region: body.region,
          lastSeen: new Date(),
        },
      });
    } else {
      // Create new worker
      worker = await prisma.worker.create({
        data: {
          walletAddress: body.walletAddress,
          hostname: body.hostname,
          status: "ONLINE",
          gpuCount: body.gpuCount,
          gpuModels: body.gpuModels,
          totalVram: body.totalVram,
          cpuModel: body.cpuModel,
          cpuCores: body.cpuCores,
          ramGb: body.ramGb,
          capabilities: body.capabilities,
          publicIp: body.publicIp,
          p2pPort: body.p2pPort,
          region: body.region,
          lastSeen: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        workerId: worker.id,
        status: worker.status.toLowerCase(),
        message: existingWorker ? "Worker updated" : "Worker registered",
      },
    });
  } catch (error) {
    console.error("Worker registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register worker" },
      { status: 500 }
    );
  }
}

// PATCH /api/v1/workers - Update worker status (heartbeat)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { workerId, status, metrics } = body;

    if (!workerId) {
      return NextResponse.json(
        { success: false, error: "Worker ID required" },
        { status: 400 }
      );
    }

    const worker = await prisma.worker.update({
      where: { id: workerId },
      data: {
        status: status?.toUpperCase() || "ONLINE",
        lastSeen: new Date(),
        // Could store metrics in a separate table
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        workerId: worker.id,
        status: worker.status.toLowerCase(),
      },
    });
  } catch (error) {
    console.error("Worker heartbeat error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update worker" },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/workers - Deregister a worker
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get("id");
    const wallet = request.headers.get("x-wallet-address");

    if (!workerId || !wallet) {
      return NextResponse.json(
        { success: false, error: "Worker ID and wallet required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const worker = await prisma.worker.findUnique({
      where: { id: workerId },
    });

    if (!worker || worker.walletAddress !== wallet) {
      return NextResponse.json(
        { success: false, error: "Worker not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.worker.update({
      where: { id: workerId },
      data: { status: "OFFLINE" },
    });

    return NextResponse.json({
      success: true,
      message: "Worker deregistered",
    });
  } catch (error) {
    console.error("Worker deregistration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to deregister worker" },
      { status: 500 }
    );
  }
}
