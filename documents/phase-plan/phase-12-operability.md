# Phase 12 — Vận hành và bốn nguyên lý DX-OS

**Mục tiêu:** minh chứng vận hành, vòng đời dữ liệu, IT/OT, lineage/quality và zero-trust/GitOps theo mục 4 đề thi ở mức trung thực, lặp lại được. **Phụ thuộc:** G09–G11, D11/D12/D13. **Unblock:** release.

## P12-T01 — Chốt mức minh chứng với đề thi

- [ ] Đọc lại đề thi/thể lệ bản cuối; đối chiếu từng nguyên lý mục 4, yêu cầu hạ tầng thực tế và tài nguyên đội. Ghi phản hồi BTC nếu có; nếu chưa có, ADR D11 nêu giả định và mức bằng chứng.
- [ ] Tạo kịch bản demo đo được cho mỗi nguyên lý, owner, lệnh chạy, expected result, failure case và điều **không** được tuyên bố.
- [ ] Nếu yêu cầu rộng hơn MVP, thêm task/gate cụ thể trước G12, không đánh dấu Done bằng slide.
- **Đầu ra:** D11 và evidence map; **kiểm chứng:** mỗi nguyên lý có artifact/chạy thực.

## P12-T02 — Vòng đời và tốc độ dữ liệu

- [ ] Giữ PostgreSQL cho OLTP confirm; sau commit export sự kiện lịch sử versioned/checksummed sang object storage hoặc kho truy vấn riêng theo D11, có checkpoint/replay và retention policy.
- [ ] Tạo projection/report theo batch/time/issuer truy vấn được từ dữ liệu lưu trữ, đo thời gian/lag và chứng minh report/export không khóa confirm transaction.
- [ ] Test late/duplicate event, export worker down/restart, checksum mismatch và rebuild. Ghi rõ đây là lớp phân tích/projection tối thiểu, chỉ gọi “lakehouse” nếu có đủ định nghĩa kỹ thuật.
- **Đầu ra:** lifecycle pipeline + query demo; **kiểm chứng:** source→archive→report với source IDs, metric lag và failure recovery.

## P12-T03 — Hội tụ IT/OT trong bài toán lô

- [ ] Chọn đầu vào scanner/temperature **simulated** có device ID, timestamp, batch/transfer reference, payload schema, authn/rate limit và timestamp/duplicate policy.
- [ ] Ingest qua gateway, validate/map vào event/evidence; correlation tới receipt/trace và cảnh báo nhiệt độ/scan mismatch. Tạo lot digital representation tối thiểu gồm trạng thái nghiệp vụ + reading hiện trường mới nhất, timestamp/lag; dữ liệu thiết bị không tự sửa stock hoặc quality status.
- [ ] UI D hiển thị event OT cạnh event nghiệp vụ với provenance; test wrong device, stale timestamp, duplicate và offline upload. Dán nhãn mô phỏng rõ trong demo.
- **Đầu ra:** IT/OT adapter + fixture; **kiểm chứng:** trace liên kết event thiết bị với lô và nguồn, lỗi bị cách ly.

## P12-T04 — Lineage và data quality

- [ ] Mỗi Passport/report/projection có source event/document IDs, transform version, policy version, builtAt, verification status và checksum khi phù hợp.
- [ ] `0009_quality_operations.sql` tạo `traceability.quality_issue` theo schema v1. Rule quality phát hiện missing source, out-of-order, conflicting quantity, unscanned evidence, unknown issuer và stale partner summary; ghi issue/state, API Admin acknowledge/resolve có reason/audit và recurrence reopen.
- [ ] Rebuild projection, so trước/sau và giải thích khác biệt; UI không biến partner-asserted thành verified. Test false/missing/source correction.
- **Đầu ra:** lineage query/quality dashboard; **kiểm chứng:** chọn một số liệu trên D và lần về chứng từ/event nguồn.

Rule v1 để AI triển khai (ngưỡng demo được đổi bằng D11 có test clock):

