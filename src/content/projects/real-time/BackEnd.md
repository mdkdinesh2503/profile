---
name: "Esports & Gaming Platform — Distributed Backend & Microservices"
summary: "High-throughput microservices ecosystem serving 20K+ users with Rust, Tokio, Tonic gRPC, Axum GraphQL Gateway, Java/Spring Boot, PostgreSQL, Redis, and DynamoDB."
role: "Backend Engineer"
timeline: "2024 – 2026"
category: "real-time"
stackNote: "Rust (Tokio, Axum, Tonic gRPC, async-graphql), Java (Spring Boot, JPA), PostgreSQL, Redis / Valkey, DynamoDB, AWS SQS"
tags: ["Rust", "Spring-boot", "Microservices", "gRPC", "GraphQL", "Redis", "PostgreSQL", "DynamoDB", "AWS"]
---

## ⚡ System Overview & Production Scale

Architected, developed, and maintained core domain services for a production esports and gaming platform serving **20K+ registered users**. Built across two major application generations:
- **Version 1 (Monolith)**: Java / Spring Boot backend handling REST endpoints, JPA transactions, and PostgreSQL workflows.
- **Version 2 (Distributed Platform)**: Rust-based asynchronous microservices (~60% Rust, ~30% Java, ~10% NestJS) communicating via **gRPC (Tonic / Protobuf)** behind an internal **Rust GraphQL Gateway (Axum + async-graphql)**.

---

## 🏗️ Architectural Topology

| Tier | Component & Responsibilities | Technologies |
| :--- | :--- | :--- |
| **Client Layer** | Web, mobile, and white-label consumer frontends | Next.js, Apollo Client, Tailwind |
| **API Gateway** | Topology hiding, schema federation, request routing & context middleware | Rust, Tokio, Axum, `async-graphql` |
| **Transport Layer** | High-speed, strongly-typed internal RPC service contracts | Tonic, gRPC, Protocol Buffers (`.proto`) |
| **Microservices** | Independent domain logic engines (Challenges, Games, Tournaments, Auth) | Rust (`diesel-async`), Java (Spring Boot), NestJS |
| **Data & Cache** | Multi-tier persistence matched to specific read/write access patterns | Aurora PostgreSQL, Redis / Valkey, DynamoDB |
| **Async Messaging**| Decoupled event notifications & background processing pipelines | AWS SQS, Asynchronous Producers/Consumers |

```
[ Client Applications: Web / Mobile / White-Label ]
                       │ (GraphQL / REST)
                       ▼
[ Rust API Gateway: Axum + Tokio + async-graphql ]
                       │ (Internal gRPC / Protobuf)
       +---------------+---------------+---------------+
       ▼               ▼               ▼               ▼
[Challenge Engine] [Casual Games] [Tournament]   [Auth & Metadata]
 (~90% Ownership)  (~90% Ownership) (~40% Ownership) (~70% Metadata)
       │               │               │               │
       +---------------+---------------+---------------+
       ▼                               ▼               ▼
[PostgreSQL (ACID)]            [Redis / Valkey]   [AWS DynamoDB]
• 12-15 Stored Procedures      • ZSET Leaderboard • Audit Trails
• Relational Source of Truth   • Sub-ms Rankings  • Dynamic Schemas
```

---

## 🎯 Core Domain Modules & Personal Ownership

### 1. 🏆 Challenge Module (~90% Ownership)
- **State Machine Lifecycles**: Engineered registration, participant verification, and real-time status transitions.
- **Scoring & Leaderboards**: Integrated **Redis Sorted Sets (ZSET)** for instant ranking queries, **DynamoDB** for participant aggregates, and **PostgreSQL** for transactional audit histories.
- **Automated Winner Logic**: Designed deterministic scoring algorithms and reward dispatch workflows.

