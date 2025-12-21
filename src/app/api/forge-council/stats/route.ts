import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/forge-council/stats
 * Get category counts and statistics for the Forge Council sidebar
 */
export async function GET(request: NextRequest) {
  try {
    // Initialize with defaults
    let issueCategoryCounts: { category: string; _count: { id: number } }[] = [];
    let issueStatusCounts: { status: string; _count: { id: number } }[] = [];
    let pipCategoryCounts: { category: string; _count: { id: number } }[] = [];
    let pipStatusCounts: { status: string; _count: { id: number } }[] = [];
    let totalIssues = 0;
    let totalPips = 0;
    let openIssues = 0;
    let activePips = 0;
    let fixedIssues = 0;
    let passedPips = 0;
    let totalConfirmations = 0;

    // Get issue counts (handle if table doesn't exist)
    try {
      issueCategoryCounts = await prisma.issue.groupBy({
        by: ["category"],
        where: { isPublic: true },
        _count: { id: true },
      });

      issueStatusCounts = await prisma.issue.groupBy({
        by: ["status"],
        where: { isPublic: true },
        _count: { id: true },
      });

      totalIssues = await prisma.issue.count({
        where: { isPublic: true },
      });

      openIssues = await prisma.issue.count({
        where: {
          isPublic: true,
          status: { in: ["NEW", "CONFIRMED", "ACKNOWLEDGED", "INVESTIGATING", "IN_PROGRESS", "TESTING"] },
        },
      });

      fixedIssues = await prisma.issue.count({
        where: { isPublic: true, status: "FIXED" },
      });
    } catch (e) {
      console.log("Issue table may not exist yet");
    }

    // Get PIP counts (handle if table doesn't exist)
    try {
      pipCategoryCounts = await prisma.pip.groupBy({
        by: ["category"],
        _count: { id: true },
      });

      pipStatusCounts = await prisma.pip.groupBy({
        by: ["status"],
        _count: { id: true },
      });

      totalPips = await prisma.pip.count();

      activePips = await prisma.pip.count({
        where: { status: "ACTIVE" },
      });

      passedPips = await prisma.pip.count({
        where: { status: { in: ["PASSED", "IMPLEMENTED"] } },
      });
    } catch (e) {
      console.log("Pip table may not exist yet");
    }

    // Total confirmations (may not exist yet)
    try {
      totalConfirmations = await prisma.issueConfirmation.count();
    } catch {
      // Table may not exist yet
    }

    // Format category counts as objects
    const issuesByCategory: Record<string, number> = {};
    issueCategoryCounts.forEach((c) => {
      issuesByCategory[c.category] = c._count.id;
    });

    const issuesByStatus: Record<string, number> = {};
    issueStatusCounts.forEach((c) => {
      issuesByStatus[c.status] = c._count.id;
    });

    const pipsByCategory: Record<string, number> = {};
    pipCategoryCounts.forEach((c) => {
      pipsByCategory[c.category] = c._count.id;
    });

    const pipsByStatus: Record<string, number> = {};
    pipStatusCounts.forEach((c) => {
      pipsByStatus[c.status] = c._count.id;
    });

    return NextResponse.json({
      issues: {
        total: totalIssues,
        open: openIssues,
        fixed: fixedIssues,
        byCategory: issuesByCategory,
        byStatus: issuesByStatus,
      },
      pips: {
        total: totalPips,
        active: activePips,
        passed: passedPips,
        byCategory: pipsByCategory,
        byStatus: pipsByStatus,
      },
      totalConfirmations,
      combined: {
        total: totalIssues + totalPips,
        active: openIssues + activePips,
      },
    });
  } catch (error) {
    console.error("Error fetching forge council stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
