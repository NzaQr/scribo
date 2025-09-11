"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useCreatePost } from "@/hooks/use-api";
import { toast } from "sonner";

interface BlogFormData {
  title: string;
  description: string;
  content: string;
}

export function useCreateBlogForm() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const createPostMutation = useCreatePost();
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    content: "",
  });

  const updateField = (field: keyof BlogFormData, value: string) => {
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
      toast.error("You must be authenticated to create a blog");
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
        createdAt: new Date(),
        tags: [],
      });

      toast.success("Blog created successfully!");
      router.push(`/blog/${newPost._id}`);
      return true;
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Error creating blog. Please try again.");
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
