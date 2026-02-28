import type { SelectedSectionHeading } from "@/types";

export const headings = {
  howICanHelp: {
    eyebrow: "Practical ways I contribute",
    title: "How I Can Help",
    description:
      "I contribute most when building full-stack features with meaningful business logic, reliable APIs, and maintainable, production-ready systems.",
  } satisfies SelectedSectionHeading,

  selectedWork: {
    eyebrow: "Selected work",
    title: "Case studies focused on decisions",
    description:
      "A few projects where trade-offs, constraints, and operational realities mattered.",
  } satisfies SelectedSectionHeading,

  experience: {
    eyebrow: "Experience",
    title: "Results-first, systems-aware",
    description:
      "I focus on outcomes: reliability, speed, and maintainability—so teams can keep shipping with confidence.",
  } satisfies SelectedSectionHeading,

  skills: {
    eyebrow: "Skills",
    title: "Built to ship",
    description:
      "Real stack, real systems—no self-scores. Just the areas and tech I've delivered in and own.",
  } satisfies SelectedSectionHeading,

  credentials: {
    eyebrow: "Credentials",
    title: "Certifications",
    description:
      "Compact list with optional preview (PDF) and verification links.",
  } satisfies SelectedSectionHeading,

  blogs: {
    eyebrow: "Writing",
    title: "Engineering notes",
    description:
      "Clean, practical writing about shipping and maintaining software.",
  } satisfies SelectedSectionHeading,

  resume: {
    eyebrow: "Resume",
    title: "One document. Your full story.",
    description:
      "A concise snapshot of my experience, stack, and outcomes—ready to download or view. Built for recruiters and teams who care about shipping.",
  } satisfies SelectedSectionHeading,

  contact: {
    eyebrow: "Contact",
    title: "Let's connect",
    description:
      "Open to roles and collaborations. Reach out for projects, opportunities, or a conversation about building reliable software.",
  } satisfies SelectedSectionHeading,
} as const;

export type Headings = typeof headings;