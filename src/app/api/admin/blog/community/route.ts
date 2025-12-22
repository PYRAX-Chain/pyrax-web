import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "all";
    const limit = parseInt(searchParams.get("limit") || "100");

    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (status !== "all") {
      where.status = status;
    }

    const links = await prisma.communityLink.findMany({
      where,
      orderBy: { submittedAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ links });
  } catch (error) {
    console.error("Failed to fetch community links:", error);
    return NextResponse.json({ links: [] });
  }
}
