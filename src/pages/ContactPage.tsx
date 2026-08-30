import { useState, useCallback, useMemo } from "react";
import {
  Mail, Phone, Copy, Check, Sparkles, Send,
  Terminal, ArrowUpRight, RefreshCw,
  CheckCircle2, User, Building, AtSign, ExternalLink,
  ShieldCheck, X, Activity, Lock, MessageSquare,
  Zap, Globe, Github, Linkedin, MapPin,
} from "lucide-react";
import { Container, buttonStyles, cx } from "@/shared/ui";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Reveal } from "@/shared/motion/Reveal";
import { PageMeta } from "@/shared/seo/PageMeta";
import { profile } from "@/data/profile";
import { inquiryTopics, socialLinks } from "@/data/contact";
import { headings } from "@/data/headings";
import { motion, AnimatePresence } from "framer-motion";

const tel = `tel:${profile.phone.replace(/\s+/g, "")}`;

/* ── Animated background ─────────────────────────────────────────── */
function ContactBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(61,142,255,0.1) 0%, transparent 65%)",
          animation: "bg-drift 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[450px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(129,140,248,0.07) 0%, transparent 65%)",
          animation: "bg-drift 14s ease-in-out infinite 3s",
        }}
      />
      <div
        className="absolute top-1/3 -left-32 h-[350px] w-[350px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 65%)",
          animation: "bg-drift 9s ease-in-out infinite 5s",
        }}
      />
      {/* Subtle mesh grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,142,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,142,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ── Quick-connect card ──────────────────────────────────────────── */
function QuickCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={cx(
          "group relative overflow-hidden rounded-2xl p-4 transition-all duration-300",
          className
        )}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.border = "1px solid rgba(61,142,255,0.3)";
          el.style.boxShadow = "0 0 28px rgba(61,142,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.border = "1px solid rgba(255,255,255,0.07)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(61,142,255,0.15) 0%, transparent 60%)" }}
          aria-hidden
        />
        {children}
      </div>
    </Reveal>
  );
}