| `rule_id` | Trigger/source và severity | Resolve khi |
| --- | --- | --- |
| `missing_source` | `trace_link.missing_ref` chưa được giải sau 5 phút; source `lot`, warning | parent hợp lệ đến và link được rebuild |
| `out_of_order` | inbox `pending_dependency` vì parent đến sau child; source `event`, info | parent đến/reprocess thành công |
| `conflicting_quantity` | receipt actualLines/tổng không khớp transfer nguồn hoặc cùng event ID payload khác; source `event`, critical | đối tác gửi event correction có source mới/được duyệt, không sửa payload cũ |
| `unscanned_evidence` | projection tham chiếu attachment khác `clean`; source `attachment`, critical | file clean hoặc correction bỏ reference |
| `unknown_issuer` | M2M client không map partner active; source `partner` = hash client ID đã redacted, critical; rate-limit/aggregate, không ghi token | Admin sửa mapping/credential rồi có handshake hợp lệ |
| `stale_partner_summary` | partner summary chưa có event hợp lệ >24 giờ (demo clock); source `partner`, warning | nhận event hợp lệ mới; UI vẫn báo `asOf` cũ tới khi rebuild |

`quality_issue` là cảnh báo dữ liệu/vận hành, không cấp quyền cho event sai hay tự đổi stock/quality. Worker chạy lại không tạo row trùng `(rule_id,source_type,source_id)`, update `last_detected_at`/version; Admin action có `If-Match` và audit. Dữ liệu conflict bị reject trước khi trở thành trace `local_verified`.

## P12-T05 — Zero-trust và kiểm dịch

- [ ] Rà soát gateway default deny, OIDC audience/issuer/scope, partner M2M, service-to-service network policy, private DB/storage/Flowable admin ports, secret references và token TTL/rotation.
- [ ] Chạy threat tests IDOR, forged issuer, SSRF partner endpoint, public file leak, upload infected/oversized, prompt injection và stale role; sửa blocker.
- [ ] Route upload ở gateway đi thẳng vùng quarantine/scan, chỉ metadata+file `clean` được đưa vào luồng nghiệp vụ; ClamAV fail-closed, signature update/alert. Chứng minh file nhiễm bị chặn tại ranh giới vào và không phát tán; log/security audit không ghi secret/PII.
- **Đầu ra:** threat model cập nhật, security tests; **kiểm chứng:** route sai 401/403, tệp chưa clean không xuất bản.

## P12-T06 — GitOps có bằng chứng reconcile

- [ ] D12 quyết định topology GitOps demo; nếu áp dụng k3s/Argo CD, cấu hình desired state trong Git, image digest/secret references, namespace/network policy và sync health.
- [ ] Cố ý tạo drift không gây mất dữ liệu ở môi trường test, chứng minh controller phát hiện/reconcile về Git; chụp commit, sync event và actual state. Rollback bằng commit revert đã thử.
- [ ] Nếu môi trường chỉ chạy Compose, ghi đúng là IaC+CI và đánh dấu nguyên lý GitOps chưa đạt cho tới khi có controller/evidence hoặc BTC xác nhận cách minh chứng khác.
- **Đầu ra:** GitOps environment/runbook hoặc gap có chủ; **kiểm chứng:** drift/reconcile test lặp lại được.

## P12-T07 — Observability, SLO và sức tải

- [ ] Health/readiness thật cho app, Keycloak, gateway, Flowable, PG, storage, scan, worker; không trả `ok` tĩnh khi dependency bắt buộc chết.
- [ ] Metrics latency/error, stock command conflicts, outbox/inbox lag/dead-letter, workflow pending, scan failure, projection lag, AI quota; correlation ID xuyên gateway/app/worker mà không log secret.
- [ ] Chọn SLO/ngưỡng theo máy demo, load test kịch bản confirm/trace/public Passport và xử lý bottleneck; alerts có runbook và failure injection.
- **Đầu ra:** dashboards/alerts/performance report; **kiểm chứng:** tạo lỗi thật thì alert, xử lý theo runbook.

## P12-T08 — Backup, restore và disaster drill

