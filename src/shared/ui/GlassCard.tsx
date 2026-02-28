import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";

type GlassCardProps = PropsWithChildren<{
  className?: string;
}>;

export function GlassCard({ className, children }: GlassCardProps) {
  return (
    <div
      className={cx(
        "group rounded-2xl border border-line bg-ink/[0.06] shadow-glass-inset",
        "backdrop-blur-xl",
        "transition-all hover:-translate-y-0.5 hover:shadow-lift-1",
        className,
      )}
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </div>
  );
}