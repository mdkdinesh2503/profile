import type { Blog, BlogMeta } from "@/types";

function isString(x: unknown): x is string {
  return typeof x === "string";
}

const rawByPath = import.meta.glob<string>("../content/blogs/*.md", {
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

function parseBlog(path: string, raw: string): Blog {
  const slug = toSlug(path);
  const parsed = parseFrontmatter(raw);
  const fm = parsed.data;

  const title = isString(fm.title) ? fm.title : slug;
  const date = isString(fm.date) ? fm.date : "2025-01-01";
  const summary = isString(fm.summary) ? fm.summary : "";
  const tags =
    Array.isArray(fm.tags) && fm.tags.every((t) => typeof t === "string")
      ? (fm.tags as string[])
      : [];
  const image = isString(fm.image) ? fm.image : undefined;

  return {
    slug,
    title,
    date,
    summary,
    tags,
    image,
    content: parsed.content.trim(),
  };
}

export function getAllBlogs(): BlogMeta[] {
  const blogs = Object.entries(rawByPath).map(([path, raw]) =>
    parseBlog(path, raw),
  );

  return blogs
    .map(({ content: _c, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): Blog | null {
  const entry = Object.entries(rawByPath).find(
    ([path]) => toSlug(path) === slug,
  );
  if (!entry) return null;
  return parseBlog(entry[0], entry[1]);
}