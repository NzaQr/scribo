"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useDeletePost, usePost } from "@/lib/hooks/use-blog";
import { useLikePost } from "@/lib/hooks/use-like-post";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Heart,
  Trash,
  MoreVertical,
  Edit,
} from "lucide-react";
import Link from "next/link";
import MarkdownViewer from "@/components/blog/markdown-viewer";
import { CommentsSection } from "@/components/blog/comments-section";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const { data: post, isLoading, error } = usePost(postId);
  const {
    likes,
    isLiked,
    isLoading: isLikeLoading,
    handleLike,
  } = useLikePost(postId, post?.likes || 0, post?.userLiked || false);
  const { mutate: deletePost, isPending: isDeleteLoading } = useDeletePost();
  const readTime = post?.content && Math.ceil(post.content.length / 200);
  const router = useRouter();
  const { user } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    router.push("/blog");

    deletePost(postId, {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
    });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Post not found</h1>
              <p className="text-muted-foreground mb-6">
                The post you're looking for doesn't exist or has been deleted.
              </p>
              <Link href="/blog">
                <Button>Back to Blog</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            {post.author._id === user?.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mb-4 h-9 w-9 p-0 hover:bg-muted"
                  >
                    <MoreVertical className="w-4 h-4" />
                    <span className="sr-only">Open options menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/blog/${postId}/edit`}
                      className="flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <article className="space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Link
                  href={`/profile/${post.author._id}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{post.author.username}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  disabled={isLikeLoading}
                  className={`flex items-center gap-2 border transition-all duration-200 ${
                    isLiked
                      ? "text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                      : "border-border hover:text-red-500 hover:border-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-200 ${
                      isLiked ? "fill-current" : ""
                    }`}
                  />
                  <span>{likes}</span>
                  {isLikeLoading && (
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  )}
                </Button>
              </div>
            </header>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <MarkdownViewer content={post.content} />
            </div>
          </article>

          <CommentsSection postId={post._id} comments={post.comments} />
        </div>
      </main>

      <Footer />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete post"
        description={`Are you sure you want to delete "${post?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleteLoading}
        variant="primary"
        confirmButtonClassName="bg-red-600 hover:bg-red-700 text-white"
      />
    </div>
  );
}
