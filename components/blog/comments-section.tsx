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
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="text-[1.375rem] leading-tight">
        Comments
        <span className="ml-2 font-normal text-muted-foreground">
          {comments.length}
        </span>
      </h2>

      <div className="mt-5">
        <CommentForm postId={postId} />
      </div>

      {comments.length > 0 ? (
        <div className="mt-2">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          No comments yet.
        </p>
      )}
    </section>
  );
}