- [ ] Backup/restore app DB từng instance, Keycloak/Flowable DB, object storage, config version và secret references; giữ dữ liệu A/B/C tách biệt.
- [ ] Restore vào host/namespace test mới, verify checksum, balance từ movement, inbox/outbox state, Flowable task và QR policy; thử mất một service/volume riêng.
- [ ] Đặt RPO/RTO mục tiêu và đo trong drill; ghi giới hạn khi thiếu offsite backup/tài nguyên. Không lưu backup chứa secret vào Git.
- **Đầu ra:** disaster runbook + drill log; **kiểm chứng:** người khác restore và tiếp tục kịch bản.

## P12-T09 — Gate G12

- [ ] Bốn nguyên lý có artifact/test đúng mức D11; zero-trust và scan, GitOps drift nếu được yêu cầu, lifecycle/IT-OT/lineage đều có trace nguồn.
- [ ] Failure, load, backup/restore và observability suite pass trên cấu hình demo đã pin; mọi gap còn lại được ghi với ảnh hưởng nghiệm thu.
- **Bằng chứng:** evidence map, scripts, dashboards, restore log, provenance query, GitOps sync record hoặc gap chưa đạt rõ.

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P12-T01 | `documents/adr/D11-dxos-proof.md` từng nguyên lý đề thi §4 với script, owner, expected output, BTC response nếu có; update `test-matrix.md`. | Bốn nguyên lý có artifact chạy thật hoặc gate ghi chưa đạt; không suy diễn bảng 7 lớp là bắt buộc nguyên xi. |
| P12-T02 | `workers/archive-export.ts`, `core_record(kind='archive_manifest')` payload `core-record-payloads-v1.md`, object partition `instance/year/month/eventType`, checksum/retention; query CLI/report. | Confirm OLTP không chờ archive; worker crash/replay giữ checkpoint; report truy history từ archive có source IDs/lag đo được. |
| P12-T03 | `contracts/core-records/ot_reading.schema.json`, `deploy/ot/device-registry.example.json`, simulator/service identity và core record `kind='ot_reading'` theo payload spec; lot timeline. | Wrong device reject/audit, stale có qualityState và không nâng chất lượng, duplicate cùng hash idempotent/khác hash 409; reading gắn batch và ghi rõ simulated. |
| P12-T04 | Lineage fields `sourceEventIds`, `transformVersion`, `policyVersion`, `builtAt` trên projection/report; `0009_quality_operations.sql` `quality_issue` 6 rule IDs, `/quality/issues` Admin API/dashboard theo `api-payloads-v1.md`. | Chọn metric ở D lần về source document/event; missing→open→ack→resolved/reopen có audit; replay/rebuild deterministic, partner_asserted không tự verified. |
| P12-T05 | `tests/security/` route/auth/IDOR/SSRF/upload/injection, ClamAV gateway→quarantine fail-closed, secret/network checks. | Tệp pending/infected không tải; forged issuer/role/QR bị chặn; ports admin internal; log không PII/secret. |
| P12-T06 | `deploy/gitops/` k3s/Argo CD app manifests, desired image digest/secret references, drift/reconcile script + rollback commit. | Thay đổi replica/config test ngoài Git bị controller phát hiện/phục hồi, lưu sync event; Compose+CI đơn thuần không tính pass. |
| P12-T07 | Prometheus/Grafana config, request/correlation IDs, latency/error/backlog/workflow/scan/AI/projection metrics, failure injection/runbook. | Kill B/worker/Flowable/storage tạo alert đúng; load script đo p95 theo tài nguyên demo và ghi bottleneck, không tự bịa SLO. |
| P12-T08 | `deploy/scripts/backup.*`, `restore.*`, manifest checksums, A/B/C per-instance runbook; restore target mới. | Balance=sum movement, inbox/outbox, attachment SHA, Flowable task/QR state khớp; RPO/RTO đo thực. |
| P12-T09 | `evidence/G12.md` bốn nguyên lý, security/perf/restore/GitOps links, image digests và reviewer. | Gap bắt buộc nào chưa pass thì G12 fail; không claim full lakehouse/digital twin production từ simulator. |
