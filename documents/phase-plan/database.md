# Hợp đồng dữ liệu ban đầu

Tài liệu này mô tả **đích cần thiết kế/migrate**, không phải bảng đã có. Kiểu, tên cột và constraint cuối cùng được chốt tại D03/D07, cập nhật migration và API contract cùng lúc. Một app DB cho một org/instance; `tenantId` scaffold hiện hữu không được dùng để mở mô hình nhiều doanh nghiệp chung DB.

## 1. Quy tắc chung

- Khóa nội bộ UUID; mọi event liên doanh nghiệp mang `issuer_instance_id` của **event**, origin lot reference `(origin_issuer_id, origin_lot_id)` và sender-local batch reference riêng. `upstream_message_ref` cho phép chứng minh B→C nối tới A→B, không đồng nhất issuer của event với issuer của lô. Thời gian lưu UTC (`timestamptz`); lưu cả occurred và recorded/published khi khác nhau.
- Số lượng dùng `numeric` và đơn vị cơ sở đã chốt D07; không tính tồn bằng JS floating point. `quantity > 0` ở movement; chiều tăng/giảm qua loại movement. Không sửa movement đã confirm; bù bằng movement mới có tham chiếu.
- FK/unique/check ở DB cộng kiểm tra domain. Business uniqueness xác định theo phạm vi: SKU trong instance, lot theo `(issuer_instance_id, external_lot_id)` hoặc local product + code, message theo `(issuer_instance_id, message_id)`.
- Mọi bản ghi chứng từ có `created_by`, `created_at`, `status`, `version`; optimistic version hoặc row lock cho confirm. Trạng thái chỉ đổi qua action, không cho PATCH status tùy ý.
- Dữ liệu public là **projection allowlist**; không expose row nội bộ hay tệp private. Có `source_event_id`, `policy_version`, `built_at` để audit nguồn.
- Schema theo owner: `platform`, `system`, `catalog`, `inventory`, `trading`, `traceability`, `federation`. Quyền DB runtime tối thiểu; migration role tách runtime role.
- Theo D14, một hành động nghiệp vụ chỉ có **một chủ sở hữu movement**: receipt nhập nội bộ, issue xuất, receiving nhập thực tế, stocktake điều chỉnh. Transfer và sale record tham chiếu issue đã confirm; chúng không cập nhật balance lần nữa. Chứng từ receiving không đồng thời confirm một GoodsReceipt khác cho cùng hàng. Mọi link này có FK/unique và test.

## 2. Schema/bảng tối thiểu

| Schema | Bảng/aggregate | Trường và constraint quan trọng | Phase |
| --- | --- | --- | --- |
| platform | `audit_log` | id, actor/client, action, target, request_id, occurred_at, before/after summary đã redacted; append-only | 03 |
| platform | `idempotency_record` | `(actor_or_client, route, key)` unique, payload hash, response reference/status, expiry; key cũ payload khác phải 409 | 04 |
| platform | `outbox_message` | id, aggregate/version, type/schema_version, payload, destination, status, attempts, next_attempt_at, created_at; index theo due/status | 04 |
| platform | `attachment`, `core_record` | Core data/file API sở hữu metadata tệp và record/projection có cấu trúc với owner/source/version/policy; attachment có bucket/key/checksum/MIME/size/scan state/visibility; unique object key | 03 |
| system | `organization`, `membership` | một organization active/instance; membership map Keycloak `sub`, role, status, scope | 05 |
| system | `partner`, `partner_connection` | partner ID/issuer, endpoint allowlist, receiver client mapping, secret reference/rotation metadata; không log secret | 05 |
| catalog | `product`, `product_identifier`, `batch` | SKU/barcode unique có scope; batch code, issuer reference, manufacture/expiry, quality status, product FK | 06 |
| inventory | `warehouse`, `stock_balance`, `stock_movement` | unique balance `(warehouse, product, batch)`; movement có source document line và unique source; `balance >= 0` nếu policy cấm âm | 06–07 |
| trading | `goods_receipt`, `goods_issue`, `partner_transfer`, `receiving_confirmation`, `stocktake`, `sale_record` + lines | status/action/version; lot/qty/warehouse; source/reference; confirmed_at/by; snapshot bất biến sau confirm | 07 |
| traceability | `trace_event`, `trace_link`, `passport_projection`, `qr_token` | event type, issuer, occurred, source document/evidence, batch, relation upstream/downstream; policy version; QR token opaque/revocable | 08 |
| federation | `inbox_message`, `delivery_attempt`, `identity_mapping`, `partner_ack` | unique `(issuer, message_id)`; payload hash/version/verify state; origin lot/sender batch/upstream refs, mapping external↔local, technical ack vs business receipt | 09 |

Flowable và Keycloak lưu vào database/role riêng của **cùng instance stack** nếu cần. Không thêm bảng engine của chúng vào app schema; không cho app thao tác trực tiếp bảng engine.

## 3. Transaction và concurrency

1. `confirm` của chứng từ sở hữu movement load document/version và balance liên quan, khóa hoặc cập nhật có điều kiện theo thứ tự ổn định để tránh race/deadlock. Transfer/sale confirm kiểm issue đã confirm và chưa được link trước đó; không gọi `adjustStock`.
2. Trong **cùng DB transaction**: xác nhận document; gọi Inventory port với transaction client cùng scope; insert movement unique theo source; cập nhật balance; ghi audit và outbox. Lỗi bất kỳ bước nào rollback toàn bộ.
3. Sau commit, dispatcher claim outbox row có lease; send; ghi attempt/ack; retry bằng backoff có giới hạn. Chỉ mark delivered sau technical ACK hợp lệ. Crash trước mark có thể gửi lại, receiver phải dedupe.
4. Nhận federation: authenticate trước parse/ghi; unique inbox + payload hash; duplicate cùng hash trả ACK tương đương, duplicate khác hash báo conflict và audit. Nhận message không được update balance.
5. Test cạnh tranh: hai issue vượt số dư, chỉ một được confirm; double-click confirm tạo một movement/outbox; message replay tạo một inbox/trace summary.

## 4. Migration và dữ liệu mẫu

- P03 tạo versioned migrations `platform`/`system`, P06 `catalog`/`inventory`, P07 `trading`, P08 `traceability`, P09 `federation`. Mỗi migration có kiểm tra forward và chiến lược rollback/restore; không dùng file SQL rỗng làm bằng chứng Done.
- Seed idempotent cho dev/test; demo A/B/C có tên, sản phẩm/lô, partner mapping và quyền khác nhau. Secret, token và dữ liệu cá nhân thật không ở seed public.
- Trước release: từ DB trống chạy toàn bộ migrations + seed, tạo nghiệp vụ; từ bản backup restore vào stack mới; đối chiếu số lượng document, balance, outbox, file metadata, trace links.

## 5. Câu hỏi cần đóng ở D07

Đơn vị cơ sở và precision; cho phép lô trùng mã từ issuer khác nhau ra sao; stock âm có bao giờ hợp lệ; quy tắc partial receiving/over-receiving; sửa/hủy sau confirm dùng reversal nào; retention audit/outbox/inbox và dữ liệu public; timezone hiển thị; dữ liệu nào được chia sẻ khi partner offline. Không code schema đến khi có câu trả lời và test minh họa.
