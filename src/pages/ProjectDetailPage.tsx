import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, ButtonLink, ShareModal } from "@/shared/ui";
import { PageMeta } from "@/shared/seo/PageMeta";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { Reveal } from "@/shared/motion/Reveal";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  Sparkles,
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
  Server,
  Activity,
  Cpu,
  BookmarkCheck,
  GraduationCap,
  Layers,
  FileCode2,
  ArrowRight,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Flame,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function parseStack(stack?: string) {
  if (!stack) return [];
  return stack
    .split(/[,&]/)
    .map((s) => s.trim())
    .filter(Boolean);
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

/* ── Ambient Background with Futuristic Cyber-Grid & Particle Glows ── */
function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2 top-0 h-[380px] w-[550px] sm:h-[650px] sm:w-[950px] md:h-[800px] md:w-[1200px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[110px] sm:blur-[140px] md:blur-[180px] opacity-45"
        style={{ background: "radial-gradient(circle, rgba(61,142,255,0.45) 0%, rgba(37,99,235,0.18) 40%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/4 right-0 h-[280px] w-[280px] sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px] translate-x-1/3 rounded-full blur-[90px] sm:blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(129,140,248,0.2) 50%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-10 left-1/4 h-[260px] w-[320px] sm:h-[480px] sm:w-[580px] md:h-[600px] md:w-[700px] rounded-full blur-[120px] sm:blur-[150px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.5) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(61,142,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(61,142,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

/* ── Lightbox Image Modal ── */
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
                <span className="sm:hidden">Original</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-white/70 hover:text-primary transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[82vh] overflow-auto p-2 sm:p-4 flex items-center justify-center">
            <img
              src={src}
              alt={alt || "Project visual"}
              className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-inner select-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Interactive Architecture & Code Block (Centered, Copyable, Line Count & Tag Aware) ── */
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
  const isArchitecture = !lang || lang === "text" || lang === "diagram";

  return (
    <div
      className="group relative my-6 sm:my-8 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050b18 0%, #030712 100%)",
        border: "1px solid rgba(61,142,255,0.35)",
        boxShadow: "0 16px 40px -10px rgba(0,0,0,0.7), 0 0 30px rgba(61,142,255,0.12)",
      }}
    >
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #38bdf8 30%, #3d8eff 70%, transparent)",
        }}
      />

      <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-white/35 ml-2">
            {isArchitecture ? "engine://topology-view" : `source://${lang}`}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {lang ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary shadow-sm">
              <Terminal className="h-3 w-3" />
              {lang}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary shadow-sm">
              <Cpu className="h-3 w-3" />
              System Architecture
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-medium transition-all duration-150 bg-white/10 text-white/80 hover:bg-primary/25 hover:text-primary active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div
        className="relative overflow-x-auto flex justify-center py-2"
        style={{
          backgroundImage: isArchitecture
            ? "radial-gradient(circle at 1px 1px, rgba(61,142,255,0.12) 1px, transparent 0)"
            : undefined,
          backgroundSize: isArchitecture ? "18px 18px" : undefined,
        }}
      >
        <pre
          ref={ref}
          className="inline-block text-left p-3 sm:p-5 md:p-6 text-[11px] sm:text-xs md:text-[13px] leading-relaxed text-sky-100/90 font-mono whitespace-pre select-text font-normal tracking-wide"
          style={{
            margin: 0,
            tabSize: 2,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            letterSpacing: "0.02em",
          }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

/* ── Callout / Pullquote Block ── */
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

/* ── Markdown Project Content Renderer ── */
function ProjectContent({
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
              className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors break-words"
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
                  alt={alt || "Project visual"}
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
          <h1
            {...props}
            className="mt-8 sm:mt-10 mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight"
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => {
          const id = slugifyHeading(headingText(children));
          return (
            <h2
              {...props}
              id={id}
              className="group relative mt-8 sm:mt-10 md:mt-12 mb-3 sm:mb-4 scroll-mt-28 first:mt-0 text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2.5"
            >
              <span className="h-4 w-1 rounded-full bg-gradient-to-b from-primary to-sky-400" aria-hidden />
              <span>{children}</span>
            </h2>
          );
        },
        h3: ({ children, ...props }) => (
          <h3
            {...props}
            className="mt-6 sm:mt-8 mb-2 sm:mb-3 flex items-center gap-2 text-[15px] sm:text-base md:text-lg font-bold text-white/95"
          >
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
              <code
                className="rounded-md bg-primary/12 border border-primary/25 px-1.5 py-0.5 text-[0.85em] font-mono font-medium text-primary"
                {...props}
              >
                {children}
              </code>
            );
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        p: ({ children }) => (
          <p className="my-2 sm:my-2.5 md:my-3 leading-[1.75] sm:leading-[1.85] text-white/78 text-[0.88rem] sm:text-[0.92rem] md:text-[0.98rem] lg:text-[1.05rem]">
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
          <div className="my-5 sm:my-7 flex items-center gap-3" aria-hidden>
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

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : null;
  const [shareOpen, setShareOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt?: string } | null>(null);

  const originalTechs = useMemo(() => parseStack(project?.originalStack), [project?.originalStack]);

  if (!project) {
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
              className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary text-white"
            >
              <BookmarkCheck className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Project Not Found</h1>
            <p className="mt-2 text-muted-1 text-xs sm:text-sm">
              This case study or project doesn't exist yet. Explore other works.
            </p>
            <ButtonLink to="/projects" variant="soft" size="md" className="mt-6 text-primary border border-primary hover:text-white hover:border-white">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </ButtonLink>
          </div>
        </Container>
      </article>
    );
  }

  const isLearning = project.category === "academic" || project.category === "self-learn";
  const words = project.content ? project.content.trim().split(/\s+/).length : 0;
  const categoryLabel = isLearning ? "Academic / Self-Learn" : "Production System";

  return (
    <>
      <PageMeta
        title={project.name}
        description={project.summary || `${project.name} – Case Study`}
        path={`/projects/${project.slug}`}
        ogType="article"
      />

      {/* Ambient Blue Glow & Grid Background */}
      <AmbientBg />

      {/* Share Modal for WhatsApp, LinkedIn, Telegram, X, Email & Copy */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={project.name}
        summary={project.summary || project.context}
      />

      {/* Image Lightbox Modal */}
      {lightboxImg && (
        <ImageLightbox
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          onClose={() => setLightboxImg(null)}
        />
      )}

      {/* ══ ARTICLE CONTAINER (RESPONSIVE SINGLE-COLUMN) ═══════ */}
      <article className="pb-12 pt-4 sm:pt-8 md:pt-12">
        <Container className="max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb + Links / Share */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pb-4 sm:pb-5">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Link
                  to="/projects"
                  className="flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Projects
                </Link>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/30" aria-hidden />
                <span className="text-white/50 truncate max-w-[120px] xs:max-w-[180px] sm:max-w-[260px] md:max-w-md">
                  {project.name}
                </span>
              </nav>

              <div className="flex items-center gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-primary px-3 sm:px-3.5 py-1.5 text-xs font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Demo</span>
                    <ExternalLink className="h-3 w-3 opacity-60 hidden sm:inline" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white/80 transition-all duration-200 hover:border-primary hover:text-primary hover:bg-white/10"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Source</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="rounded-xl px-3 sm:px-4 py-1.5 text-xs sm:text-sm gap-1.5 sm:gap-2 border text-muted-2 border-white/10 hover:border-primary hover:text-primary bg-white/5 inline-flex items-center font-medium cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* ── Executive Hero Card with High-Impact Badges & Specs ── */}
          <Reveal delay={0.04}>
            <header
              className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl shadow-black/60"
              style={{
                border: "1px solid rgba(61,142,255,0.3)",
                background: "linear-gradient(180deg, #09152e 0%, #050d1f 100%)",
                boxShadow: "0 28px 70px -20px rgba(0,0,0,0.85), 0 0 45px rgba(61,142,255,0.12)",
              }}
            >
              {/* Neon accent edge line */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] z-20"
                style={{ background: "linear-gradient(90deg, transparent 0%, #38bdf8 30%, #3d8eff 70%, transparent 100%)" }}
              />

              {/* Holographic grid light pattern */}
              <div
                className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-20"
                style={{
                  background: "radial-gradient(circle at 100% 0%, rgba(61,142,255,0.8), transparent 70%)",
                }}
              />

              <div className="relative z-10 p-6 sm:p-8 md:p-10">
                {/* Category & Status Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-[0_0_12px_rgba(61,142,255,0.3)]">
                      {isLearning ? (
                        <GraduationCap className="h-3.5 w-3.5" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                      )}
                      {categoryLabel}
                    </span>

                    {project.role && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3 py-1 text-[11px] font-medium text-muted-1">
                        <Briefcase className="h-3.5 w-3.5 text-primary" />
                        {project.role}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-medium text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Engineering Case Study</span>
                  </div>
                </div>

                {/* Project Headline Title */}
                <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.15]">
                  {project.name}
                </h1>

                {/* Tags row */}
                {project.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-lg border border-muted-1 px-2.5 py-0.5 text-xs font-medium text-sky-200"
                      >
                        <Tag className="h-2.5 w-2.5 text-primary/70" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* ── High-Impact 4-Metric Grid (What Recruiters Want to See) ── */}
                <div className="mt-7 sm:mt-8 pt-6 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {/* Metric 1: Timeline */}
                  <div className="p-3 sm:p-3.5 rounded-xl glass-card-panel backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                      Timeline & Era
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {project.timeline ?? project.year ?? "Active Project"}
                    </span>
                  </div>

                  {/* Metric 2: Primary Tech */}
                  <div className="p-3 sm:p-3.5 rounded-xl glass-card-panel backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                      Core Stack
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate">
                      <Server className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {originalTechs[0] || project.tags[0] || "Architecture"}
                      </span>
                    </span>
                  </div>

                  {/* Metric 3: Scope / Paradigm */}
                  <div className="p-3 sm:p-3.5 rounded-xl glass-card-panel backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                      Architecture
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate">
                      <Cpu className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {isLearning ? "Full-Stack Web App" : "Distributed Services"}
                      </span>
                    </span>
                  </div>

                  {/* Metric 4: Case Study Depth */}
                  <div className="p-3 sm:p-3.5 rounded-xl glass-card-panel backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                      Analysis Depth
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <FileCode2 className="h-3.5 w-3.5 text-primary" />
                      {words > 0 ? `${words.toLocaleString()} words` : "Comprehensive"}
                    </span>
                  </div>
                </div>

                {/* Tech note / demo notice if available */}
                {project.stackNote && (
                  <div className="mt-4 px-3.5 py-2 rounded-xl border border-primary text-xs text-sky-200/90 flex items-start gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-primary font-semibold">Tech Ecosystem: </strong>
                      {project.stackNote}
                    </span>
                  </div>
                )}
              </div>
            </header>
          </Reveal>

          {/* ══ CONTENT BODY ════════════════════ */}
          <div className="mt-8 sm:mt-10 min-w-0">
            {/* Executive Summary / Objective */}
            {project.summary && (
              <Reveal delay={0.05}>
                <div
                  className="mb-8 rounded-2xl p-5 sm:p-6 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(61,142,255,0.14) 0%, rgba(37,99,235,0.05) 100%)",
                    border: "1px solid rgba(61,142,255,0.35)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.8), transparent)" }}
                  />
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="mt-0.5 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-primary border border-primary bg-primary/10 shadow-[0_0_15px_rgba(61,142,255,0.25)]">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                        Executive Summary & Project Scope
                      </span>
                      <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-white/95">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Markdown Case Study Body */}
            <div
              className="blog-article relative z-[1] rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2rem] p-4 sm:p-6 md:p-8 lg:p-11"
              style={{
                background: "linear-gradient(180deg, rgba(10,18,36,0.92) 0%, rgba(6,12,26,0.92) 100%)",
                border: "1px solid rgba(61,142,255,0.2)",
                boxShadow: "0 20px 52px -18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <ProjectContent
                content={project.content}
                onImageClick={(src, alt) => setLightboxImg({ src, alt })}
              />
            </div>

            {/* Bottom Project Navigation & Action CTA */}
            <Reveal delay={0.08}>
              <div
                className="mt-8 sm:mt-10 overflow-hidden rounded-2xl p-5 sm:p-7 relative"
                style={{
                  background: "linear-gradient(135deg, rgba(61,142,255,0.12), rgba(6,11,24,0.95))",
                  border: "1px solid rgba(61,142,255,0.28)",
                  boxShadow: "0 16px 40px -15px rgba(0,0,0,0.7)",
                }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-3.5 text-center sm:text-left">
                    <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-primary border border-primary bg-primary/10 shadow-[0_0_15px_rgba(61,142,255,0.2)]">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                        Interested in More Case Studies?
                      </h2>
                      <p className="text-xs sm:text-sm text-white/65 mt-0.5">
                        Explore all backend architectures, distributed services, and full-stack solutions.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center">
                    <ButtonLink to="/projects" variant="shine" size="md" className="group justify-center flex-1 sm:flex-none">
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      All Projects
                    </ButtonLink>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white flex-1 sm:flex-none"
                      >
                        <Globe className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white/80 transition-all hover:border-primary hover:text-primary bg-white/5 flex-1 sm:flex-none"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setShareOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-primary hover:border-primary bg-white/5 flex-1 sm:flex-none cursor-pointer"
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
