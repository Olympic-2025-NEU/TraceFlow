# Thuật ngữ Nexora

| Thuật ngữ | Nghĩa trong dự án |
| --- | --- |
| Instance | Một bản triển khai Nexora độc lập của một doanh nghiệp |
| Self-hosted | Doanh nghiệp tự vận hành trên hạ tầng của mình |
| Modular Monolith | Một ứng dụng deploy, tách module/bounded context rõ trong code |
| Lõi DX-OS headless | Dịch vụ nền không có UI: Identity/SSO, API Gateway, dữ liệu cấu trúc/phi cấu trúc, Workflow |
| `platform/` | Ports/adapters TypeScript dùng chung của ứng dụng Nexora để tích hợp dịch vụ lõi; không phải toàn bộ lõi DX-OS |
| Partner | Doanh nghiệp đối tác trong chuỗi; có thể có instance Nexora riêng |
| Partner Connection | Cấu hình xác thực và endpoint để trao đổi với instance đối tác |
| Product | Danh mục hàng hóa / nguyên liệu trong catalog |
| Batch / Lot | Lô sản phẩm có định danh, ngày SX/HSD, trạng thái khả dụng |
| Warehouse | Kho vật lý hoặc logic trong một instance |
| Inventory Balance | Số lượng tồn theo sản phẩm và lô tại kho |
| Goods Receipt | Phiếu nhập hàng |
| Goods Issue | Phiếu xuất hàng |
| Partner Transfer | Chuyển giao hàng cho đối tác (phát sự kiện federation) |
| Receiving Confirmation | Xác nhận nghiệp vụ số lượng thực nhận từ đối tác |
| Sale/Distribution Record | Ghi nhận hàng đã bán/phân phối theo lô (không phải POS đầy đủ) |
| Traceability Event | Sự kiện truy xuất gắn sản phẩm/lô/số lượng/chứng từ |
| Backward Traceability | Truy ngược về nguồn cung |
| Forward Traceability | Truy xuôi các giao dịch/lô chịu ảnh hưởng |
| Product Passport | Trang công khai thông tin được phép chia sẻ (QR) |
| Federation | Liên thông API giữa các instance, không chia sẻ DB |
| Outbox | Hàng đợi sự kiện ghi cùng giao dịch nghiệp vụ, gửi sau commit |
| Draft | Trạng thái chứng từ chưa có hiệu lực tồn kho / federation |
| Confirmed | Trạng thái đã khóa nghiệp vụ và phát sự kiện |
| Actor | Người dùng đã xác thực thực hiện lệnh |
| Flowable | Engine workflow dùng cho một quy trình phê duyệt mẫu MVP |
