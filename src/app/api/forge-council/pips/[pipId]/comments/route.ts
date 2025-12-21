import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/forge-council/pips/[pipId]/comments
 * Fetch comments for a PIP (shared between web and desktop)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pipId: string }> }
) {
  try {
    const { pipId } = await params;

    const comments = await prisma.pipComment.findMany({
      where: {
        pipId,
        parentId: null, // Top-level comments only
        isHidden: false,
      },
      orderBy: [
        { isPinned: "desc" },
        { createdAt: "asc" },
      ],
      include: {
        replies: {
          where: { isHidden: false },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json({
      comments: comments.map((c) => ({
        id: c.id,
        content: c.content,
        authorType: c.authorType,
        authorWallet: c.authorWallet,
        authorName: c.authorName,
        isOfficial: c.isOfficial,
        isPinned: c.isPinned,
        source: c.source,
        createdAt: c.createdAt,
        replies: c.replies.map((r) => ({
          id: r.id,
          content: r.content,
          authorType: r.authorType,
          authorWallet: r.authorWallet,
          authorName: r.authorName,
          isOfficial: r.isOfficial,
          source: r.source,
          createdAt: r.createdAt,
        })),
      })),
    });
  } catch (error) {
    console.error("Error fetching PIP comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments", comments: [] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/forge-council/pips/[pipId]/comments
 * Add a comment to a PIP (from web or desktop app)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ pipId: string }> }
) {
  try {
    const { pipId } = await params;
    const body = await request.json();
    const {
      content,
      parentId,
      authorType = "wallet",
      authorWallet,
      authorName,
      authorEmail,
      source = "web",
    } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    // Verify PIP exists
    const pip = await prisma.pip.findUnique({ where: { id: pipId } });
    if (!pip) {
      return NextResponse.json({ error: "PIP not found" }, { status: 404 });
    }

    // Create comment
    const comment = await prisma.pipComment.create({
      data: {
        pipId,
        parentId,
        content: content.trim(),
        authorType,
        authorWallet,
        authorName,
        authorEmail,
        source,
      },
    });

    return NextResponse.json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        authorType: comment.authorType,
        authorWallet: comment.authorWallet,
        authorName: comment.authorName,
        source: comment.source,
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating PIP comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
