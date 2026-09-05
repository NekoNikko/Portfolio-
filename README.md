# Live Agentic Engineering Portfolio

A professional portfolio that doubles as a **living engineering journal** — real
projects, documented decisions, and a verified AI-assisted workflow.

This is a standalone project (separate from the `saas-portal` application).
The portfolio demonstrates how the private Agentic OS workspace produces
public engineering content through a controlled publication layer.

## Principles

```
PRIVATE BY DEFAULT · PUBLIC BY APPROVAL · AI BY ASSISTANCE · HUMAN BY AUTHORITY
VERIFICATION BEFORE CLAIMS · SECURITY BEFORE CONVENIENCE
```

- The portfolio **never reads the private Agentic OS vault**. Its only content
  source is this project's own `public-content/` directory.
- Content renders **only** when frontmatter says `status: published` and
  `public: true`.
- All markdown is sanitized server-side before rendering.
- Metrics are computed from published content — never fabricated.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4
- `gray-matter` + `marked` + `sanitize-html` (content pipeline)
- Vitest (tests)
- Zero required environment variables (runs on localhost out of the box)

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm start          # serve production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest
```

## Content workflow

```
Agentic OS (private)  →  candidate (sanitized)  →  human review  →  APPROVED
        →  public-content/  (status: published)  →  portfolio pages + API
```

Add or edit Markdown files under `public-content/`:

```
public-content/
├── site.json          # identity, hero, contact, currently building
├── skills.json        # skill groups (evidence-based levels)
├── updates.json       # activity feed
├── projects/          # project pages (frontmatter: id, title, status, public, …)
├── journal/           # engineering journal entries
└── case-studies/      # in-depth case studies
```

Required frontmatter for publishable content:

```yaml
status: published     # anything else = not public
public: true
```

Anything missing either field never renders anywhere — not on pages, not in
the API, not in the sitemap.

## Public API (read-only, approved content only)

```
GET /api/public/projects
GET /api/public/projects/:slug
GET /api/public/journal
GET /api/public/case-studies
GET /api/public/skills
GET /api/public/updates
```

## Environment

See `.env.example`. `PUBLIC_BASE_URL` (canonical URLs / sitemap) and `PORT`
(default 3000). No secrets are required or used.

## Deployment

The app runs on a local PC (`localhost:PORT`). It is designed to be exposed
later through a Cloudflare Tunnel at the infrastructure level — no tunnel
credentials ever belong in this repository.

## Related

- `PORTFOLIO_TRANSFORMATION_REPORT.md` — the Phase 0 audit that preceded this
  build (architecture, security findings, recommended phases).
- `../saas-portal` — the multi-tenant n8n SaaS used as the flagship case study.