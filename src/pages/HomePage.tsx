import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@/shared/ui/Container";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { Reveal } from "@/shared/motion/Reveal";
import { getProjectsByCategory } from "@/lib/projects";
import { headings } from "@/data/headings";
import { skills } from "@/data/skills";
import { SKILL_ICON_MAP, PILLAR_ICONS } from "@/data/skills";
import { HeroPortrait, ButtonLink } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import {
  ArrowRight, MapPin, Activity, Calendar, User, GraduationCap,
  Code2, Zap,
} from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cx } from "@/shared/ui/cx";

const FEATURED_PER_SECTION = 3;

/* ══════════════════════════════════════════════════════════════════
   SKILL TAG (Brand-Aware Animated Tag)
══════════════════════════════════════════════════════════════════ */
function SkillTag({
  name,
  isOpen = true,
  delay = 0,
}: {
  name: string;
  isOpen?: boolean;
  delay?: number;
}) {
  const meta = SKILL_ICON_MAP[name];
  const IconComp = meta?.icon;
  const brandColor = "#3d8eff";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.94 }}
      animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.94 }}
      transition={{ duration: 0.24, delay: isOpen ? delay : 0 }}
      className="group/tag relative rounded-xl overflow-hidden cursor-default transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(8px)",
      }}
      whileHover={{
        boxShadow: `0 0 20px -2px ${brandColor}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
      }}
    >
      {/* Top Brand Micro Glow */}
      <div
        className="absolute inset-x-0 top-0 h-[1.5px] opacity-40 group-hover/tag:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)` }}
      />

      <div className="relative flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 w-full">
        <span
          className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-md sm:rounded-lg transition-transform duration-200 group-hover/tag:scale-110 group-hover/tag:rotate-6"
          style={{
            background: `${brandColor}18`,
            border: `1px solid ${brandColor}33`,
            boxShadow: `0 0 8px ${brandColor}20`,
          }}
        >
          {IconComp ? (
            <>
              <IconComp size={11} className="sm:hidden" style={{ color: brandColor }} />
              <IconComp size={13} className="hidden sm:block" style={{ color: brandColor }} />
            </>
          ) : (
            <>
              <Code2 size={11} className="sm:hidden" style={{ color: brandColor }} />
              <Code2 size={13} className="hidden sm:block" style={{ color: brandColor }} />
            </>
          )}
        </span>
        <span className="text-[10px] sm:text-[12px] font-semibold text-white/90 group-hover/tag:text-white leading-none truncate">
          {name}
        </span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SKILLS CONSOLE (Seamless Unified Deck Architecture)
