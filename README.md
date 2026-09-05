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

## Admin area (owner only)

`/admin` is a password-protected publication console:

- Set `ADMIN_PASSWORD` in `.env.local` (server-side only, minimum 8 chars).
- Login issues an HttpOnly, HMAC-signed session cookie (12h TTL) with login
  rate limiting and Origin checks on mutations.
- **Publication Queue** — candidates land in `data/queue/` (gitignored), are
  auto-sanitized on import, and only a human can approve them. Approval runs
  a sensitive-content scan; candidates with violations are blocked.
- **Content Manager** — publish / unpublish anything in `public-content/`.
  Unpublished items disappear from the public site immediately.
- **Audit Log** — append-only `data/audit.jsonl` of every CREATED / EDITED /
  SANITIZED / APPROVED / PUBLISHED / UNPUBLISHED / REJECTED action.
- **Export** — download all public data as JSON (spec: exportable public data).

### Publication flow

```
WORK → Agentic OS → daily log → candidate (data/queue/) → SANITIZE
  → human review → APPROVE → public-content/ (status: published)
  → portfolio pages + public API
```

Anything without `status: published` AND `public: true` never renders
anywhere — not on pages, not in the API, not in the sitemap.

> Draft candidates in `data/queue/` may contain pre-sanitization content and
> are gitignored for that reason. The audit log is gitignored too.

## Sensitive-data scan

The publication layer scans content for API keys, passwords, tokens, private
keys, bearer tokens, emails, phone numbers, internal IPs, internal hostnames,
and filesystem paths before anything can be approved. Matches are flagged in
the queue review screen and can be auto-replaced with `[REDACTED]` on import.

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