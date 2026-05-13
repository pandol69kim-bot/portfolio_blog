import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        {session && (
          <Button asChild variant="outline" size="sm">
            <Link href="/blog/new">
              <PenSquare className="w-4 h-4 mr-2" />
              Write
            </Link>
          </Button>
        )}
      </div>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-border pb-8">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="line-clamp-3 text-muted-foreground">
              {post.content.replace(/[#*`]/g, '').slice(0, 200)}...
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-primary hover:underline mt-4 inline-block font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground text-center py-12">
            No posts found. Run `npx prisma db seed` to add sample data.
          </p>
        )}
      </div>
    </div>
  );
}
