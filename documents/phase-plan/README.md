# Nexora — phase plan để hoàn thành MVP OLP PMNM 2026

Đây là **kế hoạch thực thi**, không phải báo cáo đã hoàn thành. Mọi ô `[ ]` bắt đầu ở trạng thái chưa kiểm chứng. Không đổi thành `[x]` khi chỉ có interface, mock, ảnh chụp hoặc tài liệu; phải lưu bằng chứng chạy thực theo `test-matrix.md`.

## Phạm vi và thứ tự ưu tiên

1. Điều kiện đề thi/thể lệ OLP 2026: mã nguồn mở hợp lệ, lõi DX-OS **headless** có Identity/SSO, API Gateway, dữ liệu cấu trúc/phi cấu trúc, Workflow; ít nhất một ứng dụng giao diện trong không gian H-P-D-I tầng 2. Plan chọn một DX-Lab workspace có bốn vùng H/P/D/I, triển khai riêng với ERP. Xem `../referents/OLP_2026_ALIGNMENT.md`.
2. Chương 6 proposal: M01, M02, M03, M04, AI01 và AC-01…AC-13. Chương 7 §7.12 là stack Nexora, nhưng không thể dùng ngoại lệ của proposal để bỏ yêu cầu bắt buộc của đề thi.
3. Ngoài MVP: finance/CRM/POS đầy đủ/sản xuất/BOM/QC nhiều bước/thu hồi đa cấp/SaaS nhiều doanh nghiệp chung DB. Các minh chứng dữ liệu/OT/GitOps ở Phase 12 chỉ phục vụ DX-OS, không biến Nexora thành ERP đầy đủ.

`../plans/` vẫn là plan tổng quan theo module. Thư mục này chia việc theo **thứ tự xây dựng và cổng nghiệm thu**. Không copy code, công nghệ hoặc dấu hoàn thành từ `D:\salesupport\Sales-support-AI-pilot\docs\plan-template`; template chỉ được dùng cho cách tổ chức tài liệu.

## Bắt đầu từ đâu

| Đọc theo thứ tự | Mục đích |
| --- | --- |
| [summary.md](./summary.md) | Bản đồ phase, đường găng và mốc Done |
| [decision-log.md](./decision-log.md) | Các quyết định cần chốt bằng spike/ADR trước khi code phụ thuộc |
| [architecture.md](./architecture.md) | Ranh giới ba tầng, topology, các luồng quan trọng |
| [database.md](./database.md), [api-contracts.md](./api-contracts.md), [event-contracts.md](./event-contracts.md), [security.md](./security.md) | Hợp đồng dữ liệu và bảo mật ban đầu; cập nhật bằng ADR khi implement |
| [test-matrix.md](./test-matrix.md) | AC-01…AC-13, điều kiện đề thi và minh chứng phải lưu |
| [contest-scorecard.md](./contest-scorecard.md) | 50 điểm PoF và 50 điểm sản phẩm theo thể lệ, bằng chứng cho từng mục |
| [demo-fixtures.md](./demo-fixtures.md) | Dữ liệu A→B→C, số dư mong đợi và biến thể lỗi kiểm thử |
| [references.md](./references.md) | Nguồn tài liệu và chỗ cần xác minh phiên bản |
| [phase-00-baseline.md](./phase-00-baseline.md) → [phase-13-release.md](./phase-13-release.md) | Task chi tiết theo phase |

## Quy tắc chạy phase

- Task ID dạng `Pxx-Tyy` là ổn định. Khi làm việc, ghi PR/commit và bằng chứng test ở issue hoặc nhật ký thực hiện; đừng biến tài liệu kế hoạch thành báo cáo giả.
- Mỗi task có đầu vào, việc làm, bằng chứng và điều kiện xong. Tách PR theo một lát cắt có thể kiểm thử; tránh mở hết schema rồi để API/UI trống.
- Không bắt đầu phase phụ thuộc khi gate phase trước chưa đạt. Có thể nghiên cứu hoặc thiết kế trước, nhưng không đánh dấu Done cho đường găng.
- Công nghệ phiên bản động: chốt **tag/digest**, giấy phép, API và tài nguyên máy trong `decision-log.md` khi đến phase; không dùng `latest` cho bản demo/release.
- Mỗi instance A/B/C có app và dữ liệu riêng. Keycloak, gateway và storage có thể dùng cùng binary/image nhưng cấu hình và phạm vi tin cậy phải tách rõ; không cho truy cập DB xuyên instance.
- Các ví dụ route/payload trong hợp đồng là **đề xuất để chốt** tại P00; nếu đổi, sửa hợp đồng, migration và test cùng một PR.

## Danh mục phase

| Phase | Tên | Cổng kết thúc |
| --- | --- | --- |
| [00](./phase-00-baseline.md) | Baseline, giấy phép, quyết định và contract | Nguồn chân lý, ADR, test baseline rõ |
| [01](./phase-01-core-runtime.md) | Runtime lõi và cài đặt lại | Stack dev dựng từ source, health thật |
| [02](./phase-02-identity-gateway.md) | Identity, gateway, zero-trust edge | User/M2M/public routes tách và kiểm thử |
| [03](./phase-03-data-files.md) | PostgreSQL, transaction, tệp, audit | Giao dịch và file được bảo vệ, restore được |
| [04](./phase-04-workflow-events.md) | Flowable, idempotency, outbox, worker | BPMN thực thi; outbox không mất/trùng |
| [05](./phase-05-system-partner.md) | M01 System & Partner | AC-02 và kết nối đối tác có quyền |
| [06](./phase-06-catalog-inventory.md) | M02 Catalog & Inventory | Nền AC-03, tồn theo lô nhất quán; hoàn tất AC-03 tại G07 |
| [07](./phase-07-trading.md) | M03 Trading & Distribution | AC-04/06/12, confirm một transaction |
| [08](./phase-08-traceability.md) | M04 Traceability & Passport | Trace/QR/chính sách công bố chạy trên dữ liệu thật |
| [09](./phase-09-federation.md) | M04 Federation A/B/C | AC-05/07/09, retry/dedupe/discrepancy |
| [10](./phase-10-ai.md) | AI01 | AC-10/11, tool có quyền và draft-only |
| [11](./phase-11-dx-lab-ui.md) | Ứng dụng H-P-D-I và UI xuyên module | Một ứng dụng tầng 2 minh họa lõi, UX đủ demo |
| [12](./phase-12-operability.md) | Nguyên lý DX-OS, vận hành, an toàn | Minh chứng dữ liệu/IT-OT/lineage/GitOps/quan sát |
| [13](./phase-13-release.md) | E2E, hardening, nguồn mở, showcase | AC-01…13 và tiêu chí nguồn mở có bằng chứng, release tái lập |

Không có ước lượng giờ/ngày cố định trong plan: tốc độ phụ thuộc quyết định P00, tài nguyên máy và kết quả tích hợp. Theo dõi tiến độ bằng gate và bằng chứng thay vì tỷ lệ phần trăm tự khai.
