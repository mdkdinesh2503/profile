---
name: "Finance Tracker"
summary: "Personal finance tracker built with Next.js App Router and PostgreSQL with advanced categorization, rules engine, and row-level security."
category: "academic"
year: "2024"
demoStack: ""
originalStack: "Next.js, Tailwind CSS, PostgreSQL"
tags: ["nextjs", "postgresql", "finance", "full-stack", "react"]
image: "/default/Blog.svg"
demoUrl: "https://mdkdinesh2503.netlify.app/satt"
repoUrl: "https://github.com/mdkdinesh2503/finance-tracker"
---

## About

This project is a comprehensive, self-hosted personal finance management application. It is designed to give you complete control over your financial data with a fast, modern interface. It allows you to track expenses, income, and investments, all while supporting advanced categorization rules and robust analytics.

## Features

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

## Architecture

The application leverages Next.js App Router for full-stack capabilities, utilizing React Server Components and Server Actions to interact securely with the PostgreSQL database. The database is designed with strong referential integrity, supporting multi-dimensional transaction tagging and row-level security.

## Tech Stack

- **Framework**: Next.js (App Router, Server Components, Server Actions)
- **Database**: PostgreSQL (No ORM)
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Radix UI