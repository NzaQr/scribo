"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
            <p className="text-muted-foreground">
              Share your ideas and knowledge with the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2"
                  >
                    Post Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Write an attractive title..."
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-2"
                  >
                    Description
                  </label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Write a brief description of your post..."
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium mb-2"
                >
                  Post Content
                </label>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => updateField("content", value)}
                  placeholder="Write your content in Markdown..."
                />
              </div>
            </Card>

            <Card className="p-6">
              <TagsInput
                id="tags"
                value={formData.tags}
                onChange={(value) => updateField("tags", value)}
              />
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
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
