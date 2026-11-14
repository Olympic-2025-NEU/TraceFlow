# Event và federation payload v1

`event-contracts.md` giữ nguyên lý; file này cố định trường để tạo `contracts/events/*.schema.json` và consumer tests. JSON decimal là string, UUID string, timestamp UTC. `schemaVersion='1.0'` của envelope độc lập version từng event. Mọi message phát từ document confirmed/outbox, không phát từ Draft. Receiver xác thực bearer M2M và partner mapping **trước** khi tin `issuerInstanceId` trong JSON.

## 1. Envelope bắt buộc

`{schemaVersion,messageId,eventId,eventType,issuerInstanceId,recipientInstanceId,occurredAt,publishedAt,correlationId,causationId,sourceDocument,lots,upstreamReferences,evidence,sharingPolicyVersion}`. `recipientInstanceId` là ID B/C được receiver so với cấu hình local, **không** phải UUID partner chỉ có nghĩa trong DB của sender. `sourceDocument={type,id,version}`, `lots[]` mỗi phần tử `{sourceLineId,originLot:{issuerInstanceId,lotId},senderBatch:{instanceId,batchId},product:{instanceId,productId},quantity,unit}`. `sourceLineId` là UUID `trading.document_line.id` của **chứng từ đang phát event**, giữ để receiver map từng line; không nhầm với line issue nguồn. `upstreamReferences[]` là `{issuerInstanceId,messageId,eventId}`. `evidence[]` chỉ `{id,checksum,visibility:'partner'|'public'}`, không chứa URL private. `messageId` bền vững qua retry; `eventId` bền vững cho sự kiện nghiệp vụ; `publishedAt` có thể khác `occurredAt`.

