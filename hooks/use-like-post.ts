import { useState, useEffect } from "react";
import { blogApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

export const useLikePost = (
  postId: string,
  initialLikes: number,
  userLiked: boolean
) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(userLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(userLiked);
  }, [initialLikes]);

  const handleLike = async () => {
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    setIsLoading(true);
    try {
      const updatedPost = await blogApi.addLike(postId);
      setLikes(updatedPost.likes);
      setIsLiked(updatedPost.userLiked);
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Error liking post");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    likes,
    isLiked,
    isLoading,
    handleLike,
  };
};
