import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

/**
 * POST /api/status/subscribe
 * Subscribe to status notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, notifyAll, notifyMajor, services } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.statusSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      if (existing.verified && !existing.unsubscribedAt) {
        return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
      }
      
      // Re-subscribe if unsubscribed or update preferences
      const verifyToken = randomBytes(32).toString("hex");
      await prisma.statusSubscriber.update({
        where: { id: existing.id },
        data: {
          notifyAll: notifyAll ?? true,
          notifyMajor: notifyMajor ?? true,
          notifyServices: services || [],
          verifyToken,
          verified: false,
          unsubscribedAt: null,
        },
      });

      // TODO: Send verification email
      console.log(`Verification token for ${email}: ${verifyToken}`);

      return NextResponse.json({
        success: true,
        message: "Verification email sent. Please check your inbox.",
      });
    }

    // Create new subscriber
    const verifyToken = randomBytes(32).toString("hex");
    await prisma.statusSubscriber.create({
      data: {
        email: email.toLowerCase(),
        notifyAll: notifyAll ?? true,
        notifyMajor: notifyMajor ?? true,
        notifyServices: services || [],
        verifyToken,
      },
    });

    // TODO: Send verification email
    console.log(`Verification token for ${email}: ${verifyToken}`);

    return NextResponse.json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

/**
 * GET /api/status/subscribe?token=xxx
 * Verify subscription
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    const unsubscribe = request.nextUrl.searchParams.get("unsubscribe");

    if (unsubscribe) {
      // Handle unsubscribe
      const subscriber = await prisma.statusSubscriber.findUnique({
        where: { unsubscribeToken: unsubscribe },
      });

      if (!subscriber) {
        return NextResponse.json({ error: "Invalid unsubscribe link" }, { status: 400 });
      }

      await prisma.statusSubscriber.update({
        where: { id: subscriber.id },
        data: { unsubscribedAt: new Date() },
      });

      return NextResponse.json({
        success: true,
        message: "You have been unsubscribed from status notifications.",
      });
    }

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const subscriber = await prisma.statusSubscriber.findUnique({
      where: { verifyToken: token },
    });

    if (!subscriber) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    await prisma.statusSubscriber.update({
      where: { id: subscriber.id },
      data: {
        verified: true,
        verifiedAt: new Date(),
        verifyToken: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Email verified! You will now receive status notifications.",
    });
  } catch (error) {
    console.error("Error verifying subscription:", error);
    return NextResponse.json({ error: "Failed to verify" }, { status: 500 });
  }
}
