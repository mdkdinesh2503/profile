import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cx } from "@/shared/ui/cx";
import { profile } from "@/data/profile";

type HeroPortraitProps = {
  src?: string;
  alt: string;
  className?: string;
  initials?: string;
  yearsExperience?: string;
  /** When true the portrait fills the full height of its grid cell */
  stretch?: boolean;
};

export function HeroPortrait({
  src,
  alt,
  className,
  initials = "DK",
  stretch = false,
}: HeroPortraitProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const hasImage = Boolean(src?.trim());

  const initialsBlock = useMemo(() => {
    return (
      <div className="grid h-full w-full place-items-center rounded-[22px] bg-gradient-to-br from-ink/[0.06] to-ink/[0.12]">
        <span className="text-2xl font-semibold tracking-tight text-ink/80 md:text-3xl">
          {initials}
        </span>
      </div>
    );
  }, [initials]);

  return (
    <div className={cx("relative", className)}>
      {/* Theme-aligned glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[34px] bg-[radial-gradient(380px_240px_at_40%_20%,var(--color-glow),transparent_55%)] blur-2xl opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[34px] bg-[radial-gradient(400px_260px_at_70%_75%,rgba(56,189,248,0.28),transparent_55%)] blur-2xl"
      />

      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[28px] border border-line bg-surface/80 shadow-lift-1",
          "backdrop-blur-xl ring-1 ring-white/[0.06]",
        )}
      >

        <div className="relative p-3">
          <div
            className={cx(
              "relative overflow-hidden rounded-[22px] bg-ink/[0.05] shadow-glass-inset",
              stretch
                ? "h-full w-[360px] min-h-[420px]"
                : "aspect-[4/5] w-[300px] md:w-[400px]",
            )}
          >
            {/* Placeholder (initials) shown until image loads or on error */}
            {(!loaded || !hasImage || failed) && initialsBlock}
            {hasImage && !failed && (
              <motion.img
                src={src}
                alt={alt}
                className={cx(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                  loaded ? "opacity-100" : "opacity-0",
                )}
                loading="eager"
                fetchPriority="high"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              />
            )}

            {/* Profile Title */}
            <div
              aria-label={profile.role}
              className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 backdrop-blur-md"
            >
              <span className="block text-xs font-bold uppercase tracking-widest hero-gradient-text">
                {profile.role}
              </span>
            </div>

            {/* Available for work pill */}
            <div
              aria-label="Available for work"
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-ink/70 px-2.5 py-1.5 backdrop-blur-md"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--color-glow)] animate-pulse"
                aria-hidden
              />
              <span className="text-xs font-medium tracking-wide text-white">
                Available for work
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}