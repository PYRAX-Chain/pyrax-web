import { NextResponse } from "next/server";

// In-memory settings storage (use database in production)
let siteSettings = {
  siteName: "PYRAX",
  siteUrl: "https://pyrax.org",
  maintenanceMode: false,
  presaleEnabled: true,
  faucetEnabled: true,
  emailNotifications: true,
  discordWebhook: "",
  primaryColor: "#F68724",
  chainId: 789120,
};

export async function GET() {
  return NextResponse.json(siteSettings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    siteSettings = { ...siteSettings, ...body };
    return NextResponse.json({ success: true, settings: siteSettings });
  } catch (error) {
    console.error("Settings error:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
