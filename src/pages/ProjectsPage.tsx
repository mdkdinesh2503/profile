import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Calendar, Code, ExternalLink, Code2, CalendarDays } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { getProjectsByCategory, getLearningProjects } from "@/lib/projects";
import { headings } from "@/data/headings";
import type { ProjectPostMeta } from "@/types";

const DEFAULT_PROJECT_IMAGE = "/default/Blog.svg";

const cardLinkClass =
  "group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
const cardInnerClass =
  "relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.12),0_4px_14px_-4px_rgba(0,0,0,0.06)]";
const footerBtnClass =
  "inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-line transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10";

function ProjectCard({
  p,
  idx,
  isAcademic,
}: {
  p: ProjectPostMeta;
  idx: number;
  isAcademic?: boolean;
}) {
  const hasDemo = Boolean(p.demoUrl);
  const hasRepo = Boolean(p.repoUrl);
  const showViewCode = isAcademic && (hasDemo || hasRepo);

  const hasRoleTimeline = p.role || p.timeline;
  const hasYearStack = p.year || p.demoStack || p.originalStack;

  const cardTop = (
    <>
      <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
      <div className="relative shrink-0 overflow-hidden rounded-t-2xl bg-surface-2">
        <img
          src={p.image ?? DEFAULT_PROJECT_IMAGE}
          alt=""
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      </div>
      <div className="glass-inner relative m-2 mt-3 flex min-h-0 flex-1 flex-col rounded-xl p-5 transition-all duration-300 group-hover:bg-primary/[0.06] dark:group-hover:bg-primary/10">
        <div className="min-h-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-2">
            {hasRoleTimeline ? (
              <>
                {p.role ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {p.role}
                  </span>
                ) : null}
                {p.timeline ? (
                  <>
                    {p.role ? <span className="text-muted-2/60" aria-hidden>·</span> : null}
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {p.timeline}
                    </span>
                  </>
                ) : null}
              </>
            ) : hasYearStack ? (
              <>
                {p.year ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {p.year}
                  </span>
                ) : null}
                {p.demoStack ? (
                  <>
                    {p.year ? <span className="text-muted-2/60" aria-hidden>·</span> : null}
                    <span className="inline-flex items-center gap-1.5" title="Demo">
                      <Code2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {p.demoStack}
                    </span>
                  </>
                ) : null}
                {p.originalStack ? (
                  <>
                    {(p.year || p.demoStack) ? <span className="text-muted-2/60" aria-hidden>·</span> : null}
                    <span className="inline-flex items-center gap-1.5" title="Original / Code">
                      <Code className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {p.originalStack}
                    </span>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
          <h2 className="mt-2.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">
            {p.name}
          </h2>
          {p.summary ? (
            <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-1">
              {p.summary}
            </p>
          ) : null}
          {p.tags.length ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md border border-line bg-ink/10 px-2 py-0.5 text-[11px] font-medium text-primary dark:bg-white/10 dark:border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {!showViewCode && (
          <div className="mt-5 border-t border-line pt-5 dark:border-white/10">
            <span className={footerBtnClass}>
              View case study
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        )}
      </div>
    </>
  );

  const cardFooter = showViewCode && (
    <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 pb-5 pt-4 dark:border-white/10">
      {hasDemo && (
        <a
          href={p.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={footerBtnClass}
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          View
        </a>
      )}
      {hasRepo && (
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={footerBtnClass}
        >
          <Code className="h-4 w-4 shrink-0" aria-hidden />
          Code
        </a>
      )}
    </div>
  );

  return (
    <Reveal key={p.slug} delay={0.04 * idx} className="h-full">
      {showViewCode ? (
        <div
          className={`flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.12),0_4px_14px_-4px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-bg`}
        >
          <Link to={`/projects/${p.slug}`} className="group flex min-h-0 flex-1 flex-col">
            <div className={cardInnerClass}>{cardTop}</div>
          </Link>
          {cardFooter}
        </div>
      ) : (
        <Link to={`/projects/${p.slug}`} className={cardLinkClass}>
          <div className={cardInnerClass}>{cardTop}</div>
        </Link>
      )}
    </Reveal>
  );
}

export function ProjectsPage() {
  const realTimeProjects = getProjectsByCategory("real-time");
  const learningProjects = getLearningProjects();

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={headings.selectedWork.eyebrow}
            title={headings.selectedWork.title}
            description={headings.selectedWork.description}
          />
        </div>

        {/* Real-time projects */}
        <div className="mt-10">
          <SectionHeading
            eyebrow={headings.selectedWorkRealTime.eyebrow}
            title={headings.selectedWorkRealTime.title}
            description={headings.selectedWorkRealTime.description}
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {realTimeProjects.length ? (
              realTimeProjects.map((p, idx) => <ProjectCard key={p.slug} p={p} idx={idx} />)
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-line bg-surface/50 p-8 text-center text-sm text-muted-1">
                No real-time projects yet.
              </div>
            )}
          </div>
        </div>

        {/* Academic & self-learn projects */}
        <div className="mt-14">
          <SectionHeading
            eyebrow={headings.selectedWorkAcademic.eyebrow}
            title={headings.selectedWorkAcademic.title}
            description={headings.selectedWorkAcademic.description}
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learningProjects.length ? (
              learningProjects.map((p, idx) => (
                <ProjectCard key={p.slug} p={p} idx={idx} isAcademic />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-line bg-surface/50 p-8 text-center text-sm text-muted-1">
                No academic or self-learn projects yet.
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
