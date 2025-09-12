import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login({ email, password }),
    retry: 1,
    retryDelay: 1000,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    retry: 1,
    retryDelay: 1000,
  });
}
