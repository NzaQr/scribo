"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Add01Icon,
  File01Icon,
  Login03Icon,
  Logout01Icon,
  Menu02Icon,
  PencilEdit02Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Browse" },
  { href: "/about", label: "About" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-75",
        className
      )}
    >
      <span className="brand-mark" aria-hidden="true">
        S
      </span>
      <span className="brand-name">Scribo</span>
    </Link>
  );
}

export function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuthStore();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-editorial relative flex h-16 items-center justify-between gap-4">
        <Brand className="relative z-10" />

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden items-center gap-2 md:flex">
            {isLoading ? (
              <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/blog/create"
                  className={buttonVariants({ size: "sm", className: "h-10" })}
                >
                  <Icon icon={PencilEdit02Icon} size={16} />
                  Write
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Account menu"
                      className="rounded-full transition-opacity hover:opacity-80"
                    >
                      <Avatar name={user?.username} size="lg" tone="accent" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2.5 py-2">
                      <p className="text-sm font-medium">{user?.username}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${user?.id}`}>
                        <Icon icon={File01Icon} size={16} className="mr-2" />
                        My profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <Icon icon={Logout01Icon} size={16} className="mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "h-10",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/blog/create"
                  className={buttonVariants({ size: "sm", className: "h-10" })}
                >
                  <Icon icon={PencilEdit02Icon} size={16} />
                  Write
                </Link>
              </>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-border md:hidden"
                aria-label="Open menu"
              >
                <Icon icon={Menu02Icon} size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 md:hidden">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(active && "bg-muted font-medium")}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              {isLoading ? (
                <div className="px-2 py-2">
                  <div className="h-8 animate-pulse rounded-lg bg-muted" />
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="px-2.5 py-2">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/blog/create">
                      <Icon icon={Add01Icon} size={16} className="mr-2" />
                      Write a post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user?.id}`}>
                      <Icon icon={File01Icon} size={16} className="mr-2" />
                      My profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <Icon icon={Logout01Icon} size={16} className="mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">
                      <Icon icon={Login03Icon} size={16} className="mr-2" />
                      Sign in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">
                      <Icon icon={UserAdd01Icon} size={16} className="mr-2" />
                      Create an account
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
