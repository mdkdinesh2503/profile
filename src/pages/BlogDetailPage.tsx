import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, ButtonLink, ShareModal } from "@/shared/ui";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getBlogBySlug } from "@/lib/blogs";
import { Reveal } from "@/shared/motion/Reveal";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Sparkles,
  Calendar,
  Tag,
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
        className="absolute left-1/2 top-0 h-[280px] w-[420px] sm:h-[560px] sm:w-[780px] md:h-[700px] md:w-[980px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[90px] sm:blur-[120px] md:blur-[150px] opacity-35"
        style={{ background: "radial-gradient(circle, #3d8eff 0%, #2563eb 40%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 right-0 h-[240px] w-[240px] sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px] translate-x-1/3 rounded-full blur-[80px] sm:blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[220px] w-[280px] sm:h-[400px] sm:w-[480px] md:h-[500px] md:w-[600px] rounded-full blur-[100px] sm:blur-[130px] opacity-15"
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
      className="group relative my-5 sm:my-6 md:my-8 rounded-2xl overflow-hidden"
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
        className="relative w-full overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          backgroundImage: isDiagram
            ? "radial-gradient(circle at 1px 1px, rgba(61,142,255,0.12) 1px, transparent 0)"
            : undefined,
          backgroundSize: isDiagram ? "18px 18px" : undefined,
        }}
      >
        <div className="w-full flex justify-start sm:justify-center min-w-max p-3 sm:p-5 md:p-6">
          <pre
            ref={ref}
            className="text-left text-[11px] sm:text-xs md:text-[13px] leading-relaxed text-sky-100/90 font-mono whitespace-pre"
            style={{ margin: 0, letterSpacing: "0.02em" }}
          >
            {children}
          </pre>
        </div>
      </div>
    </div>
  );
}

function PullQuote({ children }: { children?: React.ReactNode }) {
  return (
    <figure
      className="my-6 relative overflow-hidden rounded-2xl pl-4 sm:pl-6 md:pl-8 pr-10 sm:pr-12 md:pr-14 py-4 sm:py-5"
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
      <Quote className="absolute top-3 right-3 h-5 w-5 sm:h-7 sm:w-7 md:h-10 md:w-10 text-primary pointer-events-none" aria-hidden />
      <blockquote className="relative m-0 text-sm sm:text-base md:text-[1.05rem] lg:text-xl font-medium italic leading-relaxed text-white [&_p]:my-0 [&_p]:text-white">
        {children}
      </blockquote>
    </figure>
  );
}

