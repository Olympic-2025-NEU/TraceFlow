---
name: nexora-implement-module
description: >-
  Implements a Nexora MVP module from its plan file. Use when starting or coding
  Platform, M01, M02, M03, M04, or AI01; when the user names a module plan; or when
  scaffolding contexts for Chapter 6 features.
---

# Implement Nexora module

## Before coding

1. Read `documents/referents/SOURCE_OF_TRUTH.md`.
2. Read the module plan under `documents/plans/` (and `DEPENDENCIES.md`).
3. Read `FOLDER_STRUCTURE.md` and `CODING_RULES.md`.
4. Confirm dependencies of earlier modules exist or stub ports explicitly.

## Implementation order inside a module

1. Domain aggregates + invariants (no I/O).
2. Application use cases + ports.
3. Migrations for the module schema.
4. Infrastructure repositories.
5. Wire in `composition/`.
6. Thin `app/api/v1` routes.
7. Minimal UI screens listed in the plan.
8. Tests listed in the plan (unit + one integration path).

## Done checks

- Plan “Tiêu chí Done” and linked AC-* from `ACCEPTANCE_MVP.md`.
- No imports that violate context boundaries.
- No MVP-out-of-scope features silently added.

## Out of scope unless plan says so

Finance, CRM, full POS, multi-tenant SaaS, Quality multi-step, Workflow builder.
