---
id: n8n-saas-portal
title: Multi-Tenant n8n SaaS Portal
status: published
projectStatus: IN DEVELOPMENT
currentPhase: Live-environment verification
public: true
summary: A SaaS that sells and provisions dedicated n8n automation instances per customer — payments, per-tenant provisioning, live status, and security hardening, built and verified in phases.
technologies:
  - Next.js
  - TypeScript
  - React
  - Tailwind CSS
  - Supabase
  - PostgreSQL
  - Stripe
  - n8n
  - Coolify
date: 2026-08-20
lastUpdated: 2026-09-05
category: saas
sortDate: 2026-09-04
---

# Multi-Tenant n8n SaaS Portal

**Status:** IN DEVELOPMENT — core complete, live-environment verification pending.

## Overview

A SaaS web application where customers subscribe and receive their own dedicated n8n automation instance. The portal handles authentication, subscription payment, automatic instance provisioning, live instance status, expiration handling, and deletion — with a security hardening pass applied across two documented phases.

## Problem

Providing n8n automation to multiple customers by hand means manual provisioning, no billing, no isolation between customers, and no way to prove who owns what. The goal was a productized flow: pay → instance appears → works → expires or is deleted, all isolated per user.

## Goal

A working multi-tenant SaaS: signup/login, subscription plans, Stripe checkout, automatic n8n provisioning on a server host, per-user instance management, and tenant subdomain routing — with security as a first-class concern, not an afterthought.

## Technology

- **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4**
- **Supabase** — authentication (SSR, HttpOnly cookies) + PostgreSQL with Row Level Security
- **Stripe** — Checkout sessions + signed webhooks with idempotent provisioning
- **Coolify** — hosting platform API that provisions each customer's n8n service
- **n8n** — the automation product delivered per tenant
- **Vitest** — 43 unit tests covering auth, cookies, webhooks, pricing, config
- **Custom proxy middleware** — tenant subdomain rewrites (`tenant.domain.com → /tenant/…`)

## Architecture

```text
Browser
  ↓
Proxy middleware (tenant subdomain rewrites + session refresh)
  ↓
Next.js App Router
  ├── /login /dashboard (auth)          ── Supabase SSR
  ├── Stripe Checkout + Webhook         ── payment → provision
  ├── Tenant API (status, delete)       ── user-scoped, RLS-backed
  └── Coolify API                       ── provisions n8n per tenant
```

## What I Built

- Server-side auth routes (login/signup/logout) that establish an HttpOnly session cookie from the very first request — no tokens ever reach the browser.
- A Stripe webhook handler that reserves a tenant row before provisioning, provisions through a single shared code path, and guards against duplicate deliveries.
- A tenant dashboard with live status polling (running / booting / expired), plan selection, Stripe checkout, and instance deletion.
- A proxy layer that routes customer subdomains to their tenant without exposing raw cookies or LAN fallbacks.
- Row Level Security policies scoping every query to the authenticated user.

## What I Learned

- Cookie handling is where auth silently breaks: HttpOnly/SameSite/Secure flags must be pinned explicitly, and logout must clear every session cookie scheme.
- Webhook idempotency matters: Stripe retries within minutes, so the same checkout must never provision twice.
- Tenant isolation needs defense in depth: RLS policies + ownership checks in the API + never trusting client-supplied IDs.

## Challenges

- Legacy and current session cookie schemes coexisting (logout missed one scheme).
- Webhook duplicate deliveries creating duplicate services.
- Tenant status updates accepting attacker-influenced service IDs.
- Hardcoded LAN fallbacks leaking internal addresses.

## Solutions

- Centralized cookie options with secure defaults and a logout routine that clears all known session cookie names (findings SEC-009, SEC-015).
- Reservation-before-provisioning with a status-based idempotency guard (SEC-002, ARCH-004).
- Ownership verification on every tenant operation; client-supplied IDs never trusted (Phase 1 review fixes).
- Removed LAN fallbacks; environment access fails fast with the missing key name (SEC-003).

## Current Status

Implementation complete across two documented phases (baseline/lint → security hardening). 43/43 unit tests pass; build and typecheck green. Remaining work is live-environment verification only (applying the RLS script to the database and a live Stripe webhook test).

## Future Improvements

- Email verification and password reset flows.
- Rate limiting on authentication endpoints.
- Subscription lifecycle beyond one-time payment (renewals, proration).
- Migration of the tenant provisioning to a more portable hosting model.

## Verification

- 43 automated tests (auth routes, cookie clearing, webhook provisioning, pricing, config).
- Git history documents each phase: baseline (Phase 0), ownership + admin gating (Phase 1), security hardening (Phase 2: SEC-002 through SEC-017).
- Review record: independent code review of Phase 2, with high-severity finding fixed (server-side session establishment).

## Related Updates

- 2026-09-04 — SEC-017: login establishes the session server-side (HttpOnly from the first request).
- 2026-09-04 — SEC-016: tenant schema + Row Level Security policies documented.
- 2026-09-04 — SEC-015: logout now clears both session cookie schemes.