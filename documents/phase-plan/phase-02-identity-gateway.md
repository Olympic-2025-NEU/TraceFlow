# Phase 02 — Identity, API Gateway và biên zero-trust

**Mục tiêu:** đường vào user, partner và public có xác thực/chính sách khác nhau; route protected không bị bypass. **Phụ thuộc:** G01, D01/D04/D05. **Unblock:** P04–P05, P09.

## P02-T01 — Realm, clients và vòng đời user

- [ ] Cấu hình realm một instance, OIDC client riêng cho Next ERP và DX-Lab frontend (redirect URI tối thiểu), client cho gateway và service account federation; audience/scope tối thiểu. Chọn MFA cho Admin/Approver hoặc ghi ADR nếu không khả thi, test recovery an toàn.
- [ ] Quyết định cookie/session và authorization-code+PKCE theo Next 16 docs tại thời điểm code; logout/refresh/expired token và user disabled được test.
- [ ] `Actor` lấy `sub`, role/scope từ token rồi đối chiếu membership DB (sau P05); không nhận role/org từ body.
- **Đầu ra:** realm export không secret và auth flow diagram; **kiểm chứng:** login/logout/expired/disabled test trên gateway+app.

## P02-T02 — API Gateway private route

- [ ] Route ERP `/api/v1/*` tới Next upstream, riêng `/api/v1/core/*` và `/api/v1/files/*` tới core data/file API với ưu tiên route cụ thể trước catch-all; OIDC bearer/session theo D04; default deny, method/size/timeouts/rate limit, request ID.
- [ ] Gateway strip client-supplied identity headers rồi set verified claims nếu cần; app vẫn verify issuer/audience/expiry và authz nghiệp vụ.
- [ ] Ngăn direct exposure app container; nếu test gọi trực tiếp trong network, app không cho request unauthenticated.
- **Đầu ra:** route config versioned; **kiểm chứng:** valid token 200, expired/wrong issuer 401, wrong scope 403, forged header không nâng quyền.

## P02-T03 — Public route riêng

- [ ] Chỉ allow `GET /api/v1/public/passport/{token}` và static assets cần thiết; anonymous nhưng rate limit/bot protection, response không chứa private data.
- [ ] Chặn POST/PUT, path traversal, enumeration và cache sai chính sách; health chỉ expose liveness tối thiểu nếu cần.
- **Đầu ra:** public policy; **kiểm chứng:** scan route matrix, public token không truy cập `/api/v1/products` hoặc file private.

## P02-T04 — Federation M2M route

- [ ] Receiver tạo service account/client cho mỗi partner; sender lấy short-lived token từ receiver; gateway check issuer/audience/scope/client, app map `client_id`→PartnerConnection.
- [ ] Chỉ cho POST event/ack, giới hạn payload/rate; rotation/revoke credential và idempotency test; không dùng session user cho M2M.
- [ ] Không tin `issuerInstanceId` JSON nếu token và partner mapping không khớp.
- **Đầu ra:** trust model A/B/C; **kiểm chứng:** đúng client được 202, client lạ/sai recipient bị 403, revoke có hiệu lực.

## P02-T05 — Authorization ở app

- [ ] Viết policy matrix Admin/Staff/Approver/public/partner cho từng route và action; row scope kho/chi nhánh, creator/approver separation.
- [ ] Thực thi policy tại use case/application boundary, không chỉ ẩn nút UI; response không lộ dữ liệu ngoài scope.
- [ ] Audit các hành động đặc quyền và deny quan trọng, redacted secret/token.
- **Đầu ra:** policy tests; **kiểm chứng:** Staff giả request Admin bị 403 ngay cả gọi API thủ công.

## P02-T06 — Bảo vệ gateway/admin plane

- [ ] Admin API gateway/Keycloak/Flowable chỉ nội bộ, mật khẩu mặc định bị thay; TLS ở biên demo và chính sách CORS/CSRF phù hợp session đã chọn.
- [ ] Kiểm tra SSRF cho partner endpoint, header smuggling, oversized body, rate limit, logging PII; WAF/plugin tùy kết quả D01 nhưng phải có test hiệu quả.
- [ ] Threat model ghi rõ gateway kiểm danh tính nhưng app quyết định quyền nghiệp vụ; không quảng cáo “zero trust” chỉ vì có SSO.
- **Đầu ra:** security config/scan log; **kiểm chứng:** attack cases trong `security.md` pass.

## P02-T07 — Tài liệu tích hợp và OpenAPI/security schemes

- [ ] Public/private/M2M route matrix, sample token claims đã redacted, OpenAPI security schemes, cách provision partner client.
- [ ] Tài liệu rotate/revoke credentials và lỗi 401/403; dùng cùng contract test ở CI.
- **Đầu ra:** tài liệu vận hành auth; **kiểm chứng:** người mới tạo client B cho A theo runbook mà không đọc source code.

## P02-T08 — Gate G02

- [ ] Chạy route/API/authz matrix và chụp log; xác nhận app không public trực tiếp, gateway admin bị cô lập; không có secret trong Git/log.
- **Bằng chứng:** test 200/401/403/429, topology network, realm export, gateway config và threat model đã review.
