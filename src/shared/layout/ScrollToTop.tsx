import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 300;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight - winH;
      const progress = docH <= 0 ? 0 : Math.min(1, window.scrollY / docH);
      setScrollProgress(progress);
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const r = 20;
  const circ = 2 * Math.PI * r;

  const button = (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-2xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xl"
          style={{
            background: "rgba(6, 11, 22, 0.92)",
            border: "1px solid rgba(61, 142, 255, 0.35)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(61, 142, 255, 0.25)",
          }}
        >
          {/* Circular Progress Ring SVG */}
          <svg className="absolute -rotate-90 pointer-events-none" width={48} height={48} viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={r}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r={r}
              stroke="url(#scroll-top-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - scrollProgress)}
              fill="none"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
            <defs>
              <linearGradient id="scroll-top-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d8eff" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Up Arrow with animated bounce on hover */}
          <motion.div
            className="relative z-10 flex items-center justify-center text-primary group-hover:text-white transition-colors"
            animate={{ y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );

  return createPortal(
    <div className="fixed bottom-6 right-6 z-50 flex justify-end items-end" aria-hidden>
      {button}
    </div>,
    document.body
  );
}