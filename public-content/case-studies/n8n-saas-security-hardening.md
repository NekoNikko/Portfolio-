---
id: n8n-saas-security-hardening
title: Hardening a Multi-Tenant SaaS in Documented Phases
status: published
public: true
date: 2026-09-04
project: Multi-Tenant n8n SaaS Portal
category: security
summary: How a working n8n provisioning SaaS was audited and hardened — sessions, cookies, RLS, webhook idempotency — with every finding, fix, and test recorded.
technologies:
  - Next.js
  - Supabase
  - Stripe
  - PostgreSQL
  - Vitest
---

# Hardening a Multi-Tenant SaaS in Documented Phases

**Status:** Published · **Project:** Multi-Tenant n8n SaaS Portal

## Problem

The application sells and provisions dedicated n8n instances. A multi-tenant system carries real risk: one customer's data or infrastructure operations must never be reachable by another. The initial version worked, but security decisions were implicit, some defaults were insecure, and there was no evidence trail connecting findings to fixes.

## Context

A Next.js App Router application with Supabase authentication and Postgres storage, Stripe billing, and Coolify provisioning n8n instances per customer. Tenant subdomains are rewritten by a proxy layer. The goal of this effort: make security explicit, tested, and documented — finding by finding.

## Approach

Work in documented phases. Phase 0 established a clean baseline (lint and build). Phase 1 added ownership checks and admin gating. Phase 2 was the security hardening pass, driven by specific findings (SEC-002 through SEC-017), each with its own task, fix, and verification record. A test harness was added early so changes were proven, not assumed.

## Architecture

```text
Browser → Proxy (subdomain rewrites, session refresh)
  → App Router
    ├── Supabase SSR auth (HttpOnly session cookies)
    ├── Stripe webhook → reserve tenant → provision via shared path
    └── Tenant APIs (status/delete) — ownership-checked, RLS-backed
Database: tenants table, RLS: select/insert/update own rows only
```

## Implementation

- **Server-side sessions (SEC-017).** Login goes through the SSR client so the session cookie is HttpOnly from the first response. The API never returns tokens; the client just navigates.
- **Cookie hardening (SEC-009, SEC-015).** Centralized cookie options pin HttpOnly/SameSite/Secure. Proxy rewrites forward full cookie attributes instead of dropping them. Logout expires every session cookie name the app has ever used.
- **Row Level Security (SEC-016).** Idempotent SQL defines the tenants schema and policies; queries in the app are scoped by user; the database refuses cross-user access even if an API route errs.
- **Webhook idempotency (SEC-002).** A tenant row is reserved *before* provisioning so Stripe's retried deliveries observe the reservation and skip. Provisioning runs through one shared, tested code path.
- **Ownership enforcement (Phase 1).** Delete and status operations verify the row belongs to the caller; client-supplied service IDs are never trusted.

## Challenges

- **Two cookie schemes coexisting.** Legacy manual cookies plus the SSR session store meant logout only cleared half the session. Fix: logout expires every known auth cookie name.
- **Duplicate webhook deliveries.** Stripe retries within minutes; naive handling would provision the same purchase twice. Fix: status-based idempotency window on the reserved tenant row.
- **Attacker-influenced parameters.** Status updates keyed on a query parameter could touch another user's row. Fix: always scope updates with the authenticated user ID.
- **Insecure defaults.** The auth library's default cookies were not HttpOnly. Fix: explicit flags everywhere a session cookie is set or forwarded.

## Solution

A documented, test-covered security pass: findings tracked from identification to verification, defensive layers (application checks + database RLS), and no tokens, secrets, or internal addresses exposed to clients.

## Testing

- 43 Vitest unit tests: login never returns tokens; credentials reach the SSR client; failures map to correct status codes; logout clears both cookie schemes; webhook provisioning writes back service id/url/expiry and skips duplicates.
- Build and typecheck clean. Live-environment steps (applying the RLS script, a real Stripe webhook test) are documented as pending user actions.

## Result

Phase 2 complete: authentication, cookies, logout, and tenant isolation are explicit and verified. The application enforces per-user isolation at both the API and database layer, and every security change is traceable to a finding.

## Lessons Learned

- Security work is only credible when it produces evidence: findings, tasks, tests, and verification records.
- Defense in depth is concrete: RLS policies are the backstop that catches API-level mistakes.
- Cookie semantics are the most fragile part of web auth — pin them explicitly, never rely on library defaults.

## Future Improvements

- Email verification and password reset.
- Rate limiting on authentication endpoints.
- Subscription renewals and lifecycle automation.
- Live-environment verification completion for the remaining manual steps.