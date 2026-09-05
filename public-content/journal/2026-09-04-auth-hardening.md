---
id: journal-2026-09-04
date: 2026-09-04
project: Multi-Tenant n8n SaaS Portal
category: security
public: true
status: published
title: Hardened authentication and session handling
summary: Completed a security hardening pass on the SaaS portal — HttpOnly sessions, cookie clearing on logout, and Row Level Security — with every finding documented and verified.
technologies:
  - Next.js
  - Supabase
  - PostgreSQL
---

# Hardened authentication and session handling

**Project:** Multi-Tenant n8n SaaS Portal
**Date:** September 4, 2026
**Category:** Security

## What I worked on

- Made login establish the session server-side, so the session cookie is HttpOnly from the very first request and raw tokens never reach the browser.
- Hardened cookie handling: pinned HttpOnly/SameSite/Secure flags, and preserved cookie attributes when forwarding them across tenant subdomain rewrites.
- Fixed logout so it clears every session cookie scheme (legacy and current), not just one.
- Documented the tenants table schema and Row Level Security policies so every query is scoped to the authenticated user.
- Added a Vitest test harness covering auth routes, cookie clearing, and webhook provisioning behavior.

## What I learned

- Authentication failures are usually cookie-layer failures: flag defaults, mixed cookie schemes, and lost attributes during rewrites.
- RLS is the backstop: even if an API route makes a mistake, the database refuses cross-user access.
- Every security change should carry a finding ID and a verification record, not just a code edit.

## Challenges

- Two session cookie schemes coexisting (legacy manual cookies + the SSR session store) made logout incomplete.
- The proxy rewrite layer dropped cookie attributes when forwarding to tenant subdomains.

## Outcome

43/43 automated tests pass; typecheck and build green. Phase 2 hardening complete; live-environment verification steps remain (applying the RLS script to the database and a live Stripe webhook test).

## Next step

Complete live-environment verification: apply RLS policies to the database and run a real Stripe webhook test.

## Technology

Next.js, Supabase SSR, PostgreSQL RLS, Vitest, Stripe.