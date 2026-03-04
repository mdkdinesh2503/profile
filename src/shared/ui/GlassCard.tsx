import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";

type GlassCardProps = PropsWithChildren<{
  className?: string;
  /** Inner panel class; when set, uses glass-card-outer + accent + glass-card-panel structure. */
  panelClassName?: string;
  accent?: "top" | "left";
  /** Disable hover translate (e.g. Contact, Resume). */
  noHover?: boolean;
  /** Apply blog-latest-card outer style (no hover movement). */
  blogStyle?: boolean;
}>;

const outerBase =
  "glass-card-outer relative overflow-hidden rounded-2xl";
const panelBase =
  "glass-card-panel relative m-2 mt-4 rounded-xl border border-line dark:border-white/10";

export function GlassCard({
  className,
  panelClassName,
  accent,
  noHover,
  blogStyle,
  children,
}: GlassCardProps) {
  const useGlassLayout = panelClassName != null;

  if (useGlassLayout) {
    return (
      <div
        className={cx(
          outerBase,
          blogStyle && "blog-latest-card",
          noHover && "hover:!translate-y-0",
          "group",
          className
        )}
      >
        {accent === "top" && (
          <div
            className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70"
            aria-hidden
          />
        )}
        {accent === "left" && (
          <div
            className="absolute left-0 top-0 bottom-0 z-10 w-1 bg-gradient-to-b from-primary via-primary/80 to-secondary"
            aria-hidden
          />
        )}
        <div className={cx(panelBase, panelClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "group rounded-2xl border border-line bg-ink/[0.06] shadow-glass-inset",
        "backdrop-blur-xl",
        "transition-all hover:-translate-y-0.5 hover:shadow-lift-1",
        className
      )}
      style={{ backdropFilter: "blur(16px)" }}
    >
      {children}
    </div>
  );
}
