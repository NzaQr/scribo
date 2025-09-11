"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/use-api";
import { useAuthStore } from "@/stores/auth-store";

export default function HomePage() {
  const { data: posts, isLoading, error } = usePosts();
  const { isAuthenticated } = useAuthStore();
  const featuredPosts = posts?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4 flex justify-center">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-primary">Scribo</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-delay-1">
              A minimalist space to share ideas, experiences and knowledge about
              web development, design and technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <Link href="/blog">
                <Button size="lg">Start Reading</Button>
              </Link>
              <Link href={isAuthenticated ? "/blog/create" : "/auth/login"}>
                <Button variant="secondary" size="lg">
                  Start Writing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30 flex justify-center">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 animate-fade-in-delay-3">
              <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular articles about web development, design
                and the latest technology trends.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Cargando artículos destacados...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Error loading featured articles
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post, index) => (
                    <BlogCard key={post._id} post={post} index={index} />
                  ))}
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
