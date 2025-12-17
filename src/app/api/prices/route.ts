import { NextResponse } from "next/server";
import { getAllPrices } from "@/lib/coingecko";

// Revalidate every hour
export const revalidate = 3600;

export async function GET() {
  try {
    const prices = await getAllPrices();
    
    return NextResponse.json({
      success: true,
      data: prices,
      cached: true,
      ttl: 3600, // 1 hour
    });
  } catch (error) {
    console.error("Price fetch error:", error);
    
    // Return fallback prices on error
    return NextResponse.json({
      success: false,
      data: {
        eth: { price: 3500, change24h: 0 },
        btc: { price: 100000, change24h: 0 },
        lastUpdated: Date.now(),
      },
      cached: false,
      error: "Failed to fetch live prices",
    });
  }
}
