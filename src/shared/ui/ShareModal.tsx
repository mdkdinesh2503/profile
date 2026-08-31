import { useState, useEffect } from "react";
import {
  Share2,
  Check,
  Copy,
  MessageCircle,
  Linkedin,
  Twitter,
  Mail,
  Send,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cx } from "@/shared/ui/cx";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
  summary?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  url,
  summary,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary || title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* noop */
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary || title,
          url: shareUrl,
        });
        onClose();
      } catch {
        /* user dismissed or unsupported */
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const channels = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      gradient: "from-[#25D366]/20 to-[#128C7E]/10 hover:from-[#25D366]/30 hover:to-[#128C7E]/20 text-[#25D366] border-[#25D366]/30",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      gradient: "from-[#0A66C2]/20 to-[#0077B5]/10 hover:from-[#0A66C2]/30 hover:to-[#0077B5]/20 text-[#38bdf8] border-[#0A66C2]/30",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: Send,
      gradient: "from-[#229ED9]/20 to-[#0088cc]/10 hover:from-[#229ED9]/30 hover:to-[#0088cc]/20 text-[#229ED9] border-[#229ED9]/30",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      gradient: "from-sky-500/20 to-blue-600/10 hover:from-sky-500/30 hover:to-blue-600/20 text-sky-400 border-sky-500/30",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      gradient: "from-amber-500/20 to-orange-600/10 hover:from-amber-500/30 hover:to-orange-600/20 text-amber-400 border-amber-500/30",
      href: `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0A${encodedUrl}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container - Fixed with NO Scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            className="relative w-full max-w-md rounded-2xl border border-line bg-[#060b18] p-5 shadow-[0_0_50px_-10px_rgba(56,189,248,0.25),0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Border Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

            {/* Ambient Background Glows */}
            <div
              className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-36 w-60 rounded-full blur-3xl opacity-30 bg-primary"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-40 rounded-full blur-2xl opacity-20 bg-primary"
              aria-hidden
            />

            {/* Header */}
            <div className="relative flex items-center justify-between pb-3.5 border-b border-line">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    Share
                  </h3>
                  <p className="text-[11px] text-ink-light">Distribute or send via your favorite platform</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-1.5 text-white/50 hover:text-primary transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Preview Box */}
            <div className="my-3 rounded-xl bg-white/[0.03] border border-line px-3 py-2.5 relative overflow-hidden">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1 mb-0.5">
                <Sparkles className="h-3 w-3" /> Preview Content
              </div>
              <p className="text-xs font-medium text-white/90 truncate">
                {title}
              </p>
            </div>

            {/* Platform Channels */}
            <div className="my-3">
              <div className="grid grid-cols-5 gap-2">
                {channels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={cx(
                      "group flex flex-col items-center justify-center gap-1.5 rounded-xl border bg-gradient-to-b py-2.5 px-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95",
                      channel.gradient
                    )}
                    title={`Share on ${channel.name}`}
                  >
                    <div className="p-1.5 rounded-lg bg-black/25 group-hover:scale-110 transition-transform">
                      <channel.icon className="h-4 w-4 shrink-0" />
                    </div>
                    <span className="text-[10px] font-medium truncate w-full text-center text-white/80 group-hover:text-white">
                      {channel.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Copy Link Input Bar */}
            <div className="mt-3.5 space-y-1">
              <div className="flex items-center gap-1.5 rounded-xl border border-line p-1.5 pl-3 transition-colors">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-transparent text-xs text-white/80 outline-none select-all font-mono truncate"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={cx(
                    "flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
                    copied
                      ? "bg-primary text-white shadow-md"
                      : "bg-white/10 text-white hover:bg-primary hover:text-white active:scale-95"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white stroke-[2.5]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Native Mobile / System Share Option */}
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-primary py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>More Share Options</span>
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
