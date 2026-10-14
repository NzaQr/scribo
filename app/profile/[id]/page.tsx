"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { useUserPosts } from "@/lib/hooks/use-blog";
import { useAuthStore } from "@/stores/auth-store";
import { PostCard } from "@/components/blog/blog-card";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import ProfileLoading from "./loading";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { user: currentUser } = useAuthStore();
  const { data: userPosts, isLoading, error } = useUserPosts(userId);

  const isOwnProfile = currentUser?.id === userId;

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (error || !userPosts) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-4xl text-center">
            <h1 className="text-3xl">Profile not found</h1>
            <p className="mt-3 text-muted-foreground">
              No author has this profile link.
            </p>
            <Link href="/blog" className={buttonVariants({ className: "mt-8" })}>
              Back to posts
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

      <main id="main-content" className="flex-1 pb-24 pt-14 md:pt-20">
        <div className="container-editorial animate-page-enter">
          <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-10">
            <div className="flex items-center gap-5">
              <Avatar
                name={displayName}
                size="xl"
                tone="accent"
                className="size-16 text-lg"
              />
              <div>
                <h1 className="text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
                  {displayName}
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {displayEmail ? `${displayEmail} · ` : ""}
                  <span className="tabular-nums">
                    {totalPosts} {totalPosts === 1 ? "post" : "posts"}
                  </span>
                </p>
              </div>
            </div>
            {isOwnProfile && (
              <Link href="/blog/create" className={buttonVariants()}>
                <Icon icon={PencilEdit02Icon} size={16} />
                Write a post
              </Link>
            )}
          </header>

          <section className="pt-12">
            <h2 className="mb-6 text-[1.375rem] leading-tight">
              {isOwnProfile ? "Your posts" : "Posts"}
            </h2>

            {totalPosts === 0 ? (
              <div className="rounded-lg border border-dashed border-border-strong px-6 py-14 text-center">
                <p className="text-lg font-medium">No posts yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isOwnProfile
                    ? "Write your first post when you are ready."
                    : "This author has not published a post."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-5">
                {userPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
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
