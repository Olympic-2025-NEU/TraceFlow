# Phase 06 — M02 Catalog & Inventory

**Mục tiêu:** master data lô/kho và sổ tồn chính xác, cung cấp Inventory port cho M03. **Phụ thuộc:** G03–G05, D07. **Unblock:** nhập/xuất ở P07, trace. **AC:** AC-03 kết thúc khi phiếu nhập P07 đã tăng tồn thật.

## P06-T01 — Chốt quy tắc định lượng và định danh

- [ ] ADR D07 có ví dụ hàng chiếc/hàng cân, đơn vị cơ sở, precision/scale, quy đổi nếu có, làm tròn và phép so sánh. Dùng decimal string/decimal library ở biên, `numeric` trong PG; không dùng JS float cho balance.
- [ ] Chốt uniqueness SKU/barcode trong một instance và batch code trong phạm vi product + issuer; lô đối tác có external issuer ID riêng.
- [ ] Fixture kiểm 0, âm, quá precision, overflow, duplicate barcode, trùng tên khác issuer và ngày hết hạn.
- **Đầu ra:** invariant document + unit tests; **kiểm chứng:** input sai trả lỗi ổn định, không ghi DB.

## P06-T02 — Product/SKU và identifiers

- [ ] Migration `catalog.product`/`product_identifier`; trạng thái active/archived, SKU unique, barcode type/value với uniqueness phù hợp, unit và mô tả ngắn.
- [ ] API create/update/list/search theo pagination/filter; archive không xóa history, product đã có chứng từ không đổi unit/identity tùy tiện.
- [ ] UI nhập product có lỗi uniqueness/validation rõ, tìm bằng SKU hoặc barcode; quyền Admin/Staff theo matrix.
- **Đầu ra:** product module qua PG/API/UI; **kiểm chứng:** restart giữ dữ liệu, duplicate bị DB và domain chặn.

## P06-T03 — Batch/lô với nguồn gốc

- [ ] Migration batch có product FK, issuer, issuer lot ID hoặc local lot code, manufacture/expiry, quality status `available|restricted|inspect`, metadata nguồn.
- [ ] Tạo batch local hoặc map batch từ partner theo policy; không gộp chỉ vì cùng tên/code. Thay quality status cần action, reason, audit và quyền; restricted/expired ảnh hưởng xuất hàng theo rule.
- [ ] API/UI list/detail/filter theo issuer, product, expiry; hiển thị source và status, chặn sửa identity sau movement.
- **Đầu ra:** batch module; **kiểm chứng:** hai issuer cùng lot code vẫn tách, lô restricted không được xuất.

## P06-T04 — Warehouse và phạm vi quyền

- [ ] Migration warehouse unique code, active/archived; balance luôn gắn warehouse + product + batch. Không chuyển kho bằng sửa cột balance trực tiếp.
- [ ] Warehouse permission nếu D04 chọn: user không có quyền không xem/ghi kho khác; inactive warehouse không nhận movement mới.
- [ ] API/UI tạo và liệt kê; kiểm tra hàng còn tồn trước archive.
- **Đầu ra:** warehouse module; **kiểm chứng:** FK/unique và permission tests.

## P06-T05 — Sổ movement và balance projection

- [ ] Migration `stock_movement` append-only, `stock_balance` unique; movement gồm direction, quantity, source document/line, action, occurred_at, actor và correlation. Unique source action để chống nhân đôi.
- [ ] Balance được cập nhật **chỉ** qua Inventory application port trong cùng transaction client của M03; không cho route PATCH balance. Chốt lock ordering và conditional update ngăn âm.
- [ ] Rebuild/reconcile balance từ movement trong môi trường kiểm thử; divergence tạo alert, không tự sửa bằng overwrite âm thầm.
- **Đầu ra:** Inventory port + PG adapter; **kiểm chứng:** double call cùng source chỉ một movement, lỗi rollback không lệch balance.

## P06-T06 — Read model tồn theo lô

- [ ] Query balance theo kho/product/batch, tổng từ nhiều kho và movement history có pagination; response ghi unit, thời gian snapshot/source.
- [ ] Truy vấn chỉ trong instance, áp authz; batch private/partner source không lộ trên public route.
- [ ] UI tra tồn và lịch sử biến động, empty/error/loading; số lượng hiển thị chính xác theo unit/precision.
- **Đầu ra:** inventory read API/UI; **kiểm chứng:** tổng bằng sổ movement, quyền và pagination pass.

## P06-T07 — Test cạnh tranh và import master data

- [ ] Test hai lệnh issue cùng balance chỉ một thành công nếu tổng vượt tồn; retry/idempotency không nhân movement. Nếu chưa có M03, dùng test harness qua Inventory port; chạy lại với M03 ở P07.
- [ ] Seed product/batch/warehouse A/B/C idempotent; không seed balance bằng SQL cập nhật trực tiếp. Nạp tồn khởi đầu qua phiếu nhập P07 hoặc documented opening-balance command có audit/movement/approval.
- [ ] Test restore/restart không đổi tồn, reconcile deterministic.
- **Đầu ra:** integration suite và fixtures; **kiểm chứng:** PG assertions theo quantity/source.

## P06-T08 — Gate G06

- [ ] Product, batch, warehouse API/UI và Inventory port chạy thật; uniqueness, quality, precision, concurrency tests pass.
- [ ] AC-03 **chưa đánh dấu hoàn thành** cho đến khi P07 xác nhận nhập và balance tăng qua chứng từ; lưu cross-phase test ở G07.
- **Bằng chứng:** migration, read/write request trace, balance/movement assertions, seed log.
