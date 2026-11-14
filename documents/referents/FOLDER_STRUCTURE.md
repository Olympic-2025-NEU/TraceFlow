# Cấu trúc thư mục đích

```text
nexora/
  apps/dx-lab/              # Frontend H-P-D-I tầng 2, runtime riêng (đích)
  app/
    api/v1/                 # Route handler mỏng — adapter HTTP
    (workspace)/            # ERP UI (Staff / Admin)
    (public)/               # Product Passport, QR public
    (console)/              # Vận hành / cấu hình (khi cần)
  components/
    shell/                  # Khung layout Tailwind
    ui/                     # Primitive UI (shadcn khi dùng)
  platform/                 # Ports/adapters dùng chung để tích hợp lõi DX-OS headless
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
    core-data/               # API metadata/projection và file headless, không UI
    ai/                     # AI01 — tool-calling service
  composition/              # Wire ports, event handlers giữa contexts
  db/migrations/
  deploy/                   # Cấu hình lõi headless và multi-instance demo A/B/C (đích)
  documents/
    referents/
    plans/
    phase-plan/              # Task/gate thực thi Phase 00–13 (đích kế hoạch)
    nexora/                 # Đề xuất gốc
  ARCHITECTURE.md
  AGENTS.md
  CHANGELOG.md
  LICENSE                   # GNU AGPL v3 only
```

Lõi headless là các dịch vụ triển khai và API của chúng (Identity/SSO, API Gateway, core data/file API cho dữ liệu có/không cấu trúc, Workflow). `services/core-data/` là runtime không UI; nó cung cấp metadata/projection và file có quyền, không sở hữu transaction chứng từ/tồn của ERP. `apps/dx-lab/` là frontend tầng 2 khác runtime Nexora ERP. Thư mục `platform/` chứa hợp đồng và adapter TypeScript để ứng dụng Nexora sử dụng các dịch vụ đó; không đại diện cho toàn bộ PaaS đã triển khai. Hiện `deploy/` mới có PostgreSQL.

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
