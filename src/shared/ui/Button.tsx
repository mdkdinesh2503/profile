import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/shared/ui/cx";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-on-primary shadow-sm hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]/30",
  secondary:
    "bg-surface/80 text-ink border border-line shadow-sm hover:bg-surface focus-visible:ring-brand-500/20",
  ghost:
    "bg-transparent text-ink hover:bg-ink/[0.06] border border-transparent hover:border-line focus-visible:ring-brand-500/20",
};

export function Button({
  className,
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium",
        "transition-colors focus:outline-none focus-visible:ring-4 disabled:opacity-60 disabled:pointer-events-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}