import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

// Whitelisted admin emails with bcrypt hashed passwords
// NO REGISTRATION - only whitelisted emails can login
const ADMIN_WHITELIST: Record<string, { passwordHash: string; role: string }> = {
  "shawn.wilson@pyrax.org": { 
    passwordHash: "$2b$10$FVOMLVSweA95oaXzikgOP.J8jPa.O3YEWTA6loF9NyIrDJKD/vrSK", // PyraxCrypto2025!!
    role: "SUPER_ADMIN" 
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Check hardcoded whitelist first (fallback)
    let adminConfig = ADMIN_WHITELIST[email.toLowerCase()];
    
    // Also check database whitelist if no hardcoded match
    let requiresConfirmation = false;
    if (!adminConfig) {
      try {
        const dbWhitelist = await prisma.adminWhitelist.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (dbWhitelist) {
          // Check if email is confirmed
          if (!dbWhitelist.emailConfirmed) {
            return NextResponse.json({ 
              error: "Please confirm your email before logging in. Check your inbox for the confirmation link.",
              requiresConfirmation: true 
            }, { status: 403 });
          }
          // Check if account is active
          if (!dbWhitelist.active) {
            return NextResponse.json({ error: "Account is disabled" }, { status: 403 });
          }
          adminConfig = { passwordHash: dbWhitelist.passwordHash, role: dbWhitelist.role };
          requiresConfirmation = true;
        }
      } catch {
        // Database not available, continue with hardcoded whitelist only
      }
    }
    
    // Validate email domain - only @pyrax.org allowed
    if (!email.toLowerCase().endsWith("@pyrax.org")) {
      return NextResponse.json({ error: "Only @pyrax.org email addresses are authorized" }, { status: 403 });
    }
    
    if (!adminConfig) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Verify password with bcrypt
    const isValid = bcrypt.compareSync(password, adminConfig.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Try database operations, but don't fail if database unavailable
    try {
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

      // Create session in database
      await prisma.adminSession.create({
        data: {
          adminId: admin.id,
          token,
          expiresAt,
          ipAddress: request.headers.get("x-forwarded-for") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        },
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
    } catch (dbError) {
      console.warn("Database unavailable, using cookie-only session:", dbError);
    }

    // Set cookie (always works)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
    
    // Also store admin info in a separate cookie for fallback
    cookieStore.set("admin_email", email.toLowerCase(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
    
    cookieStore.set("admin_role", adminConfig.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      admin: { email: email.toLowerCase(), role: adminConfig.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
