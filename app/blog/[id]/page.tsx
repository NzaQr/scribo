"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useDeletePost, usePost } from "@/lib/hooks/use-blog";
import { useLikePost } from "@/lib/hooks/use-like-post";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { formatDate, readMinutes } from "@/components/blog/blog-card";
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
import PostLoading from "./loading";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const { data: post, isLoading, error } = usePost(postId, {
    placeholderFromLists: true,
  });
  const {
    likes,
    isLiked,
    isLoading: isLikeLoading,
    handleLike,
  } = useLikePost(postId, post?.likes || 0, post?.userLiked || false);
  const { mutate: deletePost, isPending: isDeleteLoading } = useDeletePost();
  const readTime = readMinutes(post?.content);
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
    return <PostLoading />;
  }

  if (error || !post) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-3xl text-center">
            <h1 className="text-3xl">Post not found</h1>
            <p className="mt-3 text-muted-foreground">
              The author deleted this post, or the link is wrong.
            </p>
            <Link href="/blog" className={buttonVariants({ className: "mt-8" })}>
              Back to posts
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

      <main id="main-content" className="flex-1 pb-24 pt-10 md:pt-14">
        <div className="container-editorial animate-page-enter">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon icon={ArrowLeft01Icon} size={16} />
              All posts
            </Link>
            {post.author._id === user?.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border"
                    aria-label="Post options"
                  >
                    <Icon icon={MoreVerticalIcon} size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link href={`/blog/${postId}/edit`}>
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
            <header className="mx-auto mt-10 max-w-[760px] text-center">
              {post.tags.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-2">
                  {post.tags.map((tag, index) => (
                    <li key={tag}>
                      <Link
                        href={`/blog?q=${encodeURIComponent(tag)}`}
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80",
                          index === 0
                            ? "bg-accent-wash text-accent-deep"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <h1 className="mt-7 font-serif text-[clamp(2.4rem,1.6rem+2.8vw,4rem)] font-normal leading-[1.05] tracking-[-0.025em]">
                {post.title}
              </h1>
              {post.description && (
                <p className="mx-auto mt-6 max-w-[52ch] text-[1.1875rem] leading-[1.55] text-muted-foreground">
                  {post.description}
                </p>
              )}

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Avatar name={post.author.username} size="lg" tone="accent" />
                <div className="text-left">
                  <Link
                    href={`/profile/${post.author._id}`}
                    className="block text-[0.9375rem] font-medium hover:text-accent"
                  >
                    {post.author.username}
                  </Link>
                  <p className="meta-label">
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                      {formatDate(post.createdAt, true)}
                    </time>
                    {readTime ? ` · ${readTime} min read` : null}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLike}
                  disabled={isLikeLoading}
                  className={cn(
                    "ml-2 inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium tabular-nums transition-colors",
                    isLiked
                      ? "border-danger/40 bg-danger-muted text-danger"
                      : "border-border bg-paper text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Unlike post" : "Like post"}
                >
                  <Icon
                    icon={FavouriteIcon}
                    size={16}
                    className={isLiked ? "fill-current" : undefined}
                  />
                  <span>{likes}</span>
                </button>
              </div>
            </header>

            <div className="mt-16 border-t border-border pt-14">
              <MarkdownRenderer
                content={post.content}
                className="mx-auto max-w-[680px]"
              />
            </div>
          </article>

          <div className="mx-auto mt-[72px] flex max-w-[680px] flex-col gap-12">
            <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-paper p-6">
              <Avatar name={post.author.username} size="xl" tone="accent" />
              <div className="min-w-0 flex-[1_1_16rem]">
                <p className="text-[1.0625rem] font-medium">
                  {post.author.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  Author of this post
                </p>
              </div>
              <Link
                href={`/profile/${post.author._id}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View profile
              </Link>
            </div>

            <CommentsSection postId={post._id} comments={post.comments ?? []} />
          </div>
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
