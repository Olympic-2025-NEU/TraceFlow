# Phase 07 — M03 Trading & Distribution

**Mục tiêu:** chứng từ Draft → confirm với tồn/audit/outbox atomic; giao nhận thực tế và một phê duyệt Flowable. **Phụ thuộc:** G04–G06, D06/D07. **Unblock:** trace/federation. **AC:** AC-03/04/06/12.

## P07-T01 — Loại chứng từ và transition contract

- [ ] Chốt field/status/action cho goods receipt, goods issue, partner transfer, receiving confirmation, stocktake và sale record; chỉ loại cần trong kịch bản MVP được phép đi tới confirm.
- [ ] Draft không đổi stock và được sửa với version; Confirmed bất biến, sửa sai bằng chứng từ bù mới có `correction_of_document_id`/reason và movement theo loại chứng từ bù. Không cho PATCH status hay xóa confirmed; không làm generic reversal xuyên instance trong MVP.
- [ ] V1 mọi GoodsIssue cần approval Flowable, Approver khác creator; chốt timeout/từ chối/quá hạn theo D06, transition invalid có test.
- [ ] Đóng D14: GoodsReceipt nhập nội bộ +, GoodsIssue −, ReceivingConfirmation + actual, Stocktake ± variance; PartnerTransfer và SaleRecord chỉ tham chiếu issue đã confirm. Một issue outbound ↔ một transfer khớp lot/qty trong MVP; không tạo receipt nhập thứ hai cho cùng receiving.
- **Đầu ra:** state machine và API contract cập nhật; **kiểm chứng:** Draft/cancel/reject không tạo movement.

## P07-T02 — Migration và repository chứng từ

- [ ] Versioned `trading.document` + `document_line` chung và `transfer_detail`/`receiving_detail`/`sale_detail` theo `database-schema-v1.md`; sáu loại chứng từ là `document_type`, line bắt buộc batch/product/qty/unit/warehouse đúng loại.
- [ ] FK/version/unique document number trong instance, snapshot giá trị cần bất biến, link source/partner/approver và timestamp. Index query theo status, batch, partner, time.
- [ ] Repository dùng transaction client P03, không ẩn transaction riêng; migration chạy từ DB trống và backup restore.
- **Đầu ra:** schema/repository; **kiểm chứng:** DB chặn line sai hoặc confirmed thiếu required fields.

## P07-T03 — Goods receipt và issue

- [ ] API/use case tạo/edit/submit/confirm receipt và issue; validate issuer/product/batch/warehouse/expiry/quality, unit, quantity và permission.
- [ ] Confirm receipt tăng stock, issue giảm stock; trong cùng transaction cập nhật status/version, movement/balance, audit, outbox. Idempotency key + source uniqueness chống double click/retry.
- [ ] UI nhập/xuất từ batch picker và hiển thị balance trước/sau; lỗi thiếu hàng/đã sửa version rõ.
- **Đầu ra:** hai luồng end-to-end; **kiểm chứng:** AC-03/04, rollback và hai issue cạnh tranh trên PG thật.

## P07-T04 — Partner transfer và liên kết issue

- [ ] Tạo transfer chỉ tới partner active, tham chiếu **một** confirmed issue/lot/quantity khớp chính xác và chưa transfer; outbound issue trừ tồn, transfer không trừ lần hai.
- [ ] Confirm transfer sinh domain event/outbox federation sau commit, không gọi partner đồng bộ và không ghi stock movement. Technical ACK và trạng thái giao hàng tách biệt.
- [ ] UI xem trạng thái pending/retry/technical ACK/business receipt/dispute với source IDs; A vẫn xem được lịch sử local khi B offline.
- **Đầu ra:** transfer local; **kiểm chứng:** Draft không gửi, Confirmed một outbox, B down không rollback stock A.

## P07-T05 — Receiving confirmation thực tế

- [ ] B/C tạo receiving Draft từ message đã xác thực hoặc nhập tham chiếu có quy tắc; hiển thị sent quantity, actual quantity, lot mapping và reason chênh lệch.
- [ ] Confirm tăng stock theo **actual**, không theo sent/ACK; không confirm GoodsReceipt nhập cùng hàng lần nữa. Partial/zero receipt hợp lệ và reason bắt buộc nếu khác; over-receipt ở v1 vào dispute/422, không cộng vượt. Duplicate confirm không nhân tồn. Ghi discrepancy, event mới và audit trong transaction.
- [ ] Không tự sửa phiếu nguồn A; trạng thái đối chiếu của sender qua federation event ở P09. UI bắt người nhận xác nhận số lượng thực.
- **Đầu ra:** receipt use case; **kiểm chứng:** A gửi 12, B nhận 10 thì B +10, chênh 2 có nguồn; AC-06 hoàn chỉnh ở P09.

## P07-T06 — Stocktake và sale record tối thiểu

- [ ] Stocktake Draft ghi count theo batch/warehouse, variance và người kiểm; confirm tạo movement điều chỉnh có lý do, không overwrite balance. Quy tắc approval cho điều chỉnh lớn nếu D06 chọn.
- [ ] Sale record link **một** confirmed issue/lot đã trừ tồn và bên mua nếu được phép; sale không trừ tồn lần hai. Chỉ lưu dữ liệu cần cho forward trace, không làm POS/payment/finance. Confirm/cancel theo invariant bất biến.
- [ ] API/UI tối thiểu tạo/xem, audit và outbox trace; test variance âm/dương và không âm balance.
- **Đầu ra:** dữ liệu phục vụ trace C bán lô; **kiểm chứng:** sale link tới batch/movement/source document.

