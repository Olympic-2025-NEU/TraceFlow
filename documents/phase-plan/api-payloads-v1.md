# HTTP contract v1 — trường dữ liệu theo route

Đây là DTO/OpenAPI blueprint để AI triển khai `contracts/openapi/nexora-v1.yaml` và route handlers. Chưa là API đã chạy. Tên bảng/kiểu DB ở `database-schema-v1.md`; trạng thái và quyền ở `security.md`, `workflow-spec-v1.md`. Mọi ID trong JSON là UUID string, timestamp ISO-8601 UTC, lượng là decimal string. Không cho client gửi `actorSub`, `confirmedBy`, `balanceAfter`, `issuerInstanceId` của chính mình hoặc `status='confirmed'` trong create/update.

## Envelope và lỗi chung

Success write: `{data:{id,status,version,...},requestId}`; list: `{data:[...],page:{nextCursor,limit},requestId}`. Validation 400/422 `{code,message,requestId,details:[{field,reason}]}`; 401/403/404/409/429/503 cùng shape nhưng `details` tùy chọn. `Idempotency-Key` bắt buộc cho issue submit, approval decision, mọi confirm, admin federation retry, AI Draft, evidence metadata create và quality issue actions; federation inbound dedupe bằng `(issuer,messageId,payloadHash)`. POST create khác nhận key tùy chọn, UI nên gửi để chống retry. `If-Match: "<version>"` cho update/submit/decision/confirm/cancel. Response `ETag` phiên bản mới. List `limit=20` mặc định/max100, cursor opaque; order ổn định `(created_at DESC,id DESC)`. Không nhận sort/raw SQL tự do. **Ngoại lệ protocol:** federation inbound trả ACK body chính xác theo `event-payloads-v1.md` để sender xác thực; health/live cũng trả body gọn. Các object trong bảng dưới đây là nội dung `data`, trừ ngoại lệ đó.

## Core và M01

| Method/path | Request fields bắt buộc / tùy chọn | Response `data`/quyền và kiểm thử |
| --- | --- | --- |
| `GET /api/v1/me` | Không body | `{sub,displayName,role,status,warehouseIds}` từ token+membership; user authenticated |
| `GET /api/v1/health/live`, `/ready` | Không body | `{status,service,version}`; ready nội bộ có dependency summary an toàn, không secret |
| `POST /api/v1/core/records` | `{kind,sourceType?,sourceId?,payload,visibility,policyVersion}` theo `core-record-payloads-v1.md`; user evidence_metadata không gửi source key, server cấp `sourceType='evidence'`/UUID; service kinds phải gửi source key đúng quy tắc | `{id,version,checksum,builtAt}`; service-only cho trace/OT/archive, user chỉ evidence_metadata thuộc resource được cấp; duplicate same hash idempotent, khác hash 409 nếu không phải update `If-Match`; không ghi arbitrary SQL |
| `GET /api/v1/core/records/{id}` | Không body | Record sau policy; 404 cho resource không thuộc scope |
| `POST /api/v1/files` | multipart `{file,ownerType?,ownerId?,visibility?}`; MIME/size allowlist | 202 `{id,scanState:'pending'}`; private cho tới clean, không URL public |
| `GET /api/v1/files/{id}` | Không body | metadata `{id,mimeType,sizeBytes,scanState,visibility,checksum}` hoặc 302/stream chỉ khi clean và authorized |
| `GET /api/v1/organization` | Không body | `{id,instanceId,code,name,timezone,status}`; user authenticated |
| `PATCH /api/v1/organization` | `{name?,contactEmail?,timezone?}`, `If-Match` | `{id,version,...}`; Administrator; `instanceId/code` bất biến |
| `GET /api/v1/members` | `?cursor&limit&status&role` | `{id,keycloakSub,displayName,role,status}`; Administrator |
| `POST /api/v1/members` | `{keycloakSub,displayName,email?,role,warehouseIds?}` | 201 member; Admin; verify sub tồn tại/được invite theo D04, không password; P05 chưa có join P06 nên nonempty `warehouseIds` bị 422 cho tới P06 |
| `PATCH /api/v1/members/{id}` | `{role?,status?,warehouseIds?}`, `If-Match` | Member mới; Admin; không disable Admin active cuối cùng; P06 ghi `warehouseIds` vào `membership_warehouse` trong transaction |
| `GET /api/v1/partners` | `?cursor&limit&status` | Danh bạ với connection status, không secret; user authenticated |
| `POST /api/v1/partners` | `{issuerInstanceId,code,displayName,contactEmail?}` | 201 partner; Admin; issuer unique |
| `PATCH /api/v1/partners/{id}` | `{displayName?,status?,contactEmail?}`, `If-Match` | Partner mới; Admin; suspend chặn outbound mới |
| `PUT /api/v1/partners/{id}/connection` | `{endpointUrl,outboundTokenUrl,outboundClientId,outboundSecretRef,outboundAudience,inboundClientId,allowedInboundScope}` | `{partnerId,endpointHost,status,rotatedAt}`; Admin; **không** trả `outboundSecretRef`; SSRF/HTTPS validation cho cả URL; inboundClientId phải tồn tại ở local Keycloak |

