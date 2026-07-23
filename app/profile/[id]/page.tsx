"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useUserPosts } from "@/lib/hooks/use-blog";
import { useAuthStore } from "@/stores/auth-store";
import { PostRow } from "@/components/blog/blog-card";
import { Add01Icon, File01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { user: currentUser } = useAuthStore();
  const { data: userPosts, isLoading, error } = useUserPosts(userId);

  const isOwnProfile = currentUser?.id === userId;

  if (isLoading) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-editorial max-w-4xl space-y-4">
            <div className="h-10 w-56 animate-pulse rounded bg-muted" />
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="mt-10 h-32 w-full animate-pulse rounded bg-muted" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !userPosts) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-4xl text-center">
            <h1 className="font-serif text-3xl">Profile not found</h1>
            <p className="mt-3 text-muted-foreground">
              This author profile does not exist.
            </p>
            <Link href="/blog" className="mt-8 inline-block">
              <Button>Back to posts</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userInfo = userPosts.length > 0 ? userPosts[0].author : null;
  const totalPosts = userPosts.length;
  const displayName = isOwnProfile
    ? currentUser?.username
    : userInfo?.username || "Unknown author";
  const displayEmail = isOwnProfile ? currentUser?.email : userInfo?.email;

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1 py-10 md:py-14">
        <div className="container-editorial max-w-4xl animate-page-enter">
          <header className="border-b border-border pb-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="meta-label mb-3">Author</p>
                <h1 className="font-serif text-[clamp(2.2rem,4vw,3rem)] font-normal tracking-tight">
                  {displayName}
                </h1>
                {displayEmail && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {displayEmail}
                  </p>
                )}
                <p className="mt-4 font-mono text-xs tabular-nums text-muted-foreground">
                  {totalPosts} {totalPosts === 1 ? "post" : "posts"}
                </p>
              </div>
              {isOwnProfile && (
                <Link href="/blog/create">
                  <Button className="gap-2">
                    <Icon icon={Add01Icon} size={16} />
                    Create post
                  </Button>
                </Link>
              )}
            </div>
          </header>

          <section className="pt-10">
            <h2 className="mb-6 font-serif text-2xl font-normal tracking-tight">
              {isOwnProfile ? "Your posts" : "Posts"}
            </h2>

            {totalPosts === 0 ? (
              <div className="border border-dashed border-border py-14 text-center">
                <Icon
                  icon={File01Icon}
                  size={28}
                  className="mx-auto mb-4 text-muted-foreground"
                />
                <p className="font-serif text-xl">
                  {isOwnProfile ? "No posts yet" : "No posts published"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isOwnProfile
                    ? "Draft your first piece when you are ready."
                    : "This author has not published yet."}
                </p>
              </div>
            ) : (
              <div>
                {userPosts.map((post) => (
                  <PostRow key={post._id} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
