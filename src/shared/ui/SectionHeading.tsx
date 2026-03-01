import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";

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
    <div className={cx("max-w-2xl cursor-default", className)}>
      {eyebrow ? (
        <div className="text-xs font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-1">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}