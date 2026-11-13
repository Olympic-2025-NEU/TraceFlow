# Nexora

**Nền tảng ERP nguồn mở tích hợp truy xuất nguồn gốc và liên thông chuỗi cung ứng theo kiến trúc phân tán.**

Nexora giúp doanh nghiệp quản lý sản phẩm, lô hàng, tồn kho và chứng từ nhập–xuất–chuyển giao trên hạ tầng tự vận hành (self-hosted), đồng thời trao đổi sự kiện truy xuất với đối tác qua API federation — mỗi bên giữ database riêng, không phụ thuộc một nền tảng SaaS tập trung.

Người tiêu dùng có thể tra cứu nguồn gốc được phép công bố qua mã QR / Product Passport. AI hỗ trợ tra cứu và tạo chứng từ dự thảo; xác nhận nghiệp vụ vẫn do con người thực hiện.

> Phạm vi chức năng MVP lấy theo **Chương 6** đề xuất. Tech stack lấy theo **Chương 7 §7.12**.

## Vì sao Nexora

| Vấn đề | Cách Nexora tiếp cận |
| --- | --- |
| Dữ liệu lô/hàng phân tán giữa nhiều doanh nghiệp | Mỗi tổ chức một instance; liên thông bằng sự kiện có xác thực |
| Truy xuất tách rời ERP | Sự kiện truy xuất phát sinh khi confirm chứng từ nghiệp vụ |
| Phụ thuộc SaaS / khó tùy biến | Open-source, self-hosted, Modular Monolith + DDD |
| Thiếu dấu vết trách nhiệm | Audit, outbox, trạng thái chứng từ chỉ đổi qua hành động |

## Phạm vi MVP

### Module nghiệp vụ

| Mã | Module | Nội dung chính |
| --- | --- | --- |
| Platform | DX-OS shared | Định danh, quyền, audit, workflow, outbox, tệp |
| M01 | System & Partner | Hồ sơ doanh nghiệp, user, đối tác, kết nối instance |
| M02 | Product & Inventory | Sản phẩm, SKU/barcode, lô, kho, tồn, lịch sử biến động |
| M03 | Trading & Distribution | Phiếu nhập/xuất, chuyển giao, xác nhận nhận hàng, kiểm kê, ghi nhận bán theo lô |
| M04 | Traceability & Federation | Sự kiện truy xuất, QR/Passport, exchange/ack/retry/dedupe |
| AI01 | AI Support | Tra cứu lô/truy xuất, tạo draft chứng từ, cảnh báo theo quy tắc |

Thứ tự phụ thuộc: **Platform → M01 → M02 → M03 → M04 → AI01**. Chi tiết: [documents/plans/DEPENDENCIES.md](./documents/plans/DEPENDENCIES.md).

### Kịch bản demo trọng tâm

Ba instance độc lập:

1. **A (nhà cung cấp)** — tạo sản phẩm/lô, xuất hàng cho B  
2. **B (nhà phân phối)** — nhận hàng, xuất một phần cho C  
3. **C (bán lẻ)** — nhận hàng, ghi nhận bán theo lô, phát hành QR  

### Ngoài MVP

Kế toán/công nợ, CRM, POS đầy đủ, sản xuất/BOM, QC nhiều bước, thu hồi đa cấp, Workflow Builder tổng quát, SaaS multi-tenant trên một database.

## Kiến trúc ngắn

- **Self-hosted, single-tenant theo instance:** một doanh nghiệp = một bản cài = một PostgreSQL.
- **Modular Monolith (Next.js):** UI App Router + API Route Handlers trong cùng ứng dụng.
- **DDD:** nghiệp vụ trong `contexts/`; hạ tầng dùng chung trong `platform/`; AI trong `services/ai/`.
- **Confirm chứng từ:** một giao dịch ghi aggregate + tồn (qua port Inventory) + outbox + audit.
- **Federation:** nhận message kỹ thuật ≠ đã nhận đủ hàng (cần Receiving Confirmation).

Chi tiết: [ARCHITECTURE.md](./ARCHITECTURE.md).

## Tech stack

| Lớp | Công nghệ |
| --- | --- |
| Giao diện | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui |
| Định danh | Keycloak (OIDC/SSO) |
| Nghiệp vụ & dữ liệu | Next.js Modular Monolith, DDD, PostgreSQL |
| Quy trình & CI/CD | Flowable, GitHub Actions, Docker Compose |
| Hàng đợi & tệp | Redis, object storage tương thích S3/R2 |
| AI | Python, REST, LLM (tool-calling qua API đã phân quyền) |
| Quan sát | OpenAPI, Prometheus, Grafana |

## Cấu trúc thư mục (đích)

```text
nexora/
  app/                  # UI + API adapters
  platform/             # Lõi DX-OS dùng chung
  contexts/             # M01–M04 (system, catalog, inventory, trading, …)
  services/ai/          # AI01
  composition/          # Wire ports giữa contexts
  db/migrations/        # Schema PostgreSQL
  deploy/               # Docker Compose, env mẫu
  documents/
    referents/          # Luật & nguồn chân lý cho Agent/DevOps
    plans/              # Plan tổng quan theo module
    nexora/             # Đề xuất dự án
```

Luật import và schema: [documents/referents/FOLDER_STRUCTURE.md](./documents/referents/FOLDER_STRUCTURE.md).

## Tài liệu

| Tài liệu | Mục đích |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Kiến trúc tổng thể |
| [AGENTS.md](./AGENTS.md) | Hướng dẫn AI Agent khi code |
| [documents/referents/](./documents/referents/) | Nguồn chân lý, catalog module, coding rules, glossary, AC |
| [documents/plans/](./documents/plans/) | Plan triển khai từng module |
| [documents/nexora/Nexora - NEU.OPUS5.5.md](./documents/nexora/Nexora%20-%20NEU.OPUS5.5.md) | Đề xuất đầy đủ (Chương 6 = MVP, Chương 7 = kiến trúc/stack) |
| [.cursor/rules/](./.cursor/rules/) · [.cursor/skills/](./.cursor/skills/) | Rules & skills cho Cursor Agent |

Tiêu chí nghiệm thu MVP (AC-01…AC-13): [documents/referents/ACCEPTANCE_MVP.md](./documents/referents/ACCEPTANCE_MVP.md).

## Bắt đầu nhanh

### Yêu cầu

- Node.js (khuyến nghị bản LTS tương thích Next.js 16)
- npm
- Docker (cho PostgreSQL cục bộ)

### Chạy giao diện

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### PostgreSQL cục bộ

```bash
cp deploy/.env.example deploy/.env
docker compose -f deploy/docker-compose.yml up -d
```

- `deploy/.env` chỉ dùng máy dev — không commit secret.
- Migration nền: `db/migrations/0001_platform.sql` (nạp khi volume Postgres còn trống).

### Scripts

| Lệnh | Việc |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run start` | Chạy bản build |
| `npm run lint` | ESLint |

## Trạng thái hiện tại

Repo đang ở giai đoạn **định hướng kiến trúc + tài liệu Agent/plan module**. Nghiệp vụ M01–M04 và AI01 sẽ được triển khai theo plan trong `documents/plans/`; DevOps bổ sung chi tiết hệ thống, UI, kiểm thử và kết nối trước khi code sâu từng module.

## Giấy phép

Định hướng phân phối nguồn mở (chi tiết giấy phép sẽ được công bố cùng bản phát hành dự thi / release chính thức).
