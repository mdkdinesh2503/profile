---
name: "Tournaments, Challenges & Rule-Driven Workflows"
summary: "Designed and delivered robust domain workflows with strong state modeling, clear edge-case handling, and scalable persistence/API design."
role: "Software Engineer"
timeline: "2025"
category: "real-time"
stackNote: "Rust, gRPC, GraphQL, REST, PostgreSQL, DynamoDB, Redis."
tags: ["backend", "domain-design", "apis", "databases", "Gaming"]
image: "/default/Blog.svg"
---

## Problem

I worked on a core domain where tournaments, challenges, and rule-driven flows power most of the product. The system had to:

- Strict correctness across multiple state transitions.
- Consistent behavior across gRPC, GraphQL, and REST APIs.
- Clear handling of eligibility rules, lifecycle changes, and invalid operations.
- Performance stability under increasing production load.

The system had to support evolving requirements without turning business logic into tightly coupled API code.

---

## My Role

- Designed and implemented core domain workflows.
- Modeled lifecycle state machines for tournaments and challenges.
- Built and exposed APIs across gRPC (internal) and GraphQL/REST (clients).
- Designed database schemas and optimized read/write paths.
- Applied caching and validation strategies to improve performance and reliability.

---

## Edge Cases Handled

- Invalid lifecycle transitions (e.g., publishing incomplete entities).
- Duplicate submissions and idempotent operations.
- Eligibility conflicts (e.g., participation rules, state-based restrictions).
- Rollback and correction scenarios.
- Concurrent updates affecting rankings or status changes.
- Data inconsistencies between cache and primary storage.

Explicit state modeling made these scenarios predictable and testable.

---

## Database Design

### PostgreSQL (Primary Source of Truth)

- Normalized schema for tournaments, participants, matches, and rules.
- Transactional integrity for critical updates (enrollment, scoring, reward issuance).
- Append-only patterns and event/audit tables where historical traceability mattered.
- Indexed read-heavy paths (leaderboards, participant lookups, active challenges).

### DynamoDB (Aggregates / Flexible Data)

- Used for scalable stats, global aggregates, and per‑player challenge snapshots.
- Designed with partition keys aligned to high-read entities (tournament + region, player + season).

### Redis (Performance Layer)

- Leaderboards using sorted sets (ZSET).
- Targeted caching of frequently accessed domain objects.
- Cache invalidation at state boundaries.

Focus: durability in primary DB, speed in cache, flexibility in aggregate store—while keeping mental models simple for developers and operators.

---

## API Design

- Centralized domain logic in a service layer.
- Exposed behavior via:
  - gRPC for internal services
  - GraphQL for flexible client queries
  - REST for compatibility and simpler integrations
- Ensured no duplication of business rules across transport layers.
- Structured error mapping for predictable API responses.
- Role-based access validation at request boundaries.

Principle: **Domain first, transport second.**

---

## What I Learned

- Global ranking systems demand transactional integrity and rollback design from day one.
- Redis is powerful for real-time ranking, but durability must remain in the primary database.
- Clear state machines dramatically reduce production ambiguity and on‑call stress.
- Separating domain logic from API transport keeps the codebase evolvable as products and clients change.
- Designing for reversibility (not just correctness) builds operational confidence.
- The combination of explicit rules, strong invariants, and good observability makes even complex domains feel manageable.

---

## Key Takeaway

Strong domain modeling, explicit state handling, and clear separation between business logic and API transport are what allowed me to ship a tournament/challenge engine that feels fast to players, predictable to product, and boring (in a good way) to operate.