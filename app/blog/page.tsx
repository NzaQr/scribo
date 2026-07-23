"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostRow } from "@/components/blog/blog-card";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { usePosts } from "@/lib/hooks/use-blog";
import { useMemo, useState } from "react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export default function BlogPage() {
  const { data: posts, isLoading, error } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="border-b border-border">
          <div className="container-editorial animate-page-enter py-14 md:py-16">
            <h1 className="font-serif text-[clamp(2.4rem,5vw,3.5rem)] font-normal tracking-tight">
              Posts
            </h1>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Essays and notes on software, design, and technology.
            </p>

            <label className="relative mt-8 block max-w-md">
              <span className="sr-only">Search posts</span>
              <Icon
                icon={Search01Icon}
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search titles, descriptions, tags..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="container-editorial py-10 md:py-14">
          {isLoading ? (
            <div className="space-y-0">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 border-b border-border py-6">
                  <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="py-12 text-muted-foreground">
              Could not load posts. Please try again.
            </p>
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl">
                {searchTerm ? "No matches" : "Nothing published yet"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm
                  ? `Nothing found for “${searchTerm}”.`
                  : "When posts arrive, they will appear here as a reading list."}
              </p>
            </div>
          ) : (
            <div>
              <p className="meta-label mb-4">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "post" : "posts"}
                {searchTerm ? ` · filtered` : ""}
              </p>
              {filteredPosts.map((post) => (
                <PostRow key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
