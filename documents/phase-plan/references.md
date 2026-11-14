# Nguồn yêu cầu và tài liệu kỹ thuật

## Nguồn yêu cầu tại workspace

Các PDF nằm ở thư mục cha của repo, không tự động đi cùng một bản clone mới: `../Đề thi phần mềm nguồn mở - OLP 2026.pdf`, `../Quick-guide-to-DXOS.pdf`, `../Thể lệ cuộc thi phần mềm nguồn mở - OLP 2026.pdf`, `../Nexora - NEU.OPUS5.5.pdf`. Bản nội bộ trong repo: `../nexora/Nexora - NEU.OPUS5.5.md`, `../referents/SOURCE_OF_TRUTH.md`, `../referents/ACCEPTANCE_MVP.md`, `../plans/*`, `../../ARCHITECTURE.md`. Nếu PDF và Markdown proposal lệch nhau, kiểm tra PDF gốc rồi cập nhật ADR.

## Tài liệu chính thức dùng để kiểm tra tính khả thi (14/11/2026)

| Chủ đề | Tài liệu | Dùng trong phase |
| --- | --- | --- |
| APISIX OIDC/Keycloak | [Plugin openid-connect](https://apisix.apache.org/docs/apisix/plugins/openid-connect/), [installation](https://apisix.apache.org/docs/apisix/installation-guide/) | 01–02; xác minh mode, route, bearer-only/authorization-code, etcd |
| Keycloak | [Server Administration Guide](https://www.keycloak.org/docs/latest/server_admin/) | 02/05/09; realm, service account, client-credentials, token endpoint |
| Flowable OSS | [REST API](https://www.flowable.com/open-source/docs/bpmn/ch14-REST), [configuration](https://www.flowable.com/open-source/docs/bpmn/ch03-Configuration) | 01/04/07; engine, auth, PostgreSQL |
| PostgreSQL | [Row locking](https://www.postgresql.org/docs/current/explicit-locking.html) | 03/06/07; cùng transaction, concurrent stock update |
| SeaweedFS | [Repository và S3 API](https://github.com/seaweedfs/seaweedfs) | 01/03; ứng viên storage tự host |
| MinIO Community | [Repository](https://github.com/minio/minio) | 01/03; nếu chọn, kiểm tra build/distribution hiện hành |
| ClamAV | [Docker guide](https://github.com/Cisco-Talos/clamav/blob/main/README.Docker.md) | 03; kiểm dịch file với signature database |
| Argo CD | [Core concepts](https://argo-cd.readthedocs.io/en/stable/core_concepts/) | 12; reconcile desired/live state |
| AGPL/SPDX | [GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html), [SPDX license list](https://spdx.org/licenses/) | 00/13; bản sao license, header, inventory |

Tài liệu online và image tags có thể đổi. Phase thực thi phải ghi phiên bản được chọn, commit/digest và link tài liệu đúng phiên bản; không suy từ trang `latest` rằng config đã hợp lệ cho image đã pin.
