# Mô hình bảo mật và quyền tối thiểu

## 1. Ranh giới tin cậy

Internet chỉ đến Gateway HTTPS. User token từ Keycloak, partner token từ service account của **receiver**; Next ERP app và core data/file API xác thực lại token/session và quyết định quyền tài nguyên của mình. DX-Lab frontend tầng 2 chỉ tiêu thụ API qua gateway. Mạng nội bộ tách PG, Redis, Flowable REST, storage admin, etcd nếu có, Python AI. Không tin `tenantId`, role, partner ID hoặc header danh tính từ body/browser. Một instance một org; chi nhánh/kho là scope nội bộ.

## 2. Danh tính và quyền

| Chủ thể | Xác thực | Quyền mẫu |
| --- | --- | --- |
| Administrator | OIDC user | Org, members, partner connection, retry, policy; không tự duyệt nếu separation-of-duties cấm |
| Staff | OIDC user | Tạo Draft, confirm trong kho được cấp, xem lot/trace và file theo scope |
| Approver | Vai/quyền nghiệp vụ gắn một Flowable task | Approve/reject task; không đồng nghĩa tự confirm document |
| Partner client | Client credentials cấp ở receiver | Chỉ federation endpoints/phạm vi partner, không xem ERP private |
| Public consumer | Không đăng nhập | Chỉ Passport projection theo QR/policy/rate limit |
| AI service | Internal service identity | Chỉ inference/tool request allowlist, không có DB credential ghi |

M01 quản lý mapping `Keycloak sub -> membership/role/scope`. Vai trò tối thiểu Admin/Staff theo Ch6; Approver là quyền/task assignment của workflow, không nhất thiết một role toàn hệ thống. Resource authz theo product/warehouse/partner/row phải chạy trong app kể cả khi gateway đã chấp nhận token. Mọi 403 phải có audit an toàn; tránh phân biệt tài nguyên không tồn tại với không được phép nếu gây lộ ID.

## 3. Route và dữ liệu

- Gateway đặt default deny, route allowlist; OIDC bearer cho private/federation, auth-code+PKCE cho browser theo ADR; public route giới hạn method/size/rate. Header do gateway thêm phải được xóa từ request bên ngoài trước khi set lại.
- Keycloak admin, Flowable REST, storage console, metrics nội bộ và gateway admin API không public. Secret trong env/secret store dev, không commit; rotate test cho partner credential.
- File upload: MIME/extension/size allowlist, key ngẫu nhiên, bucket quarantine, ClamAV scan theo phiên bản signature; chỉ chuyển trạng thái `clean` mới cho tải/chia sẻ. Scan lỗi = fail closed, không tạo public URL. Chứng từ private không đi qua QR policy mặc định.
- QR token opaque, không mã hóa raw DB ID; revoke/rotate được; projection allowlist, không PII, giá, credential, ghi chú nội bộ. Cache public phải invalidated khi chính sách/batch status đổi.
- AI: tool input schema, output limit, log redacted, không SQL tùy ý; kết quả dữ liệu có ID nguồn và quyền của user; prompt injection từ document/partner event không được biến thành lệnh hệ thống.

## 4. Các tình huống đe dọa phải test

| Tấn công/lỗi | Kết quả mong muốn |
| --- | --- |
| Token hết hạn/sai issuer/audience/scope | 401/403 ở gateway hoặc app, không tạo side effect |
| Staff đổi `orgId`, kho, `createdBy` trong body/header | Bị bỏ qua hoặc reject; actor lấy từ session và scope server |
| Gọi thẳng Next bypass gateway | Port không public hoặc app vẫn xác thực/authorize; không có đường bypass hợp lệ |
| SSRF qua partner endpoint | URL allowlist/HTTPS, không truy cập internal IP/metadata; chỉ Admin đổi |
| Replay message/Idempotency-Key khác payload | Một effect hoặc 409; audit đầy đủ |
| Upload tệp độc hại, scan timeout | Quarantine, không download/public |
| QR đoán được, truy cập private attachment | Không thể truy cập; rate limit và policy |
| Prompt injection yêu cầu confirm hoặc đọc lot ngoài quyền | Tool reject; không có confirmed document/stock movement |

## 5. Chứng cứ bảo mật cần bàn giao

Gateway route map, realm/client export đã bỏ secret, bảng role-scope, threat-test log, inventory secret/rotation, scan demo, privacy snapshot của Passport, kết quả dependency/license scan, hướng dẫn revoke QR và partner credential. Không công bố token hoặc tệp thật trong test artefact.
