# Plan: M01 — System & Partner Management

> Plan tổng quan. DevOps bổ sung chi tiết hệ thống, giao diện, kiểm thử, kết nối trước khi code sâu.

## 1. Mục tiêu / phạm vi MVP

| Mã | Chức năng |
| --- | --- |
| NX-SYS-01 | Organization Profile |
| NX-SYS-02 | User & Access |
| NX-SYS-03 | Partner Management |
| NX-SYS-04 | Partner Connection |

Mỗi instance quản lý một doanh nghiệp, tài khoản, đối tác và thông tin kết nối tới instance khác.

Folder: `contexts/system/`.

## 2. Ngoài phạm vi

- Cơ cấu phòng ban nhiều cấp, HR
- Phân quyền động phức tạp
- Tự động khám phá đối tác trên mạng

## 3. Phụ thuộc / cung cấp

| Hướng | Nội dung |
| --- | --- |
| Phụ thuộc | Platform (identity, audit) |
| Cung cấp cho M02–M04 | Org profile, user/role, Partner, Connection credentials/endpoints |
| Cung cấp cho M04 | Dữ liệu để xác thực federation (NX-FED-02) |

## 4. Aggregate / sự kiện chính

- `Organization`, `Membership` (user + role)
- `Partner`, `PartnerConnection`
- Sự kiện quản trị: `partner.connection.updated` (audit/outbox khi cần)

## 5. API bề mặt (dự kiến)

- `GET/PATCH /api/v1/organization`
- `GET/POST /api/v1/users`
- `GET/POST/PATCH /api/v1/partners`
- `GET/POST/PATCH /api/v1/partners/{id}/connection`

## 6. UI bề mặt

- Hồ sơ doanh nghiệp
- Danh sách user / gán vai Administrator|Staff
- Danh sách partner + form kết nối (URL, client credentials)

## 7. Kiểm thử tối thiểu

- Unit: không lưu secret connection dạng plaintext trong log
- API: chỉ Admin quản lý connection
- Deploy: mỗi instance có org riêng (AC-02)

## 8. Tiêu chí Done

- [ ] AC-02
- [ ] Partner + Connection đủ để M04 gọi instance đối tác
- [ ] Plan chi tiết UI/API/test đã được DevOps bổ sung trước khi implement sâu

## 9. Ghi chú DevOps

Chi tiết hóa: schema `system`, mã hóa secret connection, đồng bộ user Keycloak vs bảng membership, validation URL đối tác.
