# API contract đề xuất để chốt ở P00

Đây là **bề mặt API mục tiêu**, chưa tồn tại. Route và DTO/response/error chi tiết v1 ở [api-payloads-v1.md](./api-payloads-v1.md); file OpenAPI thực phải sinh ở P00/P02. Giữ `/api/v1`, JSON UTF-8, thời gian ISO 8601 UTC, ID opaque; không trả nguyên stack trace. Contract ở đây phải được sửa cùng test và client khi ADR thay đổi. Next Route Handler là adapter HTTP, use case/domain ở context.

## 1. Quy tắc chung

- Private user API: OIDC/session qua gateway + xác thực lại ở app, role/scope và row-level checks. Federation API: token service account riêng, partner binding. Public passport: route allowlist, rate limit và projection public.
- Lệnh ghi cần `Idempotency-Key` ở confirm/transfer/receiving và các POST có hậu quả không lặp; lưu key cùng payload hash trong DB. Tạo Draft có thể dùng key để chống double-click.
- `POST /.../{id}/confirm`, `cancel`, `submit` và `/approvals/{id}/decision` là action rõ; không nhận `PATCH status`. `If-Match`/version chống lost update; decision trả pending cho tới khi Flowable đối soát.
- Response lỗi có `code`, `message`, `requestId`, `details` an toàn. 400 malformed, 401 unauthenticated, 403 forbidden, 404 không thấy/không được tiết lộ, 409 conflict/idempotency/version/stock, 422 invalid domain, 429 throttled, 503 dependency unavailable.
- Paginate mọi list bằng opaque cursor, `limit` mặc định 20/tối đa 100 theo baseline; sort/filter allowlist. OpenAPI ghi scope, field public và ví dụ lỗi.
- Gateway route matrix là một phần contract: `/api/v1/public/*` anonymous allowlist; `/api/v1/federation/*` M2M; `/api/v1/*` user/private; health nội bộ chỉ lộ trạng thái tổng quát. Không public Flowable/admin/PG/Redis/storage.

## 2. Bề mặt theo module

| Owner | Route tối thiểu | Hành vi và điều kiện đáng kiểm thử |
| --- | --- | --- |
| Platform / Core Data | `GET /api/v1/me` (ERP), `GET /api/v1/health/live|ready` (từng service), `GET/POST /api/v1/core/records`, `POST /api/v1/files`, `GET /api/v1/files/{id}` (core API) | `/me` lấy từ token/session, không body; core records là resource allowlist/versioned có policy, không phải generic SQL; ready kiểm đúng dependency; file scan/policy trước download |
| M01 | `GET/PATCH /api/v1/organization`, `GET/POST /api/v1/members`, `GET/POST/PATCH /api/v1/partners`, `GET/PUT /api/v1/partners/{id}/connection` | Chỉ Admin đổi connection; secret write-only/redacted; URL allowlist, rotate credential |
| M02 Catalog | `GET/POST /api/v1/products`, `GET/PATCH /api/v1/products/{id}`, `GET/POST /api/v1/batches`, `GET/PATCH /api/v1/batches/{id}` | SKU/barcode/lot unique theo scope, ngày SX ≤ HSD, status lô có rule |
| M02 Inventory | `GET/POST /api/v1/warehouses`, `GET /api/v1/inventory/balances`, `GET /api/v1/inventory/movements` | Balance read-only qua public API; điều chỉnh từ M03 use case, không PATCH quantity |
| M03 | `GET/POST /api/v1/receipts|issues|transfers|receivings|stocktakes|sales-records` và `POST /{type}/{id}/confirm|cancel` | Draft không đổi tồn; confirm có quyền, version, approval nếu áp dụng, transaction + outbox; receiving có actual qty/discrepancy |
| M04 Trace | `GET /api/v1/lots/{id}/history`, `/trace/backward`, `/trace/forward`, `POST /api/v1/lots/{id}/qr`, `GET /api/v1/public/passport/{token}` | Giới hạn depth/page; ghi khoảng thiếu, issuer/evidence; public projection không lộ PII/giá/secret |
| M04 Federation | `POST /api/v1/federation/events`, `GET /api/v1/federation/deliveries`, `POST /api/v1/federation/deliveries/{id}/retry` | M2M auth, schema_version, dedupe/hash; technical ACK là response 202 có message ID (async ACK route chỉ thêm nếu ADR chứng minh cần), riêng business receipt; admin-only retry |
| AI01 | `POST /api/v1/ai/chat`, `POST /api/v1/ai/drafts`, `GET /api/v1/ai/tool-calls/{id}` nếu cần audit UI | Tool allowlist; cùng quyền user; chỉ Draft; timeout/fallback; response có source IDs |

Các route `/{type}` trên là ký hiệu rút gọn; OpenAPI phải liệt kê từng path cụ thể, không implement dynamic catch-all cho mọi loại chứng từ.

## 3. Ví dụ contract quan trọng

### Confirm phiếu xuất

Input: `POST /api/v1/issues/{id}/confirm`, `Idempotency-Key`, version và lý do nếu rule yêu cầu. Preconditions: actor có quyền tại kho, lot available, stock đủ, approval Flowable đã complete nếu phiếu thuộc quy trình. Output: ID/status/version/confirmedAt và `requestId`; không để client truyền `confirmedBy` hoặc lượng tồn mới. Retry cùng key + payload trả cùng kết quả; key khác nhưng phiếu đã confirmed trả conflict có code ổn định.

### Nhận federation

Input: authenticated partner, message envelope ở `event-contracts.md`. Output `202 Accepted` với technical ACK (`messageId`, `acceptedAt`, trạng thái validated/pending) khi lưu inbox thành công, kể cả replay cùng hash. ACK không có nghĩa đã nhận hàng. Dữ liệu sai schema/auth/hash trả lỗi có requestId và không tạo stock movement.

### Xác nhận thực nhận

Input: local pending transfer ref, `actualLines` theo lô và số lượng, `discrepancyReason` khi khác số gửi, `Idempotency-Key`. Output: receiving status, movement IDs, discrepancy flag; business receipt event được enqueue sau commit. Partial receipt xử lý theo rule D07, không âm thầm biến sent quantity thành actual quantity.

### Product Passport

Output chỉ gồm `productName`, public lot identifier, timeline sự kiện cho phép, issuer/verification status và gap markers. Mọi attachment public có policy riêng; QR token có khả năng revoke. Token không được suy ra private ID hay quyền admin.

## 4. Contract test

Mỗi route có happy path, 401/403, validation, idempotency/replay, concurrency hoặc privacy khi phù hợp. Sinh OpenAPI từ source hoặc duy trì spec có test đối chiếu; khi đổi schema_version làm consumer-driven test giữa A/B/C khác phiên bản. `health/live` chỉ kiểm tiến trình; `health/ready` kiểm dependency thật và không trả secret.
