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
- [ ] Rule quality phát hiện missing source, out-of-order, conflicting quantity, unscanned evidence, unknown issuer và stale partner summary; ghi issue/state để điều tra.
- [ ] Rebuild projection, so trước/sau và giải thích khác biệt; UI không biến partner-asserted thành verified. Test false/missing/source correction.
- **Đầu ra:** lineage query/quality dashboard; **kiểm chứng:** chọn một số liệu trên D và lần về chứng từ/event nguồn.

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
