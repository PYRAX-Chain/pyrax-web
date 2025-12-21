import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/status/incidents
 * Get incident history with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");
    const status = request.nextUrl.searchParams.get("status");
    const serviceId = request.nextUrl.searchParams.get("serviceId");

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (serviceId) {
      where.serviceId = serviceId;
    }

    const [incidents, total] = await Promise.all([
      prisma.statusIncident.findMany({
        where,
        orderBy: { impactStart: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          service: {
            select: { name: true, slug: true },
          },
          updates: {
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.statusIncident.count({ where }),
    ]);

    return NextResponse.json({
      incidents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}
