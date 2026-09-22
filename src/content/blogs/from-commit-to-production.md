---
title: "Writing Backend Code Is Only Half the Journey: From Commit to Running Pod"
date: "2026-09-18"
summary: "Earlier in my career, I thought deployment was just: Build → Deploy → Done. Working with real production pipelines changed that mental model. Exploring the journey from code commit to a running Kubernetes pod."
tags: ["DevOps", "Production"]
image: "/blogs/from-commit-to-production.webp"
imageAlt: "Futuristic visual deployment pipeline: Git commit, CI build, Docker image, container registry, ArgoCD sync, Kubernetes EKS pods, and observability verification"
readTime: 4
---

## The Oversimplified Mental Model

When we first start writing software, it is easy to view deployment as a trivial final step:

$$\text{Build} \longrightarrow \text{Deploy} \longrightarrow \text{Done}$$

We push our code, write a few unit tests, and assume our job is finished.

Working with real-world production systems quickly broke that simplistic assumption.

Writing clean backend code is only half the journey.

**The other half is getting that code reliably, safely, and repeatably into a live, running environment.**

---

## 🚀 The End-to-End Delivery Pipeline

A single backend change travels through multiple automated gates before users ever interact with it:

```
[ Developer Commit ]
        │
        ▼ (1) Git & Pull / Merge Request
[ Code Review & Branch Protection ]
        │
        ▼ (2) Continuous Integration (CI)
[ Automated Unit / Integration Tests & Linting ]
        │
        ▼ (3) Container Packaging
[ Build Multi-Stage Docker Image ]
        │
        ▼ (4) Artifact Storage
[ Push Tagged Image to Container Registry (ECR / Harbor) ]
        │
        ▼ (5) GitOps Sync
[ ArgoCD / Helm Synchronizes Desired State ]
        │
        ▼ (6) Orchestration & Runtime
[ Kubernetes (EKS) Pods Scheduled & Started ]
        │
        ▼ (7) Runtime Health Verification
[ Readiness / Liveness Probes & Telemetry Checks ]
```

Each stage in this pipeline serves a distinct purpose to guarantee stability:

| Stage | Core Responsibility | Why It Matters |
| :--- | :--- | :--- |
| **Git / Merge Request** | Code review & governance | Enforces four-eyes principle, linters, and branch protection rules. |
| **CI Pipeline** | Build & automated testing | Catches regressions, verifies dependencies, runs security vulnerability scans. |
| **Docker Containerization** | Runtime encapsulation | Eliminates the *"works on my machine"* problem by packaging runtime, OS libraries, and app binary together. |
| **Container Registry** | Immutable artifact storage | Stores versioned, digest-tagged images (`v1.4.2`, `sha256:...`) so rollbacks are instant. |
| **ArgoCD / GitOps** | Declarative configuration sync | Keeps live cluster state synchronized with infrastructure-as-code manifests. |
| **Kubernetes (EKS)** | Container orchestration | Handles rolling zero-downtime updates, auto-scaling, CPU/memory quotas, and health restarts. |

---

## ⚠️ A "Running" Pod Doesn't Mean You're Done

One of the most valuable lessons I learned is that deployment does not end when Kubernetes marks a pod status as `Running`.

A container can be technically running while completely broken inside:
- Did the application connect to PostgreSQL or did the connection pool fail during boot?
- Did the environment variables or secret manager credentials inject correctly?
- Did the database migration complete before the new code began serving requests?
- Are readiness probes passing so the load balancer can safely route traffic?
- Are errors appearing in the structured log stream?

The post-deployment verification phase is just as critical as the code review itself:

```
                  POD STATUS: "RUNNING"
                            │
                            ▼
              [ 1. Readiness Probe Passes ]
                            │
                            ▼
           [ 2. Traffic Routed via Ingress ]
                            │
                            ▼
             [ 3. Monitor Logs & 5xx Spikes ]
                            │
            ┌───────────────┴───────────────┐
         Healthy                         Spike / Error
            │                               │
            ▼                               ▼
     Feature Verified               Instant Rollback to
       in Production                 Previous Image Tag
```

---

## 🔍 Why Backend Engineers Must Understand Deployment

Deployment is not an isolated "DevOps ticket" that belongs to someone else on another floor.

When an incident occurs right after a release, the root cause is rarely just application logic. It often stems from:
- A mismatched environment variable or missing secret
- A broken database migration or connection leak
- A container health check failure causing a crash loop (`CrashLoopBackOff`)
- A subtle difference between staging and production resource limits

When a backend engineer understands the full path from Git commit to Kubernetes pod, debugging becomes faster, calmer, and significantly more methodical.

You stop guessing whether the code is broken and start verifying the entire chain of custody.

---

## 💡 Key Takeaway

> **Software delivery doesn't end when the code is merged.**  
> **A feature creates value only when it can be built, deployed, observed, and verified reliably in production.**

Writing the code is the creative beginning. Delivering it safely to users is what turns code into a dependable system.
