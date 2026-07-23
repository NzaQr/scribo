"use client";

import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDeleteComment, useUpdateComment } from "@/lib/hooks/use-comments";
import { useAuthStore } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import {
  Cancel01Icon,
  Delete02Icon,
  MoreVerticalIcon,
  PencilEdit02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

interface CommentProps {
  comment: {
    user: string;
    username: string;
    comment: string;
    createdAt?: string;
    _id: string;
  };
  postId: string;
}

export function Comment({ comment, postId }: CommentProps) {
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();
  const { user } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);

  const handleSave = () => {
    if (editText.trim() && editText !== comment.comment) {
      updateComment({
        postId,
        commentId: comment._id,
        comment: editText.trim(),
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="border-b border-border py-5 last:border-b-0">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          <Link
            href={`/profile/${comment.user}`}
            className="font-medium text-foreground transition-colors hover:text-accent"
          >
            {comment.username}
          </Link>
          {comment.createdAt && (
            <time dateTime={new Date(comment.createdAt).toISOString()}>
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          )}
        </div>
        {comment.user === user?.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Comment options"
              >
                <Icon icon={MoreVerticalIcon} size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onClick={() => {
                  setIsEditing(true);
                  setEditText(comment.comment);
                }}
              >
                <Icon icon={PencilEdit02Icon} size={16} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  deleteComment({ postId, commentId: comment._id })
                }
                className="text-danger focus:text-danger"
              >
                <Icon icon={Delete02Icon} size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit your comment..."
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!editText.trim() || editText === comment.comment}
              className="gap-1"
            >
              <Icon icon={Tick02Icon} size={14} />
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditText(comment.comment);
                setIsEditing(false);
              }}
              className="gap-1"
            >
              <Icon icon={Cancel01Icon} size={14} />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-foreground">
          {comment.comment}
        </p>
      )}
    </div>
  );
}
