import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SiteHeader } from "@/shared/layout/SiteHeader";
import { SiteFooter } from "@/shared/layout/SiteFooter";
import { ScrollToTop } from "@/shared/layout/ScrollToTop";

/** Hero-style background (grid + orbs + gradient line) – shown on all pages. */
function GlobalPageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 hero-grid-bg opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-primary/[0.08] blur-3xl" />
        <div className="absolute right-1/4 -top-20 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute left-0 top-1/2 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/3 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
}

const footerTransition = {
  delay: 0.32,
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function SiteLayout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-dvh flex-col">
      <GlobalPageBackground />
      <SiteHeader />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={footerTransition}
      >
        <SiteFooter />
      </motion.div>
      <ScrollToTop />
    </div>
  );
}