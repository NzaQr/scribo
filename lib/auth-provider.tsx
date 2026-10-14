"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { setAuthStoreReference } from "@/lib/api/client";

// The API client reads the token from the store. Set the reference before
// any component sends a request.
setAuthStoreReference(useAuthStore);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const verifyAuth = useAuthStore((state) => state.verifyAuth);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  // Do not block the page while auth loads. Components that depend on auth
  // read `isLoading` and show their own placeholder.
  return <>{children}</>;
}
