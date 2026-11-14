# Phase 10 — AI01 tra cứu và hỗ trợ Draft

**Mục tiêu:** AI chỉ đọc dữ liệu qua tool có phân quyền và tạo Draft để người dùng kiểm tra; không thay thế quyết định nghiệp vụ. **Phụ thuộc:** G07–G09, D09. **AC:** AC-10/11.

## P10-T01 — Provider, dữ liệu và fail mode

- [ ] ADR D09 chốt model/provider self-host hoặc external, license/model terms, dữ liệu được gửi, retention, vùng xử lý, timeout/quota/cost và fallback khi provider lỗi.
- [ ] Tách Python AI service khỏi DB: chỉ gọi API/tool đã xác thực qua gateway hoặc internal service boundary; secret ngoài repo, outbound allowlist.
- [ ] Mặc định không gửi PII, credential, file private hoặc toàn bộ DB sang provider; redaction và data minimization test.
- **Đầu ra:** AI config/data policy; **kiểm chứng:** provider down không làm hỏng M03/M04 và không làm lộ secret.

## P10-T02 — Tool registry và quyền theo actor

- [ ] Allowlist tools ví dụ `getBatch`, `getStock`, `getTrace`, `createDraftReceipt`; mỗi tool có JSON schema, input limits, authorization của user ở app, rate limit và audit.
- [ ] AI service nhận delegated identity scoped hoặc app kiểm quyền từng call; không dùng service token quyền Admin để lách role user. Tool output có source IDs, timestamp, verification/gap status.
- [ ] Không đăng ký `confirm`, `approve`, `changePolicy`, `sendTransfer`, `delete` làm AI tool.
- **Đầu ra:** tool API/contracts; **kiểm chứng:** user thiếu quyền bị 403 dù prompt yêu cầu vượt quyền.

## P10-T03 — Tra cứu lô có dẫn nguồn

- [ ] Parse ý định/tên lô thành lookup có disambiguation theo issuer/product; không tự chọn khi nhiều lô cùng code. Query trace/inventory APIs trong quyền hiện tại.
- [ ] Trả số liệu với unit, source document/event, thời điểm, verification status; nói rõ dữ liệu thiếu/partner-asserted, không bịa chứng nhận/nguồn gốc.
- [ ] Golden tests so câu trả lời với API fixture, hỏi lô không tồn tại, upstream offline, cùng code khác issuer.
- **Đầu ra:** lot Q&A; **kiểm chứng:** AC-10 và tool audit khớp mọi con số trọng yếu.

## P10-T04 — Draft chứng từ có human review

- [ ] AI đề xuất field cho **một loại** M03 document đã có API, validate schema và số lượng/lot; tạo bằng `createDraft...` với actor hiện tại và idempotency key.
- [ ] UI hiển thị field AI đề xuất, nguồn, cảnh báo và quyền sửa; người dùng tự submit/approve/confirm qua luồng M03. Stock không đổi khi AI tạo Draft.
- [ ] Không cho AI trigger confirm qua endpoint gián tiếp, tool chaining hoặc payload field `status`; test prompt injection “bỏ qua phê duyệt”.
- **Đầu ra:** AI Draft workflow; **kiểm chứng:** AC-11, audit ghi AI suggestion và người xác nhận cuối cùng.

## P10-T05 — Rule-based risk và giới hạn suy luận

- [ ] Rule minh bạch cho expiry gần hạn, discrepancy, thiếu nguồn, repeated retry hoặc chất lượng restricted; ghi rule version/threshold và source IDs.
- [ ] Risk chỉ tạo recommendation/alert, không tự khóa lô/đổi tồn/xác nhận; false positive được người dùng xem và ghi phản hồi.
- [ ] Test deterministic cho từng rule và trường hợp dữ liệu thiếu; không gọi điểm rủi ro là dự đoán xác suất nếu không được hiệu chuẩn.
- **Đầu ra:** risk insight + explanation; **kiểm chứng:** cùng fixture cho cùng kết quả.

## P10-T06 — Bảo mật, chất lượng và UX

- [ ] Prompt injection trong mô tả product/file/partner event, tool output chứa lệnh giả, yêu cầu exfiltration, repeated calls và token quota; mọi đường đều giữ allowlist/role.
- [ ] Log prompt/tool đã redacted, retention và opt-out theo policy; không lưu chain-of-thought nội bộ hay secret. Hiển thị AI có thể sai và nguồn tham chiếu trong UI.
- [ ] Timeout/circuit breaker, loading/error/retry và fallback “xem dữ liệu trực tiếp” khi model không sẵn sàng.
- **Đầu ra:** adversarial suite, audit/UX; **kiểm chứng:** không có side effect ngoài Draft hợp lệ.

## P10-T07 — Gate G10

- [ ] AC-10/11 pass qua gateway với Keycloak, PG và API M03/M04 thật; prompt injection/permission/provider-failure tests pass.
- [ ] AI không có DB credential và không có tool confirm/approve; Draft chỉ đổi stock sau user action được bảo vệ ở M03.
- **Bằng chứng:** tool call audit, API snapshots, AI response có source, state/balance trước-sau, negative tests.
