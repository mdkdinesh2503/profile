import { Container, SectionHeading, buttonStyles, cx } from "@/shared/ui";
import { Reveal } from "@/shared/motion/Reveal";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";
import { Download, ExternalLink, FileText, Sparkles } from "lucide-react";

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

        {/* At-a-glance: role, experience, PDF ready — same 2-layer structure as certification */}
        <Reveal delay={0.06}>
          <div className="glass-card-outer group relative mt-8 overflow-hidden rounded-2xl hover:!translate-y-0">
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
            <div className="glass-card-panel relative m-2 mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-line px-4 py-3.5 dark:border-white/10 sm:px-5">
              <span className="flex items-center gap-2 text-sm text-muted-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-semibold text-ink">{profile.role}</span>
              </span>
              <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
              <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-muted-2 ring-1 ring-line dark:bg-white/5 dark:ring-white/10">
                {years} years experience
              </span>
              <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                <FileText className="h-3.5 w-3.5" aria-hidden />
                PDF ready
              </span>
            </div>
          </div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume.pdfSrc}
              download
              className={cx(buttonStyles.base, buttonStyles.sizes.md, buttonStyles.variants.shine)}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              Download PDF
            </a>
            <a
              href={profile.resume.pdfSrc}
              target="_blank"
              rel="noreferrer"
              className={cx(
                buttonStyles.base,
                "rounded-xl px-4 py-2.5 text-sm gap-2",
                "bg-ink/5 text-ink ring-1 ring-line hover:bg-primary/10 hover:text-primary hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-primary/10 dark:hover:ring-primary/20"
              )}
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              Open in new tab
            </a>
          </div>
        </Reveal>

        {/* PDF preview — same card style as certification */}
        <Reveal delay={0.12}>
          <div className="glass-card-outer group relative mt-8 overflow-hidden rounded-2xl hover:!translate-y-0">
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
            <div className="glass-card-panel relative m-2 mt-4 flex flex-col overflow-hidden rounded-xl border border-line dark:border-white/10">
              {/* Viewer chrome */}
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 border-b border-line dark:border-white/10">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="min-w-0 flex-1 flex items-center gap-2 rounded-lg bg-ink/5 px-3 py-2 dark:bg-white/5">
                  <FileText className="h-4 w-4 shrink-0 text-muted-2" aria-hidden />
                  <span className="truncate text-sm font-medium text-ink">
                    {profile.resume.pdfTitle}.pdf
                  </span>
                </div>
              </div>
              {/* Document frame */}
              <div className="p-2 bg-ink/5 dark:bg-black/20">
                <div className="overflow-hidden rounded-lg border border-line bg-paper shadow-inner dark:border-white/10 min-h-[70vh] h-[72vh] max-h-[720px]">
                  <iframe
                    title={profile.resume.pdfTitle}
                    src={profile.resume.pdfSrc}
                    className="h-full w-full block"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
