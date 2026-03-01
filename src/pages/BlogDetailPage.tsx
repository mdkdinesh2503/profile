import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Prose, ButtonLink, buttonStyles, cx } from "@/shared/ui";
import { getBlogBySlug } from "@/lib/blogs";
import { Reveal } from "@/shared/motion/Reveal";
import { ArrowLeft, BookOpen, Calendar, Check, ChevronRight, Clock, Link2, Sparkles, Tag } from "lucide-react";
import { motion } from "framer-motion";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dt);
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = slug ? getBlogBySlug(slug) : null;
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
    if (!blog) return;
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
  }, [blog]);

  if (!blog) {
    return (
      <section className="pt-12 md:pt-16">
        <Container>
          <div className="glass-card-outer blog-latest-card relative overflow-hidden rounded-2xl">
            <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
            <div className="glass-card-panel relative m-2 mt-4 rounded-xl border border-line p-8 text-center dark:border-white/10">
              <div className="text-lg font-semibold text-ink">Blog not found</div>
              <p className="mt-2 text-muted-1">
                This post doesn't exist yet. Check the blog list.
              </p>
              <ButtonLink to="/blogs" variant="soft" size="md" className="mt-6">
                <ArrowLeft className="h-4 w-4" />
                Back to blogs
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Scroll progress bar – fixed at top */}
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
                    to="/blogs"
                    className="font-medium text-primary transition-colors hover:text-primary"
                  >
                    Blogs
                  </Link>
                  <ChevronRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="font-medium text-ink line-clamp-1" aria-current="page">
                    {blog.title}
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

            {/* At-a-glance strip — same 2-layer style as Resume / Blogs list */}
            <Reveal delay={0.02}>
              <div className="glass-card-outer blog-latest-card group relative mt-6 overflow-hidden rounded-2xl">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
                <div className="glass-card-panel relative m-2 mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-line px-4 py-3.5 dark:border-white/10 sm:px-5">
                  <span className="flex items-center gap-2 text-sm text-muted-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <BookOpen className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-semibold text-ink">Article</span>
                  </span>
                  <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-muted-2 ring-1 ring-line dark:bg-white/5 dark:ring-white/10">
                    <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                  </span>
                  <span className="hidden text-muted-2 sm:inline" aria-hidden>·</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {blog.readTime ?? 1} min read
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.03}>
              <header className="mt-8 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                      {blog.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-primary bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary dark:border-primary/35 dark:bg-primary/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  {blog.title}
                </h1>
                <div className="mt-4 h-1 w-50 rounded-full bg-gradient-to-r from-primary to-primary/60" aria-hidden />
              </header>
            </Reveal>
          </Container>
        </div>

        {/* Featured image — same card style as blog list */}
        {blog.image && (
          <Reveal delay={0.05}>
            <Container className="mt-8">
              <div className="glass-card-outer blog-latest-card relative overflow-hidden rounded-2xl">
                <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
                <div className="glass-card-panel relative m-2 mt-4 overflow-hidden rounded-xl border border-line dark:border-white/10">
                  <img
                    src={blog.image}
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

        {/* Article body — same 2-layer style with left accent as blog cards */}
        <Container>
          <Reveal delay={blog.image ? 0.07 : 0.05}>
            <div className="glass-card-outer blog-latest-card relative mt-8 overflow-hidden rounded-2xl md:mt-10">
              <div className="absolute left-0 top-0 bottom-0 z-10 w-1 bg-gradient-to-b from-primary via-primary/80 to-secondary" aria-hidden />
              <div className="glass-card-panel relative m-2 mt-4 rounded-xl border border-line p-6 pl-5 dark:border-white/10 md:p-10 md:pl-6 lg:p-12 lg:pl-8">
                {blog.summary && (
                  <div className="mb-8 rounded-xl border-l-4 border-primary bg-primary/5 py-4 pl-5 pr-5 dark:bg-primary/10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">In short</p>
                    <p className="mt-2 text-base leading-relaxed text-ink dark:text-ink">
                      {blog.summary}
                    </p>
                  </div>
                )}
                <Prose className="blog-detail-prose max-w-none">
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
                    {blog.content}
                  </ReactMarkdown>
                </Prose>
              </div>
            </div>
          </Reveal>

          {/* Footer CTA – creative card */}
          <Reveal delay={0.09}>
            <div className="glass-card-outer blog-latest-card relative mt-12 overflow-hidden rounded-2xl">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
              <div className="glass-card-panel relative m-2 mt-4 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-line p-6 dark:border-white/10 md:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">Thanks for reading</p>
                    <p className="mt-0.5 text-sm text-muted-1">
                      More ideas and notes in the blog.
                    </p>
                  </div>
                </div>
                <ButtonLink
                  to="/blogs"
                  variant="shine"
                  size="lg"
                  className="group shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  All posts
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
