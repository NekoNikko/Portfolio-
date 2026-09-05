---
id: live-agentic-portfolio
title: Live Agentic Engineering Portfolio
status: published
projectStatus: IN DEVELOPMENT
currentPhase: Deployment preparation
public: true
summary: The site you are reading — a controlled public window into private engineering work, with a publication filter, human approval, and a public-safe content layer.
technologies:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Markdown
  - Sanitization
  - SEO
date: 2026-09-05
lastUpdated: 2026-09-05
category: portfolio
sortDate: 2026-09-05
---

# Live Agentic Engineering Portfolio

**Status:** IN DEVELOPMENT

## Overview

This portfolio is not a mirror of a private environment. It is a curated public window into real engineering work. Private working notes, tasks, prompts, and internal findings stay private; only approved, sanitized content reaches the public site through a publication pipeline.

## Problem

A developer using a local AI engineering environment produces rich evidence of how they work — plans, decisions, findings, verification — but that material is private and messy. Publishing it raw would leak internal paths, task IDs, secrets, and half-baked thoughts. A normal static portfolio hides the process entirely.

## Goal

Publish the *process*, safely: show real projects, an engineering journal, case studies, and the AI-assisted methodology — while keeping the private environment strictly out of the public site.

## Technology

- **Next.js 16 (App Router), TypeScript, Tailwind CSS 4**
- **Markdown + frontmatter content layer** (`public-content/`) — portable, editable outside the app
- **Server-side markdown rendering with sanitization**
- **Read-only public API** (`/api/public/*`)
- **SEO**: per-page metadata, Open Graph, sitemap, robots.txt, canonical URLs

## Architecture

```text
Private workspace (Agentic OS)
      ↓  explicit, human-triggered
Publication candidates (sanitized)
      ↓  human review
APPROVED content  →  public-content/  (status: published)
      ↓
Portfolio pages + public API (server-side reads only)
```

## What I Built

- A public-safe content layer: Markdown with frontmatter (`public`, `status`, `date`, `project`, `category`) — only `published` + `public: true` items render.
- A JARVIS-inspired dark theme with clean cards, technical typography, and restrained accents.
- Pages for projects, project details, engineering journal, case studies, skills, how-I-work, about, and contact.
- A read-only public API exposing only approved content.
- A sanitizer that strips HTML and dangerous content from rendered markdown.

## What I Learned

- Public/private separation is a design decision, not a filter you bolt on afterwards.
- File-based Markdown content keeps a portfolio portable and maintainable through the same tools used for knowledge management.
- Honest metrics (computed from actual published content, "Not yet available" otherwise) build more credibility than impressive-looking numbers.

## Challenges

- Representing a living workflow without exposing the private environment.
- Keeping the site fast and static-friendly while still serving a public API and (later) an admin area.

## Solutions

- Strict frontmatter gating: nothing renders unless explicitly marked public and published.
- Server-side-only content reads; the browser never touches the filesystem.
- Environmental configuration (`PUBLIC_BASE_URL`, `PORT`) so the app runs on localhost now and behind a Cloudflare Tunnel later.

## Current Status

Foundation and core pages built. Next phases: publication queue + admin approval UI, Agentic OS synchronization, and deployment behind Cloudflare Tunnel.

## Future Improvements

- Admin area with publication queue, audit log, and unpublish.
- Agentic OS export script that turns approved daily logs into publication candidates.
- Optional public AI assistant restricted to public portfolio content.

## Verification

- Loader tests verify only published content is exposed.
- Sanitizer tests verify dangerous HTML cannot survive rendering.
- Build, typecheck, and lint are part of the workflow.

## Related Updates

- 2026-09-05 — Portfolio transformation audit completed (report: existing application analysis, architecture recommendation).
- 2026-09-05 — Publication architecture designed: sanitization, human approval, public data layer.