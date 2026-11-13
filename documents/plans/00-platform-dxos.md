# Plan: Platform (DX-OS shared)

> Plan tổng quan. DevOps bổ sung chi tiết hệ thống, giao diện, kiểm thử, kết nối trước khi code sâu.

## 1. Mục tiêu / phạm vi MVP

Cung cấp lớp dùng chung cho mọi module nghiệp vụ:

- Identity / Actor từ Keycloak (OIDC)
- Access control cơ bản (Administrator, Staff)
- Audit logging
- Outbox + background dispatch
- Idempotency
- File metadata + object storage port
- Workflow port (Flowable) cho một quy trình phê duyệt mẫu (AC-12)
- Persistence / transaction biên
- HTTP command pipeline

Tham chiếu Chương 6.8 và 7.11–7.12.

## 2. Ngoài phạm vi

- Phân quyền động phức tạp, ABAC đầy đủ
- API Gateway sản phẩm riêng nếu biên Next.js + Keycloak đủ cho MVP (có thể thêm sau)
- Workflow Designer / builder
- Multi-tenant SaaS trên một DB

## 3. Phụ thuộc / cung cấp

| Hướng | Nội dung |
| --- | --- |
| Phụ thuộc | PostgreSQL, Redis (queue/cache), Keycloak, object storage, Flowable |
| Cung cấp | Actor, Transaction, Outbox, AuditRecorder, FileStore, Workflow, command pipeline |

Không phụ thuộc module M01–M04.

## 4. Aggregate / sự kiện chính (cấp cao)

- `AuditLog`, `OutboxMessage`, `IdempotencyRecord`, `Attachment`
- Sự kiện nền: dispatch outbox; không phải domain trading

## 5. API bề mặt (dự kiến)

- `GET /api/v1/health`
- `GET /api/v1/me`
- Nội bộ: ports TypeScript cho contexts (không bắt buộc REST cho mọi cổng)

## 6. UI bề mặt

Không UI nghiệp vụ. Có thể có trang health/status trong console sau.

## 7. Kiểm thử tối thiểu

- Unit: pipeline bước, idempotency key
- Integration: outbox ghi cùng transaction rồi dispatch
- Deployment: Compose lên được DB + app + Keycloak stub/dev

## 8. Tiêu chí Done

- [ ] AC-01 hỗ trợ (nền để chạy nhiều instance)
- [ ] AC-12: port Workflow gắn được một quy trình mẫu
- [ ] AC-13: `deploy/` + `.env.example` + README cài đặt nền
- [ ] Referent `CODING_RULES.md` được hiện thực tối thiểu trong `platform/`

## 9. Ghi chú DevOps

Chi tiết hóa: phiên bản image, secret management, retention outbox, cấu hình Flowable realm/process definition, chiến lược migrate `platform` schema.
