# Phase 03 — Dữ liệu giao dịch, tệp và audit của lõi

**Mục tiêu:** adapter PG/storage thật, transaction boundary thống nhất, file được kiểm dịch và có thể khôi phục. **Phụ thuộc:** G01, D02/D03/D07; auth P02 cần cho API bảo vệ. **Unblock:** P04–P09.

## P03-T01 — Versioned platform schema và quyền DB

- [ ] Xác minh `0001_platform_core.sql` đã thay migration rỗng ở P01 chứa `audit_log`, `attachment`, `core_record` và bảng version; **không sửa migration đã áp dụng**, thay đổi sau này bằng migration bù số mới. Tách migration/ERP/core API runtime roles, quyền tối thiểu và FK/check/unique cần thiết. Core API chỉ ghi tài nguyên nó sở hữu, không ghi stock/document tables.
- [ ] Chuẩn hóa adapter PG với một transaction client được truyền qua application ports; không mở transaction riêng bên trong Inventory/Audit/Outbox khi cùng command.
- [ ] Chạy migration từ DB rỗng/đã có, rollback bằng migration hoặc restore đã thử; test thiếu quyền DB thì fail rõ.
- **Đầu ra:** migration versioned + repository tests; **kiểm chứng:** PG có bảng/constraint và restart không chạy lại DDL gây lỗi.

## P03-T02 — Unit of Work và optimistic/concurrent write

- [ ] Triển khai `Transaction.run(work)` cho toàn bộ command, transaction context truyền vào repository; timeout, error mapping, retry có giới hạn chỉ cho lỗi retryable.
- [ ] Tạo spike ghi aggregate + audit + outbox, cố ý ném lỗi ở từng bước; tất cả rollback hoặc tất cả commit.
- [ ] Chọn row lock/conditional update/version policy, áp dụng lock ordering nhất quán; đo deadlock/concurrent write.
- **Đầu ra:** transaction adapter và test atomicity; **kiểm chứng:** không có audit/outbox mồ côi hoặc aggregate confirmed thiếu event.

## P03-T03 — Audit bất biến và correlation

- [ ] `AuditRecorder` ghi actor/service, action, target, outcome, request/correlation ID, timestamp và snapshot tối thiểu đã redacted.
- [ ] Ghi audit trong cùng transaction với action thành công; deny/failure security log riêng không làm rò token/PII. DB role runtime không được UPDATE/DELETE audit đã ghi nếu policy append-only.
- [ ] Tài liệu retention/export và truy vấn theo document/message ID cho điều tra.
- **Đầu ra:** audit adapter + truy vấn quản trị; **kiểm chứng:** confirm/cancel/partner connection/AI tool có dấu vết, secret không xuất hiện trong log.

## P03-T04 — S3-compatible object storage

- [ ] Chốt D02 và dựng bucket `quarantine`, `private`, `public` hoặc policy tương đương; object key ngẫu nhiên, checksum SHA-256, MIME/size allowlist và metadata PG.
- [ ] Upload chỉ ghi attachment `pending_scan`, không cho dùng làm evidence public; download qua API/presigned URL ngắn hạn sau authz và policy.
- [ ] Xử lý orphan khi PG transaction fail sau upload hoặc storage fail sau metadata: cleanup/reconciliation job, idempotent.
- **Đầu ra:** FileStore adapter và policy; **kiểm chứng:** file private không tải bằng URL public, checksum đúng, restart giữ dữ liệu.

## P03-T05 — Kiểm dịch tệp

- [ ] Kết nối ClamAV/engine nguồn mở đã chốt, cập nhật signature DB; scan stream/quarantine trước khi chuyển `clean` và cho phép download/chia sẻ.
- [ ] Scan timeout/service down = fail closed, retry có trạng thái; tệp nhiễm/malformed bị reject/quarantine, có audit và thao tác xử lý admin.
- [ ] Dùng fixture EICAR hoặc cách kiểm thử an toàn theo hướng dẫn engine, không đưa mẫu độc hại thật vào repo.
- **Đầu ra:** file scan pipeline; **kiểm chứng:** sạch được dùng, nhiễm/scan lỗi không phát tán.

## P03-T06 — DB/volume backup và restore

