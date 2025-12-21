import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/forge-council/pips/[pipId]/vote
 * Cast a vote on a PIP
 * 
 * PER-PIP STAKING MODEL:
 * - Must stake a MINIMUM of 100 PYRAX specifically for THIS PIP
 * - This stake is locked for the duration of the voting period
 * - Prevents whale dominance by requiring fresh stake per proposal
 * - Must be running a node
 * - Can only vote once per PIP
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ pipId: string }> }
) {
  try {
    const { pipId } = await params;
    const body = await request.json();
    const {
      walletAddress,
      voteType, // "FOR" or "AGAINST"
      stakeAmountForPip, // Amount being staked specifically for THIS PIP
      nodeRunning,
      walletBalance, // Current wallet balance to verify they have enough
    } = body;

    // Validate required fields
    if (!walletAddress || !voteType) {
      return NextResponse.json(
        { error: "Wallet address and vote type are required" },
        { status: 400 }
      );
    }

    if (!["FOR", "AGAINST"].includes(voteType)) {
      return NextResponse.json(
        { error: "Vote type must be FOR or AGAINST" },
        { status: 400 }
      );
    }

    // PER-PIP STAKING: Require minimum 100 PYRAX staked for THIS specific PIP
    const stakeForThisPip = parseFloat(stakeAmountForPip) || 0;
    if (stakeForThisPip < 100) {
      return NextResponse.json(
        { 
          error: "You must stake at least 100 PYRAX on this PIP to vote",
          requirement: "per_pip_stake",
          minimumStake: 100,
          providedStake: stakeForThisPip,
          message: "Each PIP requires a fresh stake of minimum 100 PYRAX. This prevents whale dominance."
        },
        { status: 403 }
      );
    }

    // Verify wallet has sufficient balance for this stake
    const balance = parseFloat(walletBalance) || 0;
    if (balance < stakeForThisPip) {
      return NextResponse.json(
        { 
          error: `Insufficient balance. You need ${stakeForThisPip} PYRAX but only have ${balance} PYRAX`,
          requirement: "balance",
          needed: stakeForThisPip,
          available: balance
        },
        { status: 403 }
      );
    }

    if (!nodeRunning) {
      return NextResponse.json(
        { 
          error: "You must be running a PYRAX node to vote",
          requirement: "node"
        },
        { status: 403 }
      );
    }

    // Verify PIP exists and is in ACTIVE status
    const pip = await prisma.pip.findUnique({ where: { id: pipId } });
    if (!pip) {
      return NextResponse.json({ error: "PIP not found" }, { status: 404 });
    }

    if (pip.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This PIP is not currently open for voting" },
        { status: 400 }
      );
    }

    // Check if voting period has ended
    if (pip.votingEndsAt && new Date() > pip.votingEndsAt) {
      return NextResponse.json(
        { error: "Voting period has ended" },
        { status: 400 }
      );
    }

    // Check if user has already voted
    const existingVote = await prisma.pipVote.findUnique({
      where: {
        pipId_walletAddress: {
          pipId,
          walletAddress: walletAddress.toLowerCase(),
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted on this PIP" },
        { status: 400 }
      );
    }

    // Create vote with per-PIP stake
    const vote = await prisma.pipVote.create({
      data: {
        pipId,
        walletAddress: walletAddress.toLowerCase(),
        voteType: voteType as "UP" | "DOWN", // Map FOR/AGAINST to UP/DOWN enum
        stakedAmount: BigInt(Math.floor(stakeForThisPip)), // Per-PIP stake amount
        nodeRunning: true,
      },
    });

    // Update PIP vote counts - voting power equals the per-PIP stake
    const votingPower = BigInt(Math.floor(stakeForThisPip));
    if (voteType === "FOR") {
      await prisma.pip.update({
        where: { id: pipId },
        data: {
          forVotes: { increment: votingPower },
          totalVoters: { increment: 1 },
        },
      });
    } else {
      await prisma.pip.update({
        where: { id: pipId },
        data: {
          againstVotes: { increment: votingPower },
          totalVoters: { increment: 1 },
        },
      });
    }

    // Get updated PIP
    const updatedPip = await prisma.pip.findUnique({ where: { id: pipId } });

    return NextResponse.json({
      success: true,
      vote: {
        id: vote.id,
        voteType,
        stakedOnPip: stakeForThisPip, // Per-PIP stake amount
        votingPower: stakeForThisPip,
      },
      pip: {
        forVotes: updatedPip?.forVotes.toString(),
        againstVotes: updatedPip?.againstVotes.toString(),
        totalVoters: updatedPip?.totalVoters,
      },
    });
  } catch (error) {
    console.error("Error casting vote:", error);
    return NextResponse.json(
      { error: "Failed to cast vote" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/forge-council/pips/[pipId]/vote?wallet=xxx
 * Check if a wallet has voted on a PIP
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pipId: string }> }
) {
  try {
    const { pipId } = await params;
    const wallet = request.nextUrl.searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    const vote = await prisma.pipVote.findUnique({
      where: {
        pipId_walletAddress: {
          pipId,
          walletAddress: wallet.toLowerCase(),
        },
      },
    });

    return NextResponse.json({
      hasVoted: !!vote,
      vote: vote
        ? {
            voteType: vote.voteType,
            votingPower: vote.stakedAmount.toString(),
            createdAt: vote.createdAt,
          }
        : null,
    });
  } catch (error) {
    console.error("Error checking vote:", error);
    return NextResponse.json(
      { error: "Failed to check vote" },
      { status: 500 }
    );
  }
}
