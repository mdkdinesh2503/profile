---
title: "Incident reviews without blame (and with better outcomes)"
date: "2026-02-02"
summary: "A useful incident review improves the system, not the story. Focus on contributing factors, guardrails, and follow-through."
tags: ["reliability"]
---

The point of an incident review isn’t to assign fault. It’s to reduce the chance of recurrence.

When reviews drift into blame, teams learn the wrong lesson: **hide risk** instead of fixing it.

## What I focus on

### Contributing factors

Not “the root cause” in isolation, but the set of conditions that made the incident possible:

- missing guardrails
- unclear ownership
- brittle dependencies
- poor observability
- unsafe defaults

### Detection and diagnosis

Two questions matter:

- **How did we know?**
- **How long did it take to understand what was happening?**

If diagnosis takes too long, I usually invest in:

- clearer state transitions
- correlation IDs
- actionable alerts

### Fixes that stick

I prefer fewer, higher-leverage actions:

- automated checks
- safer rollout patterns
- tests around known failure modes
- documentation that on-call will actually use

## The real metric

An incident review is successful when it makes the system:

- easier to operate
- harder to break accidentally
- faster to diagnose under stress

That’s how teams build trust—with each other and with production.