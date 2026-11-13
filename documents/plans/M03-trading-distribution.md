# Plan: M03 — Trading & Distribution

> Plan tổng quan. DevOps bổ sung chi tiết hệ thống, giao diện, kiểm thử, kết nối trước khi code sâu.

## 1. Mục tiêu / phạm vi MVP

| Mã | Chức năng |
| --- | --- |
| NX-TRD-01 | Goods Receipt |
| NX-TRD-02 | Goods Issue |
| NX-TRD-03 | Partner Transfer |
| NX-TRD-04 | Receiving Confirmation |
| NX-TRD-05 | Document History |
| NX-TRD-06 | Stocktake |
| NX-TRD-07 | Sale/Distribution Record |

Folder: `contexts/trading/`.

Trạng thái cơ bản: `Draft → Confirmed | Cancelled`. Giao dịch liên doanh nghiệp có thể thêm chờ xác nhận tiếp nhận / sai lệch.

## 2. Ngoài phạm vi

- Báo giá, PO nhiều bước, bảng giá, khuyến mãi
- Công nợ, thanh toán, kế toán
- POS đầy đủ (chỉ cần ghi nhận bán theo lô)

## 3. Phụ thuộc / cung cấp

| Hướng | Nội dung |
| --- | --- |
| Phụ thuộc | Platform, M01 (partner), M02 (product/lot/stock ports) |
| Cung cấp M04 | Khi confirm: outbox sự kiện truy xuất / federation |
| Cung cấp AI01 | Tạo draft phiếu nhập/xuất/kiểm kê |

Confirm phiếu → gọi Inventory port → ghi outbox (không SQL tồn trực tiếp).

## 4. Aggregate / sự kiện chính

- `GoodsReceipt`, `GoodsIssue`, `PartnerTransfer`, `ReceivingConfirmation`
- `Stocktake`, `SaleRecord`
- Domain/integration events: `trading.receipt.confirmed`, `trading.issue.confirmed`, `trading.transfer.confirmed`, `trading.receiving.confirmed`, `trading.sale.recorded`

## 5. API bề mặt (dự kiến)

- `POST/GET /api/v1/receipts`, `.../confirm`
- `POST/GET /api/v1/issues`, `.../confirm`
- `POST/GET /api/v1/transfers`, `.../confirm`
- `POST/GET /api/v1/receivings`, `.../confirm`
- `POST/GET /api/v1/stocktakes`, `.../confirm`
- `POST/GET /api/v1/sales-records`, `.../confirm`
- `GET /api/v1/documents` (history)

## 6. UI bề mặt

- Form draft phiếu nhập/xuất/chuyển/kiểm kê/bán
- Nút Confirm / Cancel
- Lịch sử chứng từ
- Màn nhận hàng từ đối tác (so sánh số lượng)

## 7. Kiểm thử tối thiểu

- Unit: confirm sai trạng thái bị từ chối; draft không đổi tồn
- Integration: confirm receipt tăng tồn + outbox
- Workflow mẫu (AC-12): một chứng từ đi qua phê duyệt Flowable trước confirm (do DevOps chọn loại phiếu)

## 8. Tiêu chí Done

- [ ] AC-04, AC-06
- [ ] Sự kiện confirm đủ payload để M04 ghi trace / gửi federation
- [ ] AI01 chỉ tạo được draft qua API này

## 9. Ghi chú DevOps

Chi tiết hóa: payload event contract, quy tắc lệch số lượng khi receiving, gắn Flowable process definition, UI mobile kho nếu cần.
