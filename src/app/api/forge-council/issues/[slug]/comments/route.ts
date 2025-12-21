import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Check if admin
async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  
  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { admin: true },
  });
  
  if (!session || session.expiresAt < new Date()) return null;
  return session.admin;
}

// GET - Get comments for an issue
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const issue = await prisma.issue.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const comments = await prisma.issueComment.findMany({
      where: { issueId: issue.id, parentId: null, isHidden: false },
      orderBy: { createdAt: "asc" },
      include: {
        replies: {
          where: { isHidden: false },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST - Add a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { content, authorName, authorEmail, authorWallet, parentId } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: { slug },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Check if admin
    const admin = await checkAdmin();
    const isOfficial = !!admin;
    const authorType = admin ? "admin" : (authorWallet === issue.reporterWallet ? "reporter" : "user");

    const comment = await prisma.issueComment.create({
      data: {
        issueId: issue.id,
        parentId: parentId || null,
        authorType,
        authorName: admin ? "PYRAX Team" : authorName,
        authorEmail: admin ? admin.email : authorEmail,
        authorWallet,
        isOfficial,
        content: content.trim(),
      },
    });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error("Failed to add comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
