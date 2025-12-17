import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

// Whitelisted admin emails (in production, store hashed passwords in DB)
const ADMIN_WHITELIST: Record<string, { password: string; role: string }> = {
  "admin@pyrax.network": { password: process.env.ADMIN_PASSWORD || "pyrax2025!", role: "SUPER_ADMIN" },
  "dev@pyrax.network": { password: process.env.DEV_PASSWORD || "devpass123!", role: "ADMIN" },
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Check whitelist
    const adminConfig = ADMIN_WHITELIST[email.toLowerCase()];
    if (!adminConfig) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Verify password (in production, use bcrypt)
    if (password !== adminConfig.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create or get admin record
    let admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase() } });

    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          email: email.toLowerCase(),
          role: adminConfig.role as any,
          active: true,
        },
      });
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // Create session
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.adminSession.create({
      data: {
        adminId: admin.id,
        token,
        expiresAt,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        action: "LOGIN",
        entity: "Admin",
        entityId: admin.id,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json({
      success: true,
      admin: { email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
