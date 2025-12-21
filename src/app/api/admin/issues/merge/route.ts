import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

/**
 * POST /api/admin/issues/merge
 * Merge duplicate issues into a primary issue
 * Admin only endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const adminEmail = cookieStore.get("admin_email")?.value;
    const adminRole = cookieStore.get("admin_role")?.value;

    if (!adminEmail || !["SUPER_ADMIN", "ADMIN", "MANAGER"].includes(adminRole || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { primaryIssueId, duplicateIssueIds, reason } = body;

    if (!primaryIssueId || !duplicateIssueIds || !Array.isArray(duplicateIssueIds) || duplicateIssueIds.length === 0) {
      return NextResponse.json(
        { error: "Primary issue ID and at least one duplicate issue ID are required" },
        { status: 400 }
      );
    }

    // Verify primary issue exists
    const primaryIssue = await prisma.issue.findUnique({
      where: { id: primaryIssueId },
    });

    if (!primaryIssue) {
      return NextResponse.json({ error: "Primary issue not found" }, { status: 404 });
    }

    // Verify all duplicate issues exist
    const duplicates = await prisma.issue.findMany({
      where: { id: { in: duplicateIssueIds } },
      include: {
        votes: true,
        confirmers: true,
        comments: true,
      },
    });

    if (duplicates.length !== duplicateIssueIds.length) {
      return NextResponse.json({ error: "One or more duplicate issues not found" }, { status: 404 });
    }

    // Aggregate votes and confirmations from duplicates to primary
    let totalUpvotes = primaryIssue.upvotes;
    let totalDownvotes = primaryIssue.downvotes;
    let totalConfirmations = primaryIssue.confirmations;
    let totalViewCount = primaryIssue.viewCount;

    for (const dup of duplicates) {
      totalUpvotes += dup.upvotes;
      totalDownvotes += dup.downvotes;
      totalConfirmations += dup.confirmations;
      totalViewCount += dup.viewCount;
    }

    // Create merge record
    const merge = await prisma.issueMerge.create({
      data: {
        primaryIssueId,
        mergedIssueIds: duplicateIssueIds,
        mergedBy: adminEmail,
        mergedByName: adminEmail.split("@")[0],
        reason: reason || "Duplicate issues merged by admin",
      },
    });

    // Update primary issue with aggregated stats
    await prisma.issue.update({
      where: { id: primaryIssueId },
      data: {
        upvotes: totalUpvotes,
        downvotes: totalDownvotes,
        confirmations: totalConfirmations,
        viewCount: totalViewCount,
      },
    });

    // Mark duplicate issues as merged (set status to DUPLICATE and link to primary)
    await prisma.issue.updateMany({
      where: { id: { in: duplicateIssueIds } },
      data: {
        status: "DUPLICATE",
        mergedIntoId: primaryIssueId,
      },
    });

    // Move comments from duplicates to primary (as system messages noting the merge)
    for (const dup of duplicates) {
      // Add a system comment to primary noting the merge
      await prisma.issueComment.create({
        data: {
          issueId: primaryIssueId,
          authorType: "system",
          authorName: "System",
          isOfficial: true,
          content: `Issue ${dup.issueNumber} was merged into this issue as a duplicate. Original title: "${dup.title}"`,
        },
      });

      // Add redirect comment to duplicate
      await prisma.issueComment.create({
        data: {
          issueId: dup.id,
          authorType: "system",
          authorName: "System",
          isOfficial: true,
          content: `This issue has been marked as a duplicate and merged into ${primaryIssue.issueNumber}. Please follow the primary issue for updates.`,
        },
      });
    }

    // Log the audit
    try {
      const admin = await prisma.admin.findUnique({ where: { email: adminEmail } });
      if (admin) {
        await prisma.auditLog.create({
          data: {
            adminId: admin.id,
            action: "MERGE_ISSUES",
            entity: "Issue",
            entityId: primaryIssueId,
            details: {
              primaryIssueId,
              mergedIssueIds: duplicateIssueIds,
              reason,
            },
            ipAddress: request.headers.get("x-forwarded-for") || "unknown",
          },
        });
      }
    } catch (auditError) {
      console.error("Failed to create audit log:", auditError);
    }

    return NextResponse.json({
      success: true,
      merge: {
        id: merge.id,
        primaryIssueId,
        mergedCount: duplicateIssueIds.length,
        aggregatedStats: {
          upvotes: totalUpvotes,
          downvotes: totalDownvotes,
          confirmations: totalConfirmations,
          viewCount: totalViewCount,
        },
      },
    });
  } catch (error) {
    console.error("Error merging issues:", error);
    return NextResponse.json({ error: "Failed to merge issues" }, { status: 500 });
  }
}

/**
 * GET /api/admin/issues/merge
 * Get list of merge history
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const adminEmail = cookieStore.get("admin_email")?.value;

    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const merges = await prisma.issueMerge.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        primaryIssue: {
          select: {
            issueNumber: true,
            title: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json({ merges });
  } catch (error) {
    console.error("Error fetching merge history:", error);
    return NextResponse.json({ error: "Failed to fetch merge history" }, { status: 500 });
  }
}
