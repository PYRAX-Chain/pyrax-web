import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Check admin auth
async function checkAuth() {
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

// GET - List all issues for admin
export async function GET(request: NextRequest) {
  const admin = await checkAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: any = {};
  if (status) where.status = status;

  const [issues, total] = await Promise.all([
    prisma.issue.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        comments: {
          orderBy: { createdAt: "asc" },
          where: { isHidden: false },
        },
        _count: {
          select: { comments: true, confirmers: true, votes: true },
        },
      },
    }),
    prisma.issue.count({ where }),
  ]);

  return NextResponse.json({
    issues,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// POST - Update issue or perform actions
export async function POST(request: NextRequest) {
  const admin = await checkAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { issueId, action, status, priority } = await request.json();

  if (action === "update") {
    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (status === "FIXED" || status === "CLOSED") {
      updateData.resolvedAt = new Date();
    }

    const issue = await prisma.issue.update({
      where: { id: issueId },
      data: updateData,
    });

    return NextResponse.json({ success: true, issue });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
