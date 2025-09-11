"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi, authApi, BlogPost } from "@/lib/api";

export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: string) => ["posts", id] as const,
  postBySlug: (slug: string) => ["posts", "slug", slug] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: blogApi.getPosts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => blogApi.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogApi.createPost,
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
    mutationFn: blogApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
