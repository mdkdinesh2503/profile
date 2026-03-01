import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cx } from "@/shared/ui/cx";

/**
 * Shared button components – reuse everywhere via:
 *   import { Button, ButtonLink } from "@/shared/ui"
 *
 * Button = <button> for actions. ButtonLink = <Link> styled as button for navigation.
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "gradient"
  | "accent"
  | "glow"
  | "soft"
  | "pill"
  | "shine"
  | "outline-gradient";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<ButtonSize, string> = {
  sm: "rounded-lg px-3 py-1.5 text-xs",
  md: "rounded-xl px-4 py-2.5 text-sm",
  lg: "rounded-xl px-6 py-3 text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-sm hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 focus-visible:ring-[var(--color-primary)]",
  secondary:
    "bg-surface/80 text-ink border border-line shadow-sm hover:bg-surface hover:border-primary/30 focus-visible:ring-primary/40",
  ghost:
    "bg-transparent text-ink hover:bg-ink/[0.06] border border-transparent hover:border-line focus-visible:ring-primary/40",
  gradient:
    "bg-[length:200%_200%] bg-[position:0%_50%] text-white shadow-md border-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-secondary)] hover:bg-[position:100%_50%] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-primary",
  accent:
    "text-white border-0 shadow-md bg-gradient-to-r from-[var(--color-primary)] to-[#8b5cf6] hover:opacity-95 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 focus-visible:ring-primary",
  glow:
    "bg-[var(--color-primary)] text-white shadow-sm hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_24px_var(--color-glow)] hover:-translate-y-0.5 focus-visible:ring-primary btn-glow-hover",
  soft:
    "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/30 hover:shadow-md focus-visible:ring-primary/40",
  pill:
    "rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/30 focus-visible:ring-primary/40",
  shine:
    "bg-[var(--color-primary)] text-white shadow-sm hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-lg btn-shine-wrap focus-visible:ring-primary",
  "outline-gradient":
    "btn-outline-gradient text-primary hover:bg-primary/5 hover:shadow-md focus-visible:ring-primary/40",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** Link styled as a button – use for in-app navigation (e.g. hero CTAs). */
export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}

/** Class name builders for using button styles on any element (e.g. custom Link). */
export const buttonStyles = { base, sizes, variants };