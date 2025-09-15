import { publicApi, authApi } from "./client";
import { ApiResponse } from "@/lib/types/api";
import { BlogPost, CreatePostData, UpdatePostData } from "@/lib/types/blog";

const getClient = (useAuth: boolean) => (useAuth ? authApi : publicApi);

export const blogApi = {
  getPosts: (token?: string) =>
    getClient(!!token)
      .get<ApiResponse<BlogPost[]>>("/api/posts")
      .then((res) => res.data.data),

  getPost: (id: string, token?: string, userId?: string) =>
    getClient(!!token)
      .get<ApiResponse<BlogPost>>(`/api/posts/${id}`, {
        params: userId ? { userId } : {},
      })
      .then((res) => res.data.data),

  createPost: (post: CreatePostData) =>
    authApi
      .post<ApiResponse<BlogPost>>("/api/posts", post)
      .then((res) => res.data.data),

  updatePost: (id: string, post: UpdatePostData) =>
    authApi
      .put<ApiResponse<BlogPost>>(`/api/posts/${id}`, post)
      .then((res) => res.data.data),

  deletePost: (id: string) =>
    authApi
      .delete<ApiResponse<{ message: string }>>(`/api/posts/${id}`)
      .then((res) => res.data),

  getUserPosts: (userId: string) =>
    publicApi
      .get<ApiResponse<BlogPost[]>>(`/api/posts/user/${userId}`)
      .then((res) => res.data.data),

  addComment: (postId: string, comment: string) =>
    authApi
      .post<ApiResponse<BlogPost>>(`/api/posts/${postId}/comment`, { comment })
      .then((res) => res.data.data),

  updateComment: (postId: string, commentId: string, comment: string) =>
    authApi
      .put<ApiResponse<BlogPost>>(`/api/posts/${postId}/comment/${commentId}`, {
        comment,
      })
      .then((res) => res.data.data),

  deleteComment: (postId: string, commentId: string) =>
    authApi
      .delete<ApiResponse<BlogPost>>(
        `/api/posts/${postId}/comment/${commentId}`
      )
      .then((res) => res.data.data),

  addLike: (postId: string) =>
    authApi
      .post<ApiResponse<BlogPost>>(`/api/posts/${postId}/like`)
      .then((res) => res.data.data),
};
