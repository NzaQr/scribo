import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/lib/api/blog";
import { queryKeys } from "./query-keys";

const invalidatePostQueries = (queryClient: any, postId: string) => {
  queryClient.invalidateQueries({ queryKey: queryKeys.posts });
};

const updatePostData = (queryClient: any, postId: string, data: any) => {
  queryClient.setQueryData(queryKeys.post(postId), data);
  invalidatePostQueries(queryClient, postId);
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, comment }: { postId: string; comment: string }) =>
      blogApi.addComment(postId, comment),
    onSuccess: (data, { postId }) => updatePostData(queryClient, postId, data),
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      comment,
    }: {
      postId: string;
      commentId: string;
      comment: string;
    }) => blogApi.updateComment(postId, commentId, comment),
    onSuccess: (data, { postId }) => updatePostData(queryClient, postId, data),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => blogApi.deleteComment(postId, commentId),
    onSuccess: (data, { postId }) => updatePostData(queryClient, postId, data),
  });
};
