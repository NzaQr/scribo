import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: Date;
  readTime: string;
  tags: string[];
  content?: string;
  slug?: string;
}

export const blogApi = {
  getPosts: () => api.get<BlogPost[]>("/api/posts").then((res) => res.data),

  getPost: (id: string) =>
    api.get<BlogPost>(`/api/posts/${id}`).then((res) => res.data),

  createPost: (post: Omit<BlogPost, "id">) =>
    api.post<BlogPost>("/api/posts", post).then((res) => res.data),

  updatePost: (id: string, post: Partial<BlogPost>) =>
    api.put<BlogPost>(`/api/posts/${id}`, post).then((res) => res.data),

  deletePost: (id: string) => api.delete(`/api/posts/${id}`),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/api/auth/login", { email, password }).then((res) => res.data),

  register: (userData: { email: string; password: string; name: string }) =>
    api.post("/api/auth/register", userData).then((res) => res.data),
};
