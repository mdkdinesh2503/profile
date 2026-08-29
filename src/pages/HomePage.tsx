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
import { HeroPortrait, ButtonLink } from "@/shared/ui";
import {
  Layout,
  ArrowRight,
  MapPin,
  Activity,
  Calendar,
  User,
  GraduationCap,
  Code2,
  Layers,
  Globe,
  Zap,
  Database,
  Server,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { cx } from "@/shared/ui/cx";
import {
  SiRust, SiTypescript, SiJavascript,
  SiSpring, SiNestjs, SiNodedotjs,
  SiNextdotjs, SiAngular, SiReact,
  SiGraphql, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiJenkins, SiArgo, SiGrafana,
  SiGit, SiApachemaven, SiPostman,
} from "react-icons/si";


const FEATURED_PER_SECTION = 3;

// ─── Brand icon map for individual skills ────────────────────────────────────
const SKILL_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  "Java":              { icon: Code2,          color: "#f89820" },
  "Rust":              { icon: SiRust,         color: "#ce422b" },
  "TypeScript":        { icon: SiTypescript,   color: "#3178c6" },
  "JavaScript":        { icon: SiJavascript,   color: "#f7df1e" },
  "SQL":               { icon: Database,       color: "#a78bfa" },
  "Spring Framework":  { icon: SiSpring,       color: "#6db33f" },
  "Spring Boot":       { icon: SiSpring,       color: "#6db33f" },
  "Spring MVC":        { icon: SiSpring,       color: "#6db33f" },
  "Spring Data JPA":   { icon: SiSpring,       color: "#6db33f" },
  "Axum":              { icon: SiRust,         color: "#ce422b" },
  "Tokio":             { icon: SiRust,         color: "#ce422b" },
  "Tonic":             { icon: SiRust,         color: "#ce422b" },
  "NestJS":            { icon: SiNestjs,       color: "#e0234e" },
  "Node.js":           { icon: SiNodedotjs,    color: "#339933" },
  "Next.js":           { icon: SiNextdotjs,    color: "#ffffff" },
  "Angular":           { icon: SiAngular,      color: "#dd0031" },
  "React":             { icon: SiReact,        color: "#61dafb" },
  "REST APIs":         { icon: Globe,          color: "#60a5fa" },
  "GraphQL":           { icon: SiGraphql,      color: "#e10098" },
  "gRPC":              { icon: Zap,            color: "#a78bfa" },
  "Protocol Buffers":  { icon: Layers,         color: "#60a5fa" },
  "Third-Party API Integration": { icon: Globe, color: "#34d399" },
  "PostgreSQL":        { icon: SiPostgresql,   color: "#336791" },
  "MySQL":             { icon: SiMysql,        color: "#4479a1" },
  "DynamoDB":          { icon: Database,       color: "#4053d6" },
  "Redis":             { icon: SiRedis,        color: "#dc382d" },
  "ElastiCache/Valkey":{ icon: SiRedis,        color: "#dc382d" },
  "AWS":               { icon: Server,         color: "#ff9900" },
  "AWS SQS":           { icon: Zap,            color: "#ff9900" },
  "Docker":            { icon: SiDocker,       color: "#2496ed" },
  "ECR":               { icon: Server,         color: "#ff9900" },
  "EKS Deployment":    { icon: Server,         color: "#ff9900" },
  "CloudWatch":        { icon: Activity,       color: "#ff9900" },
  "Jenkins":           { icon: SiJenkins,      color: "#d33833" },
  "ArgoCD":            { icon: SiArgo,         color: "#ef7b4d" },
  "Grafana":           { icon: SiGrafana,      color: "#f46800" },
  "Git":               { icon: SiGit,          color: "#f05032" },
  "Maven":             { icon: SiApachemaven,  color: "#c71a36" },
  "Cargo":             { icon: SiRust,         color: "#ce422b" },
  "Postman":           { icon: SiPostman,      color: "#ff6c37" },
  "Altair GraphQL":    { icon: SiGraphql,      color: "#e10098" },
  "RedisInsight":      { icon: SiRedis,        color: "#dc382d" },
  "pgAdmin":           { icon: SiPostgresql,   color: "#336791" },
  "NoSQL Workbench":   { icon: Database,       color: "#4053d6" },
};

