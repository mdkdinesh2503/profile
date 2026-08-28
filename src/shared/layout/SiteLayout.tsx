import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SiteHeader } from "@/shared/layout/SiteHeader";
import { SiteFooter } from "@/shared/layout/SiteFooter";
import { ScrollToTop } from "@/shared/layout/ScrollToTop";

/** Hero-style background (grid + orbs + gradient line) – shown on all pages. */
function GlobalPageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 hero-grid-bg opacity-[0.28]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full bg-sky-400/[0.14] blur-3xl" />
        <div className="absolute right-1/4 -top-10 h-80 w-80 rounded-full bg-primary/[0.1] blur-3xl" />
        <div className="absolute -left-24 top-[42%] h-[380px] w-[380px] rounded-full bg-indigo-500/[0.1] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-sky-400/[0.06] blur-3xl" />
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