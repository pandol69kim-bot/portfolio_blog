import { prisma } from '@/lib/prisma';
import MarkdownRenderer from '@/components/markdown-renderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import StarRating from '@/components/star-rating';
import CommentForm from '@/components/ui/comment-form';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      ratings: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const totalRatings = post.ratings.length;
  const averageRating = totalRatings > 0 
    ? post.ratings.reduce((acc: number, r) => acc + r.score, 0) / totalRatings
    : 0;
  
  const userRating = session 
    ? post.ratings.find(r => r.userId === session.user.id)?.score 
    : 0;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-primary mb-8 inline-block transition-colors"
      >
        ← Back to blog
      </Link>
      
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          {session && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/blog/edit/${post.slug}`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none mb-16">
        <MarkdownRenderer content={post.content} />
      </div>

      <div className="mt-16 pt-8 border-t border-border space-y-12">
        <StarRating 
          postId={post.id}
          initialRating={userRating}
          averageRating={averageRating}
          totalRatings={totalRatings}
        />

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Comments ({post.comments.length})</h2>
          <CommentForm postId={post.id} label="Leave a comment on this post" />
          
          <div className="grid gap-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm">
                <div className="flex-shrink-0">
                  {comment.user.image ? (
                    <img
                      src={comment.user.image}
                      alt={comment.user.name || "User"}
                      className="w-10 h-10 rounded-full border border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                      <span className="text-xs font-bold text-muted-foreground">
                        {comment.user.name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {comment.user.name || "Anonymous"}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}

            {post.comments.length === 0 && (
              <p className="text-center text-muted-foreground py-8 italic border border-dashed border-border rounded-2xl">
                No comments yet. Share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
