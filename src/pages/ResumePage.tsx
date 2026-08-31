import { useState, useRef, useEffect } from "react";
import { Container, SectionHeading, buttonStyles, cx, ShareModal } from "@/shared/ui";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";
import { trackEvent } from "@/lib/analytics";
import {
  Download,
  ExternalLink,
  FileText,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Share2,
  Check,
  CheckCircle2,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Animated background ────────────────────────────────────────── */
function ResumeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Primary orb */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(61,142,255,0.12) 0%, transparent 65%)",
          animation: "orb-float 10s ease-in-out infinite",
        }}
      />
      {/* Secondary orb */}
      <div
        className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(129,140,248,0.08) 0%, transparent 65%)",
          animation: "orb-float 14s ease-in-out infinite 3s",
        }}
      />
      {/* Document grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,142,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,142,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ── Floating particles ─────────────────────────────────────────── */
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 6,
    dur: 5 + Math.random() * 5,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `particle-rise ${p.dur}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── PDF Viewer toolbar ─────────────────────────────────────────── */
function ViewerToolbar({
  isFullscreen,
  onToggleFullscreen,
  onReload,
}: {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onReload: () => void;
}) {
  const btnBase =
    "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 text-muted-2 hover:text-white hover:bg-white/8";

  return (
    <div
      className="flex items-center gap-1 px-3 py-2 sm:px-5 border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Traffic lights */}
      <div className="hidden sm:flex gap-1.5 mr-3" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-red-400/80 hover:bg-red-400 cursor-default transition-colors" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80 hover:bg-amber-400 cursor-default transition-colors" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80 hover:bg-emerald-400 cursor-default transition-colors" />
      </div>

      {/* File name */}
      <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5">
        <FileText className="h-3.5 w-3.5 shrink-0 text-primary/70" />
        <span className="truncate text-xs font-medium text-muted-1">
          {profile.resume.pdfTitle}.pdf
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-0.5 ml-2">
        <div className="mx-1.5 h-4 w-px bg-white/10" aria-hidden />
        <button type="button" onClick={onReload} className={btnBase} title="Reload">
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <div className="mx-1.5 h-4 w-px bg-white/10" aria-hidden />
        <button type="button" onClick={onToggleFullscreen} className={btnBase} title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
          {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

/* ── Download toast ─────────────────────────────────────────────── */
function DownloadToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl"
          style={{
            background: "rgba(2,4,10,0.92)",
            border: "1px solid rgba(61,142,255,0.3)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(61,142,255,0.2), 0 0 0 1px rgba(61,142,255,0.1)",
          }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "rgba(61,142,255,0.15)", border: "1px solid rgba(61,142,255,0.25)" }}
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Download started</p>
            <p className="text-xs text-muted-2">{profile.resume.pdfTitle}.pdf</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ResumePage() {
  const years = profile.hero.yearsExperience;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [iframeKey, setIframeKey] = useState(0);
  const [downloadToast, setDownloadToast] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
    trackEvent("resume_click", { destination: profile.resume.pdfSrc });
  };

  const handleReload = () => setIframeKey((k) => k + 1);

  // Fullscreen logic using the Fullscreen API
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => { });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => { });
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <>
      <PageMeta
        title={headings.resume.eyebrow}
        description={headings.resume.description}
        path="/resume"
      />

      <style>{`
        @keyframes orb-float {
          0%,100% { transform: translateX(-50%) translateY(0) scale(1); }
          50% { transform: translateX(-50%) translateY(-24px) scale(1.04); }
        }
        @keyframes particle-rise {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-18px) scale(1.3); opacity: 0.7; }
        }
        @keyframes shimmer-title {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(61,142,255,0); }
          50% { box-shadow: 0 0 0 6px rgba(61,142,255,0.12); }
        }
        .badge-pulse { animation: badge-pulse 2.5s ease-in-out infinite; }
        .viewer-fullscreen {
          background: #02040a;
          border-radius: 0 !important;
        }
      `}</style>

      <ResumeBackground />
      <FloatingParticles />
      <DownloadToast visible={downloadToast} />

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="pt-12 pb-8 md:pt-16">
        <Container>
          {/* Eyebrow + title */}
          <SectionHeading
            eyebrow={headings.resume.eyebrow}
            title={headings.resume.title}
            description={headings.resume.description}
            icon={FileText}
            as="h1"
          />

          {/* ── Availability badge ── */}
          <Reveal delay={0.12}>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 lg:px-4 lg:py-2.5 badge-pulse"
              style={{
                background: "rgba(61,142,255,0.06)",
                border: "1px solid rgba(61,142,255,0.2)",
              }}
            >
              <span className="realtime-live-dot h-1.5 w-1.5 shrink-0" />
              <span className="text-xs lg:text-sm text-muted-1">
                <span className="font-semibold text-white">{profile.name}</span>
                {" · "}
                <span className="text-primary">{profile.role}</span>
                {" · "}
                {profile.hero.yearsExperience} yrs
                {" · "}
                <span className="text-success">{profile.location}</span>
              </span>
            </div>
          </Reveal>

          {/* ── CTA buttons ── */}
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Primary: Download */}
              <a
                href={profile.resume.pdfSrc}
                download
                onClick={handleDownload}
                className={cx(
                  buttonStyles.base,
                  buttonStyles.sizes.md,
                  "relative overflow-hidden group justify-center",
                  "text-white font-semibold shadow-lg btn-shine-wrap w-full sm:w-auto"
                )}
                style={{
                  background: "linear-gradient(135deg, #3d8eff, #6366f1)",
                }}
              >
                <Download className="h-4 w-4 shrink-0" />
                Download PDF
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                  }}
                  aria-hidden
                />
              </a>

              {/* Secondary: Open in tab */}
              <a
                href={profile.resume.pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  buttonStyles.base,
                  buttonStyles.sizes.md,
                  "border border-white/10 bg-white/5 text-muted-1 hover:text-primary hover:border-primary transition-all duration-200 justify-center w-full sm:w-auto"
                )}
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                Open in new tab
              </a>

              {/* Share */}
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className={cx(
                  buttonStyles.base,
                  buttonStyles.sizes.md,
                  "border border-white/10 bg-white/5 text-muted-1 hover:bg-white/8 hover:text-primary hover:border-primary/40 transition-all duration-200 justify-center w-full sm:w-auto"
                )}
              >
                <Share2 className="h-4 w-4" /> Share Resume
              </button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Share Modal (WhatsApp, LinkedIn, Telegram, X, Email, Copy) ── */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`${profile.name} – ${profile.role} Resume`}
        summary={`Check out ${profile.name}'s professional resume (${profile.role} with ${years}+ years experience in backend architecture and distributed systems).`}
        url={
          typeof window !== "undefined"
            ? new URL(profile.resume.pdfSrc, window.location.origin).href
            : profile.resume.pdfSrc
        }
      />

      {/* ════════════════════════════════════════════════════════════
          PDF VIEWER SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="pb-8">
        <Container>
          <Reveal delay={0.14}>
            {/* Outer glow wrapper */}
            <div
              className="relative"
              style={{
                filter: "drop-shadow(0 0 60px rgba(61,142,255,0.12))",
              }}
            >
              {/* Corner accent lights */}
              <div
                className="absolute -top-px left-12 right-12 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(61,142,255,0.6), rgba(129,140,248,0.5), transparent)",
                }}
                aria-hidden
              />
              <div
                className="absolute -bottom-px left-12 right-12 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(61,142,255,0.3), transparent)",
                }}
                aria-hidden
              />

              {/* Viewer container */}
              <div
                ref={containerRef}
                className="overflow-hidden rounded-3xl"
                style={{
                  background: "rgba(6,10,20,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Toolbar */}
                <ViewerToolbar
                  isFullscreen={isFullscreen}
                  onToggleFullscreen={toggleFullscreen}
                  onReload={handleReload}
                />

                {/* Document area */}
                <div
                  className="relative p-3"
                  style={{ background: "rgba(0,0,0,0.25)" }}
                >

                  {/* iFrame wrapper */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Side glow lines */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-px"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, rgba(61,142,255,0.4) 30%, rgba(61,142,255,0.4) 70%, transparent)",
                      }}
                      aria-hidden
                    />
                    <div
                      className="absolute right-0 top-0 bottom-0 w-px"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, rgba(129,140,248,0.3) 30%, rgba(129,140,248,0.3) 70%, transparent)",
                      }}
                      aria-hidden
                    />

                    <iframe
                      key={iframeKey}
                      ref={iframeRef}
                      title={profile.resume.pdfTitle}
                      src={profile.resume.pdfSrc}
                      className="block h-full w-full"
                      style={{
                        minHeight: "72vh",
                        height: "74vh",
                        maxHeight: "820px",
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "top center",
                        transition: "transform 0.25s ease",
                        ...(zoom !== 100
                          ? {
                            height: `${74 * (100 / zoom)}vh`,
                            maxHeight: `${820 * (100 / zoom)}px`,
                          }
                          : {}),
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
