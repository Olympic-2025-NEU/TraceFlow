# Plan: M02 — Product & Inventory Management

> Plan tổng quan. DevOps bổ sung chi tiết hệ thống, giao diện, kiểm thử, kết nối trước khi code sâu.

## 1. Mục tiêu / phạm vi MVP

| Mã | Chức năng |
| --- | --- |
| NX-PROD-01 | Product Management |
| NX-PROD-02 | Product Identifier (SKU ở Product; EAN-13/internal barcode ở bảng identifier) |
| NX-PROD-03 | Batch/Lot Management |
| NX-PROD-04 | Batch Information (NSX, HSD, nguồn lô) |
| NX-INV-01 | Warehouse |
| NX-INV-02 | Inventory Balance |
| NX-INV-03 | Inventory History |
| NX-INV-04 | Batch Status (available / restricted / inspect) |

Folders: `contexts/catalog/`, `contexts/inventory/`.

## 2. Ngoài phạm vi

- Module QC chuyên sâu nhiều bước
- BOM / lệnh sản xuất
- Định giá, công nợ

## 3. Phụ thuộc / cung cấp

| Hướng | Nội dung |
| --- | --- |
| Phụ thuộc | Platform, M01 |
| Cung cấp M03 | ProductId, BatchId, WarehouseId; port điều chỉnh tồn |
| Cung cấp M04 | Định danh lô / mapping nguồn đối tác |
| Cung cấp AI01 | Tra cứu product/lot/tồn |

Nguyên tắc: số lượng tồn chỉ đổi từ giao dịch hợp lệ (do M03 gọi port Inventory khi confirm).

## 4. Aggregate / sự kiện chính

- `Product`, `ProductIdentifier`, `Batch`
- `Warehouse`, `StockBalance`, `StockMovement`
- Sự kiện nội bộ: `inventory.balance.changed` (cho history / audit)

## 5. API bề mặt (dự kiến)

- `GET/POST/PATCH /api/v1/products`, `POST /api/v1/products/{id}/identifiers`; không DELETE có history
- `GET/POST /api/v1/batches`, `POST /api/v1/batches/{id}/quality-actions`; batch partner chỉ service verified inbox tạo
- `GET/POST /api/v1/warehouses`; archive theo policy, không DELETE có balance/history
- `GET /api/v1/inventory/balances`
- `GET /api/v1/inventory/movements`
- Port nội bộ: `adjustStock`, `assertAvailable`

## 6. UI bề mặt

- Danh mục sản phẩm / lô
- Kho và tồn theo sản phẩm+lô
- Lịch sử biến động
- Trạng thái lô

## 7. Kiểm thử tối thiểu

- Unit: v1 luôn cấm tồn âm; batch status `restricted/inspect` và hết hạn chặn xuất
- Integration: movement ghi history
- API: validation SKU/lot uniqueness trong instance

## 8. Tiêu chí Done

- [ ] AC-03
- [ ] Port Inventory sẵn cho M03
- [ ] Lô lưu được tham chiếu nguồn đối tác (phục vụ M04)

## 9. Ghi chú DevOps

Chi tiết hóa: chiến lược khóa dòng khi adjust stock, đơn vị tính, import lô từ federation mapping, UI lọc HSD.
