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

const heroSkillItems = skills.flatMap((g) => g.items);

export function HomePage() {
  const featured = projectsData.slice(0, 3);

  return (
    <>
      <section className="overflow-x-hidden pt-14 md:pt-20">
        <Container>
          <div className="flex flex-col-reverse items-start gap-10 md:grid md:grid-cols-[1fr_360px] md:gap-14">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-sm font-medium text-muted">{profile.location}</p>
                <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  {profile.hero.headline}
                </h1>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted-1 md:text-lg">
                  {profile.hero.subhead}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to={profile.primaryCta.href}
                    className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-muted-1 ring-1 ring-line transition-all duration-200 ease-out hover:bg-primary hover:text-white hover:ring-primary hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  >
                    {profile.primaryCta.label}
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

          {/* Technologies marquee: same bg/text as rest of page, left-to-right auto-scroll; pauses on hover */}
          <section className="mt-10 md:mt-12" aria-label="Technologies">
            <div className="group relative overflow-hidden rounded-2xl py-8">
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
          </section>
        </Container>
      </section>

      {/* Mandatory section: “How I Can Help” profile-driven, matches page styling */}
      <section className="mt-14 md:mt-20">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-surface-2">
            <div className="p-1">
              <Reveal>
                <SectionHeading
                  eyebrow={headings.howICanHelp.eyebrow}
                  title={headings.howICanHelp.title}
                  description={headings.howICanHelp.description}
                />
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profile.howICanHelp.cards.map((c, idx) => (
                  <Reveal key={c.title} delay={0.02 * idx}>
                    <Card className="flex h-full flex-col p-5">
                      <div className="text-sm font-semibold text-ink">
                        {c.title}
                      </div>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-1">
                        {c.body}
                      </p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-14 md:mt-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow={headings.selectedWork.eyebrow}
              title={headings.selectedWork.title}
              description={headings.selectedWork.description}
            />
            <div className="hidden md:block">
              <Link to="/projects" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View all →
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map((p, idx) => (
              <Reveal key={p.slug} delay={0.04 * idx}>
                <Link to={`/projects/${p.slug}`} className="flex h-full">
                  <Card className="flex h-full w-full flex-col p-6">
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
                    <div className="mt-5 text-sm font-medium text-brand-600">
                      Read case study →
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link to="/projects" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all projects →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}