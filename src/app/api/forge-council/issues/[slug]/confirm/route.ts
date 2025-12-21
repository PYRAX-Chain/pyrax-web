import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Confirm an issue (I can reproduce this)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { walletAddress, displayName, environment, version, details } = await request.json();

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address required to confirm" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: { slug },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Check for existing confirmation
    const existing = await prisma.issueConfirmation.findUnique({
      where: {
        issueId_walletAddress: {
          issueId: issue.id,
          walletAddress,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "You have already confirmed this issue" }, { status: 400 });
    }

    // Create confirmation
    await prisma.issueConfirmation.create({
      data: {
        issueId: issue.id,
        walletAddress,
        displayName,
        environment,
        version,
        details,
      },
    });

    // Update issue confirmation count and status
    const newCount = issue.confirmations + 1;
    const newStatus = newCount >= 3 && issue.status === "NEW" ? "CONFIRMED" : issue.status;

    await prisma.issue.update({
      where: { id: issue.id },
      data: {
        confirmations: { increment: 1 },
        status: newStatus,
      },
    });

    return NextResponse.json({
      success: true,
      confirmations: newCount,
      statusChanged: newStatus !== issue.status,
      newStatus,
    });
  } catch (error) {
    console.error("Failed to confirm:", error);
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
  }
}
