import type { Certification } from "@/types";

export interface EnhancedCertification extends Certification {
  category: "Systems & Backend" | "Cloud & Database" | "Frontend & Architecture" | "AI & LLM" | "Enterprise Engineering";
  credentialId: string;
  description: string;
  highlightStat?: string;
  accentColor: {
    primary: string;
    glow: string;
    border: string;
    bg: string;
    tagBg: string;
    text: string;
  };
}

export const certifications: EnhancedCertification[] = [
  {
    name: "Rust Programming Essentials",
    issuer: "Edureka",
    year: "Mar 11, 2026",
    category: "Systems & Backend",
    credentialId: "Z2HOYRLR8MPC",
    description:
      "Deep dive into high-concurrency systems programming, ownership & borrowing, zero-cost abstractions, Tokio async runtime, and robust memory safety without garbage collection.",
    highlightStat: "Grade: Distinction (96%)",
    thumbnail: "./default/certificate.svg",
    pdf: "./certification/Rust_Programming_Essentials.pdf",
    skills: ["Rust", "Memory Safety", "Tokio Async", "Concurrency", "Cargo"],
    accentColor: {
      primary: "#f97316", // rust orange
      glow: "rgba(249, 115, 22, 0.35)",
      border: "rgba(249, 115, 22, 0.4)",
      bg: "rgba(249, 115, 22, 0.06)",
      tagBg: "rgba(249, 115, 22, 0.12)",
      text: "#fb923c",
    },
  },
  {
    name: "AWS DynamoDB Fundamentals",
    issuer: "Meta",
    year: "Jun 16, 2025",
    category: "Cloud & Database",
    credentialId: "UTXJPVA09XLA",
    description:
      "Mastery of high-scale NoSQL single-table architecture, partition/sort key design, Global Secondary Indexes (GSIs), consistency models, and ultra low-latency queries.",
    highlightStat: "Meta Verified",
    thumbnail: "./default/certificate.svg",
    pdf: "./certification/AWS_DynamoDB.pdf",
    skills: ["DynamoDB", "NoSQL Data Modeling", "GSIs & Keys", "AWS Cloud"],
    accentColor: {
      primary: "#38bdf8", // sky / meta cyan
      glow: "rgba(56, 189, 248, 0.35)",
      border: "rgba(56, 189, 248, 0.4)",
      bg: "rgba(56, 189, 248, 0.06)",
      tagBg: "rgba(56, 189, 248, 0.12)",
      text: "#38bdf8",
    },
  },
  {
    name: "Advanced React",
    issuer: "Whizlabs",
    year: "May 12, 2025",
    category: "Frontend & Architecture",
    credentialId: "XSPWGPG37QZQ",
    description:
      "Advanced patterns in modern React 18+: concurrent mode, server components, render performance profiling, custom hook abstractions, and state orchestration.",
    highlightStat: "Top 5% Score",
    thumbnail: "./default/certificate.svg",
    pdf: "./certification/Advanced_React.pdf",
    skills: ["React 18+", "Hooks Architecture", "Performance", "State Management"],
    accentColor: {
      primary: "#818cf8", // indigo react
      glow: "rgba(129, 140, 248, 0.35)",
      border: "rgba(129, 140, 248, 0.4)",
      bg: "rgba(129, 140, 248, 0.06)",
      tagBg: "rgba(129, 140, 248, 0.12)",
      text: "#a5b4fc",
    },
  },
  {
    name: "Google Prompting Essentials",
    issuer: "Google",
    year: "Apr 17, 2025",
    category: "AI & LLM",
    credentialId: "XJITQC4NHDM1",
    description:
      "Industry credential in generative AI workflows, structured system prompts, few-shot prompting, chained reasoning, and integrating LLMs into developer pipelines.",
    highlightStat: "Google Certified",
    thumbnail: "./default/certificate.svg",
    pdf: "./certification/Google_Prompting_Essentials.pdf",
    skills: ["Generative AI", "Prompt Engineering", "LLM Pipelines", "AI Workflows"],
    accentColor: {
      primary: "#34d399", // emerald / google green
      glow: "rgba(52, 211, 153, 0.35)",
      border: "rgba(52, 211, 153, 0.4)",
      bg: "rgba(52, 211, 153, 0.06)",
      tagBg: "rgba(52, 211, 153, 0.12)",
      text: "#6ee7b7",
    },
  },
  {
    name: "Software Engineering Internship Certificate",
    issuer: "Aspire Systems",
    year: "Mar 31, 2023",
    category: "Enterprise Engineering",
    credentialId: "",
    description:
      "End-to-end enterprise full-stack development, Java REST microservices, Angular single-page applications, relational schema tuning, unit testing, and Agile team delivery.",
    highlightStat: "Corporate Honors",
    thumbnail: "./default/certificate.svg",
    pdf: "./certification/Aspire_Systems_Intern.pdf",
    skills: ["Java REST", "Angular", "MySQL", "Clean SDLC", "Agile"],
    accentColor: {
      primary: "#ec4899", // pink / magenta
      glow: "rgba(236, 72, 153, 0.35)",
      border: "rgba(236, 72, 153, 0.4)",
      bg: "rgba(236, 72, 153, 0.06)",
      tagBg: "rgba(236, 72, 153, 0.12)",
      text: "#f472b6",
    },
  },
];
