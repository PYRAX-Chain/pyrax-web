import { NextResponse } from "next/server";

declare global {
  var treasuryRequests: any[];
}
if (!global.treasuryRequests) global.treasuryRequests = [];

export async function POST(request: Request) {
  try {
    const { requestId } = await request.json();

    const req = global.treasuryRequests.find(r => r.id === requestId);
    if (!req) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (req.status !== "approved" && req.status !== "pending") {
      return NextResponse.json({ error: "Request cannot be executed" }, { status: 400 });
    }

    // Check timelock
    if (new Date(req.timelockEnds) > new Date()) {
      return NextResponse.json({ error: "Timelock not expired" }, { status: 400 });
    }

    // Check approvals
    if (req.approvals.length < req.requiredApprovals) {
      return NextResponse.json({ error: "Not enough approvals" }, { status: 400 });
    }

    // In production, execute the actual blockchain transaction here
    req.status = "executed";
    req.executedAt = new Date().toISOString();

    return NextResponse.json({ success: true, request: req });
  } catch (error) {
    console.error("Failed to execute request:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
