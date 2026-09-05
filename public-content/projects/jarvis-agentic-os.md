---
id: jarvis-agentic-os
title: JARVIS Agentic OS
status: published
projectStatus: IN DEVELOPMENT
currentPhase: Portfolio publication layer
public: true
summary: A local-first AI engineering command center that turns an Obsidian knowledge vault into a planning, building, testing and verification workspace.
technologies:
  - Obsidian
  - Markdown
  - Agentic Workflows
  - TypeScript
  - Verification Systems
  - Automation
date: 2026-08-01
lastUpdated: 2026-09-05
category: ai-agentic
sortDate: 2026-09-05
---

# JARVIS Agentic OS

**Status:** IN DEVELOPMENT — current phase: portfolio publication layer

## Overview

JARVIS is a local-first AI engineering environment. It keeps a large Obsidian vault as the knowledge layer and layers an agent workflow on top: specialist agents, commands, skills, rules, findings, and verification records. Every request moves through a fixed loop — scan (read-only), analyze, plan, review, implement, test, verify — so work is evidence-based rather than assumption-based.

## Problem

Building software with AI assistance can easily turn into unverified, undocumented change. Notes, decisions, findings, and verification results were spread across different places, and nothing enforced a consistent loop between planning and proof.

## Goal

Create one local workspace where AI-assisted engineering is disciplined: requests become plans, plans become atomic tasks, tasks end with verification, and every claim carries a confidence level.

## Technology

- **Obsidian** — the knowledge vault (notes, tasks, plans, findings, verification)
- **Markdown + YAML frontmatter** — every note is machine-readable
- **Agent definitions, commands, skills, rules** — role-based engineering workflow (planner, architect, code reviewer, security reviewer, build-error resolver, e2e runner, refactor cleaner, doc updater)
- **TypeScript tooling** — operational scripts and the interface
- **Confidence levels** — VERIFIED / LIKELY / POSSIBLE / UNKNOWN on every claim

## Architecture

```text
Human Request
      ↓
Agentic OS (vault as knowledge layer)
      ├── Scan (read-only) → findings
      ├── Plan → atomic tasks + dependencies
      ├── Independent review of the plan
      ├── Implement → test → verify (evidence recorded)
      └── Session resume notes + daily logs
      ↓
Controlled publication layer → public portfolio
```

## What I Built

- A knowledge vault structure with typed notes: tasks (TASK-*), plans, findings (SEC-*, ARCH-*, TEST-*, CFG-*), verification matrices, ADR-format decisions, session resume notes.
- A role-based agent registry that routes work to specialist agents instead of doing everything in one pass.
- A workflow of rules and commands that enforces read-only scanning, independent plan review, and verification before claims.
- An interface and dashboard that reads the vault and exposes status, findings, verification, and knowledge views.
- A controlled publication concept that separates private working state from public portfolio content.

## What I Learned

- Separating internal AI development knowledge from public portfolio information requires an explicit publication layer, not ad-hoc filtering.
- Verification is a discipline: confidence levels prevent presenting guesses as facts.
- File-based state (Markdown + JSON) keeps a system portable and inspectable without a database.

## Challenges

- Keeping the private vault private while still showing real engineering work publicly.
- Making the workflow reliable when tools change (framework migrations, new conventions).
- Ensuring plans are reviewed by an independent reviewer before implementation.

## Solutions

- Defined a strict public/private boundary with a sanitization + human-approval publication pipeline.
- Recorded every implementation phase with findings and verification evidence in the vault.
- Used resume notes with keywords so any session can be continued from its last verified state.

## Current Status

Active Development. The current focus is the portfolio publication layer — this website — which demonstrates the workflow publicly.

## Future Improvements

- Automate the publication pipeline from approved vault content into the portfolio.
- Add a public AI assistant restricted to public portfolio knowledge.
- Expand verification records and case studies as projects complete.

## Verification

- Workflow verified by evidence recorded in vault notes: findings, verification matrices, session logs, and commit history per phase.
- This portfolio itself is the outcome of the documented audit → plan → build → verify loop.

## Related Updates

- 2026-09-05 — Designed the portfolio publication architecture (public/private separation, sanitization, human approval).
- 2026-09-04 — Feature-gap assessment of the JARVIS interface; 15 dashboard views verified live.
- 2026-09-04 — Planning report: workspace scan (700+ files), task board, and recommended next actions.