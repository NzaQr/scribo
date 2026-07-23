"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { useAuthStore } from "@/stores/auth-store";
import { MarkdownEditor } from "@/components/blog/markdown-editor";
import { useEditPostForm } from "@/lib/hooks/use-edit-blog-form";
import { TagsInput } from "@/components/blog/tags-input";
import {
  ArrowLeft01Icon,
  ArrowReloadHorizontalIcon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function EditBlogPage() {
  const params = useParams();
  const postId = params.id as string;
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
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

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  if (isLoading) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-16">
          <div className="container-editorial max-w-4xl space-y-4">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="h-40 w-full animate-pulse rounded bg-muted" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-4xl text-center">
            <h1 className="font-serif text-3xl">Post not found</h1>
            <p className="mt-3 text-muted-foreground">
              The post you are trying to edit does not exist.
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

  if (post.author._id !== user?.id) {
    return (
      <div className="page-shell">
        <Header />
        <main className="flex-1 py-20">
          <div className="container-editorial max-w-4xl text-center">
            <h1 className="font-serif text-3xl">Access denied</h1>
            <p className="mt-3 text-muted-foreground">
              You can only edit your own posts.
            </p>
            <Link href={`/blog/${postId}`} className="mt-8 inline-block">
              <Button>View post</Button>
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

      <main id="main-content" className="flex-1 py-10 md:py-14">
        <div className="container-editorial max-w-4xl animate-page-enter">
          <div className="mb-10">
            <Link href={`/blog/${postId}`}>
              <Button variant="ghost" size="sm" className="mb-4 gap-2 px-0">
                <Icon icon={ArrowLeft01Icon} size={16} />
                Back to post
              </Button>
            </Link>
            <h1 className="font-serif text-3xl font-normal tracking-tight md:text-4xl">
              Edit post
            </h1>
            <p className="mt-2 text-muted-foreground">
              Revise the draft. Preview matches the published reading view.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="A clear, specific title"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="h-12 font-serif text-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium"
                >
                  Description
                </label>
                <Input
                  id="description"
                  type="text"
                  placeholder="One or two sentences for the listing"
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="markdown-editor"
                className="mb-3 block text-sm font-medium"
              >
                Content
              </label>
              <MarkdownEditor
                value={formData.content}
                onChange={(value) => updateField("content", value)}
                placeholder="Write in Markdown..."
              />
            </div>

            <TagsInput
              id="tags"
              value={formData.tags}
              onChange={(value) => updateField("tags", value)}
            />

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                disabled={isSubmitting}
                className="gap-2"
              >
                <Icon icon={ArrowReloadHorizontalIcon} size={16} />
                Reset changes
              </Button>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push(`/blog/${postId}`)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[140px] gap-2"
                >
                  <Icon icon={FloppyDiskIcon} size={16} />
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
