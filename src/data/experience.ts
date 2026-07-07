import type { ExperienceItem, SkillGroup } from "@/types";

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

/** Duration only, e.g. "1 yr 2 mos", for use with a calendar icon. */
export function getDisplayDuration(item: ExperienceItem): string {
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
  } else if (fraction > 0.001) {
    return `${full}+`;
  }

  return `${full}`;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    company: "Aretedge Innovations Pvt Ltd",
    logo: "./experience/Aretedge.jpg",
    title: "Associate Software Engineer",
    location: "Hyderabad, Telangana, India · On-site",
    domains: ["Gaming and ESports", "Software Development", "Digital Platform Engineering"],
    startDate: "Aug 2024",
    endDate: "May 2026",
    summary:
      "Full-stack work across frontend, backend, and data layers. Focused on shipping end-to-end features with clear system behavior and measurable performance improvements.",
    outcomes: [
      "Owned the end-to-end design and implementation of the Challenge Module, including backend workflows, API orchestration, business logic implementation, and database design.",
      "Architected leaderboard allocation and ranking systems supporting score computation, rank updates, and concurrency-sensitive aggregation workflows.",
      "Developed and maintained backend services powering tournaments, matchmaking, rewards, and gaming platform functionality serving 20K+ active users.",
      "Engineered scalable microservices using Rust, Java, and NestJS, enabling modular deployment and maintainable service-oriented architecture.",
      "Implemented REST APIs, GraphQL integrations, and gRPC services to support low-latency communication and cross-service interoperability.",
      "Designed and optimized PostgreSQL and DynamoDB data models for transactional processing and real-time read-heavy workloads.",
      "Enhanced backend performance through Redis caching strategies, rate limiting mechanisms, and API gateway integration patterns.",
      "Implemented event-driven workflows and concurrency-aware reward processing systems to improve reliability and consistency across distributed services.",
      "Collaborated with cross-functional teams to deliver production-ready software features across backend and platform components."
    ],
  },
  {
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Frontend Developer",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Banking/Finance (BFS)", "Retail/Commerce", "Software Development", "Product Engineering"],
    startDate: "Sep 2022",
    endDate: "Jun 2024",
    roles: [
      {
        title: "Frontend Developer",
        employmentType: "Apprenticeship",
        timeframe: "Apr 2023 — Jun 2024 · 1 yr 3 mos",
      },
      {
        title: "Frontend Developer",
        employmentType: "Internship",
        timeframe: "Jan 2023 — Mar 2023 · 3 mos",
      },
      {
        title: "Frontend Developer",
        employmentType: "Apprenticeship",
        timeframe: "Sep 2022 — Dec 2022 · 4 mos",
      },
    ],
    outcomes: [
      "Completed enterprise-focused training in Java, Angular, Node.js, MySQL, software development practices, and application architecture fundamentals.",
      "Integrated Angular-based user interfaces with Java backend services and REST APIs following enterprise SDLC processes and coding standards.",
      "Contributed to feature implementation, debugging, testing, and UI enhancements for internal enterprise applications.",
      "Participated in software development lifecycle activities including requirement analysis, development, issue resolution, and code reviews."
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Java", "Rust", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "Backend & APIs",
    items: [
      "Spring Boot",
      "NestJS",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "gRPC",
    ],
  },
  {
    group: "Frontend", 
    items: ["Next.js", "Angular", "React.js", "Tailwind CSS"],
  },
  {
    group: "Databases & Caching",
    items: ["PostgreSQL", "DynamoDB", "MySQL", "MongoDB", "Redis"],
  },
  {
    group: "Architecture & Engineerings",
    items: [
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
      "System Design",
      "API Design",
      "Data Modeling",
      "Scalability",
      "Performance Optimization",
      "Security & Auth (RBAC)",
    ],
  },
  {
    group: "DevOps, Tools & Infrastructure",
    items: [
      "Git",
      "GitHub",
      "Jenkins",
      "ArgoCD",
      "API Gateway",
      "Redis Streams",
      "GraphQL Gateway",
      "Cursor",
    ],
  },
];