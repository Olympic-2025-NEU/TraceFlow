---
name: nexora-ai-tools
description: >-
  Builds Nexora AI Support tools that call permissioned business APIs, create
  drafts only, and explain rule-based batch risks. Use for AI01, chat tools,
  or assistants over lots and documents.
---

# AI tools

## Principles

- Tools call existing business APIs with the **current user** authorization.
- Never write stock or confirm documents from AI.
- Draft-only for NX-AI-03; user confirms in UI/API.
- Prefer deterministic rules for expiry / quantity mismatch; AI explains.
- Do not assert counterfeit without verifiable evidence.
- Allowlist tools; reject free-form destructive commands.

## Checklist

1. Define tool allowlist and JSON schemas.
2. Map each tool to M02/M03/M04 API.
3. Audit tool calls.
4. UI shows draft link + Confirm CTA.
5. Tests: authz boundary, draft-only, AC-10/AC-11.
