import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Calendar, Clock, FileText, BookOpen } from "lucide-react";
import { Container, GlassCard } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getAllBlogs } from "@/lib/blogs";
import { headings } from "@/data/headings";
import type { BlogMeta } from "@/types";

const DEFAULT_BLOG_IMAGE = "/default/Blog.svg";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(dt);
}

/* ----- Latest: list card (single row per post) ----- */
function LatestListCard({ b, index }: { b: BlogMeta; index: number }) {
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <Link
        to={`/blogs/${b.slug}`}
        className="group flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex-row"
      >
        <GlassCard className="flex flex-1" blogStyle accent="left" panelClassName="flex min-h-0 flex-1 flex-col gap-4 p-4 pl-5 sm:flex-row sm:items-center sm:gap-6 sm:p-5 sm:pl-6">
            {/* Thumbnail – list style */}
            <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-28 sm:w-44">
              <img
                src={b.image ?? DEFAULT_BLOG_IMAGE}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0" aria-hidden />
            </div>
            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-muted-2">
                <time dateTime={b.date} className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden />
                  {formatDate(b.date)}
                </time>
                {b.readTime ? (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden />
                    {b.readTime} min read
                  </span>
                ) : null}
              </div>
              <h2 className="mt-1.5 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary sm:text-xl">
                {b.title}
              </h2>
              {b.summary ? (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-1">
                  {b.summary}
                </p>
              ) : null}
              {b.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {b.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-primary bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary dark:border-primary/35 dark:bg-primary/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 dark:border-white/10">
                <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15 group-hover:ring-primary/30 dark:ring-primary/30">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
              </div>
        </GlassCard>
        </Link>
    </Reveal>
  );
}

/* ----- More articles: grid card ----- */
function GridBlogCard({ b, idx }: { b: BlogMeta; idx: number }) {
  return (
    <Reveal key={b.slug} delay={0.03 * idx} className="h-full">
      <Link
        to={`/blogs/${b.slug}`}
        className="group flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <GlassCard className="flex h-full flex-col" blogStyle accent="left" panelClassName="flex min-h-0 flex-1 flex-col overflow-hidden pl-4">
            {/* Image */}
            <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-t-xl bg-surface-2">
              <img
                src={b.image ?? DEFAULT_BLOG_IMAGE}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Content – same style as Latest */}
            <div className="flex min-h-0 flex-1 flex-col p-4 pl-3">
              <div className="min-h-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-muted-2">
                  <time dateTime={b.date} className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden />
                    {formatDate(b.date)}
                  </time>
                  {b.readTime ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden />
                      {b.readTime} min read
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">
                  {b.title}
                </h2>
                {b.summary ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-1">
                    {b.summary}
                  </p>
                ) : null}
                {b.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {b.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-primary bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary dark:border-primary/35 dark:bg-primary/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 flex shrink-0 items-center gap-2 border-t border-line pt-4 dark:border-white/10">
                <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15 group-hover:ring-primary/30 dark:ring-primary/30">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </div>
        </GlassCard>
      </Link>
    </Reveal>
  );
}

const POSTS_PER_PAGE = 9; // TODO: add pagination (e.g. page query param + Load more / next)

export function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFromUrl = searchParams.get("tag") ?? null;

  const allBlogs = useMemo(() => getAllBlogs(), []);
  const uniqueTags = useMemo(() => {
    const set = new Set<string>();
    allBlogs.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [allBlogs]);

  const filteredBlogs = useMemo(() => {
    if (!tagFromUrl) return allBlogs;
    return allBlogs.filter((b) => b.tags.includes(tagFromUrl));
  }, [allBlogs, tagFromUrl]);

  // Pagination-ready: show first POSTS_PER_PAGE; structure allows adding page param later
  const visibleBlogs = useMemo(
    () => filteredBlogs.slice(0, POSTS_PER_PAGE),
    [filteredBlogs]
  );
  const [featured, ...rest] = visibleBlogs;

  const setTagFilter = (tag: string) => {
    const next = new URLSearchParams(searchParams);
    if (next.get("tag") === tag) {
      next.delete("tag");
    } else {
      next.set("tag", tag);
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <section className="relative pt-12 md:pt-16">
      <PageMeta
        title={headings.blogs.title}
        description={headings.blogs.description}
        path="/blogs"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -left-16 bottom-1/4 h-56 w-56 rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <Container>
        <Reveal delay={0}>
          <SectionHeading
            eyebrow={headings.blogs.eyebrow}
            title={headings.blogs.title}
            description={headings.blogs.description}
          />
        </Reveal>

        {uniqueTags.length > 0 && (
          <Reveal delay={0.02}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {uniqueTags.map((tag) => {
                const isActive = tagFromUrl === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTagFilter(tag)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                      isActive
                        ? "bg-primary text-white ring-primary/30 hover:bg-primary/90"
                        : "bg-ink/5 text-ink ring-line hover:bg-primary/10 hover:text-primary hover:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-primary/10 dark:hover:ring-primary/20"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {filteredBlogs.length ? (
          <>
            {/* Latest – list card view */}
            {featured && (
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                      Latest
                    </p>
                    <p className="text-xs text-muted-2">Most recent post</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <LatestListCard b={featured} index={0} />
                </div>
              </div>
            )}

            {/* More articles – grid view */}
            {rest.length > 0 && (
              <div className="mt-14">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px flex-1 max-w-24 bg-gradient-to-r from-primary to-transparent dark:from-white/20" aria-hidden />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                    More articles
                  </p>
                  <span className="text-xs text-primary">
                    ({rest.length}
                    {filteredBlogs.length > POSTS_PER_PAGE
                      ? ` of ${filteredBlogs.length}`
                      : ""}
                    )
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((b, idx) => (
                    <GridBlogCard key={b.slug} b={b} idx={idx} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/50 px-8 py-16 text-center dark:border-white/15">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-ink">
                {tagFromUrl ? `No posts with tag "${tagFromUrl}"` : "No posts yet"}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-1">
                {tagFromUrl
                  ? "Try another tag or clear the filter."
                  : `Add Markdown files to src/content/blogs to see them here.`}
              </p>
              {tagFromUrl && (
                <button
                  type="button"
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="mt-4 rounded-xl border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  Clear filter
                </button>
              )}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
