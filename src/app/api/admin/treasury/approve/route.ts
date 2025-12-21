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

    if (req.status !== "pending") {
      return NextResponse.json({ error: "Request is not pending" }, { status: 400 });
    }

    // In production, verify the signer's wallet signature
    const signerAddress = "Admin"; // Would come from authenticated session
    
    if (!req.approvals.includes(signerAddress)) {
      req.approvals.push(signerAddress);
    }

    // Check if we have enough approvals
    if (req.approvals.length >= req.requiredApprovals) {
      req.status = "approved";
    }

    return NextResponse.json({ success: true, request: req });
  } catch (error) {
    console.error("Failed to approve request:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
