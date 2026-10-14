"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/blog/blog-card";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { usePosts } from "@/lib/hooks/use-blog";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search01Icon } from "@hugeicons/core-free-icons";

function BlogList() {
  const { data: posts, isLoading, error } = usePosts();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const q = searchTerm.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        (post.description?.toLowerCase() || "").includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [posts, searchTerm]);

  return (
    <>
      <section className="container-editorial animate-page-enter pb-10 pt-16 md:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h1 className="text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.035em]">
              All posts
            </h1>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Notes on software, design and the web, newest first.
            </p>
          </div>

          <label className="relative block w-full max-w-sm">
            <span className="sr-only">Search posts</span>
            <Icon
              icon={Search01Icon}
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search titles, summaries and tags"
              className="rounded-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="container-editorial pb-24">
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg border border-border bg-paper"
              />
            ))}
          </div>
        ) : error ? (
          <p className="py-12 text-muted-foreground">
            We could not load posts. Try again in a moment.
          </p>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border-strong px-6 py-16 text-center">
            <p className="text-lg font-medium">
              {searchTerm ? "No matches" : "No posts yet"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm
                ? `No post matches “${searchTerm}”.`
                : "Write the first one."}
            </p>
          </div>
        ) : (
          <>
            <p className="meta-label mb-5" aria-live="polite">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"}
              {searchTerm ? ` for “${searchTerm.trim()}”` : ""}
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-5">
              {filteredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default function BlogPage() {
  return (
    <div className="page-shell">
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={null}>
          <BlogList />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
