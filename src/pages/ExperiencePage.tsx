import { useEffect, useMemo, useState } from "react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { experience, getDisplayDateRange, getDisplayDuration } from "@/data/experience";
import { headings } from "@/data/headings";
import { Button, buttonStyles, cx } from "@/shared/ui";
import { profile } from "@/data/profile";
import { AnimatePresence, motion } from "framer-motion";
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
  Server,
  Layers,
  Zap,
  Code2,
  Database,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Building2,
  BookOpen,
  Briefcase,
  Terminal,
  Flame,
} from "lucide-react";
import {
  SiRust,
  SiSpring,
  SiNestjs,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiJenkins,
  SiArgo,
  SiGrafana,
  SiAngular,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
} from "react-icons/si";

// ─── Mini Tech Icon Helper (Unified brand primary color) ────────────────────
function getTechIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("rust") || lower.includes("axum") || lower.includes("tokio") || lower.includes("tonic")) {
    return <SiRust className="text-primary" size={13} />;
  }
  if (lower.includes("spring") || lower.includes("java")) {
    return <SiSpring className="text-primary" size={13} />;
  }
  if (lower.includes("nest")) {
    return <SiNestjs className="text-primary" size={13} />;
  }
  if (lower.includes("postgres") || lower.includes("sql")) {
    return <SiPostgresql className="text-primary" size={13} />;
  }
  if (lower.includes("redis") || lower.includes("valkey")) {
    return <SiRedis className="text-primary" size={13} />;
  }
  if (lower.includes("docker")) {
    return <SiDocker className="text-primary" size={13} />;
  }
  if (lower.includes("jenkins")) {
    return <SiJenkins className="text-primary" size={13} />;
  }
  if (lower.includes("argo")) {
    return <SiArgo className="text-primary" size={13} />;
  }
  if (lower.includes("grafana")) {
    return <SiGrafana className="text-primary" size={13} />;
  }
  if (lower.includes("angular")) {
    return <SiAngular className="text-primary" size={13} />;
  }
  if (lower.includes("node")) {
    return <SiNodedotjs className="text-primary" size={13} />;
  }
  if (lower.includes("typescript")) {
    return <SiTypescript className="text-primary" size={13} />;
  }
  if (lower.includes("javascript")) {
    return <SiJavascript className="text-primary" size={13} />;
  }
  if (lower.includes("graphql")) {
    return <Zap className="text-primary" size={13} />;
  }
  if (lower.includes("grpc") || lower.includes("proto")) {
    return <Layers className="text-primary" size={13} />;
  }
  if (lower.includes("aws") || lower.includes("dynamo")) {
    return <Database className="text-primary" size={13} />;
  }
  return <Code2 className="text-primary" size={13} />;
}

