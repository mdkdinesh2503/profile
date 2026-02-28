---
title: "Safe database migrations (the boring way)"
date: "2025-12-08"
summary: "Migrations fail when they assume ideal conditions. A cautious sequence keeps production stable and teams confident."
tags: ["postgres", "migrations", "reliability"]
---

I treat migrations like production changes, not “a quick script.”

The common failure modes are predictable:

- locks during peak traffic
- long-running backfills
- application code that assumes the new schema immediately

## A sequence that works

### 1) Expand

Add the new column/table/index in a backward-compatible way.

If you need an index on a big table, consider **concurrent** index creation (when available) to reduce locking.

### 2) Backfill

Do the heavy work in controlled batches.

I prefer:

- bounded batches
- progress visibility
- the ability to pause/resume

### 3) Dual-write (when needed)

If you’re migrating critical state, temporarily write to both old and new fields so you can verify correctness without downtime.

### 4) Switch reads

Change reads to use the new schema after you’ve validated data completeness and performance.

### 5) Contract

Remove old fields only after a safe window, and only after you’ve confirmed no remaining dependencies.

## What “done” includes

- a rollback plan
- monitoring for latency and errors
- documentation for support/on-call

The migration isn’t complete when it merges—it's complete when it’s **boring to operate**.