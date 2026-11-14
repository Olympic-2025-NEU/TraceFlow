# Decision log và spike bắt buộc

Quyết định ở đây là **đề xuất có điều kiện**, chưa phải dependency đã cài. Mỗi ADR cần: câu hỏi, phương án, tiêu chí, spike lặp lại được, ảnh hưởng giấy phép/tài nguyên, lựa chọn, ngày và người chấp thuận. Không bắt đầu task phụ thuộc khi ADR liên quan chưa đóng.

| ID | Chốt trước | Đề xuất/điều kiện chấp nhận |
| --- | --- | --- |
| D01 Gateway | P01/P02 | Thử Apache APISIX vì có plugin OIDC/Keycloak và Compose; kiểm tra route private/public/M2M, nguồn mở, tag, phụ thuộc etcd và RAM. Nếu không đạt, chọn gateway nguồn mở khác có cùng test, không thay bằng reverse proxy chỉ route URL. |
| D02 Object storage | P01/P03 | Chọn server S3-compatible tự host có image/source tái lập, ký URL và backup. SeaweedFS là ứng viên; nếu dùng MinIO Community cần xác minh cách build/phân phối hiện hành, không mặc định có image community mới. |
| D03 Database adapter/migration | P00/P03 | Chọn **một** cách truy cập PG (ví dụ `pg` + SQL có type, hoặc Drizzle) có transaction client được truyền qua port; migration versioned. Spike confirm + stock + outbox rollback. Không dùng mỗi context một transaction độc lập. |
| D04 Identity/session | P02 | Keycloak OIDC, authorization-code + PKCE cho người dùng; backend kiểm token/claims và quyền theo DB, gateway bảo vệ route. Quyết định session/BFF theo Next.js 16 docs trong `node_modules` khi bắt đầu code. |
| D05 Federation trust | P02/P05 | Receiver cấp confidential client/service account cho partner trong realm của receiver, token client-credentials ngắn hạn; partner mapping cố định theo `client_id`/scope, không tin org ID từ body. Chứng minh A/B/C độc lập. |
| D06 Workflow process | P04/P07 | Baseline Flowable OSS REST/BPMN `goods-issue-approval` cho **mọi** GoodsIssue v1, Approver khác creator, poller/reconciler state về app. Spike chốt process key/version, timeout, retry và REST/history trên phiên bản pin; không dùng H2/mật khẩu demo trong release. |
| D07 Decimal/unit/lot | P00/P06 | Chốt đơn vị cơ sở, precision `numeric`, quy tắc hàng rời/hàng chiếc, uniqueness lot theo issuer và product. Không dùng JS float cho tồn; test làm tròn và concurrent issue. |
| D08 Trace/federation contract | P00/P08 | Event envelope có version, issuer, event/message IDs, occurred/published times, **origin lot và sender-local lot tách biệt**, upstream references, source document/evidence và sharing policy. Quyết định quyền chuyển tiếp upstream summary tới C và downstream impact summary ngược tới A; không suy diễn lô cùng tên là cùng nguồn. |
| D09 AI provider | P10 | Python service + LLM có thể tự host hoặc external theo cấu hình. Không gửi secret/PII sang external mặc định; AI chỉ gọi tool allowlist qua API có authz, không tự confirm. Chốt model, data policy, timeout, quota và fallback. |
| D10 H-P-D-I proof | P00/P11 | Chọn workspace tầng 2 cụ thể: H danh tính/hộp việc, P phê duyệt + giao nhận, D timeline/điều hành lô, I AI tra cứu/Draft. Chỉ gọi là minh họa khi UI chạy qua lõi thật. |
| D11 Bốn nguyên lý §4 | P00/P12 | Chốt minh chứng có thể demo cho lifecycle dữ liệu, IT/OT, lineage/quality, zero-trust/GitOps. Xác minh với BTC mức bắt buộc nếu có diễn giải khác; giữ phương án kỹ thuật trong Phase 12. |
| D12 GitOps demo | P12 | Compose + CI là IaC/CI, không tự động là GitOps. Nếu cần minh chứng GitOps đúng nghĩa, dùng môi trường k3s/Argo CD riêng với desired state trong Git và drift/reconcile test; không đổi toàn bộ dev stack khi chưa có tài nguyên. |
| D13 Phiên bản/giấy phép | P01/P13 | Pin image digest, lockfile, SBOM/license inventory; xác minh giấy phép của Flowable OSS, gateway, storage, model/SDK; không dùng sản phẩm enterprise không thể build từ source. |
| D14 Movement ownership | P00/P07 | Chốt chính xác chứng từ nào đổi tồn. Đề xuất: GoodsReceipt +, GoodsIssue −, ReceivingConfirmation + theo actual, Stocktake theo variance; PartnerTransfer và SaleRecord chỉ tham chiếu GoodsIssue, không trừ thêm. Một outbound issue ↔ một transfer cùng lot/qty trong MVP. Test chống double movement. |
| D15 Ranh giới headless/tầng 2 | P00/P01 | Bắt buộc chứng minh lõi không cấp UI: tách runtime core data/file API không UI khỏi Next ERP và một DX-Lab app tầng 2 riêng (có thể cùng monorepo). Core API phục vụ structured metadata/projection + file qua gateway; ERP vẫn sở hữu transaction stock/document/audit/outbox trong một app DB. Smoke core khi tắt cả hai UI. ADR chốt contract/runtime/resource. |

### Ghi chú về lựa chọn công nghệ

- [APISIX OIDC plugin](https://apisix.apache.org/docs/apisix/plugins/openid-connect/) hỗ trợ Keycloak; [hướng dẫn cài](https://apisix.apache.org/docs/apisix/installation-guide/) nêu chế độ Compose/etcd. Đây là lý do chọn **ứng viên**, không phải kết quả spike.
- [Flowable OSS REST](https://www.flowable.com/open-source/docs/bpmn/ch14-REST) có API engine; cấu hình mặc định có thể dùng H2, nên plan buộc DB bền vững và auth riêng.
- [SeaweedFS](https://github.com/seaweedfs/seaweedfs) có S3 API và giấy phép Apache-2.0; [MinIO Community](https://github.com/minio/minio) hiện mô tả phân phối community dưới dạng source-only. Kiểm lại trạng thái tại thời điểm chọn sản phẩm.
- [Argo CD](https://argo-cd.readthedocs.io/en/stable/) là controller GitOps đối chiếu trạng thái thực với Git; chỉ dùng nhãn “GitOps” khi có bằng chứng reconcile tương ứng.
