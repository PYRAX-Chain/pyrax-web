import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/test-program/register
 * Register a wallet for the test program
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, email, discordUsername, referredBy } = body;

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 });
    }

    const normalizedWallet = walletAddress.toLowerCase();

    // Check if already registered
    let tester = await prisma.tester.findUnique({
      where: { walletAddress: normalizedWallet },
    });

    if (tester) {
      return NextResponse.json({
        success: true,
        message: "Already registered",
        tester: {
          id: tester.id,
          walletAddress: tester.walletAddress,
          registeredAt: tester.registeredAt,
          currentPhase: tester.currentPhase,
          totalRewards: tester.totalRewards.toString(),
          completedPhases: tester.completedPhases,
        },
      });
    }

    // Get active phase
    const activePhase = await prisma.testnetPhase.findFirst({
      where: { active: true },
    });

    // Create new tester
    tester = await prisma.tester.create({
      data: {
        walletAddress: normalizedWallet,
        email: email || null,
        discordUsername: discordUsername || null,
        referredBy: referredBy?.toLowerCase() || null,
        currentPhase: activePhase?.name?.toLowerCase().split(" ")[0] || "forge",
      },
    });

    // Award early tester bonus if this is one of the first 1000 testers
    const testerCount = await prisma.tester.count();
    
    if (testerCount <= 1000) {
      const bonusAmount = testerCount <= 100 ? 500 : testerCount <= 500 ? 250 : 100;
      
      await prisma.testerReward.create({
        data: {
          walletAddress: normalizedWallet,
          source: "EARLY_TESTER",
          description: `Early Tester Bonus #${testerCount}`,
          amount: bonusAmount,
          status: "PENDING",
        },
      });

      // Update tester's total rewards
      await prisma.tester.update({
        where: { id: tester.id },
        data: { totalRewards: { increment: bonusAmount } },
      });
    }

    // Handle referral bonus
    if (referredBy) {
      const referrer = await prisma.tester.findUnique({
        where: { walletAddress: referredBy.toLowerCase() },
      });

      if (referrer) {
        // Referral bonus for referrer
        await prisma.testerReward.create({
          data: {
            walletAddress: referrer.walletAddress,
            source: "REFERRAL",
            sourceId: tester.id,
            description: `Referred ${normalizedWallet.slice(0, 8)}...`,
            amount: 100,
            status: "PENDING",
          },
        });

        await prisma.tester.update({
          where: { id: referrer.id },
          data: { totalRewards: { increment: 100 } },
        });

        // Referral bonus for new tester
        await prisma.testerReward.create({
          data: {
            walletAddress: normalizedWallet,
            source: "REFERRAL",
            sourceId: referrer.id,
            description: "Referral signup bonus",
            amount: 50,
            status: "PENDING",
          },
        });

        await prisma.tester.update({
          where: { id: tester.id },
          data: { totalRewards: { increment: 50 } },
        });
      }
    }

    // Reload tester with updated rewards
    tester = await prisma.tester.findUnique({
      where: { id: tester.id },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully registered for test program",
      tester: {
        id: tester!.id,
        walletAddress: tester!.walletAddress,
        registeredAt: tester!.registeredAt,
        currentPhase: tester!.currentPhase,
        totalRewards: tester!.totalRewards.toString(),
        completedPhases: tester!.completedPhases,
      },
      bonuses: {
        earlyTester: testerCount <= 1000,
        referral: !!referredBy,
      },
    });
  } catch (error) {
    console.error("Error registering tester:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}

/**
 * GET /api/test-program/register?wallet=xxx
 * Check if a wallet is registered
 */
export async function GET(request: NextRequest) {
  try {
    const wallet = request.nextUrl.searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 });
    }

    const tester = await prisma.tester.findUnique({
      where: { walletAddress: wallet.toLowerCase() },
    });

    if (!tester) {
      return NextResponse.json({
        registered: false,
      });
    }

    // Get rewards summary
    const rewards = await prisma.testerReward.findMany({
      where: { walletAddress: wallet.toLowerCase() },
      orderBy: { createdAt: "desc" },
    });

    const rewardsSummary = {
      total: rewards.reduce((sum, r) => sum + Number(r.amount), 0),
      pending: rewards.filter(r => r.status === "PENDING").reduce((sum, r) => sum + Number(r.amount), 0),
      claimable: rewards.filter(r => r.status === "CLAIMABLE").reduce((sum, r) => sum + Number(r.amount), 0),
      claimed: rewards.filter(r => r.status === "CLAIMED").reduce((sum, r) => sum + Number(r.amount), 0),
    };

    return NextResponse.json({
      registered: true,
      tester: {
        id: tester.id,
        walletAddress: tester.walletAddress,
        registeredAt: tester.registeredAt,
        currentPhase: tester.currentPhase,
        totalRewards: tester.totalRewards.toString(),
        completedPhases: tester.completedPhases,
        totalTransactions: tester.totalTransactions,
        totalBugsReported: tester.totalBugsReported,
        nodesRun: tester.nodesRun,
        blocksMinedTotal: tester.blocksMinedTotal,
        lastActiveAt: tester.lastActiveAt,
      },
      rewards: rewardsSummary,
      recentRewards: rewards.slice(0, 10).map(r => ({
        id: r.id,
        source: r.source,
        description: r.description,
        amount: r.amount.toString(),
        status: r.status,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error checking registration:", error);
    return NextResponse.json({ error: "Failed to check registration" }, { status: 500 });
  }
}
