import { useMemo, useState } from "react";
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
      <div className="grid h-full w-full place-items-center rounded-[22px] bg-ink/[0.08]">
        <div className="text-lg font-semibold tracking-tight text-ink/90">
          {initials}
        </div>
      </div>
    );
  }, [initials]);

  return (
    <div className={cx("relative", className)}>
      {/* soft glow - primary blue */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[34px] bg-[radial-gradient(420px_280px_at_45%_25%,rgba(56,189,248,0.35),transparent_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[34px] bg-[radial-gradient(520px_320px_at_65%_70%,rgba(14,165,233,0.2),transparent_60%)] blur-2xl"
      />

      {/* glass frame */}
      <div
        className={cx(
          "relative overflow-hidden rounded-[28px] border border-line bg-surface/70 shadow-lift-1",
          "backdrop-blur-xl",
        )}
        style={{ backdropFilter: "blur(18px)" }}
      >
        {/* inner highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_30%_15%,rgba(255,255,255,0.2),transparent_45%)] opacity-50 dark:opacity-30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_80%_65%,rgba(56,189,248,0.15),transparent_55%)]"
        />

        <div className="p-3">
          <div className="relative aspect-[4/5] w-[260px] overflow-hidden rounded-[22px] border border-line bg-ink/[0.06] shadow-glass-inset md:w-[320px]">
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
            {/* Years experience badge with glow */}
            {yearsExperience != null && (
              <div
                aria-label={`${yearsExperience} years experience`}
                className="absolute left-3 top-3 rounded-lg border border-brand-500/60 bg-ink/70 px-2.5 py-1.5 shadow-[0_0_20px_rgba(56,189,248,0.3),inset_0_0_20px_rgba(56,189,248,0.06)] backdrop-blur-sm"
              >
                <div className="text-lg font-bold leading-none text-brand-500 [text-shadow:0_0_12px_rgba(56,189,248,0.7)]">
                  {yearsExperience}
                </div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-ink/80">
                  Years Exp.
                </div>
              </div>
            )}
            {/* Available for work status */}
            <div
              aria-label="Available for work"
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-ink/50 px-2.5 py-1.5 backdrop-blur-sm"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                aria-hidden
              />
              <span className="text-xs font-medium tracking-wide text-ink/95">
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}