function BlogContent({
  content,
  onImageClick,
}: {
  content: string;
  onImageClick: (src: string, alt?: string) => void;
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
            <figure className="my-6 sm:my-7 md:my-9 overflow-hidden rounded-2xl sm:rounded-[1.5rem] border border-line bg-[#060a16] shadow-2xl shadow-black/40 group relative">
              <div
                className="absolute inset-x-0 top-0 h-px z-10"
                style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.7), transparent)" }}
                aria-hidden
              />
              <div
                className="relative cursor-zoom-in flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 via-[#060a16] to-[#04080f] p-1.5 sm:p-3 md:p-4"
                onClick={() => onImageClick(src, alt)}
              >
                <img
                  src={src}
                  alt={alt || "Illustration"}
                  className="w-full object-contain max-h-[300px] sm:max-h-[420px] md:max-h-[520px] rounded-xl sm:rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.015] select-none shadow-xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080f]/40 via-transparent to-transparent pointer-events-none" aria-hidden />
                <div className="absolute inset-0 bg-primary/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden />
                <div className="absolute top-3 sm:top-5 right-3 sm:right-5 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 px-3 sm:px-3.5 py-1.5 text-[10px] sm:text-[11px] font-semibold text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none">
                  <ZoomIn className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                  <span>Click to expand</span>
                </div>
              </div>
              {alt && (
                <figcaption className="flex items-center justify-between gap-3 border-t border-line bg-white/[0.025] px-3.5 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-2 text-white/55 truncate">
                    <Maximize2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate">{alt}</span>
                  </span>
                  <span className="text-white/35 font-medium whitespace-nowrap shrink-0">
                    Tap to expand
                  </span>
                </figcaption>
              )}
            </figure>
          );
        },
        h1: ({ children, ...props }) => (
          <h1 {...props} className="mt-8 sm:mt-10 mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => {
          const id = slugifyHeading(headingText(children));
          return (
            <h2
              {...props}
              id={id}
              className="group relative mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 scroll-mt-28 first:mt-0 text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] font-bold text-white pb-3 border-b border-white/10"
            >
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => (
          <h3 {...props} className="mt-6 sm:mt-8 mb-2 sm:mb-3 flex items-center gap-2 text-[15px] sm:text-base md:text-lg font-bold text-white/95">
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
          <p className="blog-beat my-2 sm:my-2.5 md:my-3 leading-[1.75] sm:leading-[1.85] text-white/78 text-[0.88rem] sm:text-[0.92rem] md:text-[0.98rem] lg:text-[1.05rem]">
            {children}
          </p>
        ),
        ul: ({ children }) => <ul className="my-3 sm:my-4 space-y-2 sm:space-y-2.5 pl-1">{children}</ul>,
        ol: ({ children }) => (
          <ol className="my-3 sm:my-4 space-y-1.5 sm:space-y-2 pl-5 sm:pl-6 list-decimal text-white/80 text-[0.88rem] sm:text-[0.95rem]">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-2.5 sm:gap-3 text-white/80 leading-relaxed text-[0.88rem] sm:text-[0.95rem]">
            <span className="mt-[7px] sm:mt-[9px] shrink-0 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#3d8eff]" />
            <span className="flex-1 min-w-0">{children}</span>
          </li>
        ),
        hr: () => (
          <div className="my-4 sm:my-6 flex items-center gap-3" aria-hidden>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.45))" }} />
            <span className="h-2 w-2 rotate-45 border border-primary/70 bg-primary/20" />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(129,140,248,0.45), transparent)" }} />
          </div>
        ),
        table: ({ children }) => (
          <div
            className="my-5 sm:my-6 overflow-x-auto rounded-2xl"
            style={{
              background: "rgba(4,10,24,0.7)",
              border: "1px solid rgba(61,142,255,0.28)",
              boxShadow: "0 12px 32px -12px rgba(0,0,0,0.55)",
            }}
          >
            <table className="w-full min-w-[280px] border-collapse text-[12px] sm:text-sm">{children}</table>
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
          <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-primary">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-white/80 border-b border-white/[0.06] text-[12px] sm:text-sm">{children}</td>
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

  useEffect(() => {
    if (!blog) return;
    const fn = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH <= 0 ? 1 : Math.min(1, window.scrollY / docH));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [blog]);

  if (!blog) {
    return (
      <article className="pt-12 sm:pt-16 pb-24">
        <Container>
          <div
            className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-16 text-center shadow-xl"
            style={{ background: "rgba(10,18,36,0.6)", border: "1px solid rgba(61,142,255,0.2)" }}
          >
            <div className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary text-white">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Post Not Found</h1>
            <p className="mt-2 text-muted-1 text-xs sm:text-sm">This blog or note doesn't exist yet.</p>
            <ButtonLink to="/blogs" variant="soft" size="md" className="mt-6 text-primary border border-primary hover:text-white hover:border-white">
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

      <article className="pb-10 pt-4 sm:pt-8 md:pt-12">
        <Container className="max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pb-4 sm:pb-5">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Link to="/blogs" className="flex items-center gap-1 font-medium text-primary hover:text-primary/80">
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Blogs
                </Link>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/30" />
                <span className="text-white/50 truncate max-w-[120px] xs:max-w-[180px] sm:max-w-[260px] md:max-w-md">{blog.title}</span>
              </nav>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className={
                  "rounded-xl px-3 sm:px-4 py-1.5 text-xs sm:text-sm gap-1.5 sm:gap-2 border text-muted-2 border-white/10 hover:border-primary hover:text-primary bg-white/5 inline-flex items-center font-medium"
                }
              >
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </Reveal>

          {/* Blog Cover Hero */}
          <Reveal delay={0.04}>
            <header
              className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] shadow-2xl shadow-black/40"
              style={{
                border: "1px solid rgba(61,142,255,0.22)",
                boxShadow: "0 36px 80px -28px rgba(0,0,0,0.85), 0 0 48px rgba(61,142,255,0.08)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px z-20"
                style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.75), transparent)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-px z-20"
                style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.5), transparent)" }}
              />

              {/* Cover Image Section */}
              {blog.image ? (
                <div
                  className="relative cursor-zoom-in flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 via-[#060a16] to-[#04080f]"
                  onClick={() => setLightboxImg({ src: blog.image!, alt: blog.title })}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full object-cover max-h-[220px] sm:max-h-[320px] md:max-h-[420px] transition-transform duration-700 ease-out hover:scale-[1.02] select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-3 sm:top-5 right-3 sm:right-5 flex items-center gap-2 pointer-events-none opacity-0 hover-target:opacity-100 transition-opacity duration-300">
                    <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-2xl">
                      <ZoomIn className="h-3.5 w-3.5 text-primary" /> Click to zoom
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full max-h-[220px] sm:max-h-[320px] md:max-h-[420px] min-h-[180px] sm:min-h-[260px] md:min-h-[320px] flex items-center justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #0b1730, #122044 50%, #0a1020)" }}
                >
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-30"
                    style={{ background: "radial-gradient(circle, #3d8eff 0%, transparent 70%)" }}
                  />
                </div>
              )}

              {/* Divider strip between image and content */}
              <div
                className="h-[2px] w-full relative z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(61,142,255,0.55) 35%, rgba(129,140,248,0.55) 65%, transparent 100%)",
                  boxShadow: "0 0 14px rgba(61,142,255,0.4)",
                }}
              />

              {/* Content Section */}
              <div
                className="relative z-10 p-4 sm:p-7 md:p-10 lg:p-12 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,14,30,0.96) 0%, rgba(6,11,24,0.985) 100%)",
                }}
              >
                {/* Decorative corner glows */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[110px] opacity-30"
                  style={{ background: "radial-gradient(circle, #3d8eff 0%, transparent 70%)" }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-[110px] opacity-20"
                  style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
                  aria-hidden
                />

                {/* Top meta: category + tags */}
                <div className="relative flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-7">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-primary backdrop-blur px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-primary">
                    <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {storyLabel}
                  </span>
                  {blog.tags.slice(1).map((t) => (
                    <Link
                      key={t}
                      to={`/blogs?tag=${t}`}
                      className="group inline-flex items-center gap-0.5 sm:gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] text-white/65 backdrop-blur transition-all duration-200 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                    >
                      <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary/60 group-hover:text-primary/90 transition-colors" />
                      {t}
                    </Link>
                  ))}
                </div>

                {/* Title */}
                <h1 className="relative max-w-4xl text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
                  {blog.title}
                  <span
                    className="block mt-3 sm:mt-4 h-[3px] w-16 sm:w-24 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #38bdf8, #3d8eff, #818cf8)",
                      boxShadow: "0 0 12px rgba(61,142,255,0.6)",
                    }}
                    aria-hidden
                  />
                </h1>

                {/* Bottom meta row */}
                <div className="relative mt-5 sm:mt-7 md:mt-8 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">

                  {/* Meta stats chip */}
                  <div className="inline-flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-xs md:text-sm text-white/65">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                    </span>
                    <span
                      className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20"
                      aria-hidden
                    />
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                      <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {readMin} min read
                    </span>
                    <span
                      className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20"
                      aria-hidden
                    />
                    <span className="inline-flex items-center gap-1.5 text-white/55">
                      <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/70" />
                      <span className="font-medium">{words.toLocaleString()}</span>
                      <span className="text-white/40">words</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex-1 min-w-[140px] sm:flex-none sm:ml-auto flex items-center justify-end gap-2 sm:gap-2.5">
                    {blog.image && (
                      <button
                        type="button"
                        onClick={() => setLightboxImg({ src: blog.image!, alt: blog.title })}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] sm:text-xs font-semibold text-white/70 transition-all duration-200 hover:text-primary hover:border-primary"
                      >
                        <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Expand cover</span>
                        <span className="sm:hidden">Cover</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </header>
          </Reveal>

          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 w-full min-w-0 max-w-none">
            {blog.summary && (
              <Reveal delay={0.05}>
                <div
                  className="mb-6 sm:mb-7 md:mb-8 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(61,142,255,0.12) 0%, rgba(37,99,235,0.04) 100%)",
                    border: "1px solid rgba(61,142,255,0.28)",
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.7), transparent)" }}
                  />
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-primary border border-primary">
                      <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary">In a nutshell</span>
                      <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-white/90">{blog.summary}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            <div
              className="blog-article relative z-[1] rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] p-3.5 sm:p-5 md:p-7 lg:p-10 xl:p-12"
              style={{
                background: "linear-gradient(180deg, rgba(10,18,36,0.92) 0%, rgba(6,12,26,0.92) 100%)",
                border: "1px solid rgba(61,142,255,0.2)",
                boxShadow: "0 20px 52px -18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <BlogContent
                content={blog.content}
                onImageClick={(src, alt) => setLightboxImg({ src, alt })}
              />
            </div>

            <Reveal delay={0.08}>
              <div
                className="mt-8 sm:mt-10 md:mt-12 overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 relative"
                style={{
                  background: "linear-gradient(135deg, rgba(61,142,255,0.12), rgba(6,11,24,0.9))",
                  border: "1px solid rgba(61,142,255,0.25)",
                }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
                  <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                    <div className="hidden sm:flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-primary border border-primary">
                      <Sparkles className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Thanks for reading</h2>
                      <p className="text-xs sm:text-sm text-white/60 mt-0.5">A record of how I figured things out — more notes soon.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center">
                    <ButtonLink to="/blogs" variant="shine" size="md" className="group justify-center flex-1 sm:flex-none">
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      All Posts
                    </ButtonLink>
                    <button
                      type="button"
                      onClick={() => setShareOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-primary hover:border-primary bg-white/5 flex-1 sm:flex-none"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </article>
    </>
  );
}
