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

// GET - List all bug reports
export async function GET(request: NextRequest) {
  const admin = await checkAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where = status ? { status: status as any } : {};

  const [reports, total] = await Promise.all([
    prisma.bugReport.findMany({
      where,
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.bugReport.count({ where }),
  ]);

  return NextResponse.json({
    reports,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// POST - Update ticket status or add message
export async function POST(request: NextRequest) {
  const admin = await checkAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ticketId, action, status, priority, message } = await request.json();

  if (action === "update-status") {
    const report = await prisma.bugReport.update({
      where: { id: ticketId },
      data: {
        status,
        priority,
        resolvedAt: status === "RESOLVED" || status === "CLOSED" ? new Date() : null,
      },
    });
    return NextResponse.json({ success: true, report });
  }

  if (action === "add-message") {
    const msg = await prisma.ticketMessage.create({
      data: {
        ticketId,
        sender: "admin",
        senderName: admin.email,
        message,
      },
    });

    // Update ticket status to indicate admin response
    await prisma.bugReport.update({
      where: { id: ticketId },
      data: { status: "WAITING_FOR_USER" },
    });

    return NextResponse.json({ success: true, message: msg });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
