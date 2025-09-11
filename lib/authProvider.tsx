"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { setAuthStoreReference } from "@/lib/api";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore();
  const { verifyAuth, isLoading } = authStore;

  useEffect(() => {
    setAuthStoreReference(useAuthStore);

    verifyAuth();
  }, [verifyAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      </div>
    );
  }

  return <>{children}</>;
}