## P07-T07 — Flowable gắn với chứng từ thật

- [ ] Áp dụng BPMN `goods-issue-approval` cho **mọi** GoodsIssue v1; submit tạo local approval request/outbox, worker start process, task inbox cho Approver. Decision ghi intent/outbox trước khi worker gọi engine.
- [ ] Approver khác creator thao tác qua gateway/UI; kết quả engine được đồng bộ idempotent về app. Confirm phải kiểm local approval state + quyền hiện thời, không dựa vào client tự khai `approved=true`.
- [ ] Test Flowable down, kết quả task lặp/đến muộn qua poller, rejected rồi confirm, process version upgrade; không tạo stock khi chưa duyệt.
- **Đầu ra:** process + UI + integration; **kiểm chứng:** Flowable process history và AC-12 end-to-end.

## P07-T08 — Cross-module transaction và query lịch sử

- [ ] Confirm mỗi loại gọi Inventory, Audit, Outbox trong một transaction; test fail ở từng bước rollback toàn bộ. Handler trace được chạy sau commit, không giữ HTTP/network trong DB transaction.
- [ ] API/UI danh sách chứng từ theo status/batch/partner/time, detail có movement/approval/delivery references, pagination và authz.
- [ ] Test đổi quyền giữa Draft và Confirm, stale version, parallel confirm, retry cùng key khác payload.
- **Đầu ra:** transaction suite và document history; **kiểm chứng:** không có Confirmed thiếu movement/outbox hoặc stock đổi do Draft.

## P07-T09 — Gate G07

- [ ] AC-03/04/12 pass trên PG+Keycloak+gateway+Flowable thật; receiving local AC-06 pass và đợi A/B e2e ở G09.
- [ ] Chuỗi nhập A → xuất/transfer A → nhận B → xuất B → nhận C → bán C có chứng từ/lot references, dù federation tự động sẽ hoàn thiện ở P09.
- **Bằng chứng:** API/UI test video hoặc logs đã redacted, DB transaction assertions, Flowable process ID/version, balance trước/sau.

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P07-T01 | `contexts/trading/domain/document.ts` type/status/action matrix; D14 fixed trong schema/API: receipt+, issue−, receiving+actual, stocktake variance; transfer/sale no movement; correction là document mới có source/reason. | Draft/cancel/reject không stock; confirmed immutable; correction link hợp lệ nhưng không hoàn tác tự động; transition invalid 409/422; issue link chỉ một transfer/sale theo loại. |
| P07-T02 | `0006_trading.sql`: **unified** `trading.document`, `document_line`, `transfer_detail`, `receiving_detail`, `sale_detail` theo `database-schema-v1.md`, thêm FK muộn, deferred confirmed checks và trigger immutable; repositories nhận shared tx. | DB chặn duplicate number/line, invalid FK, confirmed thiếu actor/time/required line; UPDATE/DELETE confirmed line bị DB từ chối; migration empty/upgrade pass. |
| P07-T03 | `/receipts` và `/issues` DTO `api-payloads-v1.md`, application use cases, UI forms; issue submit qua Flowable. | Receipt 20→A balance20; issue12 approved→A8; mỗi confirm 1 movement/line+audit/outbox, concurrent overdraw fail. |
| P07-T04 | `/transfers` copy exact lines từ confirmed issue, `transfer_detail.linked_issue_id UNIQUE`; outbox `transfer.announced.v1` chỉ sau confirm. | Transfer12 giữ A8, một issue không transfer hai lần, B offline vẫn A8/outbox retry. |
| P07-T05 | `/receivings` từ verified inbox/source ref, `document_line.source_line_ref` từng transfer line và quantity=sent/actual_quantity=actual, `receiving_detail` totals + movement; discrepancy reason. | B ACK vẫn 0; actual10/12→B10, discrepancy2, duplicate confirm→B10; bỏ sót/nhân đôi source line bị reject; actual>sent v1 dispute, không cộng vượt. |
| P07-T06 | `/stocktakes` count−balance under lock, `/sales-records` link confirmed issue, UI history; no POS/payment. | Stocktake delta0 không movement, delta± cập nhật balance; sale2 sau issue2 giữ C balance4, không double decrease. |
| P07-T07 | `workflow-spec-v1.md` BPMN/bridge + `/issues/{id}/submit` và Approver inbox/decision API, decision intent/outbox 202 trước engine. | Creator self-approve 403, reject chặn confirm, Flowable down giữ pending, approval line hash cũ không dùng sau sửa line; engine process history có ID. |
| P07-T08 | `contexts/trading/application/confirm-*.ts` transaction root gọi Inventory/Audit/Outbox, document history query. | Fail inject sau từng repository rollback tất cả; stale ETag/role change/parallel confirm 409/403, document history đúng nguồn. |
| P07-T09 | `evidence/G07.md` theo `demo-fixtures.md`: A receipt20→issue12→transfer12, B receiving10, C sale; Flowable ID/version và DB assertions. | AC-03/04/12 pass, AC-06 local pass; chưa gắn AC-06 cross-instance Done trước G09. |
