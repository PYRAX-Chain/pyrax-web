import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationSuccessEmail } from "@/lib/email/brevo";

/**
 * POST /api/admin/auth/confirm
 * Confirm admin account via token
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Confirmation token required" },
        { status: 400 }
      );
    }

    // Find the whitelist entry by token
    const whitelistEntry = await prisma.adminWhitelist.findUnique({
      where: { confirmationToken: token },
    });

    if (!whitelistEntry) {
      return NextResponse.json(
        { error: "Invalid or expired confirmation token" },
        { status: 400 }
      );
    }

    // Check if already confirmed
    if (whitelistEntry.emailConfirmed) {
      return NextResponse.json(
        { error: "Account already confirmed", alreadyConfirmed: true },
        { status: 400 }
      );
    }

    // Check token expiry (72 hours from invitation)
    if (whitelistEntry.invitedAt) {
      const expiryTime = new Date(whitelistEntry.invitedAt.getTime() + 72 * 60 * 60 * 1000);
      if (new Date() > expiryTime) {
        return NextResponse.json(
          { error: "Confirmation link has expired. Please contact an administrator." },
          { status: 400 }
        );
      }
    }

    // Validate email domain
    if (!whitelistEntry.email.endsWith("@pyrax.org")) {
      return NextResponse.json(
        { error: "Only @pyrax.org email addresses are authorized" },
        { status: 403 }
      );
    }

    // Update whitelist entry
    await prisma.adminWhitelist.update({
      where: { id: whitelistEntry.id },
      data: {
        emailConfirmed: true,
        confirmedAt: new Date(),
        active: true,
        confirmationToken: null, // Clear token after use
      },
    });

    // Also update or create the Admin record
    await prisma.admin.upsert({
      where: { email: whitelistEntry.email },
      update: {
        active: true,
      },
      create: {
        email: whitelistEntry.email,
        role: whitelistEntry.role,
        active: true,
      },
    });

    // Log the confirmation
    try {
      const admin = await prisma.admin.findUnique({ where: { email: whitelistEntry.email } });
      if (admin) {
        await prisma.auditLog.create({
          data: {
            adminId: admin.id,
            action: "EMAIL_CONFIRMED",
            entity: "AdminWhitelist",
            entityId: whitelistEntry.id,
            details: { email: whitelistEntry.email },
            ipAddress: request.headers.get("x-forwarded-for") || "unknown",
          },
        });
      }
    } catch (auditError) {
      console.warn("Audit log error:", auditError);
    }

    // Send confirmation success email
    try {
      await sendConfirmationSuccessEmail(whitelistEntry.email);
    } catch (emailError) {
      console.warn("Failed to send confirmation success email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Account confirmed successfully. You can now log in.",
      email: whitelistEntry.email,
    });
  } catch (error) {
    console.error("Confirmation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth/confirm?token=xxx
 * Validate token without confirming (for pre-check)
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { valid: false, error: "Token required" },
      { status: 400 }
    );
  }

  try {
    const whitelistEntry = await prisma.adminWhitelist.findUnique({
      where: { confirmationToken: token },
    });

    if (!whitelistEntry) {
      return NextResponse.json({ valid: false, error: "Invalid token" });
    }

    if (whitelistEntry.emailConfirmed) {
      return NextResponse.json({ 
        valid: false, 
        error: "Already confirmed",
        alreadyConfirmed: true,
      });
    }

    // Check expiry
    if (whitelistEntry.invitedAt) {
      const expiryTime = new Date(whitelistEntry.invitedAt.getTime() + 72 * 60 * 60 * 1000);
      if (new Date() > expiryTime) {
        return NextResponse.json({ valid: false, error: "Token expired" });
      }
    }

    return NextResponse.json({
      valid: true,
      email: whitelistEntry.email,
      role: whitelistEntry.role,
    });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}
