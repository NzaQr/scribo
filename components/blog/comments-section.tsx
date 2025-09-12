"use client";

import { Comment } from "./comment";
import { CommentForm } from "./comment-form";
import { MessageSquare } from "lucide-react";

interface CommentsSectionProps {
  postId: string;
  comments: {
    user: string;
    username: string;
    comment: string;
    createdAt?: string;
    _id: string;
  }[];
}

export function CommentsSection({ postId, comments }: CommentsSectionProps) {
  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
      </div>

      <CommentForm postId={postId} />

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
