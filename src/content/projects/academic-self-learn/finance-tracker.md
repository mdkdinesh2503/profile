---
name: "Personal Finance Tracker"
summary: "Personal finance management application for expense tracking, lending, borrowing, investments, and financial analytics with secure authentication and Row-Level Security."
category: "academic"
year: "2024"
demoStack: ""
originalStack: "Next.js, TypeScript, PostgreSQL, NeonDB, Zustand"
tags: ["nextjs", "typescript", "neondb", "finance", "postgresql", "zustand"]
image: "/default/Blog.svg"
demoUrl: "https://mdk-expense.vercel.app"
repoUrl: "https://github.com/mdkdinesh2503/finance-tracker"
---

## Overview

Designed and developed a personal finance management application to centralize expense tracking, lending, borrowing, investments, repayment management, and financial analytics through a unified dashboard. Implemented secure authentication, responsive user interfaces, Row-Level Security (RLS), and API-driven workflows for reliable financial data management.

## Key Accomplishments

- **Architecture Evolution**: Improved application responsiveness by replacing an earlier Supabase + Drizzle ORM implementation with a simplified Neon PostgreSQL architecture after evaluating authentication latency and architectural trade-offs.
- **Financial Workflows**: Implemented CSV import/export functionality and categorized financial transactions to support reporting and long-term expense analysis.
- **Secure Data Access**: Enforced strict data isolation at the database level using Row-Level Security (RLS) to ensure privacy across user accounts.

## Core Features

- **Secure Authentication**: Full user login, registration, and session management.
- **Interactive Dashboard**: A high-level, visual overview of your financial health.
- **Transaction Management**: Log various types of transactions including Expenses, Income, Borrowing, Repayment, Investments, and Adjustments.
- **Multi-Dimensional Categorization**:
  - **Accounts**: Track balances across multiple accounts (e.g., Cash, Bank).
  - **Hierarchical Categories**: Group transactions with parent-child category relationships.
  - **Tags & Metadata**: Link transactions to specific Contacts, Companies, and Locations.
- **Automation Rules Engine**: Define keyword-based rules to automatically assign categories, contacts, and locations to transactions.
- **Analytics & Reporting**: Generate visualizations and charts to analyze spending trends over time.
- **Bulk Data Import**: Easily import historical transactions from CSV files.
- **Row-Level Security (RLS)**: Enforces strict data isolation at the database level to ensure privacy.

## Tech Stack

- **Framework**: Next.js (App Router, Server Components, Server Actions)
- **Database**: PostgreSQL (No ORM), NeonDB
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Radix UI