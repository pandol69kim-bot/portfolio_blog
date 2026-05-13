"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface StarRatingProps {
  postId: string;
  initialRating?: number;
  averageRating: number;
  totalRatings: number;
}

export default function StarRating({ 
  postId, 
  initialRating = 0, 
  averageRating, 
  totalRatings 
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleRating = async (score: number) => {
    if (!session) {
      alert("Please sign in to rate this post.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blog/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, score }),
      });

      if (response.ok) {
        setRating(score);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to rate post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">Rate this post</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="font-bold text-foreground">{averageRating.toFixed(1)}</span>
          <span>({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="relative p-1 transition-transform active:scale-90 disabled:opacity-50"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRating(star)}
            disabled={isSubmitting}
          >
            <Star
              className={cn(
                "w-8 h-8 transition-colors duration-200",
                (hover || rating) >= star
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30 fill-transparent"
              )}
            />
          </button>
        ))}
        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground ml-2" />}
      </div>
      
      {!session && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          Sign in to leave your rating!
        </p>
      )}
      {rating > 0 && (
        <p className="text-xs text-primary mt-2 font-medium">
          Your rating: {rating} {rating === 1 ? "star" : "stars"}
        </p>
      )}
    </div>
  );
}
