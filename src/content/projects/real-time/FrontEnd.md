---
name: "White-Label Next.js Monorepo & Multi-Tenant Frontend Platform"
summary: "Production multi-app frontend architecture serving 20K+ users with Next.js App Router, NextAuth (OTP/OAuth), Apollo GraphQL, Zustand, Tailwind CSS, and third-party integrations."
role: "Full-Stack Engineer / Frontend Engineer"
timeline: "2024 – 2026"
category: "real-time"
stackNote: "Next.js (App Router), TypeScript, NextAuth, Apollo Client, GraphQL, Zustand, React Hook Form, Zod, Tailwind CSS, Angular"
tags: ["Next.js", "Angular", "React", "GraphQL", "Tailwind CSS"]
image: "/default/Blog.svg"
---

## ⚡ System Overview & Production Scale

Independently developed and maintained **4 Next.js applications** within a production white-labeled monorepo supporting **20K+ active users**. Delivered responsive, accessible, and high-performance user interfaces for desktop, tablet, and mobile platforms across diverse brand identities.

Transitioned the company's frontend ecosystem from an initial **Angular (V1)** client integrated with a Java/Spring Boot backend into a high-performance **Next.js App Router (V2)** architecture backed by a unified GraphQL gateway.

---

## 🏗️ Monorepo & Application Architecture

| Application Layer | Core Responsibilities | Key Technologies |
| :--- | :--- | :--- |
| **White-Label Apps (1–4)** | Brand-specific entry points, route definitions, customized themes | Next.js App Router, Dynamic Assets |
| **Shared Core Package** | Central design system, atomic UI components, layout templates | Tailwind CSS Tokens, Lucide Icons |
| **State Management** | Centralized player state, profile tiers, cached metadata | Zustand Granular Stores |
| **Security & Auth Proxy** | Passwordless OTP login, Google OAuth, proactive token refresh | NextAuth.js, JWT Interceptors |
| **Data Fetching Layer** | Type-safe queries, mutations, request authorization headers | Apollo Client, GraphQL |

```
[ White-Label App 1 ]   [ White-Label App 2 ]   [ Partner Apps 3 & 4 ]
         │                       │                       │
         +───────────────────────┼───────────────────────+
                                 ▼
+-----------------------------------------------------------------+
|                    Shared Monorepo Foundation                   |
|  • Reusable UI Component Library (Tailwind Dynamic Tokens)      |
|  • NextAuth Authentication Proxy (Rotating Token Refresh)       |
|  • Global Zustand Stores (PlayerStore, MetadataStore)           |
|  • React Hook Form + Zod Validated Form Engine                  |
+--------------------------------+--------------------------------+
                                 │ Authenticated GraphQL (Bearer JWT)
                                 ▼
+-----------------------------------------------------------------+
|          Downstream Rust GraphQL Gateway & Microservices        |
+-----------------------------------------------------------------+
```

---

## 🎯 Core Technical Implementations

### 1. 🔐 Production Authentication & Session Flow
- **Passwordless & Social Login**: Integrated custom **NextAuth** workflows supporting Email OTP login and Google OAuth.
- **Silent Token-Refresh Interceptor**: Implemented proactive refresh token rotation in the Apollo Client link chain and Next.js middleware, refreshing expiring sessions without interrupting live gameplay.
- **Route Guard Middleware**: Secured administrative and authenticated paths with server-side redirects for unauthenticated states.

### 2. ⚡ State Management with Zustand
- **Player Store**: Manages dynamic user balance, profile levels, and active tournament enrollment states.
- **Metadata Store**: Efficiently caches theme variables and localized game configurations to prevent redundant network fetches.
- **Granular Subscriptions**: Optimized rendering performance across live countdown timers and scoreboards using selective state selectors.

### 3. 🧩 Reusable Component Architecture
- Created a modular UI primitive suite (Modals, Slide-overs, Data Tables, Form Controls, Responsive Drawers) styled with dynamic **Tailwind CSS** theme variables to support multiple white-label brand palettes.
- Standardized form validation using **React Hook Form** paired with strict **Zod schemas**.

### 4. 🎮 Third-Party Game & Web3 Integrations
- **Casual Game Wrappers**: Built responsive container layouts and client callback handlers for third-party HTML5/WebGL game providers.
- **Solana Web3 Integration**: Implemented wallet connection flows across frontend and backend application layers based on architect-defined specifications.
- **External Payment Flows**: Streamlined redirection to secure payment checkouts with state restoration upon return.

---

## 💡 Key Challenges & Technical Solutions

```
+-----------------------------------------------------------------------------------------+
|                                    FRONTEND HIGHLIGHTS                                  |
+-----------------------------------------------------------------------------------------+
| [1] Silent Token Refresh      -> Intercepts expiring JWTs in Apollo Client link chain   |
|                                  without disrupting live gameplay sessions.             |
| [2] Multi-Brand Theming       -> Dynamic Tailwind CSS design tokens enable 4 distinct   |
|                                  white-label visual identities from one codebase.       |
| [3] Responsive Layouts        -> Pixel-perfect rendering from 320px mobile screens to   |
|                                  4K desktop esports tournament brackets.                |
| [4] High Performance          -> Server-Side Rendering (SSR) for instant first paint,   |
|                                  combined with lightweight Zustand client state.        |
+-----------------------------------------------------------------------------------------+
```

---

## 🛠️ Production Support & Quality Assurance

| Engineering Metric | Scope & Impact |
| :--- | :--- |
| **Monorepo Applications** | Independently built and maintained **4 production web applications** within a unified workspace. |
| **Release Participation** | Supported **25+ production deployments**, conducting cross-device UI and API contract validation. |
| **Full Lifecycle Ownership** | Delivered features from Figma mockups to component design, state integration, and live production verification. |