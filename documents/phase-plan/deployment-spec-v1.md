# Runtime/deploy/CI blueprint v1

Đây là danh sách tệp và config để AI dựng hạ tầng. `deploy/docker-compose.yml` hiện chỉ có PostgreSQL và mount SQL rỗng; P01 thay/di chuyển nó sang `deploy/compose.yml`, cập nhật mọi script và README trong **cùng PR**, không để hai Compose file cùng được coi là entrypoint. `db/migrations/0001_platform.sql` rỗng cũng được thay bằng `0001_platform_core.sql`, không giữ hai migration số 0001. Những tệp sau là **đích phải tạo**. Image tag/digest của dịch vụ ngoài repo phải được ghi vào D01/D02/D06/D13 sau spike P00; không đoán tag hợp lệ hoặc dùng `latest` ở release.

## Layout đích

```text
deploy/
  compose.yml                 # một instance A/B/C qua project name + env
  .env.example                # tên biến, không giá trị secret
  instances/{a,b,c}.env.example
  apisix/routes.yaml          # public/user/M2M + upstream core/ERP/DX-Lab
  keycloak/realm-template.json
  flowable/processes/goods-issue-approval.bpmn20.xml
  seaweedfs/bucket-policy.json
  scripts/bootstrap.ps1, bootstrap.sh, smoke.ps1, smoke.sh
  gitops/                     # k3s/Argo CD demo P12
db/migrations/0001_*.sql ... 0009_*.sql
contracts/openapi/nexora-v1.yaml
contracts/events/*.schema.json
contracts/core-records/*.schema.json
.github/workflows/ci.yml
```

Không commit `.env`, realm export có secret, token, DB dump thật, private file hay API key. `bootstrap` đọc env, validate biến, chạy migration runner versioned, seed idempotent theo instance, provision realm/client/bucket/route/process bằng API hoặc import có retry; không chỉ dựa `docker-entrypoint-initdb.d`.

## Compose service matrix (một instance)

| Service | Network/volume | Readiness và dependency | Public port |
| --- | --- | --- | --- |
| `gateway` APISIX | `edge` + `internal`, config volume; etcd nội bộ nếu D01 dùng | route config loaded, OIDC discovery reachable, upstream checks có timeout | **duy nhất** HTTPS gateway; dev host port cấu hình riêng A/B/C |
| `erp` Next 16 | `internal`, app DB role | `/api/v1/health/ready` kiểm PG và dependency cần cho thao tác; không check gateway ngược | không |
| `core-data` | `internal`, role `core_data`, S3 credential giới hạn | PG platform tables, S3, scanner response; `/ready` không lộ secret | không |
| `worker` | `internal`, app DB role, Flowable/M2M credentials qua secret ref | worker heartbeat + outbox backlog | không |
| `dx-lab` | `internal`/edge upstream, no DB credential | Next process + gateway URL/config | chỉ qua gateway |
| `postgres` 17 | `internal`, volume app/Keycloak/Flowable DB tách | `pg_isready`, migration version riêng | không (dev localhost profile tùy chọn) |
| `keycloak` | `internal`, DB riêng/realm per instance | OIDC discovery/realm ready | chỉ route OIDC qua gateway hoặc trusted endpoint |
| `flowable` OSS REST | `internal`, DB riêng/process deployment | REST health/process definition | không admin public |
| `seaweedfs` S3 | `internal`, volume object riêng | S3 HEAD bucket/upload probe | không console public |
| `clamav` | `internal`, signature volume | daemon + signature age check | không |
| `redis` | `internal`, volume tùy use case | PING; mất Redis không mất outbox PG | không |
| `ai` Python | `internal`, optional profile | `/health`, provider check có timeout | không |

APISIX, Keycloak, Flowable, SeaweedFS, ClamAV có admin/management API chỉ internal. Không publish PG/Redis/etcd/storage/Flowable lên `0.0.0.0`. Test `docker compose config` và inspect `ports`/network; app và core tự verify token, không dựa mỗi gateway.

## Env contract

