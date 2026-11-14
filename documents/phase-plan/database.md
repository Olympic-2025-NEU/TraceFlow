# Hợp đồng dữ liệu ban đầu

Tài liệu này mô tả bất biến dữ liệu; **tên từng bảng/cột, kiểu, nullable, default, FK, check, unique, index và thứ tự migration** nằm ở [database-schema-v1.md](./database-schema-v1.md). Đó là baseline v1 để AI viết migration, chưa phải bảng đã có. P00 D03/D07 kiểm chứng và sửa blueprint/contract bằng ADR nếu cần. Một app DB cho một org/instance; `tenantId` scaffold hiện hữu không được dùng để mở mô hình nhiều doanh nghiệp chung DB.

## 1. Quy tắc chung

- Khóa nội bộ UUID; mọi event liên doanh nghiệp mang `issuer_instance_id` của **event**, origin lot reference `(origin_issuer_id, origin_lot_id)` và sender-local batch reference riêng. `upstream_message_ref` cho phép chứng minh B→C nối tới A→B, không đồng nhất issuer của event với issuer của lô. Thời gian lưu UTC (`timestamptz`); lưu cả occurred và recorded/published khi khác nhau.
- Số lượng dùng `numeric(20,3)` và đơn vị cơ sở D07; không tính tồn bằng JS floating point. Movement có `delta <> 0`: receipt/receiving dương, issue âm, stocktake theo variance; variance 0 không tạo movement. Không sửa movement đã confirm; bù bằng chứng từ mới có tham chiếu và movement theo loại chứng từ bù.
- FK/unique/check ở DB cộng kiểm tra domain. Business uniqueness xác định theo phạm vi: SKU trong instance, lot theo `(issuer_instance_id, external_lot_id)` hoặc local product + code, message theo `(issuer_instance_id, message_id)`.
- Mọi bản ghi chứng từ có `created_by`, `created_at`, `status`, `version`; optimistic version hoặc row lock cho confirm. Trạng thái chỉ đổi qua action, không cho PATCH status tùy ý.
- Dữ liệu public là **projection allowlist**; không expose row nội bộ hay tệp private. Có `source_event_id`, `policy_version`, `built_at` để audit nguồn.
- Schema theo owner: `platform`, `system`, `catalog`, `inventory`, `trading`, `traceability`, `federation`. Quyền DB runtime tối thiểu; migration role tách runtime role.
- Theo D14, một hành động nghiệp vụ chỉ có **một chủ sở hữu movement**: receipt nhập nội bộ, issue xuất, receiving nhập thực tế, stocktake điều chỉnh. Transfer và sale record tham chiếu issue đã confirm; chúng không cập nhật balance lần nữa. Chứng từ receiving không đồng thời confirm một GoodsReceipt khác cho cùng hàng. Mọi link này có FK/unique và test.

## 2. Schema/bảng tối thiểu

| Schema | Bảng/aggregate | Trường và constraint quan trọng | Phase |
| --- | --- | --- | --- |
| platform | `audit_log` | id, actor/client, action, target, request_id, `created_at`, before/after summary đã redacted; append-only | 03 |
| platform | `idempotency_record` | `(actor_or_client, route, key)` unique, payload hash, response reference/status, expiry; key cũ payload khác phải 409 | 04 |
| platform | `outbox_message` | id, aggregate/version, type/schema_version, payload, destination, status, attempts, next_attempt_at, created_at; index theo due/status | 04 |
| platform | `approval_request` | document ID, creator/approver, process ID/key/version, line snapshot hash, local state và quyết định; FK document thêm P07 | 04–07 |
| platform | `attachment`, `core_record` | Core data/file API sở hữu metadata tệp và record/projection có cấu trúc với owner/source/version/policy; attachment có bucket/key/checksum/MIME/size/scan state/visibility; unique object key | 03 |
| system | `organization`, `membership`, `membership_warehouse` (thêm P06) | đúng một organization row/instance, status active/suspended; membership map Keycloak `sub`, role, status; warehouse scope qua FK join | 05–06 |
| system | `partner`, `partner_connection` | partner ID/issuer, endpoint allowlist, receiver client mapping, secret reference/rotation metadata; không log secret | 05 |
| catalog | `product`, `product_identifier`, `batch` | SKU/barcode unique có scope; batch code, issuer reference, manufacture/expiry, quality status, product FK | 06 |
| inventory | `warehouse`, `stock_balance`, `stock_movement` | balance PK `(warehouse_id,batch_id)`, product được kiểm bằng composite FK; movement có source document line/unique source; `balance >= 0` bắt buộc v1 | 06–07 |
| trading | `document`, `document_line`, `transfer_detail`, `receiving_detail`, `sale_detail` | Sáu loại chứng từ là `document_type` của header chung; line FK, status/version, source/partner/approval và movement owner D14 | 07 |
| traceability | `trace_event`, `trace_link`, `passport_projection`, `qr_token`; P12 thêm `quality_issue` | event type, issuer, occurred, source document/evidence, batch, relation upstream/downstream; policy version; QR token opaque/revocable; issue rule/source/state bền vững | 08, 12 |
| federation | `inbox_message`, `delivery_attempt`, `identity_mapping`, `partner_ack` | unique `(issuer,message_id)` và `(issuer,event_id,event_type)`; payload hash/version/verify state; origin lot/sender batch/upstream refs, mapping external↔local, technical ack vs business receipt | 09 |

