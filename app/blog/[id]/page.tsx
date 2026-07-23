"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useDeletePost, usePost } from "@/lib/hooks/use-blog";
import { useLikePost } from "@/lib/hooks/use-like-post";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft01Icon,
  Delete02Icon,
  FavouriteIcon,
  MoreVerticalIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { CommentsSection } from "@/components/blog/comments-section";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

  if (isLoading) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-editorial max-w-3xl space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-12 w-full animate-pulse rounded bg-muted" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-40 w-full animate-pulse rounded bg-muted" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-3xl text-center">
            <h1 className="font-serif text-3xl">Post not found</h1>
            <p className="mt-3 text-muted-foreground">
              This post does not exist or has been deleted.
            </p>
            <Link href="/blog" className="mt-8 inline-block">
              <Button>Back to posts</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1 py-8 md:py-12">
        <div className="container-editorial max-w-3xl animate-page-enter">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2 px-0">
                <Icon icon={ArrowLeft01Icon} size={16} />
                Back
              </Button>
            </Link>
            {post.author._id === user?.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Post options">
                    <Icon icon={MoreVerticalIcon} size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/blog/${postId}/edit`}
                      className="flex items-center"
                    >
                      <Icon icon={PencilEdit02Icon} size={16} className="mr-2" />
                      Edit post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteModal(true)}
                    className="text-danger focus:text-danger"
                  >
                    <Icon icon={Delete02Icon} size={16} className="mr-2" />
                    Delete post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <article>
            <header className="mb-10 space-y-5">
              {post.tags.length > 0 && (
                <p className="meta-label">{post.tags.join(" · ")}</p>
              )}
              <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.35rem)] font-normal leading-[1.12] tracking-tight">
                {post.title}
              </h1>
              {post.description && (
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 font-mono text-xs tabular-nums text-muted-foreground">
                <Link
                  href={`/profile/${post.author._id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {post.author.username}
                </Link>
                <time dateTime={new Date(post.createdAt).toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {readTime ? <span>{readTime} min read</span> : null}
                <button
                  type="button"
                  onClick={handleLike}
                  disabled={isLikeLoading}
                  className={cn(
                    "ml-auto inline-flex items-center gap-1.5 transition-colors",
                    isLiked
                      ? "text-danger"
                      : "hover:text-foreground"
                  )}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Unlike post" : "Like post"}
                >
                  <Icon
                    icon={FavouriteIcon}
                    size={15}
                    className={isLiked ? "fill-current" : undefined}
                  />
                  <span>{likes}</span>
                </button>
              </div>
            </header>

            <MarkdownRenderer content={post.content} />
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
        description={`Delete “${post?.title}”? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleteLoading}
        variant="secondary"
      />
    </div>
  );
}
