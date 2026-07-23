"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostRow } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/lib/hooks/use-blog";
import { useAuthStore } from "@/stores/auth-store";

export default function HomePage() {
  const { data: posts, isLoading, error } = usePosts();
  const { isAuthenticated } = useAuthStore();
  const featuredPosts = posts?.slice(0, 4) || [];

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="relative flex min-h-[calc(100dvh-4rem)] items-center">
          <div className="container-editorial w-full animate-page-enter py-16 md:py-20">
            <p className="brand-mark mb-8 text-[clamp(3.25rem,8vw,6.5rem)] leading-[0.92]">
              Scribo
            </p>
            <h1 className="max-w-xl font-serif text-[clamp(1.6rem,2.4vw,2.15rem)] font-normal leading-[1.2] tracking-tight text-foreground">
              A room for writing about the craft of the web.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Share ideas on development, design, and technology with a calm
              reading experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/blog">
                <Button size="lg">Start reading</Button>
              </Link>
              <Link href={isAuthenticated ? "/blog/create" : "/auth/login"}>
                <Button variant="secondary" size="lg">
                  Start writing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="container-editorial py-16 md:py-20">
            <div className="mb-10 max-w-xl">
              <h2 className="font-serif text-3xl font-normal tracking-tight md:text-4xl">
                Featured writing
              </h2>
              <p className="mt-3 text-muted-foreground">
                Recent posts from the community, arranged for reading rather
                than browsing cards.
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-0 divide-y divide-border">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-3 py-6">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full max-w-lg animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="py-8 text-muted-foreground">
                Could not load featured posts.
              </p>
            ) : featuredPosts.length === 0 ? (
              <div className="border border-dashed border-border py-14 text-center">
                <p className="font-serif text-2xl">No posts yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Be the first to publish something worth reading.
                </p>
                <Link
                  href={isAuthenticated ? "/blog/create" : "/auth/register"}
                  className="mt-6 inline-block"
                >
                  <Button>Write a post</Button>
                </Link>
              </div>
            ) : (
              <div>
                {featuredPosts.map((post, index) => (
                  <PostRow
                    key={post._id}
                    post={post}
                    featured={index === 0}
                  />
                ))}
                <div className="pt-8">
                  <Link
                    href="/blog"
                    className="text-sm font-medium text-accent transition-colors hover:text-foreground"
                  >
                    Browse all posts
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
