import { Mail, Phone, Github, Linkedin, ListChecks } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
import { Reveal } from "@/shared/motion/Reveal";
import { profile } from "@/data/profile";
import { contactData } from "@/data/contact";
import { headings } from "@/data/headings";
import { cx } from "@/shared/ui/cx";

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(contactData.emailSubject)}`;
const tel = `tel:${profile.phone.replace(/\s+/g, "")}`;

const iconProps = { size: 20, className: "shrink-0", "aria-hidden": true } as const;

export function ContactPage() {
  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={headings.contact.eyebrow}
            title={headings.contact.title}
            description={headings.contact.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Primary contact card – email & phone */}
          <Reveal delay={0.05}>
            <Card className="overflow-hidden p-0">
              <div className="border-b border-line bg-gradient-to-br from-primary/5 to-transparent px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Mail {...iconProps} className={cx(iconProps.className, "text-primary")} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{contactData.reachMe.title}</h3>
                    <p className="text-sm text-muted-1">
                      {contactData.reachMe.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Mail {...iconProps} className={cx(iconProps.className, "text-muted-2")} />
                    <span className="text-sm text-muted-1">{profile.email}</span>
                  </div>
                  <a
                    href={mailto}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-lg border-l-4 border-r-4 border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary w-full sm:w-auto shrink-0",
                      "hover:bg-primary hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                    )}
                  >
                    <Mail size={18} aria-hidden />
                    Email me
                  </a>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Phone {...iconProps} className={cx(iconProps.className, "text-muted-2")} />
                    <span className="text-sm text-muted-1">{profile.phone}</span>
                  </div>
                  <a
                    href={tel}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-lg border-l-4 border-r-4 border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary w-full sm:w-auto shrink-0",
                      "hover:bg-primary hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                    )}
                  >
                    <Phone size={18} aria-hidden />
                    Call
                  </a>
                </div>
                <div className="pt-4 border-t border-line">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-2">
                    {contactData.connect.label}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm",
                        "bg-[#24292f] hover:bg-[#2f363d] dark:bg-[#21262d] dark:hover:bg-[#30363d]",
                        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24292f] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                      )}
                    >
                      <Github {...iconProps} /> GitHub
                    </a>
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm",
                        "bg-[#0A66C2] hover:bg-[#004182]",
                        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                      )}
                    >
                      <Linkedin {...iconProps} /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* What helps card */}
          <Reveal delay={0.1}>
            <Card className="flex flex-col p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <ListChecks {...iconProps} className={cx(iconProps.className, "text-primary")} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink">{contactData.whatHelps.title}</h3>
                  <p className="text-sm text-muted-1">
                    {contactData.whatHelps.description}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {contactData.whatHelps.items.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}