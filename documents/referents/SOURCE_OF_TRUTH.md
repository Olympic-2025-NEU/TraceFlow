# Nguồn chân lý Nexora

Thứ tự ưu tiên khi tài liệu mâu thuẫn:

1. **Đề thi và thể lệ OLP PMNM 2026** — điều kiện dự thi và các dịch vụ lõi DX-OS bắt buộc. Bảng 7 lớp công nghệ trong đề thi là ví dụ tham chiếu, không phải danh sách sản phẩm bắt buộc.
2. **Chương 6** — phạm vi MVP và module chức năng (M01, M02, M03, M04, AI01).
3. **Chương 7 §7.12** — tech stack đề xuất cho Nexora, với điều kiện đáp ứng mục 1.
4. **Plan module** trong `documents/plans/` — định hướng triển khai từng module.
5. **Phase plan** trong `documents/phase-plan/` — task/gate thực thi chi tiết, chịu ràng buộc bởi các mục trên.
6. **Referents** trong `documents/referents/` — luật cấu trúc, coding, glossary và đối chiếu đề thi.
7. **ARCHITECTURE.md** — bản tóm kiến trúc cho Agent và DevOps.
8. Các chương còn lại của đề xuất — bối cảnh, tầm nhìn dài hạn; không mở rộng phạm vi MVP.

Đề xuất gốc: `documents/nexora/Nexora - NEU.OPUS5.5.md`.

## Quyết định cốt lõi

| Chủ đề | Quyết định |
| --- | --- |
| Phân phối | Open-source, self-hosted |
| Giấy phép dự án | GNU AGPL v3 only (`AGPL-3.0-only`); toàn văn ở `LICENSE` |
| Tenant | Một instance = một doanh nghiệp = một PostgreSQL |
| Liên thông | Federation API giữa các instance, không DB chung |
| Ứng dụng nghiệp vụ | Next.js Modular Monolith + DDD; UI và API của Nexora ở tầng ứng dụng |
| Lõi DX-OS | Headless, cung cấp dịch vụ cho ứng dụng qua API; plan yêu cầu core data/file API không UI và DX-Lab tầng 2 tách runtime khỏi ERP |
| API Gateway | Năng lực bắt buộc của lõi; không hoãn chỉ vì đã có Next.js + Keycloak |
| Frontend | React, TypeScript, Tailwind (App Router) |
| Định danh | Keycloak (OIDC/SSO) |
| Workflow | Flowable (một quy trình phê duyệt mẫu trong MVP) |
| Dữ liệu | PostgreSQL; Redis; object storage tương thích S3 (ưu tiên tự host cho bản demo) |
| AI | Python/LLM gọi tool qua API nghiệp vụ đã phân quyền |

## Phạm vi MVP (tóm tắt Chương 6)

Trong MVP: System & Partner, Product & Inventory, Trading & Distribution, Traceability & Federation, AI Support cơ bản.

Ngoài MVP: kế toán, CRM, POS đầy đủ, sản xuất, QC nhiều bước, thu hồi đa cấp, Workflow Builder tổng quát, SaaS multi-tenant tập trung.

## Scaffold cũ không còn chuẩn

Thư mục `contexts/sales`, `contexts/finance`, `contexts/procurement`, `contexts/master-data` (nếu còn) là scaffold lệch Chương 6. Không phát triển tiếp. Cấu trúc đích nằm ở `FOLDER_STRUCTURE.md`.

## Trạng thái và đối chiếu đề thi

Các quyết định trên là kiến trúc đích, không phải chức năng đã hoạt động trong repo. `platform/` hiện chủ yếu là hợp đồng TypeScript và hàm mẫu; nó không tự thay thế Keycloak, API Gateway, storage hay Flowable. Xem `OLP_2026_ALIGNMENT.md` trước khi lập plan hoặc mô tả khả năng đã triển khai.
