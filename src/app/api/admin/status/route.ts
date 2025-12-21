import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Default services to seed if none exist
const DEFAULT_SERVICES = [
  { name: "Node A (Stream A)", slug: "node-a", description: "ASIC Mining Node - 10s blocks", category: "CORE", url: "https://rpc-a.pyrax.org/health", displayOrder: 1 },
  { name: "Node B (Stream B/C)", slug: "node-b", description: "GPU Mining Node - 1s blocks", category: "CORE", url: "https://rpc-b.pyrax.org/health", displayOrder: 2 },
  { name: "RPC API", slug: "rpc-api", description: "JSON-RPC Endpoint", category: "API", url: "https://rpc.pyrax.org/health", displayOrder: 3 },
  { name: "Block Explorer", slug: "explorer", description: "Blockchain Explorer", category: "WEB", url: "https://explorer.pyrax.org/api/health", displayOrder: 4 },
  { name: "Web Application", slug: "web-app", description: "pyrax.org", category: "WEB", url: "https://pyrax.org/api/health", displayOrder: 5 },
  { name: "Faucet", slug: "faucet", description: "Testnet Faucet", category: "TOOLS", url: "https://faucet.pyrax.org/api/health", displayOrder: 6 },
  { name: "Presale API", slug: "presale-api", description: "Presale Indexer", category: "API", url: "https://pyrax.org/api/presale/health", displayOrder: 7 },
  { name: "ZK Prover Network", slug: "zk-prover", description: "Zero-Knowledge Provers", category: "INFRASTRUCTURE", url: null, displayOrder: 8 },
];

/**
 * GET /api/admin/status
 * Get admin status dashboard data
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminEmail = cookieStore.get("admin_email")?.value;
    
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all services with recent checks
    const services = await prisma.statusService.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        checks: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        incidents: {
          where: { status: { not: "RESOLVED" } },
          take: 5,
        },
      },
    });

    // Get subscriber count
    const subscriberCount = await prisma.statusSubscriber.count({
      where: { verified: true, unsubscribedAt: null },
    });

    // Get active incidents count
    const activeIncidentCount = await prisma.statusIncident.count({
      where: { status: { not: "RESOLVED" } },
    });

    // Get total incidents
    const totalIncidents = await prisma.statusIncident.count();

    return NextResponse.json({
      services,
      stats: {
        subscriberCount,
        activeIncidentCount,
        totalIncidents,
        serviceCount: services.length,
      },
    });
  } catch (error) {
    console.error("Error fetching admin status:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}

/**
 * POST /api/admin/status
 * Create or update services, or seed defaults
 */
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminEmail = cookieStore.get("admin_email")?.value;
    const adminRole = cookieStore.get("admin_role")?.value;
    
    if (!adminEmail || !["SUPER_ADMIN", "ADMIN"].includes(adminRole || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, service, incident } = body;

    if (action === "seed_defaults") {
      // Seed default services
      let created = 0;
      for (const svc of DEFAULT_SERVICES) {
        const existing = await prisma.statusService.findUnique({
          where: { slug: svc.slug },
        });
        if (!existing) {
          await prisma.statusService.create({
            data: {
              ...svc,
              category: svc.category as any,
            },
          });
          created++;
        }
      }
      return NextResponse.json({ success: true, created });
    }

    if (action === "create_service" && service) {
      const newService = await prisma.statusService.create({
        data: {
          name: service.name,
          slug: service.slug,
          description: service.description,
          category: service.category,
          url: service.url,
          displayOrder: service.displayOrder || 0,
          isPublic: service.isPublic ?? true,
        },
      });
      return NextResponse.json({ success: true, service: newService });
    }

    if (action === "update_service" && service?.id) {
      const updated = await prisma.statusService.update({
        where: { id: service.id },
        data: {
          name: service.name,
          description: service.description,
          status: service.status,
          url: service.url,
          displayOrder: service.displayOrder,
          isPublic: service.isPublic,
        },
      });
      return NextResponse.json({ success: true, service: updated });
    }

    if (action === "create_incident" && incident) {
      const newIncident = await prisma.statusIncident.create({
        data: {
          serviceId: incident.serviceId || null,
          title: incident.title,
          description: incident.description,
          severity: incident.severity || "MINOR",
          status: incident.status || "INVESTIGATING",
          impactStart: incident.impactStart ? new Date(incident.impactStart) : new Date(),
        },
      });

      // Create initial update
      await prisma.incidentUpdate.create({
        data: {
          incidentId: newIncident.id,
          status: "INVESTIGATING",
          message: incident.initialMessage || "We are investigating this issue.",
          authorName: adminEmail.split("@")[0],
          authorEmail: adminEmail,
        },
      });

      // Update service status if linked
      if (incident.serviceId && incident.updateServiceStatus) {
        await prisma.statusService.update({
          where: { id: incident.serviceId },
          data: {
            status: incident.severity === "CRITICAL" ? "MAJOR_OUTAGE" :
                    incident.severity === "MAJOR" ? "PARTIAL_OUTAGE" : "DEGRADED",
            lastStatusChange: new Date(),
          },
        });
      }

      return NextResponse.json({ success: true, incident: newIncident });
    }

    if (action === "update_incident" && incident?.id) {
      const existing = await prisma.statusIncident.findUnique({
        where: { id: incident.id },
      });

      if (!existing) {
        return NextResponse.json({ error: "Incident not found" }, { status: 404 });
      }

      const updates: any = {};
      if (incident.title) updates.title = incident.title;
      if (incident.description) updates.description = incident.description;
      if (incident.severity) updates.severity = incident.severity;
      if (incident.status) {
        updates.status = incident.status;
        if (incident.status === "RESOLVED") {
          updates.resolvedAt = new Date();
          updates.impactEnd = new Date();
        }
      }
      if (incident.postmortem) updates.postmortem = incident.postmortem;

      const updated = await prisma.statusIncident.update({
        where: { id: incident.id },
        data: updates,
      });

      // Add update entry if message provided
      if (incident.updateMessage) {
        await prisma.incidentUpdate.create({
          data: {
            incidentId: incident.id,
            status: incident.status || existing.status,
            message: incident.updateMessage,
            authorName: adminEmail.split("@")[0],
            authorEmail: adminEmail,
          },
        });
      }

      // Restore service status if resolved
      if (incident.status === "RESOLVED" && existing.serviceId) {
        await prisma.statusService.update({
          where: { id: existing.serviceId },
          data: {
            status: "OPERATIONAL",
            lastStatusChange: new Date(),
          },
        });
      }

      return NextResponse.json({ success: true, incident: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in admin status action:", error);
    return NextResponse.json({ error: "Failed to perform action" }, { status: 500 });
  }
}
