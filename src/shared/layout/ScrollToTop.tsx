import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cx } from "@/shared/ui/cx";

const SCROLL_THRESHOLD = 300;
const BUTTON_SIZE = 44;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const button = (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -3, 0],
            scale: 1,
          }}
          exit={{ opacity: 0, y: 8, scale: 0.92 }}
          transition={{
            opacity: { duration: 0.2 },
            y: {
              repeat: Infinity,
              repeatDelay: 1.2,
              duration: 1.8,
              ease: "easeInOut",
            },
            scale: { type: "spring", stiffness: 400, damping: 25 },
          }}
          whileHover={{
            scale: 1.08,
            y: 0,
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.94,
            transition: { duration: 0.1 },
          }}
          className={cx(
            "group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full outline-none",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
          )}
          style={{ minWidth: BUTTON_SIZE, minHeight: BUTTON_SIZE }}
        >
          {/* Gradient ring + soft glow (subtle pulse when visible) */}
          <span
            className="scroll-top-glow-pulse absolute inset-0 rounded-full"
            style={{
              background: "var(--gradient-primary)",
              boxShadow:
                "0 0 0 1px rgba(37, 99, 235, 0.25), 0 4px 16px -2px rgba(37, 99, 235, 0.4), 0 0 28px -6px rgba(37, 99, 235, 0.3)",
            }}
            aria-hidden
          />
          <span
            className="absolute inset-[2px] rounded-full bg-[var(--color-bg)] transition-all duration-200 group-hover:scale-95 group-hover:opacity-90"
            aria-hidden
          />
          <span className="relative flex items-center justify-center text-[var(--color-primary)]">
            <motion.span
              className="flex items-center justify-center"
              animate={{ y: 0 }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -8, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <ArrowUp size={20} strokeWidth={2.25} aria-hidden />
            </motion.span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );

  // Portal to body so the button is always viewport-fixed and never stretched by layout
  return createPortal(
    <div
      className="fixed bottom-6 right-6 z-40 flex justify-end items-end"
      style={{ padding: 0 }}
      aria-hidden
    >
      {button}
    </div>,
    document.body,
  );
}