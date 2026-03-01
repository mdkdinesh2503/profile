import { Link } from "react-router-dom";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { getProjectsByCategory } from "@/lib/projects";
import { Card } from "@/shared/ui/Card";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";
import { skills } from "@/data/experience";
import { HeroPortrait, ButtonLink } from "@/shared/ui";
import {
  Layout,
  Code2,
  Server,
  GitBranch,
  Zap,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Activity,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { cx } from "@/shared/ui/cx";

const heroSkillItems = skills.flatMap((g) => g.items);

const howICanHelpIcons = [
  Layout,
  Code2,
  Server,
  GitBranch,
  Zap,
  ShieldCheck,
] as const;

const howICanHelpTags = [
  "Features",
  "Full-Stack",
  "APIs",
  "Workflows",
  "Performance",
  "Reliability",
] as const;

const FEATURED_PER_SECTION = 3;

export function HomePage() {
  const realTimeFeatured = getProjectsByCategory("real-time").slice(
    0,
    FEATURED_PER_SECTION,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-hidden pt-14 md:pt-20">
        <Container>
          <div className="flex flex-col-reverse items-start gap-10 md:grid md:grid-cols-[1fr_360px] md:gap-14">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-sm font-medium tracking-wide text-primary">
                  Hi, I'm <span className="font-semibold text-ink">{profile.name.split(" ")[0]}</span>
                </p>
              </Reveal>
              <Reveal delay={0.02}>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted-1 backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {profile.location}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
                    {profile.role}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.04}>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl lg:text-[2.75rem]">
                  {(() => {
                    const highlight = "calm, reliable systems";
                    const i = profile.hero.headline.indexOf(highlight);
                    if (i === -1) return profile.hero.headline;
                    return (
                      <>
                        {profile.hero.headline.slice(0, i)}
                        <span className="hero-gradient-text font-semibold">{highlight}</span>
                        {profile.hero.headline.slice(i + highlight.length)}
                      </>
                    );
                  })()}
                </h1>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-6 text-pretty text-base leading-relaxed text-muted-1 md:text-lg max-w-xl">
                  {profile.hero.subhead}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
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

          {/* Technologies marquee */}
          <section className="mt-10 md:mt-12" aria-label="Technologies">
            <Reveal delay={0.08}>
              <div className="group relative overflow-hidden rounded-2xl py-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" aria-hidden />
                <div className="relative">
                  <div className="flex items-center justify-center gap-1">
                    <span className="dot-two-layer dot-two-layer-blink" aria-hidden>
                      <span className="dot-outer" />
                      <span className="dot-core" />
                    </span>
                    <p className="text-center text-xs font-medium tracking-wide text-muted-1">
                      {profile.hero.technologiesLabel}
                    </p>
                    <span className="dot-two-layer dot-two-layer-blink" aria-hidden>
                      <span className="dot-outer" />
                      <span className="dot-core" />
                    </span>
                  </div>
                  <div
                    className="mt-5 overflow-hidden cursor-default"
                    style={{
                      maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                    }}
                  >
                    <div className="flex w-max animate-marquee-left gap-10 px-4 group-hover:[animation-play-state:paused]">
                      {[...heroSkillItems, ...heroSkillItems].map((name, i) => (
                        <span
                          key={`${name}-${i}`}
                          className="shrink-0 cursor-default text-base font-medium text-ink transition-colors hover:text-primary md:text-lg"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </Container>
      </section>

      {/* How I Can Help */}
      <section className="relative mt-14 md:mt-20">
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
                    <div className="glass-card-panel relative m-2 mt-4 flex flex-1 flex-col rounded-xl p-4 transition-all duration-300 group-hover:bg-primary/[0.06] dark:group-hover:bg-primary/10">
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
                    <div className="glass-card-panel relative m-2.5 mt-5 flex flex-1 flex-col rounded-xl p-5 md:p-6 transition-all duration-300 group-hover:bg-primary/[0.06] dark:group-hover:bg-primary/10">
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
