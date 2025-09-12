import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

let authStore: any = null;

export const setAuthStoreReference = (store: any) => {
  authStore = store;
};

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
};

export const publicApi = axios.create(baseConfig);

const createAuthApi = () => {
  const authApi = axios.create(baseConfig);

  authApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authStore?.getState?.()?.token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = authStore?.getState?.()?.refreshToken;
          if (!refreshToken) throw new Error("No refresh token available");

          const { data } = await publicApi.post("/api/auth/refresh", {
            refreshToken,
          });

          authStore
            ?.getState?.()
            ?.updateTokens?.(data.token, data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return authApi(originalRequest);
        } catch {
          authStore?.getState?.()?.logout?.();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return authApi;
};

export const authApi = createAuthApi();
