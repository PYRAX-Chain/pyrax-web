import { NextResponse } from "next/server";

// Treasury wallet addresses from environment
const TREASURY_WALLETS = [
  { address: process.env.TREASURY_SIGNER_1 || "0x0000000000000000000000000000000000000001", label: "Signer 1 (Founder)", role: "admin" as const },
  { address: process.env.TREASURY_SIGNER_2 || "0x0000000000000000000000000000000000000002", label: "Signer 2 (CTO)", role: "signer" as const },
  { address: process.env.TREASURY_SIGNER_3 || "0x0000000000000000000000000000000000000003", label: "Signer 3 (CFO)", role: "signer" as const },
];

const REQUIRED_APPROVALS = parseInt(process.env.TREASURY_REQUIRED_APPROVALS || "2");
const TIMELOCK_HOURS = parseInt(process.env.TREASURY_TIMELOCK_HOURS || "48");

// In-memory storage for demo (use database in production)
let withdrawalRequests: any[] = [];

export async function GET() {
  // Calculate stats based on requests
  const pendingAmount = withdrawalRequests
    .filter(r => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);
  
  const executedAmount = withdrawalRequests
    .filter(r => r.status === "executed")
    .reduce((sum, r) => sum + r.amount, 0);

  // Mock treasury balance - in production, fetch from blockchain
  const totalBalance = 500000; // $500K example
  const lockedBalance = pendingAmount;
  const availableBalance = totalBalance - lockedBalance - executedAmount;

  return NextResponse.json({
    stats: {
      totalBalance,
      pendingWithdrawals: pendingAmount,
      lockedBalance,
      availableBalance,
    },
    wallets: TREASURY_WALLETS.map(w => ({ ...w, hasApproved: false })),
    requests: withdrawalRequests.sort((a, b) => 
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    ),
  });
}
