import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/shared/ui/cx";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  /** When active, use primary color highlight instead of default active style */
  activeVariant?: "default" | "primary";
};

export function Chip({ className, active, activeVariant = "default", ...props }: ChipProps) {
  const activeStyles =
    activeVariant === "primary" && active
      ? "border-primary bg-primary/10 text-primary shadow-sm"
      : active
        ? "border-line-strong bg-surface text-ink shadow-sm"
        : "border-line bg-surface-2 text-muted-1 hover:bg-surface hover:text-ink";

  return (
    <button
      className={cx(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        activeStyles,
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20",
        className,
      )}
      {...props}
    />
  );
}