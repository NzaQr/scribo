import { publicApi } from "./client";
import { ApiResponse } from "@/lib/types/api";
import {
  LoginData,
  RegisterData,
  AuthData,
  TokenData,
  VerifyResponse,
} from "@/lib/types/auth";

export const authApi = {
  login: (data: LoginData) =>
    publicApi
      .post<ApiResponse<AuthData>>("/api/auth/login", data)
      .then((res) => res.data.data),

  register: (data: RegisterData) =>
    publicApi
      .post<ApiResponse<AuthData>>("/api/auth/register", data)
      .then((res) => res.data.data),

  refreshToken: (refreshToken: string) =>
    publicApi
      .post<ApiResponse<TokenData>>("/api/auth/refresh", { refreshToken })
      .then((res) => res.data.data),

  verifyToken: (token: string) =>
    publicApi
      .get<ApiResponse<VerifyResponse>>("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data),

  logout: (refreshToken: string) =>
    publicApi
      .post<ApiResponse<{ message: string }>>("/api/auth/logout", {
        refreshToken,
      })
      .then((res) => res.data),
};
