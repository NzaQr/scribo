"use client";

import {
  User,
  Calendar,
  Trash,
  MoreVertical,
  Pencil,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDeleteComment, useUpdateComment } from "@/hooks/use-api";
import { useAuthStore } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

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

  const handleDelete = (commentId: string) => {
    deleteComment({ postId, commentId });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(comment.comment);
  };

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

  const handleCancel = () => {
    setEditText(comment.comment);
    setIsEditing(false);
  };

  return (
    <div className="border-l-2 border-muted pl-4 py-3 space-y-2">
      <div className="flex items-start justify-between gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Link
            href={`/profile/${comment.user}`}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <User className="w-3 h-3" />
            <span className="font-medium">{comment.username}</span>
          </Link>
          {comment.createdAt && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </>
          )}
        </div>
        {comment.user === user?.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-muted"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleEdit}
                className="text-blue-600 focus:text-blue-600 focus:bg-blue-50 dark:focus:bg-blue-950"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit comment
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(comment._id)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete comment
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
            placeholder="Escribe tu comentario..."
            className="text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!editText.trim() || editText === comment.comment}
              className="h-8 px-3"
            >
              <Check className="w-3 h-3 mr-1" />
              Guardar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 px-3"
            >
              <X className="w-3 h-3 mr-1" />
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-relaxed">{comment.comment}</p>
      )}
    </div>
  );
}
