import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/forge-council/pips
 * Fetch PIPs with filtering and sorting
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") || "newest";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build where clause
    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    // Build order by
    let orderBy: any = { createdAt: "desc" };
    switch (sort) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "most-votes":
        orderBy = { forVotes: "desc" };
        break;
      case "most-comments":
        orderBy = { comments: { _count: "desc" } };
        break;
    }

    // Fetch PIPs
    const [pips, total, active, passed] = await Promise.all([
      prisma.pip.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
        include: {
          _count: {
            select: { comments: true, votes: true },
          },
        },
      }),
      prisma.pip.count({ where }),
      prisma.pip.count({ where: { status: "ACTIVE" } }),
      prisma.pip.count({ where: { status: { in: ["PASSED", "IMPLEMENTED"] } } }),
    ]);

    return NextResponse.json({
      pips: pips.map((pip) => ({
        id: pip.id,
        pipNumber: pip.pipNumber,
        slug: pip.slug,
        title: pip.title,
        summary: pip.summary,
        category: pip.category,
        status: pip.status,
        forVotes: pip.forVotes.toString(),
        againstVotes: pip.againstVotes.toString(),
        totalVoters: pip.totalVoters,
        viewCount: pip.viewCount,
        votingEndsAt: pip.votingEndsAt,
        createdAt: pip.createdAt,
        authorName: pip.authorName,
        _count: pip._count,
      })),
      stats: {
        total,
        active,
        passed,
      },
      pagination: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Error fetching PIPs:", error);
    return NextResponse.json(
      { error: "Failed to fetch PIPs", pips: [], stats: { total: 0, active: 0, passed: 0 } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/forge-council/pips
 * Create a new PIP (from desktop app or web)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      summary,
      motivation,
      specification,
      rationale,
      implementation,
      discussionLink,
      category,
      votingDurationDays,
      quorumPercent,
      authorWallet,
      authorName,
      authorEmail,
      status = "DRAFT",
    } = body;

    // Validate required fields
    if (!title || !summary || !motivation || !specification) {
      return NextResponse.json(
        { error: "Missing required fields: title, summary, motivation, specification" },
        { status: 400 }
      );
    }

    // Generate PIP number
    const lastPip = await prisma.pip.findFirst({
      orderBy: { pipNumber: "desc" },
    });
    const nextNum = lastPip
      ? parseInt(lastPip.pipNumber.replace("PIP-", "")) + 1
      : 1;
    const pipNumber = `PIP-${nextNum.toString().padStart(4, "0")}`;

    // Generate slug
    const slug = `${pipNumber.toLowerCase()}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .substring(0, 50)}`;

    // Create PIP
    const pip = await prisma.pip.create({
      data: {
        pipNumber,
        slug,
        title,
        summary,
        motivation,
        specification,
        rationale,
        implementation,
        discussionLink,
        category: category || "PROTOCOL",
        votingDurationDays: votingDurationDays || 7,
        quorumPercent: quorumPercent || 20,
        authorWallet,
        authorName,
        authorEmail,
        status,
        votingStartedAt: status === "ACTIVE" ? new Date() : null,
        votingEndsAt:
          status === "ACTIVE"
            ? new Date(Date.now() + (votingDurationDays || 7) * 24 * 60 * 60 * 1000)
            : null,
      },
    });

    return NextResponse.json({
      success: true,
      pip: {
        id: pip.id,
        pipNumber: pip.pipNumber,
        slug: pip.slug,
        status: pip.status,
      },
    });
  } catch (error) {
    console.error("Error creating PIP:", error);
    return NextResponse.json(
      { error: "Failed to create PIP" },
      { status: 500 }
    );
  }
}
