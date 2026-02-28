import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { profile } from "@/data/profile";

const socialLinks = [
  {
    href: profile.links.github,
    label: "GitHub",
    icon: Github,
    classHover:
      "hover:bg-[#24292f] hover:text-white hover:border-[#24292f] dark:hover:bg-[#2f363d] dark:hover:border-[#2f363d]",
  },
  {
    href: profile.links.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    classHover: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
  },
  {
    href: profile.links.instagram,
    label: "Instagram",
    icon: Instagram,
    classHover:
      "hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]",
  },
].filter((link) => link.href) as Array<{
  href: string;
  label: string;
  icon: typeof Github;
  classHover: string;
}>;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas">
      {/* Gradient accent + glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, var(--color-primary) 50%, transparent 95%)",
          boxShadow: "0 0 16px 2px rgba(37, 99, 235, 0.25)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-primary), transparent 70%)",
        }}
      />

      <Container className="relative py-6 sm:py-5 md:py-6">
        <div className="flex flex-col gap-6 sm:gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          {/* Left: brand + tagline */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="dot-two-layer shrink-0" aria-hidden>
                <span className="dot-outer" />
                <span className="dot-core" />
              </div>
              <span className="bg-gradient-to-r from-primary via-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-base font-semibold tracking-tight text-transparent min-w-0 truncate sm:text-lg md:text-xl">
                {profile.name}
              </span>
            </div>
            <p className="pl-6 text-xs text-muted-1 sm:pl-7 sm:text-sm md:pl-8">
              {profile.role}. Building reliable systems, end to end.
            </p>
          </div>

          {/* Right: social pills + nav + meta */}
          <div className="flex flex-col gap-4 items-start sm:items-end min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon, classHover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink/[0.05] text-ink transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${classHover}`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden />
                </motion.a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-2 sm:gap-x-4 sm:gap-y-1">
              <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-y-1">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1 font-medium text-muted-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded"
                >
                  Selected work
                  <ArrowUpRight size={12} aria-hidden className="shrink-0" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 font-medium text-muted-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded"
                >
                  Get in touch
                  <ArrowUpRight size={12} aria-hidden className="shrink-0" />
                </Link>
              </nav>
              <span className="hidden sm:inline" aria-hidden>·</span>
              <span className="w-full sm:w-auto">© {year} {profile.name}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}