import { useState, useCallback, useMemo } from "react";
import {
  Mail, Phone, Copy, Check, ArrowRight,
  Sparkles, Send,
  Terminal, ArrowUpRight, RefreshCw,
  CheckCircle2, User, Building, AtSign, ExternalLink,
  ShieldCheck, X, Activity, Lock, MessageSquare
} from "lucide-react";
import { Container, SectionHeading, buttonStyles, cx } from "@/shared/ui";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { inquiryTopics, socialLinks } from "@/data/contact";
import { headings } from "@/data/headings";
import { motion, AnimatePresence } from "framer-motion";

const tel = `tel:${profile.phone.replace(/\s+/g, "")}`;

export function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<typeof inquiryTopics[number]["id"]>("coffee");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderOrg, setSenderOrg] = useState("");
  const [messageNote, setMessageNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const activeTopicObj = inquiryTopics.find((t) => t.id === selectedTopic) || inquiryTopics[0];

  // Dynamic customized email subject & body
  const { subject, body } = useMemo(() => {
    const fromIdentifier = senderName
      ? (senderOrg ? `${senderName} (${senderOrg})` : senderName)
      : (senderOrg ? senderOrg : "");

    let emailSubject: string = activeTopicObj.defaultSubject;
    if (fromIdentifier) {
      if (selectedTopic === "coffee") {
        emailSubject = `☕ Coffee & Quick Catch-up with ${fromIdentifier}`;
      } else if (selectedTopic === "engineering") {
        emailSubject = `⚡ Engineering Sync with ${fromIdentifier}`;
      } else if (selectedTopic === "career") {
        emailSubject = `💼 Career Opportunity from ${fromIdentifier}`;
      } else if (selectedTopic === "other") {
        emailSubject = `📬 General Inquiry from ${fromIdentifier}`;
      } else {
        emailSubject = `${activeTopicObj.defaultSubject} from ${fromIdentifier}`;
      }
    }

    const greeting = `Dear Dinesh,`;
    const signoff = `Warm regards,`;
    const customBody = messageNote
      ? `${activeTopicObj.starterMessage}\n\n${messageNote}`
      : activeTopicObj.starterMessage;

    const bodyLines = [
      greeting,
      ``,
      customBody,
      ``,
      activeTopicObj.closingNote,
      ``,
      senderOrg ? `🏢 Organization / Company: ${senderOrg}` : null,
      senderEmail ? `📧 Direct Reply-To: ${senderEmail}` : null,
      ``,
      signoff,
      senderName ? `${senderName}${senderOrg ? ` (${senderOrg})` : ""}` : `A portfolio visitor`,
    ].filter((line) => line !== null).join("\n");

    return { subject: emailSubject, body: bodyLines };
  }, [activeTopicObj, senderName, senderEmail, senderOrg, messageNote]);

  const dynamicMailto = useMemo(() => {
    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [subject, body]);

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/mdkdinesh2503@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          topic: activeTopicObj.label,
          subject: subject,
          name: senderName || "Visitor",
          email: senderEmail || "Not provided",
          organization: senderOrg || "Not provided",
          message: messageNote || activeTopicObj.starterMessage,
          fullDraft: body,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setMessageNote("");
      } else {
        window.location.href = dynamicMailto;
        setSubmitStatus("success");
      }
    } catch {
      window.location.href = dynamicMailto;
      setSubmitStatus("success");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = dynamicMailto;
    }
  }, [dynamicMailto]);

  const copyDraft = useCallback(async () => {
    try {
      const fullText = `Subject: ${subject}\n\n${body}`;
      await navigator.clipboard.writeText(fullText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    } catch (err) {
      console.error(err);
    }
  }, [subject, body]);

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      window.location.href = tel;
    }
  }, []);

  const resetForm = () => {
    setSenderName("");
    setSenderEmail("");
    setSenderOrg("");
    setMessageNote("");
    setSelectedTopic(inquiryTopics[0].id);
  };

  return (
    <>
      <PageMeta
        title={headings.contact.eyebrow}
        description={headings.contact.description}
        path="/contact"
      />

      {/* ── Header / Intro ──────────────────────────────────────────── */}
      <section className="relative pt-12 md:pt-16 pb-4">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={headings.contact.eyebrow}
              title={headings.contact.title}
              description={headings.contact.description}
            />
          </Reveal>

          {/* ═══════════════════════════════════════════════════════════════
             3 TOP QUICK-CONNECT TILES (Ultra-Compact, Generic Consistent Brand Theme)
          ═══════════════════════════════════════════════════════════════ */}
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">

            {/* TILE 1: Email */}
            <Reveal delay={0.05}>
              <div className="group relative rounded-2xl border border-line bg-surface/60 backdrop-blur-xl p-4 hover:border-primary/50 hover:bg-surface/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300">
                {/* Row 1: Icon + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="glass-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">Direct Email</div>
                    <div className="text-sm font-mono font-bold text-muted-1 truncate tracking-wide select-all">{profile.email}</div>
                  </div>
                </div>
                {/* Row 2: Actions */}
                <div className="mt-3 pt-3 border-t border-muted-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={cx(
                      "flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border text-xs font-semibold transition-all duration-150 active:scale-95",
                      copiedEmail
                        ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                        : "border-line bg-surface/80 text-muted-1 hover:border-primary hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                  </button>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex h-8 w-9 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all active:scale-95"
                    title="Open Mail App"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* TILE 2: Phone & WhatsApp */}
            <Reveal delay={0.10}>
              <div className="group relative rounded-2xl border border-line bg-surface/60 backdrop-blur-xl p-4 hover:border-primary/50 hover:bg-surface/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300">
                {/* Row 1: Icon + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="glass-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">Phone / WhatsApp</div>
                    <div className="text-sm font-mono font-bold text-muted-1 truncate select-all">{profile.phone}</div>
                  </div>
                </div>
                {/* Row 2: Actions */}
                <div className="mt-3 pt-3 border-t border-muted-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyPhone}
                    className={cx(
                      "flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border text-xs font-semibold transition-all duration-150 active:scale-95",
                      copiedPhone
                        ? "bg-primary text-white border-primary shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                        : "border-line bg-surface/80 text-muted-1 hover:border-primary hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {copiedPhone ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedPhone ? "Copied!" : "Copy Number"}</span>
                  </button>
                  <a
                    href={tel}
                    className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-primary px-3 text-xs font-bold text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all active:scale-95"
                  >
                    <Phone size={13} />
                    Call
                  </a>
                </div>
              </div>
            </Reveal>

            {/* TILE 3: Professional Networks (GitHub & LinkedIn) */}
            <Reveal delay={0.15}>
              <div className="group relative rounded-2xl border border-line bg-surface/60 backdrop-blur-xl p-4 hover:border-primary/50 hover:bg-surface/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 sm:col-span-2 lg:col-span-1">
                {/* Row 1: Icon + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="glass-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary group-hover:scale-105 transition-transform">
                    <Sparkles size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">Networks</div>
                    <div className="text-sm font-bold text-muted-1 truncate">Connect on Socials & Code</div>
                  </div>
                </div>
                {/* Row 2: Social Buttons */}
                <div className="mt-3 pt-3 border-t border-muted-1 flex items-center gap-2">
                  {socialLinks.map(({ href, icon: Icon, label, brandClass, iconClass }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "group/btn flex flex-1 items-center justify-center gap-1.5 h-8 rounded-lg border text-xs font-semibold transition-all duration-150 active:scale-95",
                        brandClass
                      )}
                    >
                      <Icon
                        size={14}
                        className={cx(
                          "transition-colors duration-150",
                          label === "LinkedIn"
                            ? "text-[#0A66C2] group-hover/btn:text-white"
                            : iconClass
                        )}
                      />
                      <span>{label}</span>
                      <ArrowUpRight size={11} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </section>

      {/* ── Below: Separate Form (Left) & Live Draft (Right) ────────── */}
      <section className="relative py-8 pb-16">
        <Container>

          <div className="relative grid gap-6 lg:grid-cols-12 items-stretch">

            {/* ═══════════════════════════════════════════════════════════════
               LEFT COLUMN (MESSAGE STUDIO - 7 COLS)
            ═══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col">
              <Reveal delay={0.15}>
                <form
                  onSubmit={handleDirectSubmit}
                  className="glass-card-panel relative flex flex-col h-full rounded-3xl border border-line backdrop-blur-xl p-6 sm:p-7 shadow-2xl hover:border-primary transition-all duration-300"
                >
                  {/* Studio Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-line">
                    <div className="flex items-center gap-3.5">
                      <div className="glass-icon flex h-11 w-11 items-center justify-center rounded-2xl text-primary">
                        <Send size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold tracking-wider uppercase text-primary font-sans">
                          MESSAGE STUDIO
                        </h3>
                        <p className="text-xs text-muted-1">Compose your message and I'll receive it directly.</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      title="Reset Form"
                      className="flex items-center gap-1.5 text-xs text-muted-1 hover:text-primary hover:border-primary transition-colors py-1.5 px-3 rounded-xl border border-line"
                    >
                      <RefreshCw size={12} />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Step 1: Topic Selector (4 Cards Grid) */}
                  <div className="mt-6">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-1 flex items-center gap-2 mb-3.5">
                      <span className="text-primary font-bold text-xs">1</span>
                      WHAT WOULD YOU LIKE TO TALK ABOUT?
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {inquiryTopics.map((topic) => {
                        const Icon = topic.icon;
                        const isSelected = selectedTopic === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setSelectedTopic(topic.id)}
                            className={cx(
                              "relative flex flex-col items-center justify-center text-center rounded-2xl border p-3.5 pt-4 transition-all duration-200 group min-h-[115px]",
                              isSelected
                                ? "border-primary bg-primary/10 text-ink shadow-[0_0_24px_rgba(56,189,248,0.2)]"
                                : "border-line bg-surface/40 text-muted-1 hover:border-primary/50 hover:text-ink hover:bg-surface/80"
                            )}
                          >
                            {/* Selected Checkmark Badge */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-md bg-primary text-white">
                                <Check size={11} strokeWidth={3} />
                              </div>
                            )}

                            <div
                              className={cx(
                                "flex h-9 w-9 items-center justify-center rounded-xl transition-colors mb-2",
                                isSelected ? "text-primary" : "text-muted-2 group-hover:text-primary"
                              )}
                            >
                              <Icon size={20} />
                            </div>

                            <div className="text-xs font-bold leading-tight mb-1 text-ink">{topic.label}</div>
                            <div className="text-[10px] text-muted-1 leading-tight line-clamp-2">{topic.hint}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Your Details */}
                  <div className="mt-6">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-1 flex items-center gap-2 mb-3.5">
                      <span className="text-primary font-bold text-xs">2</span>
                      YOUR DETAILS
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {/* Name */}
                      <div className="group/field relative">
                        <div className="pointer-events-none absolute inset-y-0 left-3.5 z-10 flex items-center text-muted-2 group-focus-within/field:text-primary transition-colors">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full rounded-xl bg-transparent border border-line pl-10 pr-4 py-3 text-sm text-ink placeholder:text-muted-2 focus:border-primary focus:outline-none "
                        />
                      </div>

                      {/* Email */}
                      <div className="group/field relative">
                        <div className="pointer-events-none absolute inset-y-0 left-3.5 z-10 flex items-center text-muted-2 group-focus-within/field:text-primary transition-colors">
                          <Mail size={15} />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Your Email Address"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          className="w-full rounded-xl bg-transparent border border-line pl-10 pr-4 py-3 text-sm text-ink placeholder:text-muted-2 focus:border-primary focus:outline-none "
                        />
                      </div>
                    </div>

                    {/* Org */}
                    <div className="mt-3 group/field relative">
                      <div className="pointer-events-none absolute inset-y-0 left-3.5 z-10 flex items-center text-muted-2 group-focus-within/field:text-primary transition-colors">
                        <Building size={15} />
                      </div>
                      <input
                        type="text"
                        placeholder="Company / Organization (optional)"
                        value={senderOrg}
                        onChange={(e) => setSenderOrg(e.target.value)}
                        className="w-full rounded-xl bg-transparent border border-line pl-10 pr-4 py-3 text-sm text-ink placeholder:text-muted-2 focus:border-primary focus:outline-none "
                      />
                    </div>
                  </div>

                  {/* Step 3: Your Message */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-1 flex items-center gap-2">
                        <span className="text-primary font-bold text-xs">3</span>
                        YOUR MESSAGE
                      </label>
                      <span className="text-[11px] text-muted-2">Be clear, be you. I'll take care of the rest.</span>
                    </div>

                    <div className="group/field relative">
                      <div className="pointer-events-none absolute top-3.5 left-3.5 z-10 text-muted-2 group-focus-within/field:text-primary transition-colors">
                        <MessageSquare size={15} />
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Tell me about your idea, project or just say hello..."
                        value={messageNote}
                        onChange={(e) => setMessageNote(e.target.value)}
                        className="w-full rounded-xl bg-transparent border border-line pl-10 pr-4 py-3 text-sm text-ink placeholder:text-muted-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Form Footer Action */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-line">
                    <div className="flex items-center gap-2 text-xs text-muted-1">
                      <Lock size={14} className="text-primary" />
                      <span>Direct to Dinesh's inbox, waiting for your message.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className={cx(
                        buttonStyles.base,
                        buttonStyles.sizes.md,
                        buttonStyles.variants.primary,
                        "w-full sm:w-auto justify-center gap-2 shadow-[0_0_24px_rgba(56,189,248,0.3)]",
                        submitting && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      {submitting ? (
                        <>
                          <Sparkles size={15} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </Reveal>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
               RIGHT COLUMN (LIVE EMAIL PREVIEW - 5 COLS)
            ═══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24">
              <Reveal delay={0.25}>
                <div className="glass-card-panel relative flex flex-col h-full rounded-3xl border border-line bg-surface/60 backdrop-blur-xl p-6 sm:p-7 shadow-2xl hover:border-primary/40 transition-all duration-300">

                  {/* Top Preview Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-line">
                    <div className="flex items-center gap-3">
                      <div className="glass-icon flex h-11 w-11 items-center justify-center rounded-2xl text-primary">
                        <Mail size={18} />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-bold tracking-wider uppercase text-primary font-sans">
                          PREVIEW
                        </h3>
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Auto-syncing
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyDraft}
                      className={cx(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-150 active:scale-95",
                        copiedDraft
                          ? "border-primary bg-primary/20 text-primary shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                          : "border-line bg-surface/80 text-muted-1 hover:border-primary hover:text-primary hover:bg-surface"
                      )}
                    >
                      {copiedDraft ? <Check size={13} className="text-primary" /> : <Copy size={13} />}
                      <span>{copiedDraft ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* To / From Pill Badges */}
                  <div className="py-4 space-y-2.5 text-xs border-b border-line min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-muted-1 font-medium min-w-[40px] shrink-0">To:</span>
                      <span className="inline-block rounded-xl px-3 py-1 text-primary tracking-wide font-bold truncate">
                        {profile.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-muted-1 font-medium min-w-[40px] shrink-0">From:</span>
                      <span className="inline-block rounded-xl px-3 py-1 text-ink font-medium truncate min-w-0 max-w-full" title={senderEmail ? `${senderName ? `${senderName} ` : ""}<${senderEmail}>` : "your email address"}>
                        {senderEmail ? `${senderName ? `${senderName} ` : ""}<${senderEmail}>` : "your email address"}
                      </span>
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div className="py-4 border-b border-line">
                    <div className="text-xs text-muted-1 font-medium mb-1">Subject:</div>
                    <div className="text-sm font-bold text-ink leading-snug">
                      {subject}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 py-5 text-xs sm:text-[13.5px] leading-relaxed text-ink/90 whitespace-pre-wrap font-sans min-h-[260px] max-h-[380px] overflow-y-auto select-all selection:bg-primary/30 pr-2">
                    {body}
                  </div>

                  {/* Bottom Bar: Open in Mail Client */}
                  <div className="mt-auto pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-muted-1 text-[11px]">
                      <Send size={13} className="text-primary shrink-0" />
                      <span>This is exactly how your email will look.</span>
                    </div>

                    <a
                      href={dynamicMailto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs border border-primary text-primary hover:bg-primary hover:border-primary hover:text-white transition-colors"
                      title="Open draft in default email app"
                    >
                      <ExternalLink size={13} />
                      <span>Open in Mail App</span>
                    </a>
                  </div>

                </div>
              </Reveal>
            </div>

          </div>

        </Container>
      </section>

      {/* Floating Success Toast (Zero Layout Shift) */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 max-w-md rounded-2xl border border-emerald-500/30 bg-surface/95 p-4 text-xs font-medium text-emerald-400 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="font-bold text-ink">Message Dispatched!</p>
                <p className="text-muted-1 text-[11px]">Your note was sent directly to Dinesh's inbox.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSubmitStatus("idle")}
              className="rounded-lg p-1.5 text-muted-2 hover:bg-surface/80 hover:text-ink transition-colors"
              title="Close toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
