# Ma trận nghiệm thu và bằng chứng

Không có test nào ở đây đã được chạy chỉ vì kế hoạch được viết. Với mỗi dòng, lưu lệnh/commit, dữ liệu fixture, kết quả và người kiểm tra. Chạy lại trên clone sạch và môi trường demo. Mã AC lấy từ `../referents/ACCEPTANCE_MVP.md`/proposal Ch6.10.

Các mục chấm 50 điểm PoF (Point of Failure) và 50 điểm sản phẩm được tách riêng ở [contest-scorecard.md](./contest-scorecard.md); đặc biệt release phải **có trước thời điểm nộp bài**.

## 1. AC-01…AC-13

| AC | Phase chính | Kiểm thử chấp nhận tối thiểu | Bằng chứng |
| --- | --- | --- | --- |
| AC-01 | 01, 09, 13 | Dựng A/B/C từ source với ba app DB, volume/credential riêng; dừng B không làm A/C mất nghiệp vụ nội bộ | Compose config/ps, DB identity query từng stack, failure log |
| AC-02 | 02, 05 | Mỗi instance đăng nhập realm/client riêng, một hồ sơ org, Admin quản user/partner; Staff không sửa connection | UI/API 200/403, DB snapshot, token claims đã redacted |
| AC-03 | 06, 07 | Tạo product, SKU/barcode, batch, warehouse; nhập hợp lệ tăng tồn; truy vấn balance theo lot; không âm khi hai issue song song | API/DB assertions + concurrency test |
| AC-04 | 07 | Tạo Draft receipt/issue gắn lot; Draft không đổi stock; confirm đổi stock/movement/audit/outbox đúng một lần; transfer/sale link issue không trừ thêm | Transaction integration + UI/API log |
| AC-05 | 09 | A confirm transfer, B nhận envelope qua gateway M2M, xác thực issuer/version và technical ACK | A/B network trace đã redacted, inbox/outbox records |
| AC-06 | 07, 09 | B xác nhận `actualQuantity` riêng; lệch số ghi discrepancy; tồn B chỉ tăng theo actual sau confirm, không có GoodsReceipt cộng lần hai | DB balance trước/sau, receipt event, partial case |
| AC-07 | 08, 09, 13 | C truy xuất được A→B→C qua ba DB và issuer-qualified links; A offline vẫn hiển thị history đã lưu với gap/verification status | E2E fixture, UI timeline, query provenance |
| AC-08 | 08, 11 | QR mở Passport public đúng policy; revoke token; field private/file private không lộ | URL/QR scan, privacy snapshot, negative test |
| AC-09 | 08, 09 | Từ lot cần kiểm tra liệt kê transaction/partner nhận liên quan, ghi rõ phần dữ liệu thiếu | Forward trace query + UI + source IDs |
| AC-10 | 10 | AI hỏi thông tin lot, chỉ gọi tool có quyền, số liệu khớp API, có source; user không có quyền bị từ chối | Tool audit, comparison output, 403 test |
| AC-11 | 10, 11 | AI tạo một loại document Draft; user xem/chỉnh/sau đó confirm qua M03; AI không có tool confirm | API state/stock trước-sau, adversarial test |
| AC-12 | 04, 07, 11 | Flowable OSS chạy BPMN: tạo task, approver khác người tạo duyệt/từ chối, kết quả chặn/mở confirm theo rule | process deployment/version, Flowable API log, UI/task test |
| AC-13 | 00, 01, 13 | Clone repo public sạch, build từ source, migrate/seed, chạy Compose, test, backup/restore theo README không cần tệp bí mật trong Git | Runbook với môi trường mới, release/source artifact, checksum |

## 2. Ràng buộc đề thi/thể lệ ngoài AC

