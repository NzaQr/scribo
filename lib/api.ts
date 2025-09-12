import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

let authStore: any = null;

export const setAuthStoreReference = (store: any) => {
  authStore = store;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const createAuthenticatedApi = () => {
  const authenticatedApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authenticatedApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authStore?.getState?.()?.token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authenticatedApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = authStore?.getState?.()?.refreshToken;
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const newTokens = await authApi.refreshToken(refreshToken);

          authStore
            ?.getState?.()
            ?.updateTokens?.(newTokens.token, newTokens.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${newTokens.token}`;
          return authenticatedApi(originalRequest);
        } catch (refreshError) {
          authStore?.getState?.()?.logout?.();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return authenticatedApi;
};

const authenticatedApi = createAuthenticatedApi();

export interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  likes: number;
  comments: {
    user: {
      _id: string;
      username: string;
      email: string;
    };
    comment: string;
  }[];
  userLiked: boolean;
  createdAt: Date;
  tags: string[];
}

export const blogApi = {
  getPosts: async (token?: string) => {
    const client = token ? authenticatedApi : api;
    const res = await client.get<BlogPost[]>("/api/posts");
    return res.data;
  },

  getPost: async (id: string, token?: string, userId?: string) => {
    const client = token ? authenticatedApi : api;
    const params = userId ? { userId } : {};
    const res = await client.get<BlogPost>(`/api/posts/${id}`, { params });
    return res.data;
  },

  createPost: async (post: Omit<BlogPost, "_id">) => {
    const res = await authenticatedApi.post<BlogPost>("/api/posts", post);
    return res.data;
  },

  updatePost: async (id: string, post: Partial<BlogPost>) => {
    const res = await authenticatedApi.put<BlogPost>(`/api/posts/${id}`, post);
    return res.data;
  },

  deletePost: (id: string) => {
    return authenticatedApi.delete(`/api/posts/${id}`);
  },

  getUserPosts: async (userId: string) => {
    const res = await api.get<BlogPost[]>(`/api/posts/user/${userId}`);
    return res.data;
  },

  addComment: async (postId: string, comment: string) => {
    const res = await authenticatedApi.post<BlogPost>(
      `/api/posts/${postId}/comment`,
      { comment }
    );
    return res.data;
  },

  addLike: async (postId: string) => {
    const res = await authenticatedApi.post<BlogPost>(
      `/api/posts/${postId}/like`
    );
    return res.data;
  },
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/api/auth/login", { email, password }).then((res) => res.data),

  register: (userData: { email: string; password: string; username: string }) =>
    api.post("/api/auth/register", userData).then((res) => res.data),

  refreshToken: (refreshToken: string) =>
    api.post("/api/auth/refresh", { refreshToken }).then((res) => res.data),

  verifyToken: (token: string) =>
    api
      .get("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  logout: (token: string) =>
    api
      .post(
        "/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => res.data),
};
