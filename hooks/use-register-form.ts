"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "./use-api";
import { useAuthStore } from "@/stores/auth-store";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function useRegisterForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    mutate: registerMutation,
    isPending: isRegisterPending,
    error: registerError,
  } = useRegister();

  const validateForm = useCallback((): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    } else if (formData.username.trim().length > 50) {
      newErrors.username = "Username cannot exceed 50 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof RegisterFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }

        if (field === "password" && errors.confirmPassword) {
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
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
        registerMutation(
          {
            username: formData.username.trim(),
            email: formData.email,
            password: formData.password,
          },
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
            onError: (error: any) => {
              if (error?.response?.status === 409) {
                setErrors({
                  email: "This email is already registered",
                });
              } else if (error?.response?.status === 400) {
                setErrors({
                  general: "Invalid data. Verify the information.",
                });
              } else {
                setErrors({
                  general: "Error creating account. Try again.",
                });
              }
            },
            onSettled: () => {
              setIsSubmitting(false);
            },
          }
        );
      });
    },
    [formData, validateForm, registerMutation, router, login]
  );

  const isLoading = isPending || isRegisterPending || isSubmitting;

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}
