# Kiến trúc thực thi và ranh giới

## 1. Mục tiêu kiến trúc

- Tầng 1 DX-OS cung cấp dịch vụ **headless** có thể gọi qua API: SSO, gateway, dữ liệu có cấu trúc/phi cấu trúc và Workflow. D15 yêu cầu một runtime core data/file API **không UI** cho metadata/projection có quyền và tệp; `platform/` của Nexora là adapter dùng dịch vụ, không được tính là toàn bộ lõi. Core API không được dùng như cổng SQL tổng quát để bỏ qua invariant nghiệp vụ.
- Tầng 2 có **DX-Lab Operations Workspace** H-P-D-I là ứng dụng frontend/deployment riêng, tiêu thụ gateway/core API và ERP business API; có thể dùng chung monorepo và thư viện UI với Nexora, nhưng runtime/route/UI tách khỏi core và ERP để minh chứng ranh giới.
- Tầng 3 là Nexora ERP/traceability nghiệp vụ: một Next.js Modular Monolith chứa UI, route handlers, application/domain/infrastructure; dữ liệu riêng theo instance.
- Một instance phục vụ đúng một doanh nghiệp. A/B/C không dùng chung application DB, session, object bucket hoặc credential kết nối; các service có thể chạy cùng loại image nhưng tách cấu hình.

## 2. Topology đích của một instance

```text
Browser / partner instance
       │ HTTPS
       ▼
API Gateway (public / user / partner route, rate limit, OIDC)
       ├── Keycloak realm: human clients + partner service accounts
       ├── Core Data/File API: structured metadata/projection + file API, không UI
       ├── DX-Lab Operations Workspace: frontend tầng 2, H-P-D-I
       └── Nexora Next.js: UI + /api/v1 business API
             ├── platform adapters (authz, transaction, audit, outbox, file, workflow)
             ├── contexts/system, catalog, inventory, trading, traceability, federation
             ├── PostgreSQL app DB (một org; schema theo bounded context)
             ├── S3-compatible object storage (private evidence, quarantine, public policy)
             ├── Flowable OSS REST/BPMN (DB riêng của engine)
             ├── Redis (cache/worker coordination, không phải nguồn sự thật outbox)
             └── AI Python service (optional, network nội bộ, không DB write)

PostgreSQL server có thể chứa DB/role riêng cho app, Keycloak và Flowable; core data API có role/schema quyền tối thiểu, không ghi thẳng business tables. ERP sở hữu transaction document/stock/audit/outbox trong app DB; core data API sở hữu metadata/file và read projection cho tầng 2 theo contract D15, cập nhật bất đồng bộ sau commit nếu cần. Không tạo distributed transaction giả giữa core API và M03. Nếu gateway APISIX chọn mode cần etcd, etcd là hạ tầng cấu hình gateway, không phải DB nghiệp vụ. Chỉ gateway công khai ra Internet; PG/Redis/Flowable/storage admin/etcd nằm mạng nội bộ.
```

## 3. Chỗ đặt trách nhiệm

| Thành phần | Sở hữu | Không sở hữu |
| --- | --- | --- |
| Gateway | TLS, route, auth ở biên, rate limit, request ID, giới hạn payload, tách private/public/M2M | Quy tắc tồn kho, quyền trạng thái chứng từ |
| Keycloak | Xác thực, issuer/token, service account | Phân quyền nghiệp vụ theo kho/lô/trạng thái |
| Core Data/File API | Metadata/projection có cấu trúc và object/file lifecycle qua API có quyền, không UI | Confirm chứng từ hoặc chỉnh balance trực tiếp |
| DX-Lab Workspace | Giao diện H-P-D-I tầng 2 tiêu thụ API qua gateway | SQL trực tiếp hoặc logic chứng từ nguồn |
| Next `app/` | UI và adapter HTTP mỏng, input validation, response | Invariant domain đặt trong route |
| `platform/` | Port + adapter tích hợp, transaction boundary, audit, outbox, file, workflow | Tên phiếu hoặc sửa dữ liệu M01–M04 |
| `contexts/*` | Aggregate, use case, repository thuộc bounded context | Import sâu domain context khác |
| `composition/` | Wire port, transaction và event handler | Quy tắc nghiệp vụ mới không có owner |
| Flowable | Process instance, user task, transition phê duyệt | Số dư tồn; một task complete chưa phải confirm chứng từ |
| PostgreSQL | Transaction/constraint cho dữ liệu nghiệp vụ và outbox | Đọc/ghi trực tiếp từ instance khác |
| AI Python | Phân tích ngôn ngữ, lựa chọn tool trong allowlist, tạo gợi ý | SQL tùy ý, confirm, đổi tồn, dữ liệu ngoài quyền user |

