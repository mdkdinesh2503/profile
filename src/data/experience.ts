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
const DURATION_SEP = " · ";

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
  const hasFraction = total - full > 0.001;
  return hasFraction ? `${full}+` : `${full}`;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    company: "Aretedge Innovations Pvt Ltd",
    logo: "./experience/Aretedge.jpg",
    title: "Associate Software Engineer",
    location: "Hyderabad, Telangana, India · On-site",
    domains: ["Gaming"],
    startDate: "Aug 2024",
    endDate: "May 2026",
    summary:
      "Full-stack work across frontend, backend, and data layers. Focused on shipping end-to-end features with clear system behavior and measurable performance improvements.",
    outcomes: [
      "Owned end-to-end design of Challenge Module, including backend workflows, database design, and API orchestration.",
      "Architected leaderboard allocation systems for ranking computation, updates, and concurrent score aggregation.",
      "Maintained gaming platform features (tournaments, matchmaking, rewards) serving 20K+ active users.",
      "Designed scalable microservices using Rust, Java, and NestJS for modular, independent deployment.",
      "Implemented REST, GraphQL, and gRPC APIs for low-latency and cross-service communication.",
      "Optimized PostgreSQL and DynamoDB schemas for transactional integrity and real-time read-heavy workloads.",
      "Improved performance using Redis caching, rate limiting, and API gateway patterns.",
      "Managed concurrency-sensitive reward processing and event-driven workflows ensuring system reliability.",
    ],
  },
  {
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Frontend Developer",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Software Development"],
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
      "Completed comprehensive enterprise training in Angular, Java, Node.js, and MySQL, applying skills to internal full-stack applications.",
      "Developed and integrated Angular frontends with Java backend APIs, adhering to strict SDLC and enterprise coding standards.",
      "Collaborated on multi-faceted projects, including student/admin portals and e-commerce flows, focusing on correctness, usability, and API design.",
      "Contributed to UI/UX improvements, active debugging, and feature development within agile project planning workflows.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Java", "Rust", "TypeScript", "JavaScript", "SQL"]
  },
  {
    group: "Backend & APIs",
    items: [
      "NestJS",
      "Spring Boot",
      "Node.js",
      "REST",
      "GraphQL",
      "gRPC",
      "Microservices"
    ],
  },
  {
    group: "Frontend",
    items: ["Angular", "React", "Next.js", "Tailwind CSS"],
  },
  { group: "Databases", items: ["PostgreSQL", "DynamoDB", "MySQL", "Redis"] },
  {
    group: "Tools & Technologies",
    items: ["Git", "GraphQL Gateway", "Redis Streams"],
  },
  {
    group: "Architecture & Concepts",
    items: ["Distributed Systems", "Event-Driven Architecture", "Concurrency Control", "Scalability", "RBAC",
      "Authentication & Authorization", "API Gateway", "Caching", "Database Design", "System Design"]
  }
];