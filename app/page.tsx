"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  FeaturedPostCard,
  PostCard,
  PostList,
  PostRow,
} from "@/components/blog/blog-card";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { usePosts } from "@/lib/hooks/use-blog";
import { useAuthStore } from "@/stores/auth-store";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { useMemo } from "react";

function topTags(tags: string[][], limit = 7) {
  const counts = new Map<string, number>();
  for (const list of tags) {
    for (const tag of list) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export default function HomePage() {
  const { data: posts, isLoading, error } = usePosts();
  const { isAuthenticated } = useAuthStore();
  const writeHref = isAuthenticated ? "/blog/create" : "/auth/login";

  const featured = posts?.[0];
  const cardPosts = posts?.slice(1, 4) ?? [];
  const rowPosts = posts?.slice(4, 8) ?? [];
  const topics = useMemo(
    () => topTags((posts ?? []).map((post) => post.tags)),
    [posts]
  );

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="container-editorial flex animate-page-enter flex-wrap items-end gap-12 pb-16 pt-20 md:pb-[72px] md:pt-24">
          <div className="min-w-0 flex-[1_1_34rem]">
            <h1 className="max-w-[15ch] text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] leading-[1.04] tracking-[-0.035em]">
              Long reads on code, design and the web.{" "}
              <span className="text-quiet-foreground">
                From the people who build it.
              </span>
            </h1>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
              Write in Markdown with a live preview. Readers can comment under
              each post.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/blog" className={buttonVariants({ size: "lg" })}>
                Start reading
                <Icon icon={ArrowRight02Icon} size={16} />
              </Link>
              <Link
                href={writeHref}
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Start writing
              </Link>
            </div>
          </div>

          <div className="min-w-0 flex-[1_1_22rem]">
            {isLoading ? (
              <div className="h-[22rem] animate-pulse rounded-xl border border-border bg-paper" />
            ) : featured ? (
              <FeaturedPostCard post={featured} />
            ) : (
              <div className="rounded-xl border border-dashed border-border-strong p-8">
                <p className="text-lg font-medium">No posts yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {error
                    ? "We could not load posts. Try again in a moment."
                    : "Write the first one."}
                </p>
                {!error && (
                  <Link
                    href={writeHref}
                    className={buttonVariants({ size: "sm", className: "mt-5" })}
                  >
                    Write a post
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {topics.length > 0 && (
          <section className="container-editorial pb-6" aria-label="Topics">
            <div className="flex flex-wrap items-center gap-2 border-y border-border py-4">
              <span className="mr-2 text-sm font-medium text-muted-foreground">
                Topics
              </span>
              <Link
                href="/blog"
                className="rounded-full bg-foreground px-3.5 py-1.5 text-[0.8125rem] font-medium text-background"
              >
                All
              </Link>
              {topics.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border bg-paper px-3.5 py-1.5 text-[0.8125rem] transition-colors hover:border-border-strong"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        {cardPosts.length > 0 && (
          <section className="container-editorial pb-24 pt-14">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[1.75rem] leading-tight">
                Latest writing{" "}
                <span className="text-quiet-foreground">
                  from the community
                </span>
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-foreground"
              >
                Browse all posts
                <Icon icon={ArrowRight02Icon} size={14} />
              </Link>
            </div>

            <div className="flex flex-wrap gap-5">
              {cardPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  className="min-w-0 flex-[1_1_20rem]"
                />
              ))}
            </div>

            {rowPosts.length > 0 && (
              <PostList className="mt-5">
                {rowPosts.map((post) => (
                  <PostRow key={post._id} post={post} />
                ))}
              </PostList>
            )}
          </section>
        )}

        <section className="container-editorial pb-24">
          <div className="flex flex-wrap items-end justify-between gap-8 rounded-2xl bg-foreground p-[clamp(2.5rem,6vw,5rem)] text-background">
            <div className="min-w-0 flex-[1_1_30rem]">
              <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-[1.08] tracking-[-0.03em]">
                Start your first post.{" "}
                <span className="opacity-60">
                  Preview it before you publish.
                </span>
              </h2>
              <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed opacity-80">
                The editor uses Markdown, with a live preview and syntax colors
                for code.
              </p>
            </div>
            <Link
              href={writeHref}
              className={buttonVariants({
                size: "lg",
                className: "bg-background text-foreground hover:bg-background/90",
              })}
            >
              Start writing
              <Icon icon={ArrowRight02Icon} size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
