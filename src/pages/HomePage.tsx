import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { Reveal } from "@/shared/motion/Reveal";
import { getProjectsByCategory } from "@/lib/projects";
import { headings } from "@/data/headings";
import { HeroPortrait, ButtonLink } from "@/shared/ui";
import {
  Layout,
  Lightbulb,
  GitBranch,
  Heart,
  Database,
  CheckCircle2,
  Users,
  ArrowRight,
  MapPin,
  Activity,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { cx } from "@/shared/ui/cx";

const howICanHelpIcons = [
  Lightbulb,
  GitBranch,
  Heart,
  Database,
  CheckCircle2,
  Users,
] as const;

const howICanHelpTags = [
  "Creativity",
  "Design",
  "Empathy",
  "Data",
  "Ownership",
  "Teamwork",
] as const;

const FEATURED_PER_SECTION = 3;

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
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-muted-1 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    Say Hello
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
      <section className="relative min-h-[50dvh] flex flex-col justify-center">
        <Container>
          <Reveal>
            <motion.div
              className="group relative rounded-[2.5rem] bg-surface/40 border border-line p-8 md:p-14 overflow-hidden shadow-glass transition-all duration-500 hover:shadow-[0_0_40px_var(--color-glow)]"
              whileHover="hovered"
              initial="idle"
            >
              {/* Spinning subtle gradient border on hover */}
              <motion.div
                aria-hidden
                className="absolute -inset-[1px] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "conic-gradient(from 0deg, transparent, #7dd3fc, #818cf8, transparent)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />

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

      {/* How I Can Help */}
      <section className="relative min-h-[110dvh] flex flex-col justify-center pb-10">
        <div className="pointer-events-none absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl" aria-hidden />
        <Container>
          <SectionHeading
            eyebrow={headings.howICanHelp.eyebrow}
            title={headings.howICanHelp.title}
            description={headings.howICanHelp.description}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {profile.howICanHelp.cards.map((c, idx) => {
              const Icon = howICanHelpIcons[idx] ?? Layout;
              const tag = howICanHelpTags[idx];
              const isFeatured = idx === 0;
              return (
                <Reveal key={c.title} delay={0.03 * idx}>
                  <motion.div
                    className="glass-card-outer group relative flex h-full flex-col overflow-hidden rounded-2xl ease-out"
                    whileHover={{ transition: { duration: 0.25 } }}
                  >
                    {/* Top accent bar – gradient, expands on hover */}
                    <div
                      className={cx(
                        "absolute left-0 right-0 top-0 h-1 origin-left transition-all duration-300 ease-out",
                        "bg-gradient-to-r from-primary/70 via-primary to-primary/70",
                        "group-hover:h-1.5 group-hover:opacity-100",
                      )}
                      aria-hidden
                    />
                    <div
                      className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.08] blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-100 group-hover:bg-primary/[0.12]"
                      aria-hidden
                    />
                    {/* Subtle inner glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                      aria-hidden
                    />
                    {/* Inner glass content panel */}
                    <div className="glass-card-panel relative m-2 mt-4 flex flex-1 flex-col rounded-xl p-4 transition-all duration-300 group-hover:bg-primary/10">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={cx(
                            "glass-icon flex shrink-0 items-center justify-center rounded-2xl text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(37,99,235,0.2)]",
                            isFeatured ? "h-14 w-14" : "h-12 w-12",
                          )}
                        >
                          <Icon size={isFeatured ? 24 : 22} aria-hidden strokeWidth={2} />
                        </div>
                        {/* Small decorative tag */}
                        <span className="rounded-full border border-primary bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {tag}
                        </span>
                      </div>
                      <h3 className={cx(
                        "mt-4 font-semibold text-ink",
                        isFeatured ? "text-base" : "text-sm",
                      )}>
                        {c.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1">
                        {c.body}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
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
                  <div className="glass-card-outer relative flex h-full w-full flex-col overflow-hidden rounded-2xl ease-out">
                    {/* Real-time accent: gradient bar + soft glow */}
                    <div
                      className={cx(
                        "absolute left-0 right-0 top-0 h-1.5 origin-left transition-all duration-300 ease-out",
                        "bg-gradient-to-r from-primary/60 via-primary to-primary/60",
                        "group-hover:h-2 group-hover:opacity-100",
                      )}
                      aria-hidden
                    />
                    <div
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/[0.1] blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/[0.15]"
                      aria-hidden
                    />
                    <div className="glass-card-panel relative m-2.5 mt-5 flex flex-1 flex-col rounded-xl p-5 md:p-6 transition-all duration-300 group-hover:bg-primary/10">
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
    </>
  );
}
