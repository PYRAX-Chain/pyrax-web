import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: params.slug,
        status: "published",
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      newSlug,
      excerpt,
      content,
      coverImage,
      author,
      category,
      tags,
      featured,
      status,
    } = body;

    // Calculate read time
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const existingPost = await prisma.blogPost.findFirst({
      where: { slug: params.slug },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const updateData: any = {
      title,
      excerpt,
      content,
      coverImage,
      author,
      category,
      tags,
      featured,
      status,
      readTime,
      updatedAt: new Date(),
    };

    if (newSlug && newSlug !== params.slug) {
      updateData.slug = newSlug;
    }

    // Set publishedAt if status changed to published
    if (status === "published" && existingPost.status !== "published") {
      updateData.publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id: existingPost.id },
      data: updateData,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug: params.slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id: post.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
