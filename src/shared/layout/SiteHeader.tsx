import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Container } from "@/shared/ui/Container";
import { profile } from "@/data/profile";
import {
  Layers,
  Briefcase,
  BookOpen,
  FileText,
  Mail,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
}

const navigation: NavItem[] = [
  { to: "/projects", label: "Selected Work", icon: Layers },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/blogs", label: "Blog", icon: BookOpen },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/contact", label: "Contact", icon: Mail },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(2, 6, 14, 0.78)"
          : "rgba(2, 6, 14, 0.45)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow: scrolled
          ? "0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 1px 0 0 rgba(61, 142, 255, 0.1)"
          : "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Top subtle ambient neon gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(61,142,255,0.4) 25%, rgba(129,140,248,0.5) 50%, rgba(56,189,248,0.4) 75%, transparent 100%)",
        }}
        aria-hidden
      />

      <Container className="flex h-16 items-center justify-between">
        {/* ── Brand Logo / Avatar Avatar Pill ── */}
        <NavLink
          to="/"
          className="group relative flex items-center gap-2.5 rounded-2xl p-1.5 pr-3 outline-none transition-all duration-200"
        >
          {/* Avatar / Initials Orb */}
          <div
            className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(61,142,255,0.18), rgba(129,140,248,0.15))",
              border: "1px solid rgba(61,142,255,0.3)",
              boxShadow: "0 0 14px rgba(61,142,255,0.2)",
            }}
          >
            <div className="dot-two-layer" aria-hidden>
              <span className="dot-outer" />
              <span className="dot-core" />
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className="text-sm font-extrabold tracking-tight text-white group-hover:text-primary transition-colors flex items-center gap-1.5"
            >
              {profile.name}
            </span>
            <span className="text-[10px] font-semibold text-muted-2 leading-none flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </span>
          </div>
        </NavLink>

        {/* ── Desktop Floating Pill Navigation ── */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-2xl p-1.5"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
          onMouseLeave={() => setHoveredTab(null)}
          aria-label="Primary"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end ?? item.to === "/"}
                onMouseEnter={() => setHoveredTab(item.to)}
                className={({ isActive }) =>
                  `relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 outline-none ${isActive
                    ? "text-white"
                    : "text-muted-1 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Background Pill (Framer Motion shared layout animation) */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(61,142,255,0.22), rgba(129,140,248,0.18))",
                          border: "1px solid rgba(61,142,255,0.4)",
                          boxShadow: "0 0 16px rgba(61,142,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover Glow Pill if not active */}
                    {!isActive && hoveredTab === item.to && (
                      <motion.div
                        layoutId="hover-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon
                        size={13}
                        className={
                          isActive ? "text-primary" : "text-muted-2 group-hover:text-primary transition-colors"
                        }
                      />
                      <span>{item.label}</span>
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ── Action Buttons & Mobile Toggle ── */}
        <div className="flex items-center gap-2.5">
          {/* Quick Connect Icon Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 pr-1">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-2 hover:text-black hover:bg-white hover:border hover:border-white"
            >
              <Github size={15} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-2 hover:text-white hover:bg-primary hover:border hover:border-primary"
            >
              <Linkedin size={15} />
            </a>
          </div>

          {/* Quick "Let's Talk" CTA Button */}
          <NavLink
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white transition-all duration-200 btn-shine-wrap group"
            style={{
              background: "linear-gradient(135deg, #3d8eff, #818cf8)",
              boxShadow: "0 2px 14px rgba(61,142,255,0.3)",
            }}
          >
            <Sparkles size={13} className="text-white animate-pulse" />
            <span>Connect</span>
            <ArrowUpRight size={13} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </NavLink>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 md:hidden"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* ── Mobile Menu Overlay & Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="relative z-10 m-3 overflow-hidden rounded-3xl p-5 shadow-2xl"
              style={{
                background: "rgba(6, 11, 22, 0.95)",
                border: "1px solid rgba(61, 142, 255, 0.25)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(61, 142, 255, 0.15)",
              }}
            >
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Navigation
                </span>
                <span className="text-xs text-muted-2">{profile.role}</span>
              </div>

              <div className="grid gap-1.5">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      end={item.end ?? item.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                          ? "bg-primary/15 text-white border border-primary shadow-[0_0_15px_rgba(61,142,255,0.2)]"
                          : "text-muted-1 hover:text-white hover:bg-white/15 border border-transparent"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${isActive
                              ? "bg-primary text-white"
                              : "bg-white/[0.05] text-primary"
                              }`}
                          >
                            <Icon size={16} />
                          </div>
                          <span className="flex-1">{item.label}</span>
                          <ArrowUpRight
                            size={14}
                            className={`opacity-40 transition-transform ${isActive ? "opacity-100 text-primary" : ""
                              }`}
                          />
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile Quick Action Footer */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all btn-shine-wrap"
                  style={{
                    background: "linear-gradient(135deg, #3d8eff, #818cf8)",
                    boxShadow: "0 4px 15px rgba(61,142,255,0.3)",
                  }}
                >
                  <Mail size={14} />
                  <span>Send Direct Email</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-muted-2 hover:text-black hover:bg-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary text-primary hover:text-white hover:bg-primary transition-all"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}