// API Key Service - Generate and manage API keys for programmatic access
// Keys are hashed for storage, only shown once on creation

import { prisma } from "@/lib/prisma";
import { createHash, randomBytes } from "crypto";

// Generate a secure random API key
export function generateApiKey(): { key: string; prefix: string; hash: string } {
  const randomPart = randomBytes(32).toString("base64url");
  const key = `pyrax_${randomPart}`;
  const prefix = key.substring(0, 12); // pyrax_XXXX for identification
  const hash = hashApiKey(key);
  
  return { key, prefix, hash };
}

// Hash an API key for storage
export function hashApiKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

// Create a new API key for a user
export async function createApiKey(input: {
  userId: string;
  name: string;
  permissions?: string[];
  rateLimit?: number;
  expiresAt?: Date;
}) {
  const { key, prefix, hash } = generateApiKey();

  const apiKey = await prisma.apiKey.create({
    data: {
      userId: input.userId,
      name: input.name || "Unnamed Key",
      keyHash: hash,
      keyPrefix: prefix,
      permissions: input.permissions || ["crucible:read", "crucible:write", "foundry:read", "foundry:write"],
      rateLimit: input.rateLimit || 100,
      expiresAt: input.expiresAt,
      active: true,
    },
  });

  // Return the full key only once - it won't be retrievable later
  return {
    id: apiKey.id,
    key, // Full key - only returned on creation
    prefix: apiKey.keyPrefix,
    name: apiKey.name,
    permissions: apiKey.permissions,
    rateLimit: apiKey.rateLimit,
    createdAt: apiKey.createdAt,
    expiresAt: apiKey.expiresAt,
  };
}

// Validate an API key and return the associated user
export async function validateApiKey(key: string) {
  if (!key.startsWith("pyrax_")) {
    return null;
  }

  const hash = hashApiKey(key);
  
  const apiKey = await prisma.apiKey.findUnique({
    where: { keyHash: hash },
    include: {
      user: {
        select: {
          id: true,
          walletAddress: true,
          credits: true,
          tier: true,
        },
      },
    },
  });

  if (!apiKey) {
    return null;
  }

  // Check if key is active
  if (!apiKey.active) {
    return null;
  }

  // Check if key is expired
  if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
    return null;
  }

  // Update last used timestamp
  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  return {
    keyId: apiKey.id,
    userId: apiKey.userId,
    user: apiKey.user,
    permissions: apiKey.permissions,
    rateLimit: apiKey.rateLimit,
  };
}

// Get all API keys for a user (without the actual keys)
export async function getUserApiKeys(userId: string) {
  const keys = await prisma.apiKey.findMany({
    where: { userId, active: true },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      permissions: true,
      rateLimit: true,
      lastUsedAt: true,
      createdAt: true,
      expiresAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return keys;
}

// Delete (deactivate) an API key
export async function deleteApiKey(keyId: string, userId: string) {
  const apiKey = await prisma.apiKey.findUnique({
    where: { id: keyId },
  });

  if (!apiKey) {
    throw new Error("API key not found");
  }

  if (apiKey.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.apiKey.update({
    where: { id: keyId },
    data: { active: false },
  });

  return true;
}

// Check rate limit for an API key
export async function checkRateLimit(keyId: string): Promise<{ allowed: boolean; remaining: number }> {
  // In production, this would use Redis for rate limiting
  // For now, return allowed
  return { allowed: true, remaining: 100 };
}

// Middleware helper for API routes
export async function authenticateRequest(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing or invalid Authorization header", status: 401 };
  }

  const key = authHeader.slice(7);
  const validation = await validateApiKey(key);

  if (!validation) {
    return { error: "Invalid API key", status: 401 };
  }

  // Check rate limit
  const rateLimit = await checkRateLimit(validation.keyId);
  if (!rateLimit.allowed) {
    return { error: "Rate limit exceeded", status: 429 };
  }

  return { user: validation.user, permissions: validation.permissions };
}
