import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
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
                  className="group block h-full transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
                >
                  <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-lift-2 group-focus-visible:shadow-lift-2">
                    <div className="relative shrink-0 overflow-hidden border-b border-line bg-surface-2">
                      <img
                        src={b.image ?? DEFAULT_BLOG_IMAGE}
                        alt=""
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col p-6">
                      <div className="min-h-0 flex-1">
                        <div className="flex items-center gap-2 text-xs text-muted-2">
                          <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          <time dateTime={b.date}>{formatDate(b.date)}</time>
                        </div>
                        <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-ink group-hover:text-primary transition-colors">
                          {b.title}
                        </h2>
                        {b.summary ? (
                          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-1">
                            {b.summary}
                          </p>
                        ) : null}
                        {b.tags.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {b.tags.slice(0, 5).map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center rounded-md border border-line bg-ink/10 px-2.5 py-1 text-xs font-medium text-primary dark:bg-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <span
                        className="mt-auto shrink-0 pt-5 inline-flex w-fit items-center gap-2 bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary"
                        aria-hidden
                      >
                        View article
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))
          ) : (
            <Card className="p-8 text-center">
              <div className="text-sm font-semibold text-ink">No posts yet</div>
              <p className="mt-2 text-sm text-muted-1">
                Add Markdown files to <code className="rounded bg-ink/[0.08] px-1.5 py-0.5">src/content/blogs</code>.
              </p>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}