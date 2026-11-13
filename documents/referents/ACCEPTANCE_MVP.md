# Tiêu chí nghiệm thu MVP

Nguồn: Chương 6.10.

| Mã | Tiêu chí |
| --- | --- |
| AC-01 | Triển khai được ba bản Nexora độc lập, mỗi bản một DB |
| AC-02 | Mỗi bản tạo tài khoản và quản lý thông tin doanh nghiệp |
| AC-03 | Tạo sản phẩm, lô và ghi nhận tồn kho |
| AC-04 | Tạo phiếu nhập và phiếu xuất gắn lô |
| AC-05 | Chuyển giao thông tin lô giữa hai doanh nghiệp qua API |
| AC-06 | Xác nhận tiếp nhận hàng thực tế ở doanh nghiệp nhận |
| AC-07 | Truy xuất lịch sử lô qua ít nhất ba doanh nghiệp độc lập |
| AC-08 | Tạo mã QR và hiển thị lịch sử được phép công bố |
| AC-09 | Xác định giao dịch/đơn vị liên quan đến một lô cần kiểm tra |
| AC-10 | AI tra cứu thông tin lô từ dữ liệu nghiệp vụ có kiểm soát |
| AC-11 | AI hỗ trợ tạo chứng từ dự thảo; người dùng xác nhận |
| AC-12 | Một quy trình phê duyệt mẫu qua Workflow (Flowable) |
| AC-13 | Cài đặt lại từ repository và tài liệu nguồn mở |

## Map AC → module

| AC | Module chính |
| --- | --- |
| AC-01, AC-13 | Platform / Deploy |
| AC-02 | M01 |
| AC-03 | M02 |
| AC-04, AC-06 | M03 (+ M02) |
| AC-05, AC-07, AC-08, AC-09 | M04 |
| AC-10, AC-11 | AI01 |
| AC-12 | Platform Workflow + một chứng từ M03 |
