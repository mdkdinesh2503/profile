---
title: "Shipping with constraints: a pragmatic checklist"
date: "2025-06-02"
summary: "A lightweight approach for delivering reliably when you can't rewrite, can't pause traffic, and can't be wrong."
tags: ["product", "delivery", "ownership"]
---

Most real work is constrained:

- the system is already in production
- the team needs progress this week
- the “correct” solution is larger than the budget

I try to ship with a simple checklist that keeps quality high without over-engineering.

## 1) Clarify what must not break

Before building, I write down:

- the **invariants** (money correctness, access control, data integrity)
- the **failure modes** we can tolerate vs the ones we can’t
- what “rollback” means in practice

This prevents the classic trap: optimizing for speed while accidentally changing the rules.

## 2) Reduce uncertainty early

Instead of planning the entire implementation, I look for the smallest step that answers the biggest unknown:

- a query plan on real data
- a spike that validates an integration
- instrumentation to confirm the current behavior

## 3) Make the trade-off explicit

If I’m taking on debt, I write down **why** it’s acceptable and what it would take to remove it.

This keeps the system from accumulating “invisible” complexity.

## 4) Ship in small, reversible steps

In practice that looks like:

- feature flags when needed
- backward-compatible schema changes
- versioned APIs or response shaping
- clear rollback paths

## 5) Add operability, not ceremony

I prefer a few strong signals:

- correlation IDs
- a minimal audit trail for critical events
- alerts that map to actions

So support and on-call can answer, quickly: **what happened and what do we do next?**