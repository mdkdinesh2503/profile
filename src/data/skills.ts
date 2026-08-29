import {
  Code2, Layers, Globe, Zap, Database, Server, Wrench, Activity,
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
