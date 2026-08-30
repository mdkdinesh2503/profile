import { Link } from "react-router-dom";
import {
  ArrowRight,
  Activity,
  Calendar,
  GraduationCap,
  Layers,
  Zap,
  BookOpen,
  Globe,
  Github,
  User,
} from "lucide-react";
import { Container } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getProjectsByCategory, getLearningProjects } from "@/lib/projects";
import { headings } from "@/data/headings";
import type { ProjectPostMeta } from "@/types";

function parseStack(stack: string) {
  return stack
    .split(/[,&]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ── Real-time project card ──────────────────────────────────────── */
function RealtimeCard({ p, idx }: { p: ProjectPostMeta; idx: number }) {
  return (
    <Reveal delay={0.04 * idx} className="h-full">
      <Link to={`/projects/${p.slug}`} className="group flex h-full">
        <div className="glass-card-outer relative flex h-full w-full flex-col rounded-xl overflow-hidden ease-out ml-5">
          <div className="glass-card-panel p-4 sm:p-5 md:p-6 rounded-xl">
            {/* Top accent — primary blue gradient */}
            <div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(61,142,255,0.3), #3d8eff, rgba(56,189,248,0.8), rgba(61,142,255,0.3))",
                boxShadow: "0 0 10px rgba(61,142,255,0.4)",
              }}
              aria-hidden
            />
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary"
                aria-hidden
              >
                <span className="realtime-live-dot" />
                Real-time
              </span>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl text-primary transition-transform group-hover:scale-110">
                <Activity size={15} className="sm:hidden" strokeWidth={2} aria-hidden />
                <Activity size={18} className="hidden sm:block" strokeWidth={2} aria-hidden />
              </div>
            </div>
            <h2 className="mt-3 line-clamp-2 text-sm sm:text-base md:text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">
              {p.name}
            </h2>
            <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-muted-1 line-clamp-3">
              {p.context ?? p.summary}
            </p>
            {p.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-primary bg-primary/5 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-primary"
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

/* ── Academic / self-learn card ─────────────────────────────────── */
function AcademicCard({ p, idx }: { p: ProjectPostMeta; idx: number }) {
  const hasDemo = Boolean(p.demoUrl);
  const hasRepo = Boolean(p.repoUrl);
  const techItems = p.originalStack ? parseStack(p.originalStack) : [];

  return (
    <Reveal delay={0.04 * idx} className="h-full">
      {/* <div className="glass-card-panel glass-card-outer rounded-2xl group relative flex h-full flex-col ml-5"> */}
      {/* Card */}
      <Link
        to={`/projects/${p.slug}`}
        className="group flex h-full"
      >

        <div
          className="glass-card-panel glass-card-outer relative flex h-full flex-col overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "none",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Top accent — primary blue gradient */}
          <div
            className="absolute left-0 right-0 top-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(61,142,255,0.3), #3d8eff, rgba(56,189,248,0.8), rgba(61,142,255,0.3))",
              boxShadow: "0 0 10px rgba(61,142,255,0.4)",
            }}
            aria-hidden
          />

          <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
                <GraduationCap className="h-3 w-3" />
                Learning
              </span>
              <div
                className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6"
                style={{
                  background: "rgba(61,142,255,0.1)",
                  border: "1px solid rgba(61,142,255,0.2)",
                }}
              >
                <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-4 line-clamp-2 text-sm sm:text-base md:text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-primary">
              {p.name}
            </h2>

            {/* Description */}
            <p className="mt-2 flex-1 line-clamp-3 text-xs sm:text-sm leading-relaxed text-muted-1">
              {p.context ?? p.summary}
            </p>

            {/* Tech stack */}
            {techItems.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {techItems.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-primary px-2 py-0.5 text-[10px] font-semibold text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 text-xs text-muted-2">
              {(p.timeline || p.year) && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary/50" />
                  {p.timeline ?? p.year}
                </span>
              )}
              <span className="ml-auto inline-flex items-center gap-1.5 text-primary font-medium">
                View project
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
          {/* Action strip */}
          {(hasDemo || hasRepo) && (
            <div
              className="flex items-center gap-2 rounded-b-2xl px-4 py-3.5"
            >
              {hasDemo && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary/15 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Globe className="h-3.5 w-3.5" />
                  View
                </a>
              )}
              {hasRepo && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-1 transition-all duration-200 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              )}
            </div>
          )}

        </div>
      </Link>


      {/* </div> */}
    </Reveal>
  );
}

