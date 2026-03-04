/**
 * Shared YAML frontmatter parser for Markdown content.
 * Used by blogs and projects; validates and applies sensible defaults.
 */

export function stripQuotes(s: string): string {
  const t = s.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

export function parseTags(value: string, followingLines: string[]): string[] {
  const v = value.trim();
  if (v.startsWith("[") && v.endsWith("]")) {
    try {
      const parsed = JSON.parse(v) as unknown;
      if (Array.isArray(parsed) && parsed.every((t) => typeof t === "string")) {
        return parsed;
      }
    } catch {
      // fall through to list parsing
    }
  }
  const block = followingLines
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim())
    .filter(Boolean);
  return block.length ? block : [];
}

export type ParsedFrontmatter = {
  data: Record<string, unknown>;
  content: string;
};

export function parseFrontmatter(raw: string): ParsedFrontmatter {
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

/** Slug from content file path (e.g. "path/to/post.md" -> "post"). */
export function slugFromPath(path: string): string {
  const file = path.split("/").at(-1) ?? "";
  return file.replace(/\.md$/, "");
}

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function ensureString(fm: Record<string, unknown>, key: string, fallback: string): string {
  const v = fm[key];
  return isString(v) ? v : fallback;
}

export function ensureStringOptional(fm: Record<string, unknown>, key: string): string | undefined {
  const v = fm[key];
  return isString(v) ? v : undefined;
}

export function ensureTags(fm: Record<string, unknown>): string[] {
  const v = fm.tags;
  if (Array.isArray(v) && v.every((t) => typeof t === "string")) return v as string[];
  return [];
}
