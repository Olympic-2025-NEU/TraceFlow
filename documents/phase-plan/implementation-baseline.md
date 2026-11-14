# Baseline triển khai v1 cho AI và nhóm phát triển

Tài liệu này là **lựa chọn mặc định có thể thi công** cho 14 phase, không xác nhận rằng repo đã triển khai. Nếu spike P00 chứng minh một lựa chọn không chạy/không tương thích giấy phép, tạo ADR thay thế và sửa **schema, API, event, task dossier, test** trong cùng PR trước khi implement phần phụ thuộc. Không để mỗi AI tự chọn một stack khác nhau.

## 1. Ranh giới và layout cố định

| Runtime | Đường dẫn đích | Trách nhiệm |
| --- | --- | --- |
| ERP Next.js | `app/`, `contexts/`, `platform/`, `composition/` | UI tầng 3, business API, transaction document/stock/audit/outbox trong app PG DB |
| Core Data/File API | `services/core-data/` | HTTP headless cho metadata/projection có cấu trúc và tệp/scan; role DB riêng chỉ ghi bảng nó sở hữu |
| DX-Lab Workspace | `apps/dx-lab/` | Frontend tầng 2 H/P/D/I, chỉ gọi gateway; build/deploy riêng |
| AI | `services/ai/` | Python HTTP service, tool allowlist; không có DB credential nghiệp vụ |
| Worker | `workers/` hoặc entrypoint tách từ ERP image | Outbox, Flowable bridge, trace projection, federation delivery, archive; không chạy theo request Next |
| Deployment | `deploy/` | Compose một instance, overlay A/B/C, Keycloak realm import, APISIX route config, Flowable BPMN, bucket policy, GitOps demo |
| Contract/tests | `contracts/`, `tests/` | OpenAPI/JSON Schema/BPMN versioned, fixtures, integration/e2e, gateway/auth tests |

`app/` hiện chỉ là scaffold Next.js. Các path trên là **đầu ra phải tạo**, không phải trạng thái repo. Không đưa quy tắc tồn kho vào route handler hoặc core data API. Instance A/B/C có app DB, Keycloak realm/client, bucket namespace và credential tách biệt; không có `tenant_id` dùng chung nhiều org trong một DB.

## 2. Lựa chọn mặc định và ngưỡng thay thế

| ADR | Baseline cho AI triển khai | Spike/điều kiện trước khi chốt |
| --- | --- | --- |
| D01 | Apache APISIX gateway, route public/user/M2M tách; OIDC plugin, default deny | P00 chứng minh 200/401/403, PKCE browser, bearer M2M và app không bị gọi bypass; pin image/digest |
| D02 | SeaweedFS S3 API tự host; bucket `quarantine`, `private`, `public` theo instance | P00 upload/download, presigned URL, restart/backup; nếu thay phải cùng contract S3 và giấy phép phù hợp |
| D03 | `pg` + SQL migration tuần tự, một `PoolClient` qua `Transaction.run(tx => ...)` | Spike rollback document+movement+audit+outbox, kiểm lock/concurrency; không dùng Prisma/Drizzle song song |
| D04/D05 | Keycloak OIDC; browser authorization-code + PKCE; receiver cấp service account cho partner; membership role/scope ở app DB | Test issuer/audience/expiry, revoke/disable, client mapping và token không lộ browser logs |
| D06 | Flowable OSS REST + PostgreSQL riêng; BPMN `goods-issue-approval` v1 cho GoodsIssue | Test deploy/start/task complete/reject/restart và bridge idempotent |
| D07 | `numeric(20,3)` cho lượng, decimal string ở JSON; unit `EA`, `KG`, `L`; `EA` phải số nguyên, không quy đổi unit trong MVP; không cho stock âm; issue chặn batch có `expires_on < today` theo timezone org, ngày hết hạn còn hợp lệ đến cuối ngày | Test 0/âm/overflow/làm tròn/concurrent issue và biên ngày hết hạn; nếu đổi precision phải sửa toàn bộ contract/fixture |
| D08 | Event envelope 1.0, origin lot và sender-local batch riêng, UUID IDs; JSON Schema; ACK kỹ thuật qua response 202 | Test A/B/C, replay same/different hash, order, offline, share policy |
| D09 | Python AI adapter có provider cấu hình; rule-based risk deterministic; tool APIs dùng quyền user | Chọn model/giấy phép/tài nguyên/data policy tại P10; ERP vẫn hoạt động khi AI off |
| D12 | Một môi trường k3s + Argo CD **chỉ để chứng minh GitOps**, Compose vẫn là runtime dev/demo A/B/C | P00 đo tài nguyên; P12 chứng minh drift/reconcile hoặc ghi rõ gate chưa đạt |
| D14 | `receipt +`, `issue −`, `receiving +actual`, `stocktake ±variance`; transfer/sale chỉ link issue | Tests double movement, một issue outbound ↔ một transfer khớp lot/qty |
| D15 | Core Data/File API và DX-Lab là hai runtime riêng; core chạy khi tắt mọi UI | Smoke GET/POST structured record + scan/upload/download và Flowable/gateway/SSO không có UI |