- [ ] Script backup có kiểm tra nhất quán cho app DB, Keycloak/Flowable DB và object storage; lưu cấu hình gateway/realm/process version và chỉ secret references.
- [ ] Thử restore vào stack mới không đè môi trường nguồn; đối chiếu row counts, attachment checksums, quyền truy cập và state process.
- [ ] Đặt RPO/RTO mục tiêu theo tài nguyên nhóm, lịch backup/retention và cách phát hiện backup hỏng; không tuyên bố disaster recovery nếu chưa diễn tập.
- **Đầu ra:** runbook restore; **kiểm chứng:** một người khác restore được ít nhất một instance từ backup.

## P03-T07 — Structured/unstructured data API chứng minh lõi

- [ ] Triển khai **core data/file API riêng không UI** theo D15: structured resource allowlist (metadata/projection versioned) ghi/đọc có authz và upload/download tệp private có scan; browser và DX-Lab chỉ qua gateway, không truy cập DB/storage trực tiếp.
- [ ] Chứng minh cả hai dùng cùng actor/policy/audit; file evidence có link tới document/lot nhưng không tự động public. ERP vẫn giữ transaction document/stock/outbox tại app DB, đồng bộ projection sang core API sau commit có retry; không gọi core API giữa transaction M03.
- [ ] Tắt UI Next ERP và DX-Lab rồi smoke core API/SSO/gateway/file/Flowable; không cần business app để chứng minh nền tảng lõi vẫn có API sống.
- **Đầu ra:** runtime + smoke script cho hai loại dữ liệu; **kiểm chứng:** 200/401/403, scan states và core API hoạt động không UI.

## P03-T08 — Gate G03

- [ ] Chạy transaction rollback/concurrency, upload/scan/privacy, backup/restore và migration tests trên clone sạch.
- **Bằng chứng:** schema dump đã redacted, test logs, checksum file, restore drill và gateway request trace.

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P03-T01 | Review/verify **migration 0001 đã tạo ở P01**, không sửa file đã áp dụng; `audit_log`, `attachment`, `core_record` đúng từng cột/FK/check/index schema v1; thêm migration bù số mới nếu ADR thay đổi; `services/core-data` PG repositories + role grants. | DB trống/upgrade chạy lại; `information_schema` và unique/permission assertions; core role không `UPDATE platform.audit_log`, app role không `UPDATE platform.core_record`; kho/tồn chưa có trước P06. |
| P03-T02 | `platform/persistence/transaction.ts` đổi thành `run(work:(tx:PoolClient)=>Promise<T>)`; repositories nhận cùng `tx`, error mapping retry `40001/40P01` có giới hạn. | Inject fail sau aggregate, movement, audit, outbox → toàn bộ rollback; hai writer tranh stock chỉ một confirm đủ tồn. |
| P03-T03 | `platform/audit/audit-recorder.ts` + PG adapter, redaction allowlist, audit query Admin theo target/request ID. | Success audit cùng transaction; deny/failure security log riêng; runtime `UPDATE/DELETE audit_log` bị PG từ chối, token không vào log. |
| P03-T04 | `services/core-data/files/` S3 adapter, bucket quarantine/private/public, `POST/GET /api/v1/files`; metadata `attachment` và reconcile orphan job. | Upload SHA đúng; PG fail/storage fail có cleanup; URL private không dùng public; restart giữ bytes/metadata. |
| P03-T05 | ClamAV adapter + scan worker: pending→clean/infected/error, signature version/time; MIME/size policy và file quarantine. | Clean được tải theo quyền; infected/timeout/service down không có URL/download, test fixture an toàn và audit. |
| P03-T06 | `deploy/scripts/backup.*`, `restore.*`, runbook DB/objects/realm/BPMN/gateway config; backup manifest checksum, không secret. | Restore sang project khác, so row counts/checksum/permissions/process state; có RPO/RTO đo thực, không đè nguồn. |
| P03-T07 | `services/core-data/records/` + `contracts/core-records/*.schema.json` theo `core-record-payloads-v1.md`; core/file OpenAPI + smoke qua gateway, ERP adapter dùng core API **sau commit**. | Khi tắt ERP/DX-Lab UI, core POST/GET record và upload/scan/download vẫn 200/401/403 đúng; extra kind/field/owner bị chặn, không SQL generic. |
| P03-T08 | `evidence/G03.md`: migration/transaction/scan/privacy/restore logs, DB role checks, checksum và reviewer. | Một failure case bất kỳ để aggregate/audit/outbox lệch hoặc file pending tải được làm G03 fail. |