══════════════════════════════════════════════════════════════════ */
function SkillsPillars() {
  const [active, setActive] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeGroup = skills[active] ?? skills[0];
  const PillarIcon = PILLAR_ICONS[active] ?? PILLAR_ICONS[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Generate mock but realistic proficiency levels for a rich, visual layout
  const getProficiency = (skillName: string) => {
    const high = ["React", "TypeScript", "Node.js", "Next.js", "JavaScript", "HTML5/CSS3", "Git", "Tailwind CSS"];
    if (high.some(h => skillName.includes(h))) return 92;
    if (skillName.length % 2 === 0) return 85;
    return 78;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-xs sm:rounded-[2.5rem] transition-all duration-500"
      style={{
        background: "rgba(8, 14, 28, 0.7)",
        border: "1px solid rgba(61, 142, 255, 0.15)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Interactive Radial Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(61, 142, 255, 0.15), transparent 80%)`,
        }}
      />

      {/* Laser Top Glow Beam */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 10%, #3d8eff 35%, #38bdf8 50%, #3d8eff 65%, transparent 90%)",
          boxShadow: "0 0 20px rgba(61, 142, 255, 0.7)",
        }}
        aria-hidden
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* ── Left Rail Selector: Responsive Grid on Mobile, Dock on Desktop ── */}
        <div className="lg:col-span-5 p-3.5 sm:p-5 lg:p-6 lg:border-r border-b lg:border-b-0 border-line flex flex-col justify-between gap-4 relative z-10">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between px-1 text-[9px] font-mono tracking-widest text-primary/70 uppercase">
              <span>Holographic Console</span>
              <span>0{active + 1} / 0{skills.length}</span>
            </div>

            {/* Grid layout on mobile (2 cols), vertical list on large screens */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-col gap-2">
              {skills.map((group, idx) => {
                const Icon = PILLAR_ICONS[idx] ?? PILLAR_ICONS[0];
                const isSelected = active === idx;

                return (
                  <button
                    key={group.group}
                    type="button"
                    onClick={() => setActive(idx)}
                    className={cx(
                      "group relative w-full flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between px-2 py-1.5 lg:px-3.5 lg:py-3 rounded-lg lg:rounded-2xl transition-all duration-300 cursor-pointer outline-none text-center lg:text-left gap-1 lg:gap-3",
                      isSelected
                        ? "text-white"
                        : "text-muted-2 hover:text-white"
                    )}
                    style={{
                      background: isSelected ? "rgba(61, 142, 255, 0.05)" : "rgba(255, 255, 255, 0.01)",
                      border: isSelected ? "1px solid rgba(61, 142, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.04)",
                      boxShadow: isSelected ? "0 4px 15px -2px rgba(61, 142, 255, 0.12)" : "none",
                    }}
                  >
                    {/* Active dynamic accent glow line */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeRailAccent"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-full hidden lg:block"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Left Icon & Details Group */}
                    <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
                      <div
                        className={cx(
                          "flex h-6 w-6 lg:h-9 lg:w-9 items-center justify-center rounded-md lg:rounded-xl transition-all duration-300",
                          isSelected
                            ? "bg-primary text-black font-bold shadow-[0_0_10px_rgba(61,142,255,0.4)] scale-105"
                            : "bg-white/5 text-muted-2 group-hover:text-primary group-hover:bg-primary/10"
                        )}
                      >
                        <Icon size={12} className="lg:hidden" strokeWidth={2} />
                        <Icon size={16} className="hidden lg:block" strokeWidth={2} />
                      </div>

                      <div className="flex flex-col items-center lg:items-start">
                        <span className="text-[9px] sm:text-[11px] lg:text-sm font-bold tracking-tight leading-snug group-hover:text-primary whitespace-nowrap">
                          {group.group.split(" ")[0]} <span className="hidden sm:inline lg:inline">{group.group.split(" ").slice(1).join(" ")}</span>
                        </span>
                        <span className="text-[8px] lg:text-[10px] text-muted-2 mt-0.5 hidden lg:block">
                          {group.items.length} Skills
                        </span>
                      </div>
                    </div>

                    {/* Right Pill indicator - desktop only */}
                    <div className="hidden lg:flex items-center gap-1.5 z-10">
                      <ArrowRight
                        size={13}
                        className={cx(
                          "transition-all duration-300",
                          isSelected
                            ? "text-primary translate-x-0.5 opacity-100"
                            : "text-muted-2 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex px-2 pt-4 border-t border-line items-center justify-between text-[10px] text-muted-2 font-mono">
            <span>Specialization matrix v1.4</span>
            <span className="text-primary/70 animate-pulse">SYSTEM_ACTIVE</span>
          </div>
        </div>

        {/* ── Right Content Display: Active Tech Matrix with Hover Indicators ── */}
        <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden bg-black/20">
          
          {/* Subtle Dynamic Geometric Mesh Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "20px 20px"
            }}
          />

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-line relative z-10">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-primary"
                style={{
                  background: "rgba(61,142,255,0.1)",
                  border: "1px solid rgba(61,142,255,0.25)",
                  boxShadow: "0 0 20px rgba(61,142,255,0.15)",
                }}
              >
                <PillarIcon size={20} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary/70">
                  Active Display Matrix
                </span>
                <h3 className="text-lg lg:text-xl font-extrabold text-white leading-tight">
                  {activeGroup.group}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-primary px-3 py-1 text-[10px] font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>{activeGroup.items.length} Tech Pillars</span>
            </div>
          </div>

          {/* Active Skills Grid with Expertise Gauges */}
          <div className="flex-1 overflow-y-auto pr-1 max-h-[350px] lg:max-h-[360px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.group}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pb-2"
              >
                {activeGroup.items.map((skillName, idx) => (
                  <SkillTag key={skillName} name={skillName} delay={idx * 0.02} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Footer */}
          <div className="pt-4 mt-5 border-t border-line flex items-center justify-between text-[10px] text-muted-2 relative z-10">
            <span className="flex items-center gap-1">
              <Zap size={11} className="text-primary" /> Used in production systems
            </span>
            <span className="font-mono text-primary/70">NOT A COMPLETE LIST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   STAT COUNTER
══════════════════════════════════════════════════════════════════ */
function StatPill({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start"
    >
      <span
        className="text-2xl sm:text-3xl font-black tracking-tight"
        style={{
          backgroundImage: "linear-gradient(135deg, #7dd3fc, #3d8eff, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>
      <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-2">{label}</span>
    </motion.div>
  );
}

function FeaturedCard({ p, idx }: { p: ReturnType<typeof getProjectsByCategory>[number]; idx: number }) {
  return (
    <Reveal delay={0.04 * idx} className="h-full">
      <Link to={`/projects/${p.slug}`} className="group flex h-full">
        <div className="glass-card-panel glass-card-outer relative flex h-full w-full flex-col rounded-xl overflow-hidden ease-out">
          <div className="p-4 sm:p-5 md:p-6 rounded-xl">
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
            <h3 className="mt-3 line-clamp-2 text-sm sm:text-base md:text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">
              {p.name}
            </h3>
            <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-muted-1 line-clamp-3">
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

/* ══════════════════════════════════════════════════════════════════
   HOMEPAGE
══════════════════════════════════════════════════════════════════ */
export function HomePage() {
  const realTimeFeatured = getProjectsByCategory("real-time").slice(0, FEATURED_PER_SECTION);
  const heroImageHref = profile.avatar || null;

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, -60]);

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

      <style>{`
        @keyframes home-orb {
          0%,100% { transform: translateX(-50%) scale(1) translateY(0); }
          50% { transform: translateX(-50%) scale(1.06) translateY(-24px); }
        }
        @keyframes shimmer-name {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes beam-sweep {
          0% { opacity: 0; transform: scaleX(0); transform-origin: left; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; transform: scaleX(1); transform-origin: left; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-x-clip min-h-[92dvh] flex flex-col justify-center">
        <motion.div style={{ y: heroParallax }}>
          <Container className="w-full">
            <div className="flex flex-col-reverse items-center gap-10 pt-6 md:pt-0 md:grid md:grid-cols-[1fr_420px] md:items-center md:gap-14">

              {/* ── Left: text block ── */}
              <div className="max-w-xl flex flex-col">

                {/* Name */}
                <Reveal delay={0.03}>
                  <div>
                    <p className="text-sm font-medium tracking-wide text-muted-2 uppercase mb-1">
                      Hi there, I'm
                    </p>
                    <h2
                      className="font-extrabold leading-[1.0] tracking-tight text-[clamp(1.8rem,4.5vw,2.8rem)]"
                    >
                      <span className="text-white">Dinesh </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(135deg, #7dd3fc 0%, #3d8eff 40%, #818cf8 80%, #a78bfa 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          backgroundSize: "200% auto",
                          animation: "shimmer-name 5s linear infinite",
                        }}
                      >
                        Kumar
                      </span>
                    </h2>
                  </div>
                </Reveal>

                {/* Separator */}
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="h-[2px] w-12 rounded-full"
                    style={{ background: "linear-gradient(90deg, #3d8eff, #818cf8)" }}
                  />
                  <div
                    className="h-1.5 w-1.5 rounded-full shrink-0 bg-primary"
                    style={{ boxShadow: "0 0 8px rgba(56,189,248,0.9)" }}
                  />
                  <div
                    className="h-px flex-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                </div>

                {/* Main headline */}
                <Reveal delay={0.05}>
                  <h1
                    className="mt-6 font-bold leading-[1.08] tracking-tight text-white text-[clamp(2.0rem,5vw,3.2rem)]"
                  >
                    Good software
                    <span
                      className="block"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #7dd3fc 0%, #3d8eff 50%, #818cf8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      survives production.
                    </span>
                  </h1>
                </Reveal>

                {/* Principle callout */}
                <Reveal delay={0.08}>
                  <div
                    className="mt-6 pl-4 border-l-2 border-primary"
                  >
                    <p className="text-[12px] font-bold uppercase tracking-widest text-primary mb-1.5">
                      My principle
                    </p>
                    <p className="text-muted-1 text-sm md:text-base leading-relaxed">
                      I build backend systems — not just to work, but to{" "}
                      <span className="text-white font-semibold">
                        survive real users, real failures, and real production.
                      </span>
                    </p>
                  </div>
                </Reveal>

                {/* Stats */}
                <Reveal delay={0.11}>
                  <div
                    className="mt-8 flex items-center gap-6"
                  >
                    <StatPill value={`${profile.hero.yearsExperience}`} label="Years exp." delay={0.12} />
                    <div className="w-px h-10 bg-line" />
                    <StatPill value="5+" label="Projects" delay={0.14} />
                    <div className="w-px h-10 bg-line" />
                    <StatPill value="10+" label="Tech stack" delay={0.16} />
                  </div>
                </Reveal>

                {/* CTAs */}
                <Reveal delay={0.14}>
                  <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <ButtonLink to={profile.primaryCta.href} variant="shine" size="lg" className="group w-full sm:w-auto justify-center">
                      {profile.primaryCta.label}
                      <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                    </ButtonLink>
                    <a
                      href={`mailto:${profile.email}`}
                      className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,142,255,0.35)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(61,142,255,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      }}
                    >
                      Say Hello
                      <span className="inline-block transition-transform duration-300 origin-bottom-right group-hover:rotate-[20deg] group-hover:scale-110">
                        👋
                      </span>
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* ── Right: portrait ── */}
              <div className="flex w-full justify-center md:w-auto md:pt-2">
                <Reveal delay={0.06}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Outer decorative rings */}
                    <div
                      className="absolute -inset-4 rounded-[38px] opacity-20"
                      style={{
                        background: "conic-gradient(from 180deg, #3d8eff, #818cf8, #3d8eff)",
                        animation: "spin 8s linear infinite",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))",
                      }}
                      aria-hidden
                    />
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
        </motion.div>

        {/* Scroll cue – desktop only, hidden on mobile to avoid overlapping stacked content */}
        <motion.div
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-2">Scroll</span>
          <div
            className="h-8 w-5 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          PHILOSOPHY / QUOTE SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        <Container>
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-14 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(61,142,255,0.06) 0%, rgba(129,140,248,0.05) 50%, rgba(61,142,255,0.04) 100%)",
                border: "1px solid rgba(61,142,255,0.15)",
              }}
            >
              {/* Corner glow top-left */}
              <div
                className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(61,142,255,0.2), transparent 60%)" }}
                aria-hidden
              />
              {/* Corner glow bottom-right */}
              <div
                className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(129,140,248,0.18), transparent 60%)" }}
                aria-hidden
              />

              <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto">
                <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">
                  <span
                    className="h-px w-12"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.5))" }}
                  />
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #7dd3fc, #3d8eff, #818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Engineering with Purpose
                  </span>
                  <span
                    className="h-px w-12"
                    style={{ background: "linear-gradient(90deg, rgba(61,142,255,0.5), transparent)" }}
                  />
                </div>

                <blockquote className="text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.25] mb-10 tracking-tight">
                  <span
                    className="text-4xl leading-none font-serif md:text-6xl inline-block align-top mr-2 opacity-30"
                    style={{ color: "#3d8eff" }}
                  >
                    "
                  </span>
                  A truly great system is one you{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #7dd3fc, #3d8eff, #818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    never have to think about
                  </span>
                  . It just works—no matter the load, no matter the scale.
                  <span
                    className="text-4xl leading-none font-serif md:text-6xl inline-block align-bottom ml-2 opacity-30"
                    style={{ color: "#818cf8" }}
                  >
                    "
                  </span>
                </blockquote>

                {/* Author tag */}
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: "linear-gradient(135deg, #3d8eff, #818cf8)" }}
                  >
                    DK
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">{profile.name}</p>
                    <p className="text-[10px] text-muted-2">{profile.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          SKILLS SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-8 md:py-12">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
            <SectionHeading
              eyebrow={headings.skills.eyebrow}
              title={headings.skills.title}
              description={headings.skills.description}
              icon={Zap}
              as="h2"
            />
            <p className="text-xs text-muted-2 max-w-xs sm:text-right">
              Production work I have shipped — not a full inventory, and not a ceiling on what I can do.
            </p>
          </div>
          <SkillsPillars />
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED PROJECTS SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative mt-10 md:mt-16 overflow-hidden rounded-3xl py-14 md:py-20 mx-4 sm:mx-6 lg:mx-8">
        <Container className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={headings.selectedWorkRealTime.eyebrow}
              title={headings.selectedWorkRealTime.title}
              description={headings.selectedWorkRealTime.description}
              icon={Activity}
              as="h2"
            />
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary/15 hover:-translate-y-0.5 shrink-0"
            >
              View all
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {realTimeFeatured.map((p, idx) => (
              <FeaturedCard key={p.slug} p={p} idx={idx} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          EDUCATION SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-10 md:py-24 mb-0 md:mb-10">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14">
            <SectionHeading
              eyebrow={headings.education.eyebrow}
              title={headings.education.title}
              description={headings.education.description}
              icon={GraduationCap}
              as="h2"
            />
          </div>

          <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
            {profile.education.map((item, idx) => (
              <Reveal key={item.institution} delay={0.04 * idx} className="w-full">
                <div
                  className="group relative w-full overflow-hidden rounded-[2rem] transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid rgba(61,142,255,0.25)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(61,142,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, transparent, #3d8eff 30%, #818cf8 70%, transparent)" }}
                    aria-hidden
                  />

                  <div className="relative z-10 flex flex-col md:flex-row h-full rounded-[31px] overflow-hidden">
                    {/* Left panel */}
                    <div
                      className="relative flex w-full md:w-72 flex-col justify-center items-center p-6 md:p-8 border-b md:border-b-0 md:border-r overflow-hidden"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      {/* BG glow */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{ background: "radial-gradient(circle at 50% 50%, rgba(61,142,255,0.15), transparent 70%)" }}
                        aria-hidden
                      />
                      <div
                        className="relative z-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-primary"
                        style={{
                          background: "rgba(61,142,255,0.1)",
                          border: "1px solid rgba(61,142,255,0.25)",
                          boxShadow: "0 0 30px rgba(61,142,255,0.15)",
                        }}
                      >
                        <GraduationCap size={40} className="sm:hidden" strokeWidth={1.2} />
                        <GraduationCap size={48} className="hidden sm:block" strokeWidth={1.2} />
                      </div>
                      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-1.5 z-10">
                        <span
                          className="rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-primary tracking-widest uppercase"
                          style={{
                            background: "rgba(61,142,255,0.1)",
                            border: "1px solid rgba(61,142,255,0.25)",
                          }}
                        >
                          {item.startDate} — {item.endDate ?? "Present"}
                        </span>
                      </div>
                    </div>

                    {/* Right panel */}
                    <div className="relative flex flex-1 flex-col justify-between p-5 md:p-8 lg:p-10">
                      <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div>
                            <h3
                              className="text-xl sm:text-2xl font-bold tracking-tight"
                              style={{
                                backgroundImage: "linear-gradient(135deg, #7dd3fc, #3d8eff, #818cf8)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              {item.degree}
                            </h3>
                            <p className="mt-2 text-base font-semibold text-muted-1">{item.institution}</p>
                          </div>
                          {item.grade && (
                            <div
                              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 hover:scale-105"
                              style={{
                                background: "rgba(61,142,255,0.08)",
                                border: "1px solid rgba(61,142,255,0.2)",
                              }}
                            >
                              <span className="text-xs font-bold uppercase tracking-widest text-muted-2">Grade</span>
                              <span
                                className="text-sm font-black"
                                style={{
                                  backgroundImage: "linear-gradient(135deg, #3d8eff, #818cf8)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                              >
                                {item.grade}
                              </span>
                            </div>
                          )}
                        </div>

                        {item.coursework && (
                          <div className="mt-8">
                            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                              <span className="h-px w-6" style={{ background: "rgba(61,142,255,0.4)" }} />
                              Key Coursework
                            </h4>
                            <div className="flex flex-wrap gap-2.5">
                              {item.coursework.replace(/\.$/, "").split(",").map((course, i) => (
                                <span
                                  key={i}
                                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-1 transition-all duration-200 hover:text-primary hover:-translate-y-0.5"
                                  style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                  }}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,142,255,0.3)";
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                                  }}
                                >
                                  {course.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className="relative z-10 mt-8 flex items-center justify-between border-t pt-6"
                        style={{ borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        {item.location && (
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-2 transition-colors duration-300 group-hover:text-primary">
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
