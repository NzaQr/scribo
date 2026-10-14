import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { authApi } from "@/lib/api/auth";

// Do not retry 4xx errors: each failed login counts for the rate limit.
const retryServerErrors = (failureCount: number, error: Error) =>
  failureCount < 1 &&
  !(isAxiosError(error) && error.response && error.response.status < 500);

export const getTooManyRequestsMessage = (error: unknown) => {
  const retryAfter = isAxiosError(error)
    ? Number(error.response?.headers["retry-after"])
    : NaN;

  if (!retryAfter) return "Too many attempts. Try again later.";

  const minutes = Math.max(1, Math.ceil(retryAfter / 60));
  return `Too many attempts. Try again in ${minutes} min.`;
};

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login({ email, password }),
    retry: retryServerErrors,
    retryDelay: 1000,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    retry: retryServerErrors,
    retryDelay: 1000,
  });
}
