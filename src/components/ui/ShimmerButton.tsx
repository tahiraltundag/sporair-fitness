"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  background?: string;
  borderRadius?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  children: React.ReactNode;
  className?: string;
}

export function ShimmerButton({
  shimmerColor = "#facc15",
  background = "#facc15",
  borderRadius = "0px",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  children,
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-8 py-4",
        "bg-[var(--bg)] text-black font-display tracking-widest uppercase",
        "[background:var(--bg)]",
        "before:absolute before:inset-0 before:z-[-1]",
        "before:bg-[linear-gradient(90deg,transparent_25%,var(--shimmer-color)_50%,transparent_75%)]",
        "before:bg-[length:200%_100%]",
        "before:animate-[shimmer_var(--speed)_linear_infinite]",
        "hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
