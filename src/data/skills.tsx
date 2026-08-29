import {
  Code2, Layers, Globe, Zap, Database, Server, Wrench, Activity,
  Cpu, ShieldCheck, BookOpen, Flame, Sparkles
} from "lucide-react";
import {
  SiRust, SiTypescript, SiJavascript,
  SiSpring, SiNestjs, SiNodedotjs,
  SiNextdotjs, SiAngular, SiReact,
  SiGraphql, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiJenkins, SiArgo, SiGrafana,
  SiGit, SiApachemaven, SiPostman,
} from "react-icons/si";
import type { ElementType } from "react";
import type { SkillGroup } from "@/types";

// ─── Types ───────────────────────────────────────────────────────────────────
export type SkillIconMeta = { icon: ElementType; color: string };

// ─── Skill icon + brand-color map ────────────────────────────────────────────
export const SKILL_ICON_MAP: Record<string, SkillIconMeta> = {
  // Languages
  "Java":                        { icon: Code2,          color: "#f89820" },
  "Rust":                        { icon: SiRust,         color: "#ce422b" },
  "TypeScript":                  { icon: SiTypescript,   color: "#3178c6" },
  "JavaScript":                  { icon: SiJavascript,   color: "#f7df1e" },
  "SQL":                         { icon: Database,       color: "#a78bfa" },

  // Backend frameworks
  "Spring Framework":            { icon: SiSpring,       color: "#6db33f" },
  "Spring Boot":                 { icon: SiSpring,       color: "#6db33f" },
  "Spring MVC":                  { icon: SiSpring,       color: "#6db33f" },
  "Spring Data JPA":             { icon: SiSpring,       color: "#6db33f" },
  "Axum":                        { icon: SiRust,         color: "#ce422b" },
  "Tokio":                       { icon: SiRust,         color: "#ce422b" },
  "Tonic":                       { icon: SiRust,         color: "#ce422b" },
  "NestJS":                      { icon: SiNestjs,       color: "#e0234e" },
  "Node.js":                     { icon: SiNodedotjs,    color: "#339933" },

  // Frontend
  "Next.js":                     { icon: SiNextdotjs,    color: "#ffffff" },
  "Angular":                     { icon: SiAngular,      color: "#dd0031" },
  "React":                       { icon: SiReact,        color: "#61dafb" },

  // APIs & protocols
  "REST APIs":                   { icon: Globe,          color: "#60a5fa" },
  "GraphQL":                     { icon: SiGraphql,      color: "#e10098" },
  "gRPC":                        { icon: Zap,            color: "#a78bfa" },
  "Protocol Buffers":            { icon: Layers,         color: "#60a5fa" },
  "Third-Party API Integration": { icon: Globe,          color: "#34d399" },

  // Databases
  "PostgreSQL":                  { icon: SiPostgresql,   color: "#336791" },
  "MySQL":                       { icon: SiMysql,        color: "#4479a1" },
  "DynamoDB":                    { icon: Database,       color: "#4053d6" },
  "Redis":                       { icon: SiRedis,        color: "#dc382d" },
  "ElastiCache/Valkey":          { icon: SiRedis,        color: "#dc382d" },

  // Cloud & infra
  "AWS":                         { icon: Server,         color: "#ff9900" },
  "AWS SQS":                     { icon: Zap,            color: "#ff9900" },
  "Docker":                      { icon: SiDocker,       color: "#2496ed" },
  "ECR":                         { icon: Server,         color: "#ff9900" },
  "EKS Deployment":              { icon: Server,         color: "#ff9900" },
  "CloudWatch":                  { icon: Activity,       color: "#ff9900" },

  // CI/CD & observability
  "Jenkins":                     { icon: SiJenkins,      color: "#d33833" },
  "ArgoCD":                      { icon: SiArgo,         color: "#ef7b4d" },
  "Grafana":                     { icon: SiGrafana,      color: "#f46800" },

  // Dev tools
  "Git":                         { icon: SiGit,          color: "#f05032" },
  "Maven":                       { icon: SiApachemaven,  color: "#c71a36" },
  "Cargo":                       { icon: SiRust,         color: "#ce422b" },
  "Postman":                     { icon: SiPostman,      color: "#ff6c37" },
  "Altair GraphQL":              { icon: SiGraphql,      color: "#e10098" },
  "RedisInsight":                { icon: SiRedis,        color: "#dc382d" },
  "pgAdmin":                     { icon: SiPostgresql,   color: "#336791" },
  "NoSQL Workbench":             { icon: Database,       color: "#4053d6" },
};