## M02 catalog/inventory

| Method/path | Request fields | Response/rule |
| --- | --- | --- |
| `POST /api/v1/products` | `{sku,name,description?,baseUnit}` | 201 `{id,sku,name,baseUnit,status,version}`; SKU unique, Admin/Staff theo policy |
| `PATCH /api/v1/products/{id}` | `{name?,description?,status?}`, `If-Match` | SKU/baseUnit bất biến từ create v1; archive có history, không delete |
| `GET /api/v1/products`, `GET /api/v1/products/{id}` | `?q&status&cursor&limit` | SKU/barcode/name search, no private partner info |
| `POST /api/v1/products/{id}/identifiers` | `{kind:'ean13'|'internal_barcode',value,isPrimary?}` | 201 identifier; unique `(kind,value)`, EAN-13 đúng 13 số/check digit; SKU ở product |
| `POST /api/v1/batches` | `{productId,localCode,manufacturedOn?,expiresOn?}` | 201 batch `qualityStatus='inspect'`; user route chỉ tạo lot local, server gán `originIssuerInstanceId=INSTANCE_ID`, `originLotId` bất biến và duy nhất (UUID batch hoặc ID được cấp từ server). Batch đối tác chỉ được tạo từ verified inbox qua P09 service, không nhận issuer/sourcePartnerId do user khai |
| `POST /api/v1/batches/{id}/quality-actions` | `{action:'mark_available'|'restrict'|'inspect',reason}`, `If-Match` | Actor có quyền, audit; `restricted/inspect` không xuất |
| `GET /api/v1/batches`, `GET /api/v1/batches/{id}` | `?productId&issuer&expiresBefore&status&cursor&limit` | `{id,productId,localCode,originLot,qualityStatus,...}`; resource scope |
| `POST /api/v1/warehouses` | `{code,name}` | 201 warehouse; Admin/Staff được cấp quyền |
| `GET /api/v1/warehouses` | `?status&cursor&limit` | List có quyền |
| `GET /api/v1/inventory/balances` | `?warehouseId&productId&batchId&cursor&limit` | `{warehouseId,productId,batchId,quantity,unit,updatedAt}`; không có write route cho balance |
| `GET /api/v1/inventory/movements` | `?warehouseId&batchId&cursor&limit` | `{id,kind,delta,balanceAfter,sourceDocumentId,createdAt}`; stable pagination |

## M03 chứng từ — DTO dùng chung và route cụ thể

`DocumentLineInput={warehouseId,productId,batchId,quantity?:decimalString,actualQuantity?:decimalString,countedQuantity?:decimalString,unit}`. Create trả `{id,documentType,documentNumber,status:'draft',version,lines:[{id,...}]}`. Update Draft nhận `{lines?,note?}` + `If-Match`; không PATCH `status`. Use case kiểm field theo type, product↔batch, unit, warehouse, quality và quyền. `documentNumber` do server cấp từ prefix type+date+UUID rút gọn (unique constraint, retry collision), không lấy từ client. Mọi confirm trả `data:{id,status:'confirmed',version,confirmedAt,movementIds}` và `requestId` ở envelope ngoài; transfer/sale có `movementIds:[]`.

