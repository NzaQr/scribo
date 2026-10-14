"use client";

import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterForm } from "@/lib/hooks/use-register-form";

export default function RegisterPage() {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useRegisterForm();

  return (
    <AuthShell
      title="Create an account"
      description="You need an account to publish posts and comment."
      line={["Publish your first post", "in Markdown."]}
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-accent hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-[18px]" noValidate>
        {errors.general && (
          <div
            className="rounded-md border border-danger/30 bg-danger-muted px-3.5 py-2.5 text-sm text-danger"
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
                ? "border-danger"
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
              errors.email ? "border-danger" : ""
            }
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={isLoading}
            autoComplete="email"
            required
          />
          {errors.email && (
            <p id="email-error" className="text-[0.8125rem] text-danger" role="alert">
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
                ? "border-danger"
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
                ? "border-danger"
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

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
