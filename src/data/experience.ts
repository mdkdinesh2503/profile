import type { ExperienceItem } from "@/types";

// ─── Config ─────────────────────────────────────────────────────────────────

const EXCLUDED_FROM_YEARS = new Set(["Aspire Systems"]);

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const PRESENT = "Present";
const DATE_RANGE_SEP = " — ";

// ─── Date & duration helpers ───────────────────────────────────────────────

type YearMonth = { year: number; month: number };

function parseMonthYear(value: string): YearMonth {
  const [monthLabel, yearStr] = value.trim().split(/\s+/);
  const month = MONTH_LABELS.findIndex((m) => m === monthLabel);
  const year = parseInt(yearStr ?? "0", 10);
  return { year, month: month >= 0 ? month : 0 };
}

function toYearMonth(date: Date): YearMonth {
  return { year: date.getFullYear(), month: date.getMonth() };
}

function monthsBetween(start: YearMonth, end: YearMonth): number {
  return (end.year - start.year) * 12 + (end.month - start.month);
}

function getItemDurationMonths(item: ExperienceItem): number {
  const start = parseMonthYear(item.startDate);
  const end = item.endDate
    ? parseMonthYear(item.endDate)
    : toYearMonth(new Date());
  return monthsBetween(start, end);
}

function formatDuration(months: number): string {
  if (months < 12) return `${months} mos`;
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return remainder === 0 ? `${years} yr` : `${years} yr ${remainder} mos`;
}

