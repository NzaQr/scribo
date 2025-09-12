"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useCreatePost } from "@/hooks/use-api";
import { toast } from "sonner";

interface PostFormData {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export function useCreatePostForm() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const createPostMutation = useCreatePost();
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    content: "",
    tags: [],
  });

  const updateField = (field: keyof PostFormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      tags: [],
    });
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
      toast.error("You must be authenticated to create a post");
      router.push("/auth/login");
      return false;
    }

    if (!validateForm()) {
      return false;
    }

    try {
      const newPost = await createPostMutation.mutateAsync({
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        author: {
          _id: user?.id || "",
          username: user?.username || "",
          email: user?.email || "",
        },
        likes: 0,
        comments: [],
        createdAt: new Date(),
        tags: formData.tags,
        userLiked: false,
      });

      toast.success("Post created successfully!");
      router.push(`/blog/${newPost._id}`);
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post. Please try again.");
      return false;
    }
  };

  return {
    formData,
    isSubmitting: createPostMutation.isPending,
    updateField,
    resetForm,
    submitForm,
    validateForm,
  };
}
