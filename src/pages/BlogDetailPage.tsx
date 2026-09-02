import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, ButtonLink, buttonStyles, cx, ShareModal } from "@/shared/ui";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getBlogBySlug } from "@/lib/blogs";
import { Reveal } from "@/shared/motion/Reveal";
import { profile } from "@/data/profile";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Sparkles,
  Calendar,
  Tag,
  ArrowUp,
  Share2,
  Copy,
  Quote,
  Zap,
  ZoomIn,
  X,
  Maximize2,
  Download,
  Terminal,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dt);
}

function slugifyHeading(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractToc(markdown: string) {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const label = m[1].trim();
    return { id: slugifyHeading(label), label };
  });
}

function headingText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return headingText((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

/* ── Ambient Background ── */
function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2 top-0 h-[350px] w-[500px] sm:h-[700px] sm:w-[980px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[110px] sm:blur-[150px] opacity-35"
        style={{ background: "radial-gradient(circle, #3d8eff 0%, #2563eb 40%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 right-0 h-[300px] w-[300px] sm:h-[520px] sm:w-[520px] translate-x-1/3 rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[280px] w-[340px] sm:h-[500px] sm:w-[600px] rounded-full blur-[130px] opacity-15"
        style={{ background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 md:p-8 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-[#060a16] shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-line bg-white/5 px-3.5 py-2.5 text-xs text-white/70">
            <span className="flex items-center gap-1.5 font-medium truncate max-w-[200px] sm:max-w-md">
              <Maximize2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{alt || "Full Resolution View"}</span>
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-white/70 hover:text-primary transition-colors text-[11px] sm:text-xs"
              >
                <Download className="h-3 w-3" />
                <span className="hidden sm:inline">Open Original</span>
              </a>
              <button type="button" onClick={onClose} className="rounded-lg p-1 text-white/70 hover:text-primary" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-[82vh] overflow-auto p-2 sm:p-4 flex items-center justify-center">
            <img src={src} alt={alt || "Post visual"} className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-lg select-none" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CodeBlock({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);
  const copy = () => {
    const text = ref.current?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const lang = className?.replace("language-", "") ?? "";
  const isDiagram = !lang || lang === "text" || lang === "diagram";

  return (
    <div
      className="group relative my-6 sm:my-8 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050b18 0%, #030712 100%)",
        border: "1px solid rgba(61,142,255,0.35)",
        boxShadow: "0 16px 40px -10px rgba(0,0,0,0.7), 0 0 25px rgba(61,142,255,0.12)",
      }}
    >
      <div
        className="h-[2px] w-full"
        style={{ background: "linear-gradient(90deg, transparent, #38bdf8 30%, #3d8eff 70%, transparent)" }}
      />
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-white/30 ml-2">
            {isDiagram ? "journey://diagram" : `source://${lang}`}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {isDiagram ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-primary px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              <Cpu className="h-3 w-3" />
              Diagram
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              <Terminal className="h-3 w-3" />
              {lang}
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-medium bg-white/10 text-white/80 hover:bg-primary/25 hover:text-primary"
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div
        className="relative overflow-x-auto"
        style={{
          backgroundImage: isDiagram
            ? "radial-gradient(circle at 1px 1px, rgba(61,142,255,0.12) 1px, transparent 0)"
            : undefined,
          backgroundSize: isDiagram ? "18px 18px" : undefined,
        }}
      >
        <pre
          ref={ref}
          className="p-4 sm:p-6 text-xs sm:text-[13px] leading-relaxed text-sky-100/90 font-mono whitespace-pre"
          style={{ margin: 0, letterSpacing: "0.02em" }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

function PullQuote({ children }: { children?: React.ReactNode }) {
  return (
    <figure
      className="my-7 sm:my-9 relative overflow-hidden rounded-2xl px-5 sm:px-8 py-5 sm:py-7"
      style={{
        background: "linear-gradient(135deg, rgba(61,142,255,0.16) 0%, rgba(129,140,248,0.06) 100%)",
        border: "1px solid rgba(61,142,255,0.35)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 32px -12px rgba(61,142,255,0.25)",
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[4px]"
        style={{ background: "linear-gradient(180deg, #38bdf8, #3d8eff, #818cf8)" }}
      />
      <Quote className="absolute top-3 right-4 h-10 w-10 text-primary/20" aria-hidden />
      <blockquote className="relative m-0 text-[1.05rem] sm:text-xl font-medium italic leading-relaxed text-white [&_p]:my-0 [&_p]:text-white">
        {children}
      </blockquote>
    </figure>
  );
}

function BlogContent({
  content,
  onImageClick,
  headings,
}: {
  content: string;
  onImageClick: (src: string, alt?: string) => void;
  headings: { id: string; label: string }[];
}) {

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, ...rest }) => {
          const isExt = typeof href === "string" && /^https?:\/\//i.test(href);
          return (
            <a
              href={href}
              {...rest}
              target={isExt ? "_blank" : undefined}
              rel={isExt ? "noopener noreferrer" : undefined}
              className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            />
          );
        },
        img: ({ src, alt }) => {
          if (!src) return null;
          return (
            <div className="my-6 sm:my-8 overflow-hidden rounded-2xl border border-primary/25 bg-[#060a16] shadow-xl group relative">
              <div className="relative cursor-zoom-in" onClick={() => onImageClick(src, alt)}>
                <img src={src} alt={alt || "Illustration"} className="w-full object-contain max-h-[380px] sm:max-h-[520px]" loading="lazy" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white border border-white/15">
                    <ZoomIn className="h-3.5 w-3.5 text-primary" /> Click to expand
                  </span>
                </div>
              </div>
            </div>
          );
        },
        h1: ({ children, ...props }) => (
          <h1 {...props} className="mt-10 mb-5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => {
          const id = slugifyHeading(headingText(children));
          const n = String(Math.max(1, headings.findIndex((h) => h.id === id) + 1)).padStart(2, "0");
          return (
            <h2
              {...props}
              id={id}
              className="group relative mt-5 mb-3 scroll-mt-28 first:mt-0 flex items-start gap-3 sm:gap-4 text-xl sm:text-2xl md:text-[1.7rem] font-bold text-white"
            >
              <span
                className="mt-1 shrink-0 font-mono text-[11px] sm:text-xs font-bold tracking-[0.18em] text-primary"
                style={{ textShadow: "0 0 12px rgba(61,142,255,0.7)" }}
              >
                {n}
              </span>
              <span className="flex-1 pb-3 border-b border-white/10">{children}</span>
            </h2>
          );
        },
        h3: ({ children, ...props }) => (
          <h3 {...props} className="mt-8 mb-3 flex items-center gap-2 text-lg font-bold text-white/95">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {children}
          </h3>
        ),
        blockquote: ({ children }) => <PullQuote>{children}</PullQuote>,
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children, ...props }) => {
          const isInline = !className && !String(children).includes("\n");
          if (isInline) {
            return (
              <code className="rounded-md bg-primary/12 border border-primary/25 px-1.5 py-0.5 text-[0.85em] font-mono font-medium text-primary" {...props}>
                {children}
              </code>
            );
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        p: ({ children }) => (
          <p className="blog-beat my-2.5 sm:my-3 leading-[1.85] text-white/78 text-[0.98rem] sm:text-[1.05rem]">
            {children}
          </p>
        ),
        ul: ({ children }) => <ul className="my-4 space-y-2.5 pl-1">{children}</ul>,
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 pl-6 list-decimal text-white/80">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-3 text-white/80 leading-relaxed">
            <span className="mt-[9px] shrink-0 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#3d8eff]" />
            <span className="flex-1 min-w-0">{children}</span>
          </li>
        ),
        hr: () => (
          <div className="my-4 flex items-center gap-3" aria-hidden>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.45))" }} />
            <span className="h-2 w-2 rotate-45 border border-primary/70 bg-primary/20" />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(129,140,248,0.45), transparent)" }} />
          </div>
        ),
        table: ({ children }) => (
          <div
            className="my-6 overflow-x-auto rounded-2xl"
            style={{
              background: "rgba(4,10,24,0.7)",
              border: "1px solid rgba(61,142,255,0.28)",
              boxShadow: "0 12px 32px -12px rgba(0,0,0,0.55)",
            }}
          >
            <table className="w-full min-w-[280px] border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead
            className="border-b border-primary/30"
            style={{ background: "linear-gradient(90deg, rgba(61,142,255,0.18), rgba(129,140,248,0.08))" }}
          >
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-white/80 border-b border-white/[0.06]">{children}</td>
        ),
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-sky-200/90">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = slug ? getBlogBySlug(slug) : null;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt?: string } | null>(null);
  const [activeId, setActiveId] = useState("");
  const toc = useMemo(() => (blog ? extractToc(blog.content) : []), [blog]);

  useEffect(() => {
    if (!blog) return;
    const fn = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH <= 0 ? 1 : Math.min(1, window.scrollY / docH));

      const headings = toc
        .map((t) => document.getElementById(t.id))
        .filter((el): el is HTMLElement => Boolean(el));
      let current = headings[0]?.id ?? "";
      for (const el of headings) {
        if (el.getBoundingClientRect().top < 140) current = el.id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [blog, toc]);

  if (!blog) {
    return (
      <article className="pt-12 sm:pt-16 pb-24">
        <Container>
          <div
            className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-16 text-center"
            style={{ background: "rgba(10,18,36,0.6)", border: "1px solid rgba(61,142,255,0.2)" }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Post Not Found</h1>
            <p className="mt-2 text-muted-1 text-sm">This blog or note doesn't exist yet.</p>
            <ButtonLink to="/blogs" variant="soft" size="md" className="mt-6">
              <ArrowLeft className="h-4 w-4" /> Back to Blogs
            </ButtonLink>
          </div>
        </Container>
      </article>
    );
  }

  const words = blog.content.trim().split(/\s+/).length;
  const readMin = blog.readTime ?? Math.max(1, Math.round(words / 200));
  const storyLabel = blog.tags[0] || "Essay";

  return (
    <>
      <PageMeta
        title={blog.title}
        description={blog.summary || `${blog.title} – by Dinesh`}
        path={`/blogs/${blog.slug}`}
        ogType="article"
      />

      <AmbientBg />

      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} title={blog.title} summary={blog.summary} />

      {lightboxImg && (
        <ImageLightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />
      )}

      <article className="pb-16 pt-4 sm:pt-8">
        <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-sm">
                <Link to="/blogs" className="flex items-center gap-1 font-medium text-primary hover:text-primary/80">
                  <ArrowLeft className="h-4 w-4" /> Blogs
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                <span className="text-white/50 truncate max-w-[180px] sm:max-w-md">{blog.title}</span>
              </nav>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className={cx(
                  buttonStyles.base,
                  "rounded-xl px-4 py-1.5 text-sm gap-2 border text-muted-2 border-white/10 hover:border-primary hover:text-primary bg-white/5"
                )}
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>
          </Reveal>

          {/* Cinematic hero */}
          <Reveal delay={0.04}>
            <header
              className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]"
              style={{
                border: "1px solid rgba(61,142,255,0.28)",
                boxShadow: "0 30px 80px -24px rgba(0,0,0,0.75), 0 0 40px rgba(61,142,255,0.12)",
              }}
            >
              <div className="relative min-h-[320px] sm:min-h-[420px] md:min-h-[480px]">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #0b1730, #122044 50%, #0a1020)" }}
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(2,6,14,0.15) 0%, rgba(2,6,14,0.55) 45%, rgba(2,6,14,0.96) 100%)",
                  }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.7), transparent)" }}
                />

                <div className="relative z-10 flex h-full min-h-[320px] sm:min-h-[420px] flex-col justify-end p-5 sm:p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
                      <Sparkles className="h-3 w-3" />
                      {storyLabel}
                    </span>
                    {blog.tags.slice(1).map((t) => (
                      <Link
                        key={t}
                        to={`/blogs?tag=${t}`}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] text-white/75 backdrop-blur-md hover:border-primary/40 hover:text-primary"
                      >
                        <Tag className="h-3 w-3" />
                        {t}
                      </Link>
                    ))}
                  </div>

                  <h1 className="max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.12]">
                    {blog.title}
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/70">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black text-white"
                        style={{ background: "linear-gradient(135deg, #3d8eff, #818cf8)" }}
                      >
                        {profile.hero.initials}
                      </span>
                      {profile.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                      <Clock className="h-4 w-4" />
                      {readMin} min read
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-primary/80" />
                      {words.toLocaleString()} words
                    </span>
                    {blog.image && (
                      <button
                        type="button"
                        onClick={() => setLightboxImg({ src: blog.image!, alt: blog.title })}
                        className="inline-flex items-center gap-1.5 text-white/60 hover:text-primary"
                      >
                        <ZoomIn className="h-4 w-4" /> Expand cover
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </header>
          </Reveal>

          <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_15.5rem] gap-8 xl:gap-12">
            <div className="min-w-0">
              {blog.summary && (
                <Reveal delay={0.05}>
                  <div
                    className="mb-8 rounded-2xl p-5 sm:p-6 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(61,142,255,0.12) 0%, rgba(37,99,235,0.04) 100%)",
                      border: "1px solid rgba(61,142,255,0.28)",
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.7), transparent)" }}
                    />
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary border border-primary/40 bg-primary/10">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">In a nutshell</span>
                        <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-white/90">{blog.summary}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              <div
                className="blog-article relative z-[1] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-9 md:p-12"
                style={{
                  background: "linear-gradient(180deg, rgba(10,18,36,0.92) 0%, rgba(6,12,26,0.92) 100%)",
                  border: "1px solid rgba(61,142,255,0.2)",
                  boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <BlogContent
                  content={blog.content}
                  headings={toc}
                  onImageClick={(src, alt) => setLightboxImg({ src, alt })}
                />
              </div>

              <Reveal delay={0.08}>
                <div
                  className="mt-10 overflow-hidden rounded-2xl p-6 sm:p-8 relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(61,142,255,0.12), rgba(6,11,24,0.9))",
                    border: "1px solid rgba(61,142,255,0.25)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4 text-center sm:text-left">
                      <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-primary border border-primary/40 bg-primary/10">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">Thanks for reading</h2>
                        <p className="text-sm text-white/60 mt-0.5">A record of how I figured things out — more notes soon.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                      <ButtonLink to="/blogs" variant="shine" size="md" className="group justify-center">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        All Posts
                      </ButtonLink>
                      <button
                        type="button"
                        onClick={() => setShareOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-primary hover:border-primary bg-white/5"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-1">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">Chapters</p>
                  <nav className="relative pl-4 border-l border-white/10 space-y-1">
                    {toc.map((item, i) => {
                      const active = activeId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={cx(
                            "relative block py-1.5 text-[12px] leading-snug transition-colors",
                            active ? "text-white font-semibold" : "text-white/40 hover:text-white/80"
                          )}
                        >
                          {active && (
                            <span className="absolute -left-[17px] top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#3d8eff]" />
                          )}
                          <span className="font-mono text-[10px] text-primary/70 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                          {item.label}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </article>
    </>
  );
}
