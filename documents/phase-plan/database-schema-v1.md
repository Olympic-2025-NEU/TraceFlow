# PostgreSQL schema v1 — blueprint tạo migration

Đây là **schema đích cụ thể** cho AI viết SQL migrations, chưa tồn tại trong DB hiện tại. Baseline D03/D07/D14 ở `implementation-baseline.md` áp dụng. Nếu P00 spike thay đổi lựa chọn, cập nhật blueprint và contract trước khi code. Dùng một app DB cho một instance; DB Keycloak và Flowable riêng. Không viết `tenant_id` đa org.

## Ký hiệu và quy tắc chung

- Mọi bảng có `id uuid PRIMARY KEY` do application sinh và `created_at timestamptz NOT NULL DEFAULT now()`, trừ bảng nêu khóa ghép hoặc bảng subtype `document_id` làm PK. Bảng mutable thêm `updated_at timestamptz NOT NULL DEFAULT now()` và `version integer NOT NULL DEFAULT 1 CHECK(version>0)` nếu liệt kê. Timestamp `confirmed_at` nullable cho tới confirm.
- Hậu tố `!` = `NOT NULL`, `?` = nullable cho **mọi** kiểu (`text!`, `uuid?`, `numeric(20,3)!`); cột nullable mặc định `NULL`. `uuid→x.y` = FK tới bảng/cột đó, `ON DELETE RESTRICT` mặc định; `jsonb! = '{}'` nghĩa `NOT NULL DEFAULT '{}'::jsonb`. `char(64)` là SHA-256 lowercase hex với `CHECK(value ~ '^[0-9a-f]{64}$')`. Không dùng `ON DELETE CASCADE` với chứng từ, movement, audit, inbox, outbox hay trace. Mã/cookie/token không lưu plaintext khi chỉ cần hash/reference.
- Domain enum lưu `text` + `CHECK` trong migration (giúp version thêm giá trị có migration); mọi enum và giá trị hợp lệ ghi dưới đây. Text code dùng `CHECK(length(trim(value)) BETWEEN 1 AND N)` với N nêu theo bảng. `numeric(20,3)` không âm/khác 0 theo constraint bảng. JSONB validate shape ở application + JSON Schema, không biến JSONB thành chỗ bỏ qua FK.
- ID người dùng là Keycloak `sub text` (không FK để giữ audit sau disable/delete). `instance_id text` do cấu hình instance và organization kiểm soát, không nhận từ request. `request_id`/`correlation_id` text <=128.
- Mỗi migration tạo bảng/index/constraint trong transaction PG nếu DDL hỗ trợ; file `db/migrations/0001_platform.sql` hiện 0 byte phải được thay bằng runner versioned. Không dùng mount `docker-entrypoint-initdb.d` làm cơ chế migration sau lần boot đầu.

## P03/P04 — `platform`

### `platform.audit_log` (P03)

`id`, `created_at`; `actor_sub text?`, `client_id text?`, `action text! (<=100)`, `target_type text! (<=80)`, `target_id text! (<=128)`, `outcome text! CHECK IN ('success','deny','failure')`, `request_id text!`, `correlation_id text?`, `before_summary jsonb! = '{}'`, `after_summary jsonb! = '{}'`. Check `actor_sub IS NOT NULL OR client_id IS NOT NULL`. Index `(target_type,target_id,created_at DESC)`, `(request_id)`, `(created_at DESC)`. Runtime role chỉ `INSERT/SELECT`; không cấp `UPDATE/DELETE`. Secret/token/PII không đi vào summary.

### `platform.attachment` (P03; owner core API)

