"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterForm } from "@/lib/hooks/use-register-form";

export default function RegisterPage() {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useRegisterForm();

  return (
    <div className="page-shell">
      <Header />

      <main
        id="main-content"
        className="flex flex-1 items-center justify-center px-4 py-16"
      >
        <div className="w-full max-w-md animate-page-enter">
          <header className="mb-8">
            <p className="brand-mark mb-4 text-3xl">Scribo</p>
            <h1 className="font-serif text-3xl font-normal tracking-tight">
              Create account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Register to publish posts and join the conversation.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {errors.general && (
              <div
                className="rounded-md border border-danger/30 bg-danger-muted px-3 py-2 text-sm text-danger"
                role="alert"
                aria-live="polite"
              >
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
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
                    ? "border-danger focus-visible:ring-danger"
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
                  className="text-sm text-danger"
                  role="alert"
                >
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                className={
                  errors.email ? "border-danger focus-visible:ring-danger" : ""
                }
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isLoading}
                autoComplete="email"
                required
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-danger" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange("password")}
                className={
                  errors.password
                    ? "border-danger focus-visible:ring-danger"
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
                  className="text-sm text-danger"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                At least 8 characters with uppercase, lowercase, and a number.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                className={
                  errors.confirmPassword
                    ? "border-danger focus-visible:ring-danger"
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
                  className="text-sm text-danger"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="mt-8 text-sm text-muted-foreground">
            Already registered?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
