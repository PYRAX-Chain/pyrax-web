import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Add a message to a ticket (from the desktop app user)
export async function POST(request: NextRequest) {
  try {
    const { ticketNumber, message } = await request.json();

    if (!ticketNumber || !message) {
      return NextResponse.json({ error: "Ticket number and message are required" }, { status: 400 });
    }

    // Find the ticket
    const ticket = await prisma.bugReport.findUnique({
      where: { ticketNumber },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Add the message
    const msg = await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        sender: "user",
        senderName: ticket.reporterName || ticket.reporterEmail || "User",
        message,
      },
    });

    // Update ticket status if it was waiting for user
    if (ticket.status === "WAITING_FOR_USER" || ticket.status === "RESOLVED") {
      await prisma.bugReport.update({
        where: { id: ticket.id },
        data: { status: "OPEN" },
      });
    }

    return NextResponse.json({
      success: true,
      message: msg,
    });
  } catch (error) {
    console.error("Message submission error:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
