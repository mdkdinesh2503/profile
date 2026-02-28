# Build Steps: Profile / Portfolio App from Scratch

This document describes how to recreate this application from scratch. It is a **React + Vite + TypeScript** portfolio site with dark/light theme, markdown blogs, project case studies, experience, resume, and contact pages. The codebase uses **Tailwind CSS** (with `tailwind.config.ts`), **lucide-react** for icons, and **framer-motion** for animations; adjust dependency versions as needed for your environment.

---

## 1. Project setup

### 1.1 Create Vite + React + TypeScript project

```bash
npm create vite@latest profile-portfolio -- --template react-ts
cd profile-portfolio
```

### 1.2 Install dependencies

```bash
npm install react-router-dom framer-motion react-markdown remark-gfm clsx @fontsource/inter lucide-react
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer
npx tailwindcss init -p
```

- **react-router-dom** – client-side routing  
- **framer-motion** – page and scroll animations  
- **react-markdown** + **remark-gfm** – markdown rendering for blog posts  
- **clsx** – conditional class names  
- **@fontsource/inter** – Inter font  
- **lucide-react** – icons (e.g. Sun/Moon for theme toggle)  
- **tailwindcss**, **@tailwindcss/typography**, **postcss**, **autoprefixer** – styling

### 1.3 TypeScript path alias

**`tsconfig.json`** – use references (keep as generated):

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

**`tsconfig.app.json`** – add `baseUrl` and `paths`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

