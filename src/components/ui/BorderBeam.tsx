"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#facc15",
  colorTo = "#f5f0e8",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]",
        "[background:linear-gradient(var(--black),var(--black))_padding-box,linear-gradient(calc(var(--angle)*1deg),var(--color-from),var(--color-to))_border-box]",
        "[--angle:0deg] [animation:border-beam-rotate_var(--duration)s_linear_infinite] [animation-delay:var(--delay)]",
        className
      )}
    />
  );
}