// ─── Highlight Section Icons ────────────────────────────────────────────────
function getHighlightIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("ownership") || lower.includes("feature")) {
    return <Flame className="h-4 w-4 text-primary shrink-0" />;
  }
  if (lower.includes("distributed") || lower.includes("microservice") || lower.includes("backend")) {
    return <Cpu className="h-4 w-4 text-primary shrink-0" />;
  }
  if (lower.includes("production") || lower.includes("lifecycle") || lower.includes("engineering")) {
    return <ShieldCheck className="h-4 w-4 text-primary shrink-0" />;
  }
  if (lower.includes("advanced") || lower.includes("training")) {
    return <BookOpen className="h-4 w-4 text-primary shrink-0" />;
  }
  return <Sparkles className="h-4 w-4 text-primary shrink-0" />;
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
    <section className="pt-12 md:pt-16 pb-20">
      <PageMeta
        title={headings.experience.eyebrow}
        description={headings.experience.description}
        path="/experience"
      />
      <Container>
        {/* Header with creative glowing banner */}
        <Reveal>
          <SectionHeading
            eyebrow={headings.experience.eyebrow}
            title={headings.experience.title}
            description={headings.experience.description}
          />
        </Reveal>

        {/* Quick Metrics Bar */}
        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink">2+ yrs</div>
                  <div className="text-xs text-muted-2 uppercase tracking-wider font-medium">Industry Exp</div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink">2</div>
                  <div className="text-xs text-muted-2 uppercase tracking-wider font-medium">Companies & Domains</div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink">25+</div>
                  <div className="text-xs text-muted-2 uppercase tracking-wider font-medium">Prod Releases</div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink">{profile.certifications.length}</div>
                  <div className="text-xs text-muted-2 uppercase tracking-wider font-medium">Verified Credentials</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-line pb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-2 mr-2">Filter View:</span>
            {categories.map((cat) => {
              const isActive = activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-primary text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] ring-1 ring-primary/50"
                      : "bg-surface/60 text-muted-1 border border-line hover:border-primary/30 hover:text-ink hover:bg-surface"
                  )}
                >
                  {cat === "all" ? "All Tracks" : cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Experience Timeline Stream */}
        <div className="mt-8 space-y-10">
          {filteredExperience.map((item, idx) => {
            const displayDuration = getDisplayDuration(item);
            const displayDateRange = getDisplayDateRange(item);

            return (
              <Reveal key={`${item.company}-${item.title}-${idx}`} delay={0.05 * idx}>
                <article
                  className={cx(
                    "group relative overflow-hidden rounded-3xl border border-line bg-surface backdrop-blur-xl transition-all duration-500 hover:border-primary/50 shadow-glass"
                  )}
                >
                  {/* Glowing Top Accent Strip */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[#6babff] to-primary" />

                  <div className="p-6 md:p-8">
                    {/* Header: Company, Role, Badge & Date info */}
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-4">
                        {/* Company Logo / Avatar */}
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface p-2 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt={item.company}
                              className="h-full w-full object-contain rounded-lg"
                            />
                          ) : (
                            <Building2 className="h-6 w-6 text-primary" />
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-ink">
                              {item.title}
                            </h3>
                            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-surface text-primary border border-primary">
                              {item.category || "Experience"}
                            </span>
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-muted-1">
                            <span className="font-semibold text-primary">{item.company}</span>
                            <span className="text-muted-2 hidden sm:inline">·</span>
                            {item.location && (
                              <span className="flex items-center gap-1 text-xs text-muted-2">
                                <MapPin size={13} className="shrink-0 text-primary/70" />
                                {item.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Timeline Badge */}
                      <div className="flex flex-wrap md:flex-col md:items-end gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink">
                          <Calendar size={13} className="text-primary shrink-0" />
                          <span>{displayDateRange}</span>
                        </div>
                        <div className="flex items-center border border-line rounded-xl gap-1.5 px-3 py-1 text-xs font-bold text-primary">
                          <Clock size={13} className="shrink-0" />
                          <span>{displayDuration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary Paragraph */}
                    {item.summary && (
                      <p className="mt-1 rounded-2xl p-4 text-sm md:text-base leading-relaxed text-muted-1">
                        {item.summary}
                      </p>
                    )}

                    {/* Domain & Scope Badges */}
                    {item.domains && item.domains.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.domains.map((dom) => (
                          <span
                            key={dom}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-[#9fc0df]/10 px-3 py-1 text-xs font-medium text-muted-1"
                          >
                            <Sparkles size={12} className="text-primary" />
                            {dom}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Sub-Roles timeline (if present, e.g. for Aspire training phases) */}
                    {item.roles && item.roles.length > 0 && (
                      <div className="mt-6 rounded-2xl border border-line bg-surface-2/40 p-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-2 mb-3">
                          Timeline & Role Progression
                        </div>
                        <div className="space-y-3">
                          {item.roles.map((role, rIdx) => (
                            <div
                              key={`${role.title}-${rIdx}`}
                              className="flex items-start gap-3 border-l-2 border-muted-1 pl-3 py-0.5"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-normal text-ink tracking-wider">{role.title}</div>
                                <div className="text-xs text-muted-2">
                                  {role.employmentType} · {role.timeframe}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Structured Highlight Modules */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                          <Terminal size={14} />
                          Core Responsibilities & Deep Dives
                        </div>

                        <div className="grid gap-3">
                          {item.highlights.map((hl, hlIdx) => {
                            const hlKey = `${item.company}-${hlIdx}`;
                            const isExpanded = expandedHighlights[hlKey] ?? true;

                            return (
                              <div
                                key={hl.title}
                                className="overflow-hidden rounded-2xl border border-line transition-all duration-200 hover:border-primary/30"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleHighlight(hlKey)}
                                  className="flex w-full items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                                >
                                  <div className="flex items-center gap-2.5">
                                    {getHighlightIcon(hl.title)}
                                    <span className="text-sm font-medium tracking-wider text-ink">
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
                                      transition={{ duration: 0.2 }}
                                    >
                                      <div className="border-t border-line p-4 pt-3 space-y-2.5 bg-black/10">
                                        {hl.points.map((pt, pIdx) => (
                                          <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-muted-1">
                                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                              <ChevronRight size={12} />
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

                    {/* Key Outcomes / Deliverables (if no highlights or as executive summary) */}
                    {(!item.highlights || item.highlights.length === 0) && item.outcomes.length > 0 && (
                      <div className="mt-5 space-y-2.5 border-t border-line pt-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                          Key Deliverables
                        </div>
                        {item.outcomes.map((o, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-1">
                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                              <CheckCircle2 size={13} />
                            </span>
                            <span>{o}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Pills (Integrated directly in experience card - matching HomePage SkillTag styling) */}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-6 border-t border-line pt-5">
                        <div className="flex items-center gap-2 mb-3.5 text-xs font-bold uppercase tracking-widest text-muted-2">
                          <Code2 size={13} className="text-primary" />
                          <span>Technologies & Tools Used</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.techStack.map((tech) => (
                            <div
                              key={tech}
                              className="group/tech relative rounded-xl overflow-hidden cursor-default transition-all duration-200"
                              style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                                boxShadow: "inset 0 0 0 1px rgba(56,189,248,0.22)",
                              }}
                            >
                              {/* Top micro-glow bar */}
                              <div
                                className="absolute inset-x-0 top-0 h-[1.5px] opacity-40 group-hover/tech:opacity-100 transition-opacity duration-300"
                                style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }}
                              />
                              <div className="relative flex items-center gap-2 px-3 py-1.5 w-full">
                                <span
                                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-transform duration-200 group-hover/tech:scale-110"
                                  style={{ background: "rgba(56,189,248,0.12)" }}
                                >
                                  {getTechIcon(tech)}
                                </span>
                                <span className="text-[12px] font-semibold text-muted-1 leading-none">{tech}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ─── CREDENTIALS / CERTIFICATIONS SECTION ──────────────────────── */}
        <div id="certifications" className="mt-20 pt-10 border-t border-line">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <SectionHeading
                eyebrow={headings.credentials.eyebrow}
                title={headings.credentials.title}
                description={headings.credentials.description}
              />

              {/* Compact Verified Badge */}
              <div className="inline-flex items-center gap-2 border border-line px-3.5 py-1.5 rounded-full backdrop-blur-md self-start sm:self-auto shrink-0">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-muted-1">{profile.certifications.length} Verified Credentials</span>
              </div>
            </div>
          </Reveal>

          {/* Compact Certificate Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...profile.certifications]
              .sort((a, b) => {
                if (!a.year) return 1;
                if (!b.year) return -1;
                return new Date(b.year).getTime() - new Date(a.year).getTime();
              })
              .map((c, idx) => {
                const isSelected = certModalOpen && idx === selectedCertIdx;
                const accent = (c as any).accentColor || {
                  primary: "#38bdf8",
                  glow: "rgba(56, 189, 248, 0.3)",
                  border: "rgba(56, 189, 248, 0.35)",
                  bg: "rgba(56, 189, 248, 0.05)",
                  tagBg: "rgba(56, 189, 248, 0.1)",
                  text: "#38bdf8",
                };

                return (
                  <motion.article
                    key={`${c.name}-${idx}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface/50 backdrop-blur-xl p-4 sm:p-5 shadow-glass transition-all duration-300 hover:border-primary/50 hover:shadow-[0_12px_36px_rgba(56,189,248,0.15)]"
                  >
                    {/* Top edge glowing accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px] opacity-40 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-primary to-transparent"
                    />

                    <div>
                      {/* Top Header: Issuer Tag & Issue Date */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md border border-line bg-surface text-primary"
                        >
                          <Award size={12} className="shrink-0" />
                          <span>{c.issuer}</span>
                        </div>

                        {c.year && (
                          <span className="text-[11px] font-medium text-muted-1">
                            {c.year}
                          </span>
                        )}
                      </div>

                      {/* Certificate Visual Header Card */}
                      <div
                        onClick={() => {
                          setSelectedCertIdx(idx);
                          setCertModalOpen(true);
                        }}
                        className="group/thumb relative flex items-center gap-3.5 cursor-pointer overflow-hidden rounded-xl border border-line bg-surface p-3 shadow-inner transition-all duration-200 hover:border-primary"
                      >
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-primary shadow-sm transition-transform duration-200 group-hover/thumb:scale-105"
                        >
                          <Award size={20} className="text-primary" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-ink leading-snug truncate transition-colors group-hover/thumb:text-primary">
                            {c.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <ShieldCheck size={11} className="text-emerald-400 shrink-0" />
                            <span className="text-[11px] text-muted-1 truncate font-mono">
                              {(c as any).credentialId || "Verified Credential"}
                            </span>
                          </div>
                        </div>

                        {/* Quick View Icon */}
                        <div className="shrink-0 text-muted-2 opacity-60 group-hover/thumb:opacity-100 group-hover/thumb:text-primary transition-all">
                          <ExternalLink size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons (Equal Width & Prominence) */}
                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCertIdx(idx);
                          setCertModalOpen(true);
                        }}
                        className={cx(
                          "flex-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200",
                          isSelected
                            ? "bg-primary text-white shadow-md"
                            : "bg-white/[0.05] text-ink hover:bg-white/[0.1] hover:text-white border border-line"
                        )}
                      >
                        <ExternalLink size={13} />
                        <span>View</span>
                      </button>

                      {c.pdf && (
                        <a
                          href={c.pdf}
                          download
                          aria-label={`Download ${c.name} Certificate`}
                          className={cx(
                            buttonStyles.base,
                            buttonStyles.sizes.sm,
                            buttonStyles.variants.shine,
                            "flex-1 rounded-lg px-3 py-2 text-xs font-semibold"
                          )}
                          title="Download PDF"
                        >
                          <Download size={13} />
                          <span>Save</span>
                        </a>
                      )}
                    </div>
                  </motion.article>
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
                  className="relative flex flex-col w-full max-w-5xl h-[88vh] overflow-hidden rounded-3xl border border-white/15 bg-surface-2 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10"
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-line/60 bg-surface/90 px-4 sm:px-6 py-3.5 backdrop-blur-md">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <Award size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-base font-bold text-ink">
                          {selectedCert.name}
                        </div>
                        <div className="flex items-center gap-2 truncate text-xs text-muted-1">
                          <span className="font-semibold text-primary">{selectedCert.issuer}</span>
                          {selectedCert.year && (
                            <>
                              <span>•</span>
                              <span>{selectedCert.year}</span>
                            </>
                          )}
                          {(selectedCert as any).credentialId && (
                            <>
                              <span className="hidden sm:inline">•</span>
                              <span className="hidden sm:inline font-mono text-[11px] text-muted-2">
                                ID: {(selectedCert as any).credentialId}
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
                          buttonStyles.variants.primary,
                          "rounded-xl px-3 py-1.5"
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
                          buttonStyles.variants.shine,
                          "rounded-xl px-3 py-1.5"
                        )}
                      >
                        <Download size={13} />
                        <span className="hidden sm:inline">Download</span>
                      </a>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-xl ml-1 px-3 py-1.5"
                        onClick={() => setCertModalOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>

                  {/* Document iFrame with elegant frame wrapper */}
                  <div className="flex-1 bg-[#0f141c] relative">
                    <iframe
                      title={`${selectedCert.name} PDF`}
                      src={selectedCert.pdf}
                      className="h-full w-full border-none"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