| Biến | Phạm vi | Kiểm tra khi boot |
| --- | --- | --- |
| `INSTANCE_ID`, `ORG_CODE`, `PUBLIC_BASE_URL`, `GATEWAY_HTTPS_PORT` | mỗi A/B/C | unique, URL HTTPS cho demo Internet, port không trùng |
| `APP_DATABASE_URL`, `CORE_DATABASE_URL`, `KEYCLOAK_DATABASE_URL`, `FLOWABLE_DATABASE_URL` | app/core cùng **app DB** nhưng role khác; Keycloak và Flowable mỗi bên DB/role riêng | app/core URL khác role, Keycloak/Flowable không trỏ app DB; không log URL credential |
| `OIDC_ISSUER_URL`, `OIDC_CLIENT_ID_ERP`, `OIDC_CLIENT_ID_DXLAB`, `OIDC_AUDIENCE`, `OIDC_JWKS_URL` | app/gateway | issuer exact, allowed redirect/callback |
| `PARTNER_OUTBOUND_CLIENT_ID`, `PARTNER_OUTBOUND_SECRET_REF`, `PARTNER_OUTBOUND_TOKEN_URL`, `PARTNER_OUTBOUND_AUDIENCE`, `PARTNER_INBOUND_CLIENT_ID` | từng connection/bootstrap; mapping ở `system.partner_connection` | chiều outbound lấy token từ realm receiver, chiều inbound map client do realm local cấp; secret external, scope tối thiểu; không đưa secret vào env example |
| `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET_QUARANTINE`, `S3_BUCKET_PRIVATE`, `S3_BUCKET_PUBLIC`, `S3_SECRET_REF` | core API | bucket/namespace riêng, least privilege |
| `FLOWABLE_BASE_URL`, `FLOWABLE_AUTH_REF`, `FLOWABLE_PROCESS_KEY` | worker/app | URL nội bộ, process definition tồn tại |
| `REDIS_URL`, `AI_BASE_URL`, `AI_PROVIDER`, `AI_KEY_REF` | theo profile | Redis không là source of truth, AI optional/fail isolated |

Biến thực tế có thể được nhóm đặt tên khác theo code, nhưng bảng mapping trong `.env.example` phải đầy đủ. Config parser fail-fast nếu thiếu URL/issuer/secret ref; output lỗi chỉ tên biến, không giá trị. Test một trường hợp thiếu/sai cho mỗi nhóm.

## Các lệnh chuẩn mà P00 phải thêm vào package/CI

`npm ci`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run db:migrate`, `npm run db:seed`, `npm run test:integration`, `npm run test:e2e`. Không khai script giả pass khi chưa có test; ở P00 có thể `test` trả thông báo chưa có suite và gate tương ứng chưa được đánh dấu Done. Docker smoke:

```powershell
docker compose -f deploy/compose.yml --env-file deploy/instances/a.env -p nexora-a config
docker compose -f deploy/compose.yml --env-file deploy/instances/a.env -p nexora-a up -d --build
docker compose -f deploy/compose.yml --env-file deploy/instances/a.env -p nexora-a ps
```

Lặp tương tự B/C với project name/port/volume/realm/credential khác. Script reset chỉ chấp nhận `DEMO_ONLY=true` và project name allowlist `nexora-a|b|c`; không xóa volume production. CI stages: install/lint/typecheck/build → migration empty+upgrade → PG integration → gateway/Keycloak/Flowable/storage/scan → A/B/C federation + Playwright → license/secret scan → image digest/SBOM release. Fail gate nếu stage bắt buộc chưa có.

## Health, backup và GitOps

- `/live` chỉ process; `/ready` chỉ dependency của service đó. Smoke ngoài gateway kiểm toàn stack; không tạo vòng app-ready→gateway→app. Kill PG/Flowable/storage và assert status/alert khác nhau.
- Backup app/Keycloak/Flowable DB + object bytes/checksum + config version/realm/BPMN; restore sang project khác, đối chiếu movement sum, outbox/inbox, attachment SHA, Flowable task, QR policy. Không ghi backup secret trong Git.
- P12 GitOps dùng `deploy/gitops/` với k3s + Argo CD cho một instance test (không thay Compose A/B/C); desired state từ commit/digest, drift test đổi replica/config an toàn và controller reconcile. Nếu tài nguyên không đủ, G12 ghi gap chưa đạt, không gọi Compose+CI là GitOps.
