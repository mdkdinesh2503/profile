import { AnimatePresence, motion as fm } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useTheme } from "@/contexts/ThemeContext";
import { Container } from "@/shared/ui/Container";
import { profile } from "@/data/profile";

const navigation: { to: string; label: string; end?: boolean }[] = [
  { to: "/projects", label: "Selected Work" },
  { to: "/experience", label: "Experience" },
  { to: "/blogs", label: "Blog" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

const overlayTransition = { duration: 0.28, ease: [0.32, 0.72, 0, 1] as const };
const panelSpring = { type: "spring" as const, stiffness: 380, damping: 30 };
const panelExit = { duration: 0.22, ease: [0.32, 0.72, 0, 1] as const };
const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.12 },
  },
};
const navItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/55 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_20px_-4px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:bg-transparent dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_-2px_rgba(0,0,0,0.4)]">
      <Container className="flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="group inline-flex items-center gap-0.5 rounded-xl px-2 py-1 text-sm font-medium text-ink outline-none ring-ink/10 transition hover:text-ink focus-visible:ring-2"
        >
          <div className="dot-two-layer" aria-hidden>
            <span className="dot-outer" />
            <span className="dot-core" />
          </div>
          <span className="tracking-tight">{profile.name}</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end ?? item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-xl px-3 py-2 text-sm font-medium outline-none ring-ink/10 transition focus-visible:ring-2",
                  isActive
                    ? "bg-primary/12 text-primary"
                    : "text-ink-light hover:bg-ink/[0.08] hover:text-ink",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-transparent text-ink-light transition hover:bg-ink/[0.08] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center rounded-xl bg-transparent px-3 py-2 text-sm font-medium text-ink-light ring-1 ring-line transition hover:bg-ink/[0.08] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <fm.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            className="fixed inset-0 z-[100] md:hidden"
          >
            <fm.div
              className="absolute inset-0 bg-ink/35 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
            />
            <fm.div
              initial={{ opacity: 0, y: -24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: panelSpring }}
              exit={{ opacity: 0, y: -16, scale: 0.98, transition: panelExit }}
              className="mobile-menu-glass absolute left-0 right-0 top-16 z-10"
            >
              <Container className="relative z-10 py-4">
                <fm.div
                  className="grid gap-1"
                  variants={navContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {navigation.map((item) => (
                    <fm.div key={item.to} variants={navItemVariants}>
                      <NavLink
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        end={item.end ?? item.to === "/"}
                        className={({ isActive }) =>
                          [
                            "block rounded-xl px-3 py-2 text-sm font-medium ring-1 transition",
                            isActive
                              ? "bg-primary/12 text-primary ring-primary/30"
                              : "text-ink ring-transparent hover:bg-ink/[0.08] hover:text-ink",
                          ].join(" ")
                        }
                      >
                        {item.label}
                      </NavLink>
                    </fm.div>
                  ))}
                  <fm.a
                    href={`mailto:${profile.email}`}
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 block rounded-xl px-3 py-2 text-sm text-ink ring-1 ring-line transition hover:bg-ink/[0.08] hover:text-ink"
                    variants={navItemVariants}
                  >
                    Email
                  </fm.a>
                </fm.div>
              </Container>
            </fm.div>
          </fm.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}