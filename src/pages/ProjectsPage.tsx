import { Link } from "react-router-dom";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
import { Reveal } from "@/shared/motion/Reveal";
import { projectsData } from "@/data/projects";
import { headings } from "@/data/headings";

export function ProjectsPage() {
  const hasProjects = projectsData.length > 0;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={headings.selectedWork.eyebrow}
            title={headings.selectedWork.title}
            description={headings.selectedWork.description}
          />
        </Reveal>

        {hasProjects ? (
          <div className="mt-10 grid gap-6">
            {projectsData.map((p, idx) => (
              <Reveal key={p.slug} delay={0.03 * idx}>
                <Link to={`/projects/${p.slug}`} className="block">
                  <Card className="p-6 md:p-8" hoverLift>
                    <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                      <h2 className="text-lg font-semibold tracking-tight text-ink md:text-xl">
                        {p.title}
                      </h2>
                      <span className="text-sm text-muted-2">{p.role}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-1">{p.context}</p>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {p.decisions.slice(0, 3).map((d) => (
                        <div
                          key={d.title}
                          className="rounded-xl border border-line bg-surface-2 p-4"
                        >
                          <p className="text-sm font-semibold text-ink">{d.title}</p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-1">
                            {d.tradeoff}
                          </p>
                          <p className="mt-2 text-sm text-muted-2">{d.result}</p>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-6 space-y-2 text-sm text-muted-1">
                      {p.outcomes.slice(0, 4).map((o) => (
                        <li key={o} className="flex gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/25"
                            aria-hidden
                          />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 text-sm font-medium text-brand-600">
                      Read full case study →
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <Card className="p-6" hoverLift={false}>
                <h2 className="text-base font-semibold tracking-tight text-ink">
                  Add your case studies
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-1">
                  Add projects in <code className="rounded bg-ink/[0.08] px-1.5 py-0.5 text-xs">src/data/projects.ts</code>.
                  Each should include context, your role, key decisions (with trade‑offs), and
                  outcomes.
                </p>
              </Card>
            </Reveal>
            <Reveal>
              <Card className="p-6" hoverLift={false}>
                <h2 className="text-base font-semibold tracking-tight text-ink">
                  What this page highlights
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-1">
                  <li>Constraints and why they mattered</li>
                  <li>Decisions and what you traded off</li>
                  <li>Quality: correctness, reliability, performance</li>
                  <li>Outcomes stakeholders care about</li>
                </ul>
              </Card>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}