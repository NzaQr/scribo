"use client";

import type React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function formatDate(value: string | Date, withYear = false) {
  const date = new Date(value);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear || !sameYear ? { year: "numeric" } : {}),
  });
}

/** Reading time in minutes, at 200 words per minute. */
export function readMinutes(content?: string) {
  if (!content) return null;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

interface PostProps {
  post: BlogPost;
  className?: string;
}

function PostMeta({ post }: { post: BlogPost }) {
  const minutes = readMinutes(post.content);
  return (
    <p className="meta-label flex flex-wrap gap-2">
      {post.tags[0] && <span>{post.tags[0]}</span>}
      {post.tags[0] && minutes ? <span aria-hidden="true">·</span> : null}
      {minutes ? <span>{minutes} min</span> : null}
    </p>
  );
}

function PostAuthor({
  post,
  size = "sm",
  tone = "neutral",
}: {
  post: BlogPost;
  size?: "sm" | "md";
  tone?: "neutral" | "accent";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        size === "sm" ? "text-[0.8125rem]" : "text-sm"
      )}
    >
      <Avatar name={post.author.username} size={size} tone={tone} />
      <Link
        href={`/profile/${post.author._id}`}
        className="relative z-10 font-medium text-foreground hover:text-accent"
      >
        {post.author.username}
      </Link>
      <time
        dateTime={new Date(post.createdAt).toISOString()}
        className="text-muted-foreground"
      >
        {formatDate(post.createdAt)}
      </time>
    </div>
  );
}

/** Grid card: tag and read time, serif title, summary, author. */
export function PostCard({ post, className }: PostProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-lg border border-border bg-paper p-7 transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-[var(--shadow-hover)]",
        className
      )}
    >
      <PostMeta post={post} />
      <h3 className="mt-5 font-serif text-[1.5625rem] font-normal leading-[1.18] tracking-[-0.01em]">
        <Link
          href={`/blog/${post._id}`}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none group-focus-within:underline"
        >
          {post.title}
        </Link>
      </h3>
      {post.description && (
        <p className="mt-3 line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      )}
      <div className="mt-7">
        <PostAuthor post={post} />
      </div>
    </article>
  );
}

/** Large card for the newest post on the home page. */
export function FeaturedPostCard({ post, className }: PostProps) {
  const minutes = readMinutes(post.content);
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-paper p-8 transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-[var(--shadow-hover)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.8125rem] font-medium text-accent">
          Latest post
        </span>
        {minutes ? (
          <span className="meta-label">{minutes} min read</span>
        ) : null}
      </div>
      <h2 className="mt-10 font-serif text-[clamp(1.75rem,1.4rem+1vw,2.125rem)] font-normal leading-[1.12] tracking-[-0.015em]">
        <Link
          href={`/blog/${post._id}`}
          className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none group-focus-within:underline"
        >
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-3.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      )}
      <div className="mt-8 border-t border-border pt-5">
        <PostAuthor post={post} size="md" tone="accent" />
      </div>
    </article>
  );
}

/** Compact row for lists inside a card container. */
export function PostRow({ post, className }: PostProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-border py-5 last:border-b-0",
        className
      )}
    >
      <h3 className="min-w-0 flex-[1_1_26rem] font-serif text-[1.3125rem] font-normal leading-[1.3] tracking-normal">
        <Link
          href={`/blog/${post._id}`}
          className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-accent group-focus-within:underline"
        >
          {post.title}
        </Link>
      </h3>
      <p className="meta-label flex flex-wrap gap-4">
        {post.tags[0] && <span>{post.tags[0]}</span>}
        <Link
          href={`/profile/${post.author._id}`}
          className="relative z-10 hover:text-foreground"
        >
          {post.author.username}
        </Link>
        <time dateTime={new Date(post.createdAt).toISOString()}>
          {formatDate(post.createdAt)}
        </time>
      </p>
    </article>
  );
}

/** Card container for a list of PostRow items. */
export function PostList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-paper px-6 py-1 sm:px-7",
        className
      )}
    >
      {children}
    </div>
  );
}

/** @deprecated Prefer PostCard or PostRow — kept for import compatibility */
export function BlogCard({
  post,
}: {
  post: BlogPost;
  index?: number;
}) {
  return <PostCard post={post} />;
}