### 2. 🎮 Casual Games Module (~90% Ownership)
- **Provider Integrations**: Connected external third-party game APIs, handling score webhook callbacks, payload validation, and payment redirection.
- **High-Velocity Score Logging**: Engineered idempotent score-processing APIs resilient to rapid duplicate submissions.
- **Multi-Granular Rankings**: Configured **Daily, Weekly, Monthly, and Country leaderboards (10–20 regions)** with automated rebuild and cache-recovery routines.

### 3. ⚔️ Tournament Engine — Double Elimination (~40% Ownership)
- **Bracket Progression**: Programmed full **Double Elimination** tournament progression, managing dynamic match scheduling across Winners and Losers brackets up to the Grand Finals.
- **Data Modeling & Messaging**: Designed relational tournament database models in PostgreSQL and coordinated AWS SQS notification events for match state updates.

### 4. 🌐 Internal GraphQL Gateway (~50% Contribution)
- **Protocol Bridging**: Built high-throughput resolvers in Rust translating external GraphQL queries/mutations into downstream **Tonic gRPC** calls.
- **Axum Middleware**: Authored custom middleware for request tracing, header propagation, and payload validation.

### 5. 🔑 Metadata & Authentication Services
- **Hybrid Metadata Store (~70% Ownership)**: Coupled **AWS DynamoDB** for dynamic schema writes with **Redis / Valkey** for high-frequency cached reads.
- **Auth Enhancements**: Upgraded Rust authentication workflows with **Email OTP login**, **JWT access token issuance**, and **rotating refresh-token validation** backed by Redis session storage.

---

## 💡 Key Technical Innovations & Problem Solving

```
+-----------------------------------------------------------------------------------------+
|                                    ENGINEERING HIGHLIGHTS                               |
+-----------------------------------------------------------------------------------------+
| [1] Multi-Tier Leaderboards   -> Redis Sorted Sets (ZSET) for sub-ms ranking;           |
|                                  PostgreSQL as the durable source of truth.             |
| [2] 20K Record DB Migration   -> Transitioned ~20K user/login records from DynamoDB to  |
|                                  Aurora PostgreSQL to optimize relational filtering.    |
| [3] End-to-End Type Safety    -> Protobuf contracts eliminate field mismatch bugs      |
|                                  between Rust, Java, and NestJS microservices.          |
| [4] High Reliability (ACID)   -> Authored 12-15 PostgreSQL stored procedures for       |
|                                  transactional integrity during tournament match wins.  |
+-----------------------------------------------------------------------------------------+
```

### 📦 DynamoDB to Aurora PostgreSQL Migration (~20K Records)
- **The Challenge**: As query requirements evolved, batch filtering and relational user lookups in DynamoDB incurred heavy scan latencies and operational costs.
- **The Solution**: Developed a dedicated migration process shifting **~20,000 user/login records** into normalized Aurora PostgreSQL tables, realigning the workload with relational query capabilities while keeping DynamoDB focused on unstructured audit logs.

---

## 🛠️ Production Engineering & Live Support

| Operational Metric | Scope & Impact |
| :--- | :--- |
| **Production Releases** | Participated in **25+ production deployments**, managing pre-release verification and post-deployment validation. |
| **Incident Remediation** | Investigated and resolved **10+ live production incidents** using **Grafana, CloudWatch, Postman, and Altair GraphQL**. |
| **Zero-Downtime Hotfixes** | Authored and shipped **8+ hotfixes** addressing critical edge cases in live match workflows. |
| **Continuous Delivery** | Monitored microservice rollouts, pod health, and restarts across **ArgoCD and Jenkins** environments. |

---

## 📌 Key Architectural Takeaways

- **Match Storage to Access Patterns**: Relational databases ensure rock-solid transactional safety, in-memory caches deliver instantaneous leaderboards, and document stores provide schema flexibility.
- **State Machine Rigor**: Explicit state machine modeling with transition guards prevents race conditions in concurrent multiplayer systems.
- **Boundary Decoupling**: API Gateways with internal gRPC abstraction shield frontend clients from internal service topology and protocol evolutions.