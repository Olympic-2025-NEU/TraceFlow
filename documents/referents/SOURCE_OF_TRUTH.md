# Nguồn chân lý Nexora

Thứ tự ưu tiên khi tài liệu mâu thuẫn:

1. **Chương 6** — phạm vi MVP và module chức năng (M01, M02, M03, M04, AI01).
2. **Chương 7 §7.12** — tech stack đã chốt.
3. **Plan module** trong `documents/plans/` — định hướng triển khai từng module.
4. **Referents** trong `documents/referents/` — luật cấu trúc, coding, glossary.
5. **ARCHITECTURE.md** — bản tóm kiến trúc cho Agent và DevOps.
6. Các chương còn lại của đề xuất — bối cảnh, tầm nhìn dài hạn; không mở rộng phạm vi MVP.

Đề xuất gốc: `documents/nexora/Nexora - NEU.OPUS5.5.md`.

## Quyết định cốt lõi

| Chủ đề | Quyết định |
| --- | --- |
| Phân phối | Open-source, self-hosted |
| Tenant | Một instance = một doanh nghiệp = một PostgreSQL |
| Liên thông | Federation API giữa các instance, không DB chung |
| Backend | Next.js Modular Monolith + DDD |
| Frontend | React, TypeScript, Tailwind (App Router) |
| Định danh | Keycloak (OIDC/SSO) |
| Workflow | Flowable (một quy trình phê duyệt mẫu trong MVP) |
| Dữ liệu | PostgreSQL; Redis; object storage tương thích S3/R2 |
| AI | Python/LLM gọi tool qua API nghiệp vụ đã phân quyền |

## Phạm vi MVP (tóm tắt Chương 6)

Trong MVP: System & Partner, Product & Inventory, Trading & Distribution, Traceability & Federation, AI Support cơ bản.

Ngoài MVP: kế toán, CRM, POS đầy đủ, sản xuất, QC nhiều bước, thu hồi đa cấp, Workflow Builder tổng quát, SaaS multi-tenant tập trung.

## Scaffold cũ không còn chuẩn

Thư mục `contexts/sales`, `contexts/finance`, `contexts/procurement`, `contexts/master-data` (nếu còn) là scaffold lệch Chương 6. Không phát triển tiếp. Cấu trúc đích nằm ở `FOLDER_STRUCTURE.md`.
