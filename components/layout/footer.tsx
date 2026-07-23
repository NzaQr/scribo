import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-editorial grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="brand-mark mb-3 text-[1.35rem]">Scribo</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A room for writing about web development, design, and technology.
          </p>
        </div>

        <div>
          <p className="meta-label mb-3">Navigate</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground"
              >
                Browse
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-foreground"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="meta-label mb-3">Contact</p>
          <p className="text-sm text-muted-foreground">hello@scribo.com</p>
        </div>
      </div>

      <div className="container-editorial border-t border-border py-5">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Scribo
        </p>
      </div>
    </footer>
  );
}
