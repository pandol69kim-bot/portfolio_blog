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

  // Optional: Check if the user is an admin (for a real portfolio)
  // if (session.user.email !== "your-email@example.com") {
  //   return new NextResponse("Forbidden", { status: 403 });
  // }

  const { title, slug, content } = await req.json();

  if (!title || !slug || !content) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
      },
    });
    return NextResponse.json(post);
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Slug already exists", { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
