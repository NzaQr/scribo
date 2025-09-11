"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterForm } from "@/hooks/use-register-form";

export default function RegisterPage() {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useRegisterForm();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              <CardDescription>
                Regístrate para comenzar a escribir y comentar
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errors.general && (
                  <div
                    className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.general}
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Your username"
                    value={formData.username}
                    onChange={handleInputChange("username")}
                    className={
                      errors.username
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    aria-invalid={!!errors.username}
                    aria-describedby={
                      errors.username ? "username-error" : undefined
                    }
                    disabled={isLoading}
                    autoComplete="username"
                    required
                  />
                  {errors.username && (
                    <p
                      id="username-error"
                      className="text-sm text-red-600"
                      role="alert"
                    >
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    className={
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-red-600"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    className={
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    disabled={isLoading}
                    autoComplete="new-password"
                    required
                  />
                  {errors.password && (
                    <p
                      id="password-error"
                      className="text-sm text-red-600"
                      role="alert"
                    >
                      {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Minimum 8 characters with uppercase, lowercase and number
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    className={
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? "confirm-password-error"
                        : undefined
                    }
                    disabled={isLoading}
                    autoComplete="new-password"
                    required
                  />
                  {errors.confirmPassword && (
                    <p
                      id="confirm-password-error"
                      className="text-sm text-red-600"
                      role="alert"
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  aria-describedby={isLoading ? "loading-text" : undefined}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      <span id="loading-text">Creating account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
