import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { PageMeta } from "@/shared/seo/PageMeta";
import {
  Home, ArrowRight, Terminal, Wifi, WifiOff,
  Code2, Layers, FileText, Mail,
} from "lucide-react";

/* ── Nav quicklinks ───────────────────────────────────────────── */
const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/blogs", label: "Blog", icon: FileText },
  { to: "/resume", label: "Resume", icon: Code2 },
  { to: "/contact", label: "Contact", icon: Mail },
];

/* ── Glitch text hook ─────────────────────────────────────────── */
const GLITCH_CHARS = "!@#$%^&*_ABCDEFGHIJKabcdefghijklmnopqrstuvwxyz0123456789";
function useGlitch(target: string, interval = 80, runs = 12) {
  const [text, setText] = useState(target);
  const [active, setActive] = useState(false);

  const startGlitch = () => {
    if (active) return;
    setActive(true);
    let count = 0;
    const id = setInterval(() => {
      setText(
        target
          .split("")
          .map((ch, i) =>
            i < count
              ? ch
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          )
          .join("")
      );
      count++;
      if (count > target.length) {
        clearInterval(id);
        setText(target);
        setActive(false);
      }
    }, interval);
  };

  // auto-glitch on mount
  useEffect(() => {
    const t = setTimeout(startGlitch, 600);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { text, startGlitch };
}

/* ── Star field canvas ────────────────────────────────────────── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.speed * s.dir;
        if (s.a > 1 || s.a < 0) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20"
      aria-hidden
    />
  );
}

/* ── Floating debris (small shapes) ──────────────────────────── */
const DEBRIS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 10 + Math.random() * 80,
  size: 8 + Math.random() * 18,
  rotate: Math.random() * 360,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 4,
  opacity: 0.06 + Math.random() * 0.1,
}));

/* ── Scanline overlay ─────────────────────────────────────────── */
function ScanLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      }}
    />
  );
}

/* ── Mouse-parallax wrapper ───────────────────────────────────── */
function ParallaxContainer({ children, depth = 1 }: { children: React.ReactNode; depth?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * 10 * depth);
      my.set(((e.clientY - cy) / cy) * 10 * depth);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, depth]);

  return (
    <motion.div style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}

/* ── Terminal log lines ───────────────────────────────────────── */
const LOG_LINES = [
  { text: "→ Resolving route...", color: "text-white/40", delay: 0.4 },
  { text: "⚠ Route not found in registry", color: "text-amber-400/60", delay: 0.7 },
  { text: "✗ 404: Module 'this-page' not found", color: "text-red-400/70", delay: 1.0 },
  { text: "↩ Suggested: navigate to '/'", color: "text-primary/60", delay: 1.3 },
];

