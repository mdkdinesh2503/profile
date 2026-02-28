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
    <header className="sticky top-0 z-50 border-b border-line bg-bg backdrop-blur-md">
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
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden"
          >
            <div
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <fm.div
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 top-16 z-50 border-b border-line bg-bg shadow-lift-2 backdrop-blur-md"
            >
              <Container className="py-4">
                <div className="grid gap-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      end={item.end ?? item.to === "/"}
                      className={({ isActive }) =>
                        [
                          "rounded-xl px-3 py-2 text-sm font-medium ring-1 transition",
                          isActive
                            ? "bg-primary/12 text-primary ring-primary/30"
                            : "text-ink-light ring-transparent hover:bg-ink/[0.08] hover:text-ink",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 rounded-xl px-3 py-2 text-sm text-ink-light ring-1 ring-line transition hover:bg-ink/[0.08] hover:text-ink"
                  >
                    Email
                  </a>
                </div>
              </Container>
            </fm.div>
          </fm.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}