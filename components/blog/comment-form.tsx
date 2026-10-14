"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useAddComment } from "@/lib/hooks/use-comments";
import { useAuthStore } from "@/stores/auth-store";
import { SentIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";

interface CommentFormProps {
  postId: string;
  onCommentAdded?: () => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const { mutate: addComment, isPending } = useAddComment();
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    addComment(
      { postId, comment: comment.trim() },
      {
        onSuccess: () => {
          setComment("");
          onCommentAdded?.();
        },
      }
    );
  };

  if (!user) {
    return (
      <div className="rounded-lg border border-dashed border-border-strong px-4 py-5 text-center text-sm text-muted-foreground">
        <Link href="/auth/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>{" "}
        to leave a comment.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-paper p-4 transition-[border-color,box-shadow] focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-wash)]"
    >
      <label
        htmlFor="comment"
        className="mb-2 block text-[0.8125rem] font-medium text-muted-foreground"
      >
        Add a comment
      </label>
      <textarea
        id="comment"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share a thought…"
        className="block w-full resize-y bg-transparent text-[0.9375rem] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none"
        disabled={isPending}
      />
      <div className="mt-2 flex justify-end">
        <Button
          type="submit"
          size="sm"
          disabled={!comment.trim() || isPending}
          className="gap-2"
        >
          {isPending ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Icon icon={SentIcon} size={15} />
          )}
          {isPending ? "Posting…" : "Post comment"}
        </Button>
      </div>
    </form>
  );
}
