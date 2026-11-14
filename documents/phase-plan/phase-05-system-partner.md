# Phase 05 — M01 System & Partner

**Mục tiêu:** một doanh nghiệp trên mỗi instance, người dùng nội bộ có vai trò, đối tác được quản lý và kết nối có kiểm soát. **Phụ thuộc:** G02–G04, D04/D05. **Unblock:** catalog, giao dịch và federation. **AC:** AC-02, một phần AC-01/05.

## P05-T01 — Organization một instance

- [ ] Migration `system.organization`: một organization active, mã/định danh public ổn định, tên, thông tin liên hệ, timezone và phiên bản; không dùng `tenantId` để chứa nhiều doanh nghiệp trong một DB.
- [ ] Bootstrap organization trong mỗi instance A/B/C qua setup bảo vệ; khóa đường tạo organization thứ hai. Chỉnh sửa thông tin có audit và optimistic version.
- [ ] API read/update có field allowlist; public projection không tự lộ địa chỉ/điện thoại nội bộ.
- **Đầu ra:** schema, use case, API và trang hồ sơ; **kiểm chứng:** A/B/C có org ID khác nhau, Staff bị 403 khi sửa.

## P05-T02 — Membership và vòng đời user

- [ ] Map Keycloak `sub`/realm/client vào membership local; không tin role gửi từ body/header. Chốt JIT provisioning hay admin invite tại D04; disable user phải có hiệu lực ở API ngay sau mức trễ đã định.
- [ ] Vai trò tối thiểu Admin, Staff, Approver, Viewer; scope theo thao tác và kho nếu D04 chọn. Kiểm tra authorization tại application service, gateway chỉ là lớp biên.
- [ ] Admin invite/assign/disable; tránh tạo mật khẩu ở app; bảo vệ người quản trị cuối cùng khỏi tự khóa. Thay đổi role ghi audit và invalidate/kiểm tra session theo policy.
- **Đầu ra:** membership adapter, management API/UI; **kiểm chứng:** đổi role/disable trong khi session còn mở bị áp quyền mới.

## P05-T03 — Chính sách quyền thống nhất

- [ ] Lập permission matrix cho CRUD org, product, batch, document, approval, trace private/public, partner, AI tool, admin retry; lưu trong `security.md` và code policy duy nhất.
- [ ] Negative tests cho từng route quan trọng: thiếu token, sai issuer/audience, token service account ở user endpoint, role không đủ, membership disabled.
- [ ] Chặn IDOR: document/batch/attachment chỉ tra theo resource thuộc instance hiện tại; không chọn org qua query/body.
- **Đầu ra:** policy tests; **kiểm chứng:** 401/403/404 đúng ngữ nghĩa và không có side effect.

## P05-T04 — Danh bạ đối tác và định danh issuer

- [ ] Migration `partner` với ID local, issuer instance ID đã xác minh, trạng thái active/suspended, tên hiển thị và contact đã redacted ở log.
- [ ] Cấm hai partner active cùng issuer; không coi tên doanh nghiệp hoặc URL là định danh tin cậy. Lưu lịch sử thay đổi/suspend và người phê duyệt.
- [ ] API/UI Admin lập danh bạ, xem trạng thái kết nối; Staff chỉ thấy trường phục vụ chứng từ.
- **Đầu ra:** partner registry; **kiểm chứng:** duplicate issuer/unauthorized edit bị từ chối.

## P05-T05 — Partner connection và secret rotation

- [ ] Mỗi receiver cấp **inbound** client credential/scope riêng cho sender và map verified `client_id`→partner/issuer; sender lưu **outbound** client ID + secret reference mà receiver cấp. Không dùng cùng một field cho hai chiều. Secret đặt qua secret store/env ngoài Git; chỉ lưu reference, expiry, rotation metadata.
- [ ] Validate HTTPS endpoint/allowlist, DNS/IP policy chống SSRF và redirect bất ngờ; demo local HTTP chỉ khi network nội bộ và ADR ghi rõ. Timeout, TLS trust và mTLS nếu chọn phải có test.
- [ ] Thiết kế rotate/revoke không làm mất outbox; connection test trả thông tin an toàn, không log bearer token/client secret.
- **Đầu ra:** connection config + handshake script; **kiểm chứng:** sai credential/issuer/scope/endpoint bị reject, rotate thành công.

