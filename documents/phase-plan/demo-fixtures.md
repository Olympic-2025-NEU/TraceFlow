# Fixture và kịch bản kiểm chứng A → B → C

Đây là **dữ liệu đích cho test/demo**, chưa được seed trong repo. ID bên dưới là nhãn logic, script thực phải ghi ID UUID do hệ thống cấp vào manifest test. Mọi số lượng dùng unit `EA` và decimal string; precision chính thức theo D07. Fixture synthetic, không có người/secret thật.

## 1. Ba instance và định danh lô

| Instance | Vai trò | DB/credential | Local product/batch | Lot gốc được nhận diện |
| --- | --- | --- | --- | --- |
| A | Nhà cung cấp | `app_A`, account/volume A | `A-P1`, `A-B1` | `(A, A-L1)` |
| B | Phân phối | `app_B`, account/volume B | `B-P1`, `B-B1` | `(A, A-L1)` từ message A; B lưu mapping riêng |
| C | Bán lẻ | `app_C`, account/volume C | `C-P1`, `C-B1` | `(A, A-L1)` theo chain A→B→C; C lưu mapping riêng |

B gửi message B→C với `issuerInstanceId=B`, `senderBatch=(B,B-B1)`, `originLot=(A,A-L1)` và `upstreamReferences` dẫn tới message A→B. C không tin B là A; phân biệt nguồn event B đã xác thực với khẳng định về nguồn lô A. A/B/C không dùng chung bảng, schema hay DB connection.

## 2. Luồng số lượng chuẩn

| Bước | Action và owner movement | A balance | B balance | C balance | Event/điều kiện |
| --- | --- | ---: | ---: | ---: | --- |
| 0 | Seed product/batch/warehouse, không seed balance bằng SQL | 0 | 0 | 0 | Ba DB độc lập |
| 1 | A confirm GoodsReceipt 20, `+20` | 20 | 0 | 0 | Một movement, audit, outbox |
| 2 | A submit GoodsIssue 12 → Flowable Approver khác creator duyệt → confirm `−12` | 8 | 0 | 0 | Rejected/unfinished không đổi stock |
| 3 | A confirm PartnerTransfer 12 gắn đúng issue bước 2 | 8 | 0 | 0 | Một federation outbox; **không trừ lần hai** |
| 4 | B nhận message và trả technical ACK | 8 | 0 | 0 | Inbox/ACK, chưa nhận hàng thực tế |
| 5 | B confirm ReceivingConfirmation actual 10, `+10` | 8 | 10 | 0 | Discrepancy `sent 12 − actual 10 = 2`; không GoodsReceipt thứ hai |
| 6 | B confirm GoodsIssue 6, `−6`; confirm PartnerTransfer 6 gắn issue | 8 | 4 | 0 | Một movement giảm, một outbox; origin lot A được giữ |
| 7 | C nhận message + technical ACK, confirm ReceivingConfirmation actual 6 `+6` | 8 | 4 | 6 | C lưu upstream summary A/B theo policy |
| 8 | C confirm GoodsIssue bán 2 `−2`, SaleRecord link issue | 8 | 4 | 4 | SaleRecord **không trừ lần hai** |

Tổng tồn hiện biết cuối luồng là `8+4+4=16`, giảm 2 tại discrepancy giao hàng A→B và 2 đã bán so với 20 ban đầu. Không coi discrepancy 2 là hàng đã vào B; A đã xuất 12, chỉ B xác nhận 10. Đây là kịch bản kiểm tra, không phải định nghĩa kế toán hay xử lý mất mát hàng hóa.

## 3. Assertions tại mỗi ranh giới

1. Trước mọi `confirm`, Draft/approval pending chỉ thay document/process state, không có movement, balance hoặc trace confirmed mới.
2. Mỗi movement có source document/line duy nhất. Retry same idempotency key/payload trả cùng kết quả; same key/different payload conflict. Confirm lặp bằng key khác không tạo effect.
3. Sau bước 3 khi B tắt: A vẫn có balance 8, outbox pending/retry; khởi động B lại chỉ một inbox/ACK và một pending receiving. Mất ACK rồi retry cũng vậy.
4. Sau bước 4, B balance vẫn 0. Sau bước 5, B chỉ +10. A thấy discrepancy qua message ngược; phiếu xuất A không bị sửa ngầm.
5. Sau bước 7, C backward trace có A→B→C với event issuer và source ID từng chặng. Khi A offline, C vẫn xem summary đã phép chia sẻ và status `partner-asserted/stale` phù hợp; gap hiển thị nếu thiếu nguồn.
6. Forward trace từ A chỉ liệt kê C nếu downstream summary C→B→A đã nhận và policy cho phép; nếu chưa, hiển thị `unknown downstream` từ B, không gọi danh sách là đầy đủ.
7. QR chỉ thấy projection allowlist; không có balance nội bộ, discrepancy note private, member email, credential hoặc file chưa scan. Revoke QR làm URL cũ vô hiệu.
8. AI user có quyền trả balance/trace đúng với API và source IDs; AI Draft không đổi các balance ở bảng trên. Người dùng confirm Draft theo M03 mới đổi số lượng.

## 4. Biến thể lỗi bắt buộc

| Biến thể | Kết quả kỳ vọng |
| --- | --- |
| A issue 12 đồng thời với một issue khác khiến tổng >20 | Một confirm fail 409, balance không âm, không outbox của lệnh fail |
| B báo actual 10 rồi nhấn confirm hai lần | Một movement +10 và một receipt event |
| B nhận lại `messageId` A cũ cùng hash | Cùng technical ACK; không có pending receiving thứ hai |
| B nhận `messageId` A cũ khác hash | 409/audit; không đổi lot/stock |
| C nhận message B→C trước upstream reference | Pending dependency/gap, không bịa A history; reprocess khi upstream tới |
| Partner B bị suspend trước dispatch | Không gửi token/không mark delivered; queue có alert, operator xử lý theo quyền |
| Flowable/scan/AI service down | Approval chờ; file fail closed; AI có fallback; không có stock confirm trái rule |
| Staff truy private file/lot ngoài scope hoặc token partner gọi user API | 403/404 theo policy; không có side effect |

Fixture cần thành script/seed idempotent ở P05–P09, E2E ở P13. Gắn manifest với commit/tag/image digest; không chuyển bảng này thành dấu `[x]` khi chưa chạy test.
