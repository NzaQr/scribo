import { publicApi } from "./client";
import { LoginData, RegisterData } from "@/lib/types/blog";

export const authApi = {
  login: (data: LoginData) =>
    publicApi.post("/api/auth/login", data).then((res) => res.data),

  register: (data: RegisterData) =>
    publicApi.post("/api/auth/register", data).then((res) => res.data),

  refreshToken: (refreshToken: string) =>
    publicApi
      .post("/api/auth/refresh", { refreshToken })
      .then((res) => res.data),

  verifyToken: (token: string) =>
    publicApi
      .get("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  logout: (token: string) =>
    publicApi
      .post(
        "/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => res.data),
};
