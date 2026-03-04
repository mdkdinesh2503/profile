import type { Profile } from "@/types";
import { certifications } from "./certifications";
import { experience, getYearsExperience } from "./experience";

export const profile: Profile = {
  name: "Dinesh Kumar M",
  role: "Full-Stack Software Engineer",
  location: "Namakkal, Tamil Nadu, India",
  phone: "+91 97879 43467",
  email: "mdkdinesh2503@gmail.com",
  avatar: "./profile/mdk_4.jpg",
  primaryCta: {
    label: "View Selected Work",
    href: "/projects",
  },
  resume: {
    pdfSrc: "./resume/Dinesh_Resume.pdf",
    pdfTitle: "Dinesh Resume",
  },
  hero: {
    initials: "DK",
    headline:
      "Full‑stack engineer shipping calm, reliable systems—front to back.",
    subhead:
      "I design and ship end-to-end features across UI, APIs, and data layers — focusing on clear architecture, maintainable business logic, and performance-aware implementation.",
    technologiesLabel: "Technologies I work with",
    yearsExperience: getYearsExperience(experience),
  },
  howICanHelp: {
    cards: [
      {
        title: "Product Feature Development",
        body: "Deliver end-to-end features across UI and backend with clear structure, reliable behavior, and maintainable domain logic.",
      },
      {
        title: "Full-Stack Application Development",
        body: "Build responsive interfaces backed by scalable backend services using consistent patterns and reusable components.",
      },
      {
        title: "APIs & Backend Systems",
        body: "Design REST, GraphQL, and gRPC APIs that are predictable, scalable, and aligned with real workflow needs.",
      },
      {
        title: "Complex Business Workflows",
        body: "Implement domain-heavy workflows such as tournaments and state-driven processes with strong attention to correctness and edge cases.",
      },
      {
        title: "Performance & Data Optimization",
        body: "Improve efficiency using Redis caching, query optimization, and thoughtful database design across SQL and NoSQL systems.",
      },
      {
        title: "Ownership & System Reliability",
        body: "Own critical modules, debug production issues, and deliver stable incremental improvements with long-term maintainability in mind.",
      },
    ],
  },
  links: {
    github: "https://github.com/mdkdinesh2503",
    linkedin: "https://www.linkedin.com/in/mdkdinesh2503",
    instagram: "https://www.instagram.com/mdk_.me/",
  },
  certifications,
};