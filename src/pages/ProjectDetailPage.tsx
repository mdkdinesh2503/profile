import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Prose, ButtonLink, buttonStyles, cx } from "@/shared/ui";
import { getProjectBySlug } from "@/lib/projects";
import { Reveal } from "@/shared/motion/Reveal";
import { ArrowLeft, Briefcase, Calendar, CalendarDays, Check, ChevronRight, Code, ExternalLink, Link2, Tag } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : null;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(false);
    }
  }, []);

  useEffect(() => {
    if (!project) return;
    const onScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      if (docHeight <= 0) {
        setScrollProgress(1);
        return;
      }
      const progress = Math.min(1, window.scrollY / docHeight);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [project]);

  if (!project) {
    return (
      <section className="pt-12 md:pt-16">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-surface shadow-sm">
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60" aria-hidden />
            <div className="glass-inner m-2 mt-4 rounded-xl p-8 text-center">
              <div className="text-lg font-semibold text-ink">Project not found</div>
              <p className="mt-2 text-muted-1">
                This case study doesn't exist yet. Check the projects list.
              </p>
              <ButtonLink to="/projects" variant="soft" size="md" className="mt-6">
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-ink/10"
        aria-hidden
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      <section className="pt-12 md:pt-20 pb-16">
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-[min(100%,36rem)] rounded-full bg-primary/[0.08] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px max-w-2xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            aria-hidden
          />

          <Container className="relative">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-sm">
                  <Link
                    to="/projects"
                    className="font-medium text-primary transition-colors hover:text-primary"
                  >
                    Projects
                  </Link>
                  <ChevronRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="font-medium text-ink" aria-current="page">
                    {project.name}
                  </span>
                </nav>
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy link"
                  className={cx(
                    buttonStyles.base,
                    "rounded-xl px-4 py-2.5 text-sm gap-2 ring-1 transition-all duration-200",
                    linkCopied
                      ? "bg-primary text-white ring-primary/30 hover:bg-primary-hover"
                      : "bg-ink/5 text-ink ring-line hover:bg-primary/10 hover:text-primary hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-primary/10 dark:hover:ring-primary/20"
                  )}
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden />
                      Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4" aria-hidden />
                      Copy link
                    </>
                  )}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.02}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-surface shadow-sm transition-shadow duration-300 hover:shadow-[0_8px_24px_-8px_rgba(37,99,235,0.12)]">
                  <div className="glass-inner m-2 flex flex-wrap items-center gap-3 rounded-xl px-4 py-3.5 sm:px-5">
                    <span className="flex items-center gap-2 text-sm text-muted-1">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Briefcase className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="font-semibold text-ink">
                        {project.category === "academic" || project.category === "self-learn"
                          ? "Learning project"
                          : "Case study"}
                      </span>
                    </span>
                    {(project.role || project.timeline || project.year || project.demoStack || project.originalStack) ? (
                      <>
                        {project.role ? (
                          <>
                            <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-muted-2 ring-1 ring-line dark:bg-white/5 dark:ring-white/10">
                              {project.role}
                            </span>
                          </>
                        ) : null}
                        {project.timeline ? (
                          <>
                            <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                            <span className="flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                              <Calendar className="h-3.5 w-3.5" aria-hidden />
                              {project.timeline}
                            </span>
                          </>
                        ) : null}
                        {project.year ? (
                          <>
                            <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                            <span className="flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                              {project.year}
                            </span>
                          </>
                        ) : null}
                        {project.demoStack ? (
                          <>
                            <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-muted-2 ring-1 ring-line dark:bg-white/5 dark:ring-white/10" title="Demo">
                              Demo: {project.demoStack}
                            </span>
                          </>
                        ) : null}
                        {project.originalStack ? (
                          <>
                            <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-muted-2 ring-1 ring-line dark:bg-white/5 dark:ring-white/10" title="Original / Code">
                              Original: {project.originalStack}
                            </span>
                          </>
                        ) : null}
                      </>
                    ) : null}
                    {project.stackNote ? (
                      <>
                        <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                        <span className="text-xs text-muted-2">{project.stackNote}</span>
                      </>
                    ) : null}
                  </div>
                </div>
                {(project.category === "academic" || project.category === "self-learn") &&
                (project.demoUrl || project.repoUrl) ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-line transition-all hover:bg-primary/10 hover:text-primary hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        View
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-line transition-all hover:bg-primary/10 hover:text-primary hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-primary/10"
                      >
                        <Code className="h-4 w-4" aria-hidden />
                        Code
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.03}>
              <header className="mt-6 max-w-3xl">
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-muted-1">
                    <Tag className="h-4 w-4 shrink-0" aria-hidden />
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-ink/5 px-2.5 py-1 text-xs font-medium text-primary dark:bg-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  {project.name}
                </h1>
              </header>
            </Reveal>
          </Container>
        </div>

        {project.image && (
          <Reveal delay={0.05}>
            <Container className="mt-8">
              <div className="relative overflow-hidden rounded-2xl bg-surface shadow-sm">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
                <div className="glass-inner relative m-2 mt-4 overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt=""
                    className="h-64 w-full object-cover md:h-80 lg:h-96"
                    loading="eager"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent pointer-events-none"
                    aria-hidden
                  />
                </div>
              </div>
            </Container>
          </Reveal>
        )}

        <Container>
          <Reveal delay={project.image ? 0.07 : 0.05}>
            <div className="relative mt-8 overflow-hidden rounded-2xl bg-surface shadow-sm md:mt-10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
              <div className="glass-inner relative m-2 mt-4 rounded-xl p-6 md:p-10 lg:p-12">
                <Prose className="max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: (props) => (
                        <a
                          {...props}
                          className="font-medium text-primary no-underline underline-offset-2 hover:underline"
                        />
                      ),
                      pre: (props) => (
                        <pre
                          {...props}
                          className="overflow-x-auto rounded-xl border border-line bg-ink/[0.04] py-4 shadow-inner dark:bg-white/5 dark:border-white/10"
                        />
                      ),
                      code: (props) => {
                        const isInline = !props.className;
                        if (isInline)
                          return (
                            <code
                              {...props}
                              className="rounded bg-ink/[0.08] px-1.5 py-0.5 text-sm font-medium text-ink dark:bg-white/10"
                            />
                          );
                        return <code {...props} />;
                      },
                    }}
                  >
                    {project.content}
                  </ReactMarkdown>
                </Prose>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.09}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-10">
              <ButtonLink
                to="/projects"
                variant="shine"
                size="lg"
                className="group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                All case studies
              </ButtonLink>
              <p className="text-sm text-muted-1">
                More projects and case studies in Selected Work.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
