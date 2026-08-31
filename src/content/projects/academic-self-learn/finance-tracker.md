---
name: "Personal Finance Tracker"
summary: "Personal finance management application for expense tracking, lending, borrowing, investments, and financial analytics with secure authentication and Row-Level Security."
category: "academic"
year: "2025"
role: "Full-Stack Software Engineer"
stackNote: "Next.js 14 App Router, Server Actions, Neon PostgreSQL, Zustand, Tailwind CSS"
demoStack: "Next.js, TypeScript, PostgreSQL"
originalStack: "Next.js, TypeScript, PostgreSQL (NeonDB), Zustand, Tailwind CSS"
tags: ["Next.js", "PostgreSQL", "Tailwind CSS"]
image: "/default/Blog.svg"
demoUrl: "https://mdk-expense.vercel.app/"
repoUrl: "https://github.com/mdkdinesh2503/finance-tracker"
---

## ⚡ Overview & Motivation

Engineered a personal finance and wealth management platform designed to provide total clarity over multi-account cash flows, lending, borrowing, investment allocations, and long-term expense analytics. Built with **Next.js (App Router)**, **TypeScript**, **PostgreSQL on NeonDB**, and **Zustand**, emphasizing strict tenant data isolation, zero-ORM direct SQL performance, and an intuitive user dashboard.

---

## 🏗️ Architecture & Direct SQL Data Pipeline

```
[ User Interaction: Responsive Web Dashboard ]
                       │
                       ▼ (Next.js Server Actions & API Routes)
+-------------------------------------------------------------+
|                    Next.js Application Layer                |
|  • App Router Server Components for fast initial page paint |
|  • Zustand Client Stores for instantaneous local filtering  |
|  • Automated Keyword Categorization & Batch CSV Engine      |
+------------------------------+------------------------------+
                               │ (Direct Parameterized SQL / Neon Serverless)
                               ▼
+-------------------------------------------------------------+
|             Neon PostgreSQL (Serverless Cloud DB)           |
|  • Strict Row-Level Security (RLS) policies per user UUID   |
|  • Aggregation queries for monthly spending & category trees|
|  • ACID transactional safety across multi-account transfers |
+-------------------------------------------------------------+
```

---

## 🎯 Core Features & Capabilities

| Module | Purpose & Implementation |
| :--- | :--- |
| **Automation Rules Engine** | Keyword-based auto-categorization engine mapping transactions to categories, contacts, and locations during batch imports. |
| **Multi-Account Balances** | Centralized ledger tracking liquid balances across Cash, Bank, Wallets, and Credit accounts with transfer reconciliation. |
| **Hierarchical Taxonomies** | Nested parent-child categories (e.g., `Housing > Utilities > Electricity`) for precise spending breakdown analytics. |
| **Bulk CSV Import Engine** | Fast client/server ingestion with column mapping, duplicate detection, and automated tag assignment. |
| **Financial Health Visuals** | Monthly/yearly trend charts, spending breakdown donuts, and debt repayment schedules. |

---

## 💡 What Makes This Project Interesting

```
+-----------------------------------------------------------------------------------------+
|                                    INNOVATION & CRAFT                                   |
+-----------------------------------------------------------------------------------------+
| [1] Architectural Pivot       -> Replaced Supabase + Drizzle ORM with direct Neon SQL   |
|                                  to eliminate ORM overhead and simplify migrations.     |
| [2] True Zero-ORM Simplicity  -> Parameterized raw SQL queries deliver maximum control  |
|                                  over complex analytical aggregates.                    |
| [3] Database Row-Level Security-> Enforced tenant isolation directly inside PostgreSQL  |
|                                  (RLS policies ensure users only query their own data). |
| [4] Instantaneous UI Updates  -> Zustand stores enable zero-lag local search, category  |
|                                  filtering, and date range switches.                    |
+-----------------------------------------------------------------------------------------+
```

---

## 🧠 Why I Used This Tech Stack

- **Why Next.js App Router & Server Actions?** Combines fast server-rendered initial analytics with lightweight Server Actions for secure database mutations without maintaining a separate backend server.
- **Why Direct PostgreSQL on NeonDB?** Serverless PostgreSQL scales to zero when idle, provides instant branching for database migrations, and supports rock-solid Row-Level Security (RLS).
- **Why Zustand?** Offers a clean, boilerplate-free state store that avoids React Context re-render bottlenecks when filtering hundreds of transactions.

---

## 🚀 Impact & What I Learned

- **Database-First Security**: Learned how to leverage database-level policies (RLS) instead of solely relying on application-level filtering.
- **Architectural Pragmatism**: Experienced firsthand the trade-offs between full ORMs and direct SQL, learning to prioritize query control and latency over boilerplate abstraction.
- **Production FinTech Patterns**: Mastered double-entry style ledger tracking, multi-account reconciliations, and robust CSV batch parsing.

---

## 🔗 Demos & Source Code

- **Live Application**: [mdk-expense.vercel.app/](https://mdk-expense.vercel.app/)
- **Source Repository**: [github.com/mdkdinesh2503/finance-tracker](https://github.com/mdkdinesh2503/finance-tracker)