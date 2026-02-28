import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";

type ProseProps = PropsWithChildren<{ className?: string }>;

export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cx(
        "prose prose-slate max-w-none",
        "prose-headings:tracking-tight prose-headings:text-ink",
        "prose-p:text-muted-1",
        "prose-ul:text-ink prose-ol:text-ink prose-li:text-ink",
        "prose-strong:text-ink",
        "prose-code:text-ink prose-code:bg-ink/[0.08] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-[''] prose-code:after:content-['']",
        "prose-pre:bg-surface-2 prose-pre:text-ink prose-pre:rounded-xl prose-pre:border prose-pre:border-line",
        "dark:prose-invert",
        className,
      )}
    >
      {children}
    </div>
  );
}