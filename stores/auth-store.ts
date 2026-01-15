"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api/auth";
import { User } from "@/lib/types/auth";

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
        const currentRefreshToken = get().refreshToken;

        if (currentRefreshToken && typeof window !== "undefined") {
          import("@/lib/api/auth").then(({ authApi }) => {
            authApi.logout(currentRefreshToken).catch(() => {});
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
        const { token } = get();

        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return false;
        }
        set({ isAuthenticated: true, isLoading: false });
        return true;
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
