---
name: nexora-domain-modeling
description: >-
  Models Nexora domain aggregates, batch/lot rules, and Draft-to-Confirmed
  state machines. Use when designing entities, invariants, stock adjustments,
  or document lifecycle for M02/M03.
---

# Domain modeling

## Rules

- Prefer small aggregates with clear identity (`Product`, `Batch`, `GoodsReceipt`, …).
- Invariants live in domain functions/methods; throw stable `DomainError` codes.
- Document status changes only via named actions (`confirm`, `cancel`, …).
- MVP trading lifecycle: `Draft → Confirmed | Cancelled` (plus partner receiving states when needed).
- Stock quantity changes only through Inventory domain/ports.
- Batch carries identifiers, optional partner-origin reference, expiry, and status (`available` | `restricted` | `inspect`).

## Checklist when adding an aggregate

1. Identity and tenant/instance boundary (single-org DB).
2. Creation invariants.
3. Allowed transitions.
4. Side effects deferred to application layer (outbox events), not hidden I/O in domain.
5. Unit tests for illegal transitions and invariants.
