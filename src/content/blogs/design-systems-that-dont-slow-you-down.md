---
title: "Design systems that don't slow you down"
date: "2025-09-28"
summary: "A component system should reduce decisions, not add meetings. Start with primitives and bake quality into defaults."
tags: ["frontend"]
readTime: 3
---

The best design systems feel boring—in a good way.

They quietly remove repeated work:

- spacing decisions
- interaction states
- accessibility details
- inconsistent patterns across teams

## Start with primitives

If I’m standardizing UI, I start with components that show up everywhere:

- buttons
- inputs
- cards
- layout/container primitives

The goal is not “a huge library.” It’s a small set of reliable building blocks.

## Bake quality into defaults

Good defaults are leverage:

- focus rings and keyboard behavior
- loading/disabled states
- sensible typography and spacing
- consistent border/shadow language

When defaults are good, engineers stop reinventing and start shipping.

## Migrate incrementally where it pays back

I usually target:

- high-traffic screens
- shared flows (auth, billing, settings)
- surfaces where inconsistency hurts trust

Incremental migration is slower than a rewrite on paper, but faster in real orgs because it doesn’t block product work.

## Document decisions, not rules

Instead of “always do X,” I document:

- the reasoning
- the trade-offs
- the exceptions

That gives teams a shared mental model, not a checklist.