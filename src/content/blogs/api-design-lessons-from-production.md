---
title: "A Working API Is Not Always a Well-Designed API"
date: "2026-08-07"
summary: "An API may return the correct response today and still become difficult to maintain tomorrow. Most API problems don't begin with code—they begin with unclear contracts."
tags: ["API Design"]
image: "/blogs/api-design-lessons-from-production.webp"
imageAlt: "Futuristic blueprint of clean API architecture, REST resources, idempotency, status codes, and resilient gateway contracts"
readTime: 4
---

## Working Code vs. Good Design

A working API is not always a well-designed API.

It may return the correct response today and still become painful to maintain, scale, and integrate as the system grows.

While designing and operating backend APIs in production, I learned that many API problems do not originate in the implementation code.

**They begin with unclear contracts.**

When API contracts are ambiguous, every client has to write defensive code, handle edge cases inconsistently, and guess what happens when something fails.

Here are 7 common API design pitfalls and how to avoid them.

---

## 1. 🎯 Using Actions Instead of Resources

HTTP already provides verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`). Embedding actions directly into URL paths creates redundant, ad-hoc endpoints.

- ❌ **Less clear / Action-oriented:**
  ```http
  POST /getUserOrders
  POST /deleteUserOrder?id=123
  ```
- ✅ **Resource-oriented & predictable:**
  ```http
  GET    /users/{userId}/orders
  DELETE /users/{userId}/orders/{orderId}
  ```

A predictable, hierarchical structure makes APIs intuitive to navigate and self-documenting.

---

## 2. 🧩 Returning Inconsistent Response Formats

Inconsistency is the fastest way to frustrate client developers.

- Endpoint A returns:
  ```json
  { "data": [ ... ] }
  ```
- Endpoint B returns:
  ```json
  { "result": [ ... ] }
  ```
- Endpoint C returns the raw array directly:
  ```json
  [ ... ]
  ```

### A Standard Envelope
Establish a consistent envelope structure across the entire platform:

```json
{
  "success": true,
  "data": {
    "id": "ord_987",
    "status": "completed"
  },
  "error": null,
  "meta": {
    "timestamp": "2026-09-22T11:00:00Z"
  }
}
```

Uniform response structures minimize boilerplate and conditional logic on mobile apps, frontends, and external consumers.

---

## 3. 🚦 Misusing HTTP Status Codes

Returning `200 OK` for every scenario (with `{ "error": "Unauthorized" }` buried in the body) obscures failures from reverse proxies, monitoring tools, and HTTP clients.

HTTP status codes exist for a reason:

| Status Code | Meaning | When to Use |
| :--- | :--- | :--- |
| `200 OK` | Success | Standard successful response for `GET`, `PUT`, `PATCH`. |
| `201 Created` | Resource Created | Successful `POST` that produces a new entity. |
| `204 No Content` | Success (No Body) | Successful `DELETE` or action where no payload is returned. |
| `400 Bad Request` | Validation Error | Client passed invalid parameters, missing fields, or malformed JSON. |
| `401 Unauthorized` | Unauthenticated | Missing, invalid, or expired authentication token. |
| `403 Forbidden` | Access Denied | Authenticated user lacks permission for this resource. |
| `404 Not Found` | Missing Resource | The specified URI or entity does not exist. |
| `409 Conflict` | State Conflict | Duplicate resource creation or concurrent edit conflict. |
| `429 Too Many Requests` | Rate Limited | Client exceeded request quota. |
| `500 Internal Error` | Server Exception | Unhandled unexpected failure on the backend. |

---

## 4. 🛡️ Leaking Internal Implementation Details

Public API responses should never expose underlying database schemas, internal ORMs, or raw stack traces.

- ❌ Leaking internal details:
  ```json
  {
    "error": "pq: relation \"tbl_usr_v2_pvt\" does not exist at line 44 in user_service.go"
  }
  ```
- ✅ Clean, sanitized external response:
  ```json
  {
    "code": "RESOURCE_UNAVAILABLE",
    "message": "Unable to process the request at this time. Please try again later.",
    "traceId": "req_8f7b2c"
  }
  ```

Exposing internal internals creates security vulnerabilities (information disclosure) and tightly couples clients to internal schemas, making refactoring risky.

---

## 5. 📄 Ignoring Pagination Early

An endpoint like `GET /api/v1/orders` might return 15 records in testing. But in production, that same endpoint could attempt to serialize 200,000 rows, exhausting memory and crashing the service.

Always design collections with pagination from day one:

```http
GET /api/v1/orders?page=1&limit=20
```
Or with cursor-based pagination for high-velocity feeds:
```http
GET /api/v1/orders?cursor=eyJpZCI6MTAxfQ&limit=20
```

---

## 6. 🔁 Forgetting Idempotency

In distributed networks, requests fail or time out, and clients retry.

If a network timeout occurs during a payment or order placement, does repeating the request charge the user twice?

Idempotent methods (`GET`, `PUT`, `DELETE`) inherently produce the same state regardless of repetitions. For non-idempotent operations (`POST`), introduce an **Idempotency Key**:

```http
POST /api/v1/payments
Idempotency-Key: 7b9d33a1-94f4-41d5-bc44-59e612f009ef
```

The backend checks Redis or the database for that key. If already processed, it returns the cached result without repeating the business transaction.

---

## 7. 🌧️ Designing Only for the Happy Path

Many APIs look great when everything succeeds, but crumble during edge cases.

A comprehensive API contract defines:
- **Validation Failures:** Clear error structures showing exactly which field failed and why.
- **Authentication & Authorization:** Consistent headers and status codes.
- **Partial Failures & Fallbacks:** How bulk operations communicate partial successes.
- **Retry Semantics:** Providing `Retry-After` headers during rate limiting (`429`) or maintenance.

---

## 💡 Key Takeaway

API design is not merely about exposing backend functionality over HTTP.

It is about creating a **clear, consistent, secure, and maintainable contract between systems**.

Good APIs reduce confusion before they reduce code.
