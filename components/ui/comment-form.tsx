"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/language-context";

interface CommentFormProps {
  postId?: string;
  placeholder?: string;
  label?: string;
}

export default function CommentForm({ 
  postId, 
  placeholder,
  label
}: CommentFormProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !session) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, postId }),
      });

      if (response.ok) {
        setContent("");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-[150px] flex items-center justify-center border border-dashed border-border rounded-xl bg-muted/10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8 border border-dashed border-border rounded-xl text-center bg-muted/30 backdrop-blur-sm">
        <p className="text-muted-foreground mb-4 font-medium">{t.comments.signIn}</p>
        <Button
          variant="default"
          className="rounded-full px-6"
          onClick={() => authClient.signIn.social({ 
            provider: "github", 
            callbackURL: window.location.pathname 
          })}
        >
          Sign in with GitHub
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card/30 p-4 rounded-2xl border border-border/50">
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-semibold ml-1">
          {label || t.comments.post}
        </label>
        <Textarea
          id="content"
          placeholder={placeholder || t.comments.subtitle}
          className="min-h-[120px] resize-none bg-background/50 focus:bg-background transition-colors border-border/60"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end items-center gap-3">
        <p className="text-xs text-muted-foreground italic">
          {content.trim().length > 0 ? `${content.trim().length} characters` : ""}
        </p>
        <Button 
          type="submit" 
          disabled={isSubmitting || !content.trim()}
          className="rounded-full px-6 shadow-md transition-all active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </>
          )}
        </Button>
      </div>
    </form>
  );
}