// API Keys Management Endpoint
// POST: Create new API key | GET: List user's API keys | DELETE: Revoke key

import { NextRequest, NextResponse } from "next/server";
import { createApiKey, getUserApiKeys, deleteApiKey } from "@/lib/services/api-key-service";
import { getOrCreateUser } from "@/lib/services/job-service";

// GET /api/v1/api-keys - List user's API keys
export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.headers.get("x-wallet-address");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 401 }
      );
    }

    const user = await getOrCreateUser(walletAddress);
    const keys = await getUserApiKeys(user.id);

    return NextResponse.json({
      success: true,
      data: {
        keys: keys.map((k: any) => ({
          id: k.id,
          name: k.name,
          prefix: k.keyPrefix,
          permissions: k.permissions,
          rateLimit: k.rateLimit,
          lastUsedAt: k.lastUsedAt?.toISOString() || null,
          createdAt: k.createdAt.toISOString(),
          expiresAt: k.expiresAt?.toISOString() || null,
        })),
      },
    });
  } catch (error) {
    console.error("API keys fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

// POST /api/v1/api-keys - Create new API key
export async function POST(request: NextRequest) {
  try {
    const walletAddress = request.headers.get("x-wallet-address");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, permissions } = body;

    const user = await getOrCreateUser(walletAddress);
    
    const apiKey = await createApiKey({
      userId: user.id,
      name: name || "API Key",
      permissions: permissions?.map((p: string) => `${p}:read`).concat(
        permissions?.map((p: string) => `${p}:write`)
      ) || ["crucible:read", "crucible:write", "foundry:read", "foundry:write"],
    });

    return NextResponse.json({
      success: true,
      data: {
        id: apiKey.id,
        key: apiKey.key, // Full key - only returned once!
        prefix: apiKey.prefix,
        name: apiKey.name,
        permissions: apiKey.permissions,
        createdAt: apiKey.createdAt.toISOString(),
      },
      message: "API key created. Save this key - it won't be shown again!",
    });
  } catch (error) {
    console.error("API key creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/api-keys - Delete an API key
export async function DELETE(request: NextRequest) {
  try {
    const walletAddress = request.headers.get("x-wallet-address");
    const { searchParams } = new URL(request.url);
    const keyId = searchParams.get("id");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address required" },
        { status: 401 }
      );
    }

    if (!keyId) {
      return NextResponse.json(
        { success: false, error: "Key ID required" },
        { status: 400 }
      );
    }

    const user = await getOrCreateUser(walletAddress);
    await deleteApiKey(keyId, user.id);

    return NextResponse.json({
      success: true,
      message: "API key deleted",
    });
  } catch (error) {
    console.error("API key deletion error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete API key";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
