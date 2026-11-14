# Phase 00 — Baseline, nguồn mở và khóa hợp đồng

**Mục tiêu:** biến repo scaffold thành điểm xuất phát đo được; đóng quyết định chặn core trước khi code. **Phụ thuộc:** không. **Unblock:** Phase 01–04. **Không được gọi Done:** chỉ có tài liệu nhưng chưa kiểm tra build, bản quyền hoặc contract.

## P00-T01 — Kiểm kê mã, tài sản và khoảng trống

- [ ] Chụp `git status`, tree, dependency lock, route hiện có, migration 0 byte, Compose chỉ PG, test hiện có và version Node; phân loại code chuẩn đích vs scaffold `sales|procurement|finance|master-data`.
- [ ] Ghi danh mục file tự viết, template code, SVG/ảnh/font/tài sản bên thứ ba và nguồn gốc để biết file nào gắn SPDX, file nào cần giữ notice riêng.
- [ ] Chạy build/lint/typecheck baseline trên clone sạch; lưu lỗi hiện tại riêng với lỗi do phase sau đưa vào.
- **Đầu ra:** baseline report và issue cho từng gap; **kiểm chứng:** người khác tái tạo được các lệnh, không ghi “module hoàn thành” theo tên folder.

## P00-T02 — Chuẩn hóa nghĩa “xong” và phạm vi

- [ ] So Ch6/AC-01…13 với đề thi mục 3–4, bảng `test-matrix.md`; đánh dấu bắt buộc, mở rộng, ngoài MVP cho từng yêu cầu.
- [ ] Chốt demo dọc A→B→C và một ứng dụng H-P-D-I; tạo tập tình huống happy/error/offline trước khi viết schema.
- [ ] Xác minh với BTC mốc nộp bài vì đề thi ghi 2025 còn thể lệ có lịch 2026; lưu phản hồi, không suy từ PDF cũ.
- **Đầu ra:** scope statement, demo acceptance narrative; **kiểm chứng:** không có task finance/full POS/production bị đưa vào MVP mà không có change request.

## P00-T03 — ADR lõi và spike kỹ thuật

- [ ] Đóng D01 gateway bằng route OIDC/public/M2M demo; ghi APISIX/etcd mode hoặc phương án thay thế, pin version/license/RAM.
- [ ] Đóng D02 storage bằng upload/download private, presigned URL, backup/source build; kiểm tra tình trạng phân phối MinIO nếu chọn nó.
- [ ] Đóng D03 database adapter/migration bằng spike một transaction ghi hai repository + outbox và rollback; D04 session/Next docs; D06 Flowable OSS REST + PG.
- [ ] D07 decimal/lot, D08 envelope, D10 H-P-D-I, D11/D12 nguyên lý/GitOps, D14 movement ownership và D15 runtime lõi/tầng 2 có ADR có test chấp nhận.
- **Đầu ra:** ADR trong `decision-log.md` hoặc `documents/adr/`; **kiểm chứng:** không còn “TBD” chặn migration, auth hoặc transport của P01–04.

## P00-T04 — Quyền phát hành AGPL và tiêu chí nguồn mở

- [ ] Xác nhận chủ sở hữu/quyền cấp phép mã nhóm và tài sản; thêm SPDX `AGPL-3.0-only` vào từng tệp mã nhóm viết, giữ nguyên notice bên thứ ba; kiểm tra `LICENSE` toàn văn.
- [ ] Tạo quy tắc không commit secret, SBOM/license inventory từ lockfile/image; đánh dấu dependency không tương thích hoặc không thể build source trước khi tích hợp.
- [ ] Chuẩn bị kho public/web viewer, issue tracker, changelog và chính sách release; chưa cần phát hành ở phase này.
- **Đầu ra:** license inventory và checklist nguồn mở; **kiểm chứng:** script quét file tự viết không thiếu SPDX, source/license của dependency truy được.

## P00-T05 — Chốt contract nghiệp vụ và dữ liệu

- [ ] Review `database.md`, `api-contracts.md`, `event-contracts.md`, `security.md` với cả ba vai Admin/Staff/Approver và kịch bản partial receiving.
- [ ] Chọn định danh lot issuer-qualified, đơn vị/precision, document lifecycle, chủ sở hữu movement của từng loại phiếu (D14), technical ACK vs receiving, public field policy và versioning.
- [ ] Viết contract tests trước hoặc cùng adapter đầu tiên; mọi thay đổi sau này phải cập nhật docs/test cùng PR.
- **Đầu ra:** contract v1 có ví dụ và lỗi; **kiểm chứng:** cả sender A và receiver B hiểu cùng một message, không có field cập nhật tồn từ client.

## P00-T06 — Chuẩn hóa repo/CI nền

- [ ] Chốt layout đích theo `FOLDER_STRUCTURE.md`; lập mapping giữ/xóa/chuyển scaffold cũ, tránh xóa khi chưa chứng minh không có import dùng chung.
- [ ] Thêm CI baseline: install theo lockfile, lint, typecheck, build, test command (có thể rỗng có thông báo ở đầu); không dùng tag image `latest` trong pipeline demo.
- [ ] Quy ước PR/issue theo task ID, yêu cầu evidence và CODEOWNERS/review nếu đội muốn; chuẩn hóa `.env.example` không secret.
- **Đầu ra:** pipeline xanh trên clone sạch; **kiểm chứng:** cố ý làm sai lint/build thì pipeline đỏ.

## P00-T07 — Gate G00

- [ ] Hai người review ranh giới core headless/Next ERP/DX-Lab app, D01–D08/D14/D15 và ma trận AC; ghi rủi ro còn mở có owner.
- [ ] Chạy lại baseline, kiểm tra bản tài liệu và mã không claim sai trạng thái. Phase 01 chỉ mở khi có lựa chọn gateway/storage/DB adapter xác định và demo topology khả thi.
- **Bằng chứng:** ADR, baseline log, scope/contract v1, license inventory.
