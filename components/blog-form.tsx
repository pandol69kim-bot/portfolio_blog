"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Trash2 } from "lucide-react";

interface BlogFormProps {
  initialData?: {
    title: string;
    slug: string;
    content: string;
  };
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/blog/${initialData?.slug}` : "/api/blog";
      const method = isEdit ? "PATCH" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content }),
      });

      if (response.ok) {
        router.push("/blog");
        router.refresh();
      } else {
        const err = await response.text();
        alert(`Error: ${err}`);
      }
    } catch (error) {
      console.error("Failed to save post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blog/${initialData?.slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/blog");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-input bg-background outline-none focus:ring-2 focus:ring-primary/20"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-input bg-background outline-none focus:ring-2 focus:ring-primary/20"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/ /g, "-"))}
          placeholder="post-url-slug"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Content (Markdown)</label>
        <Textarea
          className="min-h-[400px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          required
        />
      </div>
      <div className="flex justify-between items-center">
        {isEdit ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        ) : <div />}
        
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEdit ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
