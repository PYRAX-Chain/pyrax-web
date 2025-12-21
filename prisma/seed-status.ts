import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const STATUS_SERVICES = [
  { name: "Node A (Stream A)", slug: "node-a", description: "ASIC Mining Node", category: "CORE", url: "http://localhost:8545", displayOrder: 1 },
  { name: "Node B (Stream B/C)", slug: "node-b", description: "GPU Mining Node", category: "CORE", url: "http://localhost:8546", displayOrder: 2 },
  { name: "RPC API", slug: "rpc-api", description: "JSON-RPC Endpoint", category: "API", url: "http://localhost:8545", displayOrder: 3 },
  { name: "Block Explorer", slug: "explorer", description: "Blockchain Explorer", category: "WEB", url: "http://localhost:3001", displayOrder: 4 },
  { name: "Web Application", slug: "web-app", description: "pyrax.org", category: "WEB", url: "http://localhost:3000", displayOrder: 5 },
  { name: "Faucet", slug: "faucet", description: "Testnet Faucet", category: "TOOLS", url: "http://localhost:3002", displayOrder: 6 },
];

async function main() {
  console.log("🔧 Seeding status services...\n");

  for (const service of STATUS_SERVICES) {
    const existing = await prisma.statusService.findUnique({
      where: { slug: service.slug },
    });

    if (existing) {
      await prisma.statusService.update({
        where: { slug: service.slug },
        data: {
          ...service,
          status: "OPERATIONAL",
          isPublic: true,
          uptimePercent: 100,
          uptimeDay: 100,
          uptimeWeek: 100,
          uptimeMonth: 100,
          lastCheckedAt: new Date(),
        },
      });
      console.log(`⏭️  Updated: ${service.name}`);
    } else {
      await prisma.statusService.create({
        data: {
          ...service,
          status: "OPERATIONAL",
          isPublic: true,
          uptimePercent: 100,
          uptimeDay: 100,
          uptimeWeek: 100,
          uptimeMonth: 100,
          lastCheckedAt: new Date(),
        },
      });
      console.log(`✅ Created: ${service.name}`);
    }
  }

  console.log("\n🎉 Status services seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
