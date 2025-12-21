import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

// Reward amounts for bug reporting (in PYRX tokens)
const BUG_REWARDS = {
  SUBMITTED: 50,      // Just for submitting a valid bug
  CONFIRMED: 100,     // When bug is confirmed by team
  REPRODUCED: 25,     // When someone reproduces it
  FIXED: 200,         // When bug is fixed (bounty)
  CRITICAL: 500,      // Bonus for critical bugs
};

// Generate ticket number for private tickets
function generateTicketNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = randomBytes(3).toString("hex").toUpperCase();
  return `PYX-${year}${month}-${random}`;
}

// Generate issue number for public Forge Council issues
function generateIssueNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = randomBytes(3).toString("hex").toUpperCase();
  return `IC-${year}${month}-${random}`;
}

// Generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) + "-" + randomBytes(4).toString("hex");
}

// Filter out sensitive wallet logs from log content
function filterSensitiveLogs(logs: string | null): string | null {
  if (!logs) return null;
  
  const lines = logs.split("\n");
  const filteredLines = lines.filter(line => {
    const lowerLine = line.toLowerCase();
    // Skip lines containing wallet-sensitive data
    if (lowerLine.includes("private") && lowerLine.includes("key")) return false;
    if (lowerLine.includes("mnemonic")) return false;
    if (lowerLine.includes("seed phrase")) return false;
    if (lowerLine.includes("wallet password")) return false;
    if (lowerLine.includes("keystore")) return false;
    if (lowerLine.includes("wallet import")) return false;
    if (lowerLine.includes("wallet export")) return false;
    if (lowerLine.includes("decrypt")) return false;
    // Filter hex strings that look like private keys (64 chars)
    if (/0x[a-fA-F0-9]{64}/.test(line)) return false;
    return true;
  });
  
  return filteredLines.join("\n");
}

// Determine issue category from source
function getCategoryFromSource(source: string): string {
  if (source.includes("crash")) return "CRASH";
  if (source.includes("performance")) return "PERFORMANCE";
  if (source.includes("ui") || source.includes("ux")) return "UI_UX";
  if (source.includes("security")) return "SECURITY";
  return "BUG";
}

// Determine severity from description keywords
function getSeverityFromDescription(description: string): string {
  const lower = description.toLowerCase();
  if (lower.includes("crash") || lower.includes("data loss") || lower.includes("funds")) return "CRITICAL";
  if (lower.includes("broken") || lower.includes("cannot") || lower.includes("fail")) return "MAJOR";
  if (lower.includes("slow") || lower.includes("incorrect")) return "MODERATE";
  return "MINOR";
}

// POST - Submit a new bug report (public endpoint for the app)
// Creates both a private ticket AND a public Forge Council issue
export async function POST(request: NextRequest) {
  try {
    const { 
      source, 
      sourceVersion, 
      reporterEmail, 
      reporterName, 
      reporterWallet,
      title, 
      description, 
      logs,
      stepsToReproduce,
      expectedBehavior,
      actualBehavior,
      category,
      severity,
      component,
      environment,
    } = await request.json();

    if (!source || !title || !description) {
      return NextResponse.json({ error: "Source, title, and description are required" }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();
    const issueNumber = generateIssueNumber();
    const slug = generateSlug(title);
    
    // Filter sensitive logs for public issue (exclude wallet data)
    const publicLogs = filterSensitiveLogs(logs);
    
    // Determine category and severity if not provided
    const issueCategory = category || getCategoryFromSource(source);
    const issueSeverity = severity || getSeverityFromDescription(description);

    // Create the public Forge Council issue (with filtered logs)
    const issue = await prisma.issue.create({
      data: {
        issueNumber,
        slug,
        source,
        sourceVersion,
        reporterEmail: reporterEmail || null,
        reporterName: reporterName || null,
        reporterWallet: reporterWallet || null,
        title,
        summary: description.slice(0, 500),
        description,
        stepsToReproduce: stepsToReproduce || null,
        expectedBehavior: expectedBehavior || null,
        actualBehavior: actualBehavior || null,
        logs: publicLogs, // Filtered logs only!
        category: issueCategory as any,
        severity: issueSeverity as any,
        component: component || source,
        environment: environment || "DevNet",
        version: sourceVersion,
        status: "NEW",
        priority: "MEDIUM",
        isPublic: true,
      },
    });

    // Create the private ticket (with full unfiltered logs for admin review)
    const report = await prisma.bugReport.create({
      data: {
        ticketNumber,
        issueId: issue.id, // Link to public issue
        source,
        sourceVersion,
        reporterEmail: reporterEmail || null,
        reporterName: reporterName || null,
        title,
        description,
        logs: logs || null, // Full logs for admin
        status: "OPEN",
        priority: "MEDIUM",
      },
    });

    // Award tokens for bug submission if wallet provided
    let rewardAwarded = false;
    if (reporterWallet) {
      try {
        // Get or create airdrop recipient
        let recipient = await prisma.airdropRecipient.findUnique({
          where: { walletAddress: reporterWallet.toLowerCase() },
        });
        
        if (!recipient) {
          recipient = await prisma.airdropRecipient.create({
            data: {
              walletAddress: reporterWallet.toLowerCase(),
              email: reporterEmail,
            },
          });
        }
        
        // Add bug submission reward
        await prisma.rewardHistory.create({
          data: {
            recipientId: recipient.id,
            rewardType: "BUG_REPORT_SUBMITTED",
            amount: BUG_REWARDS.SUBMITTED,
            tokenType: "PYRX",
            sourceType: "bug_report",
            sourceId: issue.id,
            description: `Bug report submitted: ${title}`,
            status: "PENDING",
          },
        });
        
        // Update recipient totals
        await prisma.airdropRecipient.update({
          where: { id: recipient.id },
          data: {
            bugBountyRewards: { increment: BUG_REWARDS.SUBMITTED },
            totalAllocation: { increment: BUG_REWARDS.SUBMITTED },
          },
        });
        
        rewardAwarded = true;
      } catch (rewardError) {
        console.error("Failed to award bug submission reward:", rewardError);
      }
    }

    return NextResponse.json({
      success: true,
      ticketNumber: report.ticketNumber,
      ticketId: report.id,
      issueNumber: issue.issueNumber,
      issueId: issue.id,
      issueSlug: issue.slug,
      rewardAwarded,
      rewardAmount: rewardAwarded ? BUG_REWARDS.SUBMITTED : 0,
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
