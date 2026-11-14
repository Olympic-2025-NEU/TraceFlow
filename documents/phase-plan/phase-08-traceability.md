# Phase 08 — M04 Traceability, Passport và QR

**Mục tiêu:** lịch sử lô dựa trên chứng từ/event có nguồn, truy ngược/truy xuôi, công bố theo policy. **Phụ thuộc:** G07, D08. **Unblock:** federation và DX-Lab. **AC:** AC-08/09 local; AC-07/09 xuyên A/B/C kết thúc ở P09.

## P08-T01 — Mô hình provenance và liên kết lô

- [ ] Migration `trace_event`, `trace_link`, `passport_projection`, `qr_token`; mỗi event có issuer-qualified batch ID, source document/event, occurred/recorded time, event version, evidence refs, verification status.
- [ ] Link goods receipt/issue/transfer/receiving/stocktake/sale bằng quan hệ có hướng; phân biệt nguồn local verified với partner-asserted và missing/pending.
- [ ] Chốt uniqueness `(issuer, eventId)` và source action để retry handler không tạo event trùng; không tạo event từ Draft/rollback.
- **Đầu ra:** schema và trace port; **kiểm chứng:** movement/event truy được tới chứng từ nguồn.

## P08-T02 — Projector từ domain event

- [ ] Consumer outbox xây trace event sau commit, có lease/retry/dead-letter, version handler; rebuild projection từ log nguồn deterministic.
- [ ] Nếu consumer down, nghiệp vụ local vẫn confirm; UI hiển thị projection lag thay vì báo lịch sử đầy đủ sai. Alert khi lag vượt ngưỡng.
- [ ] Test duplicate/out-of-order event, missing source và replay sau restore; không cho actor sửa tay lịch sử confirmed.
- **Đầu ra:** projector + metrics; **kiểm chứng:** cùng nguồn phát lại cho cùng trace, không mất event.

## P08-T03 — Backward trace

- [ ] Từ batch/document tại C truy ngược theo receipt → transfer/issue → batch nguồn, có depth/cycle limit, pagination và quyền xem.
- [ ] Trong P08 chỉ có local links; node upstream chưa có federation hiển thị `pending/missing`, không tự bịa producer hoặc xác nhận partner. P09 nối thêm verified summaries A/B.
- [ ] API trả node/edge/source/verification/occurredAt rõ để UI dựng timeline; test cycle, branch và cùng lot code khác issuer.
- **Đầu ra:** backward query; **kiểm chứng:** chain local đúng và gap rõ.

## P08-T04 — Forward trace và impact list

- [ ] Từ batch cần kiểm tra tìm issue, transfer, receiver và sale record downstream; dedupe theo issuer-qualified IDs, không tiết lộ bên mua/private field nếu thiếu quyền.
- [ ] Báo affected quantity/partner theo dữ liệu biết được, tách `confirmed`, `partner-asserted`, `unknown`; kết quả có thời gian dữ liệu và gap markers.
- [ ] Test lô chia nhiều nhánh, partial receiving, sale tại C; P09 chạy lại xuyên instance cho AC-09.
- **Đầu ra:** impact API/UI tối thiểu; **kiểm chứng:** nguồn ID và số lượng khớp chứng từ.

## P08-T05 — Chính sách công bố Passport

- [ ] Allowlist field public/partner/private cho organization, product, batch, timeline, evidence; version policy và owner phê duyệt; mặc định private.
- [ ] Projection công khai chỉ từ dữ liệu đã confirm + evidence `clean` có quyền public; không trả secret, PII, giá, tồn nội bộ, file private hoặc toàn bộ raw event.
- [ ] Rebuild và revoke projection khi policy/quality thay đổi; retention/caching và invalidation có test. Audit ai đổi policy.
- **Đầu ra:** policy engine/projection; **kiểm chứng:** snapshot public contract không chứa field cấm.

## P08-T06 — QR token và endpoint public

