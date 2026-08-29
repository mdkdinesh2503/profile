import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { Reveal } from "@/shared/motion/Reveal";
import { getProjectsByCategory } from "@/lib/projects";
import { headings } from "@/data/headings";
import { education } from "@/data/education";
import { skills } from "@/data/experience";
import { SKILL_ICON_MAP, PILLAR_ICONS, PILLAR_GRADIENT, PILLAR_GLOW } from "@/data/skills";
import { HeroPortrait, ButtonLink } from "@/shared/ui";
import {
  ArrowRight, MapPin, Activity, Calendar, User, GraduationCap,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { cx } from "@/shared/ui/cx";

const FEATURED_PER_SECTION = 3;

// ─── SkillTag ─────────────────────────────────────────────────────────────────
function SkillTag({
  name,
  isOpen,
  delay,
  accentColor,
}: {
  name: string;
  isOpen: boolean;
  delay: number;
  accentColor: string;
}) {
  const meta = SKILL_ICON_MAP[name];
  const IconComp = meta?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.94 }}
      animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.94 }}
      transition={{ duration: 0.22, delay: isOpen ? delay : 0 }}
      className="group/tag relative rounded-xl overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: `inset 0 0 0 1px ${accentColor}44`,
      }}
      whileHover={{
        boxShadow: `inset 0 0 0 1px ${accentColor}bb, 0 0 18px ${accentColor}44`,
        background: `linear-gradient(135deg, ${accentColor}14 0%, ${accentColor}06 100%)`,
      }}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 -translate-x-full skew-x-12"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}22, transparent)` }}
        whileHover={{ translateX: "200%" }}
        transition={{ duration: 0.5 }}
      />
      {/* Top micro-glow bar */}
      <div
        className="absolute inset-x-0 top-0 h-[1.5px] opacity-60 group-hover/tag:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      <div className="relative flex items-center gap-2 px-3 py-2 w-full">
        {IconComp ? (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-transform duration-200 group-hover/tag:scale-110"
            style={{ background: `${accentColor}22` }}
          >
            <IconComp size={13} style={{ color: accentColor }} />
          </span>
        ) : (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
            style={{ background: `${accentColor}22` }}
          >
            <Code2 size={12} style={{ color: accentColor }} />
          </span>
        )}
        <span className="text-[12px] font-semibold text-white leading-none">{name}</span>
      </div>
    </motion.div>
  );
}

