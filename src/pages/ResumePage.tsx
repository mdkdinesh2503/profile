import { Container, SectionHeading, buttonStyles, cx } from "@/shared/ui";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";
import { Download, ExternalLink, FileText, Sparkles } from "lucide-react";

export function ResumePage() {
  const years = profile.hero.yearsExperience;

  return (
    <>
      <PageMeta
        title={headings.resume.eyebrow}
        description={headings.resume.description}
        path="/resume"
      />

      {/* ── Resume Overview ───────────────────────────────────── */}
      <section className="pt-12 md:pt-16 pb-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={headings.resume.eyebrow}
              title={headings.resume.title}
              description={headings.resume.description}
            />
          </Reveal>

          {/* At-a-glance meta pills */}
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line backdrop-blur-md px-4 py-3.5 sm:px-5">
              <span className="flex items-center gap-2 text-sm text-muted-1">
                <span className="glass-icon flex h-8 w-8 items-center justify-center rounded-lg text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-semibold text-ink">{profile.role}</span>
              </span>
              <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted-2 border border-line">
                {years} years experience
              </span>
              <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
              <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-primary border border-primary">
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
                className={cx(buttonStyles.base, buttonStyles.sizes.md, buttonStyles.variants.shine)}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Download PDF
              </a>
              <a
                href={profile.resume.pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  buttonStyles.base,
                  buttonStyles.sizes.md,
                  "bg-surface/60 text-muted-1 border border-line hover:border-primary hover:text-primary"
                )}
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                Open in new tab
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── PDF Preview ───────────────────────────────────────── */}
      <section className="relative pb-10">
        <Container>
          <Reveal delay={0.12}>
            <div className="glass-card-panel rounded-2xl overflow-hidden">
              {/* Browser-chrome header */}
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 border-b border-line">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="min-w-0 flex-1 flex items-center gap-2 px-3 py-1.5">
                  <FileText className="h-4 w-4 shrink-0 text-muted-2" aria-hidden />
                  <span className="truncate text-sm font-medium text-ink">
                    {profile.resume.pdfTitle}.pdf
                  </span>
                </div>
              </div>

              {/* Document frame */}
              <div className="p-2 bg-black/20">
                <div className="overflow-hidden rounded-xl border border-line min-h-[70vh] h-[72vh] max-h-[720px]">
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
    </>
  );
}