Flowable và Keycloak lưu vào database/role riêng của **cùng instance stack** nếu cần. Không thêm bảng engine của chúng vào app schema; không cho app thao tác trực tiếp bảng engine.

## 3. Transaction và concurrency

1. `confirm` của chứng từ sở hữu movement load document/version và balance liên quan, khóa hoặc cập nhật có điều kiện theo thứ tự ổn định để tránh race/deadlock. Transfer/sale confirm kiểm issue đã confirm và chưa được link trước đó; không gọi `adjustStock`.
2. Trong **cùng DB transaction**: xác nhận document; gọi Inventory port với transaction client cùng scope; insert movement unique theo source; cập nhật balance; ghi audit và outbox. Lỗi bất kỳ bước nào rollback toàn bộ.
3. Sau commit, dispatcher claim outbox row có lease; send; ghi attempt/ack; retry bằng backoff có giới hạn. **Federation destination** chỉ mark delivered sau technical ACK hợp lệ; local handler chỉ mark delivered sau handler success. Crash trước mark có thể gửi lại, receiver/handler phải dedupe.
4. Nhận federation: authenticate trước parse/ghi; unique inbox + payload hash; duplicate cùng hash trả ACK tương đương, duplicate khác hash báo conflict và audit. Nhận message không được update balance.
5. Test cạnh tranh: hai issue vượt số dư, chỉ một được confirm; double-click confirm tạo một movement/outbox; message replay tạo một inbox/trace summary.

## 4. Migration và dữ liệu mẫu

- P01 tạo versioned migration `0001_platform_core.sql` + runner; P03 kiểm/repository không sửa migration đã áp dụng; P04 thêm `0002_platform_delivery.sql`, P05 `system`, P06 `catalog`/`inventory` + warehouse scope join, P07 `trading`, P08 `traceability`, P09 `federation`, P12 `quality_issue`. Thứ tự/file/FK muộn ở `database-schema-v1.md`. Mỗi migration có kiểm tra forward và chiến lược rollback/restore; không dùng file SQL rỗng làm bằng chứng Done.
- Seed idempotent cho dev/test; demo A/B/C có tên, sản phẩm/lô, partner mapping và quyền khác nhau. Secret, token và dữ liệu cá nhân thật không ở seed public.
- Trước release: từ DB trống chạy toàn bộ migrations + seed, tạo nghiệp vụ; từ bản backup restore vào stack mới; đối chiếu số lượng document, balance, outbox, file metadata, trace links.

## 5. Câu hỏi cần đóng ở D07

Baseline v1 đã chọn unit `EA/KG/L`, `numeric(20,3)`, không stock âm, một receiving/source transfer, `actual<=sent`, confirmed bất biến; xem `implementation-baseline.md` và `database-schema-v1.md`. P00 vẫn phải thử/ghi ADR cho các quy tắc này và chốt retention audit/outbox/inbox, reversal sau confirm, timezone hiển thị và quyền downstream share. Không đổi schema một phía khi thay policy.
