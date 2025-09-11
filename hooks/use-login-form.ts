"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "./use-api";
import { useAuthStore } from "@/stores/auth-store";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function useLoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    mutate: loginMutation,
    isPending: isLoginPending,
    error: loginError,
  } = useLogin();

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.email, formData.password]);

  const handleInputChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      startTransition(() => {
        loginMutation(
          { email: formData.email, password: formData.password },
          {
            onSuccess: (data: {
              email: string;
              id: string;
              token: string;
              refreshToken: string;
              username: string;
            }) => {
              const { token, refreshToken, username, email, id } = data;
              login(token, refreshToken, {
                email: email,
                id: id,
                username: username,
              });

              router.push("/");
            },
            onError: (error) => {
              setErrors({
                general: "Invalid credentials. Try again.",
              });
            },
            onSettled: () => {
              setIsSubmitting(false);
            },
          }
        );
      });
    },
    [formData, validateForm, loginMutation, router, login]
  );

  const isLoading = isPending || isLoginPending || isSubmitting;

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}
