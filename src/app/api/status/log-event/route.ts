import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/status/log-event
 * Log a service event (degradation, outage, recovery)
 * This endpoint is called by monitoring systems when they detect issues
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceSlug,
      eventType, // "degraded", "outage", "recovery", "maintenance"
      message,
      logs,
      responseTime,
      statusCode,
      error,
      source = "monitor", // "monitor", "manual", "cron"
    } = body;

    if (!serviceSlug || !eventType) {
      return NextResponse.json({ error: "Service slug and event type required" }, { status: 400 });
    }

    // Find the service
    const service = await prisma.statusService.findUnique({
      where: { slug: serviceSlug },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const now = new Date();
    let newStatus = service.status;
    let incidentCreated = false;
    let incidentId = null;

    // Determine new status based on event type
    switch (eventType) {
      case "outage":
        newStatus = "MAJOR_OUTAGE";
        break;
      case "degraded":
        newStatus = "DEGRADED";
        break;
      case "partial":
        newStatus = "PARTIAL_OUTAGE";
        break;
      case "maintenance":
        newStatus = "MAINTENANCE";
        break;
      case "recovery":
        newStatus = "OPERATIONAL";
        break;
    }

    // Log the check
    await prisma.statusCheck.create({
      data: {
        serviceId: service.id,
        status: newStatus as any,
        responseTime: responseTime || null,
        statusCode: statusCode || null,
        error: error || message || null,
        checkedFrom: source,
      },
    });

    // Update hourly metrics
    const hourBucket = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    await prisma.statusMetric.upsert({
      where: {
        serviceId_hour: {
          serviceId: service.id,
          hour: hourBucket,
        },
      },
      update: {
        checksTotal: { increment: 1 },
        checksSuccess: newStatus === "OPERATIONAL" ? { increment: 1 } : undefined,
        checksFailed: newStatus !== "OPERATIONAL" ? { increment: 1 } : undefined,
      },
      create: {
        serviceId: service.id,
        hour: hourBucket,
        checksTotal: 1,
        checksSuccess: newStatus === "OPERATIONAL" ? 1 : 0,
        checksFailed: newStatus !== "OPERATIONAL" ? 1 : 0,
        avgResponseTime: responseTime,
        uptimePercent: newStatus === "OPERATIONAL" ? 100 : 0,
      },
    });

    // If status changed to non-operational, create incident
    if (service.status === "OPERATIONAL" && newStatus !== "OPERATIONAL" && eventType !== "recovery") {
      // Check for existing active incident
      const existingIncident = await prisma.statusIncident.findFirst({
        where: {
          serviceId: service.id,
          status: { not: "RESOLVED" },
        },
      });

      if (!existingIncident) {
        // Create new incident
        const severity = eventType === "outage" ? "CRITICAL" : 
                        eventType === "partial" ? "MAJOR" : "MINOR";
        
        const incident = await prisma.statusIncident.create({
          data: {
            serviceId: service.id,
            title: `${service.name} is experiencing ${eventType === "outage" ? "an outage" : "issues"}`,
            description: message || `Automated detection: Service ${eventType}`,
            severity: severity as any,
            status: "INVESTIGATING",
            impactStart: now,
          },
        });

        // Add initial update with logs
        await prisma.incidentUpdate.create({
          data: {
            incidentId: incident.id,
            status: "INVESTIGATING",
            message: `Automated detection: ${message || eventType}${logs ? `\n\nDiagnostic logs:\n\`\`\`\n${logs.slice(0, 2000)}\n\`\`\`` : ""}`,
            authorName: "System Monitor",
          },
        });

        incidentCreated = true;
        incidentId = incident.id;

        // Notify subscribers
        const subscribers = await prisma.statusSubscriber.findMany({
          where: {
            verified: true,
            unsubscribedAt: null,
            OR: [
              { notifyAll: true },
              { notifyMajor: severity !== "MINOR" ? true : undefined },
              { notifyServices: { has: service.id } },
            ],
          },
        });

        console.log(`[INCIDENT AUTO-CREATED] ${service.name}: ${eventType} - Notifying ${subscribers.length} subscribers`);
        
        // TODO: Send actual email notifications
        // await sendIncidentNotifications(subscribers, incident, service);
      }
    }

    // If recovery, resolve any active incidents
    if (eventType === "recovery" && service.status !== "OPERATIONAL") {
      const activeIncident = await prisma.statusIncident.findFirst({
        where: {
          serviceId: service.id,
          status: { not: "RESOLVED" },
        },
      });

      if (activeIncident) {
        await prisma.statusIncident.update({
          where: { id: activeIncident.id },
          data: {
            status: "RESOLVED",
            resolvedAt: now,
            impactEnd: now,
          },
        });

        await prisma.incidentUpdate.create({
          data: {
            incidentId: activeIncident.id,
            status: "RESOLVED",
            message: "Service has recovered and is now operational.",
            authorName: "System Monitor",
          },
        });

        console.log(`[INCIDENT AUTO-RESOLVED] ${service.name} recovered`);
      }
    }

    // Update service status
    await prisma.statusService.update({
      where: { id: service.id },
      data: {
        status: newStatus as any,
        lastCheckedAt: now,
        responseTime: responseTime || service.responseTime,
        lastStatusChange: service.status !== newStatus ? now : service.lastStatusChange,
      },
    });

    return NextResponse.json({
      success: true,
      service: service.name,
      previousStatus: service.status,
      newStatus,
      incidentCreated,
      incidentId,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Error logging status event:", error);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}

/**
 * GET /api/status/log-event
 * Get recent events for a service
 */
export async function GET(request: NextRequest) {
  try {
    const serviceSlug = request.nextUrl.searchParams.get("service");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50");

    const where: any = {};
    if (serviceSlug) {
      const service = await prisma.statusService.findUnique({
        where: { slug: serviceSlug },
      });
      if (service) {
        where.serviceId = service.id;
      }
    }

    const events = await prisma.statusCheck.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        service: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