function formatDateRange(
  startDate: string,
  endDate: string | null | undefined,
): string {
  return `${startDate}${DATE_RANGE_SEP}${endDate ?? PRESENT}`;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** Duration only, e.g. "1 yr 8 mos" or "1 yr 10 mos", for use with a calendar icon. */
export function getDisplayDuration(item: ExperienceItem): string {
  if (item.timeframe) {
    return item.timeframe;
  }
  const months = getItemDurationMonths(item) + 1;
  return formatDuration(months);
}

/** Date range only, e.g. "Sep 2022 — Dec 2023" or "Aug 2024 — Present". */
export function getDisplayDateRange(item: ExperienceItem): string {
  return formatDateRange(item.startDate, item.endDate);
}

export function getYearsExperience(
  items: ExperienceItem[],
  includeInternship: boolean = false,
): string {
  let total = items
    .filter((item) => !EXCLUDED_FROM_YEARS.has(item.company))
    .reduce((sum, item) => sum + getItemDurationMonths(item) / 12, 0);

  if (includeInternship) {
    total += 3 / 12;
  }

  if (total < 1) return "1";

  const full = Math.floor(total);
  const fraction = total - full;

  if (fraction >= 0.5) {
    return `${full}.5+`;
  } else if (fraction > 0.001 || includeInternship) {
    return `${full}+`;
  }

  return `${full}`;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    category: "Professional Experience",
    company: "Aretedge Innovations Private Limited",
    logo: "./experience/Aretedge.webp",
    title: "Associate Software Developer",
    location: "Hyderabad, Telangana, India · On-site",
    domains: [
      "20K+ Registered Users",
      "Java Monolith → Rust Microservices",
      "Distributed Systems & Gaming Backend",
    ],
    startDate: "Aug 2024",
    endDate: "May 2026",
    summary:
      "Worked on a production gaming platform serving 20K+ registered users, contributing to its evolution from a Java/Spring Boot monolith toward high-performance Rust-based microservices.",
    techStack: [
      "Java",
      "Spring Boot",
      "Rust",
      "Tokio",
      "Axum",
      "Tonic",
      "async-graphql",
      "Protocol Buffers",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "DynamoDB",
      "Redis / Valkey",
      "Next.js",
      "Angular",
      "REST APIs",
      "GraphQL",
      "gRPC",
      "Docker",
      "Jenkins",
      "Grafana",
      "ArgoCD",
      "AWS",
    ],
    highlights: [
      {
        title: "Backend & Feature Ownership",
        points: [
          "Owned ~90% of backend development for the Challenge Module, covering APIs, participant/scoring workflows, leaderboards, rewards, PostgreSQL, Redis, service integration, testing, deployment validation, and production support.",
          "Owned ~90% of Casual Games backend workflows, including gameplay participation, score processing, third-party game API integration, Redis-based rankings, rewards, and production support.",
          "Implemented Double Elimination tournament logic, including bracket generation, match progression, participant advancement, finals, and winner determination.",
        ],
      },
      {
        title: "Backend & Distributed Systems",
        points: [
          "Developed and modified 20–30 production APIs across Java, Rust, and NestJS using REST, GraphQL, and gRPC.",
          "Worked with Rust, Tokio, Axum, Tonic, async-graphql, Protocol Buffers, Diesel, and async PostgreSQL in production microservices.",
          "Contributed to an internal Rust GraphQL Gateway, implementing GraphQL schemas, queries/mutations, Axum routes, service integrations, and GraphQL → gRPC communication.",
          "Worked with PostgreSQL schemas, JSONB, functions, stored procedures, materialized views, and transactional workflows.",
          "Implemented Redis/Valkey workflows for leaderboards, caching, and authentication/session state.",
          "Contributed to a DynamoDB → PostgreSQL migration involving ~20K records using a Node.js migration process.",
        ],
      },
      {
        title: "Production Engineering & Lifecycle",
        points: [
          "Supported 25+ production releases, 10+ incidents, and 8+ hotfixes through log analysis, RCA, API validation, deployment workflows, and post-release verification using Jenkins, ArgoCD, Grafana, and AWS services.",
          "Worked across the full feature lifecycle: Requirement → API/Data Design → Implementation → Integration → Testing → Deployment → Production Support.",
        ],
      },
    ],
    outcomes: [
      "Owned ~90% backend development for Challenge & Casual Games modules serving 20K+ users.",
      "Designed and deployed 20–30 production APIs across Rust (Axum/Tonic), Java (Spring Boot), and NestJS with gRPC and GraphQL.",
      "Engineered complex Double Elimination tournament bracket logic and automated match progression workflows.",
      "Implemented high-throughput Redis/Valkey caching & real-time leaderboards, plus executed DynamoDB → PostgreSQL data migration.",
      "Maintained 99.9% release stability across 25+ deployments, 10+ incident RCAs, and 8+ production hotfixes.",
    ],
  },
  {
    category: "Professional Experience",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.webp",
    title: "Software Engineering Intern",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: [
      "Enterprise Software Engineering",
      "Full Stack Development",
      "Agile Delivery",
    ],
    startDate: "Jan 2023",
    endDate: "Mar 2023",
    summary:
      "Completed a Software Engineering internship focused on Java, Angular, MySQL, REST APIs, debugging, testing, and enterprise application development through project-based assignments.",
    techStack: [
      "Java",
      "Angular",
      "MySQL",
      "JSON-Server",
      "REST APIs",
      "Git",
      "Unit Testing",
      "Debugging",
      "Agile / Scrum",
    ],
    outcomes: [
      "Built enterprise application features across frontend (Angular) and backend (Java REST services) following enterprise coding conventions.",
      "Designed relational schemas and queries in MySQL with end-to-end API integration and comprehensive test coverage.",
      "Applied structured debugging, automated API validation, and collaborative Git workflows in an Agile team environment.",
    ],
  },
  {
    category: "Training Experience",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.webp",
    title: "Graduate Trainee",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: [
      "Structured Enterprise Engineering Training",
      "Full-Stack Foundation",
      "System Architecture & SDLC",
    ],
    startDate: "Sep 2022",
    endDate: "Jul 2024",
    timeframe: "1 yr 8 mos",
    summary:
      "Completed enterprise software engineering training across multiple phases through mentor-guided development, architectural deep-dives, and project-based assignments.",
    techStack: [
      "Java",
      "Spring Boot",
      "Angular",
      "Node.js",
      "MySQL",
      "REST APIs",
      "OOP & Design Patterns",
      "Layered Architecture",
      "Git",
      "Agile SDLC",
    ],
    roles: [
      {
        title: "Graduate Trainee (Advanced Phase)",
        employmentType: "Apprenticeship",
        timeframe: "Apr 2023 - Jul 2024 · 1 yr 4 mos",
      },
      {
        title: "Graduate Trainee (Foundational Phase)",
        employmentType: "Apprenticeship",
        timeframe: "Sep 2022 - Dec 2022 · 4 mos",
      },
    ],
    highlights: [
      {
        title: "Advanced Training (Apr 2023 - Jul 2024 · 1 yr 4 mos)",
        points: [
          "Completed enterprise software engineering training through mentor-guided development and project-based assignments using Java, Spring Boot, Angular, Node.js, MySQL, and REST APIs.",
          "Built application features across frontend, backend, and relational database layers.",
          "Applied OOP, layered architecture, API integration, Git, debugging, API testing, and Agile development practices.",
          "Participated in requirement discussions, implementation, code reviews, debugging, and iterative application improvements.",
        ],
      },
      {
        title: "Foundational Training (Sep 2022 - Dec 2022 · 4 mos)",
        points: [
          "Built foundational software engineering skills through structured training in Java, application development, databases, Git, and software development practices.",
          "Applied core OOP principles, clean code patterns, and relational database normalization to academic & simulated enterprise scenarios.",
        ],
      },
    ],
    outcomes: [
      "Mastered Java, Spring Boot, Angular, Node.js, and relational database design through intensive mentor-guided training.",
      "Constructed multi-tiered enterprise applications following clean architecture, REST standards, and SOLID principles.",
      "Participated in active requirement grooming, architectural reviews, automated test writing, and iterative code refactoring.",
    ],
  },
];

