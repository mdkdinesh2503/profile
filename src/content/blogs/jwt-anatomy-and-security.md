---
title: "A JWT Looks Encrypted — But It Usually Isn't"
date: "2026-08-19"
summary: "A JSON Web Token looks like an unreadable secret cipher. But in most applications, anyone can decode it in seconds. Understanding the critical difference between encoding, signing, and encryption."
tags: ["Security"]
image: "/blogs/jwt-anatomy-and-security.webp"
imageAlt: "Futuristic breakdown of JWT architecture showing Header, Payload, and Signature, highlighting encoding vs signing vs encryption"
readTime: 4
---

## The Illusion of Secrecy

When developers first look at a JSON Web Token (JWT), they see a dense, cryptic string of random alphanumeric characters:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJ1c2VyIjoiYWxleCIsInJvbGUiOiJhZG1pbiJ9.7x9qZ2...
```

Because it looks scrambled, many assume: *"Our data is securely encrypted."*

**In almost all web applications, it is not.**

A standard signed JWT does not hide your data from anyone who intercepts it. Understanding what a JWT actually does—and doesn't do—is essential to building secure backend systems.

---

## 🔬 The Anatomy of a JWT

A standard JWT consists of three distinct parts separated by periods (`.`):

$$\text{Header} \ .\  \text{Payload} \ .\  \text{Signature}$$

```
+-------------------------------------------------------------------+
|  HEADER       | {"alg": "HS256", "typ": "JWT"}                    |
+-------------------------------------------------------------------+
                                  .
+-------------------------------------------------------------------+
|  PAYLOAD      | {"sub": "usr_42", "name": "Jane", "role": "admin"}|
+-------------------------------------------------------------------+
                                  .
+-------------------------------------------------------------------+
|  SIGNATURE    | HMACSHA256(base64(header) + "." + base64(payload))|
+-------------------------------------------------------------------+
```

- **The Header:** Specifies metadata about the token, such as the signing algorithm (`HS256`, `RS256`).
- **The Payload:** Contains claims—statements about the user and context (e.g., `sub` (User ID), `role`, `iss` (Issuer), `exp` (Expiration)).
- **The Signature:** A cryptographic hash created by combining the encoded header, encoded payload, and a secret server key.

---

## 🔑 The Critical Distinction: Encoding vs. Signing vs. Encryption

These three terms are frequently mixed up, but they serve completely different security goals:

| Concept | What It Does | Can Anyone Read It? | Purpose |
| :--- | :--- | :--- | :--- |
| **Encoding** *(Base64Url)* | Transforms binary or text into URL-safe characters. | **YES** (reversible in 1 line of code) | Safe transport over HTTP headers |
| **Signing** *(HMAC / RSA)* | Produces a cryptographic proof of authenticity. | **YES** (claims remain visible) | Guarantees **integrity** (wasn't tampered with) |
| **Encryption** *(JWE)* | Transforms plaintext into ciphertext with keys. | **NO** (unreadable without secret) | Guarantees **confidentiality** (privacy) |

> **A standard signed JWT provides integrity—not confidentiality.**

Anyone with access to the token (or anyone inspecting network traffic in dev tools) can paste it into `jwt.io` or run `atob()` in their browser console to read every single claim in plain text.

---

## 🚫 What Should NEVER Live Inside a JWT Payload

Because payloads are publicly readable, storing sensitive secrets inside a JWT is an immediate security vulnerability.

Never place these in a token:
- ❌ Passwords or password hashes
- ❌ One-Time Passcodes (OTPs)
- ❌ Payment information / credit card numbers
- ❌ Sensitive personal data (SSN, national IDs, medical records)
- ❌ Internal API secrets or database credentials

---

## 🛡️ Decoding vs. Validating: Don't Confuse the Two

A crucial backend lesson:

> **Decoding a token is NOT the same as validating it.**

Anyone can decode a Base64 string. A client or frontend debugging tool can read `{ "role": "admin" }` out of a token payload. But that proves **nothing** about whether the token is trustworthy or forged.

When your protected backend receives a JWT in the `Authorization: Bearer <token>` header, it must perform strict verification before trusting any claim:

```
[ Incoming Request + JWT ]
            │
            ▼
    1. Verify Signature (Matches Server Secret / Public Key?) ──No──> [ 401 Reject ]
            │ Yes
            ▼
    2. Check Expiration (`exp` > current timestamp?) ─────────No──> [ 401 Expired ]
            │ Yes
            ▼
    3. Validate Issuer & Audience (`iss`, `aud` match?) ──────No──> [ 401 Untrusted ]
            │ Yes
            ▼
    4. Authorize Permissions (User has access to resource?) ──No──> [ 403 Forbidden ]
            │ Yes
            ▼
   [ 200 OK Process Request ]
```

---

## 💡 Best Practices for Secure JWT Usage

1. **Keep Tokens Short-Lived:** Access tokens should expire in 10 to 15 minutes. Use refresh tokens with rotation for session renewal.
2. **Minimal Claims:** Store only what the server immediately needs to identify the caller and authorize the route (e.g., `userId`, `tenantId`, `role`).
3. **Use Strong Algorithms:** Avoid weak algorithms. Explicitly whitelist expected algorithms on the server (e.g., `RS256` or `HS256`) and explicitly reject the `none` algorithm exploit.
4. **Secure Transport & Storage:** Always transmit over HTTPS. If stored in browsers, prefer `HttpOnly`, `Secure`, `SameSite=Strict` cookies to mitigate XSS exposure.

---

## 💡 Key Takeaway

A token should prove what the server needs to know.

**It should not reveal everything the application knows about the user.**

JWTs are powerful because they provide a stateless, compact way to carry verifiable claims across distributed systems. But security does not come from using JWT—it comes from rigorous cryptographic validation, minimal claim design, and proper authorization boundaries.
