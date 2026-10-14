import Link from "next/link";

const footerLinks = [
  { href: "/blog", label: "Browse" },
  { href: "/about", label: "About" },
  { href: "/blog/create", label: "Write" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-editorial flex flex-wrap items-center justify-between gap-4 pb-12 pt-8">
        <div className="flex items-center gap-2.5">
          <span
            className="brand-mark size-[22px] rounded-md text-[0.95rem]"
            aria-hidden="true"
          >
            S
          </span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scribo
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