Node/Next/React/Tailwind version hiện theo `package.json` + lockfile, không suy từ tài liệu online. Mọi image/service khác ghi **version, digest, license, source URL, RAM đo được** vào ADR trước P01; không ghi `latest` trong release. Các tài liệu chính thức để spike: [APISIX OIDC](https://apisix.apache.org/docs/apisix/plugins/openid-connect/), [Keycloak admin](https://www.keycloak.org/docs/latest/server_admin/), [Flowable REST](https://www.flowable.com/open-source/docs/bpmn/ch14-REST), [SeaweedFS](https://github.com/seaweedfs/seaweedfs).

## 3. Quy ước dữ liệu và API bắt buộc

- UUID do application sinh; PG `uuid` PK. Mọi timestamp `timestamptz` UTC, date nghiệp vụ `date`. `created_at` là server timestamp; không nhận actor/confirmed time từ body.
- `numeric(20,3)` lưu DB, JSON decimal string. Validate unit tại domain; không cộng `EA` với `KG`. Không dùng JS Number cho phép tính stock; adapter đọc PG numeric thành string/Decimal.
- `version integer NOT NULL DEFAULT 1 CHECK(version>0)` cho aggregate mutable. Ghi `UPDATE ... WHERE id=$1 AND version=$2`, tăng version; 0 row → 409. Mọi unique/FK/check của `database-schema-v1.md` phải nằm ở migration, không chỉ ở TypeScript.
- Các action bắt buộc trong `api-payloads-v1.md` có `Idempotency-Key` UUID/string 16–128 ký tự; scope `(actor_sub hoặc client_id, method, route, key)`, lưu payload SHA-256. Cùng key + hash trả kết quả cũ; khác hash → 409; concurrent calls chỉ một effect. Federation inbound dùng `messageId`/payload hash riêng, không dựa header này.
- Response lỗi `{code,message,requestId,details?}`; không trả SQL/stack/secret. List dùng `limit` mặc định 20, tối đa 100 và opaque cursor; sort/filter allowlist, không cho raw SQL.
- Business API ở `/api/v1/*`; gateway ưu tiên `/api/v1/core/*`, `/api/v1/files/*` tới core API, `/api/v1/federation/*` M2M, `/api/v1/public/*` anonymous. App và core tự verify authz, không tin identity header từ client.
- Các route và payload cụ thể ở `api-contracts.md`, schema ở `database-schema-v1.md`, event ở `event-contracts.md`. Nếu khác ở code, sửa hợp đồng trước gate.

## 4. Hợp đồng giao việc cho một task

Một task chỉ được giao AI sau khi gate phụ thuộc và ADR của task đã đóng. Prompt kèm `AGENTS.md`, phase file, các contract liên quan, trạng thái repo và giới hạn ngoài MVP. Kết quả task phải có: **diff tệp**, migration/contract khi đổi dữ liệu, ít nhất một happy + một negative test có ý nghĩa, lệnh kiểm thử và output, chứng cứ gate, cập nhật tài liệu liên quan. Nếu API/service chưa tồn tại, AI phải xây lát cắt thật hoặc ghi dependency blocker; không mock rồi đánh dấu `[x]`.

Không bắt buộc tạo mọi tệp trong một commit. Các đường dẫn trong task dossier là đích gợi ý theo `FOLDER_STRUCTURE.md`; đổi tên được nếu một ADR ghi lý do, sửa mọi import/link/test theo tên mới và không làm trôi trách nhiệm context.
