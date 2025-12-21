import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch contributors from presale purchases
    const purchases = await prisma.presalePurchase.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Aggregate by wallet address
    const contributorMap = new Map<string, {
      address: string;
      email?: string;
      totalContributed: number;
      totalPYRAX: number;
      transactions: number;
      firstContribution: string;
      lastContribution: string;
      phase: string;
      status: "active" | "claimed" | "pending";
    }>();

    for (const p of purchases) {
      const existing = contributorMap.get(p.walletAddress.toLowerCase());
      if (existing) {
        existing.totalContributed += p.usdAmount;
        existing.totalPYRAX += p.pyraxAmount;
        existing.transactions += 1;
        if (new Date(p.createdAt) < new Date(existing.firstContribution)) {
          existing.firstContribution = p.createdAt.toISOString();
        }
        if (new Date(p.createdAt) > new Date(existing.lastContribution)) {
          existing.lastContribution = p.createdAt.toISOString();
        }
      } else {
        contributorMap.set(p.walletAddress.toLowerCase(), {
          address: p.walletAddress,
          email: p.email || undefined,
          totalContributed: p.usdAmount,
          totalPYRAX: p.pyraxAmount,
          transactions: 1,
          firstContribution: p.createdAt.toISOString(),
          lastContribution: p.createdAt.toISOString(),
          phase: p.phase || "Phase 1",
          status: p.claimed ? "claimed" : "pending",
        });
      }
    }

    const contributors = Array.from(contributorMap.values())
      .sort((a, b) => b.totalContributed - a.totalContributed)
      .map((c, i) => ({ id: `contrib-${i}`, ...c }));

    const stats = {
      totalContributors: contributors.length,
      totalRaised: contributors.reduce((sum, c) => sum + c.totalContributed, 0),
      totalPYRAXAllocated: contributors.reduce((sum, c) => sum + c.totalPYRAX, 0),
      averageContribution: contributors.length > 0 
        ? contributors.reduce((sum, c) => sum + c.totalContributed, 0) / contributors.length 
        : 0,
    };

    return NextResponse.json({ contributors, stats });
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return NextResponse.json({ contributors: [], stats: null }, { status: 500 });
  }
}
