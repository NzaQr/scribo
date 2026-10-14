"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Icon } from "./icon";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="border-border"
    >
      <Icon icon={isDark ? Sun03Icon : Moon02Icon} size={18} />
    </Button>
  );
}
