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
      ? "border-primary text-primary shadow-sm"
      : active
        ? "border-line-strong text-ink shadow-sm"
        : "border-line text-ink hover:text-primary";

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