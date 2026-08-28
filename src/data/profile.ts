import type { Profile } from "@/types";
import { certifications } from "./certifications";
import { experience, getYearsExperience } from "./experience";

export const profile: Profile = {
  name: "Dinesh Kumar M",
  role: "Software Engineer | Backend Engineer",
  location: "Namakkal, Tamil Nadu, India",
  phone: "+91 97879 43467",
  email: "mdkdinesh2503@gmail.com",
  avatar: "./profile/mdk.jpg",
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
      "Engineering the unseen logic behind flawless digital experiences.",
    subhead:
      "I transform complex business rules into lightning-fast, scalable infrastructure. Currently orchestrating data and microservices to deliver seamless interactions for thousands of concurrent users.",
    technologiesLabel: "Technologies I work with",
    yearsExperience: getYearsExperience(experience, true),
  },
  howICanHelp: {
    cards: [
      {
        title: "Creative Problem Solving",
        body: "Approach complex business challenges with innovative thinking, translating intricate domain rules into elegant, maintainable backend logic.",
      },
      {
        title: "Architecture & Design",
        body: "Design scalable REST, GraphQL, and gRPC APIs with clear contracts, focusing on long-term maintainability and service-to-service reliability.",
      },
      {
        title: "User-Centric Development",
        body: "Always keep the end-user in mind. Even deep in the backend, every microsecond saved and every query optimized translates to a better user experience.",
      },
      {
        title: "Database Engineering",
        body: "Model PostgreSQL schemas and DynamoDB access patterns, carefully balancing transactional integrity with high-read performance needs.",
      },
      {
        title: "End-to-End Ownership",
        body: "Take pride in owning features from inception to deployment. From requirements analysis to production support, I ensure quality at every step.",
      },
      {
        title: "Collaborative Teamwork",
        body: "Believe that the best software is built by communicative teams. I actively share knowledge, review code with empathy, and mentor peers.",
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
