import { NextRequest, NextResponse } from "next/server";
import { getPyraxClient, type Worker } from "@/lib/pyrax-client";

// Simulated worker data from network indexer
// In production, this comes from the WorkerRegistry contract + indexer
const getWorkersFromIndexer = (): Worker[] => {
  return [
    { id: "w-001", address: "0x1234...abcd", name: "GPU-Farm-US-East", gpus: 8, gpuModel: "RTX 4090", vram: 24, region: "US-East", status: "online", activeJobs: 6, totalJobs: 1247, uptime: 99.8, earnings: 1247, lastSeen: new Date() },
    { id: "w-002", address: "0x2345...bcde", name: "Compute-EU-West", gpus: 4, gpuModel: "A100", vram: 80, region: "EU-West", status: "online", activeJobs: 4, totalJobs: 3421, uptime: 99.9, earnings: 3421, lastSeen: new Date() },
    { id: "w-003", address: "0x3456...cdef", name: "ML-Node-Asia", gpus: 16, gpuModel: "RTX 3090", vram: 24, region: "Asia-Pacific", status: "online", activeJobs: 12, totalJobs: 892, uptime: 98.5, earnings: 892, lastSeen: new Date() },
    { id: "w-004", address: "0x4567...def0", name: "Training-Cluster-1", gpus: 32, gpuModel: "H100", vram: 80, region: "US-West", status: "online", activeJobs: 28, totalJobs: 8934, uptime: 99.99, earnings: 8934, lastSeen: new Date() },
    { id: "w-005", address: "0x5678...ef01", name: "Inference-Pool-EU", gpus: 6, gpuModel: "RTX 4080", vram: 16, region: "EU-Central", status: "busy", activeJobs: 6, totalJobs: 567, uptime: 97.2, earnings: 567, lastSeen: new Date() },
    { id: "w-006", address: "0x6789...f012", name: "Community-Node-42", gpus: 2, gpuModel: "RTX 3080", vram: 12, region: "US-Central", status: "online", activeJobs: 1, totalJobs: 234, uptime: 95.4, earnings: 234, lastSeen: new Date() },
    { id: "w-007", address: "0x789a...0123", name: "AI-Labs-Tokyo", gpus: 12, gpuModel: "RTX 4090", vram: 24, region: "Asia-Pacific", status: "online", activeJobs: 9, totalJobs: 2156, uptime: 98.7, earnings: 2156, lastSeen: new Date() },
    { id: "w-008", address: "0x89ab...1234", name: "DeepMind-Frankfurt", gpus: 24, gpuModel: "A100", vram: 80, region: "EU-Central", status: "online", activeJobs: 20, totalJobs: 5678, uptime: 99.5, earnings: 5678, lastSeen: new Date() },
  ];
};

// GET /api/v1/factory/workers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const region = searchParams.get("region");

    let workers = getWorkersFromIndexer();

    // Filter by status
    if (status && status !== "all") {
      workers = workers.filter(w => w.status === status);
    }

    // Filter by region
    if (region && region !== "all") {
      workers = workers.filter(w => w.region === region);
    }

    // Calculate summary stats
    const summary = {
      totalWorkers: workers.length,
      totalGPUs: workers.reduce((acc, w) => acc + w.gpus, 0),
      activeJobs: workers.reduce((acc, w) => acc + w.activeJobs, 0),
      avgUptime: workers.length > 0 
        ? (workers.reduce((acc, w) => acc + w.uptime, 0) / workers.length).toFixed(2)
        : 0,
    };

    return NextResponse.json({
      success: true,
      data: { workers, summary },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch workers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch workers" },
      { status: 500 }
    );
  }
}
