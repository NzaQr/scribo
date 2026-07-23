"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { MarkdownEditor } from "@/components/blog/markdown-editor";
import { useCreatePostForm } from "@/lib/hooks/use-create-blog-form";
import { TagsInput } from "@/components/blog/tags-input";

export default function CreateBlogPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { formData, isSubmitting, updateField, submitForm } =
    useCreatePostForm();

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1 py-10 md:py-14">
        <div className="container-editorial max-w-4xl animate-page-enter">
          <header className="mb-10 max-w-xl">
            <h1 className="font-serif text-3xl font-normal tracking-tight md:text-4xl">
              New post
            </h1>
            <p className="mt-2 text-muted-foreground">
              A focused desk for drafting in Markdown.
            </p>
          </header>

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

            <div className="flex justify-end gap-3 border-t border-border pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
