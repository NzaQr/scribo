"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useAddComment } from "@/lib/hooks/use-comments";
import { useAuthStore } from "@/stores/auth-store";
import { Comment01Icon, SentIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";

interface CommentFormProps {
  postId: string;
  onCommentAdded?: () => void;
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
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
          setIsExpanded(false);
          onCommentAdded?.();
        },
      }
    );
  };

  if (!user) {
    return (
      <div className="border border-dashed border-border px-4 py-5 text-center text-sm text-muted-foreground">
        <Link href="/auth/login" className="text-accent hover:underline">
          Sign in
        </Link>{" "}
        to leave a comment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isExpanded ? (
        <Button
          variant="outline"
          onClick={() => setIsExpanded(true)}
          className="gap-2"
        >
          <Icon icon={Comment01Icon} size={16} />
          Leave a comment
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="comment" className="block text-sm font-medium">
            Your comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write thoughtfully..."
            className="min-h-[110px] w-full resize-y rounded-md border border-border bg-input p-3 text-base leading-relaxed shadow-[var(--shadow-sm)] focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isPending}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!comment.trim() || isPending}
              className="gap-2"
            >
              {isPending ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Icon icon={SentIcon} size={16} />
              )}
              {isPending ? "Sending..." : "Comment"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setComment("");
                setIsExpanded(false);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
