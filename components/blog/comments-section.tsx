"use client";

import { Comment } from "./comment";
import { CommentForm } from "./comment-form";

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
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="font-serif text-2xl font-normal tracking-tight">
        Conversation
        <span className="ml-2 font-mono text-sm text-muted-foreground">
          {comments.length}
        </span>
      </h2>

      <div className="mt-6">
        <CommentForm postId={postId} />
      </div>

      {comments.length > 0 ? (
        <div className="mt-8">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">
          No comments yet. Start the conversation.
        </p>
      )}
    </section>
  );
}