## 4. Luồng bắt buộc

### Người dùng

Browser → Gateway → OIDC Keycloak → Next session/Actor. Route handler vẫn xác thực token/session và phân quyền theo vai, đơn vị/kho và trạng thái; không chỉ tin header từ bên ngoài. Gateway phải loại header danh tính do client tự đặt. Public passport đi route riêng, không nhận quyền nội bộ.

### Confirm phiếu

`POST .../confirm` → authenticate → authorize → idempotency → load aggregate/stock → domain invariant → **một PG transaction**: document state + movement/balance **nếu chứng từ sở hữu movement theo D14** + audit + outbox → commit → worker dispatch. GoodsIssue trừ tồn, PartnerTransfer chỉ tham chiếu issue và gửi event; ReceivingConfirmation cộng theo actual, không có GoodsReceipt thứ hai cho cùng lần nhận; SaleRecord tham chiếu issue bán và không trừ lần nữa. Flowable approval là điều kiện trước confirm; nếu Flowable unavailable thì phiếu chờ, không tự bỏ qua approval. External send không diễn ra trong transaction.

### Federation A → B

A confirm transfer và ghi outbox → worker gửi JSON versioned qua gateway B với client-credentials do B cấp → B authenticate partner, lưu inbox/trace summary idempotent → trả **technical ACK** → nhân viên B đối chiếu hàng thực tế → B confirm receipt/partial/discrepancy và gửi business event. B không tăng tồn chỉ vì nhận message. Khi B offline, A vẫn hoàn thành nghiệp vụ nội bộ, outbox chờ retry.

### AI

User request → Next xác thực và giới hạn phạm vi → Python service chọn tool cho phép → tool truy vấn API/use case bằng quyền user hoặc qua adapter xác thực được ủy quyền → kết quả có source IDs → LLM giải thích hoặc trả Draft → user xác nhận qua API M03 thông thường. Nếu AI/LLM down, nghiệp vụ ERP vẫn hoạt động.

## 5. Phân lớp DX-Lab H-P-D-I

| Không gian | Minh họa đề xuất | Dữ liệu/dịch vụ thật cần dùng |
| --- | --- | --- |
| H | Đăng nhập SSO, hộp việc theo user/role | Keycloak, actor/authorization |
| P | Hàng chờ phê duyệt, giao nhận có kiểm tra sai lệch | Flowable, M03, audit, gateway |
| D | Timeline lô, truy ngược/xuôi, trạng thái message và số liệu có nguồn | PG read model, trace event, provenance |
| I | Hỏi nguồn gốc, tạo Draft và cảnh báo theo rule | AI01 tool có quyền, API M02–M04 |

Ứng dụng minh họa tầng 2 tập hợp bốn màn hình trên thành DX-Lab workspace triển khai riêng; ERP tầng 3 vẫn là mô hình nghiệp vụ cung cấp dữ liệu và API. Demo tắt hai UI nhưng core data/file API, SSO, gateway và Flowable vẫn chạy được. Không claim H/P/D/I nếu chỉ là slide hoặc mock.

## 6. Khả năng phục hồi và ranh giới dữ liệu

- App DB là nguồn sự thật cho stock/document/outbox/inbox. Redis chỉ cache/coordination; mất Redis không được mất message đã commit.
- Cache/derived projection có thể dựng lại từ event/document; không dùng nó để quyết định tồn kho.
- Tệp bằng chứng có metadata PG, byte trong object storage, checksum và trạng thái scan; không cấp public URL trước khi scan và policy pass.
- Backup: app DB, Keycloak/Flowable DB, object storage và cấu hình gateway/realm/process/secret reference. Restore thử ít nhất một instance và kiểm tra trace + quyền.
- Mỗi integration có timeout, retry có giới hạn, trạng thái lỗi quan sát được và thao tác retry của admin; không có phân tán transaction giữa doanh nghiệp.
