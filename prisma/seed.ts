import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

// ============ Initial Admin Users ============
// Only @pyrax.org email addresses are allowed
const INITIAL_ADMINS = [
  {
    email: "shawn.wilson@pyrax.org",
    password: "PyraxCrypto2025!!",
    role: AdminRole.SUPER_ADMIN,
    name: "Shawn Wilson",
  },
];

async function main() {
  console.log("🔥 PYRAX Admin Seed Script Starting...\n");

  for (const admin of INITIAL_ADMINS) {
    // Validate email domain
    if (!admin.email.endsWith("@pyrax.org")) {
      console.error(`❌ Invalid email domain: ${admin.email} - Only @pyrax.org emails allowed`);
      continue;
    }

    // Check if admin already exists
    const existing = await prisma.adminWhitelist.findUnique({
      where: { email: admin.email.toLowerCase() },
    });

    if (existing) {
      console.log(`⏭️  Admin already exists: ${admin.email}`);
      continue;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(admin.password, 12);
    
    // Generate confirmation token
    const confirmationToken = randomBytes(32).toString("hex");

    // Create admin whitelist entry - pre-confirmed for initial seed
    const newAdmin = await prisma.adminWhitelist.create({
      data: {
        email: admin.email.toLowerCase(),
        passwordHash,
        role: admin.role,
        active: true, // Active immediately for seed admins
        emailConfirmed: true, // Pre-confirmed for seed admins
        confirmationToken,
        confirmedAt: new Date(), // Mark as confirmed now
        invitedAt: new Date(),
        invitedBy: "SYSTEM_SEED",
      },
    });

    console.log(`✅ Created admin: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Status: Active & Email Confirmed ✓\n`);

    // Also create the Admin record
    await prisma.admin.upsert({
      where: { email: admin.email.toLowerCase() },
      update: {
        active: true, // Ensure active on re-seed
      },
      create: {
        email: admin.email.toLowerCase(),
        name: admin.name,
        role: admin.role,
        active: true, // Active immediately for seed admins
      },
    });

    console.log(`🔐 Initial admin ready - can login immediately at /admin/login`);
  }

  // Create initial settings
  const settings = [
    { key: "admin_email_domain", value: "pyrax.org", type: "string" },
    { key: "admin_confirmation_required", value: "true", type: "boolean" },
    { key: "admin_invitation_expiry_hours", value: "72", type: "number" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, type: setting.type },
      create: setting,
    });
    console.log(`⚙️  Setting: ${setting.key} = ${setting.value}`);
  }

  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