- [ ] QR chứa URL/token opaque ngắn gọn, không chứa ID đoán được hay dữ liệu nhạy cảm. Token có lifecycle active/revoked, rate limit và kiểm tra input.
- [ ] Gateway public route chỉ GET Passport; private route trace yêu cầu auth; anti-enumeration, cache header và lỗi revoked/unknown không lộ metadata.
- [ ] UI in/tải QR và trang mobile Passport hiển thị nguồn/tình trạng xác minh/gap, không gắn nhãn chứng nhận không có bằng chứng.
- **Đầu ra:** QR + Passport UI/API; **kiểm chứng:** scan thật, revoke, guessing và private leak tests.

## P08-T07 — Evidence và chất lượng lịch sử

- [ ] Gắn attachment đã scan với document/trace event bằng checksum và visibility; presigned URL chỉ sau policy check, giới hạn hạn sống.
- [ ] Timeline thể hiện date, issuer, source ID, actual/sent discrepancy, verification status; kiểm tra timezone và thứ tự occurred vs recorded.
- [ ] Dữ liệu nguồn sai/missing đánh dấu trạng thái điều tra; không âm thầm chuẩn hóa hay xóa provenance.
- **Đầu ra:** evidence viewer/provenance fields; **kiểm chứng:** file infected/private không xuất hiện trên Passport.

## P08-T08 — Gate G08

- [ ] Trace local và Passport/QR chạy từ chứng từ M03 thật; AC-08 pass. Backward/forward local, duplicate event, policy/revoke/privacy tests pass.
- [ ] AC-07/09 cross-instance chưa đánh dấu Done cho tới G09; ghi rõ những gap trước khi nhận federation.
- **Bằng chứng:** event→source links, API graph fixture, QR scan, policy snapshot, projector retry logs.

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P08-T01 | `0007_traceability.sql`: `trace_event`, `trace_link`, `passport_projection`, `qr_token` đúng schema v1; trace port `contexts/traceability/`. | Event issuer-qualified, document source FK, unique external event; same lot code khác issuer tách; không event từ Draft. |
| P08-T02 | `workers/trace-projector.ts` nhận domain outbox event v1, upsert idempotent `core_record(kind='trace_projection')` theo `core-record-payloads-v1.md`, build link/source/checksum; lag metric. | Replay/duplicate cho cùng graph; worker down khiến lag rõ nhưng M03 vẫn confirm; rebuild từ nguồn khớp checksum. |
| P08-T03 | `/lots/{id}/trace/backward` DFS/BFS bounded depth<=10 + visited set, node/edge/gap shape ở API spec. | Receipt→issue→transfer local link đúng, remote B chưa tới ở P08 thì gap; cycle không loop, quyền private vẫn được check. |
| P08-T04 | `/lots/{id}/trace/forward` + impact UI, join issue/transfer/receiving/sale qua trace links. | Nhánh nhiều transfer/partial không duplicate; quantity có source; chưa có downstream summary thì hiển thị unknown, không claim đầy đủ. |
| P08-T05 | `contexts/traceability/application/passport-policy.ts`: explicit allowlist `{productName,publicLotCode,originIssuer,timeline,verificationState,gaps,asOf}` + policy version, projection builder. | Raw row/PII/giá/stock/file private không vào JSON public; policy revoke/rebuild invalidates cache. |
| P08-T06 | QR random >=128 bit, DB chỉ `token_hash`, `/qr` create/revoke và public Passport route/UI. | Scan URL trên mobile, token revoked/unknown 404, enumeration/rate test, không raw batch UUID trong QR. |
| P08-T07 | `trace_event` evidence refs đến attachment `clean` có partner/public policy; timeline source/occurred/recorded/verification. | Infected/pending/private file không có link public; missing/partner_asserted hiển thị đúng, timezone UTC→local chỉ UI. |
| P08-T08 | `evidence/G08.md` graph fixture/QR/privacy snapshot/projector crash/replay. | AC-08 pass; AC-07/09 xuyên instance chờ G09, không đánh dấu sớm. |
