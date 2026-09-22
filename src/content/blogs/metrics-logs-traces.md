---
title: "Metrics, Logs, or Traces: Where Do You Look When a System Slows Down?"
date: "2026-08-14"
summary: "A production system suddenly becomes slow. Where do you look first: Logs? Metrics? Traces? How combining all three observability signals transforms troubleshooting from guessing into a structured investigation."
tags: ["Observability"]
image: "/blogs/metrics-logs-traces.webp"
imageAlt: "Futuristic observability console showing the three pillars: Metrics with latency spikes, Traces with waterfall spans, and Logs with structured events"
readTime: 4
---

## The First Question During an Outage

A production system suddenly becomes sluggish. Response times spike. Support tickets roll in.

Where should you look first?

- **Logs?**
- **Metrics?**
- **Traces?**

The answer depends on the question you are trying to solve.

While learning more about production debugging, I found this mental model especially useful:

> **Metrics** tell us that something is wrong.  
> **Traces** show where the time was spent.  
> **Logs** help explain what actually happened.

---

## 🔍 The Scenario: An API Becomes Slow

Imagine a checkout API that usually responds in 150 ms suddenly spikes to nearly 2 seconds.

Here is what each observability pillar reveals:

### 1. 📊 A Metric Shows:
```
p95 latency increased from 200 ms to 1.8 seconds
Error rate (5xx) increased from 0.01% to 4.2%
```
**What it answers:** It alerts us that the system is unhealthy and quantifies the blast radius.

### 2. 🔗 A Trace Shows:
```
[Client Request] ──────────────────────────────────────── 1,680 ms
  ├─ [API Gateway]                 20 ms
  ├─ [Order Service (App)]        110 ms
  │    ├─ [Auth Check]             15 ms
  │    └─ [Database Query]      1,550 ms ⚠️ (Bottleneck!)
  └─ [Response Formatting]         15 ms
```
**What it answers:** It pinpoints the critical path. We don't waste time investigating authentication or gateway routing; we immediately see that **1,550 ms was spent in a specific database query**.

### 3. 📝 A Log Shows:
```json
{
  "timestamp": "2026-09-22T11:42:01.045Z",
  "level": "WARN",
  "service": "order-service",
  "requestId": "req-4821",
  "traceId": "t-a1b2c3d4",
  "event": "DATABASE_SLOW_QUERY",
  "query": "SELECT * FROM orders WHERE status = 'PENDING' AND merchant_id = $1",
  "durationMs": 1550,
  "reason": "Connection pool saturation / Lock wait timeout on index idx_merchant"
}
```
**What it answers:** It gives us the granular event details, the exact query parameters, and the root explanation (e.g., table lock contention).

---

## ⚖️ Each Signal Solves a Distinct Problem

| Pillar | Question It Answers | Key Signals & Artifacts |
| :--- | :--- | :--- |
| **📊 Metrics** | *Is the system healthy?* | Latency percentiles (p50, p95, p99), Error rates (4xx, 5xx), Request throughput (RPS), CPU / Memory / Disk usage. |
| **🔗 Traces** | *Where was the time spent?* | Request path across microservices, span durations, network hops, critical path latency bottlenecks. |
| **📝 Logs** | *What event occurred?* | Contextual records, error payloads, stack traces, tenant IDs, dependency failure descriptions. |

---

## 🧩 The Pitfall of Relying on Just One Signal

Using only one signal leaves major blind spots:

- **Metrics without context** tell us that latency spiked—but cannot explain whether it's caused by a bad deployment, a database lock, or an external third-party API outage.
- **Logs without metrics** hide macro trends. During peak load with millions of events per minute, searching unstructured logs for "slow queries" without aggregation is nearly impossible.
- **Traces without metadata** show that a service call took 2 seconds—but without log context, you won't know *why* that specific request failed.

---

## 🚀 The Ideal Debugging Workflow

Good engineering teams connect all three into a cohesive feedback loop:

```
                  1. DETECT (Metrics)
               Latency alert or error spike
                          │
                          ▼
                 2. ISOLATE (Traces)
          Follow the trace span to identify 
              the slow service or query
                          │
                          ▼
               3. INVESTIGATE (Logs)
          Filter logs by Trace ID to read
             the root error and context
                          │
                          ▼
                 4. RESOLVE & PREVENT
```

1. **Detect** the problem through metric dashboards and automated alerts.
2. **Isolate** the offending component or downstream dependency using distributed traces.
3. **Investigate** the exact cause by inspecting structured logs tagged with the trace ID.

---

## 💡 Key Takeaway

Observability is not about collecting terabytes of arbitrary data.

**It is about collecting the right evidence to understand system behavior under pressure.**

When metrics, traces, and logs are unified through shared identifiers, debugging transitions from an anxious guessing game into a methodical, evidence-driven engineering process.
