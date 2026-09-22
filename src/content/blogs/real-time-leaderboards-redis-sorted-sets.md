---
title: "A Leaderboard Looks Simple — Until Requirements Start Growing"
date: "2026-09-21"
summary: "A leaderboard looks simple: ORDER BY score DESC. Until you need daily, weekly, country-specific, and real-time ranks for millions of users. How Redis Sorted Sets and CQRS read models take the load off PostgreSQL."
tags: ["Databases", "Redis"]
image: "/blogs/real-time-leaderboards-redis-sorted-sets.webp"
imageAlt: "Futuristic real-time leaderboard architecture contrasting PostgreSQL durable source of truth with Redis in-memory sorted sets ranking model"
readTime: 4
---

## The Illusion of a Single SQL Query

When a developer first builds a leaderboard feature, it looks almost trivial:

```sql
SELECT user_id, username, score
FROM user_scores
ORDER BY score DESC
LIMIT 100;
```

One table. One `ORDER BY` clause. You push to staging, test it with a few hundred records, and it runs in 3 milliseconds.

Then the product requirements arrive:

- Overall global rankings
- Real-time daily rankings (resetting at midnight)
- Weekly and monthly leaderboards
- Country- and region-specific filters
- High-frequency score updates (hundreds of points scored every second)
- High-traffic reads (millions of players constantly refreshing the top 100)
- Instant user rank lookups (*"What is my exact rank right now?"*)

Suddenly, the problem is no longer just sorting rows.

It becomes a question of **write frequency vs. read volume**—and running full-table index scans or window functions over millions of rows on every page refresh quickly overwhelms your relational database.

---

## 🏛️ The Architecture: Source of Truth vs. Read Model

A relational database like **PostgreSQL** is exceptional at ACID transactions, data durability, and complex business constraints.

**Redis**, with its in-memory data structures (specifically **Sorted Sets** / `ZSET`), is exceptional at maintaining ordered rankings in sub-millisecond time.

The mental model that untangles this architecture is separating the **Source of Truth** from the **Read Model**:

```
                       [ Player Scores Points ]
                                   │
                                   ▼
                    [ Backend Game / App Service ]
                                   │
             ┌─────────────────────┴─────────────────────┐
             ▼                                           ▼
   [ PostgreSQL Database ]                      [ Redis In-Memory ]
  (Canonical Source of Truth)                 (Specialized Read Model)
  • Durable transaction history                • Sorted Sets (ZSET)
  • User profile & auth data                   • O(log N) updates: ZADD
  • Audit logs & financial items               • O(log N + M) reads: ZREVRANGE
             │                                           │
             ▼                                           ▼
      Durable Storage                           Blazingly Fast Top 100
    (Survives reboots)                             (Sub-millisecond)
```

- **PostgreSQL** remains the canonical, permanent source of truth. Every score increment or transaction is safely persisted to disk.
- **Redis** maintains a dedicated, in-memory read model structured specifically for rank queries.

---

## ⚡ How Redis Sorted Sets (ZSET) Power Leaderboards

Under the hood, Redis Sorted Sets use a **Skip List** paired with a **Hash Map**. This unique combination enables lightning-fast operations even with millions of active players:

- **Update a user's score:**
  ```bash
  ZADD leaderboard:weekly 1450 "user_984"
  ```
  *(Complexity: $O(\log N)$)*
- **Fetch the top 10 players:**
  ```bash
  ZREVRANGE leaderboard:weekly 0 9 WITHSCORES
  ```
  *(Complexity: $O(\log N + M)$)*
- **Get a specific user's live rank:**
  ```bash
  ZREVRANK leaderboard:weekly "user_984"
  ```
  *(Instant $O(\log N)$ rank discovery)*

Instead of PostgreSQL sorting millions of rows in memory repeatedly, Redis keeps the data pre-sorted at all times.

---

## ⚠️ The Engineering Trade-offs: Dual Writes & Sync

Introducing Redis alongside PostgreSQL is powerful, but introduces distributed state synchronization challenges:

| Challenge | Real-World Scenario | Mitigation Strategy |
| :--- | :--- | :--- |
| **Dual-Write Failure** | DB commit succeeds, but Redis network drops during `ZADD`. | Use asynchronous event pub/sub (Kafka/RabbitMQ) or background worker reconciliation. |
| **Data Loss / Cold Restarts** | Redis crashes or restarts, losing ephemeral in-memory sets. | Write a simple reconciliation script that replays today's top scores from PostgreSQL to repopulate Redis. |
| **Expiry for Time Windows** | Daily or weekly leaderboards need to expire automatically. | Leverage native Redis key TTL (`EXPIRE leaderboard:2026-09-22 86400`). |
| **Tie-Breaking** | Multiple players have the exact same score (e.g., 500 pts). | Invert timestamps into fractional scores: `score + (1 - timestamp / 1e12)` to reward whoever achieved the score first. |

---

## 💡 Key Takeaway: Two Models for Two Jobs

This architectural pattern taught me an essential lesson in system design:

> **A database schema is designed around storing correct business data.**  
> **A read model is designed around answering a specific query with maximum efficiency.**

Those two representations do not need to be identical.

Performance improves dramatically when we stop forcing a single data model to serve every conceivable access pattern equally well. By keeping PostgreSQL as the anchor of truth and Redis as the specialized read engine, you achieve both uncompromising data integrity and effortless real-time scale.
