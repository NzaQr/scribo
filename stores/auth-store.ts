"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api/auth";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateTokens: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  verifyAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      login: (token: string, refreshToken: string, user: User) => {
        set({
          token,
          refreshToken,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        const currentToken = get().token;

        if (currentToken && typeof window !== "undefined") {
          import("@/lib/api/auth").then(({ authApi }) => {
            authApi.logout(currentToken).catch(() => {});
          });
        }

        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
        }
      },

      updateTokens: (token: string, refreshToken: string) => {
        set({ token, refreshToken });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      verifyAuth: async (): Promise<boolean> => {
        const { token, refreshToken } = get();

        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return false;
        }

        try {
          await authApi.verifyToken(token);
          set({ isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          if (refreshToken) {
            try {
              const newTokens = await authApi.refreshToken(refreshToken);

              set({
                token: newTokens.token,
                refreshToken: newTokens.refreshToken,
                isAuthenticated: true,
                isLoading: false,
              });
              return true;
            } catch (refreshError) {
              get().logout();
              return false;
            }
          } else {
            get().logout();
            return false;
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
          state.verifyAuth();
        }
      },
    }
  )
);
