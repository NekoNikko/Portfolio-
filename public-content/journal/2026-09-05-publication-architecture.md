---
id: journal-2026-09-05
date: 2026-09-05
project: JARVIS Agentic OS
category: architecture
public: true
status: published
title: Designed the public portfolio publication architecture
summary: Defined how private engineering work becomes public content — public/private separation, sanitization, and human approval — and audited the existing application as the first step.
technologies:
  - Next.js
  - Markdown
  - Sanitization
---

# Designed the public portfolio publication architecture

**Project:** JARVIS Agentic OS
**Date:** September 5, 2026
**Category:** Architecture

## What I worked on

- Audited the existing application (a multi-tenant n8n SaaS portal) before making any changes — the transformation report documents current architecture, reusable pieces, security concerns, and the recommended direction.
- Designed the public/private data boundary: a private workspace, a sanitization step, a human-approval queue, and a public content layer.
- Defined the publication workflow: work → daily log → candidate summary → sanitization → review → approve → publish.
- Specified the public data model (projects, journal, case studies, skills, updates) with `public` and `status` gates so only approved content renders.

## What I learned

- How to separate internal AI development knowledge from public portfolio information: an explicit publication layer is required, not ad-hoc filtering.
- Auditing before transforming preserves working functionality and reveals reusable pieces (auth, admin gating, styling) that a rebuild would destroy.

## Challenges

- The existing application had no portfolio content at all — the transformation is an addition, not an edit.
- Keeping the private workspace (vault, prompts, internal findings) out of the public site while still demonstrating real engineering work.

## Outcome

A phase-by-phase plan: portfolio foundation → content pages → journal → publication layer → admin queue → Agentic OS synchronization → deployment. This site is the result of the first phase.

## Next step

Build the publication queue and admin approval flow so daily work can be published through a controlled pipeline.

## Technology

Next.js, TypeScript, Markdown, sanitization, content modeling.