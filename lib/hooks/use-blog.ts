import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/lib/api/blog";
import { useAuthStore } from "@/stores/auth-store";
import { queryKeys } from "./query-keys";
import { BlogPost, CreatePostData, UpdatePostData } from "@/lib/types/blog";

const STALE_TIME = 5 * 60 * 1000;

// Read the token when the request starts. During hydration, the store hook
// still returns the initial state, so a token from render can be null.
const currentToken = () => useAuthStore.getState().token || undefined;

export const usePosts = () => {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => blogApi.getPosts(currentToken()),
    staleTime: STALE_TIME,
    retry: 2,
  });
};

/**
 * With `placeholderFromLists`, the post shows at once from a loaded post
 * list, and the full post replaces it when the request completes. Forms
 * must not use it, because they copy the post into their state.
 */
export const usePost = (
  id: string,
  { placeholderFromLists = false }: { placeholderFromLists?: boolean } = {}
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => blogApi.getPost(id, currentToken()),
    enabled: !!id,
    staleTime: STALE_TIME,
    placeholderData: placeholderFromLists
      ? () =>
          queryClient
            .getQueriesData<BlogPost[]>({ queryKey: queryKeys.posts })
            .flatMap(([, posts]) => (Array.isArray(posts) ? posts : []))
            .find((post) => post._id === id)
      : undefined,
  });
};

export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userPosts(userId),
    queryFn: () => blogApi.getUserPosts(userId, currentToken()),
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
