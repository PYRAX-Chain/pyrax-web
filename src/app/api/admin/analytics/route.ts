import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    
    const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch real presale data
    const purchases = await prisma.presalePurchase.findMany({
      where: { createdAt: { gte: startDate } },
    });

    const totalRaised = purchases.reduce((sum, p) => sum + p.usdAmount, 0);
    const uniqueWallets = new Set(purchases.map(p => p.walletAddress.toLowerCase())).size;

    // Mock traffic data (would come from analytics service in production)
    const totalVisits = Math.floor(uniqueWallets * 15 + Math.random() * 1000);
    const conversionRate = uniqueWallets > 0 ? (uniqueWallets / totalVisits) * 100 : 0;

    return NextResponse.json({
      totalVisits,
      uniqueVisitors: Math.floor(totalVisits * 0.7),
      totalRaised,
      conversionRate: Math.min(conversionRate, 15),
      avgSessionDuration: "2m 34s",
      topPages: [
        { path: "/", views: Math.floor(totalVisits * 0.4) },
        { path: "/presale", views: Math.floor(totalVisits * 0.25) },
        { path: "/roadmap", views: Math.floor(totalVisits * 0.12) },
        { path: "/downloads", views: Math.floor(totalVisits * 0.08) },
        { path: "/docs", views: Math.floor(totalVisits * 0.05) },
      ],
      trafficSources: [
        { source: "Direct", visits: Math.floor(totalVisits * 0.45), percentage: 45 },
        { source: "Twitter/X", visits: Math.floor(totalVisits * 0.30), percentage: 30 },
        { source: "Discord", visits: Math.floor(totalVisits * 0.15), percentage: 15 },
        { source: "Other", visits: Math.floor(totalVisits * 0.10), percentage: 10 },
      ],
      dailyStats: [],
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({
      totalVisits: 0,
      uniqueVisitors: 0,
      totalRaised: 0,
      conversionRate: 0,
      avgSessionDuration: "0m 0s",
      topPages: [],
      trafficSources: [],
      dailyStats: [],
    });
  }
}
