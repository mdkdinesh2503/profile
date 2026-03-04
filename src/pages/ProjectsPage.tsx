import { Link } from "react-router-dom";
import {
  ArrowRight,
  Activity,
  Briefcase,
  Calendar,
  Code,
  ExternalLink,
  GraduationCap,
  User,
} from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/motion/Reveal";
import { getProjectsByCategory, getLearningProjects } from "@/lib/projects";
import { headings } from "@/data/headings";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import type { ProjectPostMeta } from "@/types";

function parseStack(stack: string) {
  return stack.split(/[,&]/).map((s) => s.trim()).filter(Boolean);
}

/** Real-time project card – matches HomePage design (gradient bar, Live pill, Activity icon, tags, meta) */
function RealtimeProjectCard({ p, idx }: { p: ProjectPostMeta; idx: number }) {
  return (
    <Reveal delay={0.04 * idx} className="h-full">
      <Link to={`/projects/${p.slug}`} className="group flex h-full">
        <div className="glass-card-outer relative flex h-full w-full flex-col overflow-hidden rounded-2xl ease-out">
          <div
            className="absolute left-0 right-0 top-0 h-1.5 origin-left bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-all duration-300 ease-out group-hover:h-2 group-hover:opacity-100"
            aria-hidden
          />
          <div
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/[0.1] blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/[0.15]"
            aria-hidden
          />
          <div className="glass-card-panel relative m-2.5 mt-5 flex flex-1 flex-col rounded-xl p-5 md:p-6 transition-all duration-300 group-hover:bg-primary/[0.06] dark:group-hover:bg-primary/10">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
                aria-hidden
              >
                <span className="realtime-live-dot" />
                Real-time
              </span>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                <Activity size={18} strokeWidth={2} aria-hidden />
              </div>
            </div>
            <h2 className="mt-3 line-clamp-2 text-base font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary md:text-lg">
              {p.name}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1 line-clamp-3">
              {p.context ?? p.summary}
            </p>
            {p.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-primary bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-2">
              {p.role && (
                <span className="inline-flex items-center gap-1">
                  <User size={12} className="shrink-0 text-muted-1" aria-hidden />
                  {p.role}
                </span>
              )}
              {(p.timeline || p.year) && (
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} className="shrink-0 text-muted-1" aria-hidden />
                  {p.timeline ?? p.year}
                </span>
              )}
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Read case study
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** Academic/self-learn card – same visual style as real-time (gradient bar, Learning pill, icon); View/Code links below when present */
function AcademicProjectCard({
  p,
  idx,
}: {
  p: ProjectPostMeta;
  idx: number;
}) {
  const hasDemo = Boolean(p.demoUrl);
  const hasRepo = Boolean(p.repoUrl);
  const showViewCode = hasDemo || hasRepo;
  const hasTech = Boolean(p.demoStack || p.originalStack);

  const cardContent = (
    <div className="glass-card-outer relative flex h-full w-full flex-col overflow-hidden rounded-2xl ease-out">
      <div
        className="absolute left-0 right-0 top-0 h-1.5 origin-left bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-all duration-300 ease-out group-hover:h-2 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/[0.1] blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/[0.15]"
        aria-hidden
      />
      <div className="glass-card-panel relative m-2.5 mt-5 flex flex-1 flex-col rounded-xl p-5 md:p-6 transition-all duration-300 group-hover:bg-primary/[0.06] dark:group-hover:bg-primary/10">
        <h2 className="mt-3 line-clamp-2 text-base font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary md:text-lg">
          {p.name}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1 line-clamp-3">
          {p.context ?? p.summary}
        </p>
        {hasTech && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.originalStack
              ? parseStack(p.originalStack).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-primary bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
                  >
                    {tech}
                  </span>
                ))
              : null}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-2">
          {p.role && (
            <span className="inline-flex items-center gap-1">
              <Briefcase size={12} className="shrink-0 text-muted-1" aria-hidden />
              {p.role}
            </span>
          )}
          {(p.timeline || p.year) && (
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} className="shrink-0 text-muted-1" aria-hidden />
              {p.timeline ?? p.year}
            </span>
          )}
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          {showViewCode ? "View project" : "Read case study"}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </div>
      </div>
    </div>
  );

  return (
    <Reveal delay={0.04 * idx} className="h-full">
      {showViewCode ? (
        <div className="flex h-full flex-col">
          <Link to={`/projects/${p.slug}`} className="group flex min-h-0 flex-1 flex-col outline-none">
            {cardContent}
          </Link>
          <div className="glass-card-panel m-2.5 mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-line px-4 py-2.5 dark:border-white/10">
            {hasDemo && (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-primary/15 dark:hover:bg-primary/25"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
                View
              </a>
            )}
            {hasRepo && (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-primary/15 dark:hover:bg-primary/25"
              >
                <Code className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:scale-110" aria-hidden />
                Code
              </a>
            )}
          </div>
        </div>
      ) : (
        <Link to={`/projects/${p.slug}`} className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
          {cardContent}
        </Link>
      )}
    </Reveal>
  );
}

export function ProjectsPage() {
  const realTimeProjects = getProjectsByCategory("real-time");
  const learningProjects = getLearningProjects();

  return (
    <div className="relative pt-12 md:pt-16">
      <Reveal delay={0}>
        <Container className="mb-10 md:mb-12">
          <SectionHeading
            eyebrow={headings.selectedWork.eyebrow}
            title={headings.selectedWork.title}
            description={headings.selectedWork.description}
          />
        </Container>
      </Reveal>

      {/* Real-time – same design as HomePage */}
      <section className="realtime-section-bg relative overflow-hidden rounded-3xl">
        <Container className="relative">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Activity className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              {headings.selectedWorkRealTime.eyebrow}
            </p>
            <h2 className="text-base font-semibold text-ink md:text-lg">
              {headings.selectedWorkRealTime.title}
            </h2>
          </div>
        </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {realTimeProjects.length ? (
              realTimeProjects.map((p, idx) => (
                <RealtimeProjectCard key={p.slug} p={p} idx={idx} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-line bg-surface/50 py-10 text-center text-sm text-muted-1 dark:border-white/15">
                No real-time projects yet.
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Academic & self-learn (Learning projects) – enhanced section */}
      <section className="academic-section-bg relative overflow-hidden rounded-3xl py-12 md:py-16">
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {headings.selectedWorkAcademic.eyebrow}
                </p>
                <h2 className="text-base font-semibold text-ink md:text-lg">
                  {headings.selectedWorkAcademic.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learningProjects.length ? (
              learningProjects.map((p, idx) => (
                <AcademicProjectCard key={p.slug} p={p} idx={idx} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-line bg-surface/50 py-10 text-center text-sm text-muted-1 dark:border-white/15">
                No academic or self-learn projects yet.
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
