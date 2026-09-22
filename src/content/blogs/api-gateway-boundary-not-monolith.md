---
title: "If You Have 10 Microservices, Should the Frontend Know All 10 Exist?"
date: "2026-09-09"
summary: "If a backend has 10 microservices, should the frontend talk to all 10 directly? Usually, that creates more problems than it solves. How API Gateways create clean boundaries without turning into accidental monoliths."
tags: ["System Design"]
image: "/blogs/api-gateway-boundary-not-monolith.webp"
imageAlt: "Futuristic architectural blueprint showing API gateway routing, protocol transformation from GraphQL to gRPC, and service mesh isolation"
readTime: 4
---

## Exposing Backend Topology to Clients

Imagine a single dashboard screen in a web or mobile application that needs:
- User profile information
- Recent order history
- Saved payment methods
- Unread notifications

If your architecture has 10 microservices and no centralized boundary, the frontend is forced to query them all directly:

```
[ Frontend Client ]
       ├──> [ User Service ]
       ├──> [ Order Service ]
       ├──> [ Payment Service ]
       └──> [ Notification Service ]
```

At first glance, this seems direct and simple.

In practice, **it creates more problems than it solves.**

---

## 🛑 The Problems with Direct Client-to-Service Calls

When client applications talk directly to multiple microservices, the frontend starts learning details that belong exclusively on the backend:

1. **Leaked Internal Topology:** The client must know which specific microservice owns which piece of data, their respective hostnames, and how they scale.
2. **Network Chattiness & High Latency:** Over mobile networks or high-latency cellular connections, firing 5 or 6 separate HTTP roundtrips to render one screen drains device battery and produces noticeable UI lag.
3. **Fragmented Security & Auth:** Every internal microservice must independently handle TLS certificates, CORS headers, rate limiting, and JWT validation.
4. **Tight Coupling to Refactoring:** What happens if the backend team decides to split `Order Service` into `Fulfillment Service` and `Checkout Service`? Every mobile and web client in production must be rewritten and redeployed.

---

## 🏛️ Enter the API Gateway

An **API Gateway** acts as a single, unified entry point for all external traffic:

```
[ Frontend Client ]
        │
        ▼ (Single Endpoint: api.example.com)
 [ API GATEWAY ]
  • Request Routing
  • Authentication / Token Checks
  • Request Aggregation (BFF)
  • Rate Limiting & CORS
        │
  ┌─────┼─────────────┬─────────────┐
  ▼     ▼             ▼             ▼
[User] [Orders]   [Payments]  [Notifications]
 (Internal Microservice Network)
```

With an API Gateway in place, the client talks to one domain.

The gateway receives the client request, fans it out to internal services over high-speed private networks (VPC), aggregates the responses, and returns a single, optimized payload back to the client.

---

## 🔄 Protocol Translation at the Boundary

One of the most powerful advantages of a gateway is establishing **protocol boundaries**.

The communication protocol best suited for frontend clients is often completely different from what is best for internal service-to-service communication:

```
[ Frontend Client ]
        │
        ▼ (GraphQL / REST over HTTP/2)
 [ API GATEWAY ]
        │
        ▼ (High-performance gRPC / Protobuf over HTTP/2)
 [ Internal Microservices Cluster ]
```

- **At the Client Edge:** Clients can query via **GraphQL** or clean **REST**, fetching only the exact fields they need to conserve mobile bandwidth.
- **Behind the Gateway:** Internal microservices communicate via binary, strongly-typed **gRPC**, delivering ultra-low serialization overhead and sub-millisecond inter-service calls.

The frontend gets an API designed around client screen requirements; internal services get contracts optimized for machine-to-machine speed.

---

## ⚠️ The Dangerous Trap: The Gateway Monolith

Introducing an API Gateway brings one major architectural hazard:

> **The gateway can easily become another monolith if business logic is moved into it.**

When teams start writing business validations, domain calculations, and database calls inside the gateway layer, the gateway turns into a bottleneck that every team fights over to deploy.

### The Clear Separation of Concerns:

| Component | Responsibility | Examples |
| :--- | :--- | :--- |
| **API Gateway** | Cross-cutting edge concerns & protocol handling | Request routing, SSL termination, JWT signature validation, rate limiting, CORS, response aggregation. |
| **Microservices** | Domain rules and business logic | Calculating order totals, charging credit cards, updating inventory, processing user refunds. |

---

## 💡 Key Takeaway

The goal of an API Gateway is not simply to insert another layer into your infrastructure.

**It is to establish a clear architectural boundary.**

A well-designed API Gateway hides internal backend topology from clients without absorbing business logic inside itself. It protects both the frontend from backend complexity and the backend from external chaos.
