import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/status/services/[slug]
 * Get detailed status for a specific service including uptime history
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const days = parseInt(request.nextUrl.searchParams.get("days") || "90");

    // Get service details
    const service = await prisma.statusService.findUnique({
      where: { slug },
      include: {
        incidents: {
          where: {
            impactStart: {
              gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
            },
          },
          orderBy: { impactStart: "desc" },
          include: {
            updates: {
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Get hourly metrics for uptime chart (last 90 days)
    const metrics = await prisma.statusMetric.findMany({
      where: {
        serviceId: service.id,
        hour: {
          gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { hour: "asc" },
    });

    // Get recent checks for detailed view
    const recentChecks = await prisma.statusCheck.findMany({
      where: { serviceId: service.id },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    // Calculate daily uptime for chart
    const dailyUptime: { date: string; uptime: number; avgResponseTime: number | null }[] = [];
    const dailyData: Record<string, { success: number; total: number; responseTime: number[] }> = {};

    for (const metric of metrics) {
      const date = metric.hour.toISOString().split("T")[0];
      if (!dailyData[date]) {
        dailyData[date] = { success: 0, total: 0, responseTime: [] };
      }
      dailyData[date].success += metric.checksSuccess;
      dailyData[date].total += metric.checksTotal;
      if (metric.avgResponseTime) {
        dailyData[date].responseTime.push(metric.avgResponseTime);
      }
    }

    for (const [date, data] of Object.entries(dailyData)) {
      dailyUptime.push({
        date,
        uptime: data.total > 0 ? (data.success / data.total) * 100 : 100,
        avgResponseTime: data.responseTime.length > 0
          ? Math.round(data.responseTime.reduce((a, b) => a + b, 0) / data.responseTime.length)
          : null,
      });
    }

    return NextResponse.json({
      service: {
        id: service.id,
        name: service.name,
        slug: service.slug,
        description: service.description,
        category: service.category,
        status: service.status,
        lastCheckedAt: service.lastCheckedAt,
        responseTime: service.responseTime,
        uptimePercent: service.uptimePercent,
        uptimeDay: service.uptimeDay,
        uptimeWeek: service.uptimeWeek,
        uptimeMonth: service.uptimeMonth,
      },
      dailyUptime,
      incidents: service.incidents,
      recentChecks: recentChecks.map((c) => ({
        id: c.id,
        status: c.status,
        responseTime: c.responseTime,
        statusCode: c.statusCode,
        error: c.error,
        createdAt: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching service status:", error);
    return NextResponse.json({ error: "Failed to fetch service status" }, { status: 500 });
  }
}