| Route | Create Draft body | Action và kết quả đặc thù |
| --- | --- | --- |
| `POST/GET /api/v1/receipts`, `GET/PATCH /api/v1/receipts/{id}`, `POST .../{id}/confirm|cancel` | `{lines:[{warehouseId,productId,batchId,quantity,unit}],note?,correctionOfDocumentId?,correctionReason?}` | Confirm `+quantity` mỗi line, movement `receipt`, audit/outbox trong một transaction; correction link chỉ khi lý do và loại chứng từ hợp lệ |
| `POST/GET /api/v1/issues`, `GET/PATCH /api/v1/issues/{id}`, `POST .../{id}/submit|confirm|cancel` | `{purpose:'partner_transfer'|'sale'|'other',lines:[{warehouseId,productId,batchId,quantity,unit}],note?,correctionOfDocumentId?,correctionReason?}` | Submit Flowable `goods-issue-approval`; confirm sau approved, `−quantity`, balance đủ; creator không tự approve; transfer/sale chỉ link issue đúng purpose |
| `POST/GET /api/v1/transfers`, `GET /api/v1/transfers/{id}`, `POST .../{id}/confirm|cancel` | `{linkedIssueId,destinationPartnerId,note?}` | Server copy lines từ issue; exact 1:1, một issue chỉ một transfer; confirm tạo outbox `transfer.announced.v1`, **không** movement |
| `POST/GET /api/v1/receivings`, `GET/PATCH /api/v1/receivings/{id}`, `POST .../{id}/confirm|cancel` | `{inboundMessageId,actualLines:[{sourceLineId,localBatchId,warehouseId,actualQuantity,unit}],discrepancyReason?}` | `inboundMessageId` trỏ verified inbox; server lấy issuer/transfer/sent quantity và `sourceLineId` từ message, không tin client tự khai. Lưu `document_line.source_line_ref`, `quantity=sent`, `actual_quantity=actual` cho **mọi** source line, kể cả actual 0. Confirm cộng actual (0 không movement); <=sent từng line/tổng; reason nếu khác; ACK kỹ thuật không gọi route này. P07 test trước P09 dùng trusted seeded source fixture qua service nội bộ, không mở manual public route |
| `POST/GET /api/v1/stocktakes`, `GET/PATCH /api/v1/stocktakes/{id}`, `POST .../{id}/confirm|cancel` | `{lines:[{warehouseId,productId,batchId,countedQuantity,unit}],note,correctionOfDocumentId?,correctionReason?}` | Confirm lock balance, delta=count−current; delta0 không movement; reason/audit |
| `POST/GET /api/v1/sales-records`, `GET /api/v1/sales-records/{id}`, `POST .../{id}/confirm|cancel` | `{linkedIssueId,buyerRef?,soldAt?}` | Server copy issue lines; confirm trace event, **không** movement/giá/thanh toán |
| `GET /api/v1/documents` | `?type&status&batchId&partnerId&from&to&cursor&limit` | Union read model từ `trading.document`, includes movement/approval/delivery refs theo quyền |

Approval API: `GET /api/v1/approvals/tasks?cursor&limit` trả `{approvalRequestId,approvalVersion,documentId,taskId,creatorSub,submittedAt,state}` theo Approver role/scope; `POST /api/v1/approvals/{approvalRequestId}/decision` body `{decision:'approved'|'rejected',reason?}`, `If-Match` của **approvalVersion** + `Idempotency-Key`, reject bắt reason. Các action document dùng `If-Match` của `document.version`. Server kiểm `approverSub!=creatorSub`/version/scope rồi ghi decision intent + outbox trong PG transaction, trả `202 {approvalRequestId,state:'decision_pending'}`; worker gọi Flowable, poller đối soát. UI không gọi Flowable REST trực tiếp.

Confirm/cancel cần `If-Match`; confirm cần `Idempotency-Key`. 409 cho stale version, already confirmed với key khác, insufficient stock, duplicate linked issue. 422 cho batch restricted/expired, unit mismatch, actual>sent, missing discrepancy reason. Submit/decision trả trạng thái pending qua outbox khi Flowable down; chỉ task list/engine dependent read có thể 503, không tự approve. Receiving từ message có `sourceIssuerInstanceId/sourceTransferId` chỉ được server verify qua inbox; không tin body tự khai. P07 fixture nguồn tin cậy là internal test path, không manual public receiving.

## M04 trace, public và federation

