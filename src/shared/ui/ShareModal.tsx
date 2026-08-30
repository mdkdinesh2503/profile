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
      bg: "hover:bg-[#25D366]/20 hover:border-[#25D366]/50 hover:text-[#25D366]",
      textColor: "text-[#25D366]",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      bg: "hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 hover:text-[#38bdf8]",
      textColor: "text-[#0A66C2]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: Send,
      bg: "hover:bg-[#229ED9]/20 hover:border-[#229ED9]/50 hover:text-[#229ED9]",
      textColor: "text-[#229ED9]",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "X",
      icon: Twitter,
      bg: "hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400",
      textColor: "text-sky-400",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      bg: "hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400",
      textColor: "text-amber-400",
      href: `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0A${encodedUrl}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal / Bottom Sheet Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-t sm:border border-primary/30 bg-[#070d1e] p-5 sm:p-7 shadow-2xl shadow-primary/25 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Drag Indicator for mobile bottom sheet */}
            <div className="mx-auto -mt-2 mb-3 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

            {/* Top Glow Ambient */}
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-72 rounded-full blur-3xl opacity-30 bg-primary"
              aria-hidden
            />

            {/* Header */}
            <div className="relative flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-primary">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">Share</h3>
                  <p className="text-[11px] sm:text-xs text-white/50">Send via your favorite platform</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-1.5 sm:p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Title / Target Preview */}
            <div className="my-3 sm:my-4 rounded-xl bg-white/[0.03] border border-white/8 p-2.5 sm:p-3 text-xs text-white/80 line-clamp-2">
              <span className="font-semibold text-primary">Preview: </span>
              <span className="break-words">{title}</span>
            </div>

            {/* Share Grid / Quick Channels (Responsive 5-col on desktop, flexible wrap on mobile) */}
            <div className="grid grid-cols-5 gap-2 sm:gap-2.5 my-4 sm:my-5">
              {channels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={cx(
                    "flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3 text-white/70 transition-all duration-200 hover:scale-105 active:scale-95",
                    channel.bg
                  )}
                  title={`Share on ${channel.name}`}
                >
                  <channel.icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="text-[9.5px] sm:text-[11px] font-medium truncate w-full text-center">
                    {channel.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Copy Link Input Bar (Responsive flex) */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border border-white/12 bg-black/40 p-1.5 sm:pl-3.5">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-transparent px-2 py-1 sm:py-0 text-xs text-white/70 outline-none select-all font-mono truncate"
              />
              <button
                type="button"
                onClick={copyToClipboard}
                className={cx(
                  "flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
                  copied
                    ? "bg-primary text-white shadow-lg shadow-primary/40"
                    : "bg-white/10 text-white hover:bg-primary hover:text-white active:bg-primary/90"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-white" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Native Mobile Share Button (if supported on device) */}
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="mt-3 sm:mt-3.5 w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-primary/30 bg-primary/10 py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Sparkles className="h-3.5 w-3.5" /> More System Apps
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
