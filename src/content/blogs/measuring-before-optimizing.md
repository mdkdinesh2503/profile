---
title: "Measure before you optimize"
date: "2025-08-14"
summary: "Performance work goes sideways when it’s driven by hunches. A simple measurement loop keeps it grounded and repeatable."
tags: ["performance", "reliability", "engineering"]
image: "/default/Blog.svg"
imageAlt: "Soft gradient cover image"
readTime: 2
---

Most performance problems aren’t “a single slow line.” They’re a slow *path*.

When I approach a performance issue, I try to avoid two common traps:

- Making changes without knowing if they target the real bottleneck
- “Fixing” the average while the tail latency stays painful

## A small loop that works

1. **Pick a user-facing symptom** (e.g. “dashboard loads slowly”).
2. **Instrument the path** with a correlation ID and timing around the major steps.
3. **Reproduce a real-ish workload** (tenant size matters).
4. **Change one thing** (query shape, payload size, caching, N+1, etc.).
5. **Re-measure** and keep the delta.

## What I look for early

- Payload size and response shaping
- Unbounded queries or missing limits
- Index coverage for the real filters
- Work that should be async (backfills, aggregation)

The goal isn’t “fast at all costs.” It’s **predictably fast**, with guardrails so it stays that way.