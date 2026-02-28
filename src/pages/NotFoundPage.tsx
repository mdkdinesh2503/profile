import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const float = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export function NotFoundPage() {
  return (
    <section className="relative flex h-[calc(100vh-var(--header-height,250px))] md:h-[calc(100vh-var(--header-height,80px))] flex-1 flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-ink) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(32px, 8vw, 48px) clamp(32px, 8vw, 48px)",
        }}
      />

      <Container className="relative flex w-full max-w-lg flex-col items-center text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center"
        >
          {/* Big 404 with gradient and glow — scale down on small screens */}
          <motion.div
            variants={item}
            className="relative flex items-baseline justify-center gap-0.5 font-bold tracking-tighter text-ink sm:gap-1 md:gap-2"
          >
            <motion.span
              variants={float}
              animate="animate"
              className="bg-gradient-to-br from-primary via-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-5xl text-transparent drop-shadow-[0_0_24px_rgba(37,99,235,0.25)] sm:text-6xl md:text-8xl lg:text-9xl"
            >
              4
            </motion.span>
            <motion.span
              variants={float}
              animate="animate"
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-primary via-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-5xl text-transparent drop-shadow-[0_0_24px_rgba(37,99,235,0.25)] sm:text-6xl md:text-8xl lg:text-9xl"
            >
              0
            </motion.span>
            <motion.span
              variants={float}
              animate="animate"
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-primary via-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-5xl text-transparent drop-shadow-[0_0_24px_rgba(37,99,235,0.25)] sm:text-6xl md:text-8xl lg:text-9xl"
            >
              4
            </motion.span>
          </motion.div>

          {/* Terminal-style label */}
          <motion.p
            variants={item}
            className="mt-3 font-mono text-[10px] font-medium tracking-wider text-muted-2 sm:mt-4 sm:text-xs md:text-sm"
          >
            Error: Route not found
          </motion.p>

          {/* Friendly message */}
          <motion.h1
            variants={item}
            className="mt-4 max-w-md text-balance text-base font-semibold tracking-tight text-ink sm:mt-6 sm:text-lg md:text-xl lg:text-2xl"
          >
            This page doesn&apos;t exist in the codebase.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-2 max-w-sm text-pretty text-xs leading-relaxed text-muted-1 sm:mt-3 sm:text-sm"
          >
            You wandered off the map — let&apos;s get you back to the main branch.
          </motion.p>

          {/* CTA — touch-friendly on mobile */}
          <motion.div variants={item} className="mt-6 sm:mt-8 md:mt-10">
            <Link
              to="/"
              className="group inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-line bg-ink/[0.04] px-5 py-3 text-sm font-medium text-ink shadow-sm ring-1 ring-line transition-all duration-200 ease-out hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:ring-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] sm:min-h-0 sm:px-6"
            >
              <span>Back to home</span>
              <svg
                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Dev easter egg: path hint — less spacing on small screens */}
          <motion.p
            variants={item}
            className="mt-6 font-mono text-[10px] text-muted-2/80 sm:mt-8 md:mt-12"
          >
            location.pathname → 404
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}