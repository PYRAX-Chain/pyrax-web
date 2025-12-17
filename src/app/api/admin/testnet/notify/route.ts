import { NextResponse } from "next/server";

// Email notification for testnet upgrades
export async function POST(request: Request) {
  try {
    const { type, currentNetwork, nextNetwork, launchDate } = await request.json();

    // Format the launch date
    const launch = new Date(launchDate);
    const formattedDate = launch.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    // Email content based on notification type
    let subject = "";
    let body = "";

    if (type === "upgrade_announcement") {
      subject = `🚀 PYRAX Network Upgrade: ${nextNetwork.toUpperCase()} Launching in 7 Days`;
      body = `
Dear PYRAX Community Member,

We're excited to announce the next phase of the PYRAX testnet!

📅 UPGRADE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Network: ${nextNetwork.charAt(0).toUpperCase() + nextNetwork.slice(1)}
Launch Date: ${formattedDate}
Current Network: ${currentNetwork.charAt(0).toUpperCase() + currentNetwork.slice(1)} → Graduating

🔧 WHAT YOU NEED TO DO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Update your RPC endpoints to the new network
2. Download the latest node software (if running a node)
3. Request new testnet tokens from the faucet
4. Review the new features and testing objectives

📋 NEW FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visit https://pyrax.io/roadmap for the full list of new features and testing objectives.

⚠️ IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The ${currentNetwork} testnet will remain accessible for 30 days after the upgrade for migration purposes.

Thank you for being part of the PYRAX community!

Best regards,
The PYRAX Team

---
https://pyrax.io | Discord: discord.pyrax.io | Twitter: @PYRAXChain
      `.trim();
    } else if (type === "upgrade_live") {
      subject = `✅ PYRAX ${nextNetwork.toUpperCase()} Testnet is NOW LIVE`;
      body = `
Dear PYRAX Community Member,

The ${nextNetwork.charAt(0).toUpperCase() + nextNetwork.slice(1)} testnet is now LIVE!

🌐 NEW RPC ENDPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RPC: https://${nextNetwork}-rpc.pyrax.io
WebSocket: wss://${nextNetwork}-ws.pyrax.io
Explorer: https://${nextNetwork}-explorer.pyrax.io
Faucet: https://${nextNetwork}-faucet.pyrax.io

Start testing now and earn testnet rewards!

Best regards,
The PYRAX Team
      `.trim();
    }

    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    // For now, we'll log and return success
    console.log("=== EMAIL NOTIFICATION ===");
    console.log("Subject:", subject);
    console.log("Body:", body);
    console.log("==========================");

    // TODO: Integrate with actual email service
    // Example with SendGrid:
    // await sendgrid.send({
    //   to: "mailing-list@pyrax.io",
    //   from: "noreply@pyrax.io",
    //   subject,
    //   text: body,
    // });

    return NextResponse.json({ 
      success: true, 
      message: "Notification queued for delivery",
      subject,
      recipientCount: 0, // Would come from mailing list
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