`id`, `created_at`, `updated_at`, `version`; `owner_type text! CHECK IN ('document','batch','trace_event','core_record')`, `owner_id uuid?` (nullable khi quarantine chưa link), `bucket text! CHECK IN ('quarantine','private','public')`, `object_key text!`, `sha256_hex char(64)!`, `mime_type text!`, `size_bytes bigint! CHECK(size_bytes>0)`, `scan_state text! CHECK IN ('pending','clean','infected','error')`, `visibility text! CHECK IN ('private','partner','public') DEFAULT 'private'`, `created_by_sub text!`, `scanned_at timestamptz?`, `scan_engine_version text?`. Unique `(bucket,object_key)`; index `(owner_type,owner_id)`, `(scan_state,created_at)`. Trạng thái `public` chỉ khi scan clean + sharing policy cho phép, kiểm ở app/core API; không FK đa hình giả.

### `platform.core_record` (P03; owner core API)

`id`, `created_at`, `updated_at`, `version`; `kind text! CHECK IN ('evidence_metadata','trace_projection','ot_reading','archive_manifest')`, `source_type text! (<=80)`, `source_id text! (<=256)`, `payload jsonb!`, `visibility text! CHECK IN ('private','partner','public') DEFAULT 'private'`, `policy_version text!`, `checksum_hex char(64)!`, `built_at timestamptz!`. Unique `(kind,source_type,source_id)` để mỗi source có **một current record**; update có `WHERE version=expected`, tăng version/updated_at/checksum atomically. Index `(kind,built_at DESC)`, GIN `(payload)` **chỉ** nếu EXPLAIN/benchmark cần. `ot_reading` và `archive_manifest` là append-only bằng service policy/trigger; `trace_projection` và `evidence_metadata` được update có version/audit. `POST core/records` không nhận arbitrary kind hoặc SQL; mỗi kind có JSON Schema/version và source key ở `core-record-payloads-v1.md`. `trace_projection`, `ot_reading`, `archive_manifest` chỉ service identity có quyền ghi; user chỉ tạo `evidence_metadata` với owner/resource scope.

### `platform.idempotency_record` (P04)

`id`, `created_at`; `actor_or_client text!`, `method text!`, `route_key text!`, `idempotency_key text!`, `payload_sha256 char(64)!`, `state text! CHECK IN ('processing','completed','failed')`, `response_status smallint?`, `response_body jsonb?`, `resource_id uuid?`, `expires_at timestamptz!`. Unique `(actor_or_client,method,route_key,idempotency_key)`; index `(expires_at)`. Giữ row/lock trong transaction command; completed response trả lại khi retry, cùng key khác hash 409. Chốt retention ở P04, không xóa đang processing.

### `platform.outbox_message` (P04)

`id`, `created_at`; `aggregate_type text!`, `aggregate_id uuid!`, `aggregate_version integer!`, `event_type text!`, `schema_version text!`, `payload jsonb!`, `destination text!`, `correlation_id text!`, `status text! CHECK IN ('pending','leased','retry_due','delivered','dead_letter') DEFAULT 'pending'`, `attempt_count integer! DEFAULT 0 CHECK(attempt_count>=0)`, `next_attempt_at timestamptz! DEFAULT now()`, `lease_owner text?`, `lease_until timestamptz?`, `last_error_code text?`, `delivered_at timestamptz?`. Unique `(aggregate_type,aggregate_id,aggregate_version,event_type,destination)`; partial index `(next_attempt_at,created_at) WHERE status IN ('pending','retry_due')`; index `(correlation_id)`. Worker dùng `FOR UPDATE SKIP LOCKED`, lease hết hạn được reclaim.

### `platform.approval_request` (P04; FK document thêm P07)