// Group-level pillar icons — all share the same blue gradient for a unified look
const PILLAR_CONFIG = [
  { icon: Code2,    from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Server,   from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Globe,    from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Zap,      from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Database, from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Layers,   from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Server,   from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
  { icon: Wrench,   from: "from-sky-400",   to: "to-indigo-500",  glow: "rgba(56,189,248,0.35)" },
];

// ─── SkillTag: grid cell with unified pillar accent color ─────────────────────
function SkillTag({ name, isOpen, delay, accentColor }: { name: string; isOpen: boolean; delay: number; accentColor: string }) {
  const meta = SKILL_ICON_MAP[name];
  const IconComp = meta?.icon;
  // ✦ Always use the pillar's accent color — consistent across all tags in the group
  const color = accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.94 }}
      animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.94 }}
      transition={{ duration: 0.22, delay: isOpen ? delay : 0 }}
      className="group/tag relative rounded-xl overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: `inset 0 0 0 1px ${color}44`,
      }}
      whileHover={{
        boxShadow: `inset 0 0 0 1px ${color}bb, 0 0 18px ${color}44`,
        background: `linear-gradient(135deg, ${color}14 0%, ${color}06 100%)`,
      }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full skew-x-12"
        style={{ background: `linear-gradient(90deg, transparent, ${color}22, transparent)` }}
        whileHover={{ translateX: "200%" }}
        transition={{ duration: 0.5 }}
      />
      {/* Top micro-glow bar */}
      <div
        className="absolute inset-x-0 top-0 h-[1.5px] opacity-60 group-hover/tag:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div className="relative flex items-center gap-2 px-3 py-2 w-full">
        {IconComp ? (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-transform duration-200 group-hover/tag:scale-110"
            style={{ background: `${color}22` }}
          >
            <IconComp size={13} style={{ color }} />
          </span>
        ) : (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
            style={{ background: `${color}22` }}
          >
            <Code2 size={12} style={{ color }} />
          </span>
        )}
        <span className="text-[12px] font-semibold text-white/85 leading-none">{name}</span>
      </div>
    </motion.div>
  );
}

