"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserPosts } from "@/hooks/use-api";
import { useAuthStore } from "@/stores/auth-store";
import { BlogCard } from "@/components/blog/blog-card";
import { Plus, User, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { user: currentUser } = useAuthStore();
  const { data: userPosts, isLoading, error } = useUserPosts(userId);

  const isOwnProfile = currentUser?.id === userId;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !userPosts) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
              <p className="text-muted-foreground mb-6">
                The user profile you're looking for doesn't exist.
              </p>
              <Link href="/blog">
                <Button>Back to Blog</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userInfo = userPosts.length > 0 ? userPosts[0].author : null;
  const totalPosts = userPosts.length;
  const totalWords = userPosts.reduce(
    (acc, post) => acc + (post.content?.length || 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        {userInfo?.username || "Unknown User"}
                      </h1>
                      <p className="text-muted-foreground mb-4">
                        {userInfo?.email}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>
                            {totalPosts} {totalPosts === 1 ? "post" : "posts"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>~{Math.round(totalWords / 200)} min read</span>
                        </div>
                      </div>
                    </div>

                    {isOwnProfile && (
                      <div className="flex gap-3">
                        <Link href="/blog/create">
                          <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Create Post
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {isOwnProfile ? "My Posts" : `${userInfo?.username}'s Posts`}
              </h2>
              <span className="text-muted-foreground">
                {totalPosts} {totalPosts === 1 ? "post" : "posts"}
              </span>
            </div>

            {totalPosts === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {isOwnProfile ? "No posts yet" : "No posts published"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isOwnProfile
                    ? "Start sharing your thoughts with the community by creating your first post."
                    : "This user hasn't published any posts yet."}
                </p>
                {isOwnProfile && (
                  <Link href="/blog/create">
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Your First Post
                    </Button>
                  </Link>
                )}
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts.map((post, index) => (
                  <BlogCard key={post._id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
