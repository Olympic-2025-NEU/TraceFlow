<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Nexora Agent Instructions

## Read first

1. `documents/referents/SOURCE_OF_TRUTH.md`
2. `ARCHITECTURE.md`
3. Module plan in `documents/plans/` for the feature you touch
4. `documents/referents/CODING_RULES.md` and `FOLDER_STRUCTURE.md`

## MVP modules (Chapter 6)

| Code | Plan |
| --- | --- |
| Platform | `documents/plans/00-platform-dxos.md` |
| M01 | `documents/plans/M01-system-partner.md` |
| M02 | `documents/plans/M02-product-inventory.md` |
| M03 | `documents/plans/M03-trading-distribution.md` |
| M04 | `documents/plans/M04-traceability-federation.md` |
| AI01 | `documents/plans/AI01-ai-support.md` |

Build order and edges: `documents/plans/DEPENDENCIES.md`.

## Skills

Use project skills under `.cursor/skills/` when relevant:

- `nexora-implement-module`
- `nexora-domain-modeling`
- `nexora-federation-events`
- `nexora-ai-tools`

## Hard constraints

- Self-hosted single-org per instance; not SaaS multi-tenant.
- Stack: Next.js + TypeScript + PostgreSQL (Chapter 7.12) — not Laravel.
- Do not expand MVP with finance/CRM/full POS/production.
- Target folders: `contexts/system|catalog|inventory|trading|traceability|federation`, `services/ai`. Legacy `sales|finance|procurement|master-data` scaffolds are not the standard.