`id`, `created_at`, `updated_at`, `version`; `document_id uuid!` (P07 thêm FK `trading.document.id`), `process_key text! DEFAULT 'goods-issue-approval'`, `process_definition_version integer?`, `flowable_process_id text?`, `flowable_task_id text?`, `state text! CHECK IN ('requested','starting','pending','decision_pending','approved','rejected','cancelled','failed')`, `creator_sub text!`, `decision_intent text? CHECK IN ('approved','rejected')`, `decision_requested_by_sub text?`, `decision_requested_at timestamptz?`, `approver_sub text?`, `decision_reason text?`, `decided_at timestamptz?`, `correlation_key text!`, `submitted_document_version integer! CHECK(submitted_document_version>0)`, `line_snapshot_sha256 char(64)!`. CHECK ba field `decision_intent/decision_requested_by_sub/decision_requested_at` cùng NULL hoặc cùng non-NULL; `state='decision_pending'` bắt cả ba non-NULL. Unique `(document_id)`, `(correlation_key)`, partial unique `(flowable_process_id) WHERE flowable_process_id IS NOT NULL`; index `(state,created_at)`. Hash tính từ `{lineNo,warehouseId,productId,batchId,quantity,unit}` theo thứ tự `lineNo`, JCS UTF-8; status/version document có thể tăng sau submit, nên confirm so **hash lines đã duyệt** và current `If-Match` riêng, không so current version với submitted version. Flowable down giữ `requested/starting/decision_pending`; không tự approved.

## P05 — `system`

### `system.organization`

`id`, `created_at`, `updated_at`, `version`; `singleton_slot smallint! DEFAULT 1 CHECK(singleton_slot=1) UNIQUE`, `instance_id text! UNIQUE`, `code text! UNIQUE (<=40)`, `name text! (<=200)`, `contact_email text?`, `timezone text! DEFAULT 'Asia/Ho_Chi_Minh'`, `status text! CHECK IN ('active','suspended') DEFAULT 'active'`. Không có row thứ hai cùng DB; `instance_id` bất biến sau bootstrap.

### `system.membership`

`id`, `created_at`, `updated_at`, `version`; `keycloak_sub text! UNIQUE`, `display_name text! (<=160)`, `email text?`, `role text! CHECK IN ('administrator','staff','approver','viewer')`, `status text! CHECK IN ('invited','active','disabled')`, `last_synced_at timestamptz?`. Không password. Warehouse scope ở bảng join P06 để có FK thật. Nếu cần nhiều vai cho một user, phải có ADR + migration `membership_role`; v1 một vai chính. Index `(role,status)`.

### `system.partner`

`id`, `created_at`, `updated_at`, `version`; `issuer_instance_id text! UNIQUE`, `code text! UNIQUE (<=40)`, `display_name text! (<=200)`, `status text! CHECK IN ('active','suspended')`, `contact_email text?`, `created_by_sub text!`. URL/secret thuộc connection, không ở bảng này.

### `system.partner_connection`

`id`, `created_at`, `updated_at`, `version`; `partner_id uuid!→system.partner.id UNIQUE`, `endpoint_url text!` (URL API remote cho outbound), `outbound_token_url text!` (token endpoint của realm remote), `outbound_client_id text!` (remote cấp cho local), `outbound_secret_ref text!`, `outbound_audience text!`, `inbound_client_id text!` (local Keycloak cấp cho remote), `allowed_inbound_scope text! DEFAULT 'federation:write'`, `status text! CHECK IN ('active','rotating','disabled')`, `last_verified_at timestamptz?`, `rotated_at timestamptz?`. Unique `(inbound_client_id)` trong local realm; outbound client ID có thể lặp giữa các remote realm nên unique phải theo `(partner_id,outbound_client_id)` nếu thêm. Receiver map verified token `client_id=inbound_client_id`→partner; sender dùng `outbound_token_url/client_id/secret_ref` lấy token từ remote. Secret inbound nằm trong Keycloak/secret store, không ở app DB. HTTPS/host allowlist/SSRF validation áp dụng cho **cả hai URL** ở app + test, không CHECK regex DB thay kiểm DNS.

## P06 — `catalog` và `inventory`

### `catalog.product`

