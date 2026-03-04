import type { Blog, BlogMeta } from "@/types";
import {
  parseFrontmatter,
  slugFromPath,
  isString,
  ensureTags,
} from "./frontmatter";

const rawByPath = import.meta.glob<string>("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseBlog(path: string, raw: string): Blog {
  const slug = slugFromPath(path);
  const parsed = parseFrontmatter(raw);
  const fm = parsed.data;

  const title = isString(fm.title) ? fm.title : slug;
  const date = isString(fm.date) ? fm.date : "2025-01-01";
  const summary = isString(fm.summary) ? fm.summary : "";
  const tags = ensureTags(fm);
  const image = isString(fm.image) ? fm.image : undefined;
  const readTime =
    typeof fm.readTime === "number" && fm.readTime > 0
      ? fm.readTime
      : typeof fm.readTime === "string"
        ? (() => {
            const n = parseInt(fm.readTime as string, 10);
            return Number.isFinite(n) && n > 0 ? n : undefined;
          })()
        : undefined;

  return {
    slug,
    title,
    date,
    summary,
    tags,
    image,
    readTime,
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
    ([path]) => slugFromPath(path) === slug,
  );
  if (!entry) return null;
  return parseBlog(entry[0], entry[1]);
}
