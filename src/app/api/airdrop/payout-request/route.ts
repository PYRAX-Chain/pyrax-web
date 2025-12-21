import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/airdrop/payout-request
 * Request a payout for completed test phase or bug bounties
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      walletAddress, 
      reason, // "test_phase_completion", "bug_bounty", etc.
      testPhaseId,
      issueIds, // For bug bounty requests
    } = body;

    if (!walletAddress || !reason) {
      return NextResponse.json(
        { error: "Wallet address and reason are required" },
        { status: 400 }
      );
    }

    // Get recipient
    const recipient = await prisma.airdropRecipient.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!recipient) {
      return NextResponse.json({ error: "Wallet not registered for airdrop" }, { status: 404 });
    }

    // Calculate amount based on reason
    let amount = BigInt(0);
    let tokenType = "PYRX";

    if (reason === "test_phase_completion" && testPhaseId) {
      // Get test program progress
      const progress = await prisma.testProgramProgress.findUnique({
        where: {
          walletAddress_phaseId: {
            walletAddress: walletAddress.toLowerCase(),
            phaseId: testPhaseId,
          },
        },
      });

      if (!progress) {
        return NextResponse.json({ error: "No progress found for this phase" }, { status: 404 });
      }

      if (!progress.isComplete) {
        return NextResponse.json({ error: "Phase not yet completed" }, { status: 400 });
      }

      if (progress.payoutRequested) {
        return NextResponse.json({ error: "Payout already requested for this phase" }, { status: 400 });
      }

      amount = BigInt(progress.earnedRewards.toString()) + BigInt(progress.bonusRewards.toString());

      // Mark as payout requested
      await prisma.testProgramProgress.update({
        where: { id: progress.id },
        data: { payoutRequested: true },
      });
    } else if (reason === "bug_bounty" && issueIds && issueIds.length > 0) {
      // Calculate bug bounty rewards
      const rewards = await prisma.rewardHistory.findMany({
        where: {
          recipientId: recipient.id,
          sourceId: { in: issueIds },
          status: "APPROVED",
        },
      });

      if (rewards.length === 0) {
        return NextResponse.json({ error: "No approved rewards found for these issues" }, { status: 400 });
      }

      amount = rewards.reduce((sum, r) => sum + BigInt(r.amount.toString()), BigInt(0));
    } else {
      return NextResponse.json({ error: "Invalid reason or missing required fields" }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "No rewards to claim" }, { status: 400 });
    }

    // Create payout request
    const payoutRequest = await prisma.payoutRequest.create({
      data: {
        recipientId: recipient.id,
        amount,
        tokenType,
        reason,
        testPhaseId: testPhaseId || null,
        issueIds: issueIds || [],
        status: "PENDING_REVIEW",
      },
    });

    return NextResponse.json({
      success: true,
      payoutRequest: {
        id: payoutRequest.id,
        amount: amount.toString(),
        tokenType,
        reason,
        status: payoutRequest.status,
        createdAt: payoutRequest.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating payout request:", error);
    return NextResponse.json({ error: "Failed to create payout request" }, { status: 500 });
  }
}

/**
 * GET /api/airdrop/payout-request?wallet=xxx
 * Get payout requests for a wallet
 */
export async function GET(request: NextRequest) {
  try {
    const wallet = request.nextUrl.searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 });
    }

    const recipient = await prisma.airdropRecipient.findUnique({
      where: { walletAddress: wallet.toLowerCase() },
      include: {
        payoutRequests: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!recipient) {
      return NextResponse.json({ payoutRequests: [] });
    }

    return NextResponse.json({
      payoutRequests: recipient.payoutRequests.map((p) => ({
        id: p.id,
        amount: p.amount.toString(),
        tokenType: p.tokenType,
        reason: p.reason,
        status: p.status,
        reviewNotes: p.reviewNotes,
        createdAt: p.createdAt,
        reviewedAt: p.reviewedAt,
        paidAt: p.paidAt,
        txHash: p.txHash,
      })),
    });
  } catch (error) {
    console.error("Error fetching payout requests:", error);
    return NextResponse.json({ error: "Failed to fetch payout requests" }, { status: 500 });
  }
}