`id`, `created_at`, `updated_at`, `version`; `sku text! UNIQUE (<=64)`, `name text! (<=200)`, `description text?`, `base_unit text! CHECK IN ('EA','KG','L')`, `status text! CHECK IN ('active','archived') DEFAULT 'active'`, `created_by_sub text!`. SKU và unit bất biến từ create ở v1; index `(status,name)`.

### `catalog.product_identifier`

`id`, `created_at`; `product_id uuid!→catalog.product.id`, `kind text! CHECK IN ('ean13','internal_barcode')`, `value text! (<=128)`, `is_primary boolean! DEFAULT false`. Unique `(kind,value)`; partial unique `(product_id,kind) WHERE is_primary`; SKU duy nhất ở `product.sku`, không tạo identifier kind=sku thành nguồn chân lý kép. EAN-13 đúng 13 chữ số/check digit ở application + test.

### `catalog.batch`

`id`, `created_at`, `updated_at`, `version`; `product_id uuid!→catalog.product.id`, `local_code text! (<=80)`, `origin_issuer_instance_id text!`, `origin_lot_id text!`, `manufactured_on date?`, `expires_on date?`, `quality_status text! CHECK IN ('available','restricted','inspect') DEFAULT 'inspect'`, `source_partner_id uuid?→system.partner.id`, `created_by_sub text?`, `created_by_client_id text?`; CHECK `((created_by_sub IS NOT NULL) <> (created_by_client_id IS NOT NULL))`. Local batch do user tạo lưu sub; P09 inbound batch chỉ service verified inbox tạo lưu client ID, không dùng sub giả. Unique `(product_id,local_code)`, `(origin_issuer_instance_id,origin_lot_id)`; unique `(id,product_id)` để composite FK từ movement/line; CHECK `(manufactured_on IS NULL OR expires_on IS NULL OR manufactured_on<=expires_on)`. Quality transition qua action/audit; không tự biến partner-asserted thành verified.

### `inventory.warehouse`

`id`, `created_at`, `updated_at`, `version`; `code text! UNIQUE (<=40)`, `name text! (<=160)`, `status text! CHECK IN ('active','archived')`, `created_by_sub text!`. Không archive khi còn balance >0.

### `system.membership_warehouse` (P06 FK muộn)

**Composite PK `(membership_id,warehouse_id)`, không có `id`**. `membership_id uuid!→system.membership.id`, `warehouse_id uuid!→inventory.warehouse.id`, `created_at timestamptz! DEFAULT now()`. Join grant theo warehouse, không lưu array ID không FK. Administrator có quyền toàn instance theo policy, Staff/Approver lấy scope từ join; thu hồi row có hiệu lực lần check kế tiếp. Index `(warehouse_id,membership_id)`.

### `inventory.stock_balance`

**Không có `id`; PK `(warehouse_id,batch_id)`**. `warehouse_id uuid!→inventory.warehouse.id`, `batch_id uuid!`, `product_id uuid!`, `quantity numeric(20,3)! DEFAULT 0 CHECK(quantity>=0)`, `version integer! DEFAULT 1 CHECK(version>0)`, `updated_at timestamptz! DEFAULT now()`; FK `(batch_id,product_id)→catalog.batch(id,product_id)`. Index `(product_id,batch_id)` và `(warehouse_id,product_id)`. Chỉ Inventory port ghi; `INSERT ... ON CONFLICT`/row lock theo thứ tự `(warehouse_id,batch_id)`.

### `inventory.stock_movement`

`id`, `created_at`; `warehouse_id uuid!→inventory.warehouse.id`, `batch_id uuid!`, `product_id uuid!`, `source_line_id uuid!` (FK `trading.document_line.id` thêm P07), `kind text! CHECK IN ('receipt','issue','receiving','stocktake')`, `delta numeric(20,3)! CHECK(delta<>0)`, `balance_after numeric(20,3)! CHECK(balance_after>=0)`, `actor_sub text!`, `correlation_id text!`, `reversal_of uuid?→inventory.stock_movement.id`; FK `(batch_id,product_id)→catalog.batch(id,product_id)`. Unique `(source_line_id,kind)`; index `(batch_id,created_at DESC)`, `(warehouse_id,batch_id,created_at DESC)`. `issue` delta <0, `receipt/receiving` >0, `stocktake` ± qua CHECK. Không UPDATE/DELETE movement ở runtime.