// ─── SkillsPillars ────────────────────────────────────────────────────────────
function SkillsPillars() {
  const [active, setActive] = useState<number | null>(null);

  const CORNER_STYLE = "absolute w-5 h-5 z-20 pointer-events-none";
  const CORNER_COLOR = "rgba(125,211,252,0.9)";
  const cornerGlow = { filter: "drop-shadow(0 0 6px rgba(125,211,252,0.8))" };

  return (
    <div className="relative p-[2px] rounded-3xl">
      {/* Glowing corner brackets */}
      <div className={cx(CORNER_STYLE, "top-0 left-0")} style={{ borderTop: `2px solid ${CORNER_COLOR}`, borderLeft: `2px solid ${CORNER_COLOR}`, borderRadius: "10px 0 0 0", ...cornerGlow }} />
      <div className={cx(CORNER_STYLE, "top-0 right-0")} style={{ borderTop: `2px solid ${CORNER_COLOR}`, borderRight: `2px solid ${CORNER_COLOR}`, borderRadius: "0 10px 0 0", ...cornerGlow }} />
      <div className={cx(CORNER_STYLE, "bottom-0 left-0")} style={{ borderBottom: `2px solid ${CORNER_COLOR}`, borderLeft: `2px solid ${CORNER_COLOR}`, borderRadius: "0 0 0 10px", ...cornerGlow }} />
      <div className={cx(CORNER_STYLE, "bottom-0 right-0")} style={{ borderBottom: `2px solid ${CORNER_COLOR}`, borderRight: `2px solid ${CORNER_COLOR}`, borderRadius: "0 0 10px 0", ...cornerGlow }} />

      <div
        className="flex h-[580px] gap-2 overflow-hidden rounded-[22px]"
        onMouseLeave={() => setActive(null)}
      >
        {skills.map((group, idx) => {
          const PillarIcon = PILLAR_ICONS[idx] ?? PILLAR_ICONS[0];
          const isOpen = active === idx;

          return (
            <motion.div
              key={group.group}
              className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              animate={{ flex: isOpen ? 5 : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onMouseEnter={() => setActive(idx)}
              onClick={() => setActive(isOpen ? null : idx)}
              style={isOpen ? { boxShadow: `0 0 80px 4px ${PILLAR_GLOW}` } : {}}
            >
              {/* Top accent bar */}
              <motion.div
                className={cx("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r", PILLAR_GRADIENT)}
                animate={{ opacity: isOpen ? 1 : 0.35 }}
                transition={{ duration: 0.4 }}
              />

              {/* Background bloom */}
              <motion.div
                className={cx("absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl bg-gradient-to-br", PILLAR_GRADIENT)}
                animate={{ opacity: isOpen ? 0.15 : 0.03 }}
                transition={{ duration: 0.5 }}
              />

              {/* Collapsed: icon + vertical label */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-1 py-6"
                animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.88 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={cx("flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white shrink-0", PILLAR_GRADIENT)}
                  style={{ boxShadow: "0 0 18px rgba(56,189,248,0.5)" }}
                >
                  <PillarIcon size={15} />
                </div>
                <div
                  className="w-5 h-px shrink-0"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(148,163,184,0.5), transparent)" }}
                />
                <span
                  className="text-[11px] font-bold uppercase select-none flex-1 flex items-center"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.92)",
                    textShadow: "0 0 12px rgba(125,211,252,0.55)",
                  }}
                >
                  {group.group}
                </span>
              </motion.div>

              {/* Expanded: skills grid */}
              <motion.div
                className="relative z-10 flex h-full min-w-0 flex-col p-6"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.28, delay: isOpen ? 0.1 : 0 }}
              >
                <div className="flex items-center gap-3.5 mb-5 shrink-0">
                  <div
                    className={cx("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white", PILLAR_GRADIENT)}
                    style={{ boxShadow: `0 4px 20px ${PILLAR_GLOW}` }}
                  >
                    <PillarIcon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white mb-0.5 opacity-40">
                      {idx + 1} / {skills.length}
                    </p>
                    <h3 className="text-base font-bold leading-tight truncate text-white">
                      {group.group}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 overflow-y-auto flex-1 content-start [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
                  {group.items.map((s, i) => (
                    <SkillTag key={s} name={s} isOpen={isOpen} delay={0.12 + i * 0.03} accentColor={PILLAR_GLOW} />
                  ))}
                </div>

                <div className="pt-4 mt-2 border-t border-line shrink-0">
                  <span className={cx("inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold text-white tracking-widest uppercase", PILLAR_GRADIENT)}>
                    {group.items.length} skills
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export function HomePage() {
  const realTimeFeatured = getProjectsByCategory("real-time").slice(0, FEATURED_PER_SECTION);

  const heroImageHref = profile.avatar
    ? profile.avatar.startsWith("./")
      ? profile.avatar.slice(1)
      : profile.avatar
    : null;

  return (
    <>
      <PageMeta
        title="Dinesh Kumar M"
        description={profile.hero.subhead}
        path="/"
        ogType="profile"
      />
      {heroImageHref && (
        <Helmet>
          <link rel="preload" as="image" href={heroImageHref} />
        </Helmet>
      )}

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-x-clip min-h-[90dvh] flex flex-col justify-center">
        <Container className="w-full">
          <div className="flex flex-col-reverse items-center md:items-start gap-12 md:grid md:grid-cols-[1fr_420px] md:items-center md:gap-14">

            {/* Left: text block */}
            <div className="max-w-xl flex flex-col gap-0">
              <Reveal>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium tracking-wide text-muted-1 uppercase">
                    Hi there, I'm
                  </p>
                  <p className="font-extrabold leading-[1.0] tracking-tight text-[clamp(2.2rem,4.5vw,3rem)]">
                    <span className="text-ink">Dinesh </span>
                    <span className="hero-gradient-text">Kumar</span>
                  </p>
                </div>
              </Reveal>

              {/* Decorative separator */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-[2px] w-12 rounded-full" style={{ background: "var(--gradient-primary)" }} />
                <div className="h-1.5 w-1.5 rounded-full shrink-0 bg-primary" style={{ boxShadow: "0 0 6px rgba(56,189,248,0.8)" }} />
                <div className="h-px flex-1 rounded-full bg-line" />
              </div>

              {/* Main headline */}
              <Reveal delay={0.04}>
                <h1 className="mt-6 font-bold leading-[1.08] tracking-tight text-ink text-[clamp(2.4rem,5vw,3.5rem)]">
                  Good software
                  <span className="block hero-gradient-text">survives production.</span>
                </h1>
              </Reveal>

              {/* Principle callout */}
              <Reveal delay={0.07}>
                <div className="mt-6 pl-4 border-l-2 border-primary">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1.5">
                    My principle
                  </p>
                  <p className="text-muted-1 text-base md:text-lg leading-relaxed">
                    I build backend systems — not just to work, but to{" "}
                    <span className="text-ink font-semibold">survive real users, real failures, and real production.</span>
                  </p>
                </div>
              </Reveal>

              {/* Micro-stats */}
              <Reveal delay={0.10}>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-ink">{profile.hero.yearsExperience}</span>
                    <span className="text-xs text-muted-1 mt-0.5 uppercase tracking-wider">Experience</span>
                  </div>
                  <div className="w-px h-10 bg-line" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-ink">5+</span>
                    <span className="text-xs text-muted-1 mt-0.5 uppercase tracking-wider">Projects</span>
                  </div>
                  <div className="w-px h-10 bg-line" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-ink">10+</span>
                    <span className="text-xs text-muted-1 mt-0.5 uppercase tracking-wider">Tech Stack</span>
                  </div>
                </div>
              </Reveal>

              {/* CTA buttons */}
              <Reveal delay={0.13}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <ButtonLink to={profile.primaryCta.href} variant="shine" size="lg" className="group">
                    {profile.primaryCta.label}
                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </ButtonLink>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line px-8 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:border-primary hover:scale-[1.03] active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Say Hello
                      <span className="inline-block transition-transform duration-300 origin-bottom-right group-hover:rotate-[20deg] group-hover:scale-110">
                        👋
                      </span>
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: portrait */}
            <div className="flex w-full justify-center md:w-auto md:pt-2">
              <Reveal delay={0.06}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <HeroPortrait
                    src={profile.avatar}
                    alt={profile.name}
                    initials={profile.hero.initials ?? profile.name.slice(0, 2).toUpperCase()}
                    yearsExperience={profile.hero.yearsExperience ?? ""}
                    className="mx-auto"
                  />
                </motion.div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Philosophy ───────────────────────────────────────── */}
      <section className="relative min-h-[50dvh] flex flex-col justify-center mb-20">
        <Container>
          <Reveal>
            <motion.div
              className="group relative rounded-[2.5rem] p-8 md:p-14 shadow-glass hover:hover-shadow"
              whileHover="hovered"
              initial="idle"
            >
              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest text-primary mb-6">
                  <span className="h-px w-12 bg-line" />
                  <span className="hero-gradient-text font-bold tracking-[0.2em]">Engineering with Purpose</span>
                  <span className="h-px w-12 bg-line" />
                </div>

                <blockquote className="text-2xl md:text-4xl lg:text-5xl font-medium text-ink leading-[1.25] mb-10 tracking-tight">
                  <span className="text-primary text-4xl leading-none font-serif md:text-6xl inline-block align-top mr-2 opacity-40">"</span>
                  A truly great system is one you{" "}
                  <span className="hero-gradient-text drop-shadow-sm">never have to think about</span>.
                  {" "}It just works—no matter the load, no matter the scale.
                  <span className="text-primary text-4xl leading-none font-serif md:text-6xl inline-block align-bottom ml-2 opacity-40">"</span>
                </blockquote>
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-center pt-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
            <SectionHeading
              eyebrow={headings.skills.eyebrow}
              title={headings.skills.title}
              description={headings.skills.description}
            />
          </div>
          <SkillsPillars />
        </Container>
      </section>

      {/* ── Real-time Projects ───────────────────────────────── */}
      <section className="realtime-section-bg relative mt-14 md:mt-20 overflow-hidden rounded-3xl py-12 md:py-16">
        <Container className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={headings.selectedWorkRealTime.eyebrow}
              title={headings.selectedWorkRealTime.title}
              description={headings.selectedWorkRealTime.description}
            />
            <div className="hidden md:block">
              <Link
                to="/projects"
                className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                View all
                <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {realTimeFeatured.map((p, idx) => (
              <Reveal key={p.slug} delay={0.04 * idx}>
                <Link to={`/projects/${p.slug}`} className="group flex h-full">
                  <div className="glass-card-outer glass-card-panel relative flex flex-col rounded-2xl ease-out hover:hover-shadow">
                    <div className="relative flex flex-1 flex-col rounded-xl p-5 md:p-6 transition-all duration-300">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          <span className="realtime-live-dot" />
                          Real-time
                        </span>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary transition-transform group-hover:scale-110">
                          <Activity size={18} strokeWidth={2} aria-hidden />
                        </div>
                      </div>

                      <h3 className="mt-3 text-base font-semibold text-ink md:text-lg">{p.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1 line-clamp-3">
                        {p.context ?? p.summary}
                      </p>

                      {/* Tags */}
                      {p.tags?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-md border border-primary px-2 py-0.5 text-[11px] font-medium text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meta */}
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-1">
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
            ))}
          </div>

          {/* Mobile: view all link */}
          <div className="mt-8 md:hidden">
            <Link
              to="/projects"
              className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-primary bg-surface px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              View all projects
              <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Education ────────────────────────────────────────── */}
      <section className="relative min-h-[50dvh] flex flex-col justify-center py-10 md:py-20 mb-10">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
            <SectionHeading
              eyebrow={headings.education.eyebrow}
              title={headings.education.title}
              description={headings.education.description}
            />
          </div>

          <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
            {education.map((item, idx) => (
              <Reveal key={item.institution} delay={0.04 * idx} className="w-full">
                <div className="group relative w-full overflow-hidden rounded-[2rem] border border-line hover:-translate-y-2 hover:hover-shadow">

                  <div className="relative z-10 flex flex-col md:flex-row h-full rounded-[31px] backdrop-blur-xl overflow-hidden">

                    {/* Left panel */}
                    <div className="relative flex w-full md:w-72 flex-col justify-center items-center p-8 border-b md:border-b-0 md:border-r border-line overflow-hidden">
                      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-primary text-primary transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                        <GraduationCap size={48} strokeWidth={1.2} />
                      </div>
                      <div className="mt-8 flex flex-col items-center gap-1.5 z-10">
                        <span className="rounded-full border border-primary px-4 py-1.5 text-xs font-bold text-primary tracking-widest uppercase">
                          {item.startDate} — {item.endDate ?? "Present"}
                        </span>
                      </div>
                    </div>

                    {/* Right panel */}
                    <div className="relative flex flex-1 flex-col justify-between p-6 md:p-8 lg:p-10">
                      <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-bold tracking-tight brand-gradient-text w-fit">
                              {item.degree}
                            </h3>
                            <p className="mt-2 text-base font-semibold text-muted-1">
                              {item.institution}
                            </p>
                          </div>
                          {item.grade && (
                            <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-4 py-2 shadow-sm transition-transform duration-500 hover:scale-105 hover:border-primary">
                              <span className="text-xs font-bold uppercase tracking-widest text-muted-1">Grade</span>
                              <span className="text-sm font-black text-primary">{item.grade}</span>
                            </div>
                          )}
                        </div>

                        {item.coursework && (
                          <div className="mt-8">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                              <span className="h-px w-6 bg-line" />
                              Key Coursework
                            </h4>
                            <div className="flex flex-wrap gap-2.5">
                              {item.coursework.replace(/\.$/, "").split(",").map((course, i) => (
                                <span
                                  key={i}
                                  className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-muted-1 transition-all duration-300 hover:text-primary hover:border-primary hover:-translate-y-0.5 shadow-sm"
                                >
                                  {course.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-line pt-6">
                        {item.location && (
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-1 transition-colors duration-300 group-hover:text-primary">
                            <MapPin size={16} />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
