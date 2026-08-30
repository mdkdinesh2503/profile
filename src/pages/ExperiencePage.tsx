import { useEffect, useMemo, useState, useRef } from "react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { experience, getDisplayDateRange, getDisplayDuration } from "@/data/experience";
import { headings } from "@/data/headings";
import { buttonStyles, cx } from "@/shared/ui";
import { profile } from "@/data/profile";
import { getTechIcon, getHighlightIcon } from "@/data/skills";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ChevronDown,
  Award,
  ExternalLink,
  Download,
  Sparkles,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Briefcase,
  Terminal,
  Zap,
  FileCheck2,
  TrendingUp,
  X,
  Maximize2,
} from "lucide-react";

/* ── 3D Tilt Wrapper ─────────────────────────────────────────────── */
function TiltCard({
  children,
  className = "",
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 300, damping: 25 });
  const springRy = useSpring(ry, { stiffness: 300, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rx.set(((e.clientY - cy) / rect.height) * -intensity);
    ry.set(((e.clientX - cx) / rect.width) * intensity);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Ambient Background Glows ────────────────────────────────────── */
function ExperienceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Top primary orb */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[650px] w-[850px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(61,142,255,0.11) 0%, transparent 65%)",
          animation: "orb-drift-exp 12s ease-in-out infinite",
        }}
      />
      {/* Secondary accent orb */}
      <div
        className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(129,140,248,0.08) 0%, transparent 65%)",
          animation: "orb-drift-exp 15s ease-in-out infinite 3s",
        }}
      />
      {/* Bottom left cyan orb */}
      <div
        className="absolute bottom-10 -left-20 h-[450px] w-[450px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 65%)",
          animation: "orb-drift-exp 10s ease-in-out infinite 5s",
        }}
      />
      {/* Ambient Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,142,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,142,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 40%, transparent 85%)",
        }}
      />
    </div>
  );
}

export function ExperiencePage() {
  const [selectedCertIdx, setSelectedCertIdx] = useState(0);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [expandedHighlights, setExpandedHighlights] = useState<Record<string, boolean>>({
    "Aretedge-0": true,
    "Aretedge-1": true,
    "Aretedge-2": true,
    "Aspire Systems-0": true,
  });

  const categories = useMemo(() => {
    const unique = Array.from(new Set(experience.map((i) => i.category || "Other")));
    return ["all", ...unique];
  }, []);

  const filteredExperience = useMemo(() => {
    if (activeCategoryFilter === "all") return experience;
    return experience.filter((item) => item.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  const selectedCert = profile.certifications[selectedCertIdx];

  const toggleHighlight = (key: string) => {
    setExpandedHighlights((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (!certModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [certModalOpen]);

  return (
    <>
      <PageMeta
        title={headings.experience.eyebrow}
        description={headings.experience.description}
        path="/experience"
      />

      <style>{`
        @keyframes orb-drift-exp {
          0%,100% { transform: translateX(-50%) translateY(0) scale(1); }
          50% { transform: translateX(-50%) translateY(-24px) scale(1.05); }
        }
        @keyframes title-shimmer-exp {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes timeline-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 16px rgba(61,142,255,0.8); }
        }
        .live-dot-pulse {
          animation: timeline-pulse 2.2s infinite ease-in-out;
        }
      `}</style>

      <ExperienceBackground />

      {/* ── Experience Overview ──────────────────────────────── */}
      <section className="pt-12 md:pt-16 pb-8">
        <Container>
          {/* Header with creative glowing banner */}
          <SectionHeading
            eyebrow={headings.experience.eyebrow}
            title={headings.experience.title}
            description={headings.experience.description}
            icon={Briefcase}
            as="h1"
          />

          {/* Quick Metrics Bar with 3D Tilt */}
          <Reveal delay={0.05}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3.5 lg:gap-4">
              {[
                {
                  icon: Briefcase,
                  val: `${profile.hero.yearsExperience} yrs`,
                  label: "Industry Exp",
                  glow: "rgba(61,142,255,0.15)",
                },
                {
                  icon: Building2,
                  val: "2",
                  label: "Organizations",
                  glow: "rgba(129,140,248,0.15)",
                },
                {
                  icon: ShieldCheck,
                  val: "25+",
                  label: "Prod Releases",
                  glow: "rgba(56,189,248,0.15)",
                },
                {
                  icon: Award,
                  val: `${profile.certifications.length}`,
                  label: "Verified Certificate",
                  glow: "rgba(168,85,247,0.15)",
                },
              ].map((m, idx) => (
                <TiltCard key={m.label} intensity={8}>
                  <div
                    className="group relative overflow-hidden rounded-2xl p-3.5 sm:p-5 transition-all duration-300 h-full flex flex-col justify-between"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Top corner glow */}
                    <div
                      className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${m.glow} 0%, transparent 70%)` }}
                    />
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      <div
                        className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(61,142,255,0.1)",
                          border: "1px solid rgba(61,142,255,0.2)",
                        }}
                      >
                        <m.icon size={16} className="text-primary sm:hidden" />
                        <m.icon size={20} className="text-primary hidden sm:block" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{m.val}</div>
                        <div className="text-[10px] sm:text-[11px] text-muted-2 uppercase tracking-wider font-semibold leading-tight">
                          {m.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Professional Timeline ────────────────────────────── */}
      <section className="relative flex flex-col justify-center py-6">
        <Container>
          {/* Category Filter Pills & Indicator */}
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="hidden sm:flex text-xs font-bold uppercase tracking-widest text-muted-2 mr-1 items-center gap-1.5">
                  <Terminal size={14} className="text-primary" />
                  Filter:
                </span>
                {categories.map((cat) => {
                  const isActive = activeCategoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={cx(
                        "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
                        isActive
                          ? "bg-primary text-white ring-1 ring-primary"
                          : "bg-white/[0.04] text-muted-1 border border-white/10 hover:border-primary hover:text-primary"
                      )}
                    >
                      {cat === "all" ? "All" : cat}
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-muted-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 live-dot-pulse" />
                <span>Production & Enterprise Experience</span>
              </div>
            </div>
          </Reveal>

          {/* Experience Timeline Stream with Vertical Neon Rail */}
          <div className="relative mt-10 space-y-12">
            {/* Vertical Glowing Timeline Line for larger screens */}
            <div
              className="hidden lg:block absolute left-[30px] top-6 bottom-6 w-[2px] -z-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(61,142,255,0.4) 10%, rgba(129,140,248,0.4) 85%, transparent)",
              }}
              aria-hidden
            />

            {filteredExperience.map((item, idx) => {
              const displayDuration = getDisplayDuration(item);
              const displayDateRange = getDisplayDateRange(item);

              return (
                <Reveal key={`${item.company}-${item.title}-${idx}`} delay={0.06 * idx}>
                  <div className="relative lg:pl-16">
                    {/* Glowing timeline node dot */}
                    <div
                      className="hidden lg:flex absolute left-5 top-8 -translate-x-1/2 h-6 w-6 rounded-full items-center justify-center border-2 border-primary bg-[#030712] z-10 shadow-[0_0_15px_rgba(61,142,255,0.6)]"
                      aria-hidden
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>

                    <TiltCard intensity={4}>
                      <article
                        className="group relative overflow-hidden rounded-3xl transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          backdropFilter: "blur(14px)",
                          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
                        }}
                      >
                        {/* Animated Glowing Top Accent Strip */}
                        <div
                          className="h-1 w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(90deg, #3d8eff 0%, #818cf8 50%, #38bdf8 100%)",
                            boxShadow: "0 0 12px rgba(61,142,255,0.5)",
                          }}
                        />

                        <div className="p-4 sm:p-6 md:p-8 lg:p-9">
                          {/* Header: Company Logo, Title, Role, & Duration Info */}
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-start gap-3 sm:gap-4">
                              {/* Company Logo / Avatar Container */}
                              <div
                                className="relative flex h-11 w-11 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105 p-1.5 sm:p-2"
                                style={{
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                                }}
                              >
                                {item.logo ? (
                                  <img
                                    src={item.logo}
                                    alt={item.company}
                                    className="h-full w-full object-contain rounded-lg sm:rounded-xl"
                                  />
                                ) : (
                                  <Building2 className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                                )}
                              </div>

                              {/* Title & Metadata */}
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                                    {item.title}
                                  </h2>
                                  <span className="rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary border border-primary">
                                    {item.category || "Experience"}
                                  </span>
                                </div>

                                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-muted-1">
                                  <span className="font-bold text-white tracking-wide">{item.company}</span>
                                  {item.location && (
                                    <span className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-2">
                                      <MapPin size={11} className="shrink-0 text-primary" />
                                      {item.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right Timeline Date Pills */}
                            <div className="flex flex-row flex-wrap md:flex-col md:items-end gap-2 shrink-0">
                              <div
                                className="flex items-center gap-1.5 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white/90"
                                style={{
                                  background: "rgba(255,255,255,0.04)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                <Calendar size={11} className="text-primary shrink-0" />
                                <span>{displayDateRange}</span>
                              </div>
                              <div
                                className="flex items-center gap-1.5 rounded-xl px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-primary"
                                style={{
                                  background: "rgba(61,142,255,0.08)",
                                  border: "1px solid rgba(61,142,255,0.22)",
                                }}
                              >
                                <Clock size={11} className="shrink-0" />
                                <span>{displayDuration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Summary Paragraph */}
                          {item.summary && (
                            <p
                              className="mt-4 rounded-2xl p-3.5 sm:p-5 text-sm leading-relaxed text-muted-1"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              {item.summary}
                            </p>
                          )}

                          {/* Domain & Scope Badges */}
                          {item.domains && item.domains.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.domains.map((dom) => (
                                <span
                                  key={dom}
                                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-semibold text-muted-1"
                                  style={{
                                    background: "rgba(61,142,255,0.06)",
                                    border: "1px solid rgba(61,142,255,0.2)",
                                  }}
                                >
                                  <Sparkles size={12} className="text-primary" />
                                  {dom}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Sub-Roles timeline progression */}
                          {item.roles && item.roles.length > 0 && (
                            <div
                              className="mt-6 rounded-2xl p-4 sm:p-5"
                              style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-2 mb-3.5 flex items-center gap-1.5">
                                <TrendingUp size={14} className="text-primary" />
                                Timeline & Role Progression
                              </div>
                              <div className="space-y-3">
                                {item.roles.map((role, rIdx) => (
                                  <div
                                    key={`${role.title}-${rIdx}`}
                                    className="flex items-start gap-3 border-l-2 border-primary/50 pl-3.5 py-0.5"
                                  >
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-white tracking-wide">
                                        {role.title}
                                      </div>
                                      <div className="text-xs text-muted-2 mt-0.5">
                                        {role.employmentType} · {role.timeframe}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Structured Highlight Modules (Accordion) */}
                          {item.highlights && item.highlights.length > 0 && (
                            <div className="mt-6 space-y-3.5">
                              <div className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                <Terminal size={14} />
                                Core Responsibilities & Impact
                              </div>

                              <div className="grid gap-3">
                                {item.highlights.map((hl, hlIdx) => {
                                  const hlKey = `${item.company}-${hlIdx}`;
                                  const isExpanded = expandedHighlights[hlKey] ?? true;

                                  return (
                                    <div
                                      key={hl.title}
                                      className="overflow-hidden rounded-2xl transition-all duration-200"
                                      style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => toggleHighlight(hlKey)}
                                        className="flex w-full items-center justify-between p-3 sm:p-4 text-left cursor-pointer hover:bg-white/[0.04] transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            {getHighlightIcon(hl.title)}
                                          </div>
                                          <span className="text-sm font-semibold tracking-wide text-white">
                                            {hl.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-2">
                                          <span className="hidden sm:inline">{hl.points.length} points</span>
                                          <ChevronDown
                                            size={16}
                                            className={cx(
                                              "transition-transform duration-200 text-primary",
                                              isExpanded ? "rotate-180" : ""
                                            )}
                                          />
                                        </div>
                                      </button>

                                      <AnimatePresence initial={false}>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22 }}
                                          >
                                            <div
                                              className="border-t p-4 sm:p-5 pt-3.5 space-y-3"
                                              style={{
                                                borderColor: "rgba(255,255,255,0.06)",
                                                background: "rgba(0,0,0,0.25)",
                                              }}
                                            >
                                              {hl.points.map((pt, pIdx) => (
                                                <div
                                                  key={pIdx}
                                                  className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-muted-1"
                                                >
                                                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                                                    <ChevronRight size={11} />
                                                  </span>
                                                  <span>{pt}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Key Outcomes / Deliverables */}
                          {(!item.highlights || item.highlights.length === 0) && item.outcomes.length > 0 && (
                            <div
                              className="mt-6 space-y-2.5 border-t pt-5"
                              style={{ borderColor: "rgba(255,255,255,0.07)" }}
                            >
                              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                <Zap size={14} />
                                Key Deliverables & Outcomes
                              </div>
                              {item.outcomes.map((o, oIdx) => (
                                <div
                                  key={oIdx}
                                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-1"
                                >
                                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <CheckCircle2 size={12} />
                                  </span>
                                  <span>{o}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tech Stack Pills with Micro Glow */}
                          {item.techStack && item.techStack.length > 0 && (
                            <div
                              className="mt-6 border-t pt-5"
                              style={{ borderColor: "rgba(255,255,255,0.07)" }}
                            >
                              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-muted-2">
                                <Code2 size={13} className="text-primary" />
                                <span>Technologies & Stack Utilized</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {item.techStack.map((tech) => (
                                  <div
                                    key={tech}
                                    className="group/tech relative rounded-xl overflow-hidden cursor-default transition-all duration-200 opacity-60"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                      border: "1px solid rgba(61,142,255,0.2)",
                                    }}
                                  >
                                    <div
                                      className="absolute inset-x-0 top-0 h-[1.5px] opacity-40 group-hover/tech:opacity-100 transition-opacity"
                                      style={{
                                        background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
                                      }}
                                    />
                                    <div className="relative flex items-center gap-2 px-3 py-1.5">
                                      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-primary">
                                        {getTechIcon(tech)}
                                      </span>
                                      <span className="text-xs font-semibold text-white/90 leading-none">
                                        {tech}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </article>
                    </TiltCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Credentials & Certifications ─────────────────────── */}
      <section id="certifications" className="relative flex flex-col justify-center pt-14 pb-5 sm:pb-10">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6">
            <SectionHeading
              eyebrow={headings.credentials.eyebrow}
              title={headings.credentials.title}
              description={headings.credentials.description}
              icon={Award}
              as="h2"
            />

            {/* Verified Count Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl self-start sm:self-auto shrink-0 mb-1"
              style={{
                background: "rgba(61,142,255,0.08)",
                border: "1px solid rgba(61,142,255,0.25)",
              }}
            >
              <FileCheck2 size={16} className="text-primary" />
              <span className="text-xs font-bold text-white">
                {profile.certifications.length} Certified Credentials
              </span>
            </div>
          </div>

          {/* Certificate Grid with 3D Tilt */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...profile.certifications]
              .sort((a, b) => {
                if (!a.year) return 1;
                if (!b.year) return -1;
                return new Date(b.year).getTime() - new Date(a.year).getTime();
              })
              .map((c, idx) => {
                const isSelected = certModalOpen && idx === selectedCertIdx;

                return (
                  <Reveal key={`${c.name}-${idx}`} delay={idx * 0.05} className="min-w-0">
                    <TiltCard intensity={7} className="h-full w-full min-w-0">
                      <article
                        className="group relative flex flex-col justify-between p-5 rounded-2xl h-full w-full overflow-hidden transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        {/* Top edge glowing accent line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, #3d8eff 50%, transparent)",
                          }}
                        />

                        <div>
                          {/* Issuer Tag & Date */}
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <div className="flex min-w-0 max-w-[60%] items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold text-primary overflow-hidden"
                              style={{
                                background: "rgba(61,142,255,0.1)",
                                border: "1px solid rgba(61,142,255,0.25)",
                              }}
                            >
                              <Award size={12} className="shrink-0" />
                              <span className="truncate">{c.issuer}</span>
                            </div>

                            {c.year && (
                              <span className="text-[11px] font-semibold text-muted-2">
                                {c.year}
                              </span>
                            )}
                          </div>

                          {/* Certificate Title & ID Card */}
                          <div
                            onClick={() => {
                              setSelectedCertIdx(idx);
                              setCertModalOpen(true);
                            }}
                            className="group/thumb relative flex items-center gap-3.5 cursor-pointer p-3.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04]"
                            style={{
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <div
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover/thumb:scale-110"
                              style={{
                                background: "rgba(61,142,255,0.12)",
                                border: "1px solid rgba(61,142,255,0.25)",
                                boxShadow: "0 0 16px rgba(61,142,255,0.15)",
                              }}
                            >
                              <Award size={20} className="text-primary" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-bold text-white leading-snug truncate transition-colors group-hover/thumb:text-primary">
                                {c.name}
                              </h3>
                              <div className="flex items-center gap-1.5 mt-1">
                                <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                                <span className="text-[11px] text-muted-2 truncate font-mono">
                                  {c.credentialId || "Verified Credential"}
                                </span>
                              </div>
                            </div>

                            {/* Quick View Action Icon */}
                            <div className="shrink-0 text-muted-2 opacity-60 group-hover/thumb:opacity-100 group-hover/thumb:text-primary transition-all">
                              <Maximize2 size={14} />
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div
                          className="mt-5 flex items-center gap-2 border-t pt-3.5"
                          style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCertIdx(idx);
                              setCertModalOpen(true);
                            }}
                            className={cx(
                              "flex-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200",
                              isSelected
                                ? "bg-primary text-white shadow-lg"
                                : "bg-white/[0.04] text-white hover:text-primary hover:border-primary border border-white/10"
                            )}
                          >
                            <ExternalLink size={13} />
                            <span>Preview</span>
                          </button>

                          {c.pdf && (
                            <a
                              href={c.pdf}
                              download
                              aria-label={`Download ${c.name} Certificate`}
                              className={cx(
                                buttonStyles.base,
                                buttonStyles.sizes.sm,
                                "!flex flex-1 min-w-0 rounded-xl px-3 py-2 text-xs font-bold text-white btn-shine-wrap"
                              )}
                              style={{
                                background: "linear-gradient(135deg, #3d8eff, #818cf8)",
                                boxShadow: "0 4px 15px rgba(61,142,255,0.25)",
                              }}
                              title="Download PDF"
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </a>
                          )}
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                );
              })}
          </div>

          {/* PDF Lightbox Modal */}
          <AnimatePresence>
            {certModalOpen && selectedCert?.pdf ? (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
                  aria-label="Close preview"
                  onClick={() => setCertModalOpen(false)}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  className="relative flex flex-col w-full max-w-5xl h-[85dvh] max-h-[900px] overflow-hidden rounded-2xl sm:rounded-3xl z-10"
                  style={{
                    background: "rgba(6,10,20,0.95)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.85), 0 0 40px rgba(61,142,255,0.15)",
                  }}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Modal Header with Browser Chrome */}
                  <div
                    className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-3.5 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: "rgba(61,142,255,0.12)",
                          border: "1px solid rgba(61,142,255,0.25)",
                        }}
                      >
                        <Award size={20} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-base font-bold text-white">
                          {selectedCert.name}
                        </div>
                        <div className="flex items-center gap-2 truncate text-xs text-muted-2">
                          <span className="font-semibold text-primary">{selectedCert.issuer}</span>
                          {selectedCert.year && (
                            <>
                              <span>•</span>
                              <span>{selectedCert.year}</span>
                            </>
                          )}
                          {selectedCert.credentialId && (
                            <>
                              <span className="hidden sm:inline">•</span>
                              <span className="hidden sm:inline font-mono text-[11px] text-muted-2">
                                ID: {selectedCert.credentialId}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={selectedCert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx(
                          buttonStyles.base,
                          buttonStyles.sizes.sm,
                          "rounded-xl px-3 py-1.5 border border-white/10 text-muted-1 hover:text-primary hover:border-primary"
                        )}
                      >
                        <ExternalLink size={13} />
                        <span className="hidden sm:inline">New Tab</span>
                      </a>
                      <a
                        href={selectedCert.pdf}
                        download
                        className={cx(
                          buttonStyles.base,
                          buttonStyles.sizes.sm,
                          "rounded-xl px-3.5 py-1.5 text-white btn-shine-wrap"
                        )}
                        style={{
                          background: "linear-gradient(135deg, #3d8eff, #818cf8)",
                          boxShadow: "0 4px 15px rgba(61,142,255,0.3)",
                        }}
                      >
                        <Download size={13} />
                        <span className="hidden sm:inline">Download</span>
                      </a>
                      <button
                        type="button"
                        className="rounded-xl ml-1 p-2 text-muted-2 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={() => setCertModalOpen(false)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Document Frame */}
                  <div className="flex-1 bg-[#090d16] relative p-2">
                    <iframe
                      title={`${selectedCert.name} PDF`}
                      src={selectedCert.pdf}
                      className="h-full w-full rounded-2xl border-none"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