## P07 — `trading` (một header/line chung, subtype rõ)

`goods_receipt`, `goods_issue`, `partner_transfer`, `receiving_confirmation`, `stocktake`, `sale_record` là **giá trị `document_type`**, không phải sáu bảng header trùng lặp. Cấu trúc này chốt lựa chọn bỏ ngỏ ở P07-T02. Business action vẫn là sáu use case/route riêng. Bảng subtype giữ dữ liệu chỉ có ở transfer/receiving/sale.

### `trading.document`

`id`, `created_at`, `updated_at`, `version`; `document_type text! CHECK IN ('goods_receipt','goods_issue','partner_transfer','receiving_confirmation','stocktake','sale_record')`, `issue_purpose text? CHECK IN ('partner_transfer','sale','other')`, `document_number text! (<=64)`, `status text! CHECK IN ('draft','pending_approval','approved','confirmed','cancelled','rejected') DEFAULT 'draft'`, `created_by_sub text!`, `confirmed_by_sub text?`, `confirmed_at timestamptz?`, `cancelled_at timestamptz?`, `note text?`, `correction_of_document_id uuid?→trading.document.id`, `correction_reason text?`, `correlation_id text!`. CHECK `(document_type='goods_issue') = (issue_purpose IS NOT NULL)` và `(correction_of_document_id IS NULL) = (correction_reason IS NULL)` và `(correction_reason IS NULL OR length(trim(correction_reason))>0)`; unique `(document_type,document_number)`; index `(status,created_at DESC)`, `(document_type,created_at DESC)`, `(correction_of_document_id)`. CHECK `(status='confirmed') = (confirmed_at IS NOT NULL AND confirmed_by_sub IS NOT NULL)`; các transition phức tạp ở domain + optimistic version. Correction là chứng từ **mới** với reason, không tự tạo reversal; use case kiểm loại correction hợp lệ và không tham chiếu chính mình. `document_number` server tạo từ prefix type+date+12 ký tự UUID (không cần sequence table), unique collision thì retry UUID mới.

### `trading.document_line`

`id`, `created_at`; `document_id uuid!→trading.document.id`, `line_no integer! CHECK(line_no>0)`, `warehouse_id uuid!→inventory.warehouse.id`, `batch_id uuid!`, `product_id uuid!`, `quantity numeric(20,3)? CHECK(quantity>=0)`, `actual_quantity numeric(20,3)? CHECK(actual_quantity>=0)`, `counted_quantity numeric(20,3)? CHECK(counted_quantity>=0)`, `unit text! CHECK IN ('EA','KG','L')`, `source_issue_line_id uuid?→trading.document_line.id` (transfer/sale copy từ issue local), `source_line_ref uuid?` (receiving giữ `sourceLineId` của transfer remote; **không** FK xuyên instance). FK `(batch_id,product_id)→catalog.batch(id,product_id)`; unique `(document_id,line_no)`, `(id,document_id)`, partial unique `(document_id,source_issue_line_id) WHERE source_issue_line_id IS NOT NULL` và `(document_id,source_line_ref) WHERE source_line_ref IS NOT NULL`; index `(batch_id,document_id)`. `quantity` là lượng gửi với receiving, `actual_quantity` là lượng nhận thực, `counted_quantity` chỉ stocktake. DB deferred constraint trigger P07 chặn confirmed document không có line, thiếu field theo type, unit khác `product.base_unit`, transfer/sale line không khớp issue; receiving bắt từng `source_line_ref`, `0<=actual_quantity<=quantity`. Trigger chạy ở commit để không chặn việc tạo Draft chưa hoàn chỉnh; confirm use case cũng validate sớm.

