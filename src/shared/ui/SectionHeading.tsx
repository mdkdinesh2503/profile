import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";
import { Reveal } from "@/shared/motion/Reveal";

type SectionHeadingProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}>;

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cx("max-w-2xl flex flex-col cursor-default relative z-10", className)}>
      {eyebrow && (
        <Reveal>
          <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/5 px-1 py-1.5 mb-4 shadow-[0_0_15px_rgba(56,189,248,0.1)] backdrop-blur-md transition-all duration-300 hover:bg-primary/10 hover:border-primary/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(56,189,248,1)]" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-primary via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      
      <Reveal delay={0.04}>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-5 flex items-center gap-3">
          <div
            className="h-[2px] w-12 rounded-full"
            style={{ background: "linear-gradient(90deg, #7dd3fc, #38bdf8, #818cf8)" }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: "#38bdf8", boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
          />
          <div
            className="h-px w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(129,140,248,0.4), transparent)" }}
          />
        </div>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-1 md:text-base max-w-[85%]">
            {description}
          </p>
        </Reveal>
      )}

      {children && (
        <Reveal delay={0.16}>
          <div className="mt-6">{children}</div>
        </Reveal>
      )}
    </div>
  );
}