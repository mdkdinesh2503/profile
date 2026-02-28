# Portfolio — React + Vite

A personal portfolio site built from scratch with **React**, **Vite**, and **TypeScript**. It showcases projects, experience, skills, markdown-powered blog posts, and a resume — with a calm, readable design and subtle animations.

---

## What This Project Is

- **Multi-page portfolio** for a software engineer (home, projects, experience, blog, resume, contact).
- **Content-driven**: Profile, projects, experience, and certifications live in TypeScript/data files; blog posts are Markdown with frontmatter.
- **SPA with client-side routing** — all routes work on direct links and refresh (Netlify redirects).
- **Deploy-ready** — configured for Netlify with `netlify.toml` and `public/_redirects`.

---

## Tech Stack

| Area | Choices |
|------|--------|
| **Runtime / package manager** | [Bun](https://bun.sh) |
| **Framework** | React 19 + Vite 7 |
| **Language** | TypeScript |
| **Routing** | React Router v7 |
| **Styling** | Tailwind CSS + `@tailwindcss/typography` |
| **Motion** | Framer Motion (subtle only) |
| **Content** | Markdown blogs (frontmatter + `react-markdown` + `remark-gfm`) |
| **Font** | Inter (`@fontsource/inter`) |

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — hero, intro, how I can help |
| `/projects` | Selected work (project list) |
| `/projects/:slug` | Project case study |
| `/experience` | Experience, how I work, skills, certifications |
| `/blogs` | Blog list |
| `/blogs/:slug` | Blog post (Markdown) |
| `/resume` | Resume (PDF viewer/link) |
| `/contact` | Contact info and form placeholder |

---

## Run Locally

```bash
# Install
bun install

# Dev server
bun run dev
```

Preview production build:

```bash
bun run build
bun run preview
```

---

## Deploy on Netlify

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In [Netlify](https://app.netlify.com): **Add new site** → **Import an existing project** → connect the repo.
3. Build settings are read from `netlify.toml`:
   - **Build command:** `bun run build`
   - **Publish directory:** `dist`
4. Deploy. Direct URLs and refresh work via `public/_redirects` (SPA fallback to `index.html`).

For **Bun** on Netlify: ensure Bun is available in the build (e.g. use a [Netlify build image](https://docs.netlify.com/configure-builds/build-plugins/#netlify-build-image) that includes Bun, or add a build step to install it). Node version is set to `20` in `netlify.toml` for compatibility.

---

## Replace Demo Content (Use as Your Own)

| What | Where |
|------|--------|
| **Profile & site identity** | `src/data/profile.ts` |
| **Projects** | `src/data/projects.ts` |
| **Experience & skills** | `src/data/experience.ts` |
| **Certifications** | `src/data/certifications.ts` |
| **Contact** | `src/data/contact.ts` |
| **Blog posts** | `src/content/blogs/*.md` |
| **Resume PDF** | Put file in `public/` (e.g. `public/Resume.pdf`) and set `RESUME_URL` in `src/pages/ResumePage.tsx` |

---

## Project Structure (Overview)

```
src/
├── data/           # Profile, projects, experience, certifications, contact
├── content/blogs/  # Markdown blog posts
├── pages/         # Route-level pages (Home, Projects, Experience, Blogs, Resume, Contact)
├── shared/        # Layout (header, footer), UI components, motion (Reveal, PageTransition)
├── contexts/      # Theme (e.g. ThemeContext)
├── lib/           # Blog loading (frontmatter, etc.)
├── router/        # AnimatedRoutes
└── types.ts       # Shared TypeScript types
```

---

## Git — First Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio with React, Vite, Tailwind, blogs, resume"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

*Built as a learning/personal portfolio project. Feel free to fork and adapt for your own profile.*