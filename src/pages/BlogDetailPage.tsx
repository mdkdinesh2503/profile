import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, ButtonLink, buttonStyles, cx, ShareModal } from "@/shared/ui";
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

/* ── Ambient Background with Blue Glow & Technical Grid ── */
function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Top primary glow */}
      <div
        className="absolute left-1/2 top-0 h-[350px] w-[500px] sm:h-[650px] sm:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[140px] opacity-30 sm:opacity-35"
        style={{ background: "radial-gradient(circle, #3d8eff 0%, #2563eb 40%, transparent 70%)" }}
      />
      {/* Right ambient glow */}
      <div
        className="absolute top-1/3 right-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] translate-x-1/3 rounded-full blur-[90px] sm:blur-[130px] opacity-15 sm:opacity-20"
        style={{ background: "radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 70%)" }}
      />
      {/* Bottom ambient glow */}
      <div
        className="absolute bottom-0 left-1/4 h-[300px] w-[350px] sm:h-[500px] sm:w-[600px] rounded-full blur-[100px] sm:blur-[140px] opacity-10 sm:opacity-15"
        style={{ background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)" }}
      />
      {/* Subtle grid pattern */}
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

/* ── Top Reading Progress Bar ── */
function ReadingProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-white/5" aria-hidden>
      <div
        className="h-full relative overflow-visible transition-all duration-200"
        style={{ width: `${progress * 100}%` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, #38bdf8, #3d8eff, #60a5fa)" }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-20 blur-md bg-primary opacity-90"
        />
      </div>
    </div>
  );
}

/* ── Progress Ring ── */
function ProgressRing({ progress }: { progress: number }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
      <svg className="-rotate-90" viewBox="0 0 36 36" fill="none" width={36} height={36}>
        <circle cx="18" cy="18" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />
        <circle
          cx="18"
          cy="18"
          r={r}
          stroke="#3d8eff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.25s ease", filter: "drop-shadow(0 0 4px #3d8eff)" }}
        />
      </svg>
      <span className="absolute text-[8px] font-bold text-primary">
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}

