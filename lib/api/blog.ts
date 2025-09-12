import { publicApi, authApi } from "./client";
import { BlogPost, CreatePostData, UpdatePostData } from "@/lib/types/blog";

const getClient = (useAuth: boolean) => (useAuth ? authApi : publicApi);

export const blogApi = {
  getPosts: (token?: string) =>
    getClient(!!token)
      .get<BlogPost[]>("/api/posts")
      .then((res) => res.data),

  getPost: (id: string, token?: string, userId?: string) =>
    getClient(!!token)
      .get<BlogPost>(`/api/posts/${id}`, {
        params: userId ? { userId } : {},
      })
      .then((res) => res.data),

  createPost: (post: CreatePostData) =>
    authApi.post<BlogPost>("/api/posts", post).then((res) => res.data),

  updatePost: (id: string, post: UpdatePostData) =>
    authApi.put<BlogPost>(`/api/posts/${id}`, post).then((res) => res.data),

  deletePost: (id: string) => authApi.delete(`/api/posts/${id}`),

  getUserPosts: (userId: string) =>
    publicApi
      .get<BlogPost[]>(`/api/posts/user/${userId}`)
      .then((res) => res.data),

  addComment: (postId: string, comment: string) =>
    authApi
      .post<BlogPost>(`/api/posts/${postId}/comment`, { comment })
      .then((res) => res.data),

  updateComment: (postId: string, commentId: string, comment: string) =>
    authApi
      .put<BlogPost>(`/api/posts/${postId}/comment/${commentId}`, { comment })
      .then((res) => res.data),

  deleteComment: (postId: string, commentId: string) =>
    authApi
      .delete<BlogPost>(`/api/posts/${postId}/comment/${commentId}`)
      .then((res) => res.data),

  addLike: (postId: string) =>
    authApi.post<BlogPost>(`/api/posts/${postId}/like`).then((res) => res.data),
};
