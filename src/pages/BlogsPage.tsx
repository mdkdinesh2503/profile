import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { getAllBlogs } from "@/lib/blogs";
import { headings } from "@/data/headings";

const DEFAULT_BLOG_IMAGE = "/default/Blog.svg";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(dt);
}

export function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={headings.blogs.eyebrow}
            title={headings.blogs.title}
            description={headings.blogs.description}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.length ? (
            blogs.map((b, idx) => (
              <Reveal key={b.slug} delay={0.04 * idx} className="h-full">
                <Link
                  to={`/blogs/${b.slug}`}
                  className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.12),0_4px_14px_-4px_rgba(0,0,0,0.06)]">
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/70" aria-hidden />
                    <div className="relative shrink-0 overflow-hidden rounded-t-2xl bg-surface-2">
                      <img
                        src={b.image ?? DEFAULT_BLOG_IMAGE}
                        alt=""
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                    </div>
                    <div className="glass-inner relative m-2 mt-3 flex min-h-0 flex-1 flex-col rounded-xl p-5 transition-all duration-300 group-hover:bg-primary/[0.06] dark:group-hover:bg-primary/10">
                      <div className="min-h-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-2">
                          <time dateTime={b.date} className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {formatDate(b.date)}
                          </time>
                          {b.readTime ? (
                            <>
                              <span className="text-muted-2/60" aria-hidden>·</span>
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                {b.readTime} min read
                              </span>
                            </>
                          ) : null}
                        </div>
                        <h2 className="mt-2.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">
                          {b.title}
                        </h2>
                        {b.summary ? (
                          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-1">
                            {b.summary}
                          </p>
                        ) : null}
                        {b.tags.length ? (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {b.tags.slice(0, 5).map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center rounded-md border border-line bg-ink/10 px-2 py-0.5 text-[11px] font-medium text-primary dark:bg-white/10 dark:border-white/20"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-5 border-t border-line pt-5 dark:border-white/10">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink/5 px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-line transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10">
                          View article
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))
          ) : (
            <div className="relative overflow-hidden rounded-2xl bg-surface shadow-sm">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60" aria-hidden />
              <div className="glass-inner m-2 mt-4 rounded-xl p-8 text-center">
                <h2 className="text-lg font-semibold text-ink">No posts yet</h2>
                <p className="mt-2 max-w-sm mx-auto text-sm leading-relaxed text-muted-1">
                  Add Markdown files to <code className="rounded bg-ink/[0.08] px-1.5 py-0.5 text-ink dark:bg-white/10 dark:text-ink">src/content/blogs</code> to see them here.
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}