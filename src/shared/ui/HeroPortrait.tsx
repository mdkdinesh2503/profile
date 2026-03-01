import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cx } from "@/shared/ui/cx";

type HeroPortraitProps = {
  src?: string;
  alt: string;
  className?: string;
  initials?: string;
  yearsExperience?: string;
};

export function HeroPortrait({
  src,
  alt,
  className,
  initials = "DK",
  yearsExperience,
}: HeroPortraitProps) {
  const [failed, setFailed] = useState(false);
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
        className="pointer-events-none absolute -inset-8 rounded-[34px] bg-[radial-gradient(400px_260px_at_70%_75%,rgba(37,99,235,0.18),transparent_55%)] blur-2xl"
      />

      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[28px] border border-line bg-surface/80 shadow-lift-1",
          "backdrop-blur-xl ring-1 ring-white/[0.08] dark:ring-white/[0.06]",
        )}
        style={{ backdropFilter: "blur(20px)" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Inner highlights */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_400px_at_25%_10%,rgba(255,255,255,0.25),transparent_50%)] opacity-60 dark:opacity-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_350px_at_75%_70%,rgba(37,99,235,0.12),transparent_50%)]"
        />

        <div className="relative p-3">
          <div className="relative aspect-[4/5] w-[260px] overflow-hidden rounded-[22px] bg-ink/[0.05] shadow-glass-inset md:w-[320px]">
            {hasImage && !failed ? (
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                loading="eager"
                onError={() => setFailed(true)}
              />
            ) : (
              initialsBlock
            )}

            {/* Years experience badge */}
            {yearsExperience != null && (
              <div
                aria-label={`${yearsExperience} years experience`}
                className="absolute left-3 top-3 rounded-xl border border-primary/40 bg-ink/75 px-3 py-2 shadow-[0_0_20px_var(--color-glow)] backdrop-blur-md"
              >
                <span className="block text-xl font-bold leading-none text-primary">
                  {yearsExperience}
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-white">
                  Years Exp.
                </span>
              </div>
            )}

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