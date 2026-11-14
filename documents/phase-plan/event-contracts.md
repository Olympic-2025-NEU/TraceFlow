# Domain event, outbox và federation contract

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
  "messageId": "opaque-uuid",
  "eventId": "opaque-uuid",
  "eventType": "transfer.announced",
  "issuerInstanceId": "A",
  "recipientPartnerId": "partner-B",
  "occurredAt": "2026-11-14T08:00:00Z",
  "publishedAt": "2026-11-14T08:00:01Z",
  "correlationId": "transfer-id",
  "causationId": "issue-confirm-id",
  "sourceDocument": { "type": "partner-transfer", "id": "opaque-id", "version": 1 },
  "lots": [{
    "originLot": { "issuerInstanceId": "A", "lotId": "A-lot-1" },
    "senderBatch": { "instanceId": "A", "batchId": "A-batch-1" },
    "product": { "instanceId": "A", "productId": "A-product-1" },
    "quantity": "12.000", "unit": "EA"
  }],
  "upstreamReferences": [],
  "evidence": [{ "id": "public-or-partner-evidence-id", "checksum": "sha256:..." }],
  "sharingPolicyVersion": "v1"
}
```

Ví dụ A→B chỉ định hình contract, không phải payload được phép gửi nguyên xi. Khi B→C, `issuerInstanceId=B`, `senderBatch` mang ID local B, `originLot` vẫn là `(A, A-lot-1)` **theo lời B** và `upstreamReferences` dẫn tới message A→B đã xác minh. C chỉ ghi nguồn A là `partner-asserted` nếu chưa có bằng chứng chính sách cho phép/chưa kiểm tra chuỗi. D07/D08 phải chốt định danh, đơn vị, precision, quyền chuyển tiếp, policy và ký/canonicalization nếu dùng chữ ký. Credential nằm ở HTTP/OIDC, không nhúng secret trong JSON. Số lượng dạng decimal string ở biên để tránh sai khác float.

## 3. Bất biến dispatch/receive

1. Sender chỉ tạo federation message từ nghiệp vụ **đã confirm**. Cùng transaction ghi document, inventory movement, audit, outbox. Mất mạng sau commit không rollback document.
2. Worker chọn message đến hạn bằng lease; backoff + jitter, max attempts, dead-letter/manual retry, request ID và metric. Không giữ transaction mở trong lúc HTTP tới partner.
3. Receiver xác thực `issuer` từ token/service account, so với partner_connection và recipient; schema_version/size/clock skew/policy hợp lệ. Unique `(issuer_instance_id, message_id)`; payload hash phát hiện ID dùng lại với nội dung khác.
4. Receiver ghi inbox, mapping/gap marker và technical ACK trong transaction. Replay cùng hash trả ACK tương đương, không ghi lại trace hoặc receipt; replay khác hash bị reject và audit.
5. Event đến sai thứ tự giữ `pending_dependency`/gap marker, không bịa lịch sử. Mapping lô đối tác explicit, không gộp chỉ vì trùng tên/SKU.
6. Trace summary đã xác thực lưu cục bộ theo chính sách chia sẻ để C truy xuất được A→B→C khi A tạm offline. Forward impact từ A cần thêm downstream summary C→B→A theo policy hoặc đánh dấu gap; upstream-only propagation không đủ để A biết C. Kết quả hiển thị verified/partner-asserted/missing, không tự khẳng định chứng nhận GS1/EPCIS.
7. Business receipt từ B/C là event mới có `actualQuantity`, `sentQuantity`, `discrepancy` và nguồn document. ACK kỹ thuật của A không đủ để thay đổi tồn B.
8. Theo D14, confirmed GoodsIssue trừ tồn một lần; PartnerTransfer chỉ gửi thông tin từ issue đó. ReceivingConfirmation cộng tồn theo actual một lần; SaleRecord link issue bán hàng đã trừ tồn. Không tạo movement lần hai khi nhận ACK, transfer hoặc sale.

## 4. State machines cần khóa trước code

```text
M03 document: Draft -> PendingApproval? -> Approved? -> Confirmed | Cancelled
Partner transfer: Confirmed -> AwaitingTechnicalAck -> AwaitingBusinessReceipt
                 -> Received | PartiallyReceived | Disputed
Outbox: pending -> leased -> delivered | retry_due | dead_letter
Inbox: received -> validated -> applied_to_trace | pending_dependency | rejected
Batch quality: available | restricted | inspect (chỉ action hợp lệ)
```

`PendingApproval/Approved` chỉ áp dụng cho loại phiếu chọn ở D06. Không cho Flowable tự xác nhận tồn nếu người dùng chưa thực hiện action business `confirm`. Mọi trạng thái có người/nguồn, thời điểm, lý do và test transition bất hợp lệ.

## 5. Bộ test tối thiểu

- Commit thành công rồi kill worker trước send; sau restart chỉ một effect ở receiver.
- Receiver lưu inbox rồi mất kết nối trước trả ACK; sender retry; không nhân đôi inbox/trace.
- A gửi 12, B nhận thực tế 10: B tăng 10, ghi discrepancy 2, A thấy trạng thái chờ đối chiếu; không tự sửa chứng từ A.
- B offline rồi online: A vẫn làm nghiệp vụ cục bộ, message giữ bền và gửi lại.
- `messageId` cũ + payload khác bị reject; version không hỗ trợ được báo rõ; event đến trước dependency giữ pending.
- Hai message cùng lô từ A/B được nối bằng issuer-qualified IDs, không trộn nguồn và không lộ field cấm trên Passport.