### `trading.transfer_detail`

`document_id uuid PK→trading.document.id`, `linked_issue_id uuid!→trading.document.id UNIQUE`, `destination_partner_id uuid!→system.partner.id`, `delivery_state text! CHECK IN ('pending','technical_ack','awaiting_receipt','received','partial','disputed') DEFAULT 'pending'`, `technical_ack_at timestamptz?`, `business_receipt_at timestamptz?`. Trigger/use case bảo đảm `document_type='partner_transfer'`, linked issue type `goods_issue` với `issue_purpose='partner_transfer'`, cả hai confirmed trước gửi, line/lot/quantity khớp 1:1. Unique issue chặn double transfer.

### `trading.receiving_detail`

`document_id uuid PK→trading.document.id`, `source_issuer_instance_id text!`, `source_transfer_id text!`, `inbound_message_id uuid?` (P09 thêm FK→`federation.inbox_message.id`), `sent_quantity numeric(20,3)! CHECK(sent_quantity>0)`, `actual_quantity numeric(20,3)? CHECK(actual_quantity>=0)`, `discrepancy_reason text?`; unique `(source_issuer_instance_id,source_transfer_id)`. Khi confirmed: `sent_quantity=SUM(document_line.quantity)` và `actual_quantity=SUM(document_line.actual_quantity)`; từng line map đúng `source_line_ref` của transfer đã xác thực và `catalog.batch` local map cùng origin lot/product/unit, không bỏ sót hay thêm line nguồn. `actual<=sent` ở v1 (over-receipt phải dispute, không cộng tồn tự động), reason bắt buộc nếu khác sent. 0 actual tạo confirmed discrepancy nhưng **không** tạo movement `delta=0`. Tổng và mapping được kiểm ở use case + deferred constraint trigger khi confirm; liên kết inbox/lot nguồn được kiểm ở application vì P07 chưa có bảng federation.

### `trading.sale_detail`

`document_id uuid PK→trading.document.id`, `linked_issue_id uuid!→trading.document.id UNIQUE`, `buyer_ref text?`, `sold_at timestamptz!`; trigger/use case kiểm type sale/issue với `issue_purpose='sale'` và lot/quantity khớp. Không payment, price, tax hoặc PII buyer trong MVP.

Stocktake dùng `document` + `document_line.counted_quantity`; variance = counted − balance snapshot dưới lock khi confirm, lưu `stock_movement.delta` nếu khác 0. Nếu variance=0 vẫn confirm/audit/trace nhưng không tạo zero movement. Receipt nhập nội bộ, issue và receiving theo D14. Confirmed document và lines **không UPDATE/DELETE** ở runtime (trigger + grants); sửa sai qua chứng từ bù mới có `correction_of_document_id`/reason và quy trình duyệt bình thường khi là issue. `stock_movement.reversal_of` chỉ dùng nếu ADR thiết kế exact reversal 1:1; MVP không có generic reversal API hoặc tự hoàn tác transfer xuyên instance.

## P08 — `traceability`

### `traceability.trace_event`

`id`, `created_at`; `issuer_instance_id text!`, `external_event_id text!`, `event_type text!`, `batch_id uuid?→catalog.batch.id`, `document_id uuid?→trading.document.id`, `source_message_id uuid?` (P09 thêm FK inbox), `origin_issuer_instance_id text!`, `origin_lot_id text!`, `occurred_at timestamptz!`, `verification_state text! CHECK IN ('local_verified','partner_asserted','missing')`, `payload_version text!`, `summary jsonb!`, `checksum_hex char(64)!`. Unique `(issuer_instance_id,external_event_id)`; index `(batch_id,occurred_at)`, `(origin_issuer_instance_id,origin_lot_id,occurred_at)`. Không UPDATE/DELETE event; correction event mới tham chiếu cũ trong summary/schema.

