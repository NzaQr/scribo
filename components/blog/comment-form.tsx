"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAddComment } from "@/lib/hooks/use-comments";
import { useAuthStore } from "@/stores/auth-store";
import { MessageSquare, Send } from "lucide-react";

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

  const handleCancel = () => {
    setComment("");
    setIsExpanded(false);
  };

  if (!user) {
    return (
      <div className="mt-8 p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground text-center">
          You must be logged in to leave a comment.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {!isExpanded ? (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Leave a comment
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Your comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isPending}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!comment.trim() || isPending}
              className="flex items-center gap-2"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isPending ? "Sending..." : "Comment"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={isPending}
              className="flex items-center gap-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
