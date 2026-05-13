import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { content, postId } = await req.json();

  if (!content || typeof content !== "string") {
    return new NextResponse("Invalid content", { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      userId: session.user.id,
      postId: postId || null,
    },
  });

  return NextResponse.json(comment);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const comments = await prisma.comment.findMany({
    where: {
      postId: postId || null,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(comments);
}
