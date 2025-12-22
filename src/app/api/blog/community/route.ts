import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "approved";
    const limit = parseInt(searchParams.get("limit") || "50");

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      url,
      description,
      authorName,
      authorTwitter,
      category,
    } = body;

    // Basic validation
    if (!title || !url || !description || !authorName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Check for duplicate URL
    const existing = await prisma.communityLink.findFirst({
      where: { url },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This URL has already been submitted" },
        { status: 400 }
      );
    }

    const link = await prisma.communityLink.create({
      data: {
        title,
        url,
        description,
        authorName,
        authorTwitter: authorTwitter || null,
        category: category || "other",
        status: "pending",
        submittedAt: new Date(),
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Failed to submit community link:", error);
    return NextResponse.json(
      { error: "Failed to submit link" },
      { status: 500 }
    );
  }
}
