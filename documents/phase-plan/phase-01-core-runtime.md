# Phase 01 — Runtime lõi và cài đặt lại từ source

**Mục tiêu:** một instance dev có các tiến trình cần cho lõi headless và app, từ clone sạch, không bí mật trong Git. **Phụ thuộc:** G00. **Unblock:** P02/P03. Đây mới là hạ tầng sống, chưa tính đã hoàn tất SSO/Workflow.

## P01-T01 — Topology Compose và mạng

- [ ] Thiết kế service Next ERP, worker, **core data/file API không UI**, DX-Lab frontend tầng 2 (profile P11), PostgreSQL, Keycloak, gateway (+etcd nếu D01 yêu cầu), Redis, object storage, Flowable OSS REST, scanner ClamAV, optional AI; internal/public networks và volume riêng.
- [ ] Chỉ publish gateway (và cổng quản trị dev theo profile local), không publish PG/Redis/Flowable/storage admin/etcd ra Internet; document port map và hostname nội bộ.
- [ ] Đặt healthcheck/dependency readiness với timeout rõ, resource limits hợp lý cho máy demo; chốt pinned image tags/digests và giấy phép.
- **Đầu ra:** Compose dev và config template; **kiểm chứng:** `docker compose config` pass, `ps`/network inspect cho thấy chỉ cổng được phép public.

## P01-T02 — Build Next.js từ source và image app/worker

- [ ] Tạo Dockerfile nhiều stage dùng lockfile, non-root runtime, production artifact phù hợp Next 16; không copy `.env`, secret hoặc node_modules từ host.
- [ ] Build core data/file API không UI thành image riêng có health/port nội bộ; DX-Lab frontend có build/runtime riêng tại P11. Dùng shared package có version/contract, không import ngược UI vào core.
- [ ] Tách lệnh worker khỏi web nếu cần để dispatch outbox không phụ thuộc request life-cycle; cùng image có command khác được nếu module boundary giữ đúng.
- [ ] Build/run image trên clone sạch; ghi Node/image version và cách chuyển dev→release.
- **Đầu ra:** image app/worker tái lập; **kiểm chứng:** image build trong CI và run sau khi xóa cache build (không dựa máy tác giả).

## P01-T03 — PostgreSQL và migration runner

- [ ] Một PG instance stack có DB/role riêng cho app, Keycloak và Flowable; cấp quyền tối thiểu. Không dùng DB `postgres` chung cho mọi service.
- [ ] Chọn migration tool theo D03, tạo bảng version và script bootstrap; migration chạy một lần an toàn khi restart, không dựa initdb file chỉ chạy lúc volume rỗng.
- [ ] Test từ DB trống và DB đã migrate; backup/restore bản nền; bảo vệ credential qua env/secret reference.
- **Đầu ra:** migration workflow; **kiểm chứng:** repeat deploy không drop dữ liệu và migration history đúng.

## P01-T04 — Bootstrap Keycloak, gateway, Flowable, storage

- [ ] Keycloak realm/client import có thể lặp, tài khoản dev tạo an toàn, issuer/redirect URL cấu hình được; không commit admin password.
- [ ] Gateway có bootstrap route health, upstream core API và Next ERP, cấu hình admin API nội bộ; Flowable REST nối DB bền vững và health; storage tạo bucket/quarantine và credential tách.
- [ ] Kiểm tra startup ordering, crash/restart riêng từng service; không dùng H2 mặc định cho Flowable ở môi trường nghiệm thu.
- **Đầu ra:** service boots có persistence; **kiểm chứng:** restart container vẫn giữ realm/process test/bucket và gateway route.

## P01-T05 — Env, cấu hình và secret hygiene

- [ ] `.env.example` mô tả từng biến, default dev không an toàn được đánh dấu rõ; fail-fast khi biến bắt buộc thiếu, không log secret.
- [ ] Tách `BASE_URL`, issuer URL nội bộ/ngoài, gateway upstream, storage endpoint, DB URL, service credentials; test compose profile A/B/C có prefix/volume khác nhau.
- [ ] Có lệnh kiểm tra secret vô tình commit và tài liệu rotate; không hardcode credential mẫu vào release.
- **Đầu ra:** config matrix; **kiểm chứng:** clone mới điền env theo docs là boot được, thiếu biến trọng yếu báo lỗi rõ.

