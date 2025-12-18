import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// Check admin auth (SUPER_ADMIN only for whitelist management)
async function checkSuperAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  
  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { admin: true },
  });
  
  if (!session || session.expiresAt < new Date()) return null;
  if (session.admin.role !== "SUPER_ADMIN") return null;
  return session.admin;
}

// GET - List all whitelisted admins
export async function GET() {
  const admin = await checkSuperAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized - SUPER_ADMIN required" }, { status: 401 });
  }

  const whitelist = await prisma.adminWhitelist.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      createdBy: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ whitelist });
}

// POST - Add new admin to whitelist
export async function POST(request: NextRequest) {
  const admin = await checkSuperAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized - SUPER_ADMIN required" }, { status: 401 });
  }

  const { email, password, role } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  // Check if already exists
  const existing = await prisma.adminWhitelist.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "Email already whitelisted" }, { status: 400 });
  }

  // Hash password
  const passwordHash = bcrypt.hashSync(password, 10);

  const newAdmin = await prisma.adminWhitelist.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      role: role || "ADMIN",
      createdBy: admin.email,
    },
  });

  // Log audit
  await prisma.auditLog.create({
    data: {
      adminId: admin.id,
      action: "WHITELIST_ADD",
      entity: "AdminWhitelist",
      entityId: newAdmin.id,
      details: { email: newAdmin.email, role: newAdmin.role },
    },
  });

  return NextResponse.json({
    success: true,
    admin: {
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role,
    },
  });
}

// DELETE - Remove admin from whitelist
export async function DELETE(request: NextRequest) {
  const admin = await checkSuperAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized - SUPER_ADMIN required" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  // Can't delete yourself
  const toDelete = await prisma.adminWhitelist.findUnique({ where: { id } });
  if (toDelete?.email === admin.email) {
    return NextResponse.json({ error: "Cannot remove yourself" }, { status: 400 });
  }

  await prisma.adminWhitelist.delete({ where: { id } });

  // Log audit
  await prisma.auditLog.create({
    data: {
      adminId: admin.id,
      action: "WHITELIST_REMOVE",
      entity: "AdminWhitelist",
      entityId: id,
      details: { email: toDelete?.email },
    },
  });

  return NextResponse.json({ success: true });
}
