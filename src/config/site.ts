/**
 * Central site configuration for SEO, Canonical URLs, and Analytics.
 *
 * Migration Note:
 * When migrating to a custom domain (e.g., https://mdkdinesh.in),
 * either update VITE_SITE_URL in your environment/Netlify or update the fallback below.
 */

const envSiteUrl =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env.VITE_SITE_URL as string | undefined)
    : undefined;

export const SITE_URL: string = (
  envSiteUrl || "https://mdkdinesh2503.netlify.app"
).replace(/\/+$/, "");

export const GA_MEASUREMENT_ID: string | undefined =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim()
    : undefined;

export const GOOGLE_SITE_VERIFICATION: string | undefined =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined)?.trim()
    : undefined;

/**
 * Returns an absolute URL based on the current canonical SITE_URL.
 */
export function absolutePath(path: string): string {
  const base = SITE_URL.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
