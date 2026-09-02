import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/shared/layout/SiteHeader";
import { SiteFooter } from "@/shared/layout/SiteFooter";
import { ScrollToTop } from "@/shared/layout/ScrollToTop";

/** Global ambient background mesh + floating glowing light fields */
function GlobalPageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      {/* Top right cyan light field */}
      <div
        className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #3d8eff 0%, transparent 70%)",
        }}
      />
      {/* Mid left indigo light field */}
      <div
        className="absolute top-[35%] -left-32 h-[500px] w-[500px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
        }}
      />
      {/* Bottom center light field */}
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse, #38bdf8 0%, transparent 70%)",
        }}
      />
      {/* Radial vignette fade around edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(2, 6, 14, 0.6) 100%)",
        }}
      />
    </div>
  );
}

export function SiteLayout() {
  const location = useLocation();
  const is404 = location.pathname === "/404";

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#02060e] text-slate-100 selection:bg-primary/30 selection:text-white overflow-x-clip">
      <GlobalPageBackground />
      {!is404 && <SiteHeader />}
      <main className="relative z-[1] flex-1 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!is404 && <SiteFooter />}
      {!is404 && <ScrollToTop />}
    </div>
  );
}