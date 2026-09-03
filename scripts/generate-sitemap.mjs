/**
 * Build-time sitemap and robots.txt generator.
 * Runs after `vite build` via: node scripts/generate-sitemap.mjs
 *
 * Domain Migration Note:
 * Set VITE_SITE_URL in your environment (e.g., Netlify) to update all URLs automatically.
 * Future: Change VITE_SITE_URL=https://mdkdinesh.in and rebuild.
 */
import { readdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const contentDir = join(root, "src", "content");

const SITE_URL = (process.env.VITE_SITE_URL || "https://mdkdinesh2503.netlify.app").replace(/\/+$/, "");

function slugFromPath(filePath) {
  const base = filePath.replace(/\.md$/, "");
  return base.split(/[/\\]/).pop() || base;
}

function listMarkdownFiles(dir, base = "") {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      files.push(...listMarkdownFiles(full, rel));
    } else if (e.isFile() && e.name.endsWith(".md")) {
      files.push(rel);
    }
  }
  return files;
}

const blogFiles = listMarkdownFiles(join(contentDir, "blogs"));
const projectFiles = listMarkdownFiles(join(contentDir, "projects"));

const blogSlugs = blogFiles.map((f) => slugFromPath(f));
const projectSlugs = projectFiles.map((f) => slugFromPath(f));

// Priority levels for sitemap
const staticPaths = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/experience", changefreq: "monthly", priority: "0.9" },
  { path: "/blogs", changefreq: "weekly", priority: "0.8" },
  { path: "/resume", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

const blogUrls = blogSlugs.map((s) => ({
  path: `/blogs/${s}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const projectUrls = projectSlugs.map((s) => ({
  path: `/projects/${s}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const allUrls = [...staticPaths, ...blogUrls, ...projectUrls];
const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(
      ({ path, changefreq, priority }) =>
        `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

# Disallow non-public utility paths
Disallow: /dist/

Sitemap: ${SITE_URL}/sitemap.xml
`;

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run vite build first.");
  process.exit(1);
}

writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(distDir, "robots.txt"), robots, "utf8");

console.log("✓ Wrote dist/sitemap.xml and dist/robots.txt");
console.log(`  ${allUrls.length} URLs, SITE_URL=${SITE_URL}`);