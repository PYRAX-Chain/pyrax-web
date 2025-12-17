import { NextRequest, NextResponse } from "next/server";
import { getPyraxClient } from "@/lib/pyrax-client";

// GET /api/v1/factory/stats
// Returns real-time network statistics for The Factory dashboard
export async function GET(request: NextRequest) {
  try {
    const client = getPyraxClient("testnet");
    const stats = await client.getNetworkStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch network stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch network statistics" },
      { status: 500 }
    );
  }
}
