import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Sparkles,
  Hash,
  TrendingUp,
  Eye,
  Rss,
} from "lucide-react";
import { Container } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getAllBlogs } from "@/lib/blogs";
import { headings } from "@/data/headings";
import type { BlogMeta } from "@/types";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DEFAULT_BLOG_IMAGE = "/default/Blog.svg";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(dt);
}

/* ── Magnetic tilt card wrapper ─────────────────────────────────── */
function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 300, damping: 25 });
  const springRy = useSpring(ry, { stiffness: 300, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rx.set(((e.clientY - cy) / rect.height) * -intensity);
    ry.set(((e.clientX - cx) / rect.width) * intensity);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating orb decorations ──────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(61,142,255,0.4) 0%, rgba(37,99,235,0.1) 50%, transparent 70%)",
          animation: "float-orb-1 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.35) 0%, rgba(61,142,255,0.08) 60%, transparent 70%)",
          animation: "float-orb-2 10s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute bottom-20 right-1/4 h-[300px] w-[300px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)",
          animation: "float-orb-1 12s ease-in-out infinite 4s",
        }}
      />
    </div>
  );
}

/* ── Featured hero card ──────────────────────────────────────────── */
function FeaturedHeroCard({ b }: { b: BlogMeta }) {
  return (
    <Reveal delay={0.05}>
      <Link to={`/blogs/${b.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl">
        <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: "clamp(260px, 45vw, 460px)" }}>

          {/* ── Full-bleed image layer ── */}
          <div className="absolute inset-0">
            <img
              src={b.image ?? DEFAULT_BLOG_IMAGE}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              loading="eager"
            />
            {/* deep cinematic gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,4,10,0.97) 0%, rgba(2,4,10,0.75) 40%, rgba(2,4,10,0.2) 75%, rgba(2,4,10,0.0) 100%)",
              }}
            />
            {/* side vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(2,4,10,0.6) 0%, transparent 40%, transparent 60%, rgba(2,4,10,0.3) 100%)",
              }}
            />
          </div>

          {/* ── Animated scan line ── */}
          <div
            className="absolute left-0 right-0 h-[1.5px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(61,142,255,0.8) 40%, rgba(129,140,248,0.9) 60%, transparent 100%)",
              animation: "scan-sweep 2.4s ease-in-out infinite",
              top: "30%",
            }}
            aria-hidden
          />

          {/* ── Neon corner accent lines ── */}
          <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-0 w-8 h-[2px] rounded-r-full" style={{ background: "linear-gradient(90deg, #3d8eff, transparent)" }} />
            <div className="absolute top-0 left-0 h-8 w-[2px] rounded-b-full" style={{ background: "linear-gradient(180deg, #3d8eff, transparent)" }} />
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 z-10 pointer-events-none" aria-hidden>
            <div className="absolute top-0 right-0 w-8 h-[2px] rounded-l-full" style={{ background: "linear-gradient(270deg, #818cf8, transparent)" }} />
            <div className="absolute top-0 right-0 h-8 w-[2px] rounded-b-full" style={{ background: "linear-gradient(180deg, #818cf8, transparent)" }} />
          </div>

          {/* ── Floating "FEATURED" badge (top-left) ── */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md"
            style={{ background: "rgba(61,142,255,0.15)", border: "1px solid rgba(61,142,255,0.4)" }}
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-primary">Featured</span>
          </div>

          {/* ── Read time badge (top-right) ── */}
          {b.readTime && (
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-1 sm:gap-1.5 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-white/80">{b.readTime} min</span>
            </div>
          )}

          {/* ── Bottom content strip ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-7 md:p-8">
            {/* date + tags row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <time dateTime={b.date} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/50">
                <Calendar className="h-3 w-3 text-primary/60" />
                {formatDate(b.date)}
              </time>
              {b.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(61,142,255,0.12)", border: "1px solid rgba(61,142,255,0.3)", color: "#7dd3fc" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* title */}
            <h2
              className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white mb-2 max-w-2xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              {b.title}
            </h2>

            {/* summary + CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              {b.summary && (
                <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-white/55 max-w-lg line-clamp-2">
                  {b.summary}
                </p>
              )}

              {/* glowing CTA button */}
              <div className="shrink-0">
                <span
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 group-hover:gap-3"
                  style={{
                    background: "linear-gradient(135deg, #3d8eff 0%, #818cf8 100%)",
                    boxShadow: "0 0 0 0 rgba(61,142,255,0.5)",
                    animation: "pulse-cta 2.5s ease-in-out infinite",
                  }}
                >
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>

          {/* ── Outer glowing border that brightens on hover ── */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-100"
            style={{ boxShadow: "inset 0 0 0 1px rgba(61,142,255,0.35), 0 0 60px rgba(61,142,255,0.08)" }}
            aria-hidden
          />
        </div>
      </Link>

      <style>{`
        @keyframes scan-sweep {
          0%   { top: 20%; opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 85%; opacity: 0; }
        }
        @keyframes pulse-cta {
          0%, 100% { box-shadow: 0 0 0 0 rgba(61,142,255,0.55), 0 8px 30px rgba(61,142,255,0.3); }
          50%       { box-shadow: 0 0 0 8px rgba(61,142,255,0), 0 8px 40px rgba(61,142,255,0.5); }
        }
      `}</style>
    </Reveal>
  );
}

/* ── Grid blog card ──────────────────────────────────────────────── */
function GridBlogCard({ b, idx }: { b: BlogMeta; idx: number }) {
  const num = String(idx + 1).padStart(2, "0");

  return (
    <Reveal delay={0.04 * idx} className="h-full">
      <TiltCard intensity={8} className="h-full">
        <Link
          to={`/blogs/${b.slug}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ minHeight: "clamp(220px, 38vw, 340px)" }}
        >
          {/* ── Full-bleed image ── */}
          <div className="absolute inset-0">
            <img
              src={b.image ?? DEFAULT_BLOG_IMAGE}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* base gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,4,10,0.96) 0%, rgba(2,4,10,0.55) 45%, rgba(2,4,10,0.15) 100%)",
              }}
            />
            {/* extra darken on hover for readability */}
            <div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{ background: "rgba(2,4,10,0.25)" }}
            />
          </div>

          {/* ── Neon corner brackets (appear on hover) ── */}
          <div className="absolute top-0 left-0 w-10 h-10 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
            <div className="absolute top-0 left-0 w-5 h-[1.5px]" style={{ background: "linear-gradient(90deg, #3d8eff, transparent)" }} />
            <div className="absolute top-0 left-0 h-5 w-[1.5px]" style={{ background: "linear-gradient(180deg, #3d8eff, transparent)" }} />
          </div>
          <div className="absolute top-0 right-0 w-10 h-10 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
            <div className="absolute top-0 right-0 w-5 h-[1.5px]" style={{ background: "linear-gradient(270deg, #818cf8, transparent)" }} />
            <div className="absolute top-0 right-0 h-5 w-[1.5px]" style={{ background: "linear-gradient(180deg, #818cf8, transparent)" }} />
          </div>

          {/* ── Index number (top-left) ── */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span
              className="font-black text-[1.8rem] sm:text-[2.5rem] leading-none select-none transition-all duration-500 group-hover:opacity-20"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(61,142,255,0.5), rgba(129,140,248,0.3))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {num}
            </span>
          </div>

          {/* ── Read time badge (top-right) ── */}
          {b.readTime && (
            <div
              className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 backdrop-blur-md text-[10px] font-semibold text-white/70"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Clock className="h-2.5 w-2.5 text-primary" />
              {b.readTime} min
            </div>
          )}

          {/* ── Bottom content strip ── */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5">
            {/* Tags row */}
            {b.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2.5 transition-all duration-300 translate-y-1 group-hover:translate-y-0 opacity-70 group-hover:opacity-100">
                {b.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.15em]"
                    style={{ background: "rgba(61,142,255,0.15)", border: "1px solid rgba(61,142,255,0.3)", color: "#7dd3fc" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h2
              className="line-clamp-2 text-sm sm:text-base font-bold leading-snug tracking-tight text-white mb-1.5 transition-all duration-300"
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
            >
              {b.title}
            </h2>

            {/* Summary — slides up on hover */}
            {b.summary && (
              <p className="text-[11px] leading-relaxed text-white/50 line-clamp-2 max-h-0 overflow-hidden transition-all duration-400 group-hover:max-h-12 mb-0 group-hover:mb-3">
                {b.summary}
              </p>
            )}

            {/* Date + Read more row */}
            <div className="flex items-center justify-between">
              <time
                dateTime={b.date}
                className="inline-flex items-center gap-1 text-[10px] text-white/40"
              >
                <Calendar className="h-2.5 w-2.5 text-primary/50" />
                {formatDate(b.date)}
              </time>
              <span
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white transition-all duration-300 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(135deg, rgba(61,142,255,0.9), rgba(129,140,248,0.9))" }}
              >
                Read
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* ── Glowing border on hover ── */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ boxShadow: "inset 0 0 0 1px rgba(61,142,255,0.3)" }}
            aria-hidden
          />

          {/* ── Bottom accent line ── */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(90deg, transparent, #3d8eff 30%, #818cf8 70%, transparent)" }}
            aria-hidden
          />
        </Link>
      </TiltCard>
    </Reveal>
  );
}


/* ── Stats bar ───────────────────────────────────────────────────── */
function StatsBar({ total, tagCount }: { total: number; tagCount: number }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-6">
      {[
        { icon: Rss, label: "Total Posts", value: total },
        { icon: Hash, label: "Topics", value: tagCount },
        { icon: TrendingUp, label: "Growing", value: "✦" },
      ].map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex items-center gap-2 rounded-xl border border-primary px-3 py-2"
        >
          <Icon className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-2">{label}</span>
          <span className="text-xs font-bold text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}

const POSTS_PER_PAGE = 9;

export function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFromUrl = searchParams.get("tag") ?? null;
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

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

  const visibleBlogs = useMemo(
    () => filteredBlogs.slice(0, POSTS_PER_PAGE),
    [filteredBlogs]
  );

  const [featured, second, ...rest] = visibleBlogs;

  const setTagFilter = (tag: string) => {
    const next = new URLSearchParams(searchParams);
    if (next.get("tag") === tag) {
      next.delete("tag");
    } else {
      next.set("tag", tag);
    }
    setSearchParams(next, { replace: true });
  };

  // Layout: featured + second as hero strip, rest as grid
  const gridBlogs = second ? [second, ...rest] : rest;

  return (
    <section className="relative pt-12 md:pt-16 pb-2 sm:pb-10">
      <PageMeta
        title={headings.blogs.eyebrow}
        description={headings.blogs.description}
        path="/blogs"
      />

      <FloatingOrbs />

      <style>{`
        @keyframes float-orb-1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(15px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes shimmer-tag {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .tag-active-shine {
          background-size: 200% auto;
          animation: shimmer-tag 3s linear infinite;
        }
      `}</style>

      <Container>
        {/* ── Page Header ── */}
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={headings.blogs.eyebrow}
            title={headings.blogs.title}
            description={headings.blogs.description}
            icon={Eye}
            as="h1"
          >
            <StatsBar total={allBlogs.length} tagCount={uniqueTags.length} />
          </SectionHeading>
        </div>

        {/* ── Tag Filter Pills ── */}
        {uniqueTags.length > 0 && (
          <Reveal delay={0.04}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-2 font-medium mr-1">Filter:</span>
              {uniqueTags.map((tag) => {
                const isActive = tagFromUrl === tag;
                const isHovered = hoveredTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTagFilter(tag)}
                    onMouseEnter={() => setHoveredTag(tag)}
                    onMouseLeave={() => setHoveredTag(null)}
                    className={`relative rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden ${isActive
                        ? "text-muted-1 shadow-lg shadow-primary/30"
                        : "text-muted-1 border border-white/10 hover:text-primary hover:border-primary"
                      }`}
                    style={
                      isActive
                        ? {
                          background:
                            "linear-gradient(135deg, #3d8eff, #818cf8)",
                        }
                        : isHovered
                          ? { background: "rgba(61,142,255,0.08)" }
                          : {}
                    }
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 opacity-30 tag-active-shine"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        }}
                        aria-hidden
                      />
                    )}
                    <span className="relative flex items-center gap-1">
                      <Hash className="h-2.5 w-2.5 opacity-70" />
                      {tag}
                    </span>
                  </button>
                );
              })}
              {tagFromUrl && (
                <button
                  type="button"
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="ml-1 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-2 hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </Reveal>
        )}

        {filteredBlogs.length ? (
          <>
            {/* ── Featured Hero Card ── */}
            {featured && (
              <div className="mt-10">
                <FeaturedHeroCard b={featured} />
              </div>
            )}

            {/* ── Grid Cards ── */}
            {gridBlogs.length > 0 && (
              <div className="mt-14">
                {/* Section label */}
                <Reveal delay={0}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-1 rounded-full"
                        style={{ background: "linear-gradient(to bottom, #3d8eff, #818cf8)" }}
                      />
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        More Articles
                      </span>
                    </div>
                    <span className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" aria-hidden />
                    <span className="text-xs text-muted-2">
                      {gridBlogs.length} post{gridBlogs.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {gridBlogs.map((b, idx) => (
                    <GridBlogCard key={b.slug} b={b} idx={idx} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Reveal delay={0.05}>
            <div className="mt-16 flex flex-col items-center justify-center rounded-3xl py-20 text-center"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(61,142,255,0.2)",
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
                style={{ background: "rgba(61,142,255,0.1)", border: "1px solid rgba(61,142,255,0.2)" }}
              >
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-white">
                {tagFromUrl ? `No posts tagged "${tagFromUrl}"` : "No posts yet"}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-1">
                {tagFromUrl
                  ? "Try a different tag or clear the filter."
                  : "Add Markdown files to src/content/blogs to see them here."}
              </p>
              {tagFromUrl && (
                <button
                  type="button"
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="mt-6 rounded-xl bg-primary/10 border border-primary/25 px-5 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/20"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
