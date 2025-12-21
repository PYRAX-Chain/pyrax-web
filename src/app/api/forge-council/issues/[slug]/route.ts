import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get single issue by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    
    const issue = await prisma.issue.findUnique({
      where: { slug },
      include: {
        votes: true,
        confirmers: {
          orderBy: { createdAt: "desc" },
        },
        comments: {
          where: { isHidden: false },
          orderBy: { createdAt: "asc" },
          include: {
            replies: {
              where: { isHidden: false },
              orderBy: { createdAt: "asc" },
            },
          },
        },
        _count: {
          select: { comments: true, confirmers: true, votes: true },
        },
      },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.issue.update({
      where: { id: issue.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({ issue });
  } catch (error) {
    console.error("Failed to fetch issue:", error);
    return NextResponse.json({ error: "Failed to fetch issue" }, { status: 500 });
  }
}
