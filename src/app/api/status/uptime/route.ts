import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/status/uptime
 * Get uptime data for charts (last 90 days by default)
 */
export async function GET(request: NextRequest) {
  try {
    const days = parseInt(request.nextUrl.searchParams.get("days") || "90");
    const serviceSlug = request.nextUrl.searchParams.get("service");

    // Get services
    let services;
    if (serviceSlug) {
      const service = await prisma.statusService.findUnique({
        where: { slug: serviceSlug },
      });
      services = service ? [service] : [];
    } else {
      services = await prisma.statusService.findMany({
        where: { isPublic: true },
        orderBy: { displayOrder: "asc" },
      });
    }

    if (services.length === 0) {
      return NextResponse.json({ error: "No services found" }, { status: 404 });
    }

    // Get metrics for the time range
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const metrics = await prisma.statusMetric.findMany({
      where: {
        serviceId: { in: services.map((s) => s.id) },
        hour: { gte: startDate },
      },
      orderBy: { hour: "asc" },
    });

    // Aggregate by day per service
    const dailyByService: Record<string, Record<string, { 
      success: number; 
      total: number; 
      responseTime: number[];
      statuses: string[];
    }>> = {};

    for (const service of services) {
      dailyByService[service.id] = {};
    }

    for (const metric of metrics) {
      const date = metric.hour.toISOString().split("T")[0];
      if (!dailyByService[metric.serviceId][date]) {
        dailyByService[metric.serviceId][date] = {
          success: 0,
          total: 0,
          responseTime: [],
          statuses: [],
        };
      }
      dailyByService[metric.serviceId][date].success += metric.checksSuccess;
      dailyByService[metric.serviceId][date].total += metric.checksTotal;
      if (metric.avgResponseTime) {
        dailyByService[metric.serviceId][date].responseTime.push(metric.avgResponseTime);
      }
    }

    // Build chart data
    const chartData: {
      date: string;
      services: Record<string, { uptime: number; responseTime: number | null; status: string }>;
      overallUptime: number;
    }[] = [];

    // Generate all dates in range
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      dates.push(date.toISOString().split("T")[0]);
    }

    for (const date of dates) {
      const dayData: Record<string, { uptime: number; responseTime: number | null; status: string }> = {};
      let totalUptime = 0;
      let serviceCount = 0;

      for (const service of services) {
        const data = dailyByService[service.id][date];
        const uptime = data && data.total > 0 ? (data.success / data.total) * 100 : 100;
        const responseTime = data && data.responseTime.length > 0
          ? Math.round(data.responseTime.reduce((a, b) => a + b, 0) / data.responseTime.length)
          : null;
        
        // Determine status color
        let status = "operational";
        if (uptime < 99) status = "degraded";
        if (uptime < 95) status = "partial";
        if (uptime < 90) status = "major";

        dayData[service.slug] = { uptime, responseTime, status };
        totalUptime += uptime;
        serviceCount++;
      }

      chartData.push({
        date,
        services: dayData,
        overallUptime: serviceCount > 0 ? totalUptime / serviceCount : 100,
      });
    }

    // Calculate summary stats
    const summary = services.map((service) => {
      const serviceData = chartData.map((d) => d.services[service.slug]?.uptime || 100);
      const avgUptime = serviceData.reduce((a, b) => a + b, 0) / serviceData.length;
      const downDays = serviceData.filter((u) => u < 99).length;
      
      return {
        id: service.id,
        name: service.name,
        slug: service.slug,
        avgUptime: Math.round(avgUptime * 100) / 100,
        downDays,
        currentStatus: service.status,
      };
    });

    return NextResponse.json({
      chartData,
      summary,
      range: {
        start: startDate.toISOString(),
        end: new Date().toISOString(),
        days,
      },
    });
  } catch (error) {
    console.error("Error fetching uptime data:", error);
    return NextResponse.json({ error: "Failed to fetch uptime data" }, { status: 500 });
  }
}
