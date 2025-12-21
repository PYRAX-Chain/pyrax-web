import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Try database session first
    try {
      const session = await prisma.adminSession.findUnique({
        where: { token },
        include: { admin: true },
      });

      if (session && session.expiresAt >= new Date() && session.admin.active) {
        return NextResponse.json({
          admin: {
            id: session.admin.id,
            email: session.admin.email,
            name: session.admin.name,
            role: session.admin.role,
          },
        });
      }
    } catch {
      // Database unavailable, fall back to cookie-based auth
    }

    // Fallback: check cookie-based session
    const adminEmail = cookieStore.get("admin_email")?.value;
    const adminRole = cookieStore.get("admin_role")?.value;

    if (adminEmail && adminRole) {
      return NextResponse.json({
        admin: {
          id: "cookie-session",
          email: adminEmail,
          name: null,
          role: adminRole,
        },
      });
    }

    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
