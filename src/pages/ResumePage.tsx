import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
import { Reveal } from "@/shared/motion/Reveal";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";
import { Download, ExternalLink, FileText, Sparkles } from "lucide-react";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-4 disabled:opacity-60";
const btnPrimary =
  "bg-[var(--color-primary)] text-on-primary shadow-sm hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]/30";
const btnSecondary =
  "bg-surface/80 text-ink border border-line shadow-sm hover:bg-surface hover:border-primary/30 focus-visible:ring-brand-500/20";

export function ResumePage() {
  const years = profile.hero.yearsExperience;

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <Reveal delay={0}>
          <SectionHeading
            eyebrow={headings.resume.eyebrow}
            title={headings.resume.title}
            description={headings.resume.description}
          />
        </Reveal>

        {/* At-a-glance strip: role, experience, CTA hint */}
        <Reveal delay={0.06}>
          <div
            className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface/80 px-4 py-3 shadow-sm sm:px-5"
            aria-hidden
          >
            <span className="flex items-center gap-2 text-sm text-muted-1">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              <span className="font-medium text-ink">{profile.role}</span>
            </span>
            <span className="hidden text-muted-2 sm:inline" aria-hidden>
              ·
            </span>
            <span className="text-sm text-muted-2">
              {years} years experience
            </span>
            <span className="hidden text-muted-2 sm:inline" aria-hidden>
              ·
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-2">
              <FileText className="h-3.5 w-3.5" aria-hidden />
              PDF ready
            </span>
          </div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume.pdfSrc}
              download
              className={`${btnBase} ${btnPrimary}`}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              Download PDF
            </a>
            <a
              href={profile.resume.pdfSrc}
              target="_blank"
              rel="noreferrer"
              className={`${btnBase} ${btnSecondary}`}
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              Open in new tab
            </a>
          </div>
        </Reveal>

        {/* PDF preview — document viewer style */}
        <Reveal delay={0.12}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-lg ring-1 ring-black/5 dark:ring-white/5">
            {/* Viewer chrome */}
            <div className="relative flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3 sm:px-5">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/80 to-secondary"
                aria-hidden
              />
              <div className="flex gap-2 pl-2" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="min-w-0 flex-1 flex items-center gap-2 rounded-lg bg-ink/5 px-3 py-1.5">
                <FileText className="h-4 w-4 shrink-0 text-muted-2" aria-hidden />
                <span className="truncate text-sm font-medium text-ink">
                  {profile.resume.pdfTitle}.pdf
                </span>
              </div>
            </div>
            {/* Document frame: padded, paper-style inset */}
            <div className="p-2 bg-ink/5">
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-inner min-h-[70vh] h-[72vh] max-h-[720px]">
                <iframe
                  title={profile.resume.pdfTitle}
                  src={profile.resume.pdfSrc}
                  className="h-full w-full block"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
