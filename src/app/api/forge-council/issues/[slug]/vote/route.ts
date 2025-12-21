import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// POST - Vote on an issue
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { voteType, walletAddress } = await request.json();

    if (!voteType || !["UP", "DOWN"].includes(voteType)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: { slug },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Get IP hash for anonymous voting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

    // Check for existing vote
    const existingVote = await prisma.issueVote.findFirst({
      where: {
        issueId: issue.id,
        OR: [
          { walletAddress: walletAddress || undefined },
          { ipHash: walletAddress ? undefined : ipHash },
        ],
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote if clicking same button
        await prisma.issueVote.delete({ where: { id: existingVote.id } });
        
        // Update issue counts
        await prisma.issue.update({
          where: { id: issue.id },
          data: {
            upvotes: voteType === "UP" ? { decrement: 1 } : undefined,
            downvotes: voteType === "DOWN" ? { decrement: 1 } : undefined,
          },
        });

        return NextResponse.json({ success: true, action: "removed", voteType: null });
      } else {
        // Change vote
        await prisma.issueVote.update({
          where: { id: existingVote.id },
          data: { voteType },
        });

        // Update issue counts
        await prisma.issue.update({
          where: { id: issue.id },
          data: {
            upvotes: voteType === "UP" ? { increment: 1 } : { decrement: 1 },
            downvotes: voteType === "DOWN" ? { increment: 1 } : { decrement: 1 },
          },
        });

        return NextResponse.json({ success: true, action: "changed", voteType });
      }
    }

    // Create new vote
    await prisma.issueVote.create({
      data: {
        issueId: issue.id,
        walletAddress: walletAddress || null,
        ipHash: walletAddress ? null : ipHash,
        voteType,
      },
    });

    // Update issue counts
    await prisma.issue.update({
      where: { id: issue.id },
      data: {
        upvotes: voteType === "UP" ? { increment: 1 } : undefined,
        downvotes: voteType === "DOWN" ? { increment: 1 } : undefined,
      },
    });

    return NextResponse.json({ success: true, action: "added", voteType });
  } catch (error) {
    console.error("Failed to vote:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
