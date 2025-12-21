/**
 * PYRAX Admin Invitation Script
 * 
 * Sends confirmation emails to admin users in the whitelist who haven't confirmed yet.
 * 
 * Usage:
 *   npx ts-node scripts/send-admin-invite.ts --email=shawn.wilson@pyrax.org
 *   npm run send-admin-invite -- --email=shawn.wilson@pyrax.org
 */

import { PrismaClient } from "@prisma/client";
import { sendAdminInvitationEmail } from "../src/lib/email/brevo";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const emailArg = args.find((arg) => arg.startsWith("--email="));
  
  if (!emailArg) {
    console.log("Usage: npm run send-admin-invite -- --email=user@pyrax.org");
    console.log("\nOr send to all pending admins:");
    console.log("  npm run send-admin-invite -- --all");
    process.exit(1);
  }

  const sendAll = args.includes("--all");
  const targetEmail = emailArg?.split("=")[1]?.toLowerCase();

  console.log("🔥 PYRAX Admin Invitation Sender\n");

  // Check for Brevo API key
  if (!process.env.BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY environment variable not set");
    console.log("\nTo set it, add to your .env.local file:");
    console.log("  BREVO_API_KEY=your_api_key_here");
    process.exit(1);
  }

  try {
    let adminsToInvite;

    if (sendAll) {
      // Get all unconfirmed admins
      adminsToInvite = await prisma.adminWhitelist.findMany({
        where: {
          emailConfirmed: false,
          confirmationToken: { not: null },
        },
      });
    } else if (targetEmail) {
      // Get specific admin
      const admin = await prisma.adminWhitelist.findUnique({
        where: { email: targetEmail },
      });

      if (!admin) {
        console.error(`❌ Admin not found: ${targetEmail}`);
        console.log("\nMake sure to run the seed first:");
        console.log("  npx prisma db seed");
        process.exit(1);
      }

      if (admin.emailConfirmed) {
        console.log(`✅ Admin already confirmed: ${targetEmail}`);
        process.exit(0);
      }

      if (!admin.confirmationToken) {
        console.error(`❌ No confirmation token for: ${targetEmail}`);
        console.log("The admin may need to be re-seeded.");
        process.exit(1);
      }

      adminsToInvite = [admin];
    } else {
      console.error("❌ No email specified");
      process.exit(1);
    }

    if (adminsToInvite.length === 0) {
      console.log("✅ No pending invitations to send");
      process.exit(0);
    }

    console.log(`📧 Sending invitations to ${adminsToInvite.length} admin(s)...\n`);

    for (const admin of adminsToInvite) {
      console.log(`→ Sending to: ${admin.email}`);

      const result = await sendAdminInvitationEmail(
        admin.email,
        admin.confirmationToken!,
        admin.invitedBy || undefined
      );

      if (result.success) {
        console.log(`  ✅ Email sent successfully!`);

        // Update confirmation sent timestamp
        await prisma.adminWhitelist.update({
          where: { id: admin.id },
          data: { confirmationSentAt: new Date() },
        });
      } else {
        console.log(`  ❌ Failed: ${result.error}`);
      }

      console.log("");
    }

    console.log("🎉 Done!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
