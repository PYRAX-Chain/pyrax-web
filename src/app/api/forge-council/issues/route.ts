import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

// Generate issue number
function generateIssueNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = randomBytes(3).toString("hex").toUpperCase();
  return `IC-${year}${month}-${random}`;
}

// Generate URL-friendly slug
function generateSlug(title: string, issueNumber: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  return `${slug}-${issueNumber.toLowerCase()}`;
}

// GET - List all public issues
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build where clause
    const where: any = { isPublic: true };
    if (category) where.category = category;
    if (status) where.status = status;

    // Build orderBy - avoid complex orderBy that may cause issues
    let orderBy: any = { createdAt: "desc" };
    switch (sort) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "most-votes":
        orderBy = { upvotes: "desc" };
        break;
      case "most-confirmations":
        orderBy = { confirmations: "desc" };
        break;
      case "most-comments":
        orderBy = { createdAt: "desc" }; // Fallback to newest for comments
        break;
    }

    let issues: any[] = [];
    let total = 0;
    let openCount = 0;
    let fixedCount = 0;
    let totalConfirmationsSum = 0;

    try {
      [issues, total] = await Promise.all([
        prisma.issue.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
          select: {
            id: true,
            issueNumber: true,
            slug: true,
            title: true,
            summary: true,
            category: true,
            severity: true,
            status: true,
            upvotes: true,
            downvotes: true,
            confirmations: true,
            viewCount: true,
            createdAt: true,
            reporterName: true,
          },
        }),
        prisma.issue.count({ where }),
      ]);

      // Get stats
      [openCount, fixedCount] = await Promise.all([
        prisma.issue.count({ where: { isPublic: true, status: { in: ["NEW", "CONFIRMED", "INVESTIGATING", "IN_PROGRESS"] } } }),
        prisma.issue.count({ where: { isPublic: true, status: "FIXED" } }),
      ]);

      const totalConfirmations = await prisma.issue.aggregate({ 
        where: { isPublic: true }, 
        _sum: { confirmations: true } 
      });
      totalConfirmationsSum = totalConfirmations._sum.confirmations || 0;
    } catch (e) {
      console.error("Database query failed:", e);
    }

    return NextResponse.json({
      issues: issues.map(issue => ({
        ...issue,
        _count: { comments: 0 }, // Default for now
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        total,
        open: openCount,
        fixed: fixedCount,
        confirmations: totalConfirmationsSum,
      },
    });
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    return NextResponse.json({ 
      issues: [],
      total: 0,
      page: 1,
      totalPages: 0,
      stats: { total: 0, open: 0, fixed: 0, confirmations: 0 },
      error: "Failed to fetch issues" 
    }, { status: 200 }); // Return 200 with empty data instead of 500
  }
}

// POST - Create a new issue
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      summary,
      description,
      stepsToReproduce,
      expectedBehavior,
      actualBehavior,
      category,
      severity,
      component,
      environment,
      version,
      reporterName,
      reporterEmail,
      reporterWallet,
      logs,
      source = "forge-council",
      sourceVersion,
      attachments = [],
    } = body;

    if (!title || !summary || !description) {
      return NextResponse.json(
        { error: "Title, summary, and description are required" },
        { status: 400 }
      );
    }

    const issueNumber = generateIssueNumber();
    const slug = generateSlug(title, issueNumber);

    const issue = await prisma.issue.create({
      data: {
        issueNumber,
        slug,
        source,
        sourceVersion,
        title,
        summary,
        description,
        stepsToReproduce,
        expectedBehavior,
        actualBehavior,
        logs,
        category: category || "BUG",
        severity: severity || "MODERATE",
        component,
        environment,
        version,
        reporterName,
        reporterEmail,
        reporterWallet,
        status: "NEW",
        priority: "MEDIUM",
      },
    });

    // Create attachment records if any were uploaded
    if (attachments && attachments.length > 0) {
      await prisma.issueAttachment.createMany({
        data: attachments.map((att: { url: string; filename: string; size: number; type: string }) => ({
          issueId: issue.id,
          fileName: att.filename,
          fileType: att.type,
          fileSize: att.size,
          url: att.url,
        })),
      });
    }

    return NextResponse.json({
      success: true,
      issue: {
        id: issue.id,
        issueNumber: issue.issueNumber,
        slug: issue.slug,
      },
    });
  } catch (error: any) {
    console.error("Failed to create issue:", error);
    // Return more specific error for debugging
    const errorMessage = error?.message || "Failed to create issue";
    const errorCode = error?.code || "UNKNOWN";
    return NextResponse.json({ 
      error: "Failed to create issue",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      code: errorCode
    }, { status: 500 });
  }
}
