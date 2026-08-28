import type { PropsWithChildren } from "react";
import { cx } from "@/shared/ui/cx";

type ProseProps = PropsWithChildren<{ className?: string }>;

export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cx(
        "prose prose-invert max-w-none",
        "prose-headings:tracking-tight prose-headings:font-semibold prose-headings:text-ink",
        "prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10",
        "prose-h3:mt-8 prose-h3:text-lg",
        "prose-p:text-muted-1 prose-p:leading-relaxed",
        "prose-ul:text-ink prose-ol:text-ink prose-li:text-muted-1 prose-li:leading-relaxed",
        "prose-strong:text-ink prose-strong:font-semibold",
        "prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-4 prose-blockquote:font-normal prose-blockquote:text-muted-1",
        "prose-hr:border-white/10",
        "prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:underline-offset-2",
        "prose-code:text-ink prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']",
        "prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-white/5 prose-pre:shadow-inner",
        className,
      )}
    >
      {children}
    </div>
  );
}