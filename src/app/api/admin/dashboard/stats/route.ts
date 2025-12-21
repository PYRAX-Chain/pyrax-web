import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get presale stats
    const contributions = await prisma.contribution.findMany({
      where: { status: "CONFIRMED" },
    });

    const totalRaisedUsd = contributions.reduce(
      (sum, c) => sum + Number(c.totalUsd),
      0
    );
    const totalPYRAXSold = contributions.reduce(
      (sum, c) => sum + Number(c.PYRAXAmount),
      0
    );

    // Get unique contributors
    const uniqueContributors = new Set(contributions.map((c) => c.walletAddress));

    // Get current active phase
    const activePhase = await prisma.presalePhase.findFirst({
      where: { active: true },
      orderBy: { phaseNumber: "asc" },
    });

    // Calculate phase progress
    let phaseProgress = 0;
    let currentPhase = 0;
    if (activePhase) {
      currentPhase = activePhase.phaseNumber;
      phaseProgress =
        Number(activePhase.capUsd) > 0
          ? (Number(activePhase.raisedUsd) / Number(activePhase.capUsd)) * 100
          : 0;
    }

    // Get recent contributions
    const recentContributions = await prisma.contribution.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      where: { status: "CONFIRMED" },
    });

    // Get daily stats for chart
    const dailyStats = await prisma.dailyStats.findMany({
      take: 30,
      orderBy: { date: "desc" },
    });

    return NextResponse.json({
      totalRaisedUsd,
      totalContributors: uniqueContributors.size,
      totalPYRAXSold,
      currentPhase,
      phaseProgress,
      recentContributions: recentContributions.map((c) => ({
        id: c.id,
        walletAddress: c.walletAddress,
        totalUsd: Number(c.totalUsd),
        PYRAXAmount: Number(c.PYRAXAmount),
        status: c.status,
        createdAt: c.createdAt.toISOString(),
      })),
      dailyStats: dailyStats.map((s) => ({
        date: s.date.toISOString(),
        totalRaisedUsd: Number(s.totalRaisedUsd),
        contributionsCount: s.contributionsCount,
      })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    
    // Return empty stats if database not set up yet
    return NextResponse.json({
      totalRaisedUsd: 0,
      totalContributors: 0,
      totalPYRAXSold: 0,
      currentPhase: 0,
      phaseProgress: 0,
      recentContributions: [],
      dailyStats: [],
    });
  }
}
