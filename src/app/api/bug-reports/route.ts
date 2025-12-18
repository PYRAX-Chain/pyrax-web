import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

// Generate ticket number
function generateTicketNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = randomBytes(3).toString("hex").toUpperCase();
  return `PYX-${year}${month}-${random}`;
}

// POST - Submit a new bug report (public endpoint for the app)
export async function POST(request: NextRequest) {
  try {
    const { source, sourceVersion, reporterEmail, reporterName, title, description, logs } = await request.json();

    if (!source || !title || !description) {
      return NextResponse.json({ error: "Source, title, and description are required" }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();

    const report = await prisma.bugReport.create({
      data: {
        ticketNumber,
        source,
        sourceVersion,
        reporterEmail: reporterEmail || null,
        reporterName: reporterName || null,
        title,
        description,
        logs: logs || null,
        status: "OPEN",
        priority: "MEDIUM",
      },
    });

    return NextResponse.json({
      success: true,
      ticketNumber: report.ticketNumber,
      ticketId: report.id,
    });
  } catch (error) {
    console.error("Bug report submission error:", error);
    return NextResponse.json({ error: "Failed to submit bug report" }, { status: 500 });
  }
}

// GET - Get ticket status and messages (for the app)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketNumber = searchParams.get("ticket");

  if (!ticketNumber) {
    return NextResponse.json({ error: "Ticket number required" }, { status: 400 });
  }

  const report = await prisma.bugReport.findUnique({
    where: { ticketNumber },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!report) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json({ report });
}
