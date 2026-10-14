import type React from "react";
import Link from "next/link";

interface AuthShellProps {
  title: string;
  description: string;
  /** Large serif line in the dark panel; the second part shows in grey. */
  line: [string, string];
  children: React.ReactNode;
  footer: React.ReactNode;
}

/** Split layout for sign in and sign up: dark brand panel and the form. */
export function AuthShell({
  title,
  description,
  line,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-wrap bg-background">
      <aside className="flex min-w-0 flex-[1_1_30rem] flex-col justify-between gap-12 bg-foreground p-[clamp(1.5rem,5vw,4rem)] text-background">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2.5 transition-opacity hover:opacity-75"
        >
          <span
            className="brand-mark bg-background text-foreground"
            aria-hidden="true"
          >
            S
          </span>
          <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
            Scribo
          </span>
        </Link>
        <p className="hidden max-w-[16ch] font-serif text-[clamp(1.9rem,1.4rem+1.4vw,2.75rem)] leading-[1.15] tracking-[-0.015em] md:block">
          {line[0]} <em className="opacity-60">{line[1]}</em>
        </p>
        <p className="hidden text-sm opacity-60 md:block">
          Long reads on code, design and the web.
        </p>
      </aside>

      <main
        id="main-content"
        className="flex min-w-0 flex-[1_1_30rem] items-center justify-center px-6 py-[clamp(2rem,6vw,6rem)]"
      >
        <div className="w-full max-w-[400px] animate-page-enter">
          <h1 className="text-[2rem] leading-[1.15] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-2.5 text-muted-foreground">{description}</p>
          <div className="mt-9">{children}</div>
          <div className="mt-7 border-t border-border pt-6 text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </main>
    </div>
  );
}
