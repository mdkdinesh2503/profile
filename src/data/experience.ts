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

export function getDisplayTimeframe(item: ExperienceItem): string {
  const range = item.timeframe ?? formatDateRange(item.startDate, item.endDate);
  const months = getItemDurationMonths(item);
  return `${range}${DURATION_SEP}${formatDuration(months)}`;
}

export function getYearsExperience(items: ExperienceItem[]): string {
  const total = items
    .filter((item) => !EXCLUDED_FROM_YEARS.has(item.company))
    .reduce((sum, item) => sum + getItemDurationMonths(item) / 12, 0);

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
    title: "Software Engineer",
    location: "Hyderabad, Telangana, India · On-site",
    startDate: "Aug 2024",
    endDate: null,
    summary:
      "Full-stack work across frontend, backend, and data layers. Focused on shipping end-to-end features with clear system behavior and measurable performance improvements.",
    outcomes: [
      "Core workflows for tournaments, challenges, casual games, membership, events, and leaderboard.",
      "APIs (gRPC, GraphQL, REST) for game services, events, and user features.",
      "Redis caching and performance improvements under production constraints.",
      "Postgres and DynamoDB for tournaments, events, leaderboard; schema and data modeling.",
    ],
  },
  {
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    location: "Chennai, Tamil Nadu, India · Remote",
    startDate: "Sep 2022",
    endDate: "Dec 2023",
    roles: [
      {
        title: "Frontend Developer",
        employmentType: "Apprenticeship",
        timeframe: "Apr 2023 — Dec 2023 · 9 mos",
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
      "Completed a successful internship with hands-on full-stack exposure and enterprise delivery workflows.",
      "Successfully completed 2–3 projects using Angular, Java, and MySQL with focus on correctness and usability.",
      "Collaborated with the team on student/admin portal and e-commerce flows; strengthened API design and debugging skills.",
      "Demonstrated proficiency in front-end development and actively participated in project planning and communication.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: [
      "Angular",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
    ],
  },
  {
    group: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Rust",
      "Node.js",
      "NestJS",
      "gRPC",
      "GraphQL",
      "REST",
    ],
  },
  { group: "Data", items: ["PostgreSQL", "MySQL", "DynamoDB"] },
  { group: "Infra", items: ["Redis (caching)"] },
  { group: "Tools", items: ["Git", "Bitbucket", "GitHub", "GitLab"] },
];