## P01-T06 — Health, logs và seed hạ tầng

- [ ] `live` phản ánh process; `ready` của **từng service** kiểm đúng dependency của nó bằng timeout (app không gọi ngược gateway gây vòng readiness). Smoke tổng hợp bên ngoài kiểm PG/gateway/Keycloak/core API/Flowable/storage; tránh trả `ok` tĩnh hoặc tiết lộ nội bộ công khai.
- [ ] Request/correlation ID qua gateway/app/worker, log JSON redacted; metrics cơ bản service up và worker queue depth (worker logic P04).
- [ ] Seed chỉ dữ liệu dev hạ tầng, idempotent; không seed user/secret production vào repo.
- **Đầu ra:** health/log baseline; **kiểm chứng:** tắt PG hoặc Flowable, readiness thay đổi có lý do và không lộ secret.

## P01-T07 — Gate G01 cài lại độc lập

- [ ] Một người khác clone từ Git, dùng chỉ README + `.env.example`, build ERP/core API images, chạy migration và Compose; ghi thời gian/lỗi thực tế.
- [ ] Dựng stack thứ hai với project name/volume/network/DB riêng; chứng minh không xung đột port/tên. Chưa cần federation.
- **Bằng chứng:** terminal log, `compose ps/config`, DB role list đã redacted, health dependency và SHA image.

## Hồ sơ giao AI theo từng task

Áp dụng `deployment-spec-v1.md`; sau P00, thay image placeholder bằng version/digest ADR đã kiểm.

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P01-T01 | Thay `deploy/docker-compose.yml` cũ bằng `deploy/compose.yml`, sửa mọi lệnh gọi trong README/scripts; thêm `deploy/instances/{a,b,c}.env.example`, `deploy/README.md`; service matrix trong `deployment-spec-v1.md`, `edge/internal` networks và volume per project. | Chỉ một Compose entrypoint; `docker compose ... config` cho A/B/C pass; inspect không thấy PG/Redis/Flowable/etcd/storage admin public; mỗi project name/port khác nhau. |
| P01-T02 | `Dockerfile` ERP, `services/core-data/Dockerfile`, worker entrypoint, `.dockerignore`; `package.json` script build cả hai. | `npm ci && npm run build` và image build từ checkout sạch; container non-root, image không chứa `.env`/host `node_modules`; worker chạy khi web process tắt. |
| P01-T03 | Thay `db/migrations/0001_platform.sql` rỗng bằng **một** `0001_platform_core.sql` đầy đủ `audit_log/attachment/core_record` theo schema v1; `db/migrate.ts`, DB bootstrap roles `app_runtime/core_data/keycloak/flowable/migrator`; không dựa initdb mount rỗng. | Migrate DB trống rồi chạy lại không lỗi/không drop row; schema/roles đúng; checksum/version migration lưu lại; P03 không sửa migration 0001 đã áp dụng. |
| P01-T04 | `deploy/keycloak/realm-template.json`, `deploy/apisix/routes.yaml`, `deploy/seaweedfs/bucket-policy.json`, Flowable DB/config và bootstrap script idempotent. | Restart từng service giữ realm/client, route, bucket, Flowable process data; default password bị thay, admin plane internal. |
| P01-T05 | `.env.example` + parser typed/fail-fast cho biến ở `deployment-spec-v1.md`; `deploy/scripts/bootstrap.ps1` và `.sh` không chứa secret. | Thiếu từng nhóm biến báo tên biến, không in giá trị; A/B/C dùng credential/namespace riêng; secret scan pass. |
| P01-T06 | `/api/v1/health/live|ready` cho ERP/core API, health worker, log JSON có `requestId`; smoke script ngoài gateway. | Tắt PG làm ERP/core ready fail, tắt Flowable làm workflow readiness/alert fail, không tạo vòng gateway↔app; public không lộ dependency detail. |
| P01-T07 | `evidence/G01.md` gồm clean-clone commands, compose config/ps, image digest, DB identity query và thời gian cài. | Người khác dựng một stack, sau đó stack thứ hai không xung đột; script khởi động không cần tệp bí mật có sẵn trên máy tác giả. |
