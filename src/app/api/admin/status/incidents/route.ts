import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/status/incidents
 * Get all incidents for admin management
 */
export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status");
    const serviceId = request.nextUrl.searchParams.get("serviceId");
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");

    const where: any = {};
    if (status) where.status = status;
    if (serviceId) where.serviceId = serviceId;

    const [incidents, total] = await Promise.all([
      prisma.statusIncident.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          service: { select: { name: true, slug: true } },
          updates: { orderBy: { createdAt: "desc" } },
        },
      }),
      prisma.statusIncident.count({ where }),
    ]);

    // Get services for dropdown
    const services = await prisma.statusService.findMany({
      orderBy: { displayOrder: "asc" },
      select: { id: true, name: true, slug: true, status: true },
    });

    return NextResponse.json({
      incidents,
      services,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}

/**
 * POST /api/admin/status/incidents
 * Create a new incident (manual or automatic)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceId,
      title,
      description,
      severity = "MINOR",
      status = "INVESTIGATING",
      isAutomatic = false,
      logs,
      updateServiceStatus = true,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }

    // Create the incident
    const incident = await prisma.statusIncident.create({
      data: {
        serviceId: serviceId || null,
        title,
        description,
        severity: severity as any,
        status: status as any,
        impactStart: new Date(),
      },
    });

    // Create initial update
    await prisma.incidentUpdate.create({
      data: {
        incidentId: incident.id,
        status: status as any,
        message: isAutomatic 
          ? `Automated detection: ${description}${logs ? `\n\nLogs:\n${logs}` : ""}`
          : description,
        authorName: isAutomatic ? "System Monitor" : "Admin",
      },
    });

    // Update service status if requested
    if (updateServiceStatus && serviceId) {
      const newStatus = severity === "CRITICAL" ? "MAJOR_OUTAGE" :
                       severity === "MAJOR" ? "PARTIAL_OUTAGE" : "DEGRADED";
      
      await prisma.statusService.update({
        where: { id: serviceId },
        data: {
          status: newStatus as any,
          lastStatusChange: new Date(),
        },
      });
    }

    // Get subscribers to notify
    const subscribers = await prisma.statusSubscriber.findMany({
      where: {
        verified: true,
        unsubscribedAt: null,
        OR: [
          { notifyAll: true },
          { notifyMajor: true, ...(severity !== "MINOR" ? {} : { notifyMajor: false }) },
          serviceId ? { notifyServices: { has: serviceId } } : {},
        ],
      },
    });

    // TODO: Send email notifications to subscribers
    console.log(`[INCIDENT] Created: ${title} - Notifying ${subscribers.length} subscribers`);

    return NextResponse.json({
      success: true,
      incident,
      notifiedCount: subscribers.length,
    });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json({ error: "Failed to create incident" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/status/incidents
 * Update an incident (add update, change status, resolve)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      incidentId,
      status,
      updateMessage,
      postmortem,
      resolveService = true,
    } = body;

    if (!incidentId) {
      return NextResponse.json({ error: "Incident ID required" }, { status: 400 });
    }

    const incident = await prisma.statusIncident.findUnique({
      where: { id: incidentId },
      include: { service: true },
    });

    if (!incident) {
      return NextResponse.json({ error: "Incident not found" }, { status: 404 });
    }

    // Update incident
    const updates: any = {};
    if (status) {
      updates.status = status;
      if (status === "RESOLVED") {
        updates.resolvedAt = new Date();
        updates.impactEnd = new Date();
      }
    }
    if (postmortem) updates.postmortem = postmortem;

    const updatedIncident = await prisma.statusIncident.update({
      where: { id: incidentId },
      data: updates,
    });

    // Create update entry if message provided
    if (updateMessage) {
      await prisma.incidentUpdate.create({
        data: {
          incidentId,
          status: status || incident.status,
          message: updateMessage,
          authorName: "Admin",
        },
      });
    }

    // Restore service status if resolved
    if (status === "RESOLVED" && resolveService && incident.serviceId) {
      await prisma.statusService.update({
        where: { id: incident.serviceId },
        data: {
          status: "OPERATIONAL",
          lastStatusChange: new Date(),
        },
      });
    }

    // Notify subscribers of update
    const subscribers = await prisma.statusSubscriber.findMany({
      where: {
        verified: true,
        unsubscribedAt: null,
      },
    });

    console.log(`[INCIDENT UPDATE] ${incident.title} -> ${status || incident.status} - Notifying ${subscribers.length}`);

    return NextResponse.json({
      success: true,
      incident: updatedIncident,
      notifiedCount: subscribers.length,
    });
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json({ error: "Failed to update incident" }, { status: 500 });
  }
}
