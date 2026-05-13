import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BlogForm from "@/components/blog-form";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/blog");
  }

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      <BlogForm initialData={post} isEdit />
    </div>
  );
}
