"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { MarkdownEditor } from "@/components/blog/markdown-editor";
import { useEditPostForm } from "@/lib/hooks/use-edit-blog-form";
import { TagsInput } from "@/components/blog/tags-input";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
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

  const handleReset = () => {
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Post not found</h1>
              <p className="text-muted-foreground mb-6">
                The post you're trying to edit doesn't exist or has been
                deleted.
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

  if (post.author._id !== user?.id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p className="text-muted-foreground mb-6">
                You can only edit your own posts.
              </p>
              <Link href={`/blog/${postId}`}>
                <Button>View Post</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href={`/blog/${postId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Post
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
            <p className="text-muted-foreground">
              Update your post content and settings
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

            <div className="flex justify-between">
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Changes
              </Button>

              <div className="flex space-x-4">
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
                  className="min-w-[120px] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
