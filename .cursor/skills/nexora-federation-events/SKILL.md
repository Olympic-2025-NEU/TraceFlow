---
name: nexora-federation-events
description: >-
  Implements federated event exchange between Nexora instances: auth, ack,
  retry, deduplication, and lot mapping. Use for M04, Partner Transfer,
  Receiving Confirmation, or multi-instance demo A/B/C.
---

# Federation events

## Principles

- Instances never share a database; only signed/authenticated HTTP APIs.
- Technical ack ≠ business receiving confirmation.
- Outbox on sender; inbound dedupe by message id on receiver.
- Retry with backoff; preserve idempotency.
- Map partner product/lot ids via explicit `IdentityMapping` (NX-FED-03).
- Traceability events need id, timestamp, issuer, and document/evidence reference.

## Implementation checklist

1. Partner connection credentials from M01.
2. Versioned payload schema.
3. Outbound: write outbox in same TX as confirm.
4. Inbound: authenticate → dedupe → persist → ack.
5. UI/ops: retry failed messages.
6. Tests: retry, dedupe, auth failure, A→B→C history (AC-05…AC-07).
