import { useState, useCallback } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, ListChecks, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { profile } from "@/data/profile";
import { contactData } from "@/data/contact";
import { headings } from "@/data/headings";
import { cx } from "@/shared/ui/cx";
import { motion, AnimatePresence } from "framer-motion";

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(contactData.emailSubject)}`;
const tel = `tel:${profile.phone.replace(/\s+/g, "")}`;

const iconProps = { size: 20, className: "shrink-0", "aria-hidden": true } as const;

const socialLinks = [
  { href: profile.links.github, icon: Github, label: "GitHub", color: "bg-[#24292f] hover:bg-[#2f363d] dark:bg-[#21262d] dark:hover:bg-[#30363d] ring-[#24292f]" },
  { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn", color: "bg-[#0A66C2] hover:bg-[#004182] ring-[#0A66C2]" },
  ...(profile.links.instagram ? [{ href: profile.links.instagram, icon: Instagram, label: "Instagram", color: "bg-[#E4405F] hover:bg-[#C13584] ring-[#E4405F]" as const }] : []),
];

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = mailto;
    }
  }, []);

  return (
    <section className="relative pt-12 md:pt-16 overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -left-24 bottom-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-full max-w-2xl -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={headings.contact.eyebrow}
            title={headings.contact.title}
            description={headings.contact.description}
          />
        </Reveal>

        {/* Hero CTA strip */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface/80 px-5 py-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-1">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              Best for projects & collaboration
            </span>
            <span className="hidden sm:inline h-4 w-px bg-line" aria-hidden />
            <span className="text-xs text-muted-2">
              Usually replies within 24h
            </span>
          </div>
        </Reveal>

        {/* Primary contact block – email as star */}
        <Reveal delay={0.08}>
          <div className="mt-6 rounded-2xl border border-line bg-surface p-0 shadow-sm transition-all duration-300 hover:shadow-lift-1 hover:border-primary/25 overflow-hidden">
            <div className="relative border-b border-line bg-gradient-to-br from-primary/8 via-primary/5 to-transparent px-6 py-6 sm:px-8 sm:py-7">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent" aria-hidden />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-[0_0_0_1px_rgba(37,99,235,0.15)]">
                    <Mail size={26} className="shrink-0" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{contactData.reachMe.title}</h3>
                    <p className="text-sm text-muted-1 mt-0.5">{contactData.reachMe.description}</p>
                    <p className="mt-2 font-mono text-sm text-ink break-all">{profile.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink",
                      "hover:border-primary hover:bg-primary hover:text-white transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-2"
                        >
                          <Check size={18} aria-hidden />
                          Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-2"
                        >
                          <Copy size={18} aria-hidden />
                          Copy email
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                  <a
                    href={mailto}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm",
                      "hover:bg-[var(--color-primary-hover)] transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                    )}
                  >
                    Email me
                    <ArrowRight size={16} aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone + social row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 sm:px-8">
              <a
                href={tel}
                className={cx(
                  "inline-flex items-center gap-3 rounded-xl border border-line bg-ink/[0.03] px-4 py-3 text-sm font-medium text-ink",
                  "hover:bg-ink/[0.06] hover:border-primary/20 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                )}
              >
                <Phone {...iconProps} className="text-muted-2" />
                {profile.phone}
              </a>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-2 mr-1">
                  {contactData.connect.label}
                </span>
                {socialLinks.map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white transition-transform hover:scale-105",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                      color,
                    )}
                    aria-label={label}
                  >
                    <Icon size={20} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* What helps – compact checklist */}
        <Reveal delay={0.12}>
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-lift-1">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <ListChecks {...iconProps} className={cx(iconProps.className, "text-primary")} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink">{contactData.whatHelps.title}</h3>
                <p className="text-sm text-muted-1 mt-0.5">{contactData.whatHelps.description}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {contactData.whatHelps.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary mt-0.5"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
