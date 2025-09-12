"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuthStore } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, FileText, Plus } from "lucide-react";

export function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto grid grid-cols-3 h-16 items-center px-4">
        <div className="flex items-center justify-start">
          <div className="hover:scale-105 transition-transform duration-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  S
                </span>
              </div>
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
              Browse
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
          {isLoading ? (
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
          ) : isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user?.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.username}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/profile/${user?.id}`}
                      className="cursor-pointer"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/blog/create" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create Post</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-foreground hover:bg-primary/10 transition-colors min-w-[90px] px-4"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
