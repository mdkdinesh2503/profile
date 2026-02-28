import { Link, useParams } from "react-router-dom";
import { Container } from "@/shared/ui/Container";
import { getProjectBySlug } from "@/data/projects";
import { Card } from "@/shared/ui/Card";
import { Reveal } from "@/shared/motion/Reveal";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted-1">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500/70" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return (
      <section className="pt-12 md:pt-16">
        <Container>
          <Card className="p-6">
            <div className="text-sm font-semibold text-ink">Project not found</div>
            <p className="mt-2 text-sm text-muted-1">
              This case study doesn't exist yet. Check the projects list.
            </p>
            <div className="mt-5">
              <Link to="/projects" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Back to projects →
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs font-medium tracking-wide text-muted-2">
              Case study
            </div>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-1">
              {project.context}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="mt-8">
            <Card hoverLift={false} className="p-5">
              <div className="text-xs text-muted-2">Role</div>
              <div className="mt-1 text-sm font-medium text-ink">{project.role}</div>
            </Card>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
          <div className="space-y-8">
            {/* Decisions: title, tradeoff, result */}
            <Reveal>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                  Decisions & trade-offs
                </h2>
                <div className="mt-4 grid gap-4">
                  {project.decisions.map((d) => (
                    <Card key={d.title} className="p-5">
                      <div className="text-sm font-semibold text-ink">{d.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-1">
                        <span className="text-muted-2">Trade-off:</span> {d.tradeoff}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-1">
                        <span className="text-muted-2">Result:</span> {d.result}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Outcomes */}
            <Reveal>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                  Outcomes & impact
                </h2>
                <Bullets items={project.outcomes} />
              </div>
            </Reveal>
          </div>

          <aside className="md:sticky md:top-24">
            <Reveal delay={0.02}>
              <Card className="p-6">
                <div className="text-sm font-semibold text-ink">Quick context</div>
                <div className="mt-4 grid gap-3 text-sm text-muted-1">
                  <div>
                    <div className="text-xs text-muted-2">Context</div>
                    <div className="mt-1">{project.context}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-2">Role</div>
                    <div className="mt-1">{project.role}</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                    Back to projects →
                  </Link>
                </div>
              </Card>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}