import { Link } from "react-router-dom";
import { Github, Linkedin, ArrowUpRight, Mail, Sparkles, Heart, Terminal, Code2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { profile } from "@/data/profile";
import { cx } from "@/shared/ui/cx";
import { trackEvent } from "@/lib/analytics";

const socialLinks = [
  {
    href: profile.links.github,
    label: "GitHub",
    icon: Github,
    hoverBg: "hover:bg-white hover:border-white/20 hover:text-black",
    event: "github_click",
  },
  {
    href: profile.links.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    hoverBg: "hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40 hover:text-[#38bdf8]",
    event: "linkedin_click",
  },
].filter((link) => link.href);

const navLinks = [
  { to: "/projects", label: "Selected Work" },
  { to: "/experience", label: "Experience" },
  // { to: "/blogs", label: "Blog & Notes" },
  // { to: "/resume", label: "Resume" },
  // { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t overflow-hidden" style={{ borderColor: "rgba(255, 255, 255, 0.08)", background: "rgba(2, 6, 14, 0.75)" }}>
      {/* Decorative top multi-stop gradient beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(61,142,255,0.4) 25%, #3d8eff 50%, rgba(129,140,248,0.5) 75%, transparent 100%)",
          boxShadow: "0 0 15px rgba(61,142,255,0.5)",
        }}
      />

      {/* Ambient Large Background Watermark Text */}
      <div className="absolute bottom-[-10%] left-[-1%] right-0 text-center pointer-events-none select-none opacity-[0.035] z-0 overflow-hidden leading-none">
        <span className="text-[12vw] font-black uppercase tracking-tighter whitespace-nowrap text-white">
          {profile.name}
        </span>
      </div>

      <Container className="relative z-10 pt-10 pb-8">
        {/* ── Call to Action Banner ── */}
        <div
          className="relative overflow-hidden rounded-3xl text-center mb-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Let's build something{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #7dd3fc 0%, #3d8eff 50%, #818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                extraordinary.
              </span>
            </h2>

            <p className="text-muted-1 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              Ready to discuss new opportunities, technical architecture, or scale robust full-stack systems together.
            </p>
          </motion.div>
        </div>

        {/* Action Buttons & Socials */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full justify-center">

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all duration-200 btn-shine-wrap group"
            style={{
              background: "linear-gradient(135deg, #3d8eff, #818cf8)",
              boxShadow: "0 2px 14px rgba(61,142,255,0.3)",
            }}
          >
            <Sparkles size={13} className="text-white animate-pulse" />
            <span>Connect</span>
            <ArrowUpRight size={13} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon, hoverBg, event }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => trackEvent(event, { section: "footer", destination: href })}
                className={cx(
                  "flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-muted-1 transition-all duration-200",
                  hoverBg
                )}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-4" style={{ borderColor: "rgba(255, 255, 255, 0.07)" }}>
          {/* Col 1: Logo & Brand */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-primary font-black"
              style={{
                background: "linear-gradient(135deg, rgba(61,142,255,0.2), rgba(129,140,248,0.15))",
                border: "1px solid rgba(61,142,255,0.3)",
              }}
            >
              {profile.hero.initials || profile.name.charAt(0)}
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight block">
                {profile.name}
              </span>
              <span className="text-xs font-semibold text-primary block">
                {profile.role}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="grid grid-cols-2 gap-5 text-xs font-medium block">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-1 hover:text-primary transition-colors flex items-center gap-1 group py-1"
              >
                <span>{item.label}</span>
                <ArrowUpRight size={11} className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-2">
            <span>Built with precision & high standards</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
          </div>
        </div>
      </Container>
    </footer>
  );
}