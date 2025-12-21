import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const REQUIRED_APPROVALS = parseInt(process.env.TREASURY_REQUIRED_APPROVALS || "2");
const TIMELOCK_HOURS = parseInt(process.env.TREASURY_TIMELOCK_HOURS || "48");

// Shared in-memory storage (in production, use database)
declare global {
  var treasuryRequests: any[];
}
if (!global.treasuryRequests) global.treasuryRequests = [];

export async function POST(request: Request) {
  try {
    const { amount, recipient, reason } = await request.json();

    if (!amount || !recipient || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
      return NextResponse.json({ error: "Invalid recipient address" }, { status: 400 });
    }

    const timelockEnds = new Date(Date.now() + TIMELOCK_HOURS * 60 * 60 * 1000);

    const newRequest = {
      id: uuidv4(),
      amount,
      recipient,
      reason,
      requestedBy: "Admin", // In production, get from session
      requestedAt: new Date().toISOString(),
      timelockEnds: timelockEnds.toISOString(),
      status: "pending",
      approvals: [],
      requiredApprovals: REQUIRED_APPROVALS,
    };

    global.treasuryRequests.push(newRequest);

    return NextResponse.json({ success: true, request: newRequest });
  } catch (error) {
    console.error("Failed to create withdrawal request:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
