"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useAuthStore } from "@/stores/auth-store";
import { useEditPostForm } from "@/lib/hooks/use-edit-blog-form";
import { PostFormFields } from "@/components/blog/post-form-fields";
import {
  ArrowLeft01Icon,
  ArrowReloadHorizontalIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import EditPostLoading from "./loading";

export default function EditBlogPage() {
  const params = useParams();
  const postId = params.id as string;
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuthStore();
  const {
    formData,
    isSubmitting,
    isLoading,
    error,
    post,
    updateField,
    resetForm,
    submitForm,
  } = useEditPostForm(postId);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/auth/login");
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading || !isAuthenticated) {
    return <EditPostLoading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  if (isLoading) {
    return <EditPostLoading />;
  }

  if (error || !post) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-4xl text-center">
            <h1 className="text-3xl">Post not found</h1>
            <p className="mt-3 text-muted-foreground">
              The post you are trying to edit does not exist.
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

  if (post.author._id !== user?.id) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-4xl text-center">
            <h1 className="text-3xl">Access denied</h1>
            <p className="mt-3 text-muted-foreground">
              You can only edit your own posts.
            </p>
            <Link
              href={`/blog/${postId}`}
              className={buttonVariants({ className: "mt-8" })}
            >
              View post
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1 pb-24 pt-10 md:pt-14">
        <form
          onSubmit={handleSubmit}
          className="container-editorial animate-page-enter"
        >
          <Link
            href={`/blog/${postId}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon={ArrowLeft01Icon} size={16} />
            Back to post
          </Link>

          <header className="mb-10 mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <h1 className="text-[1.75rem] leading-tight">Edit post</h1>
              <p className="mt-2 text-muted-foreground">
                The preview matches the published post.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                disabled={isSubmitting}
                className="gap-2 text-muted-foreground"
              >
                <Icon icon={ArrowReloadHorizontalIcon} size={16} />
                Reset changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/blog/${postId}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-36">
                {isSubmitting ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </header>

          <PostFormFields values={formData} onChange={updateField} />
        </form>
      </main>

      <Footer />
    </div>
  );
}
