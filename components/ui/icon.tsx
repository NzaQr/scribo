"use client";

import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { cn } from "@/lib/utils";

const DEFAULT_STROKE = 1.75;

type IconProps = Omit<HugeiconsIconProps, "strokeWidth"> & {
  strokeWidth?: number;
  className?: string;
};

/** Consistent Hugeicons stroke + optical size across the product. */
export function Icon({
  size = 18,
  strokeWidth = DEFAULT_STROKE,
  className,
  color = "currentColor",
  ...props
}: IconProps) {
  return (
    <HugeiconsIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
