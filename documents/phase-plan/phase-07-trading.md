# Phase 07 — M03 Trading & Distribution

**Mục tiêu:** chứng từ Draft → confirm với tồn/audit/outbox atomic; giao nhận thực tế và một phê duyệt Flowable. **Phụ thuộc:** G04–G06, D06/D07. **Unblock:** trace/federation. **AC:** AC-03/04/06/12.

## P07-T01 — Loại chứng từ và transition contract

- [ ] Chốt field/status/action cho goods receipt, goods issue, partner transfer, receiving confirmation, stocktake và sale record; chỉ loại cần trong kịch bản MVP được phép đi tới confirm.
- [ ] Draft không đổi stock và được sửa với version; Confirmed bất biến, sửa sai bằng reversal/adjustment document có tham chiếu. Không cho PATCH status hay xóa confirmed.
- [ ] Chốt khi nào cần approval theo D06, người tạo/duyệt, việc từ chối/quá hạn; transition invalid có test.
- [ ] Đóng D14: GoodsReceipt nhập nội bộ +, GoodsIssue −, ReceivingConfirmation + actual, Stocktake ± variance; PartnerTransfer và SaleRecord chỉ tham chiếu issue đã confirm. Một issue outbound ↔ một transfer khớp lot/qty trong MVP; không tạo receipt nhập thứ hai cho cùng receiving.
- **Đầu ra:** state machine và API contract cập nhật; **kiểm chứng:** Draft/cancel/reject không tạo movement.

## P07-T02 — Migration và repository chứng từ

- [ ] Versioned tables/header+line cho từng loại hoặc cấu trúc thống nhất có constraint tương đương; line bắt buộc batch/product/qty/unit/warehouse đúng loại.
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
- [ ] Confirm tăng stock theo **actual**, không theo sent/ACK; không confirm GoodsReceipt nhập cùng hàng lần nữa. Partial/over/zero receipt theo D07, duplicate confirm không nhân tồn. Ghi discrepancy, event mới và audit trong transaction.
- [ ] Không tự sửa phiếu nguồn A; trạng thái đối chiếu của sender qua federation event ở P09. UI bắt người nhận xác nhận số lượng thực.
- **Đầu ra:** receipt use case; **kiểm chứng:** A gửi 12, B nhận 10 thì B +10, chênh 2 có nguồn; AC-06 hoàn chỉnh ở P09.

## P07-T06 — Stocktake và sale record tối thiểu

- [ ] Stocktake Draft ghi count theo batch/warehouse, variance và người kiểm; confirm tạo movement điều chỉnh có lý do, không overwrite balance. Quy tắc approval cho điều chỉnh lớn nếu D06 chọn.
- [ ] Sale record link **một** confirmed issue/lot đã trừ tồn và bên mua nếu được phép; sale không trừ tồn lần hai. Chỉ lưu dữ liệu cần cho forward trace, không làm POS/payment/finance. Confirm/cancel theo invariant bất biến.
- [ ] API/UI tối thiểu tạo/xem, audit và outbox trace; test variance âm/dương và không âm balance.
- **Đầu ra:** dữ liệu phục vụ trace C bán lô; **kiểm chứng:** sale link tới batch/movement/source document.

## P07-T07 — Flowable gắn với chứng từ thật

- [ ] Chọn một phiếu cụ thể theo D06 (ví dụ goods issue) và BPMN approve/reject; submit tạo local approval request/outbox, worker start process, task inbox cho Approver.
- [ ] Approver khác creator thao tác qua gateway/UI; kết quả engine được đồng bộ idempotent về app. Confirm phải kiểm local approval state + quyền hiện thời, không dựa vào client tự khai `approved=true`.
- [ ] Test Flowable down, callback lặp/đến muộn, rejected rồi confirm, process version upgrade; không tạo stock khi chưa duyệt.
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
