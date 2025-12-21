import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Test program task definitions with rewards
const TEST_TASKS = {
  wallet_created: { name: "Create Wallet", reward: 25, autoDetect: true },
  first_transaction: { name: "First Transaction", reward: 50, autoDetect: true },
  staking_initiated: { name: "Stake PYRAX", reward: 100, autoDetect: true },
  node_started: { name: "Run a Node", reward: 200, autoDetect: true },
  bug_reported: { name: "Report a Bug", reward: 50, autoDetect: true },
  bug_confirmed: { name: "Bug Confirmed", reward: 100, autoDetect: true },
  governance_vote: { name: "Vote on PIP", reward: 75, autoDetect: true },
  pip_submitted: { name: "Submit a PIP", reward: 150, autoDetect: true },
  referral_made: { name: "Refer a Friend", reward: 100, autoDetect: false },
  multi_chain_tx: { name: "Multi-chain Transaction", reward: 75, autoDetect: true },
};

// Bug reporting bonus rewards
const BUG_BONUSES = {
  bugs_reported_3: { name: "Report 3 Bugs", reward: 50 },
  bugs_reported_5: { name: "Report 5 Bugs", reward: 100 },
  bugs_reported_10: { name: "Report 10 Bugs", reward: 250 },
  bug_reproduced: { name: "Reproduce Another's Bug", reward: 25 },
  critical_bug: { name: "Critical Bug Found", reward: 500 },
};

/**
 * GET /api/test-program/progress?wallet=xxx&phaseId=xxx
 * Get test program progress for a wallet
 */
export async function GET(request: NextRequest) {
  try {
    const wallet = request.nextUrl.searchParams.get("wallet");
    const phaseId = request.nextUrl.searchParams.get("phaseId");

    if (!wallet) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 });
    }

    // Get active phase if not specified
    let activePhase;
    if (phaseId) {
      activePhase = await prisma.testnetPhase.findUnique({ where: { id: phaseId } });
    } else {
      activePhase = await prisma.testnetPhase.findFirst({ where: { active: true } });
    }

    if (!activePhase) {
      return NextResponse.json({ error: "No active test phase" }, { status: 404 });
    }

    // Get or create progress record
    let progress = await prisma.testProgramProgress.findUnique({
      where: {
        walletAddress_phaseId: {
          walletAddress: wallet.toLowerCase(),
          phaseId: activePhase.id,
        },
      },
    });

    if (!progress) {
      // Create new progress record
      progress = await prisma.testProgramProgress.create({
        data: {
          walletAddress: wallet.toLowerCase(),
          phaseId: activePhase.id,
          tasksCompleted: {},
          totalTasks: Object.keys(TEST_TASKS).length,
          completedTasks: 0,
        },
      });
    }

    // Calculate task status
    const tasksCompleted = (progress.tasksCompleted as Record<string, boolean>) || {};
    const taskList = Object.entries(TEST_TASKS).map(([key, task]) => ({
      id: key,
      name: task.name,
      reward: task.reward,
      completed: tasksCompleted[key] || false,
      autoDetect: task.autoDetect,
    }));

    return NextResponse.json({
      phase: {
        id: activePhase.id,
        name: activePhase.name,
        theme: activePhase.theme,
        objectives: activePhase.objectives,
        startTime: activePhase.startTime,
        endTime: activePhase.endTime,
      },
      progress: {
        id: progress.id,
        totalTasks: progress.totalTasks,
        completedTasks: progress.completedTasks,
        completionPercent: Math.round((progress.completedTasks / progress.totalTasks) * 100),
        earnedRewards: progress.earnedRewards.toString(),
        bonusRewards: progress.bonusRewards.toString(),
        bugsReported: progress.bugsReported,
        bugsConfirmed: progress.bugsConfirmed,
        bugsReproduced: progress.bugsReproduced,
        isComplete: progress.isComplete,
        completedAt: progress.completedAt,
        payoutRequested: progress.payoutRequested,
      },
      tasks: taskList,
      bugBonuses: BUG_BONUSES,
    });
  } catch (error) {
    console.error("Error fetching test program progress:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

/**
 * POST /api/test-program/progress
 * Update task completion (auto-detected or manual)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, phaseId, taskId, completed } = body;

    if (!walletAddress || !phaseId || !taskId) {
      return NextResponse.json(
        { error: "Wallet address, phase ID, and task ID are required" },
        { status: 400 }
      );
    }

    const task = TEST_TASKS[taskId as keyof typeof TEST_TASKS];
    if (!task) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    // Get progress record
    let progress = await prisma.testProgramProgress.findUnique({
      where: {
        walletAddress_phaseId: {
          walletAddress: walletAddress.toLowerCase(),
          phaseId,
        },
      },
    });

    if (!progress) {
      // Create new progress record
      progress = await prisma.testProgramProgress.create({
        data: {
          walletAddress: walletAddress.toLowerCase(),
          phaseId,
          tasksCompleted: {},
          totalTasks: Object.keys(TEST_TASKS).length,
          completedTasks: 0,
        },
      });
    }

    const tasksCompleted = (progress.tasksCompleted as Record<string, boolean>) || {};
    const wasCompleted = tasksCompleted[taskId] || false;
    const nowCompleted = completed !== undefined ? completed : true;

    // Only update if status changed
    if (wasCompleted !== nowCompleted) {
      tasksCompleted[taskId] = nowCompleted;
      
      const completedCount = Object.values(tasksCompleted).filter(Boolean).length;
      const earnedRewards = Object.entries(tasksCompleted)
        .filter(([, done]) => done)
        .reduce((sum, [key]) => {
          const t = TEST_TASKS[key as keyof typeof TEST_TASKS];
          return sum + (t ? t.reward : 0);
        }, 0);

      const isComplete = completedCount >= Object.keys(TEST_TASKS).length;

      progress = await prisma.testProgramProgress.update({
        where: { id: progress.id },
        data: {
          tasksCompleted,
          completedTasks: completedCount,
          earnedRewards,
          isComplete,
          completedAt: isComplete && !progress.isComplete ? new Date() : progress.completedAt,
        },
      });

      // If task newly completed, create reward history
      if (nowCompleted && !wasCompleted) {
        // Get or create airdrop recipient
        let recipient = await prisma.airdropRecipient.findUnique({
          where: { walletAddress: walletAddress.toLowerCase() },
        });

        if (!recipient) {
          recipient = await prisma.airdropRecipient.create({
            data: { walletAddress: walletAddress.toLowerCase() },
          });
        }

        await prisma.rewardHistory.create({
          data: {
            recipientId: recipient.id,
            rewardType: "TESTNET_PARTICIPATION",
            amount: task.reward,
            tokenType: "PYRX",
            sourceType: "testnet",
            sourceId: taskId,
            testPhaseId: phaseId,
            description: `Completed: ${task.name}`,
            status: "APPROVED",
            approvedAt: new Date(),
          },
        });

        // Update recipient totals
        await prisma.airdropRecipient.update({
          where: { id: recipient.id },
          data: {
            testnetRewards: { increment: task.reward },
            totalAllocation: { increment: task.reward },
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      taskId,
      completed: nowCompleted,
      reward: nowCompleted ? task.reward : 0,
      progress: {
        completedTasks: progress.completedTasks,
        totalTasks: progress.totalTasks,
        earnedRewards: progress.earnedRewards.toString(),
        isComplete: progress.isComplete,
      },
    });
  } catch (error) {
    console.error("Error updating task progress:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
