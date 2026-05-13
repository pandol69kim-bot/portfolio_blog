import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { slug: oldSlug } = await params;
  const { title, slug: newSlug, content } = await req.json();

  try {
    const updatedPost = await prisma.blogPost.update({
      where: { slug: oldSlug },
      data: {
        title,
        slug: newSlug,
        content,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return new NextResponse("Error updating post", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { slug } = await params;

  try {
    await prisma.blogPost.delete({
      where: { slug },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return new NextResponse("Error deleting post", { status: 500 });
  }
}
