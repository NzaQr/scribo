"use client";

import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[46px] w-full rounded-md border border-border-strong bg-input px-3.5 py-2 text-[0.9375rem] leading-none text-foreground transition-[border-color,box-shadow] duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-wash)] focus-visible:outline-none aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
