import { Link } from "react-router-dom";
import { Github, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { profile } from "@/data/profile";
import { cx } from "@/shared/ui/cx";

const socialLinks = [
  {
    href: profile.links.github,
    label: "GitHub",
    icon: Github,
    hoverClass: "hover:bg-white/10 hover:border-white/30 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
  },
  {
    href: profile.links.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    hoverClass: "hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40 hover:text-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]",
  },
].filter((link) => link.href);

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-line/20 bg-surface/30 backdrop-blur-3xl pb-4 pt-8 md:pt-10 overflow-hidden">
      {/* Decorative top gradient beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_2px_rgba(56,189,248,0.4)]" />
      
      {/* Ambient glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/[0.02] blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-indigo-500/[0.03] blur-[80px] rounded-full pointer-events-none" />

      {/* Huge background text */}
      <div className="absolute bottom-0 left-0 text-center pointer-events-none select-none opacity-[0.03] z-0 overflow-hidden leading-none translate-y-[15%]">
        <span className="text-[12vw] font-black uppercase tracking-tighter whitespace-nowrap text-ink">
          {profile.name}
        </span>
      </div>

      <Container className="relative z-10 flex flex-col items-center">
        
        {/* Call to action section */}
        <div className="text-center mb-5">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl font-black tracking-tight text-ink mb-2"
          >
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">extraordinary.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-1 text-xs md:text-sm max-w-xl mx-auto font-medium"
          >
            {profile.role}. Specializing in robust architectures and seamless integrations.
          </motion.p>
        </div>

        {/* Action Buttons & Socials */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full justify-center">
          <Link 
            to="/contact" 
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-bold text-surface transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
          >
            <Mail size={14} />
            <span>Get in touch</span>
            <div className="absolute inset-0 rounded-full border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:opacity-0" />
          </Link>
          
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon, hoverClass }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cx(
                  "relative group flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-all duration-300",
                  hoverClass
                )}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Bottom Meta */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-t border-line/40 pt-4 backdrop-blur-sm rounded-xl p-4 bg-surface/30 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-indigo-500/20 border border-primary/20 text-primary font-black shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              {profile.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wide text-ink leading-tight">
                {profile.name}
              </span>
              <span className="text-[10px] font-medium text-muted-2">
                Software Engineer
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-5 text-xs font-bold text-muted-2 uppercase tracking-widest">
            <Link to="/projects" className="transition-colors hover:text-primary flex items-center gap-1 group">
              Projects
              <ArrowUpRight size={12} className="opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/experience" className="transition-colors hover:text-primary flex items-center gap-1 group">
              Experience
              <ArrowUpRight size={12} className="opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="text-[10px] font-bold text-muted-2 tracking-wider">
            © {year} ALL RIGHTS RESERVED
          </div>
        </div>
        
      </Container>
    </footer>
  );
}