/* ── Responsive Floating Toolbar ── */
function FloatingToolbar({
  progress,
  onShare,
}: {
  progress: number;
  onShare: () => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 250);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const btnStyle = {
    background: "rgba(8,14,30,0.85)",
    border: "1px solid rgba(61,142,255,0.22)",
    backdropFilter: "blur(14px)",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-4 z-40 flex flex-row items-center gap-2 rounded-full p-1.5 shadow-2xl sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:flex-col sm:gap-2.5 sm:p-0 sm:rounded-none sm:shadow-none"
          style={{
            background: "rgba(6,10,24,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(61,142,255,0.2)",
          }}
        >
          <div className="rounded-full p-0.5 sm:p-1 shadow-lg shadow-black/40" style={btnStyle}>
            <ProgressRing progress={progress} />
          </div>
          <button
            type="button"
            onClick={onShare}
            aria-label="Share post"
            title="Share to WhatsApp, LinkedIn, etc."
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-black/40 text-white/80 hover:text-primary"
            style={btnStyle}
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Scroll to top"
            title="Back to top"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-white/80 hover:text-white transition-all hover:scale-105 shadow-lg shadow-black/40"
            style={btnStyle}
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Lightbox Image Modal (Mobile Optimized) ── */
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
          className="relative max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-primary/30 bg-[#060a16] shadow-2xl shadow-primary/20 flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white/70">
            <span className="flex items-center gap-1.5 font-medium truncate max-w-[200px] sm:max-w-md">
              <Maximize2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{alt || "Full Resolution View"}</span>
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 text-white/70 hover:bg-primary/20 hover:text-primary transition-colors text-[11px] sm:text-xs"
              >
                <Download className="h-3 w-3" />
                <span className="hidden sm:inline">Open Original</span>
                <span className="sm:hidden">Original</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Full Image */}
          <div className="max-h-[82vh] overflow-auto p-2 sm:p-4 flex items-center justify-center">
            <img
              src={src}
              alt={alt || "Post visual"}
              className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-inner select-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Responsive Code Block with Copy ── */
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

  return (
    <div
      className="group relative my-5 sm:my-6 rounded-2xl overflow-hidden"
      style={{
        background: "#040814",
        border: "1px solid rgba(61,142,255,0.22)",
        boxShadow: "0 12px 36px -8px rgba(0,0,0,0.6), 0 0 20px rgba(61,142,255,0.06)",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-white/8 bg-white/5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-2">
          {lang ? (
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
              {lang}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-white/40">
              <Terminal className="h-3 w-3 text-primary/70" /> Code / Diagram
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium transition-all duration-150 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 bg-white/10 text-white/80 hover:bg-primary/20 hover:text-primary"
          >
            {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre
        ref={ref}
        className="overflow-x-auto p-3.5 sm:p-5 text-xs sm:text-sm leading-relaxed text-ink font-mono"
        style={{ margin: 0 }}
      >
        {children}
      </pre>
    </div>
  );
}

/* ── Pull-quote Blockquote ── */
function PullQuote({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="my-6 sm:my-8 relative pl-4 sm:pl-6 pr-4 sm:pr-5 py-4 sm:py-5 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(61,142,255,0.08) 0%, rgba(37,99,235,0.03) 100%)",
        border: "1px solid rgba(61,142,255,0.25)",
        borderLeft: "4px solid #3d8eff",
      }}
    >
      <Quote className="absolute -top-1 left-2 h-6 w-6 sm:h-8 sm:w-8 rotate-180 text-primary opacity-20" aria-hidden />
      <div className="relative text-sm sm:text-base leading-relaxed italic text-white/90 font-medium">
        {children}
      </div>
      <Quote className="absolute -bottom-1 right-2 h-6 w-6 sm:h-8 sm:w-8 text-primary opacity-20" aria-hidden />
    </div>
  );
}

/* ── Markdown Content Renderer ── */
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
              className="font-medium text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors break-words"
            />
          );
        },
        img: ({ src, alt }) => {
          if (!src) return null;
          return (
            <div className="my-6 sm:my-8 overflow-hidden rounded-2xl border border-primary/25 bg-[#060a16] shadow-xl group relative">
              <div className="relative cursor-zoom-in" onClick={() => onImageClick(src, alt)}>
                <img
                  src={src}
                  alt={alt || "Illustration"}
                  className="w-full object-contain max-h-[380px] sm:max-h-[520px] transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm border border-white/15 shadow-lg">
                    <ZoomIn className="h-3.5 w-3.5 text-primary" /> Click to expand
                  </span>
                </div>
              </div>
              {alt && (
                <div className="border-t border-white/8 bg-white/3 px-3 sm:px-4 py-2 text-center text-xs text-muted-1">
                  {alt}
                </div>
              )}
            </div>
          );
        },
        h1: ({ children, ...props }) => (
          <h1
            {...props}
            className="mt-8 sm:mt-12 mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-white"
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            {...props}
            className="group relative mt-8 sm:mt-12 mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold text-white pb-2 border-b border-primary/15"
          >
            <span
              className="flex-shrink-0 h-5 sm:h-6 w-1 sm:w-1.5 rounded-full bg-primary"
              aria-hidden
            />
            <span>{children}</span>
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            {...props}
            className="group mt-6 sm:mt-8 mb-2.5 sm:mb-3 flex items-center gap-2 text-base sm:text-lg font-bold text-white/95"
          >
            <span className="text-xs font-mono text-primary/70">###</span>
            {children}
          </h3>
        ),
        blockquote: ({ children }) => <PullQuote>{children}</PullQuote>,
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children, ...props }) => {
          if (!className)
            return (
              <code
                className="rounded-md bg-primary/12 border border-primary/25 px-1.5 py-0.5 text-[0.85em] font-mono font-medium text-primary break-words"
                {...props}
              >
                {children}
              </code>
            );
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        p: ({ children }) => (
          <p className="my-3 sm:my-4 leading-[1.8] sm:leading-[1.85] text-white/80 text-[0.95rem] sm:text-[1.02rem]">
            {children}
          </p>
        ),
        ul: ({ children }) => <ul className="my-3 sm:my-4 space-y-2 pl-1 sm:pl-2">{children}</ul>,
        ol: ({ children }) => (
          <ol className="my-3 sm:my-4 space-y-2 pl-5 sm:pl-6 list-decimal text-white/80 text-[0.95rem] sm:text-[1.02rem]">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-2.5 sm:gap-3 text-white/80 leading-relaxed text-[0.92rem] sm:text-[0.98rem]">
            <span className="mt-[8px] sm:mt-[9px] flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            <span className="flex-1 min-w-0">{children}</span>
          </li>
        ),
        hr: () => (
          <div className="my-8 sm:my-10 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
            </div>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        ),
        table: ({ children }) => (
          <div className="my-5 sm:my-6 overflow-x-auto rounded-xl border border-primary/25 bg-black/40">
            <table className="w-full border-collapse text-xs sm:text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-primary/15 border-b border-primary/25">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-white/75 border-b border-white/5">{children}</td>
        ),
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-primary/90">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
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
            style={{
              background: "rgba(10,18,36,0.6)",
              border: "1px solid rgba(61,142,255,0.2)",
            }}
          >
            <div
              className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30"
            >
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Post Not Found</h1>
            <p className="mt-2 text-muted-1 text-xs sm:text-sm">
              This blog or note doesn't exist yet. Explore other engineering posts.
            </p>
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

  return (
    <>
      <PageMeta
        title={blog.title}
        description={blog.summary || `${blog.title} – by Dinesh`}
        path={`/blogs/${blog.slug}`}
        ogType="article"
      />

      {/* Ambient Blue Glow & Grid Background */}
      <AmbientBg />

      {/* Top Reading Progress Bar */}
      <ReadingProgressBar progress={scrollProgress} />

      {/* Floating Side Toolbar (Bottom sheet style on mobile, vertical on desktop) */}
      <FloatingToolbar progress={scrollProgress} onShare={() => setShareOpen(true)} />

      {/* Share Modal for WhatsApp, LinkedIn, Telegram, X, Email & Copy */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={blog.title}
        summary={blog.summary}
      />

      {/* Image Lightbox Modal */}
      {lightboxImg && (
        <ImageLightbox
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          onClose={() => setLightboxImg(null)}
        />
      )}

      {/* ══ ARTICLE (RESPONSIVE SINGLE-COLUMN LAYOUT) ═════════ */}
      <article className="pb-24 pt-4 sm:pt-8 md:pt-12">
        <Container className="max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb + Share Button */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/8">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Link
                  to="/blogs"
                  className="flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Blogs
                </Link>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/30" aria-hidden />
                <span className="text-white/50 truncate max-w-[140px] xs:max-w-[200px] sm:max-w-md font-medium">
                  {blog.title}
                </span>
              </nav>

              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className={cx(
                  buttonStyles.base,
                  "rounded-xl px-3 sm:px-4 py-1.5 text-xs sm:text-sm gap-1.5 sm:gap-2 transition-all duration-200 border bg-white/5 text-white/80 border-white/10 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>
            </div>
          </Reveal>

          {/* Tags */}
          <Reveal delay={0.03}>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" /> Technical Story
              </span>
              {blog.tags.map((t) => (
                <Link
                  key={t}
                  to={`/blogs?tag=${t}`}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium text-white/70 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Tag className="h-3 w-3 text-primary/70" />
                  {t}
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Headline Title */}
          <Reveal delay={0.05}>
            <h1 className="mt-4 sm:mt-6 text-balance text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-tight sm:leading-[1.15]">
              {blog.title}
            </h1>
          </Reveal>

          {/* Metadata Row */}
          <Reveal delay={0.07}>
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <time dateTime={blog.date}>{formatDate(blog.date)}</time>
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5 text-primary font-medium">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {readMin} min read
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/70" />
                {words.toLocaleString()} words
              </span>
            </div>
          </Reveal>

          {/* Featured Visual Image (Responsive Container) */}
          {blog.image && (
            <Reveal delay={0.09}>
              <div className="mt-6 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/25 bg-[#060a16] shadow-2xl shadow-primary/10 group relative">
                <div
                  className="relative cursor-zoom-in flex items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-primary/5 to-transparent"
                  onClick={() => setLightboxImg({ src: blog.image!, alt: blog.title })}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="max-h-[340px] sm:max-h-[540px] w-full object-contain rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-[1.008]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/80 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md border border-white/20 shadow-xl">
                      <ZoomIn className="h-3.5 w-3.5 text-primary" /> Click to zoom
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/8 bg-white/[0.02] px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="h-3.5 w-3.5 text-primary" /> Visual Post / Diagram
                  </span>
                  <span>Tap to expand</span>
                </div>
              </div>
            </Reveal>
          )}

          {/* ══ CONTENT BODY ═══════════════════════════════════ */}
          <div className="mt-6 sm:mt-10 min-w-0">
            {/* Executive Summary / TL;DR Callout */}
            {blog.summary && (
              <Reveal delay={0.04}>
                <div
                  className="mb-6 sm:mb-8 rounded-2xl p-4 sm:p-6 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(61,142,255,0.1) 0%, rgba(37,99,235,0.04) 100%)",
                    border: "1px solid rgba(61,142,255,0.25)",
                    borderLeft: "4px solid #3d8eff",
                  }}
                >
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="mt-0.5 flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                      <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary">
                        In a Nutshell
                      </span>
                      <p className="mt-1 text-xs sm:text-sm md:text-base leading-relaxed text-white/90">
                        {blog.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Article Content */}
            <Reveal delay={0.06}>
              <div
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl shadow-black/40 overflow-hidden"
                style={{
                  background: "rgba(10,18,36,0.6)",
                  border: "1px solid rgba(61,142,255,0.18)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <BlogContent
                  content={blog.content}
                  onImageClick={(src, alt) => setLightboxImg({ src, alt })}
                />
              </div>
            </Reveal>

            {/* Bottom Post Navigation & Engagement CTA */}
            <Reveal delay={0.08}>
              <div
                className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(61,142,255,0.12) 0%, rgba(37,99,235,0.06) 50%, rgba(56,189,248,0.04) 100%)",
                  border: "1px solid rgba(61,142,255,0.25)",
                }}
              >
                <div className="mx-auto mb-3.5 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/35 shadow-lg shadow-primary/20">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Thanks for reading!</h2>
                <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  Found this insightful? Explore more engineering reflections, deep-dives, and system designs.
                </p>
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5">
                  <ButtonLink to="/blogs" variant="shine" size="lg" className="group justify-center">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    All Posts
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={() => setShareOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-primary/15 hover:text-primary hover:border-primary/30"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Post
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </article>
    </>
  );
}
