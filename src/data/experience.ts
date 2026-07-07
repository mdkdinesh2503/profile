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
    category: "Professional Experience",
    company: "Aretedge Innovations Pvt. Ltd.",
    logo: "./experience/Aretedge.jpg",
    title: "Associate Software Engineer",
    location: "Hyderabad, Telangana, India · On-site",
    domains: ["Gaming and ESports", "Software Development", "Digital Platform Engineering"],
    startDate: "Aug 2024",
    endDate: "May 2026",
    summary:
      "Full-stack work across frontend, backend, and data layers. Focused on shipping end-to-end features with clear system behavior and measurable performance improvements.",
    outcomes: [
      "Owned the end-to-end design and implementation of the Challenge Module, delivering backend workflows, business logic, API orchestration, and database design.",
      "Architected leaderboard allocation and ranking systems supporting score computation, rank updates, and concurrency-aware aggregation workflows.",
      "Delivered backend services supporting tournament management, matchmaking, rewards, and core gaming platform functionality serving more than 20K active users.",
      "Engineered scalable microservices using Java, Spring Boot, Rust, and NestJS following service-oriented architecture principles for modular deployment and maintainability.",
      "Designed and integrated RESTful APIs, GraphQL endpoints, and gRPC services to enable efficient communication across distributed services.",
      "Modeled relational schemas in PostgreSQL while optimizing DynamoDB access patterns for transactional and read-intensive workloads.",
      "Enhanced service responsiveness through Redis caching, API Gateway integration, and request rate-limiting strategies.",
      "Built event-driven reward processing workflows with concurrency-aware execution to improve consistency and reliability across distributed services.",
      "Monitored production services, analyzed application logs, investigated backend issues, and resolved production defects while supporting release activities using Docker, Jenkins, and ArgoCD.",
      "Collaborated with product managers, QA engineers, and cross-functional teams in Agile Scrum environments through sprint planning, code reviews, defect resolution, and iterative production releases."
    ],
  },
  {
    category: "Internship Experience",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Software Engineering Intern",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Banking/Finance (BFS)", "Retail/Commerce", "Software Development", "Product Engineering"],
    startDate: "Jan 2023",
    endDate: "Mar 2023",
    outcomes: [
      "Developed enterprise application features using Angular, Java, Node.js, and MySQL.",
      "Integrated Angular frontends with Java backend services and RESTful APIs following enterprise development standards.",
      "Enhanced application functionality through debugging, testing, issue resolution, and UI improvements.",
      "Participated in Agile development activities including requirement discussions, peer code reviews, and sprint delivery."
    ],
  },
  {
    category: "Professional Training",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Software Engineer Trainee",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Banking/Finance (BFS)", "Retail/Commerce", "Software Development", "Product Engineering"],
    startDate: "Sep 2022",
    endDate: "Jun 2024",
    outcomes: [
      "Completed structured enterprise training in Java, Spring Boot, Angular, Node.js, MySQL, object-oriented programming, software engineering principles, SDLC, and application architecture.",
      "Built full-stack applications and completed project-based assignments following enterprise coding standards and development best practices.",
      "Strengthened practical knowledge of REST APIs, database design, debugging, testing, version control, and collaborative software development."
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Java", "Rust", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "Backend Technologies",
    items: [
      "Spring Framework",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "NestJS",
      "Node.js",
    ],
  },
  { group: "API & Communication", items: ["RESTfull APIs", "GraphQL", "gRPC"] },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Angular", "Tailwind CSS"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "DynamoDB", "Redis", "MongoDB", "NeonDB"],
  },
  {
    group: "Architecture & Engineering",
    items: [
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
      "API Design",
      "Backend Services",
      "Database Design",
      "Data Modeling",
      "Security & Auth (RBAC)",
      "API Gateway",
      "Caching",
      "Concurrency Control",
      "Scalability",
      "System Design"
    ],
  },
  {
    group: "Tools & Technologies",
    items: [
      "Git",
      "GitHub",
      "Maven",
      "Docker",
      "Jenkins",
      "ArgoCD",
      "Cursor",
      "Redis Streams",
      "GraphQL Gateway",
    ],
  },
];