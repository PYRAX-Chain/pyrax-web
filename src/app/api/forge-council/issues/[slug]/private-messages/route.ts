import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/forge-council/issues/[slug]/private-messages
 * Get private messages between admin and reporter for an issue
 * Only accessible to the reporter (by wallet) or admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const wallet = request.nextUrl.searchParams.get("wallet");
    const isAdmin = request.nextUrl.searchParams.get("admin") === "true";

    // Get the issue to verify access (by slug or id)
    const issue = await prisma.issue.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      select: { id: true, reporterWallet: true, reporterEmail: true },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Verify access - must be reporter or admin
    const isReporter = wallet && issue.reporterWallet?.toLowerCase() === wallet.toLowerCase();
    if (!isReporter && !isAdmin) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Get private messages - handle case where table doesn't exist yet
    let messages: any[] = [];
    try {
      messages = await (prisma as any).privateIssueMessage.findMany({
        where: { issueId: issue.id },
        orderBy: { createdAt: "asc" },
      });

      // Mark messages as read
      if (isAdmin) {
        await (prisma as any).privateIssueMessage.updateMany({
          where: { issueId: issue.id, senderType: "reporter", readByAdmin: false },
          data: { readByAdmin: true },
        });
      } else if (isReporter) {
        await (prisma as any).privateIssueMessage.updateMany({
          where: { issueId: issue.id, senderType: "admin", readByReporter: false },
          data: { readByReporter: true },
        });
      }
    } catch {
      // Table may not exist yet
    }

    return NextResponse.json({
      messages,
      issueId: issue.id,
    });
  } catch (error) {
    console.error("Error fetching private messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

/**
 * POST /api/forge-council/issues/[slug]/private-messages
 * Send a private message between admin and reporter
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { wallet, message, senderType, senderName, senderEmail } = body;

    if (!message || !senderType) {
      return NextResponse.json({ error: "Message and sender type required" }, { status: 400 });
    }

    // Get the issue
    const issue = await prisma.issue.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      select: { id: true, reporterWallet: true, reporterEmail: true },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Verify access
    const isReporter = wallet && issue.reporterWallet?.toLowerCase() === wallet.toLowerCase();
    const isAdmin = senderType === "admin";

    if (senderType === "reporter" && !isReporter) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Create message - handle case where table doesn't exist yet
    try {
      const newMessage = await (prisma as any).privateIssueMessage.create({
        data: {
          issueId: issue.id,
          senderType,
          senderWallet: senderType === "reporter" ? wallet : null,
          senderName: senderName || null,
          senderEmail: senderEmail || null,
          message,
          readByAdmin: senderType === "admin",
          readByReporter: senderType === "reporter",
        },
      });

      return NextResponse.json({ success: true, message: newMessage });
    } catch {
      return NextResponse.json({ 
        error: "Private messaging not available yet",
        message: "The private messaging feature is being set up."
      }, { status: 503 });
    }
  } catch (error) {
    console.error("Error sending private message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
