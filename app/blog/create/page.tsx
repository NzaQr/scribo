"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useCreatePostForm } from "@/lib/hooks/use-create-blog-form";
import { PostFormFields } from "@/components/blog/post-form-fields";

export default function CreateBlogPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const { formData, isSubmitting, updateField, submitForm } =
    useCreatePostForm();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/auth/login");
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading || !isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1 pb-24 pt-10 md:pt-14">
        <form
          onSubmit={handleSubmit}
          className="container-editorial animate-page-enter"
        >
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <h1 className="text-[1.75rem] leading-tight">New post</h1>
              <p className="mt-2 text-muted-foreground">
                Write in Markdown. The preview matches the published post.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-28">
                {isSubmitting ? "Publishing…" : "Publish"}
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