/* ── Section divider ─────────────────────────────────────────────── */
function SectionLabel({
  icon: Icon,
  eyebrow,
  title,
  count,
  variant = "cyan",
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  count: number;
  variant?: "cyan" | "indigo";
}) {
  const accentBg = variant === "cyan" ? "rgba(61,142,255,0.1)" : "rgba(129,140,248,0.1)";
  const accentBorder = variant === "cyan" ? "rgba(61,142,255,0.2)" : "rgba(129,140,248,0.2)";
  const textCls = variant === "cyan" ? "text-primary" : "text-indigo-300";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon bubble */}
        <div
          className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl"
          style={{ background: accentBg, border: `1px solid ${accentBorder}`, boxShadow: `0 0 20px ${accentBg}` }}
        >
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${textCls}`} />
        </div>
        <div>
          <p
            className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-widest ${textCls}`}
          >
            {eyebrow}
          </p>
          <h2 className="mt-0.5 text-sm sm:text-lg font-bold text-white">{title}</h2>
        </div>
      </div>
      {/* Count badge */}
      <div
        className={`rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold ${textCls}`}
        style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
      >
        {count} project{count !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const realTimeProjects = getProjectsByCategory("real-time");
  const learningProjects = getLearningProjects();

  return (
    <div className="relative pt-12 pb-0 sm:pb-10 md:pt-16">
      <PageMeta
        title={headings.selectedWork.eyebrow}
        description={headings.selectedWork.description}
        path="/projects"
      />

      <style>{`
        @keyframes float-orb {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.06); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse, #3d8eff 0%, transparent 60%)",
            animation: "float-orb 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, #818cf8 0%, transparent 60%)",
            animation: "float-orb 13s ease-in-out infinite 3s",
          }}
        />
      </div>

      <Container>
        {/* ── Page Header ── */}
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={headings.selectedWork.eyebrow}
            title={headings.selectedWork.title}
            description={headings.selectedWork.description}
            icon={Layers}
            as="h1"
          >
            {/* Quick stat strip */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Zap, label: "Real-time", value: realTimeProjects.length, color: "primary" },
                { icon: BookOpen, label: "Learning", value: learningProjects.length, color: "primary" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2"
                  style={{
                    background:
                      color === "primary"
                        ? "rgba(61,142,255,0.07)"
                        : "rgba(129,140,248,0.07)",
                    border:
                      color === "primary"
                        ? "1px solid rgba(61,142,255,0.18)"
                        : "1px solid rgba(129,140,248,0.18)",
                  }}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${color === "primary" ? "text-primary" : "text-indigo-300"}`}
                  />
                  <span className="text-xs text-muted-2">{label}</span>
                  <span
                    className={`text-sm font-bold ${color === "primary" ? "text-primary" : "text-indigo-300"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </SectionHeading>
        </div>

        {/* ── Divider ── */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

        {/* ══════════════════════════════════════════
            REAL-TIME SECTION
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl py-10 px-1">

          {/* Top glow line */}
          <div
            className="absolute left-8 right-8 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(61,142,255,0.5), transparent)",
            }}
            aria-hidden
          />

          <Reveal delay={0}>
            <SectionLabel
              icon={Activity}
              eyebrow={headings.selectedWorkRealTime.eyebrow}
              title={headings.selectedWorkRealTime.title}
              count={realTimeProjects.length}
              variant="cyan"
            />
          </Reveal>

          <Reveal delay={0.02}>
            <p className="mt-1.5 ml-[3rem] sm:ml-[3.75rem] max-w-xl text-xs sm:text-sm text-muted-1">
              {headings.selectedWorkRealTime.description}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {realTimeProjects.length ? (
              realTimeProjects.map((p, idx) => (
                <RealtimeCard key={p.slug} p={p} idx={idx} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-primary py-12 text-center">
                <p className="text-sm text-muted-2">No real-time projects yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Spacer ── */}
        <div className="mt-6" aria-hidden />

        {/* ══════════════════════════════════════════
            ACADEMIC SECTION
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl py-10 px-1">
          {/* Top glow line */}
          <div
            className="absolute left-8 right-8 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(61,142,255,0.5), transparent)",
            }}
            aria-hidden
          />

          <Reveal delay={0}>
            <SectionLabel
              icon={GraduationCap}
              eyebrow={headings.selectedWorkAcademic.eyebrow}
              title={headings.selectedWorkAcademic.title}
              count={learningProjects.length}
              variant="cyan"
            />
          </Reveal>

          <Reveal delay={0.02}>
            <p className="mt-1.5 ml-[3rem] sm:ml-[3.75rem] max-w-xl text-xs sm:text-sm text-muted-1">
              {headings.selectedWorkAcademic.description}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mx-5">
            {learningProjects.length ? (
              learningProjects.map((p, idx) => (
                <AcademicCard key={p.slug} p={p} idx={idx} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-primary py-12 text-center">
                <p className="text-sm text-muted-2">No academic or self-learn projects yet.</p>
              </div>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
