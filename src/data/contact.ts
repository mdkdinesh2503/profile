import { Coffee, Briefcase, Code2, Sparkles, Github, Linkedin } from "lucide-react";
import { profile } from "./profile";

export const inquiryTopics = [
  {
    id: "coffee",
    label: "Coffee & Chat",
    icon: Coffee,
    hint: "Casual catch-up & networking",
    defaultSubject: "☕ Coffee & Quick Catch-up",
    starterMessage: "I'd love to grab a virtual coffee ☕, connect, and share some thoughts or exchange ideas!",
    closingNote: "Looking forward to connecting over good coffee ☕ and great ideas! ✨",
  },
  {
    id: "career",
    label: "Career & Roles",
    icon: Briefcase,
    hint: "Opportunities & collaboration",
    defaultSubject: "💼 Career Opportunity",
    starterMessage: "I have explored your engineering work and was really impressed by your problem-solving skills and technical depth 🚀. We have an opportunity that aligns closely with your skills!",
    closingNote: "Looking forward to connecting with you to discuss further details and next steps! 🤝",
  },
  {
    id: "engineering",
    label: "Engineering Sync",
    icon: Code2,
    hint: "Architecture & technical discussions",
    defaultSubject: "⚡ Engineering Sync",
    starterMessage: "I'd love to sync up and discuss engineering concepts, system design, ideas, and shared technical knowledge ⚡!",
    closingNote: "Looking forward to hearing from you and sharing great engineering thoughts! 💡",
  },
  {
    id: "other",
    label: "Something Else",
    icon: Sparkles,
    hint: "Other inquiries & ideas",
    defaultSubject: "📬 General Inquiry",
    starterMessage: "Reaching out with a quick question or note that might be helpful and insightful 💬.",
    closingNote: "Thanks for your time, and looking forward to hearing back from you! ✨",
  },
] as const;

export const socialLinks = [
  {
    href: profile.links.github,
    icon: Github,
    label: "GitHub",
    handle: "@mdkdinesh2503",
    color: "from-zinc-800 to-zinc-900 border-zinc-700/60",
    brandClass: "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-700 hover:border-zinc-500 hover:text-white",
    iconClass: "text-zinc-300",
  },
  {
    href: profile.links.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Dinesh Kumar M",
    color: "from-[#0A66C2]/20 to-[#0A66C2]/40 border-[#0A66C2]/50 text-[#38bdf8]",
    brandClass: "border-[#0A66C2]/60 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
    iconClass: "text-[#0A66C2]",
  },
] as const;

export const contactData = {
  emailSubject: "Portfolio inquiry",
  reachMe: {
    title: "Reach me",
  },

  connect: {
    label: "Connect",
  },

  whatHelps: {
    title: "What helps",
    description: "Context that makes our conversation more useful",
    items: [
      "Role and team context (product stage, constraints, timelines)",
      "What you need most: shipping, reliability, performance, migrations",
      "Interview process and what success looks like in 90 days",
    ],
  },
} as const;

export type ContactData = typeof contactData;
export type InquiryTopic = typeof inquiryTopics[number];
