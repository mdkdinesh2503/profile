import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";
import { getBlogBySlug } from "@/lib/blogs";
import { Prose } from "@/shared/ui/Prose";
import { Reveal } from "@/shared/motion/Reveal";
import { ArrowLeft, Calendar, Check, ChevronRight, Clock, Link2, Tag } from "lucide-react";
import { motion } from "framer-motion";

const WORDS_PER_MINUTE = 200;

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
          <Card className="p-8 text-center">
            <div className="text-lg font-semibold text-ink">Blog not found</div>
            <p className="mt-2 text-muted-1">
              This post doesn't exist yet. Check the blog list.
            </p>
            <Link
              to="/blogs"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blogs
            </Link>
          </Card>
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
        {/* Hero: gradient glow + optional image */}
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
                  <span className="font-medium text-ink" aria-current="page">
                    {blog.title}
                  </span>
                </nav>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white group"
                  aria-label="Copy link"
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4 text-primary group-hover:text-white" aria-hidden />
                      <span className="text-primary group-hover:text-white">Copied</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4 text-primary group-hover:text-white" aria-hidden />
                      <span className="text-primary group-hover:text-white">Copy link</span>
                    </>
                  )}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.03}>
              <header className="mt-6 max-w-3xl">
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-muted-1">
                    <Tag className="h-4 w-4 shrink-0" aria-hidden />
                    {blog.tags.map((t) => (
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
                  {blog.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-1">
                  <time
                    dateTime={blog.date}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                    {formatDate(blog.date)}
                  </time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0" aria-hidden />
                    {blog.readTime ?? 1} min read
                  </span>
                </div>
              </header>
            </Reveal>
          </Container>
        </div>

        {/* Featured image – full-bleed feel with rounded bottom */}
        {blog.image && (
          <Reveal delay={0.05}>
            <Container className="mt-8">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lg ring-1 ring-ink/5">
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
            </Container>
          </Reveal>
        )}

        {/* Article body – card with left accent */}
        <Container>
          <Reveal delay={blog.image ? 0.07 : 0.05}>
            <Card className="relative mt-8 overflow-hidden md:mt-10" hoverLift={false}>
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary via-primary/90 to-secondary"
                aria-hidden
              />
              <div className="p-6 pl-8 md:p-10 md:pl-12 lg:p-12 lg:pl-14">
                <Prose className="max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: (props) => (
                        <a
                          {...props}
                          className="font-medium text-primary no-underline underline-offset-4 hover:underline"
                        />
                      ),
                      pre: (props) => (
                        <pre
                          {...props}
                          className="overflow-x-auto rounded-xl border border-line bg-ink/5 py-4"
                        />
                      ),
                      code: (props) => {
                        const isInline = !props.className;
                        if (isInline)
                          return (
                            <code
                              {...props}
                              className="rounded bg-ink/10 px-1.5 py-0.5 text-sm font-medium text-ink"
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
            </Card>
          </Reveal>

          {/* Footer CTA */}
          <Reveal delay={0.09}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-10">
              <Link
                to="/blogs"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                All posts
              </Link>
              <p className="text-sm text-muted-1">
                Thanks for reading. More ideas in the blog.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