### `traceability.trace_link`

`id`, `created_at`; `from_event_id uuid!→traceability.trace_event.id`, `to_event_id uuid?→traceability.trace_event.id`, `missing_ref jsonb?`, `relation text! CHECK IN ('derived_from','transferred_to','received_from','sold_as','corrects')`, `verification_state text! CHECK IN ('local_verified','partner_asserted','missing')`; CHECK `((to_event_id IS NOT NULL) <> (missing_ref IS NOT NULL))`; partial unique `(from_event_id,to_event_id,relation) WHERE to_event_id IS NOT NULL` và `(from_event_id,relation,missing_ref) WHERE to_event_id IS NULL`; index `(to_event_id)`. `missing_ref` là JSON canonical `{issuerInstanceId,eventId}` theo schema, không object tùy ý. App chống cycle/depth; unique index dedupe gap marker.

### `traceability.passport_projection`

`id`, `created_at`, `updated_at`, `version`; `batch_id uuid!→catalog.batch.id UNIQUE`, `public_payload jsonb!`, `source_event_ids uuid[]!`, `policy_version text!`, `built_at timestamptz!`, `state text! CHECK IN ('active','revoked','stale')`, `checksum_hex char(64)!`. Chỉ chứa allowlist public; index `(state,built_at)`.

### `traceability.qr_token`

`id`, `created_at`; `batch_id uuid!→catalog.batch.id`, `token_hash char(64)! UNIQUE`, `state text! CHECK IN ('active','revoked')`, `expires_at timestamptz?`, `revoked_at timestamptz?`, `created_by_sub text!`; index `(batch_id,state)`. URL dùng random token >=128 bit, chỉ hash trong DB; không nhúng batch UUID.

## P09 — `federation`

### `federation.inbox_message`

`id`, `created_at`; `issuer_instance_id text!`, `message_id text!`, `event_id text!`, `event_type text!`, `schema_version text!`, `payload_sha256 char(64)!`, `payload jsonb!`, `partner_id uuid!→system.partner.id`, `state text! CHECK IN ('validated','pending_dependency','applied_to_trace','rejected')`, `received_at timestamptz! DEFAULT now()`, `applied_at timestamptz?`, `error_code text?`. Unique `(issuer_instance_id,message_id)` **và** `(issuer_instance_id,event_id,event_type)` để cùng business event không apply lần hai dưới message ID mới; index `(state,received_at)`, `(event_id)`. Auth token→partner trước insert; replay cùng ID/hash trả ACK cũ, khác hash hoặc event ID cũ với message ID mới trả 409.

### `federation.delivery_attempt`

`id`, `created_at`; `outbox_id uuid!→platform.outbox_message.id`, `attempt_no integer! CHECK(attempt_no>0)`, `endpoint_host text!`, `http_status smallint?`, `result text! CHECK IN ('ack','retry','permanent_failure')`, `error_code text?`, `duration_ms integer? CHECK(duration_ms>=0)`, `ack_message_id text?`, `ack_id text?`, `ack_status text? CHECK IN ('validated','pending_dependency')`; unique `(outbox_id,attempt_no)`, index `(outbox_id,created_at DESC)`. Worker chỉ ghi `result='ack'` khi HTTP 202, ACK message ID đúng, recipient/endpoint đúng và schema ACK hợp lệ; không lưu bearer token/request secret.

### `federation.identity_mapping`

`id`, `created_at`; `origin_issuer_instance_id text!`, `origin_lot_id text!`, `sender_instance_id text!`, `sender_batch_id text!`, `local_batch_id uuid!→catalog.batch.id`, `source_message_id uuid!→federation.inbox_message.id`, `verification_state text! CHECK IN ('partner_asserted','verified')`; unique `(sender_instance_id,sender_batch_id,origin_issuer_instance_id,origin_lot_id)`; index `(local_batch_id)`. Không map theo tên/SKU. Một local batch có thể có nhiều upstream evidence nếu policy cho phép; unique không cấm.

