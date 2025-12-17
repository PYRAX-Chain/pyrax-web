import { NextResponse } from "next/server";
import { defaultTestnetConfig, TestnetConfig, NetworkStatus } from "@/lib/testnet-config";

// In-memory store (in production, use database)
let testnetConfig: TestnetConfig = { ...defaultTestnetConfig };

export async function GET() {
  return NextResponse.json(testnetConfig);
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    
    // Merge updates into config
    testnetConfig = {
      ...testnetConfig,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, config: testnetConfig });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
  }
}

// Update a specific network
export async function PATCH(request: Request) {
  try {
    const { networkId, updates } = await request.json();
    
    const networkIndex = testnetConfig.networks.findIndex((n) => n.id === networkId);
    if (networkIndex === -1) {
      return NextResponse.json({ error: "Network not found" }, { status: 404 });
    }

    testnetConfig.networks[networkIndex] = {
      ...testnetConfig.networks[networkIndex],
      ...updates,
    };
    testnetConfig.lastUpdated = new Date().toISOString();

    return NextResponse.json({ success: true, network: testnetConfig.networks[networkIndex] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update network" }, { status: 500 });
  }
}
