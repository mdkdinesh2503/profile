---
title: "REST Worked Fine — So Why Did We Need gRPC?"
date: "2026-09-16"
summary: "REST worked perfectly well for every API I had built. So when I first worked with gRPC, I asked: Why do backend services need another protocol? The answer became clear when I looked at who was consuming the API."
tags: ["API Design", "Architecture"]
image: "/blogs/rest-vs-grpc-different-boundaries.webp"
imageAlt: "Architectural comparison between REST with JSON payloads for external clients and high-performance binary gRPC over HTTP/2 for internal microservices"
readTime: 4
---

## The Question Every Backend Engineer Asks

REST works. It is universal, understandable, and battle-tested.

You open a terminal, fire a `curl` request, and receive clean, readable JSON in return:

```http
GET /users/42 HTTP/1.1
Host: api.example.com

{
  "id": 42,
  "name": "Alex",
  "role": "engineer"
}
```

So when I first encountered **gRPC**, my immediate reaction was:

> *"Why do backend services need another way to communicate? What was wrong with REST and JSON?"*

The answer became clear when I shifted my focus from the technology itself to **the consumer of the API**.

A browser or mobile app consuming an API and an internal microservice consuming an API have fundamentally different constraints and priorities.

---

## 📄 The REST Mental Model: Endpoints & JSON

With REST, we design around web concepts:
- URLs as resources (`/users/42`, `/orders`)
- Standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
- Human-readable JSON payloads
- HTTP status codes for outcomes

This model is simple to inspect in Chrome DevTools, requires zero special client libraries, and connects effortlessly to web browsers across the globe.

---

## ⚡ The gRPC Mental Model: Contracts & Protocol Buffers

gRPC approaches communication from an entirely different angle: **Remote Procedure Calls (RPC)** powered by **Protocol Buffers (protobuf)**.

Instead of starting with URL routes, you start by defining a strictly typed service contract in a `.proto` file:

```protobuf
syntax = "proto3";

package users;

service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
}

message GetUserRequest {
  int64 user_id = 1;
}

message GetUserResponse {
  int64 id = 1;
  string name = 2;
  string role = 3;
}
```

From this single `.proto` file:
- The gRPC compiler (`protoc`) automatically generates strongly typed client and server stubs in Go, Java, Rust, TypeScript, Python, and C++.
- The contract is **enforced by the compiler**, not by handwritten documentation or markdown files that drift out of date.
- Payload serialization produces a **compact binary stream** instead of verbose JSON text, saving CPU cycles and bandwidth.
- Traffic runs over **HTTP/2**, supporting multiplexing over a single TCP connection, bi-directional streaming, and header compression.

---

## ⚖️ Comparing the Trade-Offs

Neither protocol is universally superior; each solves a distinct problem:

| Dimension | REST + JSON | gRPC + Protocol Buffers |
| :--- | :--- | :--- |
| **Payload Format** | Text-based JSON (Verbose, human-readable) | Binary Protobuf (Compact, fast serialization) |
| **Transport** | HTTP/1.1 or HTTP/2 | Strictly HTTP/2 (Multiplexed streams) |
| **Contract Enforcement** | Optional (OpenAPI/Swagger; often drifts) | Mandatory `.proto` file (Code generation) |
| **Browser Compatibility** | Native (Supported by every browser) | Requires `grpc-web` proxy translation layer |
| **Streaming** | Request/Response (SSE or WebSockets needed) | Native Client, Server, and Bi-directional streaming |
| **Debugging** | Easy (`curl`, Postman, browser dev tools) | Requires reflection or specialized tooling (`grpcurl`, Postman gRPC) |

---

## 🏛️ Different Protocols for Different Boundaries

The most effective modern architectures don't force an all-or-nothing choice. They place each protocol at the boundary where its strengths shine:

```
[ Web & Mobile Clients ]
           │
           ▼ (Public Boundary: REST / GraphQL over HTTP/2)
   [ API GATEWAY ]
           │
           ▼ (Internal Boundary: Binary gRPC over HTTP/2)
 ┌─────────┼─────────┬─────────┐
 ▼         ▼         ▼         ▼
[User]  [Orders]  [Billing]  [Inventory]
    (Internal Microservices Cluster)
```

1. **Client Edge (Public Boundary):** Use **REST** or **GraphQL**. Frontends and third-party developers get human-readable payloads, simple HTTP caching, and seamless browser compatibility.
2. **Cluster Interior (Service-to-Service):** Use **gRPC**. When 15 internal microservices execute hundreds of thousands of internal calls per second, binary serialization speed, strict compiler type safety, and multiplexed HTTP/2 connections drastically reduce latency and compute costs.

---

## 💡 Key Takeaway

Never choose a communication protocol simply by asking:
> *"Which one has higher throughput on synthetic benchmarks?"*

Start by asking:
> **"Who is communicating, what contract do they need, and what operational trade-offs can this boundary accept?"**

REST connects humans and diverse web clients with simplicity and ease.  
gRPC connects machines and internal services with speed and precision.

Understanding the boundary is what makes the architecture work.
