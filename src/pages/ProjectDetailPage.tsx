import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Prose, ButtonLink, buttonStyles, cx, GlassCard } from "@/shared/ui";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getProjectBySlug } from "@/lib/projects";
import { Reveal } from "@/shared/motion/Reveal";
import { ArrowLeft, Briefcase, Calendar, CalendarDays, Check, ChevronRight, Code, ExternalLink, Link2, Sparkles, Tag } from "lucide-react";
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
          <GlassCard blogStyle accent="top" panelClassName="p-8 text-center">
              <div className="text-lg font-semibold text-ink">Project not found</div>
              <p className="mt-2 text-muted-1">
                This case study doesn't exist yet. Check the projects list.
              </p>
              <ButtonLink to="/projects" variant="soft" size="md" className="mt-6">
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </ButtonLink>
          </GlassCard>
        </Container>
      </section>
    );
  }

  return (
    <>
      <PageMeta
        title={project.name}
        description={project.summary || project.context || `${project.name} – case study`}
        path={`/projects/${project.slug}`}
        ogType="article"
      />
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
                  <span className="font-medium text-ink line-clamp-1" aria-current="page">
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
                <GlassCard className="flex-1 min-w-0" blogStyle accent="top" panelClassName="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:px-5">
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
                </GlassCard>
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
              <header className="mt-8 max-w-3xl">
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-muted-1">
                    <Tag className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-primary bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary dark:border-primary/35 dark:bg-primary/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  {project.name}
                </h1>
                <div className="mt-4 h-1 w-70 rounded-full bg-gradient-to-r from-primary to-primary/60" aria-hidden />
              </header>
            </Reveal>
          </Container>
        </div>

        <Container>
          <Reveal delay={0.05}>
            <GlassCard className="mt-8 md:mt-10" blogStyle accent="left" panelClassName="p-6 pl-5 md:p-10 md:pl-6 lg:p-12 lg:pl-8">
                {project.summary && (
                  <div className="mb-8 rounded-xl border-l-4 border-primary bg-primary/5 py-4 pl-5 pr-5 dark:bg-primary/10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">In short</p>
                    <p className="mt-2 text-base leading-relaxed text-ink dark:text-ink">
                      {project.summary}
                    </p>
                  </div>
                )}
                <Prose className="blog-detail-prose max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: (props) => {
                        const { href, ...rest } = props;
                        const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
                        return (
                          <a
                            href={href}
                            {...rest}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="font-medium text-primary no-underline underline-offset-2 hover:underline"
                          />
                        );
                      },
                      pre: (props) => (
                        <pre
                          {...props}
                          className="overflow-x-auto rounded-xl border border-line border-l-4 border-l-primary bg-ink/[0.04] py-4 pl-4 shadow-inner dark:bg-white/5 dark:border-white/10 dark:border-l-primary"
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
            </GlassCard>
          </Reveal>

          <Reveal delay={0.09}>
            <GlassCard className="mt-12" blogStyle accent="top" panelClassName="flex flex-wrap items-center justify-between gap-6 p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">Thanks for reading</p>
                    <p className="mt-0.5 text-sm text-muted-1">
                      More projects and case studies in Selected Work.
                    </p>
                  </div>
                </div>
                <ButtonLink
                  to="/projects"
                  variant="shine"
                  size="lg"
                  className="group shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  All case studies
                </ButtonLink>
            </GlassCard>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
