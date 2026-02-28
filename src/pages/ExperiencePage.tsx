import { useEffect, useMemo, useState } from "react";
import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
import { Reveal } from "@/shared/motion/Reveal";
import { experience, getDisplayDateRange, getDisplayDuration, skills } from "@/data/experience";
import { headings } from "@/data/headings";
import { Chip } from "@/shared/ui/Chip";
import type { SkillGroup } from "@/types";
import { Button } from "@/shared/ui/Button";
import { profile } from "@/data/profile";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, Clock, ChevronRight, Tag } from "lucide-react";

/** Order of skill group tabs; derived from experience data. */
const skillGroups = skills.map((g) => g.group);

export function ExperiencePage() {
  const [active, setActive] = useState<SkillGroup["group"]>(skills[0].group);
  const [selectedCertIdx, setSelectedCertIdx] = useState(0);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const activeSkills = useMemo(() => {
    return skills.find((g) => g.group === active)?.items ?? [];
  }, [active]);

  const selectedCert = profile.certifications[selectedCertIdx];

  useEffect(() => {
    if (!certModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [certModalOpen]);

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <SectionHeading
          eyebrow={headings.experience.eyebrow}
          title={headings.experience.title}
          description={headings.experience.description}
        />

        <div className="mt-10 space-y-6">
          {experience.map((item, idx) => {
            const displayDuration = getDisplayDuration(item);
            const displayDateRange = getDisplayDateRange(item);
            const hasRoles = Boolean(item.roles?.length);
            const titleLine =
              item.title
                ? `${item.title} · ${item.company}`
                : item.company;

            return (
              <Reveal
                key={item.roles?.length ? item.company : `${item.company}-${item.startDate}`}
                delay={0.04 * idx}
              >
                <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:shadow-lift-1 hover:border-primary/20">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/80 to-secondary" aria-hidden />

                  <div className="pl-4 pr-4 py-4 sm:pl-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-start gap-3 min-w-0 flex-1">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                        {/* Circular ring: 4 primary arcs with gaps */}
                        <div
                          className="absolute inset-0 rounded-full p-[2px] transition-[transform] duration-300 group-hover:animate-[spin_6s_linear_infinite]"
                          style={{
                            background: "conic-gradient(from 0deg, rgba(37,99,235,0.4) 0deg, var(--color-primary) 72deg, transparent 72deg 90deg, rgba(37,99,235,0.4) 90deg, var(--color-primary) 162deg, transparent 162deg 180deg, rgba(37,99,235,0.4) 180deg, var(--color-primary) 252deg, transparent 252deg 270deg, rgba(37,99,235,0.4) 270deg, var(--color-primary) 342deg, transparent 342deg 360deg)",
                          }}
                          aria-hidden
                        >
                          <div className="h-full w-full rounded-full bg-surface" />
                        </div>
                        <div className="absolute inset-[2px] z-10 flex items-center justify-center overflow-hidden rounded-full bg-surface">
                          {item.logo ? (
                            <img src={item.logo} alt="" className="h-11 w-11 object-contain" />
                          ) : (
                            <span className="text-xs font-bold tracking-tight text-primary">{item.company.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 ">
                        <h3 className="text-lg font-bold tracking-tight text-ink">
                          {titleLine}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-2">
                          {item.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                              {item.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {displayDateRange}
                          </span>
                        </div>
                      </div>
                      </div>
                      {!item.endDate && (
                        <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {displayDuration}
                      </span>
                      {item.domains?.map((domain) => (
                        <span
                          key={domain}
                          className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink ring-1 ring-line"
                          aria-label="Domain"
                        >
                          <Tag className="h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden />
                          {domain}
                        </span>
                      ))}
                    </div>

                    {/* Roles — original timeline with dots and connector */}
                    {hasRoles ? (
                      <div className="mt-5 flex flex-col gap-0">
                        {item.roles!.map((role, roleIdx) => (
                          <div key={`${role.title}-${role.employmentType}-${roleIdx}`}>
                            <div className="flex items-center gap-4">
                              <div
                                className="flex w-6 shrink-0 justify-center"
                                aria-hidden
                              >
                                <div className="h-2.5 w-2.5 rounded-full border-2 border-primary/50 bg-primary/10" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-primary">
                                  {role.title}
                                </div>
                                <div className="mt-0.5 text-xs text-muted-2">
                                  {role.employmentType} · {role.timeframe}
                                </div>
                              </div>
                            </div>
                            {roleIdx < item.roles!.length - 1 && (
                              <div className="flex gap-4">
                                <div className="flex w-6 shrink-0 justify-center">
                                  <div className="w-px min-h-[1.25rem] bg-line" />
                                </div>
                                <div className="min-w-0 flex-1" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 border-l-2 border-primary/30 pl-3 text-sm leading-relaxed text-muted-1">
                        {item.summary}
                      </p>
                    )}

                    <div className="mt-4 border-t border-line pt-4">
                      <ul className="space-y-2">
                        {item.outcomes.map((o) => (
                          <li key={o} className="flex gap-3 text-sm leading-relaxed text-muted-1">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow={headings.skills.eyebrow}
            title={headings.skills.title}
            description={headings.skills.description}
          />

          <div className="mt-6 flex flex-wrap gap-2">
            {skillGroups.map((g) => (
              <Chip
                key={g}
                active={active === g}
                activeVariant={"primary"}
                onClick={() => setActive(g)}
              >
                {g}
              </Chip>
            ))}
          </div>

          <Reveal>
            <Card className="mt-4 p-6">
              <div className="flex flex-wrap gap-2.5">
                {activeSkills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow={headings.credentials.eyebrow}
            title={headings.credentials.title}
            description={headings.credentials.description}
          />

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {profile.certifications.map((c, idx) => {
              const selected = idx === selectedCertIdx;
              return (
                <Reveal key={`${c.name}-${idx}`} delay={0.02 * idx}>
                  <Card className="p-5">
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCertIdx(idx);
                          setCertModalOpen(true);
                        }}
                        className="group relative overflow-hidden rounded-xl border border-line bg-surface/80 shadow-sm transition-shadow hover:shadow-lift-1"
                        aria-label={`Preview ${c.name}`}
                      >
                        <img
                          src={c.thumbnail}
                          alt={c.name}
                          className="h-16 w-20 object-cover"
                          loading="lazy"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_80px_at_30%_25%,rgba(37,99,235,0.22),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-ink">
                              {c.name}
                            </div>
                            <div className="mt-1 truncate text-xs text-muted-2">
                              {c.issuer}
                              {c.year ? ` · ${c.year}` : ""}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCertIdx(idx);
                              setCertModalOpen(true);
                            }}
                            className={[
                              "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                              selected
                                ? "border-line-strong bg-surface text-ink shadow-sm"
                                : "border-line bg-surface/80 text-muted-1 hover:bg-surface hover:text-ink",
                            ].join(" ")}
                          >
                            Preview
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {c.verifyLink ? (
                            <a href={c.verifyLink} target="_blank" rel="noreferrer">
                              <Button variant="secondary">Verify</Button>
                            </a>
                          ) : null}
                          {c.pdf ? (
                            <>
                              <a href={c.pdf} download>
                                <Button variant="primary">Download</Button>
                              </a>
                              <a href={c.pdf} target="_blank" rel="noreferrer">
                                <Button variant="secondary">Open</Button>
                              </a>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <AnimatePresence>
            {certModalOpen && selectedCert?.pdf ? (
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                  aria-label="Close preview"
                  onClick={() => setCertModalOpen(false)}
                />

                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-col gap-3 border-b border-line bg-surface-2 px-5 py-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-ink">
                          {selectedCert.name}
                        </div>
                        <div className="mt-1 truncate text-xs text-muted-1">
                          {selectedCert.issuer}
                          {selectedCert.year ? ` · ${selectedCert.year}` : ""}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={selectedCert.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-line bg-ink/[0.06] px-3 py-2 text-sm font-medium text-ink hover:bg-ink/[0.1] transition-colors"
                        >
                          Open PDF
                        </a>
                        <button
                          type="button"
                          onClick={() => setCertModalOpen(false)}
                          className="rounded-xl border border-line bg-ink/[0.06] px-3 py-2 text-sm font-medium text-ink hover:bg-ink/[0.1] transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>

                    <div className="h-[75vh] bg-paper">
                      <iframe
                        title={`${selectedCert.name} PDF`}
                        src={selectedCert.pdf}
                        className="h-full w-full"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}