/* ── Input field ─────────────────────────────────────────────────── */
function Field({
  icon: Icon,
  label,
  ...props
}: {
  icon: React.ElementType;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group/field relative">
      <div className="pointer-events-none absolute inset-y-0 left-3.5 z-10 flex items-center text-muted-2 transition-colors group-focus-within/field:text-primary">
        <Icon size={15} />
      </div>
      <input
        {...props}
        aria-label={label}
        className="w-full rounded-xl border bg-transparent pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-2 outline-none transition-all duration-200 focus:ring-1"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(61,142,255,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 1px rgba(61,142,255,0.2)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

/* ── Textarea field ──────────────────────────────────────────────── */
function TextareaField({
  icon: Icon,
  label,
  ...props
}: {
  icon: React.ElementType;
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="group/field relative">
      <div className="pointer-events-none absolute top-3.5 left-3.5 z-10 text-muted-2 transition-colors group-focus-within/field:text-primary">
        <Icon size={15} />
      </div>
      <textarea
        {...props}
        aria-label={label}
        className="w-full rounded-xl border bg-transparent pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-2 outline-none transition-all duration-200 resize-none"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(61,142,255,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 1px rgba(61,142,255,0.2)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

/* ── Step label ──────────────────────────────────────────────────── */
function StepLabel({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
        style={{ background: "linear-gradient(135deg, #3d8eff, #818cf8)" }}
      >
        {num}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-2">
        {children}
      </span>
    </div>
  );
}

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

  const { subject, body } = useMemo(() => {
    const fromIdentifier = senderName
      ? (senderOrg ? `${senderName} (${senderOrg})` : senderName)
      : (senderOrg ? senderOrg : "");

    let emailSubject: string = activeTopicObj.defaultSubject;
    if (fromIdentifier) {
      if (selectedTopic === "coffee") emailSubject = `☕ Coffee & Quick Catch-up with ${fromIdentifier}`;
      else if (selectedTopic === "engineering") emailSubject = `⚡ Engineering Sync with ${fromIdentifier}`;
      else if (selectedTopic === "career") emailSubject = `💼 Career Opportunity from ${fromIdentifier}`;
      else if (selectedTopic === "other") emailSubject = `📬 General Inquiry from ${fromIdentifier}`;
      else emailSubject = `${activeTopicObj.defaultSubject} from ${fromIdentifier}`;
    }

    const customBody = messageNote
      ? `${activeTopicObj.starterMessage}\n\n${messageNote}`
      : activeTopicObj.starterMessage;

    const bodyLines = [
      `Dear Dinesh,`,
      ``,
      customBody,
      ``,
      activeTopicObj.closingNote,
      ``,
      senderOrg ? `🏢 Organization / Company: ${senderOrg}` : null,
      senderEmail ? `📧 Direct Reply-To: ${senderEmail}` : null,
      ``,
      `Warm regards,`,
      senderName ? `${senderName}${senderOrg ? ` (${senderOrg})` : ""}` : `A portfolio visitor`,
    ].filter((line) => line !== null).join("\n");

    return { subject: emailSubject, body: bodyLines };
  }, [activeTopicObj, senderName, senderEmail, senderOrg, messageNote, selectedTopic]);

  const dynamicMailto = useMemo(
    () => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    [subject, body]
  );

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("https://formspree.io/f/mdkdinesh2503@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          topic: activeTopicObj.label, subject,
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
    } catch { window.location.href = dynamicMailto; }
  }, [dynamicMailto]);

  const copyDraft = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    } catch (err) { console.error(err); }
  }, [subject, body]);

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch { window.location.href = tel; }
  }, []);

  const resetForm = () => {
    setSenderName(""); setSenderEmail(""); setSenderOrg("");
    setMessageNote(""); setSelectedTopic(inquiryTopics[0].id);
  };

  /* card glass style reused */
  const glassPanel: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
  };

  return (
    <>
      <PageMeta
        title={headings.contact.eyebrow}
        description={headings.contact.description}
        path="/contact"
      />

      <style>{`
        @keyframes bg-drift {
          0%,100% { transform: translateX(-50%) scale(1) translateY(0); }
          50% { transform: translateX(-50%) scale(1.05) translateY(-20px); }
        }
        @keyframes shimmer-title {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes live-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(61,142,255,0); }
          50% { box-shadow: 0 0 0 6px rgba(61,142,255,0.12); }
        }
        @keyframes preview-scan {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 0.4; }
          95% { opacity: 0.4; }
          100% { transform: translateY(800px); opacity: 0; }
        }
        .preview-scan-line { animation: preview-scan 6s linear infinite; }
        .topic-card-active {
          background: linear-gradient(135deg, rgba(61,142,255,0.15), rgba(129,140,248,0.1)) !important;
          border-color: rgba(61,142,255,0.45) !important;
          box-shadow: 0 0 24px rgba(61,142,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08) !important;
        }
      `}</style>

      <ContactBackground />

      {/* ════════════════════════════════════════════════════
          HERO HEADER
      ════════════════════════════════════════════════════ */}
      <section className="relative pt-12 pb-6 md:pt-16">
        <Container>
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow={headings.contact.eyebrow}
              title={headings.contact.title}
              description={headings.contact.description}
              as="h1"
            >
              {/* Availability indicator */}
              <div
                className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                style={{ background: "rgba(61,142,255,0.06)", border: "1px solid rgba(61,142,255,0.18)", animation: "live-ring 2.5s ease-in-out infinite" }}
              >
                <span className="realtime-live-dot h-2 w-2 shrink-0" />
                <span className="text-sm text-muted-1">
                  Open to roles, collaborations, and good conversations
                </span>
              </div>
            </SectionHeading>
          </div>

          {/* ── Quick-connect tiles ── */}
          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Email */}
            <QuickCard delay={0.05}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl group-hover:scale-105 transition-transform"
                  style={{ background: "rgba(61,142,255,0.12)", border: "1px solid rgba(61,142,255,0.2)", boxShadow: "0 0 16px rgba(61,142,255,0.15)" }}
                >
                  <Mail className="h-4.5 w-4.5 text-primary" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Direct Email</div>
                  <div className="mt-0.5 truncate font-mono text-sm font-semibold text-white select-all">{profile.email}</div>
                </div>
              </div>
              <div
                className="mt-3 flex items-center gap-2 border-t pt-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <button
                  type="button"
                  onClick={copyEmail}
                  className={cx(
                    "flex flex-1 items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95",
                    copiedEmail
                      ? "text-white shadow-lg shadow-primary/25"
                      : "text-muted-1 hover:text-primary"
                  )}
                  style={copiedEmail
                    ? { background: "linear-gradient(135deg,#3d8eff,#818cf8)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex h-8 w-9 items-center justify-center rounded-lg border border-primary text-primary transition-all hover:bg-primary hover:text-white active:scale-95"
                  title="Open in mail app"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </QuickCard>

            {/* Phone */}
            <QuickCard delay={0.09}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl group-hover:scale-105 transition-transform"
                  style={{ background: "rgba(61,142,255,0.12)", border: "1px solid rgba(61,142,255,0.2)", boxShadow: "0 0 16px rgba(61,142,255,0.15)" }}
                >
                  <Phone className="text-primary" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Phone / WhatsApp</div>
                  <div className="mt-0.5 truncate font-mono text-sm font-semibold text-white select-all">{profile.phone}</div>
                </div>
              </div>
              <div
                className="mt-3 flex items-center gap-2 border-t pt-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <button
                  type="button"
                  onClick={copyPhone}
                  className={cx(
                    "flex flex-1 items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95",
                    copiedPhone ? "text-white" : "text-muted-1 hover:text-primary"
                  )}
                  style={copiedPhone
                    ? { background: "linear-gradient(135deg,#3d8eff,#818cf8)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {copiedPhone ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedPhone ? "Copied!" : "Copy Number"}</span>
                </button>
                <a
                  href={tel}
                  className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-primary px-3 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white active:scale-95"
                  title="Make a call"
                >
                  <Phone size={13} /> Call
                </a>
              </div>
            </QuickCard>

            {/* Networks */}
            <QuickCard delay={0.13} className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl group-hover:scale-105 transition-transform"
                  style={{ background: "rgba(61,142,255,0.12)", border: "1px solid rgba(61,142,255,0.2)", boxShadow: "0 0 16px rgba(61,142,255,0.15)" }}
                >
                  <Globe className="text-primary" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Networks</div>
                  <div className="mt-0.5 text-sm font-semibold text-white">Connect on Socials & Code</div>
                </div>
              </div>
              <div
                className="mt-3 flex items-center gap-2 border-t pt-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
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
                        label === "LinkedIn" ? "text-[#0A66C2] group-hover/btn:text-white" : iconClass
                      )}
                    />
                    <span>{label}</span>
                    <ArrowUpRight size={11} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </QuickCard>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          MAIN FORM + PREVIEW
      ════════════════════════════════════════════════════ */}
      <section className="relative py-6 pb-20">
        <Container>
          <div className="relative grid gap-6 lg:grid-cols-12 items-stretch">

            {/* ════════════════════════════════════════════
                LEFT — MESSAGE STUDIO (7 cols)
            ════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col">
              <Reveal delay={0.12}>
                <form
                  onSubmit={handleDirectSubmit}
                  className="relative flex flex-col h-full rounded-3xl overflow-hidden"
                  style={glassPanel}
                >
                  {/* Top gradient accent */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, transparent, #3d8eff 30%, #818cf8 70%, transparent)" }}
                    aria-hidden
                  />

                  <div className="flex flex-col h-full p-6 sm:p-7">
                    {/* Studio Header */}
                    <div
                      className="flex items-center justify-between pb-5 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-2xl"
                          style={{ background: "rgba(61,142,255,0.12)", border: "1px solid rgba(61,142,255,0.22)", boxShadow: "0 0 20px rgba(61,142,255,0.18)" }}
                        >
                          <Send size={18} className="text-primary" />
                        </div>
                        <div>
                          <h2
                            className="text-sm font-black uppercase tracking-[0.15em]"
                            style={{
                              backgroundImage: "linear-gradient(135deg, #3d8eff, #818cf8)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            Message Studio
                          </h2>
                          <p className="text-xs text-muted-2 mt-0.5">Compose your message. I'll receive it directly.</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={resetForm}
                        title="Reset form"
                        className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs text-muted-2 transition-all hover:text-primary"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <RefreshCw size={11} />
                        Reset
                      </button>
                    </div>

                    {/* ── Step 1: Topic ── */}
                    <div className="mt-6">
                      <StepLabel num={1}>What would you like to talk about?</StepLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {inquiryTopics.map((topic) => {
                          const Icon = topic.icon;
                          const isActive = selectedTopic === topic.id;
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              onClick={() => setSelectedTopic(topic.id)}
                              className={cx(
                                "relative flex flex-col items-center justify-center text-center rounded-2xl p-3.5 pt-4 transition-all duration-200 group min-h-[110px] overflow-hidden",
                                isActive ? "topic-card-active" : ""
                              )}
                              style={isActive ? {} : {
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,142,255,0.25)";
                                  (e.currentTarget as HTMLElement).style.background = "rgba(61,142,255,0.06)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                                }
                              }}
                            >
                              {isActive && (
                                <div
                                  className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full text-white"
                                  style={{ background: "linear-gradient(135deg,#3d8eff,#818cf8)" }}
                                >
                                  <Check size={9} strokeWidth={3} />
                                </div>
                              )}
                              <div
                                className={cx(
                                  "flex h-9 w-9 items-center justify-center rounded-xl mb-2 transition-colors",
                                  isActive ? "text-primary" : "text-muted-2 group-hover:text-primary"
                                )}
                              >
                                <Icon size={20} />
                              </div>
                              <div className="text-xs font-bold leading-tight text-white">{topic.label}</div>
                              <div className="text-[10px] text-muted-2 leading-tight mt-0.5 line-clamp-2">{topic.hint}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Step 2: Details ── */}
                    <div className="mt-6">
                      <StepLabel num={2}>Your Details</StepLabel>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field icon={User} label="Your name" type="text" required placeholder="Your Name" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                        <Field icon={Mail} label="Your email" type="email" required placeholder="Your Email Address" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
                      </div>
                      <div className="mt-3">
                        <Field icon={Building} label="Your organization" type="text" placeholder="Company / Organization (optional)" value={senderOrg} onChange={(e) => setSenderOrg(e.target.value)} />
                      </div>
                    </div>

                    {/* ── Step 3: Message ── */}
                    <div className="mt-6">
                      <div className="mb-3.5 flex items-center justify-between">
                        <StepLabel num={3}>Your Message</StepLabel>
                        <span className="text-[11px] text-muted-2">Be clear, be you.</span>
                      </div>
                      <TextareaField
                        icon={MessageSquare}
                        label="Your message"
                        rows={4}
                        placeholder="Tell me about your idea, project, or just say hello..."
                        value={messageNote}
                        onChange={(e) => setMessageNote(e.target.value)}
                      />
                    </div>

                    {/* ── Footer ── */}
                    <div
                      className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-2">
                        <Lock size={13} className="text-primary/60 shrink-0" />
                        <span>Goes directly to Dinesh's inbox.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={true}
                        // disabled={submitting}
                        className={cx(
                          buttonStyles.base,
                          buttonStyles.sizes.md,
                          "w-full sm:w-auto justify-center gap-2 font-semibold text-white transition-all duration-200",
                          submitting && "opacity-60 cursor-not-allowed"
                        )}
                        style={{
                          background: "linear-gradient(135deg, #3d8eff, #818cf8)",
                          boxShadow: "0 4px 24px rgba(61,142,255,0.3)",
                        }}
                      >
                        {submitting ? (
                          <><Sparkles size={15} className="animate-spin" /><span>Sending...</span></>
                        ) : (
                          <><Send size={15} /><span>Send Message</span></>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </Reveal>
            </div>

            {/* ════════════════════════════════════════════
                RIGHT — LIVE EMAIL PREVIEW (5 cols)
            ════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24">
              <Reveal delay={0.22}>
                <div
                  className="relative flex flex-col h-full rounded-3xl overflow-hidden"
                  style={glassPanel}
                >
                  {/* Top gradient accent — emerald to signal "live" */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, transparent, #10b981 40%, #3d8eff 80%, transparent)" }}
                    aria-hidden
                  />

                  {/* Scan line effect */}
                  <div
                    className="preview-scan-line pointer-events-none absolute left-0 right-0 h-px z-10 opacity-0"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(61,142,255,0.5), transparent)" }}
                    aria-hidden
                  />

                  <div className="flex flex-col h-full p-6 sm:p-7">
                    {/* Preview header */}
                    <div
                      className="flex items-center justify-between pb-5 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-2xl"
                          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)" }}
                        >
                          <Terminal size={18} className="text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3
                              className="text-sm font-black uppercase tracking-[0.15em] text-emerald-400"
                            >
                              Live Preview
                            </h3>
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Auto-syncing
                            </span>
                          </div>
                          <p className="text-xs text-muted-2 mt-0.5">Your email draft, live.</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={copyDraft}
                        className={cx(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95",
                          copiedDraft ? "text-primary" : "text-muted-2 hover:text-primary"
                        )}
                        style={{
                          background: copiedDraft ? "rgba(61,142,255,0.1)" : "rgba(255,255,255,0.04)",
                          border: copiedDraft ? "1px solid rgba(61,142,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {copiedDraft ? <Check size={12} className="text-primary" /> : <Copy size={12} />}
                        <span>{copiedDraft ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    {/* To / From */}
                    <div
                      className="py-4 space-y-2.5 text-xs border-b"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      {[
                        { label: "To:", value: profile.name, highlight: true },
                        {
                          label: "From:",
                          value: senderEmail
                            ? `${senderName ? `${senderName} ` : ""}<${senderEmail}>`
                            : "your email address",
                          highlight: false,
                        },
                      ].map(({ label, value, highlight }) => (
                        <div key={label} className="flex items-center gap-3 min-w-0">
                          <span className="min-w-[38px] shrink-0 font-semibold text-muted-2">{label}</span>
                          <span
                            className={cx(
                              "truncate rounded-lg px-2.5 py-0.5 text-[11px] font-semibold",
                              highlight
                                ? "text-primary"
                                : "text-muted-1 bg-white/5 border border-muted-1"
                            )}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subject */}
                    <div
                      className="py-4 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-2">Subject:</div>
                      <div className="text-sm font-bold text-white leading-snug">{subject}</div>
                    </div>

                    {/* Body */}
                    <div
                      className="flex-1 py-5 text-[12.5px] leading-relaxed text-white/80 whitespace-pre-wrap font-sans min-h-[220px] max-h-[340px] overflow-y-auto select-all pr-2"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      {body}
                    </div>

                    {/* Bottom bar */}
                    <div
                      className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex items-center gap-2 text-muted-2 text-[11px]">
                        <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                        <span>This is exactly how your email will look.</span>
                      </div>
                      <a
                        href={dynamicMailto}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                        title="Open in default mail app"
                      >
                        <ExternalLink size={12} />
                        Open in Mail App
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Location / response info card */}
              <Reveal delay={0.28}>
                <div
                  className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-2">
                    <MapPin size={13} className="text-primary/60 shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="h-3 w-px bg-white/10" aria-hidden />
                  <div className="flex items-center gap-2 text-xs text-muted-2">
                    <Activity size={13} className="text-emerald-400 shrink-0" />
                    <span>Usually responds within 24 hrs</span>
                  </div>
                  <div className="h-3 w-px bg-white/10 hidden sm:block" aria-hidden />
                  <div className="flex items-center gap-2 text-xs text-muted-2 hidden sm:flex">
                    <AtSign size={13} className="text-primary/60 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Success Toast ── */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm overflow-hidden rounded-2xl"
            style={{
              background: "rgba(2,8,20,0.94)",
              border: "1px solid rgba(16,185,129,0.3)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.1)",
            }}
          >
            {/* Top accent */}
            <div
              className="h-[2px]"
              style={{ background: "linear-gradient(90deg, #10b981, #3d8eff)" }}
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <CheckCircle2 size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Message Dispatched! 🚀</p>
                  <p className="text-xs text-muted-2 mt-0.5">Your note went straight to Dinesh's inbox.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitStatus("idle")}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-2 transition-colors hover:text-white hover:bg-white/8"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
