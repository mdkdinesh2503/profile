import type { ProjectCategory, ProjectPost, ProjectPostMeta } from "@/types";

function isString(x: unknown): x is string {
  return typeof x === "string";
}

const rawByPath = import.meta.glob<string>("../content/projects/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function toSlug(path: string) {
  const file = path.split("/").at(-1) ?? "";
  return file.replace(/\.md$/, "");
}

function stripQuotes(s: string) {
  const t = s.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

function parseTags(value: string, followingLines: string[]) {
  const v = value.trim();

  if (v.startsWith("[") && v.endsWith("]")) {
    try {
      const parsed = JSON.parse(v) as unknown;
      if (Array.isArray(parsed) && parsed.every((t) => typeof t === "string")) {
        return parsed;
      }
    } catch {}
  }

  const block = followingLines
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim())
    .filter(Boolean);

  if (block.length) return block;
  return [];
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  const fmBlock = raw.slice(3, end).trim();
  const content = raw.slice(end + "\n---".length).trim();

  const lines = fmBlock.split(/\r?\n/);
  const data: Record<string, unknown> = {};

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    if (!key) continue;

    if (key === "tags") {
      data.tags = parseTags(value, lines.slice(i + 1));
      continue;
    }

    data[key] = stripQuotes(value);
  }

  return { data, content };
}

function parseProject(path: string, raw: string): ProjectPost {
  const slug = toSlug(path);
  const parsed = parseFrontmatter(raw);
  const fm = parsed.data;

  const name = isString(fm.name) ? fm.name : slug;
  const summary = isString(fm.summary) ? fm.summary : "";
  const role = isString(fm.role) ? fm.role : undefined;
  const timeline = isString(fm.timeline) ? fm.timeline : undefined;
  const rawCategory = isString(fm.category) ? fm.category.toLowerCase().replace(/\s+/g, "-") : "";
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
  const tags =
    Array.isArray(fm.tags) && fm.tags.every((t) => typeof t === "string")
      ? (fm.tags as string[])
      : [];

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
    ([path]) => toSlug(path) === slug,
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
