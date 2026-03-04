/**
 * Build-time sitemap generator. Run after `vite build`.
 * Writes dist/sitemap.xml and dist/robots.txt with correct SITE_URL.
 */
import { readdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const contentDir = join(root, "src", "content");

const SITE_URL = (process.env.VITE_SITE_URL || "https://mdkdinesh2503.netlify.app").replace(/\/$/, "");

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

const staticPaths = ["/", "/projects", "/experience", "/blogs", "/resume", "/contact"];
const blogUrls = blogSlugs.map((s) => `/blogs/${s}`);
const projectUrls = projectSlugs.map((s) => `/projects/${s}`);
const allPaths = [...staticPaths, ...blogUrls, ...projectUrls];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : path.split("/").length === 2 ? "0.9" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run vite build first.");
  process.exit(1);
}

writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(distDir, "robots.txt"), robots, "utf8");
console.log("Wrote dist/sitemap.xml and dist/robots.txt");
console.log(`  ${allPaths.length} URLs, SITE_URL=${SITE_URL}`);