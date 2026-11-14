# Bảng đối chiếu chấm điểm OLP PMNM 2026

Nguồn: **Thể lệ cuộc thi phần mềm nguồn mở - OLP 2026.pdf**, trang 1–3; **Quick-guide-to-DXOS.pdf**, trang 4–5; **Đề thi phần mềm nguồn mở - OLP 2026.pdf**, mục 3–6. Đây là checklist kế hoạch, chưa phải điểm tự chấm. PoF trong tài liệu cuộc thi là **Point of Failure** (50 điểm trước chung kết); sản phẩm/showcase là 50 điểm tại chung kết. Điều kiện tiên quyết để được xếp hạng: giấy phép OSI-approved và mã nguồn truy cập tự do trên Internet. AGPL-3.0-only phải được xác minh cùng quyền cấp phép từng thành phần.

| Mục | Điểm tối đa | Yêu cầu và lỗi dễ bị trừ điểm | Task/gate | Bằng chứng cụ thể |
| --- | ---: | --- | --- | --- |
| PoF-1 Quản lý mã nguồn Internet | 5 | Repo công khai có web viewer, mở truy cập, lịch sử commit thật | P00-T04, P13-T03/T09 | URL repo mở ở cửa sổ ẩn danh, log commit/tag |
| PoF-2 Giấy phép OSI | 10 | License trong từng tệp mã, toàn văn, mục đích sử dụng và phụ thuộc tương thích | P00-T04, P13-T04 | `LICENSE`, SPDX scan, NOTICE, SBOM/license audit |
| PoF-3 Release | 5 | Ít nhất một release **trước thời điểm nộp**, có version; dùng định dạng mở cho nguồn/phát hành (ưu tiên source `.tar.gz` và checksum, không nộp chỉ `.zip/.rar`) | P13-T06/T08 | Tag timestamp, release URL, source archive/checksum, submission receipt |
| PoF-4 Build từ source | 10 | Hướng dẫn build chạy được; config trước build không sửa header; tool build mở; app chạy ngoài thư mục source | P01-T02/T07, P13-T03 | Clone sạch, env config, build logs, container/runtime ngoài checkout |
| PoF-5 Thư viện/gói đính kèm | 10 | Ghi rõ dependency; dùng thư viện qua package manager, không bundle mã dự án khác, không sửa source dependency | P00-T01/T04, P13-T04 | lockfile/SBOM, attribution, tree scan không có vendored dependency trái quy định |
| PoF-6 Tài liệu/giao tiếp | 10 | README/hướng dẫn rõ, bug tracker, changelog | P00-T04, P13-T01/T04 | README fresh install, public issues, CHANGELOG |
| Sản phẩm-7 Tính nguyên gốc | 10 | Giải thích quyết định kỹ thuật và nghiệp vụ khác biệt, có bằng chứng chạy | P09-T06/T07, P13-T07 | Federation actual-vs-sent, lineage A/B/C, tradeoff ADR |
| Sản phẩm-8 Mức hoàn thiện | 10 | Sản phẩm demo chạy thật; AC-01…13 và lõi headless | G00–G13, P13-T02 | CI/e2e/restore, live demo |
| Sản phẩm-9 Thân thiện | 10 | Người dùng thao tác được, lỗi/trạng thái rõ, mobile/accessibility | P11-T01…T08 | UX run, viewport/keyboard test, task completion |
| Sản phẩm-10 Phát triển bền vững | 10 | Tài liệu kỹ thuật, công cụ hỗ trợ, khả năng cài đặt/đóng góp | P12-T07/T08, P13-T01/T04/T06 | architecture/ADR/runbook, issue tracker, release |
| Sản phẩm-11 Showcase/cộng đồng | 10 | Trình diễn thuyết phục, chỉ rõ điểm mở và cách cộng đồng tham gia | P13-T07/T08 | rehearsal, demo runbook/video, contributor docs |

## Cổng nộp bài

- [ ] Repo public và release đã tồn tại **trước** khi gửi bài; đo timestamp/tag, không chỉ có commit trên `main`.
- [ ] Source archive dùng định dạng mở theo thể lệ; tài liệu build từ source và chạy ngoài checkout đã được người khác thử.
- [ ] Đủ `LICENSE`, header SPDX của từng tệp mã tự viết, third-party license/notice, bug tracker, changelog, README.
- [ ] Đã xác minh hạn nộp thật với BTC: đề thi ghi `06/12/2025` nhưng thể lệ mùa 2026 ghi lịch chấm 7–9/12/2026; không tự sửa ngày theo suy đoán.
- [ ] Hồ sơ gửi đúng kênh/định dạng mới nhất; giữ receipt nộp. Push Git hay tạo release chưa tự thay thế việc nộp bài.

Bảng này phải được chấm lại theo thể lệ bản cuối khi BTC cập nhật; nếu có khác biệt, sửa task/gate và lưu nguồn xác nhận.