| Gate | Kiểm thử/chứng cứ | Phase |
| --- | --- | --- |
| Nguồn mở và khả năng kiểm chứng | `LICENSE` AGPL-3.0-only, SPDX trên từng tệp mã tự viết, inventory giấy phép bên thứ ba, repo public/web viewer, issue tracker, changelog, release nguồn mở, hướng dẫn build/deploy | 00, 13 |
| Core headless | Trình diễn cùng một lõi cung cấp Identity/SSO, API Gateway, PostgreSQL API/data access có quyền, file storage và Flowable cho app; không dựa vào UI lõi | 01–04, 11 |
| H-P-D-I tầng 2 | Ít nhất một workspace chạy thật: H user, P approval/receiving, D trace/metrics, I AI; chỉ rõ API/service tầng 1 được tiêu thụ | 11, 13 |
| Tính nguyên gốc | Demo federation có receiving/discrepancy, trace xuyên DB riêng, audit/provenance và human-in-loop; so sánh với công cụ lõi tái sử dụng | 09, 13 |
| Tính hoàn thiện/UX | Luồng A→B→C không cần thao tác DB, trạng thái chờ/lỗi hiển thị, responsive/accessibility và demo có thể tự lặp | 11–13 |

## 3. Bốn nguyên lý kỹ thuật ở mục 4 đề thi

| Nguyên lý | Minh chứng tối thiểu đề xuất | Điều không được tuyên bố quá mức |
| --- | --- | --- |
| Vòng đời/tốc độ dữ liệu | PG xử lý OLTP; sau commit xuất event lịch sử có checksum, version và source IDs sang object storage ở định dạng truy vấn được; truy vấn D/report từ projection/archived data không chặn confirm | Không gọi một JSON export chưa được truy vấn là lakehouse hoàn chỉnh |
| Hội tụ IT/OT | Nhận một luồng scanner/temperature simulated có timestamp, device ID và lot; validate, lưu evidence, tạo trace/alert liên quan đến giao nhận và lot digital representation có lag; hiển thị bên cạnh event ERP | Không gọi dữ liệu giả là sensor production hoặc digital twin toàn diện |
| Dòng dữ liệu/lineage/chất lượng | Mỗi projection/Passport/report ghi source event IDs, transform/policy version, thời điểm, status verified/partner-asserted/missing; test dữ liệu sai/out-of-order | Không suy diễn rằng partner-asserted là chứng nhận độc lập |
| Zero-trust + GitOps/kiểm dịch | Gateway OIDC, scope, default deny, scan upload, network isolation; cấu hình triển khai trong Git, một môi trường GitOps reconcile drift nếu D12 chốt yêu cầu nghiêm ngặt | Compose + CI thuần túy không được gọi là GitOps controller |

Nhóm cần kiểm tra với BTC mức mong đợi của bốn nguyên lý. Nếu BTC yêu cầu hạ tầng tham chiếu đầy đủ hơn, ghi thay đổi scope/ADR và thêm gate trước release; không tự đánh dấu đạt bằng lập luận trên giấy.

## 4. Cấp kiểm thử và failure matrix

- Unit: invariant lot/status/quantity, action transition, event mapping, policy public, risk rule AI.
- Integration PG: transaction rollback, concurrent stock, outbox, audit, inbox unique, migration/restore.
- Contract API: OpenAPI, authz, validation, versioning, idempotency, payload max, pagination.
- Integration lõi: APISIX ↔ Keycloak, Next ↔ PG/storage/Flowable, file scan, liveness/readiness.
- Federation: A/B/C, duplicate, timeout, offline, out-of-order, wrong issuer, partial/dispute, schema v1/v2 compatibility.
- E2E UI: Admin/Staff/Approver/public, keyboard/mobile, loading/error states, QR, AI Draft→human Confirm.
- Operability: kill/restart worker, DB restore, credential rotate, logs/metrics/alerts, GitOps drift nếu áp dụng.

## 5. Quy tắc lưu bằng chứng

Mỗi AC có fixture deterministic và script/lệnh chạy lại, không chỉ screenshot. Không chụp secret/PII. Gắn bằng chứng với commit/tag/release, image digest, cấu hình đã redacted và version dữ liệu. Gate release do nhóm kiểm tra lại trên môi trường sạch, không chấp nhận “chạy trên máy tác giả”.