// ─── Expanding Glass Pillars ──────────────────────────────────────────────────
function SkillsPillars() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative p-[2px] rounded-3xl">
      {/* Glowing corner brackets */}
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-5 h-5 z-20 pointer-events-none" style={{ borderTop: "2px solid rgba(125,211,252,0.9)", borderLeft: "2px solid rgba(125,211,252,0.9)", borderRadius: "10px 0 0 0", filter: "drop-shadow(0 0 6px rgba(125,211,252,0.8))" }} />
      {/* Top-right */}
      <div className="absolute top-0 right-0 w-5 h-5 z-20 pointer-events-none" style={{ borderTop: "2px solid rgba(125,211,252,0.9)", borderRight: "2px solid rgba(125,211,252,0.9)", borderRadius: "0 10px 0 0", filter: "drop-shadow(0 0 6px rgba(125,211,252,0.8))" }} />
      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0 w-5 h-5 z-20 pointer-events-none" style={{ borderBottom: "2px solid rgba(125,211,252,0.9)", borderLeft: "2px solid rgba(125,211,252,0.9)", borderRadius: "0 0 0 10px", filter: "drop-shadow(0 0 6px rgba(125,211,252,0.8))" }} />
      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0 w-5 h-5 z-20 pointer-events-none" style={{ borderBottom: "2px solid rgba(125,211,252,0.9)", borderRight: "2px solid rgba(125,211,252,0.9)", borderRadius: "0 0 10px 0", filter: "drop-shadow(0 0 6px rgba(125,211,252,0.8))" }} />

      <div
        className="flex h-[580px] gap-2 overflow-hidden rounded-[22px]"
        onMouseLeave={() => setActive(null)}
      >
      {skills.map((group, idx) => {
        const cfg = PILLAR_CONFIG[idx] ?? PILLAR_CONFIG[0];
        const PillarIcon = cfg.icon;
        const isOpen = active === idx;

        return (
          <motion.div
            key={group.group}
            className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface"
            animate={{ flex: isOpen ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onMouseEnter={() => setActive(idx)}
            onClick={() => setActive(isOpen ? null : idx)}
            style={isOpen ? { boxShadow: `0 0 80px 4px ${cfg.glow}` } : {}}
          >
            {/* Top gradient accent bar */}
            <motion.div
              className={cx("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r", cfg.from, cfg.to)}
              animate={{ opacity: isOpen ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
            />

            {/* Background bloom */}
            <motion.div
              className={cx("absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl bg-gradient-to-br", cfg.from, cfg.to)}
              animate={{ opacity: isOpen ? 0.15 : 0.03 }}
              transition={{ duration: 0.5 }}
            />

            {/* Collapsed state: icon + vertical group name */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-1 py-6"
              animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.88 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon badge */}
              <div
                className={cx("flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white shrink-0", cfg.from, cfg.to)}
                style={{ boxShadow: "0 0 18px rgba(56,189,248,0.5)" }}
              >
                <PillarIcon size={15} />
              </div>

              {/* Separator */}
              <div
                className="w-5 h-px shrink-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(148,163,184,0.5), transparent)" }}
              />

              {/* Group name — native vertical text, clean & readable */}
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

            {/* Expanded state */}
            <motion.div
              className="relative z-10 flex h-full min-w-0 flex-col p-6"
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.28, delay: isOpen ? 0.1 : 0 }}
            >
              {/* Pillar header — title always pure white, consistent across ALL pillars */}
              <div className="flex items-center gap-3.5 mb-5 shrink-0">
                <div
                  className={cx("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white", cfg.from, cfg.to)}
                  style={{ boxShadow: `0 4px 20px ${cfg.glow}` }}
                >
                  <PillarIcon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-0.5">{idx + 1} / {skills.length}</p>
                  {/* ✦ Always pure white — never inherits pillar gradient color */}
                  <h3 className="text-base font-bold leading-tight truncate" style={{ color: "#ffffff" }}>{group.group}</h3>
                </div>
              </div>

              {/* Skills — responsive grid (2-col default, wraps to fit) with animated borders */}
              <div className="grid grid-cols-2 gap-1.5 overflow-y-auto flex-1 content-start [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
                {group.items.map((s, i) => (
                  <SkillTag key={s} name={s} isOpen={isOpen} delay={0.12 + i * 0.03} accentColor={cfg.glow} />
                ))}
              </div>

              {/* Footer count */}
              <div className="pt-4 mt-2 border-t border-white/8 shrink-0">
                <span
                  className={cx("inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold text-white tracking-widest uppercase", cfg.from, cfg.to)}
                >
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

export function HomePage() {
  const realTimeFeatured = getProjectsByCategory("real-time").slice(
    0,
    FEATURED_PER_SECTION,
  );

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
      <section className="relative overflow-x-clip min-h-[90dvh] flex flex-col justify-center">
        <Container className="w-full">
          <div className="flex flex-col-reverse items-center md:items-start gap-12 md:grid md:grid-cols-[1fr_420px] md:items-center md:gap-14">
            <div className="max-w-xl flex flex-col gap-0">
              {/* Creative intro block */}
              <Reveal>
                <div className="flex flex-col gap-3">
                  {/* Eyebrow greeting */}
                  <p className="text-sm font-medium tracking-wide text-muted-2 uppercase">
                    Hi there, I'm
                  </p>
                  {/* Big name */}
                  <p className="font-extrabold leading-[1.0] tracking-tight text-[clamp(2.2rem,4.5vw,3rem)]">
                    <span className="text-ink">Dinesh </span>
                    <span className="hero-gradient-text">Kumar</span>
                  </p>
                </div>
              </Reveal>

              {/* Decorative separator */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="h-[2px] w-12 rounded-full"
                  style={{ background: "linear-gradient(90deg, #7dd3fc, #38bdf8, #818cf8)" }}
                />
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "#38bdf8", boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
                />
                <div
                  className="h-px flex-1 rounded-full"
                  style={{ background: "linear-gradient(90deg, rgba(129,140,248,0.4), transparent)" }}
                />
              </div>

              {/* Big headline */}
              <Reveal delay={0.04}>
                <h1 className="mt-6 font-bold leading-[1.08] tracking-tight text-ink text-[clamp(2.4rem,5vw,3.5rem)]">
                  Good software
                  <span className="block hero-gradient-text">survives production.</span>
                </h1>
              </Reveal>

              {/* Principle callout */}
              <Reveal delay={0.07}>
                <div className="mt-6 pl-4 border-l-2 border-primary/50">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-1.5">My principle</p>
                  <p className="text-muted-1 text-base md:text-lg leading-relaxed">
                    I build backend systems — not just to work, but to{" "}
                    <span className="text-ink font-semibold">survive real users, real failures, and real production.</span>
                  </p>
                </div>
              </Reveal>

              {/* Micro-stats row */}
              <Reveal delay={0.10}>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-ink">{profile.hero.yearsExperience}</span>
                    <span className="text-xs text-muted-2 mt-0.5 uppercase tracking-wider">Experience</span>
                  </div>
                  <div className="w-px h-10 bg-line" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-ink">5+</span>
                    <span className="text-xs text-muted-2 mt-0.5 uppercase tracking-wider">Projects</span>
                  </div>
                  <div className="w-px h-10 bg-line" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-ink">10+</span>
                    <span className="text-xs text-muted-2 mt-0.5 uppercase tracking-wider">Tech Stack</span>
                  </div>
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.13}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <ButtonLink
                    to={profile.primaryCta.href}
                    variant="shine"
                    size="lg"
                    className="group"
                  >
                    {profile.primaryCta.label}
                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </ButtonLink>
                  
                  {/* Secondary Button: Say Hello */}
                  <a
                    href={`mailto:${profile.email}`}
                    className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-surface/50 backdrop-blur-md px-8 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] active:scale-95"
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

      {/* Philosophy Section */}
      <section className="relative min-h-[50dvh] flex flex-col justify-center mb-20">
        <Container>
          <Reveal>
            <motion.div
              className="group relative rounded-[2.5rem] bg-surface/40 border border-line p-8 md:p-14 overflow-hidden shadow-glass transition-all duration-500 hover:shadow-[0_0_40px_var(--color-glow)]"
              whileHover="hovered"
              initial="idle"
            >

              {/* Animated glow orbs */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

              <motion.div
                className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/[0.08] blur-[80px]"
                variants={{ idle: { scale: 1, opacity: 0.5 }, hovered: { scale: 1.4, opacity: 1 } }}
                transition={{ duration: 1 }}
                aria-hidden
              />
              <motion.div
                className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-500/[0.08] blur-[80px]"
                variants={{ idle: { scale: 1, opacity: 0.5 }, hovered: { scale: 1.4, opacity: 1 } }}
                transition={{ duration: 1 }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

                <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest text-primary mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                  <span className="hero-gradient-text font-bold tracking-[0.2em]">Engineering with Purpose</span>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
                </div>

                <blockquote className="text-2xl md:text-4xl lg:text-5xl font-medium text-ink leading-[1.25] mb-10 tracking-tight">
                  <span className="text-primary/40 text-4xl leading-none font-serif md:text-6xl inline-block align-top mr-2">"</span>
                  A truly great system is one you <span className="hero-gradient-text drop-shadow-sm">never have to think about</span>. It just works—no matter the load, no matter the scale.
                  <span className="text-primary/40 text-4xl leading-none font-serif md:text-6xl inline-block align-bottom ml-2">"</span>
                </blockquote>
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* Skills Section — Expanding Glass Pillars */}
      <section className="relative flex flex-col justify-center pt-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
            <div className="flex flex-wrap items-center gap-3">
              <SectionHeading
                eyebrow={headings.skills.eyebrow}
                title={headings.skills.title}
                description={headings.skills.description}
              />
            </div>
          </div>

          <SkillsPillars />
        </Container>
      </section>
      {/* Selected Work: Real-time projects only */}
      <section className="realtime-section-bg relative mt-14 md:mt-20 overflow-hidden rounded-3xl py-12 md:py-16">
        <Container className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <SectionHeading
                eyebrow={headings.selectedWorkRealTime.eyebrow}
                title={headings.selectedWorkRealTime.title}
                description={headings.selectedWorkRealTime.description}
              />
            </div>
            <div className="hidden md:block">
              <Link
                to="/projects"
                className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
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
                  <div className="glass-card-outer glass-card-panel relative flex flex-col overflow-hidden rounded-2xl ease-out transition-all duration-500 hover:shadow-[0_0_40px_var(--color-glow)]">
                    <div
                      className=" rounded-full bg-primary/[0.1] blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/[0.15]"
                      aria-hidden
                    />
                    <div className="relative flex flex-1 flex-col rounded-xl p-5 md:p-6 transition-all duration-300 group-hover:bg-primary/10">
                      {/* Header: Live pill + title row */}
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
                      <h3 className="mt-3 text-base font-semibold text-ink md:text-lg">
                        {p.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1 line-clamp-3">
                        {p.context ?? p.summary}
                      </p>
                      {/* Tags */}
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
                      {/* Meta: role / timeline */}
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
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/projects"
              className="group/btn inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              View all projects
              <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* Education Section */}
      <section className="relative min-h-[50dvh] flex flex-col justify-center py-10 md:py-20 mb-10">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
            <div className="flex flex-wrap items-center gap-3">
              <SectionHeading
                eyebrow={headings.education.eyebrow}
                title={headings.education.title}
                description={headings.education.description}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto ">
            {education.map((item, idx) => (
              <Reveal key={item.institution} delay={0.04 * idx} className="w-full">
                <div className="group relative w-full overflow-hidden rounded-[2rem] border border-line transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.3)]">
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:animate-spin-slow" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row h-full rounded-[31px] bg-surface/90 backdrop-blur-xl overflow-hidden">
                    
                    {/* Left decorative panel */}
                    <div className="relative flex w-full md:w-72 flex-col justify-center items-center bg-primary/[0.02] p-8 border-b md:border-b-0 md:border-r border-line overflow-hidden">
                      
                      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary/10 to-indigo-500/10 border border-primary text-primary shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                        <GraduationCap size={48} strokeWidth={1.2} />
                      </div>
                      
                      <div className="mt-8 flex flex-col items-center gap-1.5 z-10">
                        <span className="rounded-full bg-primary/10 border border-primary px-4 py-1.5 text-xs font-bold text-primary tracking-widest uppercase">
                          {item.startDate} — {item.endDate ?? "Present"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right content panel */}
                    <div className="relative flex flex-1 flex-col justify-between p-6 md:p-8 lg:p-10">
                      {/* Subtle background glow on hover */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 via-transparent to-indigo-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
                              {item.degree}
                            </h3>
                            <p className="mt-2 text-base font-semibold text-primary/80">
                              {item.institution}
                            </p>
                          </div>
                          
                          {item.grade && (
                            <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-4 py-2 shadow-sm transition-transform duration-500 hover:scale-105 hover:border-primary/30">
                              <span className="text-xs font-bold uppercase tracking-widest text-muted-2">Grade</span>
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
                              {item.coursework.replace(/\.$/, '').split(',').map((course, i) => (
                                <span key={i} className="rounded-lg bg-primary/[0.03] border border-line px-3 py-1.5 text-sm font-medium text-muted-1 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary/20 hover:-translate-y-0.5 shadow-sm">
                                  {course.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-line pt-6">
                        {item.location && (
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-2 transition-colors duration-300 group-hover:text-primary/70">
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
