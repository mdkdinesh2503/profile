import { Link } from "react-router-dom";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { projectsData } from "@/data/projects";
import { Card } from "@/shared/ui/Card";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";
import { skills } from "@/data/experience";
import { HeroPortrait } from "@/shared/ui/HeroPortrait";
import {
  Layout,
  Code2,
  Server,
  GitBranch,
  Zap,
  ShieldCheck,
  ArrowRight,
  FileText,
  MapPin,
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

export function HomePage() {
  const featured = projectsData.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-hidden pt-14 md:pt-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        >
          <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="absolute left-1/2 -translate-x-1/2 top-1/3 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        </div>

        <Container>
          <div className="flex flex-col-reverse items-start gap-10 md:grid md:grid-cols-[1fr_360px] md:gap-14">
            <div className="max-w-2xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-medium text-muted-1 backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {profile.location}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
                    {profile.role}
                  </span>
                </div>
                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  {profile.hero.headline}
                </h1>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted-1 md:text-lg">
                  {profile.hero.subhead}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to={profile.primaryCta.href}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm",
                      "hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                    )}
                  >
                    {profile.primaryCta.label}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                  <Link
                    to="/resume"
                    className={cx(
                      "inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink",
                      "hover:bg-ink/[0.05] hover:border-primary/30 transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                    )}
                  >
                    <FileText size={16} aria-hidden />
                    Resume
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="flex w-full justify-center md:w-auto md:pt-2">
              <Reveal delay={0.06}>
                <HeroPortrait
                  src={profile.avatar}
                  alt={profile.name}
                  initials={profile.hero.initials ?? profile.name.slice(0, 2).toUpperCase()}
                  yearsExperience={profile.hero.yearsExperience ?? ""}
                  className="mx-auto"
                />
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
                    className={cx(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300",
                      "border border-line bg-surface shadow-sm",
                      "hover:shadow-lift-1 hover:border-primary/20 hover:-translate-y-0.5",
                    )}
                    whileHover={{ transition: { duration: 0.2 } }}
                  >
                    {/* Top accent bar – gradient per card */}
                    <div
                      className={cx(
                        "absolute left-0 right-0 top-0 h-1",
                        "bg-gradient-to-r from-primary/70 via-primary to-primary/70",
                      )}
                      aria-hidden
                    />
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.08] blur-2xl transition-opacity group-hover:opacity-80" aria-hidden />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={cx(
                            "flex shrink-0 items-center justify-center rounded-2xl text-primary transition-transform duration-300 group-hover:scale-110",
                            "bg-primary/10 shadow-[0_0_20px_rgba(37,99,235,0.12)]",
                            isFeatured ? "h-14 w-14" : "h-12 w-12",
                          )}
                        >
                          <Icon size={isFeatured ? 24 : 22} aria-hidden strokeWidth={2} />
                        </div>
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

      {/* Selected Work */}
      <section className="mt-14 md:mt-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow={headings.selectedWork.eyebrow}
              title={headings.selectedWork.title}
              description={headings.selectedWork.description}
            />
            <div className="hidden md:block">
              <Link
                to="/projects"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-[var(--color-primary-hover)] transition-colors"
              >
                View all
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map((p, idx) => (
              <Reveal key={p.slug} delay={0.04 * idx}>
                <Link to={`/projects/${p.slug}`} className="group flex h-full">
                  <div
                    className={cx(
                      "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300",
                      "hover:border-primary/25 hover:shadow-lift-1",
                    )}
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/80 to-secondary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    <div className="text-sm font-semibold text-ink">{p.title}</div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1">
                      {p.context}
                    </p>
                    <div className="mt-4 grid gap-2 text-xs text-muted-2">
                      <div>
                        <span className="font-medium text-muted-1">Role:</span>{" "}
                        {p.role}
                      </div>
                      <div>
                        <span className="font-medium text-muted-1">Outcome:</span>{" "}
                        {p.outcomes[0] ?? "—"}
                      </div>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read case study
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-[var(--color-primary-hover)]"
            >
              View all projects
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