### `federation.partner_ack`

`id`, `created_at`; `inbox_id uuid!→federation.inbox_message.id UNIQUE`, `ack_id text! UNIQUE`, `ack_status text! CHECK IN ('validated','pending_dependency')`, `response_body jsonb!`, `sent_at timestamptz?`. ACK bền vững để replay same hash trả nội dung tương đương; business receipt là event riêng sau Staff confirm.

## P12 — data quality vận hành

### `traceability.quality_issue`

`id`, `created_at`, `updated_at`, `version`; `rule_id text! CHECK IN ('missing_source','out_of_order','conflicting_quantity','unscanned_evidence','unknown_issuer','stale_partner_summary')`, `source_type text! CHECK IN ('lot','event','attachment','partner')`, `source_id text! (<=256)`, `state text! CHECK IN ('open','acknowledged','resolved') DEFAULT 'open'`, `severity text! CHECK IN ('info','warning','critical')`, `source_event_ids uuid[]! DEFAULT '{}'`, `detail jsonb!`, `policy_version text!`, `first_detected_at timestamptz!`, `last_detected_at timestamptz!`, `resolved_at timestamptz?`, `resolved_by_sub text?`. Unique `(rule_id,source_type,source_id)`; index `(state,severity,last_detected_at DESC)`, `(source_type,source_id)`. Projection/quality worker upsert cùng rule+source, tăng version/last_detected_at; resolver chỉ set resolved khi nguồn đã sửa hoặc Admin xác nhận với reason/audit, recurrence mở lại cùng row/version. `detail` chỉ `{schemaVersion,reason,expected?,actual?,remoteRefs?}` đã redacted; không đưa raw partner payload/PII. `source_id` đa loại nên application kiểm source thực, không tạo FK giả; `source_event_ids` là local event IDs, external refs nằm trong `detail.remoteRefs` issuer-qualified. Không xuất bảng này qua Passport public.

## Migration order, FK muộn và truy vấn kiểm chứng

1. P01 thay file rỗng `db/migrations/0001_platform.sql` bằng `0001_platform_core.sql` trong **cùng PR** và thêm runner/checksum; không để cả hai số `0001`. `0001_platform_core.sql`: audit/attachment/core_record; `0002_platform_delivery.sql`: idempotency/outbox/approval_request.
2. `0003_system.sql`, `0004_catalog.sql`, `0005_inventory.sql` (bao gồm `system.membership_warehouse` sau khi warehouse có); lúc này `stock_movement.source_line_id` chưa FK vì `trading.document_line` chưa có. Không tạo movement ngoài test harness trước P07.
3. `0006_trading.sql`: document/line/subtype; add FK `stock_movement.source_line_id→document_line.id`, `approval_request.document_id→document.id`. FK/trigger subtype và required line field phải có test migration.
4. `0007_traceability.sql`; `0008_federation.sql` add FK `receiving_detail.inbound_message_id`, `trace_event.source_message_id` sau khi inbox tồn tại; `0009_quality_operations.sql` ở P12 tạo `traceability.quality_issue`.
5. Mọi migration chạy từ DB trống và DB đã ở version trước; không sửa file migration đã áp dụng. Rollback bằng migration bù hoặc restore backup đã diễn tập. Query `SELECT count(*)` từng bảng, unique/FK/check violation tests, `EXPLAIN` cho balance/trace/outbox hot paths.

**Invariant quan trọng:** document confirm + stock movement/balance + audit + outbox cùng một `PoolClient` transaction. `core_record`/file link sang app sau commit qua outbox/reconciliation, không gọi core API trong transaction M03. Không dùng trigger DB âm thầm ghi balance; chỉ Inventory port thực hiện và test đối chiếu `sum(delta)=balance` theo warehouse+batch.
