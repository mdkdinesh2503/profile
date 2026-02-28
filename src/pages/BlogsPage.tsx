import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
import { Reveal } from "@/shared/motion/Reveal";
import { getAllBlogs } from "@/lib/blogs";
import { headings } from "@/data/headings";
import { cx } from "@/shared/ui/cx";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(dt);
}

type ViewMode = "grid" | "list";
const VIEW_STORAGE_KEY = "blogs.view";

function getInitialView(): ViewMode {
  if (typeof window === "undefined") return "grid";
  const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
  return stored === "list" ? "list" : "grid";
}

export function BlogsPage() {
  const blogs = getAllBlogs();
  const [view, setView] = useState<ViewMode>(() => getInitialView());

  useEffect(() => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={headings.blogs.eyebrow}
            title={headings.blogs.title}
            description={headings.blogs.description}
          />

          <div className="hidden items-center gap-2 md:inline-flex">
            <div className="inline-flex rounded-xl border border-line bg-surface-2 p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                className={cx(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  view === "grid"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-muted-1 hover:text-ink hover:bg-surface",
                )}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={cx(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  view === "list"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-muted-1 hover:text-ink hover:bg-surface",
                )}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div
          className={cx(
            "mt-8 grid gap-4",
            view === "grid" ? "md:grid-cols-2" : "",
          )}
        >
          {blogs.length ? (
            blogs.map((b, idx) => (
              <Reveal key={b.slug} delay={0.03 * idx}>
                <Link to={`/blogs/${b.slug}`} className="block">
                  {view === "grid" ? (
                    <Card className="overflow-hidden">
                      {b.image ? (
                        <div className="border-b border-line bg-surface-2">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="h-44 w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <div className="p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <div className="text-base font-semibold tracking-tight text-ink">
                            {b.title}
                          </div>
                          <div className="text-xs text-muted-2">
                            {formatDate(b.date)}
                          </div>
                        </div>
                        {b.summary ? (
                          <p className="mt-3 text-sm leading-relaxed text-muted-1">
                            {b.summary}
                          </p>
                        ) : null}
                        {b.tags.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {b.tags.slice(0, 5).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted-2"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </Card>
                  ) : (
                    <Card className="overflow-hidden md:flex">
                      {b.image ? (
                        <div className="border-b border-line bg-surface-2 md:border-b-0 md:border-r md:w-56">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="h-44 w-full object-cover md:h-full"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <div className="p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <div className="text-base font-semibold tracking-tight text-ink">
                            {b.title}
                          </div>
                          <div className="text-xs text-muted-2">
                            {formatDate(b.date)}
                          </div>
                        </div>
                        {b.summary ? (
                          <p className="mt-3 text-sm leading-relaxed text-muted-1">
                            {b.summary}
                          </p>
                        ) : null}
                        {b.tags.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {b.tags.slice(0, 5).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted-2"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </Card>
                  )}
                </Link>
              </Reveal>
            ))
          ) : (
            <Card className="p-6">
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