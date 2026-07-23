"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";
import { cn } from "@/lib/utils";

interface PostRowProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostRow({ post, className, featured = false }: PostRowProps) {
  const readTime = post.content ? Math.ceil(post.content.length / 200) : null;

  return (
    <article
      className={cn(
        "group border-b border-border py-6 first:pt-0 last:border-b-0",
        featured && "py-8",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1">
          {post.tags.length > 0 && (
            <p className="meta-label mb-2">
              {post.tags.slice(0, 3).join(" · ")}
            </p>
          )}
          <h3
            className={cn(
              "font-serif tracking-tight text-foreground transition-colors group-hover:text-accent",
              featured
                ? "text-[1.65rem] leading-tight sm:text-[1.85rem]"
                : "text-xl leading-snug sm:text-[1.35rem]"
            )}
          >
            <Link href={`/blog/${post._id}`} className="focus-visible:outline-none">
              {post.title}
            </Link>
          </h3>
          {post.description && (
            <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tabular-nums text-muted-foreground sm:flex-col sm:items-end sm:gap-1">
          <Link
            href={`/profile/${post.author._id}`}
            className="transition-colors hover:text-foreground"
          >
            {post.author.username}
          </Link>
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {formatDate(post.createdAt)}
          </time>
          {readTime ? <span>{readTime} min</span> : null}
        </div>
      </div>
    </article>
  );
}

/** @deprecated Prefer PostRow — kept for import compatibility */
export function BlogCard({
  post,
}: {
  post: BlogPost;
  index?: number;
}) {
  return <PostRow post={post} />;
}
