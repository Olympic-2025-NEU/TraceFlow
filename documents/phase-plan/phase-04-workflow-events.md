# Phase 04 — Workflow engine, idempotency và outbox

**Mục tiêu:** hoàn thành cơ chế điều phối **thật** cho các lệnh ghi, phê duyệt và sự kiện; không lấy hàm `applyAction` làm Flowable. **Phụ thuộc:** G02/G03 và D06/D08. **Unblock:** M01–M04, AI. AC-12 kết thúc ở P07 khi gắn một chứng từ thật.

## P04-T01 — Command pipeline thực thi được

- [ ] Biến `commandPipeline` từ danh sách string thành middleware/use-case boundary thực: authenticate → authorize → idempotency → validate/domain → transaction → response/dispatch sau commit.
- [ ] Có request ID, actor/correlation, mapping DomainError thành API error; route handler chỉ parse/dispatch/map response.
- [ ] Unit/contract test thứ tự và khi bước trước fail thì không chạy bước sau; confirm chưa auth không có side effect.
- **Đầu ra:** pipeline adapter; **kiểm chứng:** trace log và negative tests.

## P04-T02 — Idempotency cho lệnh ghi

- [ ] Migration `idempotency_record` theo `database.md`; scope key theo actor/client + route/action, payload hash, expiry và response reference.
- [ ] Đồng thời hai request cùng key chỉ một transaction tạo effect; cùng key khác payload trả 409; retry sau timeout trả kết quả cũ, không tạo outbox mới.
- [ ] Phân biệt idempotency của user command và dedupe của federation inbox, không dùng một cache Redis làm nguồn duy nhất.
- **Đầu ra:** idempotency adapter; **kiểm chứng:** parallel/retry tests với DB assertions.

## P04-T03 — Transactional outbox và worker

- [ ] Migration outbox, payload version, aggregate/correlation/destination; insert trong cùng PG transaction của command.
- [ ] Worker riêng claim row với lease, backoff+jitter, max attempts, dead-letter và admin retry; gửi sau commit, không gọi HTTP partner trong transaction.
- [ ] Redis nếu dùng cho coordination/cache không thay PG outbox; kill/restart worker, chứng minh message không mất.
- **Đầu ra:** dispatcher + metrics/ops API; **kiểm chứng:** crash-before/after-send và receiver duplicate tests.

## P04-T04 — Event handlers và ownership

- [ ] Định nghĩa type/version cho `trading.receipt.confirmed`, `issue.confirmed`, `transfer.confirmed`, `receiving.confirmed`, `sale.recorded`; event nội bộ khác federation envelope.
- [ ] Wire handler ở `composition/` để Traceability/Federation tiêu thụ qua port, không import domain context khác; lỗi handler có retry và dead-letter.
- [ ] Không phát event truy xuất cho Draft hoặc transaction rollback.
- **Đầu ra:** event registry/contract tests; **kiểm chứng:** một confirm→một event cùng source document ID.

## P04-T05 — Flowable OSS REST/BPMN bền vững

- [ ] Pin Flowable OSS REST, cấu hình PostgreSQL/credential riêng, deploy một BPMN process versioned từ source repo; admin endpoint nội bộ.
- [ ] Tạo user task approve/reject với assignee/group và reason; không dùng password mặc định hoặc H2 ở demo/release.
- [ ] Test process start, query task, complete, cancel, version upgrade và restart container không mất process.
- **Đầu ra:** process definition + adapter; **kiểm chứng:** Flowable API/process history chứng minh engine đã chạy.

## P04-T06 — Kết nối app↔Flowable không distributed transaction

- [ ] Lưu local approval request/state và outbox khi tạo yêu cầu; worker start Flowable process bằng correlation key idempotent. Callback hoặc polling idempotent cập nhật local state sau khi verify process/task.
- [ ] Tình huống Flowable down: document chờ, không tự approve; webhook lặp/đến muộn không confirm document; timeout/rejection có lý do và audit.
- [ ] Người tạo không tự duyệt nếu D06 yêu cầu separation; final `confirm` kiểm trạng thái approval được đồng bộ và quyền actor hiện tại.
- **Đầu ra:** workflow integration contract; **kiểm chứng:** kill Flowable giữa start/complete, phục hồi không tạo process/confirm trùng.

## P04-T07 — Quan sát và quyền vận hành

- [ ] Metrics pending/retry/dead outbox, process pending/failed, latency; log có requestId, messageId, processId nhưng redacted secret.
- [ ] Admin xem/retry theo quyền, retry có audit; không cho sửa payload đã phát hoặc mark delivered thủ công không căn cứ.
- [ ] Runbook xử lý queue/process stuck và cảnh báo ngưỡng dựa trên test failure thực.
- **Đầu ra:** dashboard/log/runbook ban đầu; **kiểm chứng:** inject failure tạo cảnh báo và thao tác retry khôi phục.

## P04-T08 — Gate G04

- [ ] Một command mẫu ghi aggregate/audit/outbox atomically, worker dispatch và retry; một BPMN user task được hoàn thành qua engine, app phản ánh state.
- [ ] Kiểm tra `applyAction` chỉ guard state; không dùng nó để claim AC-12. AC-12 còn chờ chứng từ M03 ở P07.
- **Bằng chứng:** transaction/worker/Flowable logs, DB assertions, process definition version và failure tests.
