import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";

type CardProps = PropsWithChildren<{
  className?: string;
  hoverLift?: boolean;
}>;

export function Card({ className, hoverLift = true, children }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-line bg-surface",
        "shadow-sm",
        hoverLift ? "transition-shadow hover:shadow-lift-1" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}