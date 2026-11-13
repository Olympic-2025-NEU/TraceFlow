# Danh mục module MVP

Nguồn: Chương 6 đề xuất Nexora.

| Mã | Module | Folder đích | Vai trò |
| --- | --- | --- | --- |
| Platform | DX-OS shared | `platform/` | Identity, access, audit, workflow, outbox, files, persistence |
| M01 | System & Partner Management | `contexts/system/` | Tổ chức, user, partner, kết nối instance |
| M02 | Product & Inventory Management | `contexts/catalog/`, `contexts/inventory/` | Sản phẩm, lô, kho, tồn |
| M03 | Trading & Distribution | `contexts/trading/` | Nhập, xuất, chuyển giao, kiểm kê, ghi nhận bán |
| M04 | Traceability & Federation | `contexts/traceability/`, `contexts/federation/` | Sự kiện truy xuất, QR, liên thông |
| AI01 | AI Support | `services/ai/` | Tra cứu, draft chứng từ, cảnh báo quy tắc |

## Mã chức năng

### M01 — System & Partner

| Mã | Tên |
| --- | --- |
| NX-SYS-01 | Organization Profile |
| NX-SYS-02 | User & Access |
| NX-SYS-03 | Partner Management |
| NX-SYS-04 | Partner Connection |

### M02 — Product & Inventory

| Mã | Tên |
| --- | --- |
| NX-PROD-01 | Product Management |
| NX-PROD-02 | Product Identifier |
| NX-PROD-03 | Batch/Lot Management |
| NX-PROD-04 | Batch Information |
| NX-INV-01 | Warehouse |
| NX-INV-02 | Inventory Balance |
| NX-INV-03 | Inventory History |
| NX-INV-04 | Batch Status |

### M03 — Trading & Distribution

| Mã | Tên |
| --- | --- |
| NX-TRD-01 | Goods Receipt |
| NX-TRD-02 | Goods Issue |
| NX-TRD-03 | Partner Transfer |
| NX-TRD-04 | Receiving Confirmation |
| NX-TRD-05 | Document History |
| NX-TRD-06 | Stocktake |
| NX-TRD-07 | Sale/Distribution Record |

### M04 — Traceability & Federation

| Mã | Tên |
| --- | --- |
| NX-TRC-01 | Traceability Event |
| NX-TRC-02 | Lot History |
| NX-TRC-03 | Backward Traceability |
| NX-TRC-04 | Forward Traceability |
| NX-TRC-05 | Traceability QR |
| NX-TRC-06 | Product Passport |
| NX-FED-01 | Event Exchange |
| NX-FED-02 | Partner Authentication |
| NX-FED-03 | Product/Lot Mapping |
| NX-FED-04 | Event Acknowledgement |
| NX-FED-05 | Message Retry & Deduplication |

### AI01 — AI Support

| Mã | Tên |
| --- | --- |
| NX-AI-01 | Product & Lot Query |
| NX-AI-02 | Traceability Assistant |
| NX-AI-03 | Document Draft Assistant |
| NX-AI-04 | Batch Risk Assistant |

## Thành phần dùng chung (Chương 6.8)

Identity/SSO, API Gateway (hoặc biên Next.js + Keycloak), Workflow, PostgreSQL, File Storage, Background Processing, Audit Logging.
