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
  includeTraining: boolean = false,
): string {
  let total = items
    .filter((item) => !EXCLUDED_FROM_YEARS.has(item.company))
    .reduce((sum, item) => sum + getItemDurationMonths(item) / 12, 0);

  if (includeInternship) {
    total += 3 / 12; // Aspire Systems internship: Jan–Mar 2023
  }

  if (includeTraining) {
    total += 22 / 12; // Aspire Systems Graduate Trainee: Sep 2022–Jul 2024
  }

  if (total < 1) return "1";

  const full = Math.floor(total);
  const fraction = total - full;

  if (fraction >= 0.5) {
    return `${full}.5+`;
  } else if (fraction > 0.001 || includeInternship || includeTraining) {
    return `${full}+`;
  }

  return `${full}`;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    category: "Professional Experience",
    company: "Aretedge Innovations Private Limited",
    logo: "/experience/Aretedge.webp",
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
      "Built and supported production systems for a gaming platform serving 20K+ registered users, working across Java/Spring Boot, Rust microservices, PostgreSQL, Redis, DynamoDB, GraphQL, gRPC, and AWS.",
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
        title: "Feature Ownership",
        points: [
          "Challenge Module (~90%): Backend APIs, business logic, PostgreSQL, Redis, testing, deployment validation, and production support.",
          "Casual Games (~90%): Gameplay, participation, scoring, rewards, leaderboards, and third-party Game API integrations.",
          "Tournament: Implemented Double Elimination — bracket generation, match progression, participant advancement, finals, and winner determination.",
        ],
      },
      {
        title: "Backend Engineering",
        points: [
          "Developed 20+ production APIs across Java monolith and Rust microservices using REST, GraphQL, and gRPC.",
          "Worked with Rust, Tokio, Axum, Tonic, async-graphql, Protocol Buffers, Diesel, and PostgreSQL in production microservices.",
          "Contributed to an internal Rust GraphQL Gateway — schemas, queries/mutations, Axum routes, service integrations & GraphQL → gRPC communication.",
          "Worked with PostgreSQL, Redis/Valkey, and DynamoDB for transactions, caching, rankings & application data.",
          "Contributed to a DynamoDB → PostgreSQL migration involving ~20K records using Node.js scripts.",
        ],
      },
      {
        title: "Frontend Engineering",
        points: [
          "Handled ~4 Next.js applications in a white-labeled production monorepo — components, forms, state, auth, API integration & fixes.",
          "Developed Angular + Spring Boot integrations and worked with React, TypeScript, Tailwind CSS, GraphQL & third-party APIs.",
        ],
      },
      {
        title: "Production Engineering",
        points: [
          "Supported 25+ releases, 10+ incidents, and 8+ hotfixes through log analysis, RCA, API validation, deployment & post-release verification.",
          "Worked with Jenkins, ArgoCD, Grafana & AWS across CI/CD, deployment, observability & production support.",
        ],
      },
    ],
    outcomes: [
      "Owned ~90% backend for Challenge & Casual Games modules serving 20K+ users.",
      "Built 20+ production APIs across Rust (Axum/Tonic), Java (Spring Boot), and NestJS using REST, GraphQL, and gRPC.",
      "Implemented Double Elimination tournament logic, Redis leaderboards, and DynamoDB → PostgreSQL migration.",
      "Handled ~4 Next.js apps in a white-labeled monorepo plus Angular + Spring Boot integrations.",
      "Supported 25+ releases, 10+ incidents & 8+ hotfixes using Jenkins, ArgoCD, Grafana, and AWS.",
    ],
  },
  {
    category: "Professional Experience",
    company: "Aspire Systems",
    logo: "/experience/Aspire_Systems.webp",
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
      "Hands-on internship in Java, Angular, MySQL, and REST APIs through project-based enterprise assignments.",
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
      "Built Angular UIs (components, services, routing, forms) and Java REST backend features.",
      "Applied MySQL, REST API integration, Git, debugging, and unit testing.",
    ],
  },
  {
    category: "Training Experience",
    company: "Aspire Systems",
    logo: "/experience/Aspire_Systems.webp",
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
      "Multi-phase enterprise engineering training through mentor-guided development and project-based assignments.",
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
        title: "Advanced Phase (Apr 2023 – Jul 2024)",
        points: [
          "Trained via mentor-led projects in Java, Spring Boot, Angular, Node.js, MySQL, and REST APIs.",
          "Applied OOP, layered architecture, Git, debugging, and API testing.",
          "Joined requirement discussions, code reviews, and iterative delivery.",
        ],
      },
      {
        title: "Foundational Phase (Sep 2022 – Dec 2022)",
        points: [
          "Built foundational skills in Java, OOP, MySQL, Git, and software development practices.",
        ],
      },
    ],
    outcomes: [
      "Trained in Java, Spring Boot, Angular, Node.js, and MySQL via structured project assignments.",
      "Applied OOP, REST APIs, layered architecture, Git, and Agile delivery practices.",
    ],
  },
];