// ─── Skills pillar display config ────────────────────────────────────────────
// All pillars share the same gradient and glow — only the icon varies per group.
export const PILLAR_GRADIENT = "from-sky-400 to-indigo-500";
export const PILLAR_GLOW     = "rgba(56,189,248,0.35)";

export const PILLAR_ICONS: ElementType[] = [
  Code2, Server, Globe, Zap, Database, Layers, Server, Wrench,
];

// ─── Unified Tech Icon Helper ────────────────────────────────────────────────
export function getTechIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("rust") || lower.includes("axum") || lower.includes("tokio") || lower.includes("tonic")) {
    return <SiRust className="text-primary" size={13} />;
  }
  if (lower.includes("spring") || lower.includes("java")) {
    return <SiSpring className="text-primary" size={13} />;
  }
  if (lower.includes("nest")) {
    return <SiNestjs className="text-primary" size={13} />;
  }
  if (lower.includes("postgres") || lower.includes("sql")) {
    return <SiPostgresql className="text-primary" size={13} />;
  }
  if (lower.includes("redis") || lower.includes("valkey")) {
    return <SiRedis className="text-primary" size={13} />;
  }
  if (lower.includes("docker")) {
    return <SiDocker className="text-primary" size={13} />;
  }
  if (lower.includes("jenkins")) {
    return <SiJenkins className="text-primary" size={13} />;
  }
  if (lower.includes("argo")) {
    return <SiArgo className="text-primary" size={13} />;
  }
  if (lower.includes("grafana")) {
    return <SiGrafana className="text-primary" size={13} />;
  }
  if (lower.includes("angular")) {
    return <SiAngular className="text-primary" size={13} />;
  }
  if (lower.includes("node")) {
    return <SiNodedotjs className="text-primary" size={13} />;
  }
  if (lower.includes("typescript")) {
    return <SiTypescript className="text-primary" size={13} />;
  }
  if (lower.includes("javascript")) {
    return <SiJavascript className="text-primary" size={13} />;
  }
  if (lower.includes("graphql")) {
    return <Zap className="text-primary" size={13} />;
  }
  if (lower.includes("grpc") || lower.includes("proto")) {
    return <Layers className="text-primary" size={13} />;
  }
  if (lower.includes("aws") || lower.includes("dynamo")) {
    return <Database className="text-primary" size={13} />;
  }
  return <Code2 className="text-primary" size={13} />;
}

// ─── Highlight Section Icons ────────────────────────────────────────────────
export function getHighlightIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("ownership") || lower.includes("feature")) {
    return <Flame className="h-4 w-4 text-primary shrink-0" />;
  }
  if (lower.includes("distributed") || lower.includes("microservice") || lower.includes("backend")) {
    return <Cpu className="h-4 w-4 text-primary shrink-0" />;
  }
  if (lower.includes("production") || lower.includes("lifecycle") || lower.includes("engineering")) {
    return <ShieldCheck className="h-4 w-4 text-primary shrink-0" />;
  }
  if (lower.includes("advanced") || lower.includes("training")) {
    return <BookOpen className="h-4 w-4 text-primary shrink-0" />;
  }
  return <Sparkles className="h-4 w-4 text-primary shrink-0" />;
}

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Java", "Rust", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "Backend",
    items: [
      "Spring Framework",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "Axum",
      "Tokio",
      "Tonic",
      "NestJS",
      "Node.js",
    ],
  },
  {
    group: "Frontend",
    items: ["Next.js", "Angular", "React"],
  },
  {
    group: "APIs & Integration",
    items: [
      "REST APIs",
      "GraphQL",
      "gRPC",
      "Protocol Buffers",
      "Third-Party API Integration",
    ],
  },
  {
    group: "Databases & Caching",
    items: ["PostgreSQL", "MySQL", "DynamoDB", "Redis", "ElastiCache/Valkey"],
  },
  {
    group: "Cloud, Messaging & DevOps",
    items: [
      "AWS",
      "AWS SQS",
      "Docker",
      "ECR",
      "EKS Deployment",
      "CloudWatch",
      "Jenkins",
      "ArgoCD",
      "Grafana",
    ],
  },
  {
    group: "Developer Tools",
    items: [
      "Git",
      "Maven",
      "Cargo",
      "Postman",
      "Altair GraphQL",
      "RedisInsight",
      "pgAdmin",
      "NoSQL Workbench",
    ],
  },
];
