import type { Profile } from "@/types";
import { certifications } from "./certifications";
import { experience, getYearsExperience } from "./experience";


export const profile: Profile = {
  name: "Dinesh Kumar M",
  role: "Software Engineer",
  location: "Namakkal, Tamil Nadu, India",
  phone: "+91 97879 43467",
  email: "mdkdinesh2503@gmail.com",
  avatar: "./profile/mdk_3.webp",
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
    yearsExperience: getYearsExperience(experience, true),
  },

  links: {
    github: "https://github.com/mdkdinesh2503",
    linkedin: "https://www.linkedin.com/in/mdkdinesh2503",
  },
  certifications,
  education: [
    {
      institution: "K.S.R. College of Engineering",
      degree: "Bachelor of Engineering (B.E.) - Computer Science and Engineering",
      location: "Namakkal, Tamil Nadu, India",
      startDate: "Aug 2019",
      endDate: "May 2023",
      grade: "8.56/10",
      coursework: "Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering.",
    },
  ],
};
