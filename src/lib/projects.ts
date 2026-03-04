import type { ProjectCategory, ProjectPost, ProjectPostMeta } from "@/types";
import {
  parseFrontmatter,
  slugFromPath,
  isString,
  ensureTags,
} from "./frontmatter";

const rawByPath = import.meta.glob<string>("../content/projects/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseProject(path: string, raw: string): ProjectPost {
  const slug = slugFromPath(path);
  const parsed = parseFrontmatter(raw);
  const fm = parsed.data;

  const name = isString(fm.name) ? fm.name : slug;
  const summary = isString(fm.summary) ? fm.summary : "";
  const role = isString(fm.role) ? fm.role : undefined;
  const timeline = isString(fm.timeline) ? fm.timeline : undefined;
  const rawCategory = isString(fm.category)
    ? fm.category.toLowerCase().replace(/\s+/g, "-")
    : "";
  const category: ProjectCategory =
    rawCategory === "academic"
      ? "academic"
      : rawCategory === "self-learn"
        ? "self-learn"
        : "real-time";
  const context = isString(fm.context) ? fm.context : undefined;
  const stackNote = isString(fm.stackNote) ? fm.stackNote : undefined;
  const image = isString(fm.image) ? fm.image : undefined;
  const demoUrl = isString(fm.demoUrl) ? fm.demoUrl : undefined;
  const repoUrl = isString(fm.repoUrl) ? fm.repoUrl : undefined;
  const year = isString(fm.year) ? fm.year : undefined;
  const demoStack = isString(fm.demoStack) ? fm.demoStack : undefined;
  const originalStack = isString(fm.originalStack) ? fm.originalStack : undefined;
  const tags = ensureTags(fm);

  return {
    slug,
    name,
    summary,
    role,
    timeline,
    category,
    context,
    stackNote,
    image,
    demoUrl,
    repoUrl,
    year,
    demoStack,
    originalStack,
    tags,
    content: parsed.content.trim(),
  };
}

/** Sort by year ascending (oldest first); projects without year go last. */
function sortByYear(projects: ProjectPostMeta[]): ProjectPostMeta[] {
  return [...projects].sort((a, b) => {
    const yearA = a.year ?? "";
    const yearB = b.year ?? "";
    if (yearA && yearB) return yearA.localeCompare(yearB);
    if (yearA) return -1;
    if (yearB) return 1;
    return 0;
  });
}

export function getAllProjects(): ProjectPostMeta[] {
  const projects = Object.entries(rawByPath).map(([path, raw]) =>
    parseProject(path, raw),
  );
  const metaList = projects.map(({ content: _c, ...meta }) => meta);
  return sortByYear(metaList);
}

export function getProjectBySlug(slug: string): ProjectPost | null {
  const entry = Object.entries(rawByPath).find(
    ([path]) => slugFromPath(path) === slug,
  );
  if (!entry) return null;
  return parseProject(entry[0], entry[1]);
}

/** Year-like string for sorting (prefer year, else timeline e.g. "2025") */
function sortYear(meta: ProjectPostMeta): string {
  return meta.year ?? meta.timeline ?? "";
}

export function getProjectsByCategory(
  category: ProjectCategory,
): ProjectPostMeta[] {
  const list = getAllProjects().filter((p) => p.category === category);
  if (category === "real-time") {
    return [...list].sort((a, b) => {
      const ya = sortYear(a);
      const yb = sortYear(b);
      if (ya && yb) return yb.localeCompare(ya);
      if (ya) return -1;
      if (yb) return 1;
      return 0;
    });
  }
  return list;
}

/** Academic + self-learn projects (same section, View/Code links) */
export function getLearningProjects(): ProjectPostMeta[] {
  return getAllProjects().filter(
    (p) => p.category === "academic" || p.category === "self-learn",
  );
}
