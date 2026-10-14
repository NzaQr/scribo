import { cn } from "@/lib/utils";

interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "neutral" | "accent";
  className?: string;
}

const sizes = {
  sm: "size-[26px] text-[0.6875rem]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-[52px] text-base",
};

function initials(name = "") {
  const parts = name
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/** Initials in a circle. Decorative: the name always appears next to it. */
export function Avatar({
  name,
  size = "md",
  tone = "neutral",
  className,
}: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        tone === "accent"
          ? "bg-accent-wash text-accent-deep"
          : "bg-muted text-foreground",
        sizes[size],
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