/* ── Connection status badge ──────────────────────────────────── */
function StatusBadge() {
  const [online, setOnline] = useState(true);
  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    setOnline((v) => !v);
    setToggled(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 cursor-pointer"
      style={
        online
          ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#34d399" }
          : { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }
      }
      title="Toggle for fun"
    >
      {online ? (
        <><Wifi className="h-3 w-3" /> ONLINE — wrong turn</>
      ) : (
        <><WifiOff className="h-3 w-3" /> OFFLINE — still lost</>
      )}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export function NotFoundPage() {
  const { text: glitchText, startGlitch } = useGlitch("PAGE NOT FOUND");
  const [termVisible, setTermVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  // Disable document scroll while on 404 page
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  // Reveal terminal log lines one by one
  useEffect(() => {
    const t = setTimeout(() => {
      setTermVisible(true);
      LOG_LINES.forEach((_, i) => {
        setTimeout(() => setVisibleLines(i + 1), 400 + i * 350);
      });
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative flex h-dvh min-h-dvh max-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-2 select-none">
      <PageMeta
        title="Page Not Found"
        description="This page doesn't exist. Back to Dinesh Kumar M's software engineering portfolio."
        path="/404"
        noindex={true}
      />

      <style>{`
        @keyframes float-404 {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes glitch-clip-1 {
          0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-4px,0); }
          25% { clip-path: inset(30% 0 50% 0); transform: translate(4px,0); }
          75% { clip-path: inset(60% 0 20% 0); transform: translate(-2px,0); }
        }
        @keyframes glitch-clip-2 {
          0%,100% { clip-path: inset(80% 0 5% 0); transform: translate(4px,0); }
          40% { clip-path: inset(10% 0 80% 0); transform: translate(-4px,0); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(2px,0); }
        }
        @keyframes debris-drift {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        @keyframes caret-blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .caret-blink { animation: caret-blink 1s step-start infinite; }

        .num-404 {
          position: relative;
          display: inline-block;
        }
        .num-404::before,
        .num-404::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .num-404::before {
          animation: glitch-clip-1 3.5s infinite linear;
          color: rgba(56,189,248,0.6);
          -webkit-text-fill-color: rgba(56,189,248,0.6);
          background: none;
        }
        .num-404::after {
          animation: glitch-clip-2 3.5s infinite linear 0.2s;
          color: rgba(129,140,248,0.5);
          -webkit-text-fill-color: rgba(129,140,248,0.5);
          background: none;
        }
      `}</style>

      {/* ── Backgrounds ── */}
      <StarField />
      <ScanLines />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(61,142,255,0.07) 0%, transparent 60%)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.06) 0%, transparent 60%)" }}
        />
      </div>

      {/* ── Floating debris ── */}
      {DEBRIS.map((d) => (
        <div
          key={d.id}
          className="pointer-events-none fixed"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animation: `debris-drift ${d.dur}s ease-in-out infinite ${d.delay}s`,
          }}
          aria-hidden
        >
          <div
            className="h-full w-full rounded-sm border border-primary/40"
            style={{ transform: `rotate(${d.rotate}deg)` }}
          />
        </div>
      ))}

      <Container className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center"
        >

          {/* ── Status badge ── */}
          <motion.div variants={fadeUp}>
            <StatusBadge />
          </motion.div>

          {/* ── Giant 404 with glitch ── */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-baseline justify-center gap-1 md:gap-2 select-none"
          >
            {["4", "0", "4"].map((digit, i) => (
              <motion.span
                key={i}
                className="num-404 font-black tracking-tighter"
                data-text={digit}
                style={{
                  fontSize: "clamp(5rem, 18vw, 10rem)",
                  lineHeight: 1,
                  backgroundImage:
                    "linear-gradient(135deg, #7dd3fc 0%, #3d8eff 40%, #818cf8 80%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(61,142,255,0.35))",
                  animation: `float-404 ${3 + i * 0.4}s ease-in-out infinite ${i * 0.2}s`,
                }}
                onMouseEnter={startGlitch}
              >
                {digit}
              </motion.span>
            ))}
          </motion.div>

          {/* ── Glitch label ── */}
          <motion.p
            variants={fadeUp}
            className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary/50 sm:text-xs"
            onMouseEnter={startGlitch}
            style={{ cursor: "default", userSelect: "none" }}
          >
            {glitchText}
            <span className="caret-blink ml-0.5 text-primary">_</span>
          </motion.p>

          {/* ── Divider line ── */}
          <motion.div
            variants={fadeUp}
            className="mt-6 h-px w-40"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.5), rgba(129,140,248,0.4), transparent)",
            }}
            aria-hidden
          />

          {/* ── Headline ── */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-md text-balance text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl"
          >
            You've drifted into{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #7dd3fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              deep space.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-sm text-sm leading-relaxed text-muted-1"
          >
            This route doesn't exist in the codebase. Let's get you back to familiar territory.
          </motion.p>

          {/* ── Terminal log ── */}
          <AnimatePresence>
            {termVisible && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 w-full max-w-sm overflow-hidden rounded-2xl text-left"
                style={{
                  background: "rgba(2,6,14,0.85)",
                  border: "1px solid rgba(61,142,255,0.18)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Chrome bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="flex items-center gap-1.5 ml-1">
                    <Terminal className="h-3 w-3 text-primary/50" />
                    <span className="font-mono text-[10px] text-muted-2">router.log</span>
                  </div>
                </div>
                {/* Log body */}
                <div className="p-4 space-y-1.5">
                  {LOG_LINES.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`font-mono text-[11px] leading-relaxed ${line.color}`}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  {visibleLines < LOG_LINES.length && (
                    <div className="font-mono text-[11px] text-white/20">
                      <span className="caret-blink">▊</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {/* Primary */}
            <ParallaxContainer depth={0.5}>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 btn-shine-wrap"
                style={{
                  background: "linear-gradient(135deg, #3d8eff, #818cf8)",
                  boxShadow: "0 4px 24px rgba(61,142,255,0.3)",
                }}
              >
                <Home className="h-4 w-4" />
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </ParallaxContainer>

            {/* Ghost explore */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium text-muted-1 transition-all duration-200 hover:text-primary"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.09)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,142,255,0.3)";
                (e.currentTarget as HTMLElement).style.background = "rgba(61,142,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              View Projects
            </Link>
          </motion.div>

          {/* ── Quick nav grid ── */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-5 gap-2 w-full max-w-xs"
          >
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col items-center gap-1.5 rounded-xl py-3 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,142,255,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(61,142,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <Icon className="h-4 w-4 text-muted-2 transition-colors group-hover:text-primary" />
                <span className="text-[9px] font-medium text-muted-2 transition-colors group-hover:text-primary">
                  {label}
                </span>
              </Link>
            ))}
          </motion.div>

          {/* ── Dev hint ── */}
          <motion.p
            variants={fadeUp}
            className="mt-8 font-mono text-[10px] text-white/20"
          >
            location.pathname → 404 ∙ error: ROUTE_NOT_FOUND
          </motion.p>

        </motion.div>
      </Container>
    </section>
  );
}