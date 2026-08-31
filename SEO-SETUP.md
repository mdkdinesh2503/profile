# SEO, Analytics & Search Console Setup Guide

> **Portfolio:** `https://mdkdinesh2503.netlify.app`
> **Owner:** Dinesh Kumar M — Backend-focused Software Engineer

---

## Table of Contents

1. [Environment Variables](#1-environment-variables)
2. [Netlify — Build Environment Setup](#2-netlify--build-environment-setup)
3. [Google Analytics 4 — Stream Setup](#3-google-analytics-4--stream-setup)
4. [Google Search Console — Verification & Sitemap](#4-google-search-console--verification--sitemap)
5. [GA4 Custom Event Reference](#5-ga4-custom-event-reference)
6. [Domain Migration (mdkdinesh.in)](#6-domain-migration-mdkdineshin)
7. [Ongoing Maintenance Checklist](#7-ongoing-maintenance-checklist)

---

## 1. Environment Variables

Three variables drive the entire SEO + Analytics stack. Set them in your local `.env` AND in Netlify Dashboard.

| Variable | Purpose | Example Value |
|---|---|---|
| `VITE_SITE_URL` | Canonical domain for sitemap, OG tags, schema.org | `https://mdkdinesh2503.netlify.app` |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `VITE_GOOGLE_SITE_VERIFICATION` | GSC HTML meta tag verification token | `abc123xyz...` |

Copy `.env.example` to `.env` and fill in real values. Never commit `.env` to Git.

---

## 2. Netlify — Build Environment Setup

Build command: `bun run build` | Publish directory: `dist` | Node: 20

### Add Environment Variables

1. Netlify Dashboard → Site Configuration → Environment Variables
2. Add the three variables from §1
3. Trigger a redeploy

### What the build produces

- Compiles React/Vite
- Generates `dist/sitemap.xml` with all URLs (static + blogs + projects)
- Generates `dist/robots.txt`
- Injects GA4 and GSC tokens at build time

---

## 3. Google Analytics 4 — Stream Setup

Your Measurement ID `G-H3HGHWKT28` is already in `.env`.

### Verify Stream

1. analytics.google.com → Admin → Data Streams → Your Stream
2. Confirm the Measurement ID and stream URL match your domain

### Privacy-Safe Config (pre-implemented)

```js
// In src/lib/analytics.ts
anonymize_ip: true,      // Anonymizes last IP octet
send_page_view: false,   // Manual page_view via useAnalytics.ts on each route
```

### Set Data Retention

Admin → Data Settings → Data Retention → 14 months

### Verify Events in Realtime

After deploying, open GA4 → Realtime and navigate your site.

| Event | Fires When |
|---|---|
| `page_view` | Every route change |
| `resume_click` | Download PDF click on /resume |
| `github_click` | GitHub icon in header or footer |
| `linkedin_click` | LinkedIn icon in header or footer |

---

## 4. Google Search Console — Verification & Sitemap

### Verify Ownership

Your token is already in `.env`:
`VITE_GOOGLE_SITE_VERIFICATION=meWVQqShK5gUsCHN6Jrjw4tzqVEl8yHsIx6VNvxq39A`

Steps:
1. search.google.com/search-console → Add property → `https://mdkdinesh2503.netlify.app`
2. Choose HTML tag verification method
3. Click Verify — Google finds the meta tag in your deployed `<head>`

### Submit Sitemap

GSC → Sitemaps → Enter `sitemap.xml` → Submit

Google crawls: `https://mdkdinesh2503.netlify.app/sitemap.xml`

### Sitemap Contents

| URL | Priority | Freq |
|---|---|---|
| `/` Homepage | 1.0 | weekly |
| `/projects` | 0.9 | weekly |
| `/experience` | 0.9 | monthly |
| `/blogs` | 0.8 | weekly |
| `/resume` | 0.8 | monthly |
| `/contact` | 0.7 | monthly |
| `/blogs/[slug]` | 0.7 | monthly |
| `/projects/[slug]` | 0.8 | monthly |

### Request Indexing for Key Pages

GSC → URL Inspection → Request Indexing for:
- `https://mdkdinesh2503.netlify.app/`
- `https://mdkdinesh2503.netlify.app/experience`
- `https://mdkdinesh2503.netlify.app/projects`
- `https://mdkdinesh2503.netlify.app/resume`

---

## 5. GA4 Custom Event Reference

```ts
import { trackEvent } from "@/lib/analytics";

trackEvent("resume_click", { destination: "/resume.pdf" });
trackEvent("github_click", { section: "header", destination: "https://github.com/..." });
```

Currently tracked events: `page_view`, `resume_click`, `github_click`, `linkedin_click`

Suggested additions:
- `project_demo_click` — when user opens a project demo
- `blog_read` — when user reaches the end of a blog post
- `contact_click` — when user clicks the email link

---

## 6. Domain Migration (mdkdinesh.in)

Only one environment variable needs to change:

1. Buy `mdkdinesh.in` and point DNS to Netlify
2. Add custom domain in Netlify Dashboard → Domain Management
3. Update Netlify env var: `VITE_SITE_URL=https://mdkdinesh.in`
4. Trigger redeploy

**Auto-updated:** sitemap URLs, robots.txt, canonical tags, OG URLs, schema.org

**Manual:** Add new GSC property, re-verify, re-submit sitemap

**Add 301 redirect in netlify.toml:**
```toml
[[redirects]]
  from   = "https://mdkdinesh2503.netlify.app/*"
  to     = "https://mdkdinesh.in/:splat"
  status = 301
  force  = true
```

---

## 7. Ongoing Maintenance Checklist

### After Every Deploy
- [ ] Verify `sitemap.xml` and `robots.txt` load at the production URL
- [ ] Open GA4 Realtime and confirm page_view fires on navigation

### When Adding Blog Posts
- [ ] Create `.md` in `src/content/blogs/[slug].md` — sitemap auto-updates on build

### When Adding Projects
- [ ] Create `.md` in `src/content/projects/[category]/[slug].md` — sitemap auto-updates

### Monthly
- [ ] GSC Performance → Queries: review impressions and CTR
- [ ] GA4 Engagement: identify top pages

### Quarterly
- [ ] GSC Core Web Vitals: review LCP, CLS, INP
- [ ] Refresh meta descriptions on low-CTR pages
- [ ] Verify schema.org markup at schema.org/ShEx validator

---

## Architecture

```
.env / Netlify Env Vars
  VITE_SITE_URL               sitemap.xml, robots.txt, canonical, og:url, schema.org
  VITE_GA_MEASUREMENT_ID      analytics.ts (gtag init) + useAnalytics.ts (page_view)
  VITE_GOOGLE_SITE_VERIFICATION  PageMeta.tsx (<meta name="google-site-verification">)
```

*Last updated: 2026-08-31*
