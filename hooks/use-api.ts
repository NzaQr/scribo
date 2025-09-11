"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi, authApi, BlogPost } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: string) => ["posts", id] as const,
  postBySlug: (slug: string) => ["posts", "slug", slug] as const,
};

export function usePosts() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => blogApi.getPosts(token || undefined),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function usePost(id: string) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => blogApi.getPost(id, token || undefined),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Omit<BlogPost, "id">) => blogApi.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: Partial<BlogPost> }) =>
      blogApi.updatePost(id, post),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.post(variables.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    retry: 1,
    retryDelay: 1000,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    retry: 1,
    retryDelay: 1000,
  });
}
