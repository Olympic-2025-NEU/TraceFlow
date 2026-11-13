# Plan: M04 — Traceability & Federation

> Plan tổng quan. DevOps bổ sung chi tiết hệ thống, giao diện, kiểm thử, kết nối trước khi code sâu.

## 1. Mục tiêu / phạm vi MVP

### Truy xuất

| Mã | Chức năng |
| --- | --- |
| NX-TRC-01 | Traceability Event |
| NX-TRC-02 | Lot History |
| NX-TRC-03 | Backward Traceability |
| NX-TRC-04 | Forward Traceability |
| NX-TRC-05 | Traceability QR |
| NX-TRC-06 | Product Passport |

### Liên thông

| Mã | Chức năng |
| --- | --- |
| NX-FED-01 | Event Exchange |
| NX-FED-02 | Partner Authentication |
| NX-FED-03 | Product/Lot Mapping |
| NX-FED-04 | Event Acknowledgement |
| NX-FED-05 | Message Retry & Deduplication |

Folders: `contexts/traceability/`, `contexts/federation/`.

Kịch bản trọng tâm: ba doanh nghiệp A (cung cấp) → B (phân phối) → C (bán lẻ).

## 2. Ngoài phạm vi

- Thu hồi đa cấp phức tạp
- Graph DB chuyên dụng
- Tự động discovery đối tác

## 3. Phụ thuộc / cung cấp

| Hướng | Nội dung |
| --- | --- |
| Phụ thuộc | Platform (outbox, auth), M01 (connection), M02 (lot), M03 (events khi confirm) |
| Cung cấp AI01 | Lot history, giải thích chuỗi sự kiện |
| Cung cấp AC | AC-05…AC-09 |

Nguyên tắc: nhận message federation ≠ đã nhận đủ hàng (cần NX-TRD-04).

## 4. Aggregate / sự kiện chính

- `TraceEvent`, `TraceLink`, `QrToken`, `PassportView`
- `FederationMessage`, `MessageAck`, `IdentityMapping`
- Inbound/outbound topics: `record.transfer`, `record.receipt`, … (tên cụ thể DevOps chốt trong contract)

## 5. API bề mặt (dự kiến)

Nội bộ:

- `GET /api/v1/lots/{id}/history`
- `GET /api/v1/lots/{id}/trace/backward`
- `GET /api/v1/lots/{id}/trace/forward`
- `POST /api/v1/lots/{id}/qr`
- `GET /api/v1/public/passport/{token}`

Federation:

- `POST /api/v1/federation/events` (inbound)
- `POST /api/v1/federation/events/{id}/ack`
- Admin: retry queue, mapping product/lot

## 6. UI bề mặt

- Timeline lịch sử lô
- Truy ngược / truy xuôi
- Tạo QR + xem passport (public)
- Hàng đợi federation (lỗi, retry)
- Mapping định danh đối tác

## 7. Kiểm thử tối thiểu

- Federation: auth đối tác, dedupe, retry
- E2E: A→B→C truy xuất được (AC-07)
- Public passport chỉ lộ field được phép
- Failure: instance B tắt, A vẫn làm nội bộ; message chờ rồi gửi lại

## 8. Tiêu chí Done

- [ ] AC-05, AC-06 (phối hợp M03), AC-07, AC-08, AC-09
- [ ] Versioned event payload
- [ ] Tài liệu kết nối 3 instance trong `deploy/`

## 9. Ghi chú DevOps

Chi tiết hóa: OpenAPI federation, chữ ký request, TTL QR, chính sách field passport, retention message, ma trận test A/B/C.
