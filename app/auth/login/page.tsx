"use client";

import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useLoginForm } from "@/lib/hooks/use-login-form";
import { EyeIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";

export default function LoginPage() {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to write and comment."
      line={["Pick up the draft", "you left open."]}
      footer={
        <>
          New to Scribo?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-accent hover:underline"
          >
            Create an account
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
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
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
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              className={
                errors.password
                  ? "border-danger pr-10"
                  : "pr-10"
              }
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "password-error" : undefined
              }
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon icon={showPassword ? ViewOffIcon : EyeIcon} size={16} />
            </button>
          </div>
          {errors.password && (
            <p
              id="password-error"
              className="text-sm text-danger"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
