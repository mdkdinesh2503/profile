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
      "Built and supported applications for a gaming platform serving 20K+ registered users across Java/Spring Boot, Rust microservices, PostgreSQL, Redis, DynamoDB, REST, GraphQL, gRPC, and AWS.",
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
      "ElastiCache",
      "AWS SQS",
      "Next.js",
      "Angular",
      "REST APIs",
      "GraphQL",
      "gRPC",
      "Docker",
      "Jenkins",
      "ArgoCD",
      "Grafana",
      "AWS",
    ],
    highlights: [
      {
        title: "Feature Ownership",
        points: [
          "Owned ~90% of Challenge and Casual Games modules end-to-end, covering technical design, API/database design, business logic, integrations, deployment validation and production support.",
          "Implemented registration, participation, scoring, leaderboards, prize pools, Solana wallet integration and cron-based Challenge lifecycle workflows.",
          "Implemented Double Elimination tournaments covering winners/losers brackets, match progression, advancement, finals and winner determination.",
        ],
      },
      {
        title: "Backend Engineering",
        points: [
          "Developed 20+ production APIs across Java monolith and Rust microservices using REST, GraphQL, and gRPC.",
          "Created/modified Protocol Buffer contracts and implemented corresponding gRPC integrations.",
          "Contributed to an internal Rust GraphQL Gateway using Axum, Tokio and async-graphql, connecting GraphQL operations with internal gRPC services.",
          "Created/modified 6+ PostgreSQL tables and 12–15 functions/stored procedures, using JSONB/materialized views for transactional and leaderboard workloads.",
          "Supported migration of ~20K user/login records from DynamoDB to PostgreSQL using Node.js.",
          "Used Redis/ElastiCache for authentication/session state and country-based leaderboards.",
          "Enhanced authentication with OTP, JWT, refresh-token rotation, RBAC and Redis-backed sessions.",
          "Worked with AWS SQS workflows and Aurora PostgreSQL, DynamoDB, ECR and EKS.",
        ],
      },
      {
        title: "Frontend Engineering",
        points: [
          "Independently handled ~4 Next.js applications in a white-labeled production monorepo, covering components, authentication and API integration.",
          "Developed Angular pages/components integrated with Java/Spring Boot APIs.",
        ],
      },
      {
        title: "Production Engineering",
        points: [
          "Supported 25+ releases, 10+ incidents and 8+ hotfixes through log analysis, RCA, API validation, Docker verification, Jenkins and Argo CD health checks.",
        ],
      },
    ],
    outcomes: [
      "Owned ~90% of Challenge and Casual Games modules serving 20K+ registered users.",
      "Built 20+ production APIs across Java monolith and Rust microservices with REST, GraphQL, and gRPC.",
      "Engineered Double Elimination tournament brackets, Solana wallet integration, and lifecycle cron workflows.",
      "Created 12–15 PostgreSQL stored procedures/functions with JSONB and materialized views.",
      "Migrated ~20K records from DynamoDB to PostgreSQL with zero data loss.",
      "Maintained ~4 Next.js white-labeled apps and supported 25+ production releases with CI/CD and observability.",
    ],
  },
  {
    category: "Professional Experience",
    company: "Aspire Systems",
    logo: "/experience/Aspire_Systems.webp",
    title: "Software Engineering Intern",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: [
      "Enterprise Engineering",
      "Full Stack Development",
    ],
    startDate: "Jan 2023",
    endDate: "Mar 2023",
    timeframe: "3 mos",
    summary:
      "Completed a Software Engineering internship focused on Java, Angular, MySQL, REST APIs, debugging, testing, and enterprise application development through project-based assignments.",
    techStack: [
      "Java",
      "Angular",
      "MySQL",
      "REST APIs",
      "Git",
      "Debugging",
      "API Testing",
    ],
    outcomes: [
      "Built enterprise application features across Angular frontend and Java REST backend.",
      "Applied MySQL, API integration, Git, debugging, and testing in Agile sprints.",
    ],
  },
  {
    category: "Training Experience",
    company: "Aspire Systems",
    logo: "/experience/Aspire_Systems.webp",
    title: "Graduate Trainee",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: [
      "Enterprise Engineering",
      "Full Stack Foundation",
    ],
    startDate: "Sep 2022",
    endDate: "Jul 2024",
    timeframe: "1 yr 8 mos",
    summary:
      "Completed enterprise software engineering training through mentor-guided development and project-based assignments using Java, Spring Boot, Angular, Node.js, MySQL, and REST APIs.",
    techStack: [
      "Java",
      "Spring Boot",
      "Angular",
      "Node.js",
      "MySQL",
      "REST APIs",
      "OOP",
      "Git",
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
    outcomes: [
      "Built application features across frontend, backend, and relational database layers.",
      "Applied OOP, layered architecture, API integration, Git, debugging, and API testing.",
      "Participated in requirements, implementation, code reviews, debugging, and iterative improvements.",
    ],
  },
];