Validation: UUID/length/date format, supported version/type, recipient đúng receiver, allowed partner scope, mỗi `lots[]` quantity `>0`, unit hợp lệ, total envelope <=256 KiB v1, tối đa 100 lots/evidence refs, clock skew >5 phút chỉ cảnh báo/điều tra (không reject sự kiện lịch sử chỉ vì chậm). `transfer.announced` và `downstream.impact` phải có ít nhất một lot; `receipt.confirmed` được có `lots=[]` **chỉ** khi toàn bộ actual bằng 0; positive lots của receipt mang lượng **actual** và local batch B/C. Reject duplicate JSON keys trước parse. Tính payload SHA-256 trên UTF-8 [RFC 8785 JCS](https://www.rfc-editor.org/rfc/rfc8785.html) của toàn envelope, mọi decimal là string; sender lưu cùng envelope/messageId cho mọi retry, receiver chạy cùng test vector Node/Python. Không để non-finite numbers. Unknown field bị reject ở v1 để tránh âm thầm bỏ nguồn.

## 2. Domain event nội bộ (outbox cùng transaction)

| `event_type` | Payload bắt buộc | Handler/owner |
| --- | --- | --- |
| `trading.receipt.confirmed.v1` | `{eventId,documentId,documentVersion,lines:[{lineId,batchId,warehouseId,quantity,unit}],actorSub,occurredAt}` | Trace projector; không federation nếu nhập nội bộ |
| `trading.issue.confirmed.v1` | Như receipt + `movementIds` | Trace projector; stock đã trừ trước event |
| `trading.transfer.confirmed.v1` | `{eventId,transferId,linkedIssueId,destinationPartnerId,lines,occurredAt}` | Federation outbound + trace; **không** movement mới |
| `trading.receiving.confirmed.v1` | `{eventId,receivingId,sourceIssuerInstanceId,sourceTransferId,sentLines,actualLines,discrepancyReason?,occurredAt}` | Trace + gửi business receipt về sender; actual đã cộng stock |
| `trading.sale.recorded.v1` | `{eventId,saleId,linkedIssueId,lines,occurredAt}` | Trace + downstream impact theo policy; **không** movement mới |
| `workflow.approval.requested.v1` | `{approvalRequestId,documentId,creatorSub,processKey,correlationKey,submittedDocumentVersion,lineSnapshotSha256}` | Flowable bridge; không gửi partner |
| `workflow.approval.decision_requested.v1` | `{approvalRequestId,documentId,taskId,decision,decisionReason?,requestedBySub,requestedAt,lineSnapshotSha256}` | Flowable decision worker; không gửi partner, không tự confirm |

`lines` chứa decimal string + unit + issuer-qualified lot reference hoặc resolver được kiểm thử; không đưa full record/secret vào outbox nếu không cần. Cùng `(aggregate,version,event_type,destination)` chỉ một row. Consumer biết version hỗ trợ, không gọi handler v1 cho payload v2 chưa có adapter.

## 3. Federation event types

| Type | `sourceDocument.type` | Payload thêm ngoài envelope | Receiver effect |
| --- | --- | --- | --- |
| `transfer.announced.v1` | `partner_transfer` | `linkedIssueId`, `sentQuantity` bằng tổng lots; từng lot có transfer `sourceLineId` riêng | Inbox+pending receiving; stock giữ nguyên |
| `receipt.confirmed.v1` | `receiving_confirmation` | `sourceTransfer:{issuerInstanceId,id}`, `actualLines:[{sourceLineId,receiverBatchId,sentQuantity,actualQuantity,unit}]`, `sentQuantity`, `actualQuantity`, `discrepancyQuantity`, `discrepancyReason?`; `sourceLineId` trong `actualLines` trỏ **transfer line remote**, còn `lots[].sourceLineId` là **receiving line local** | Sender cập nhật delivery state/trace theo từng source line; không sửa issue/stock |
| `downstream.impact.v1` | `partner_transfer` hoặc `sale_record` | `originLot`, `downstreamPartnerRef` = downstream `issuerInstanceId` (không phải partner UUID local), `impactType`, `sourceEventRefs:[{issuerInstanceId,eventId}]`, `disclosureScope` | Partner upstream bổ sung forward trace nếu policy cho phép; B relay C→A dùng source document B own và sourceEventRefs chỉ phần C cho phép, không tạo public buyer PII |

`sentQuantity=Σ actualLines.sentQuantity`, `actualQuantity=Σ actualLines.actualQuantity=Σ lots.quantity`; mỗi source transfer line xuất hiện đúng một lần trong `actualLines`, kể cả actual 0; per-line `0<=actual<=sent` và unit/product/origin khớp transfer. `discrepancyQuantity = sentQuantity - actualQuantity`; v1 over-receipt chuyển dispute/không cộng vượt. `receipt.confirmed` là **business event** sau human confirm, không phải HTTP technical ACK. C→B→A downstream summary phải giữ source chain và policy từng chặng; thiếu quyền share → gap, không relay raw payload A.

## 4. Technical ACK và lỗi

`POST /api/v1/federation/events` trả `202 {messageId,ackId,acceptedAt,status:'validated'|'pending_dependency'}` sau commit inbox+ack. Replay cùng `(issuer,messageId,payloadHash)` trả lại **body ACK đã lưu**; khác hash `409 MESSAGE_ID_REUSED`. Cùng `(issuer,eventId,eventType)` dưới message ID mới → `409 EVENT_ID_REUSED`, không apply lại. `401/403` sai token/scope/issuer; `422 UNSUPPORTED_SCHEMA`/invalid payload; `413 PAYLOAD_TOO_LARGE`; `503` DB unavailable. Sender chỉ mark delivered khi ACK `messageId` và receiver đúng, lưu attempt. Mất response → retry same message ID/hash.

## 5. Ordering, provenance, compatibility

- A→B transfer có `originLot=(A,A-L1)`, `senderBatch=(A,A-B1)`, `upstreamReferences=[]`. B→C có `issuerInstanceId=B`, `originLot=(A,A-L1)`, `senderBatch=(B,B-B1)`, `upstreamReferences=[A→B message]`. C ghi lời B về A là `partner_asserted` cho tới khi xác minh chain/permission.
- `pending_dependency` khi upstream event chưa tới; inbox vẫn ACK kỹ thuật và reprocess idempotent. `trace_link` giữ gap, không sáng tạo history. Wrong parent/cycle/lot mapping chuyển rejected/dispute có audit.
- Cần consumer-driven test: A v1→B v1, B v1→C v1, duplicate, unknown version, missing evidence, invalid scope, A offline, B offline, actual 10/12. Khi thêm v2, chạy song song readers v1/v2 hoặc migration; không thay nghĩa field v1.
- Contract JSON Schema dùng `additionalProperties:false`, `minLength`, `format`, decimal regex `^(0|[1-9][0-9]*)(\.[0-9]{1,3})?$` + domain check `>0` riêng cho trường cần dương; `actualQuantity` cho phép 0. JCS/test vector cố định trong `contracts/events/fixtures/` để Node/Python cùng tính hash.
