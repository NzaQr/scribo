"use client";

import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium leading-none whitespace-nowrap transition-[background-color,color,border-color,transform,opacity] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/85",
  secondary: "bg-secondary text-secondary-foreground hover:bg-border",
  outline:
    "border border-border-strong bg-paper text-foreground hover:border-foreground/40",
  ghost: "text-foreground hover:bg-muted",
  danger: "bg-danger text-danger-foreground hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem]",
  icon: "h-10 w-10 p-0",
};

/** Button classes for links and other elements that look like buttons. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseClasses, variants[variant], sizes[size], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
