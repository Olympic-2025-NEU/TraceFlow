# Phase 09 — M04 Federation giữa A/B/C

**Mục tiêu:** trao đổi dữ liệu lô qua API giữa ba instance và DB độc lập, chống mất/trùng/sai nguồn, phân biệt giao hàng với nhận thực tế. **Phụ thuộc:** G05–G08, D05/D08. **AC:** AC-01/05/06/07/09.

## P09-T01 — Topology ba instance độc lập

- [ ] Compose/profile hoặc script dựng A/B/C với app DB, credentials, volumes, Keycloak realm/client, gateway routes và object namespace riêng; cấu hình secrets ngoài Git.
- [ ] Chứng minh không có DB link/shared schema giữa A/B/C, không dùng `tenantId` chung. Dừng mạng/stack B: A/C vẫn đọc/ghi nghiệp vụ local và hàng đợi giữ bền.
- [ ] Fixture bootstrap sản phẩm/lô/kho/partner/role cho chuỗi A→B→C theo `demo-fixtures.md`; lệnh reset demo chỉ tác động môi trường test được chỉ định.
- **Đầu ra:** topology/runbook; **kiểm chứng:** query DB identity từng instance và failure drill.

## P09-T02 — Federation envelope và version negotiation

- [ ] Chốt schema v1 ở `event-contracts.md` với event issuer, origin lot, sender-local batch, upstream message refs, quantity decimal, unit, source document, evidence allowlist, policy/version; OpenAPI/JSON Schema và fixture hợp lệ/sai.
- [ ] Chốt version support/unknown-version response, max payload, canonical hash và timestamp tolerance; không gửi raw document/private file qua federation.
- [ ] Contract tests sender/receiver, trong đó duplicate same ID+hash idempotent, same ID+different hash conflict.
- **Đầu ra:** schema/validator; **kiểm chứng:** A và B chạy được contract test độc lập.

## P09-T03 — Outbound delivery

- [ ] Từ transfer Confirmed tạo outbox destination B; worker lấy token của receiver, gọi gateway B, timeout/retry/backoff, lưu attempt/response đã redacted. Không giữ app DB transaction khi HTTP.
- [ ] Mark delivered chỉ sau technical ACK hợp lệ cho đúng message/receiver; ACK mất → retry an toàn. Token hết hạn → refresh theo client credentials, credential revoke → dead-letter/alert.
- [ ] UI sender hiện trạng thái pending/retry/ack/rejected, thao tác admin retry có audit.
- **Đầu ra:** outbound adapter; **kiểm chứng:** B offline/ACK lost/restart worker không làm mất thông điệp.

## P09-T04 — Inbound trust, inbox và dedupe

- [ ] Gateway + service xác thực client identity/scope, đối chiếu partner active, issuer/recipient trong envelope, signature nếu D05 chọn; sai bất kỳ mục nào reject trước business effect.
- [ ] PG inbox unique `(issuer, messageId)` và payload hash; ghi validation status/technical ACK trong transaction. Replay cùng nội dung trả ACK cũ, khác nội dung 409 + audit.
- [ ] Schema/policy/size/clock/unknown lot errors có mã rõ; retryable vs permanent classification để không retry vô hạn.
- **Đầu ra:** inbox API; **kiểm chứng:** forged issuer, replay, tamper, disabled partner tests.

## P09-T05 — External lot mapping và dependency gap

- [ ] Map `(origin issuer ID, origin lot ID)` và `(sender instance ID, sender batch ID)` sang external reference và local batch khi receiving; không hợp nhất lot chỉ vì SKU/tên trùng. Khi B→C, giữ origin A nhưng ghi rõ B là bên khẳng định và link message A→B.
- [ ] Event đến trước thông tin lot/parent tạo `pending_dependency`/gap, reprocess idempotent khi dependency tới; cycle/unknown mapping bị đánh dấu.
- [ ] Tách bản tóm tắt upstream được phép chia sẻ khỏi master data local; cập nhật provenance và policy version ở trace projection.
- **Đầu ra:** mapping/resolver; **kiểm chứng:** out-of-order và cùng lot code khác issuer vẫn đúng.

## P09-T06 — Business receiving và discrepancy round trip

- [ ] Khi B nhận envelope, tạo pending receipt/notification, **không tăng tồn**. Staff B xác nhận actual quantity và lot mapping theo M03 P07; confirm mới tăng tồn B.
- [ ] B phát `receipt.confirmed`/discrepancy event tới A; A ghi trạng thái nhận thực tế, giữ nguyên phiếu xuất đã confirm. Partial/zero/over theo D07, không coi technical ACK là business receipt.
- [ ] Lặp B→C; C ghi sale record; mỗi bước liên kết event/document/lot ID nguồn.
- **Đầu ra:** A→B→C transaction chain; **kiểm chứng:** A 12, B 10, C nhận số thực theo chứng từ, số dư từng DB khớp.

## P09-T07 — Trace xuyên ba instance và offline

- [ ] Receiver lưu local verified/partner-asserted summaries theo sharing policy để C truy A→B→C mà không query DB A trực tiếp; hiển thị khi upstream offline và ghi rõ gap/staleness. B chỉ chuyển tiếp phần A đã cho phép.
- [ ] Backward/forward trace nối issuer-qualified links. Nếu A cần biết C, gửi downstream impact summary C→B→A theo policy, dedupe/provenance như message khác; nếu bị cấm/chưa nhận, A hiển thị gap thay vì khẳng định danh sách đầy đủ. Passport chỉ projection allowlist.
- [ ] Test A offline, B/C còn lịch sử đã cache; upstream correction/revoke/policy change được truyền theo version hoặc hiển thị stale đến khi sync.
- **Đầu ra:** cross-instance trace API/UI; **kiểm chứng:** AC-07/09, không dùng shared DB.

## P09-T08 — Quan sát, bảo mật và vận hành federation

- [ ] Metrics queue lag, attempts/dead-letter, inbox conflict, mapping gaps, business receipt pending/dispute; correlation xuyên A/B/C mà không log token/PII.
- [ ] Runbook rotate credential, replay message, reprocess pending, resolve dispute; thao tác admin được audit và giới hạn quyền.
- [ ] Load/fault tests: duplicate burst, timeout, clock skew, oversized payload, rate limit, schema version mismatch, B down/recover.
- **Đầu ra:** dashboards/runbook/failure tests; **kiểm chứng:** operator chẩn đoán được một failed transfer từ message ID.

## P09-T09 — Gate G09

- [ ] AC-01/05/06/07/09 pass trên A/B/C có DB/identity/volumes riêng; outage, retry, dedupe, partial receipt, privacy và trace gap cases pass.
- [ ] Từ clone sạch chạy lại kịch bản bằng API/UI, không thao tác tay vào DB; lưu provenance và balance assertions tại mỗi bước.
- **Bằng chứng:** A/B/C compose/DB identity, redacted HTTP logs, outbox/inbox rows, trace graph, UI timeline, failure drill.
