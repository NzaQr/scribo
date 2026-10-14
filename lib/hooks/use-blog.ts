import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/lib/api/blog";
import { useAuthStore } from "@/stores/auth-store";
import { queryKeys } from "./query-keys";
import { CreatePostData, UpdatePostData } from "@/lib/types/blog";

const STALE_TIME = 5 * 60 * 1000;

export const usePosts = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => blogApi.getPosts(token || undefined),
    staleTime: STALE_TIME,
    retry: 2,
  });
};

export const usePost = (id: string) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => blogApi.getPost(id, token || undefined),
    enabled: !!id,
    staleTime: STALE_TIME,
  });
};

export const useUserPosts = (userId: string) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.userPosts(userId),
    queryFn: () => blogApi.getUserPosts(userId, token || undefined),
    enabled: !!userId,
    staleTime: STALE_TIME,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: CreatePostData) => blogApi.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: UpdatePostData }) =>
      blogApi.updatePost(id, post),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(queryKeys.post(id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogApi.deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.post(id) });
      const previousPost = queryClient.getQueryData(queryKeys.post(id));
      const previousPosts = queryClient.getQueryData(queryKeys.posts);

      queryClient.setQueryData(queryKeys.posts, (oldData: any) =>
        oldData?.filter((post: any) => post._id !== id)
      );

      return { previousPost, previousPosts };
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.post(id) });

      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: ["posts", "user"] });
    },
    onError: (_, id, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKeys.post(id), context.previousPost);
      }
    },
  });
};
