"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useUpdatePost, usePost } from "@/lib/hooks/use-blog";
import { toast } from "sonner";
import { UpdatePostData } from "@/lib/types/blog";

interface PostFormData {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export function useEditPostForm(postId: string) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const updatePostMutation = useUpdatePost();
  const { data: post, isLoading, error } = usePost(postId);

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        content: post.content,
        tags: post.tags,
      });
    }
  }, [post]);

  const updateField = (field: keyof PostFormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        content: post.content,
        tags: post.tags,
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return false;
    }
    return true;
  };

  const submitForm = async (): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error("You must be authenticated to edit a post");
      router.push("/auth/login");
      return false;
    }

    if (!post) {
      toast.error("Post not found");
      return false;
    }

    if (post.author._id !== user?.id) {
      toast.error("You can only edit your own posts");
      return false;
    }

    if (!validateForm()) {
      return false;
    }

    try {
      const updateData: UpdatePostData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        tags: formData.tags,
      };

      await updatePostMutation.mutateAsync({
        id: postId,
        post: updateData,
      });

      toast.success("Post updated successfully!");
      router.push(`/blog/${postId}`);
      return true;
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error updating post. Please try again.");
      return false;
    }
  };

  return {
    formData,
    isSubmitting: updatePostMutation.isPending,
    isLoading,
    error,
    post,
    updateField,
    resetForm,
    submitForm,
    validateForm,
  };
}
