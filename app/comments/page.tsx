"use client";

import { useEffect, useState } from "react";
import CommentForm from "@/components/ui/comment-form";
import { User, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/language-context";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

export default function CommentsPage() {
  const { t, mounted } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments");
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComments();
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{t.comments.title}</h1>
          <p className="text-muted-foreground">
            {t.comments.subtitle}
          </p>
        </div>

        <CommentForm label={t.comments.post} />

        <div className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold">
            Comments ({comments.length})
          </h2>
          
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid gap-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card/50">
                  <div className="flex-shrink-0">
                    {comment.user.image ? (
                      <img
                        src={comment.user.image}
                        alt={comment.user.name || "User"}
                        className="w-10 h-10 rounded-full border border-border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">
                        {comment.user.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toISOString().split('T')[0]}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-center text-muted-foreground py-12 italic">
                  No comments yet. Be the first to leave one!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}