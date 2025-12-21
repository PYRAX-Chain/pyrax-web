import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/status
 * Get current system status overview
 */
export async function GET(request: NextRequest) {
  try {
    // Get all public services with their current status
    const services = await prisma.statusService.findMany({
      where: { isPublic: true },
      orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        status: true,
        lastCheckedAt: true,
        responseTime: true,
        uptimePercent: true,
        uptimeDay: true,
        uptimeWeek: true,
        uptimeMonth: true,
      },
    });

    // Get active incidents
    const activeIncidents = await prisma.statusIncident.findMany({
      where: {
        status: { not: "RESOLVED" },
      },
      orderBy: { impactStart: "desc" },
      include: {
        service: {
          select: { name: true, slug: true },
        },
        updates: {
          orderBy: { createdAt: "desc" },
          take: 3,
        },
      },
    });

    // Get recent resolved incidents (last 7 days)
    const recentIncidents = await prisma.statusIncident.findMany({
      where: {
        status: "RESOLVED",
        resolvedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { resolvedAt: "desc" },
      take: 10,
      include: {
        service: {
          select: { name: true, slug: true },
        },
      },
    });

    // Calculate overall system status
    const statusPriority: Record<string, number> = {
      MAJOR_OUTAGE: 4,
      PARTIAL_OUTAGE: 3,
      DEGRADED: 2,
      MAINTENANCE: 1,
      OPERATIONAL: 0,
      UNKNOWN: 0,
    };

    let overallStatus = "OPERATIONAL";
    let maxPriority = 0;

    for (const service of services) {
      const priority = statusPriority[service.status] || 0;
      if (priority > maxPriority) {
        maxPriority = priority;
        overallStatus = service.status;
      }
    }

    // If there are active incidents, use the highest severity
    if (activeIncidents.length > 0) {
      const severityMap: Record<string, string> = {
        CRITICAL: "MAJOR_OUTAGE",
        MAJOR: "PARTIAL_OUTAGE",
        MINOR: "DEGRADED",
      };
      for (const incident of activeIncidents) {
        const status = severityMap[incident.severity] || "DEGRADED";
        const priority = statusPriority[status] || 0;
        if (priority > maxPriority) {
          maxPriority = priority;
          overallStatus = status;
        }
      }
    }

    // Calculate overall uptime
    const avgUptime = services.length > 0
      ? services.reduce((sum, s) => sum + s.uptimeMonth, 0) / services.length
      : 100;

    return NextResponse.json({
      overall: {
        status: overallStatus,
        uptimePercent: Math.round(avgUptime * 100) / 100,
        lastUpdated: new Date().toISOString(),
      },
      services,
      activeIncidents,
      recentIncidents,
    });
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
