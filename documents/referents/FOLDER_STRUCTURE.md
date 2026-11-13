# Cấu trúc thư mục đích

```text
nexora/
  app/
    api/v1/                 # Route handler mỏng — adapter HTTP
    (workspace)/            # ERP UI (Staff / Admin)
    (public)/               # Product Passport, QR public
    (console)/              # Vận hành / cấu hình (khi cần)
  components/
    shell/                  # Khung layout Tailwind
    ui/                     # Primitive UI (shadcn khi dùng)
  platform/                 # Lõi DX-OS dùng chung
    kernel/
    identity/
    access/
    audit/
    workflow/
    outbox/
    files/
    persistence/
    http/
  contexts/
    system/                 # M01
    catalog/                # M02 — product, batch
    inventory/              # M02 — warehouse, balance
    trading/                # M03
    traceability/           # M04 — events, QR, passport
    federation/             # M04 — exchange với instance đối tác
  services/
    ai/                     # AI01 — tool-calling service
  composition/              # Wire ports, event handlers giữa contexts
  db/migrations/
  deploy/                   # Docker Compose, multi-instance demo A/B/C
  documents/
    referents/
    plans/
    nexora/                 # Đề xuất gốc
  ARCHITECTURE.md
  AGENTS.md
```

## Luật import

1. `app/` chỉ gọi public API của context (`contexts/<name>/index.ts`) hoặc application service qua composition. Không chứa quy tắc nghiệp vụ.
2. `platform/` không import `contexts/` hoặc `services/ai/`.
3. Context A không import domain/infrastructure của context B. Chỉ giao tiếp qua port (interface) do context sở hữu, được wire ở `composition/`.
4. Mỗi context export công khai qua `index.ts`.
5. `services/ai/` chỉ gọi API nghiệp vụ đã phân quyền; không ghi DB trực tiếp.

## Lớp trong mỗi context

```text
contexts/<name>/
  domain/           # Aggregate, value object, domain service, domain event
  application/      # Use case, ports
  infrastructure/   # Repository, SQL, adapter ngoài
  index.ts          # Public surface
```

## Schema PostgreSQL gợi ý

| Schema | Nội dung |
| --- | --- |
| `platform` | Audit, outbox, idempotency, attachment metadata |
| `system` | Organization, membership, partner, connection |
| `catalog` | Product, identifier, batch |
| `inventory` | Warehouse, balance, movement |
| `trading` | Receipt, issue, transfer, stocktake, sale record |
| `traceability` | Trace event, links, QR token |
| `federation` | Outbound/inbound message, ack, mapping |

Một instance một database. Không dùng `tenant_id` SaaS đa tổ chức trên cùng DB.