**`vite.config.ts`** – add `resolve.alias`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": "/src" },
  },
});
```

### 1.4 Vite env types

**`src/vite-env.d.ts`**:

```ts
/// <reference types="vite/client" />
```

---

## 2. Tailwind and global styles

### 2.1 Tailwind config

**`tailwind.config.ts`**:

- Use `import type { Config } from "tailwindcss"` and `typography from "@tailwindcss/typography"`.
- `content`: `["./index.html", "./src/**/*.{ts,tsx}"]`
- `darkMode: "class"`
- `theme.extend`: `fontFamily.sans` (Inter), `colors` (map to CSS vars: `bg`, `primary`, `primary-hover`, `white`, `secondary`, `ink`, `ink-light`, `line`, `surface`, `muted`, etc.), `boxShadow` (e.g. `lift-1`, `glow`, `glass-inset`), `borderRadius` (e.g. `xl`, `2xl`), `keyframes` / `animation` (e.g. `soft-shimmer`).
- `plugins: [typography]`.
- Use `satisfies Config` for type safety.

Use CSS variables for colors (e.g. `--color-bg`, `--color-ink`, `--color-primary`) so light/dark themes are driven from one place.

### 2.2 PostCSS

**`postcss.config.cjs`**:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 2.3 Global CSS

**`src/styles/globals.css`**:

- `@tailwind base; @tailwind components; @tailwind utilities;`
- **`:root`** – light theme variables: `--color-bg`, `--color-ink`, `--color-ink-light`, `--color-primary`, `--color-primary-hover`, `--color-secondary`, `--color-secondary-hover`, `--color-white`, `--color-shadow`, `--color-glow`, `--color-selection`, plus gradients (e.g. `--gradient-primary`, `--gradient-subtle`, `--gradient-accent`).
- **`.dark`** – same variable names with dark values (dark bg, light text).
- **`html`** – `color-scheme`, `text-rendering`, font smoothing.
- **`body`** – `@apply font-sans`, `background-color: var(--color-bg)`, `color: var(--color-ink)`.
- **`::selection`** – use `--color-selection`.
- Optional: custom scrollbar styles using theme vars; gradient utilities (`.bg-gradient-primary`, etc.); marquee (`@keyframes marquee-left`, `.animate-marquee-left`); dot/blink keyframes (e.g. `.dot-two-layer`) for header logo.
- **`@media (prefers-reduced-motion: reduce)`** – shorten or disable animations/transitions.

---

## 3. Entry and app shell

### 3.1 HTML

**`index.html`**:

- Normal `html`/`head`/`body`, `lang="en"`.
- In `<head>`, a small inline script that reads `localStorage.getItem("profile-theme")` and adds/removes `dark` on `document.documentElement` to avoid flash.
- `<div id="root">` and `<script type="module" src="/src/main.tsx">`.

### 3.2 Main entry

**`src/main.tsx`**:

- Import `@fontsource/inter/latin.css` and `@/styles/globals.css`.
- Import `App` from `@/App`.
- `ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>)`.

### 3.3 App component

**`src/App.tsx`**:

- `ThemeProvider` (wraps everything).
- `BrowserRouter` from react-router-dom.
- `AnimatedRoutes` (your route tree).

---

## 4. Theme context

**`src/contexts/ThemeContext.tsx`**:

- Storage key, e.g. `"profile-theme"`.
- `Theme = "light" | "dark"`.
- `getInitialTheme()` – read from `localStorage`, default `"light"`.
- `applyTheme(theme)` – add/remove `dark` class on `document.documentElement`.
- Context value: `theme`, `setTheme`, `toggleTheme`.
- `ThemeProvider`: sync state with `localStorage` and `applyTheme` on mount and when theme changes.
- `useTheme()` hook that throws if used outside provider.

---

## 5. Types and data

### 5.1 Types

**`src/types.ts`** – define:

- **Project** – slug, name, summary, role, timeline, context, outcome, stackNote?, caseStudy (problem, constraints, approach[] with { title, details }, highlights[], impact[], learned?).
- **ProjectCaseStudy** – slug, title, context, role, decisions[] (title, tradeoff, result; map from caseStudy.approach: title→title, details→result, tradeoff optional), outcomes[] (from caseStudy.highlights).
- **ExperienceRole** – title, employmentType, timeframe.
- **ExperienceItem** – company, logo?, location?, title?, startDate, endDate?, timeframe?, summary?, roles?, outcomes[].
- **SkillGroup** – group ("Frontend" | "Backend" | "Data" | "Infra" | "Tools"), items[].
- **BlogMeta** / **Blog** – slug, title, date, summary, tags[], image?, content (for full post; Blog = BlogMeta & { content }).
- **Certification** – name, issuer, year, thumbnail, pdf, verifyLink?.
- **Resume** – pdfSrc, pdfTitle.
- **PrimaryCta** – label, href.
- **HowICanHelpCard** – title, body.
- **HowICanHelp** – cards[].
- **Hero** – headline, subhead, initials?, technologiesLabel, yearsExperience?.
- **ProfileLinks** – github, linkedin.
- **Profile** – name, role, location, phone, email, avatar? (string path), primaryCta, hero, howICanHelp, links, certifications[], resume.
- **SelectedSectionHeading**, **ExperienceSectionHeading** – eyebrow, title, description (for section headings).

### 5.2 Profile data

**`src/data/profile.ts`** – single `profile` object implementing `Profile`: name, role, location, phone, email, avatar path, primaryCta (label, href), resume (pdfSrc, pdfTitle), hero (headline, subhead, initials, technologiesLabel, yearsExperience from experience data), howICanHelp.cards[], links (github, linkedin), certifications (import from certifications).

### 5.3 Projects data

**`src/data/projects.ts`**:

- Array of `Project` with full case study content.
- `mapProjectToCaseStudy(Project): ProjectCaseStudy` to derive UI shape.
- Export `projects`, `projectsData` (mapped array), and `getProjectBySlug(slug)`.

### 5.4 Experience data

**`src/data/experience.ts`** – export `experience: ExperienceItem[]`, `skills: SkillGroup[]`, and helper `getYearsExperience(experience)` (e.g. for hero badge).

### 5.5 Certifications data

**`src/data/certifications.ts`** – export `certifications: Certification[]` (name, issuer, year, thumbnail, pdf, verifyLink). Use paths under `public/` (e.g. `./default/certificate.svg`, `./certification/Name.pdf`).

### 5.6 Section headings and contact copy

**`src/data/headings.ts`** – export `headings` object with section headings (howICanHelp, selectedWork, experience, skills, credentials, blogs, resume, contact) each with `eyebrow`, `title`, `description` (satisfies `SelectedSectionHeading`).

**`src/data/contact.ts`** – export `contactData` (e.g. emailSubject, reachMe, connect, whatHelps) for Contact page copy.

### 5.7 Data barrel

**`src/data/index.ts`** – re-export profile, projects (and helpers), experience, skills, certifications, and relevant types. Headings and contact data are imported directly from their files where needed.

---

## 6. Blog system (markdown)

### 6.1 Blog types

In **`src/types.ts`** – `BlogMeta`, `Blog` (with `content`).

### 6.2 Blog loader

**`src/lib/blogs.ts`**:

- Use Vite’s `import.meta.glob<string>("../content/blogs/*.md", { query: "?raw", import: "default", eager: true })` to load raw markdown.
- Slug from filename (strip `.md`).
- Parse frontmatter (between `---`): title, date, summary, tags (array or YAML list), image (optional). Parse body after second `---`.
- Export:
  - **getAllBlogs()** – list of blog metadata (slug, title, date, summary, tags, image), sorted by date (newest first).
  - **getBlogBySlug(slug)** – full blog (meta + content) or null.

### 6.3 Blog content

**`src/content/blogs/`** – add `.md` files with YAML frontmatter, e.g.:

```yaml
---
title: "Post title"
date: "2025-01-15"
summary: "Short description."
tags: ["tag1", "tag2"]
image: "/blogs/cover-1.svg"
---
```

Then the markdown body. Optional frontmatter: `imageAlt` for accessibility if you extend the parser.

---

## 7. Shared UI components

Create under **`src/shared/ui/`**:

- **`cx.ts`** – re-export or wrap `clsx` for class merging.
- **Container** – max-width wrapper, padding (e.g. `max-w-6xl px-4 md:px-6`).
- **Button** – variants: primary, secondary, ghost; use CSS vars for colors.
- **Card** – rounded border, surface bg, optional hover shadow.
- **SectionHeading** – optional eyebrow, title, description.
- **Prose** – wrapper for markdown content using Tailwind typography (`prose`, prose modifiers for headings/code/pre).
- **GlassCard** – card with border, light bg, backdrop blur.
- **Chip** – small pill button, optional `active` state.
- **HeroPortrait** – image with fallback (initials), optional “years exp” badge and “Available for work”; use CSS for glow/frame.

Use Tailwind and your CSS variables (e.g. `text-ink`, `text-muted-1`, `bg-surface`, `border-line`, `text-brand-600`).

---

## 8. Motion components

Under **`src/shared/motion/`**:

- **PageTransition** – `motion.div` with initial/animate/exit (e.g. opacity + small y), wrap each page for route transitions.
- **Reveal** – use `useInView`; when in view animate from opacity 0, blur, small y to clear; optional `delay`. Wrap sections for scroll-in effect.

Use **framer-motion** and a consistent easing (e.g. `[0.22, 1, 0.36, 1]`).

---

## 9. Layout

### 9.1 Site layout

**`src/shared/layout/SiteLayout.tsx`** – min-height viewport (e.g. `min-h-dvh`), flex column; **SiteHeader**; **main** with `<Outlet />`; **SiteFooter**; **ScrollToTop** (floating “back to top” button).

### 9.2 Header

**`src/shared/layout/SiteHeader.tsx`**:

- Sticky header, border-bottom, blur background (e.g. `backdrop-blur-md`).
- Logo/name link to `/` (e.g. dot logo + profile name from `profile`).
- Desktop nav: links to Selected Work (`/projects`), Experience, Blog, Resume, Contact (use **NavLink** with `isActive` for active state).
- Theme toggle button using **lucide-react** `Sun`/`Moon` and `useTheme().toggleTheme`.
- Mobile: “Menu” button; when open, show overlay and nav list with same links; close on link click or Escape.

### 9.3 ScrollToTop

**`src/shared/layout/ScrollToTop.tsx`** – fixed “scroll to top” button (e.g. bottom-right); show after user scrolls past a threshold (e.g. 300px); smooth scroll to top on click; hide when near top.

### 9.4 Footer

**`src/shared/layout/SiteFooter.tsx`** – Container, name, short tagline (“Built with React + Vite”), copyright year.

---

## 10. Router and routes

**`src/router/AnimatedRoutes.tsx`**:

- Use **useLocation**; **AnimatePresence** (mode `"wait"`, `initial={false}`); **Routes** with `location={location}` and `key={location.pathname}`.
- Single parent **Route** with `element={<SiteLayout />}`; child routes each with `element={<PageTransition><PageComponent /></PageTransition>}`.
- On `location.pathname` change, scroll to top (e.g. `window.scrollTo({ top: 0, left: 0, behavior: "smooth" })` in a `useEffect`).
- Routes: `/` → HomePage; `/projects` → ProjectsPage; `/projects/:slug` → ProjectDetailPage; `/experience` → ExperiencePage; `/blogs` → BlogsPage; `/blogs/:slug` → BlogDetailPage; `/resume` → ResumePage; `/contact` → ContactPage; `*` → NotFoundPage.

---

## 11. Pages

### 11.1 HomePage

- Hero: headline and subhead from `profile.hero`; CTA from `profile.primaryCta` (e.g. “View Selected Work”).
- Hero portrait (**HeroPortrait**) with avatar and optional badge (e.g. years of experience from `profile.hero.yearsExperience`).
- Technologies marquee (optional): list of tech names, horizontal scroll (e.g. `animate-marquee-left`).
- “How I Can Help”: SectionHeading (from `headings.howICanHelp` or inline) + grid of cards from `profile.howICanHelp.cards`.
- “Selected work”: SectionHeading + first N projects as cards (title, context, role, outcome, “Read case study” link to `/projects/:slug`); “View all” link to `/projects`.
- Use **Reveal** for sections; **Container** for width.

### 11.2 ProjectsPage

- Title and short description.
- Map `projectsData` to cards: title, role, context, first 3 decisions (title/tradeoff/result), first few outcomes, “Read full case study” link.
- If no projects, show placeholder cards explaining to add data in `src/data/projects.ts`.
- **Reveal** per card with delay.

### 11.3 ProjectDetailPage

- `useParams()` for `slug`; `getProjectBySlug(slug)`.
- If not found: message + link back to `/projects`.
- Else: title, context, role card; main column: “Decisions & trade-offs” (cards per decision), “Outcomes & impact” (bullets); sidebar: quick context + “Back to projects”.
- **Reveal** for sections.

### 11.4 ExperiencePage

- SectionHeading for experience (e.g. from `headings.experience`).
- List experience items (company, title, location, timeframe, summary, outcomes; support `roles[]` if present).
- Optional “How I work” or mindset section.
- Skills: SectionHeading (e.g. `headings.skills`); filter chips (Frontend, Backend, Data, Infra, Tools); card showing items for selected **SkillGroup**.
- Certifications: SectionHeading (e.g. `headings.credentials`); grid of cert cards (thumbnail, name, issuer, year; Preview / Verify / Download). Preview opens modal with iframe PDF; close on overlay click or Escape. Use `certification.thumbnail`, `certification.pdf`, `certification.verifyLink`.
- **Reveal** and **AnimatePresence** for modal.

### 11.5 BlogsPage

- SectionHeading (“Engineering notes” or similar).
- View toggle (grid/list) persisted in localStorage.
- List from `getAllBlogs()`: card per post (image if present, title, date, summary, tags); link to `/blogs/:slug`.
- If no posts, show “No posts yet” and path to add markdown in `src/content/blogs`.
- **Reveal** per card.

### 11.6 BlogDetailPage

- `useParams()` for `slug`; `getBlogBySlug(slug)`.
- If not found: message + link to `/blogs`.
- Else: “Back to blogs” link; title; date; optional image; content rendered with **ReactMarkdown** (remarkGfm) inside **Prose**; custom link/code styles as needed.

### 11.7 ResumePage

- SectionHeading (e.g. from `headings.resume`); short description.
- Use `profile.resume.pdfSrc` and `profile.resume.pdfTitle`. Buttons: “Download PDF”, “Open in new tab”; card with embedded iframe for PDF preview (same URL).

### 11.8 ContactPage

- SectionHeading (e.g. from `headings.contact`).
- Card with email (mailto) and phone (tel) from `profile`; optional “What helps” card using `contactData.whatHelps` (title, description, items).
- Links to GitHub and LinkedIn from `profile.links`.

### 11.9 NotFoundPage

- Simple message “Page not found” and link “Go home” to `/`.

---

## 12. Assets and public files

- **`public/`**: favicon (e.g. `favicon.svg`), profile photo (e.g. `profile/mdk_4.jpg`), resume PDF (e.g. `resume/Dinesh_Resume.pdf`), blog cover images (e.g. `blogs/cover-1.svg`), default/certificate assets (e.g. `default/certificate.svg`), certification PDFs (e.g. `certification/Name.pdf`).
- In **profile.ts**, set `avatar` to path under `public/` (e.g. `./profile/mdk_4.jpg`); set `resume.pdfSrc` and `resume.pdfTitle` for Resume page and PDF preview.
- In **certifications**, set `thumbnail` and `pdf` to paths under `public/` (e.g. `./default/certificate.svg`, `./certification/AWS_DynamoDB.pdf`).

---

## 13. Scripts and run

**`package.json`** scripts:

- `"dev": "vite"`
- `"build": "tsc -b && vite build"`
- `"preview": "vite preview"`

Run:

```bash
npm run dev
```

Open the given local URL (e.g. http://localhost:5173). Build for production with `npm run build` and test with `npm run preview`.

---

## 14. Checklist summary

| Step | Item |
|------|------|
| 1 | Vite + React + TS project; install deps; path alias in tsconfig + vite |
| 2 | Tailwind + PostCSS + globals.css (light/dark vars, marquee, reduced motion) |
| 3 | index.html (theme script), main.tsx, App.tsx (ThemeProvider, Router, AnimatedRoutes) |
| 4 | ThemeContext (storage, applyTheme, toggle) |
| 5 | types.ts; data: profile, projects, experience, certifications, headings, contact; data/index barrel |
| 6 | blogs.ts (glob markdown, frontmatter); content/blogs/*.md |
| 7 | Shared UI: cx, Container, Button, Card, SectionHeading, Prose, GlassCard, Chip, HeroPortrait |
| 8 | Motion: PageTransition, Reveal |
| 9 | SiteLayout, SiteHeader (lucide theme toggle, nav, mobile menu), ScrollToTop, SiteFooter |
| 10 | AnimatedRoutes with all routes and PageTransition |
| 11 | All pages: Home, Projects, ProjectDetail, Experience, Blogs, BlogDetail, Resume, Contact, NotFound |
| 12 | public/ assets; profile + cert paths |
| 13 | npm run dev / build / preview |

---

## File structure (reference)

```
src/
  main.tsx
  App.tsx
  vite-env.d.ts
  styles/
    globals.css
  contexts/
    ThemeContext.tsx
  types.ts
  data/
    index.ts
    profile.ts
    projects.ts
    experience.ts
    certifications.ts
    headings.ts
    contact.ts
  lib/
    blogs.ts
  content/
    blogs/
      *.md
  shared/
    ui/
      cx.ts
      Container.tsx
      Button.tsx
      Card.tsx
      SectionHeading.tsx
      Prose.tsx
      GlassCard.tsx
      Chip.tsx
      HeroPortrait.tsx
    motion/
      PageTransition.tsx
      Reveal.tsx
    layout/
      SiteLayout.tsx
      SiteHeader.tsx
      SiteFooter.tsx
      ScrollToTop.tsx
  router/
    AnimatedRoutes.tsx
  pages/
    HomePage.tsx
    ProjectsPage.tsx
    ProjectDetailPage.tsx
    ExperiencePage.tsx
    BlogsPage.tsx
    BlogDetailPage.tsx
    ResumePage.tsx
    ContactPage.tsx
    NotFoundPage.tsx
```

This sequence will recreate the application from scratch. Adjust content (copy, links, images, PDFs) to match your own profile and assets.
