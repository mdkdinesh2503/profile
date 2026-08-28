import type { SelectedSectionHeading } from "@/types";

export const headings = {

  selectedWork: {
    eyebrow: "Selected Work",
    title: "Projects I've Built",
    description:
      "A curated set of projects that showcase how I approach real problems — from system design to shipping working software.",
  } satisfies SelectedSectionHeading,

  selectedWorkRealTime: {
    eyebrow: "Real-time projects",
    title: "Production & industry work",
    description:
      "Projects I delivered in professional and industry settings — real deadlines, real users, and real systems running in production.",
  } satisfies SelectedSectionHeading,

  selectedWorkAcademic: {
    eyebrow: "Academic & self-learn",
    title: "Learning projects",
    description:
      "Coursework, research, and self-directed projects—exploration, practice, and building in the open.",
  } satisfies SelectedSectionHeading,

  experience: {
    eyebrow: "Work Experience",
    title: "Where I've Worked",
    description:
      "My professional journey as a software engineer — the roles I've held, the teams I've worked with, and the impact I've made.",
  } satisfies SelectedSectionHeading,

  skills: {
    eyebrow: "Technical Skills",
    title: "Technologies I Work With",
    description:
      "A hands-on overview of the languages, frameworks, databases, and tools I use to design and deliver production systems.",
  } satisfies SelectedSectionHeading,

  education: {
    eyebrow: "Education",
    title: "Where It All Started",
    description:
      "My academic background in computer science — the foundation that shaped how I think about software, systems, and problem-solving.",
  } satisfies SelectedSectionHeading,

  credentials: {
    eyebrow: "Certifications",
    title: "Courses & Credentials I've Earned",
    description:
      "Certifications and courses that have sharpened my skills — each one verifiable with a direct link.",
  } satisfies SelectedSectionHeading,

  blogs: {
    eyebrow: "Blog & Writing",
    title: "Things I've Written About",
    description:
      "Articles and notes on software engineering — what I've learned, what I've built, and how I think about technical problems.",
  } satisfies SelectedSectionHeading,

  resume: {
    eyebrow: "Resume",
    title: "One document. Your full story.",
    description:
      "A complete summary of my experience, skills, and education — ready to download and share.",
  } satisfies SelectedSectionHeading,

  contact: {
    eyebrow: "Contact",
    title: "Let's connect",
    description:
      "Open to roles and collaborations. Reach out for projects, opportunities, or a conversation about building reliable software.",
  } satisfies SelectedSectionHeading,
} as const;

export type Headings = typeof headings;
