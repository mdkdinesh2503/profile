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
    domains: [
      "Gaming Platform",
      "Java Monolith → Rust Microservices",
      "Distributed Systems",
    ],
    startDate: "Aug 2024",
    endDate: "May 2026",
    summary:
      "Backend-focused work across Java monolithic applications and Rust microservices for a gaming platform serving 20K+ registered users — API design, database modeling, distributed communication, caching, and production support.",
    outcomes: [
      "Owned the end-to-end backend implementation of the Challenge Module, translating business requirements into production-ready workflows through API design, business logic, database modeling, and post-release support.",
      "Engineered backend services for the Casual Games Module, integrating external gaming provider APIs and implementing gameplay, participation, rewards, and leaderboard workflows.",
      "Designed and implemented Double Elimination tournament workflows, translating complex tournament rules into maintainable backend logic that became the foundation for tournament functionality.",
      "Designed and delivered 20+ production backend APIs across Java monoliths and Rust microservices using REST, GraphQL, and gRPC — supporting Challenge, Casual Games, Tournament, Gateway, Membership, Authentication, Notification, Metadata, and Event services.",
      "Developed GraphQL schemas, resolvers, gRPC services, and Protocol Buffer definitions to enable efficient communication between distributed backend services.",
      "Implemented JWT-based authentication, authorization, and Role-Based Access Control (RBAC) to secure player and administrative operations across backend services.",
      "Designed PostgreSQL schemas, relational data models, indexes, JSONB structures, materialized views, and database functions while optimizing SQL queries for transactional gaming workflows.",
      "Designed DynamoDB access patterns by selecting partition keys, sort keys, and Global Secondary Indexes (GSIs) based on application query requirements.",
      "Developed Node.js migration scripts to transform and migrate application data from DynamoDB into optimized PostgreSQL schemas during backend modernization.",
      "Implemented Redis caching strategies using TTL and database fallback mechanisms to reduce repeated database access for leaderboard and high-read workflows.",
      "Supported 25+ production releases by validating backend functionality, coordinating with QA, and managing deployments through Jenkins and ArgoCD pipelines.",
      "Resolved 10+ production incidents and delivered 8+ hotfixes by reproducing issues, analyzing service logs, investigating PostgreSQL and Redis interactions, and implementing validated fixes.",
      "Participated in architecture discussions, sprint planning, API design reviews, and code reviews while authoring API documentation and technical specifications.",
    ],
  },
  {
    category: "Internship & Training",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Graduate Engineer Trainee",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Enterprise Software Engineering"],
    startDate: "Apr 2023",
    endDate: "Jul 2024",
    outcomes: [
      "Completed structured enterprise software engineering training focused on Java, Spring Boot, Angular, Node.js, MySQL, object-oriented programming, and the Software Development Life Cycle (SDLC).",
      "Built enterprise-style full-stack applications by implementing frontend features, backend business logic, REST APIs, relational database operations, debugging, and API testing.",
      "Applied object-oriented programming, layered architecture, modular application design, relational database design, version control, and Agile development practices through project-based assignments.",
    ],
  },
  {
    category: "Internship & Training",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Graduate Engineering Intern",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Enterprise Software Engineering"],
    startDate: "Jan 2023",
    endDate: "Mar 2023",
    outcomes: [
      "Developed enterprise application features using Angular, Java, Node.js, and MySQL following enterprise development standards.",
      "Integrated Angular frontends with Java backend services and REST APIs while participating in Agile development activities.",
    ],
  },
  {
    category: "Internship & Training",
    company: "Aspire Systems",
    logo: "./experience/Aspire_Systems.jpg",
    title: "Graduate Engineer Trainee",
    location: "Chennai, Tamil Nadu, India · Remote",
    domains: ["Enterprise Software Engineering"],
    startDate: "Sep 2022",
    endDate: "Dec 2022",
    outcomes: [
      "Completed foundational enterprise software engineering training in Java, Spring Boot, Angular, Node.js, MySQL, and software architecture through classroom learning and project-based development.",
      "Strengthened practical knowledge of REST APIs, database design, debugging, testing, version control, and collaborative software development.",
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
  {
    group: "Frontend",
    items: ["Next.js", "React", "Angular", "Tailwind CSS"],
  },
  {
    group: "APIs Technologies",
    items: [
      "REST APIs",
      "GraphQL",
      "Apollo GraphQL",
      "gRPC",
      "Protocol Buffers",
    ],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "Redis", "DynamoDB", "MySQL", "MongoDB", "NeonDB"],
  },
  {
    group: "Backend Engineering",
    items: [
      "Backend Development",
      "API Design",
      "Database Design",
      "Data Modeling",
      "Distributed Systems",
      "Microservices",
      "Monolithic Architecture",
      "Event-Driven Architecture",
      "SQL Query Optimization",
      "Redis Caching",
      "Authentication",
      "Authorization",
      "RBAC",
      "Performance Optimization",
      "Production Support",
      "Root Cause Analysis",
      "System Design",
    ],
  },
  {
    group: "DevOps & Developer Tools",
    items: [
      "Git",
      "Docker",
      "Jenkins",
      "ArgoCD",
      "Grafana",
      "Maven",
      "Postman",
      "Altair GraphQL",
      "RedisInsight",
      "pgAdmin",
      "NoSQL Workbench",
      "Termius",
      "Warp",
      "Cursor AI",
    ],
  },
];