| Method/path | Request | Response/rule |
| --- | --- | --- |
| `GET /api/v1/lots/{id}/history` | `?cursor&limit` | `{lot,events:[{eventId,type,issuer,occurredAt,sourceDocumentId,verificationState,gap}],nextCursor}` |
| `GET /api/v1/lots/{id}/trace/backward|forward` | `?depth` max10, `cursor`, `limit` | `{nodes:[{issuer,lotId,eventId,state}],edges:[{from,to,relation}],gaps,asOf}`; visited set/cycle limit |
| `POST /api/v1/lots/{id}/qr` | `{policyVersion}`, `Idempotency-Key` | 201 `{qrUrl,tokenId}`; token raw trả một lần hoặc QR image; không lộ private UUID trong URL |
| `POST /api/v1/lots/{id}/qr/{tokenId}/revoke` | `{reason}` | 204, audit; cache public invalidate |
| `GET /api/v1/public/passport/{token}` | Không auth/body | `{productName,publicLotCode,originIssuer,timeline,verificationState,gaps,asOf}` theo allowlist; 404 cho token revoked/unknown |
| `POST /api/v1/federation/events` | Envelope JSON `event-payloads-v1.md`, M2M bearer | 202 raw ACK `{messageId,ackId,acceptedAt,status:'validated'|'pending_dependency'}`; same hash replay cùng ACK, different hash hoặc same event/new message ID 409; **không** đổi stock |
| `GET /api/v1/federation/deliveries` | `?status&partnerId&cursor&limit` | Admin `{messageId,status,attemptCount,nextAttemptAt,lastErrorCode}` không token |
| `POST /api/v1/federation/deliveries/{id}/retry` | `{reason}`, Admin + idempotency | 202 `{id,status:'retry_due'}`; audit; không chỉnh payload |

Passport không trả member email, giá, stock private, credential, file chưa clean, raw partner payload hay unrestricted buyer. Source summary C được phép dùng chỉ khi A/B sharing policy cho phép, `partner_asserted` không đổi thành `verified` chỉ do forward.

## AI01

| Method/path | Request | Response/rule |
| --- | --- | --- |
| `POST /api/v1/ai/chat` | `{message,conversationId?,lotRef?}` | `{answer,sources:[{type,id,verificationState,asOf}],toolCallIds,needsClarification}`; user identity từ session; quota/timeout |
| `POST /api/v1/ai/drafts` | `{documentType:'goods_receipt'|'goods_issue',instruction,purpose?:'partner_transfer'|'sale'|'other',proposedFields?}`, idempotency | `{draftDocumentId,status:'draft',proposedFields,sources,warnings}`; nếu goods_issue thiếu purpose thì gán `other` rõ trong Draft/response, user phải kiểm lại trước submit; AI không có confirm/approve tool |
| `GET /api/v1/ai/tool-calls/{id}` | Không body | Lấy từ `platform.audit_log.id` action `ai.tool.*`, redacted tool name/actor/source IDs/outcome; Admin/actor theo policy, không cần bảng AI audit riêng |

AI service chỉ gọi allowlist `getLot`, `getStock`, `getTrace`, `createReceiptDraft`, `createIssueDraft` qua backend với delegated actor; không SQL, không service token Admin cho user thường. `services/ai/` không tự lưu nghiệp vụ.

## Vận hành dữ liệu P12

`GET /api/v1/quality/issues?state&severity&ruleId&cursor&limit` chỉ Admin trả `{id,ruleId,sourceType,sourceId,state,severity,firstDetectedAt,lastDetectedAt,version}`; detail thêm `sourceEventIds`/redacted `detail`, không public. `POST /api/v1/quality/issues/{id}/acknowledge|resolve` nhận `{reason}` + `If-Match` + `Idempotency-Key`, trả state/version; resolve cần đối chiếu nguồn đã sửa hoặc Admin ghi quyết định/rủi ro tồn đọng, audit cả hai. Worker tự mở lại issue khi recurrence, không để người dùng sửa `ruleId/sourceId/detail` bằng PATCH.

## Contract tests bắt buộc

Mỗi route có fixture valid/invalid, 401/403 và role/scope; mỗi write có 409 version/idempotency; public có snapshot privacy; M2M có wrong issuer/audience/replay; confirm có rollback + concurrency. Sinh OpenAPI từ spec này hoặc thêm schema trực tiếp trong `contracts/openapi/nexora-v1.yaml`; CI diff generated routes với spec, không để bảng Markdown là contract duy nhất khi code đã tồn tại.
