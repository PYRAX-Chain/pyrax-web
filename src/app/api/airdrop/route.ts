import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/airdrop?wallet=xxx
 * Get airdrop allocation for a wallet address
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
        rewardHistory: {
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        payoutRequests: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!recipient) {
      return NextResponse.json({
        exists: false,
        allocation: {
          purchasedTokens: "0",
          testnetRewards: "0",
          bugBountyRewards: "0",
          referralRewards: "0",
          bonusTokens: "0",
          totalAllocation: "0",
          xfAllocation: "0",
        },
        claimStatus: "NOT_ELIGIBLE",
        rewardHistory: [],
        payoutRequests: [],
      });
    }

    return NextResponse.json({
      exists: true,
      allocation: {
        purchasedTokens: recipient.purchasedTokens.toString(),
        testnetRewards: recipient.testnetRewards.toString(),
        bugBountyRewards: recipient.bugBountyRewards.toString(),
        referralRewards: recipient.referralRewards.toString(),
        bonusTokens: recipient.bonusTokens.toString(),
        totalAllocation: recipient.totalAllocation.toString(),
        xfAllocation: recipient.xfAllocation.toString(),
      },
      claimStatus: recipient.claimStatus,
      kycStatus: recipient.kycStatus,
      vestingSchedule: recipient.vestingSchedule,
      vestedAmount: recipient.vestedAmount.toString(),
      claimedAt: recipient.claimedAt,
      claimTxHash: recipient.claimTxHash,
      rewardHistory: recipient.rewardHistory.map((r) => ({
        id: r.id,
        rewardType: r.rewardType,
        amount: r.amount.toString(),
        tokenType: r.tokenType,
        sourceType: r.sourceType,
        description: r.description,
        status: r.status,
        createdAt: r.createdAt,
      })),
      payoutRequests: recipient.payoutRequests.map((p) => ({
        id: p.id,
        amount: p.amount.toString(),
        tokenType: p.tokenType,
        reason: p.reason,
        status: p.status,
        createdAt: p.createdAt,
        paidAt: p.paidAt,
        txHash: p.txHash,
      })),
    });
  } catch (error) {
    console.error("Error fetching airdrop allocation:", error);
    return NextResponse.json({ error: "Failed to fetch allocation" }, { status: 500 });
  }
}

/**
 * POST /api/airdrop
 * Register a wallet for airdrop or update allocation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, email } = body;

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 });
    }

    // Get or create recipient
    let recipient = await prisma.airdropRecipient.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!recipient) {
      recipient = await prisma.airdropRecipient.create({
        data: {
          walletAddress: walletAddress.toLowerCase(),
          email: email || null,
        },
      });
    } else if (email && !recipient.email) {
      // Update email if not set
      recipient = await prisma.airdropRecipient.update({
        where: { id: recipient.id },
        data: { email },
      });
    }

    return NextResponse.json({
      success: true,
      recipient: {
        id: recipient.id,
        walletAddress: recipient.walletAddress,
        totalAllocation: recipient.totalAllocation.toString(),
        claimStatus: recipient.claimStatus,
      },
    });
  } catch (error) {
    console.error("Error registering for airdrop:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
