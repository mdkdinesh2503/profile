import type { Profile } from "@/types";
import { certifications } from "./certifications";
import { experience, getYearsExperience } from "./experience";

export const profile: Profile = {
  name: "Dinesh Kumar M",
  role: "Software Engineer | Backend Engineer",
  location: "Hyderabad, Telangana, India",
  phone: "+91 97879 43467",
  email: "mdkdinesh2503@gmail.com",
  avatar: "./profile/mdk.jpg",
  primaryCta: {
    label: "View Selected Work",
    href: "/projects",
  },
  resume: {
    pdfSrc: "./resume/Dinesh_Resume.pdf",
    // pdfSrc: "./resume/Final_Resume.pdf",
    pdfTitle: "Dinesh Resume",
  },
  hero: {
    initials: "DK",
    headline:
      "Backend engineer building scalable, production-ready systems for gaming platforms.",
    subhead:
      "Experienced in designing and shipping backend systems for a gaming platform serving 20K+ users — REST, GraphQL, and gRPC APIs, PostgreSQL and DynamoDB data modeling, Redis caching, and production support across Java monoliths and Rust microservices.",
    technologiesLabel: "Technologies I work with",
    yearsExperience: getYearsExperience(experience, true),
  },
  howICanHelp: {
    cards: [
      {
        title: "Backend Module Ownership",
        body: "Own end-to-end backend implementation — from requirement analysis and API design through database modeling, deployment validation, and post-release production support.",
      },
      {
        title: "API Design & Integration",
        body: "Design and deliver REST, GraphQL, and gRPC APIs with clear contracts, service-to-service communication, and reliable third-party integrations.",
      },
      {
        title: "Database Engineering",
        body: "Model PostgreSQL schemas, DynamoDB access patterns, indexes, and migrations — optimizing queries for transactional and high-read workloads.",
      },
      {
        title: "Complex Business Workflows",
        body: "Translate domain rules — tournaments, challenges, rewards, leaderboards — into maintainable backend logic with strong attention to correctness.",
      },
      {
        title: "Performance & Caching",
        body: "Reduce database load with Redis caching strategies, TTL-based invalidation, and query optimization while maintaining data consistency.",
      },
      {
        title: "Production Support & Reliability",
        body: "Validate releases, investigate incidents, deliver hotfixes, and support controlled rollouts with root cause analysis and cross-team coordination.",
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
