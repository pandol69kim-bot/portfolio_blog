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

  const { postId, score } = await req.json();

  if (!postId || !score || typeof score !== "number") {
    return new NextResponse("Invalid data", { status: 400 });
  }

  try {
    const rating = await prisma.rating.upsert({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
      update: {
        score,
      },
      create: {
        score,
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json(rating);
  } catch (error) {
    console.error("Rating error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
