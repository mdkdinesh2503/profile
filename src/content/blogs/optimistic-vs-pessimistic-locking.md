---
title: "Optimistic vs. Pessimistic Locking: Solving Race Conditions"
date: "2026-09-02"
summary: "Two users open the same item at the same time. Both see stock = 1. Both click buy. If both requests update independently, two orders get placed for one item. How backend systems handle concurrency conflicts."
tags: ["Databases"]
image: "/blogs/optimistic-vs-pessimistic-locking.webp"
imageAlt: "Architectural comparison of concurrency control: versioned optimistic locking vs exclusive row-level pessimistic locking"
readTime: 4
---

## The Concurrency Dilemma

Two users visit an e-commerce store at the exact same moment.

Both inspect product #42:

$$\text{stock} = 1$$

- **User A** clicks *"Place Order"*.
- **User B** clicks *"Place Order"* 5 milliseconds later.

If your backend service reads `stock = 1` for both requests, subtracts 1, and writes back `stock = 0`, your system has just accepted **two orders for one remaining item**.

This is the classic **Lost Update / Race Condition** concurrency bug.

Concurrency issues cannot be solved simply by making your database or server faster.

**They are solved by deciding what happens when multiple requests compete for the exact same state.**

---

## ⚡ Approach 1: Optimistic Locking — "Work Freely, Verify at the End"

Optimistic locking assumes that **conflicts will be relatively rare**.

Instead of holding locks and making other transactions wait, the database attaches a `version` number (or timestamp) to each record:

```sql
-- Table schema:
-- id: 42 | stock: 1 | version: 7
```

When an application updates the record, it executes an atomic conditional check:

```sql
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = 42 AND version = 7;
```

```
[ User A (ver: 7) ] ─── UPDATE WHERE ver = 7 ───> [ DB: ver becomes 8 ] (SUCCESS)
[ User B (ver: 7) ] ─── UPDATE WHERE ver = 7 ───> [ DB: 0 rows affected ] (CONFLICT!)
                                                              │
                                                              ▼
                                                   [ Rollback or Retry ]
```

- **User A's update** executes first. The row version increments from `7` to `8`.
- **User B's update** attempts to update `WHERE version = 7`. But the row is now `version = 8`. Exactly **0 rows** are affected!
- User B's transaction immediately knows a conflict occurred. The application can catch this, re-read the fresh inventory (`stock = 0`), and politely notify User B that the item just sold out.

### When Optimistic Locking Excels:
- Read-heavy applications where writes and conflicts are infrequent.
- High-throughput web applications where locking rows creates unacceptable latency.
- Long user thinking times (e.g., editing a document or wiki page).

---

## 🔒 Approach 2: Pessimistic Locking — "Stop and Wait"

Pessimistic locking assumes that **conflicts are frequent enough that concurrent access must be strictly serialized**.

When a transaction reads the record, it locks the row immediately at the database level:

```sql
BEGIN TRANSACTION;

-- Lock the row exclusively for this transaction
SELECT stock FROM products WHERE id = 42 FOR UPDATE;

-- Any other transaction trying to read 'FOR UPDATE' or write must wait here!
UPDATE products SET stock = stock - 1 WHERE id = 42;

COMMIT; -- Lock is finally released
```

```
[ Transaction A ] ─── SELECT ... FOR UPDATE ───> [ Row 42 LOCKED ]
                                                        │
[ Transaction B ] ─── SELECT ... FOR UPDATE ───> [ BLOCKED / WAITING ]
                                                        │
[ Transaction A ] ─── COMMIT & RELEASE ─────────────────┘
                                                        │
[ Transaction B ] ─── Lock Acquired, reads stock = 0 ───> [ Rejects Order ]
```

### The Inherent Trade-Offs of Pessimistic Locking:
- ⚠️ **Reduced Throughput:** Transactions are forced to queue sequentially behind locks.
- ⚠️ **Deadlock Risks:** If Transaction 1 locks Row A and needs Row B, while Transaction 2 locks Row B and needs Row A, both freeze indefinitely until a deadlock detector kills one.
- ⚠️ **Connection Pool Pressure:** Database threads spend valuable time waiting on locks instead of serving new queries.

---

## ⚖️ Direct Comparison: Choosing the Right Lock

| Dimension | Optimistic Locking | Pessimistic Locking |
| :--- | :--- | :--- |
| **Core Philosophy** | *"Let everyone read and update, but detect conflicts at write time."* | *"Lock the resource upfront so nobody can modify it simultaneously."* |
| **Locking Mechanism** | Application-level check (`WHERE version = X`). No DB row locks held. | Database engine lock (`SELECT ... FOR UPDATE`). |
| **Performance Under High Contention** | Degrades if many retries fail repeatedly. | High lock contention and connection pool exhaustion. |
| **Performance Under Low Contention** | **Near-zero overhead; blazingly fast reads.** | Overhead of acquiring and managing locks on every transaction. |
| **Best Used For** | Web forms, CMS articles, e-commerce product catalogs. | High-contention flash sales, banking transfers, flight seat reservations. |

---

## 💡 Key Takeaway

Neither strategy is universally superior.

- Use **Optimistic Locking** when read volume dominates and collisions are rare exceptions.
- Use **Pessimistic Locking** when the cost of a collision is high, retrying is expensive, and you need guaranteed immediate serial execution.

> **Concurrency problems are never solved by making queries faster.**  
> **They are solved by deliberately designing what should happen when multiple requests compete for the same state.**
