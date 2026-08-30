import type { PropsWithChildren, ElementType } from "react";
import { cx } from "@/shared/ui/cx";
import { Reveal } from "@/shared/motion/Reveal";
import { Zap } from "lucide-react";

type SectionHeadingProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  icon?: ElementType;
  as?: "h1" | "h2" | "h3";
}>;

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  icon: Icon = Zap,
  as: Component = "h2",
  children,
}: SectionHeadingProps) {
  return (
    <div className={cx("max-w-2xl flex flex-col cursor-default relative z-10", className)}>
      <style>{`
        @keyframes shimmer-title-global {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text-heading {
          background-image: linear-gradient(135deg, #ffffff 0%, #e2e8f0 30%, #7dd3fc 65%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: shimmer-title-global 6s linear infinite;
        }
      `}</style>

      {eyebrow && (
        <Reveal delay={0}>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full py-1.5 backdrop-blur-md self-start">
            <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.04}>
        <Component className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight shimmer-text-heading">
          {title}
        </Component>
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
        <Reveal delay={0.08}>
          <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-muted-1 max-w-xl">
            {description}
          </p>
        </Reveal>
      )}

      {children && (
        <Reveal delay={0.12}>
          <div className="mt-6">{children}</div>
        </Reveal>
      )}
    </div>
  );
}