## P05-T06 — M2M trust boundary qua gateway

- [ ] Receiver xác thực token tại gateway và service, map issuer từ client identity được cấu hình, đối chiếu `partner_connection`; bỏ qua `issuerInstanceId` tự khai nếu không khớp.
- [ ] Route federation không cho user token hoặc token của partner khác; rate/payload limit và request correlation. Tách route connectivity probe với inbox thật.
- [ ] Ghi audit cho approve/suspend connection và lỗi auth có redaction.
- **Đầu ra:** M2M auth middleware; **kiểm chứng:** A→B hợp lệ, C giả A và replay token hết hạn đều bị chặn.

## P05-T07 — UI và dữ liệu khởi tạo

- [ ] Trang quản trị org/user/partner có trạng thái loading/empty/error, không hiện secret sau lưu; vai trò hiển thị đúng quyền.
- [ ] Seed idempotent cho A/B/C tạo org, users test, partner references không chứa secret; script setup điền credential từ môi trường.
- [ ] Ghi hướng dẫn tạo realm/client/service account, rotate/revoke và xử lý account mất quyền.
- **Đầu ra:** UI, seed, runbook; **kiểm chứng:** người khác bootstrap ba instance và kết nối dựa trên tài liệu.

## P05-T08 — Gate G05

- [ ] AC-02 chạy qua gateway + Keycloak + PG: mỗi instance tạo/login user, Admin sửa org/partner, Staff/disabled user bị chặn.
- [ ] Trust test M2M và endpoint/secret test pass; `tenantId` cũ không mở đường truy cập chéo instance.
- **Bằng chứng:** API/UI run, audit, DB identity snapshot đã redacted, role matrix và failed-auth logs.

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P05-T01 | `0003_system.sql` `system.organization` singleton slot/instance ID/code/name/timezone/status theo schema v1; `contexts/system/{domain,application,infrastructure}` + GET/PATCH organization. | A/B/C mỗi DB đúng một org; tạo org thứ hai bị unique, Staff PATCH 403, version cũ 409. |
| P05-T02 | `system.membership` map Keycloak sub/role/status, sync/invite use case; `/members` routes + admin page. P05 tạo member không gán warehouse; P06 thêm `membership_warehouse` FK và `warehouseIds` update, không lưu array tạm. | Disable/role change có hiệu lực ở API kể cả token cũ; Admin cuối không tự disable, password không nằm app DB; Staff trước P06 chưa có quyền kho. |
| P05-T03 | `platform/access/policy.ts` action matrix từ `security.md`; resource loaders lấy org/warehouse/partner từ DB, không từ body. | Test 401/403/404 mỗi role, token partner vào user route, IDOR và stale membership; không side effect. |
| P05-T04 | `system.partner` issuer unique/code/name/status, `/partners` CRUD giới hạn Admin, UI list/search/status. | Hai partner cùng issuer bị DB chặn; suspend chặn transfer mới; tên/URL không dùng làm issuer trust. |
| P05-T05 | `system.partner_connection` inboundClientId và outboundTokenUrl/clientId/secretRef/audience tách chiều, `/partners/{id}/connection` write-only secret metadata; DNS/IP/redirect SSRF checks cả endpoint và token URL. | Internal/metadata IP/HTTP ngoài dev allowlist bị reject ở cả hai URL; rotate/revoke không log secret, outbox giữ retryable. |
| P05-T06 | `platform/identity/partner-actor.ts` map verified client_id→partner active, M2M route test A/B/C. | C khai `issuer=A` bị 403 trước inbox; audience/scope/client mismatch/revoked đều 401/403. |
| P05-T07 | ERP/DX-Lab H admin pages, `db/seed/system.ts` synthetic A/B/C, provisioning runbook; không commit secret. | Seed chạy hai lần không duplicate; teammate tạo 3 realm/org/partner theo docs và xem đúng quyền UI. |
| P05-T08 | `evidence/G05.md` AC-02 API/UI/DB snapshots, partner handshake, role/SSRF/secret logs. | Org/user/partner chạy qua PG+Keycloak+gateway; mọi negative case pass trước P06. |
