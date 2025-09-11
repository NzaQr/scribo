"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto grid grid-cols-3 h-16 items-center px-4">
        <div className="flex items-center justify-start">
          <div className="hover:scale-105 transition-transform duration-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-bold text-foreground">S</span>
            </Link>
          </div>
        </div>

        <nav className="flex justify-center">
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>
        </nav>

        <div className="flex items-center justify-end space-x-2">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
