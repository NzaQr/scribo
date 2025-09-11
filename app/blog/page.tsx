"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/use-api";
import { useState } from "react";

export default function BlogPage() {
  const { data: posts, isLoading, error } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.description?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 px-4 bg-muted/30 flex justify-center">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
              Articles
            </h1>

            <p className="text-xl text-muted-foreground mb-8 fade-in-delay-1">
              Read all about software development, design and technology
            </p>

            <div className="max-w-md mx-auto flex gap-2 fade-in-delay-2">
              <Input
                placeholder="Search articles..."
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="secondary">Search</Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 flex justify-center">
          <div className="container mx-auto max-w-6xl">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Error loading articles</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts?.map((post, index) => (
                    <BlogCard key={post._id} post={post} index={index} />
                  ))}
                </div>

                {filteredPosts?.length === 0 && searchTerm && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No results found for "{searchTerm}"
                    </p>
                  </div>
                )}

                <div className="flex justify-center mt-12 gap-2 fade-in-delay-4">
                  <Button variant="ghost" disabled>
                    Previous
                  </Button>
                  <Button variant="primary">1</Button>
                  <Button variant="ghost">2</Button>
                  <Button variant="ghost">3</Button>
                  <Button variant="ghost">Next</Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
