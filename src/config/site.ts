/**
 * Canonical site URL for SEO (canonical, og:url, sitemap).
 * Set VITE_SITE_URL in build env (e.g. Netlify) for production.
 */
export const SITE_URL =
  (typeof import.meta !== "undefined" && (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL) ||
  "https://mdkdinesh2503.netlify.app/";

export function absolutePath(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
