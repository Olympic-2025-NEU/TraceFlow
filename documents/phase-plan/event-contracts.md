# Domain event, outbox và federation contract

Trường payload theo từng event và ACK v1 ở [event-payloads-v1.md](./event-payloads-v1.md); BPMN/bridge ở [workflow-spec-v1.md](./workflow-spec-v1.md). Tài liệu này giữ invariant và ví dụ, không thay JSON Schema thực khi implement.

## 1. Ba loại sự kiện không được trộn

| Loại | Ví dụ | Sở hữu/độ tin cậy |
| --- | --- | --- |
| Domain event nội bộ | `trading.issue.confirmed` | Điều đã xảy ra trong một instance; không mặc định công bố |
| Outbox message | Event cần dispatch sang trace/partner sau commit | Bản ghi bền vững trong PG cùng transaction với aggregate |
| Federation envelope | `transfer.announced.v1`, `receipt.confirmed.v1` | Dữ liệu có chính sách chia sẻ, xác thực M2M, version và ACK |

Technical ACK = bên nhận đã ghi/kiểm tra message. Business Receiving Confirmation = nhân viên xác nhận hàng thực tế và có thể thay đổi tồn trong transaction nội bộ. Không dùng một field `received=true` cho cả hai.

## 2. Envelope v1 tối thiểu

```json
{
  "schemaVersion": "1.0",
  "messageId": "11111111-1111-4111-8111-111111111111",
  "eventId": "22222222-2222-4222-8222-222222222222",
  "eventType": "transfer.announced.v1",
  "issuerInstanceId": "A",
  "recipientInstanceId": "B",
  "occurredAt": "2026-11-14T08:00:00Z",
  "publishedAt": "2026-11-14T08:00:01Z",
  "correlationId": "33333333-3333-4333-8333-333333333333",
  "causationId": "44444444-4444-4444-8444-444444444444",
  "sourceDocument": { "type": "partner_transfer", "id": "55555555-5555-4555-8555-555555555555", "version": 2 },
  "lots": [{
    "sourceLineId": "66666666-6666-4666-8666-666666666666",
    "originLot": { "issuerInstanceId": "A", "lotId": "77777777-7777-4777-8777-777777777777" },
    "senderBatch": { "instanceId": "A", "batchId": "77777777-7777-4777-8777-777777777777" },
    "product": { "instanceId": "A", "productId": "88888888-8888-4888-8888-888888888888" },
    "quantity": "12", "unit": "EA"
  }],
  "upstreamReferences": [],
  "evidence": [],
  "sharingPolicyVersion": "v1",
  "linkedIssueId": "99999999-9999-4999-8999-999999999999",
  "sentQuantity": "12"
}
```

Ví dụ A→B dùng UUID synthetic đúng shape `transfer.announced.v1`; script seed phải thay bằng ID thật và lưu manifest. Khi B→C, `issuerInstanceId=B`, `senderBatch` mang ID local B, `originLot` vẫn là nguồn A **theo lời B** và `upstreamReferences` dẫn tới message A→B đã xác minh. C chỉ ghi nguồn A là `partner_asserted` nếu chưa kiểm tra chain/chính sách. D07/D08 chốt định danh, precision và quyền chuyển tiếp bằng test; payload hash dùng JCS theo `event-payloads-v1.md`. Credential nằm ở HTTP/OIDC, không nhúng secret trong JSON.

## 3. Bất biến dispatch/receive

1. Sender chỉ tạo federation message từ nghiệp vụ **đã confirm**. Cùng transaction ghi document, movement **nếu loại chứng từ sở hữu movement theo D14**, audit, outbox. Transfer/sale không ghi movement lần hai. Mất mạng sau commit không rollback document.
2. Worker chọn message đến hạn bằng lease; backoff + jitter, max attempts, dead-letter/manual retry, request ID và metric. Không giữ transaction mở trong lúc HTTP tới partner.
3. Receiver xác thực `issuer` từ token/service account, so với partner_connection và recipient; schema_version/size/policy hợp lệ, clock skew chỉ cảnh báo như `event-payloads-v1.md`. Unique `(issuer_instance_id, message_id)` và `(issuer_instance_id,event_id,event_type)`; payload hash phát hiện ID dùng lại với nội dung khác.
4. Receiver ghi inbox, mapping/gap marker và technical ACK trong transaction. Replay cùng hash trả ACK tương đương, không ghi lại trace hoặc receipt; replay khác hash bị reject và audit.
5. Event đến sai thứ tự giữ `pending_dependency`/gap marker, không bịa lịch sử. Mapping lô đối tác explicit, không gộp chỉ vì trùng tên/SKU.
6. Trace summary đã xác thực lưu cục bộ theo chính sách chia sẻ để C truy xuất được A→B→C khi A tạm offline. Forward impact từ A cần thêm downstream summary C→B→A theo policy hoặc đánh dấu gap; upstream-only propagation không đủ để A biết C. Kết quả hiển thị verified/partner-asserted/missing, không tự khẳng định chứng nhận GS1/EPCIS.
7. Business receipt từ B/C là event mới có `actualQuantity`, `sentQuantity`, `discrepancy` và nguồn document. ACK kỹ thuật của A không đủ để thay đổi tồn B.
8. Theo D14, confirmed GoodsIssue trừ tồn một lần; PartnerTransfer chỉ gửi thông tin từ issue đó. ReceivingConfirmation cộng tồn theo actual một lần; SaleRecord link issue bán hàng đã trừ tồn. Không tạo movement lần hai khi nhận ACK, transfer hoặc sale.

## 4. State machines cần khóa trước code

```text
GoodsIssue: draft -> pending_approval -> approved -> confirmed | rejected | cancelled
Receipt/Transfer/Receiving/Stocktake/Sale: draft -> confirmed | cancelled
Transfer delivery_state: pending -> technical_ack -> awaiting_receipt
                 -> received | partial | disputed
Outbox: pending -> leased -> delivered | retry_due | dead_letter
Inbox: validated -> applied_to_trace | pending_dependency | rejected
Batch quality: available | restricted | inspect (chỉ action hợp lệ)
```

`pending_approval/approved` chỉ áp dụng GoodsIssue v1. Reject/cancel sau submit hủy/cách ly process, không dùng approval cũ để confirm; Draft mới sau reject phải có document ID mới theo `workflow-spec-v1.md`. Flowable không tự xác nhận tồn nếu người dùng chưa thực hiện business `confirm`. Mọi transition có người/nguồn, thời điểm, lý do và test bất hợp lệ.

## 5. Bộ test tối thiểu

- Commit thành công rồi kill worker trước send; sau restart chỉ một effect ở receiver.
- Receiver lưu inbox rồi mất kết nối trước trả ACK; sender retry; không nhân đôi inbox/trace.
- A gửi 12, B nhận thực tế 10: B tăng 10, ghi discrepancy 2, A thấy trạng thái chờ đối chiếu; không tự sửa chứng từ A.
- B offline rồi online: A vẫn làm nghiệp vụ cục bộ, message giữ bền và gửi lại.
- `messageId` cũ + payload khác bị reject; version không hỗ trợ được báo rõ; event đến trước dependency giữ pending.
- Hai message cùng lô từ A/B được nối bằng issuer-qualified IDs, không trộn nguồn và không lộ field cấm trên Passport.
