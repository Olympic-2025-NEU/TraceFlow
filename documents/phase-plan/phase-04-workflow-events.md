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

- [ ] Lưu local approval request/state và outbox khi tạo yêu cầu; worker start Flowable process bằng correlation key idempotent. Poller/reconciler theo `workflow-spec-v1.md` đồng bộ local state sau khi verify process/task; không dựng webhook chưa có hợp đồng xác thực.
- [ ] Tình huống Flowable down: document chờ, không tự approve; kết quả task lặp/đến muộn không confirm document; timeout/rejection có lý do và audit.
- [ ] GoodsIssue luôn cần Approver khác creator ở v1; final `confirm` kiểm trạng thái approval được đồng bộ và quyền actor hiện tại.
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

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P04-T01 | `platform/http/pipeline.ts` middleware thật `auth→authz→idempotency→validate→transaction→map response`, typed context `{actor,requestId,tx}`; route handler mỏng. | Instrument order test; fail auth/validation không mở transaction hoặc ghi DB; error shape đúng `api-payloads-v1.md`. |
| P04-T02 | SQL `0002_platform_delivery.sql` `idempotency_record`; PG adapter `platform/http/idempotency.ts`, key/hash/expiry theo baseline. | 20 request đồng thời cùng key chỉ một effect; cùng key khác body 409; timeout/retry nhận response gốc, không outbox trùng. |
| P04-T03 | `platform/outbox/` PG writer + `workers/outbox-dispatcher.ts`, claim `FOR UPDATE SKIP LOCKED`, lease/backoff/dead-letter; `delivery_attempt` thêm P09. | Kill worker trước/sau HTTP, restart không mất message; receiver dedupe; Redis mất không mất PG outbox. |
| P04-T04 | `contracts/events/*.schema.json` cho event nội bộ trong `event-payloads-v1.md`; handler registry ở `composition/`; versioned serializer. | Confirm một lần→một event source/version; Draft/rollback→0; unknown version dead-letter có metric. |
| P04-T05 | `deploy/flowable/processes/goods-issue-approval.bpmn20.xml`, Flowable PG/config, `platform/workflow/flowable-client.ts` dùng REST official. | Deploy/start/query/complete/reject/restart và process history; engine H2/default password không dùng ở demo. |
| P04-T06 | SQL `approval_request` gồm line snapshot/decision intent, worker start/decision bridge + poller theo `workflow-spec-v1.md`; businessKey=approvalRequestId, local unique/lease/reconcile, không distributed transaction. | Flowable down/response lost/duplicate task complete không tạo process hoặc approval trùng; decision 202 pending, self-approval 403; stale approval không mở confirm. |
| P04-T07 | Metrics `outbox_pending/dead`, `workflow_pending/failed`, latency; `app/admin/retries` qua use case; runbook dead-letter. | Inject one dead message/process stuck → alert có message/process ID, Admin retry có audit, Staff 403. |
| P04-T08 | `evidence/G04.md` gồm SQL assertions transaction, outbox crash log, BPMN deployment/process/task IDs và reviewer. | Một approval task thật pass; `applyAction` TS chỉ guard, không được ghi AC-12 Done cho tới M03 P07. |
