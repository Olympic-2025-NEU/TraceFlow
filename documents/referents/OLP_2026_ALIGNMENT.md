# Đối chiếu Nexora với OLP PMNM 2026

> Ảnh chụp hiện trạng repo ngày 14/11/2026. Đây là bản ghi ràng buộc và khoảng trống để nhóm lập plan, không phải plan triển khai hoặc xác nhận sản phẩm đã đạt tiêu chí dự thi.

## Nguồn và cách đọc

- Đề thi: `Đề thi phần mềm nguồn mở - OLP 2026.pdf`, mục 2–4 và 5–6.
- Hướng dẫn: `Quick-guide-to-DXOS.pdf`, mục 1–3.
- Thể lệ: `Thể lệ cuộc thi phần mềm nguồn mở - OLP 2026.pdf`, trang 1–3.
- Proposal: `Nexora - NEU.OPUS5.5.pdf`, Chương 6 và Chương 7, đặc biệt §7.11–7.17.
- Bốn PDF trên do nhóm cung cấp ở thư mục cha của repo, không nằm trong repository. Nếu bản đề/thể lệ chính thức thay đổi, cần cập nhật bản đối chiếu này.

Điều kiện bắt buộc trong đề thi/thể lệ có ưu tiên cao hơn ngoại lệ ở plan nội bộ. Bảng bảy lớp công nghệ trong đề thi được giới thiệu là **ví dụ tham chiếu**; Next.js/React thay cho Nuxt/Vue không phải sai công nghệ.

## Các ràng buộc đã chốt

| Ràng buộc | Quyết định cho Nexora | Hiện trạng repo |
| --- | --- | --- |
| Phần mềm nguồn mở | GNU AGPL v3 only (`AGPL-3.0-only`), toàn văn trong `LICENSE` | Đã có `LICENSE`, metadata npm và `CHANGELOG.md`; thông báo SPDX từng tệp mã, kiểm tra quyền phát hành, release và truy cập công khai chưa hoàn tất |
| Lõi DX-OS headless | Tầng dịch vụ cung cấp SSO, API Gateway, dữ liệu cấu trúc/phi cấu trúc và Workflow qua API; không lấy UI Nexora làm lõi | Chưa có stack chạy được; `platform/` mới là ports, types và hàm mẫu |
| API Gateway | Bắt buộc, sản phẩm nguồn mở và cấu hình cụ thể để plan sau chọn | Chưa có; không thay bằng lời hứa Next.js + Keycloak là đủ |
| Workflow | Flowable chạy quy trình phê duyệt mẫu; state machine trong TypeScript chỉ là kiểm tra trạng thái nghiệp vụ | Chưa có Flowable hoặc process definition |
| Dữ liệu | Một instance/doanh nghiệp/DB; PostgreSQL và object storage tương thích S3, ưu tiên tự host cho demo | Compose chỉ có PostgreSQL; migration rỗng; chưa có storage adapter hoạt động |
| Ứng dụng minh họa | Chỉ rõ ít nhất một giao diện ở không gian H/P/D/I và cách nó tiêu thụ dịch vụ lõi | Chưa có UI nghiệp vụ; `app/page.tsx` là trang Next.js mặc định |
| Nghiệp vụ MVP | M01–M04 và AI01 theo Chương 6; demo A → B → C, DB riêng | Các context hiện hữu chủ yếu là scaffold cũ, chưa có luồng demo |
| AI | Tra cứu qua API đã phân quyền, tạo Draft để người dùng xác nhận | Chưa có AI service hoặc API nghiệp vụ để gọi |

## Chênh lệch giữa tài liệu nội bộ và đề thi

1. Đề thi mục 3 yêu cầu API Gateway trong lõi. Proposal §6.8 và §7.17 cũng liệt kê thành phần này, nhưng proposal §7.13 và plan `00-platform-dxos.md` từng cho phép chỉ dùng biên Next.js + Keycloak. Quyết định mới: gateway là bắt buộc; plan hiện đã được sửa, còn proposal PDF gốc vẫn là tài liệu lịch sử chưa chỉnh.
2. Đề thi yêu cầu lõi **không cung cấp UI**, phục vụ ứng dụng ở tầng trên. Next.js Modular Monolith vẫn phù hợp làm ứng dụng nghiệp vụ. Khi trình bày, phải phân biệt dịch vụ lõi headless với mã `platform/` và giao diện Next.js; chỉ có thư mục `platform/` không chứng minh PaaS đã hoạt động.
3. Đề thi mục 4 nêu bốn nguyên lý về vòng đời dữ liệu, hội tụ IT/OT, nguồn gốc/chất lượng dữ liệu và zero-trust gắn GitOps. Proposal có định hướng nhưng repo chưa có minh chứng vận hành; plan sau cần chọn minh chứng phù hợp với bài toán lô hàng, tránh tuyên bố đã triển khai toàn bộ kiến trúc tham chiếu.
4. Các quy trình sản xuất, QC nhiều bước, thu hồi đa cấp và POS đầy đủ ở các chương bối cảnh của proposal là tầm nhìn sau MVP. Chương 6 và `SOURCE_OF_TRUTH.md` giữ phạm vi MVP hẹp hơn; không dùng scaffold `sales`, `finance`, `procurement`, `master-data` làm bằng chứng hoàn thành M01–M04.
5. Đề thi mục 5 ghi hạn gửi bài là `06/12/2025`, trong khi thể lệ ghi lịch chấm và chung kết tháng 12/2026. Hai PDF không thống nhất; nhóm cần xác nhận mốc nộp bài với BTC trước khi chốt lịch, không lấy năm 2025 làm hạn của mùa 2026.

## Các quyết định kỹ thuật còn phải chốt khi thực thi

Kế hoạch chi tiết và thứ tự gate hiện nằm ở [documents/phase-plan/README.md](../phase-plan/README.md); `decision-log.md` trong thư mục đó ghi đề xuất và spike cần hoàn tất. Các mục dưới đây **chưa** có bằng chứng đã triển khai.

- Chốt sản phẩm API Gateway, object storage, cấu hình Keycloak/Flowable và topology Compose theo ADR; core data/file API không UI và DX-Lab frontend tầng 2 riêng theo D15 phải được spike/kiểm chứng.
- Chốt kịch bản DX-Lab H/P/D/I và mức minh chứng cho bốn nguyên lý ở mục 4 đề thi bằng evidence thật.
- Thay scaffold context cũ và `platform/modules.ts`/health tĩnh bằng cấu trúc Chương 6 khi bắt đầu triển khai; rà soát tên `tenantId` cũ để bảo đảm không thành SaaS nhiều doanh nghiệp chung DB.
- Xác định contract giao dịch, outbox, retry/dedupe, xác thực federation và bộ dữ liệu demo A → B → C; dùng AC-01…AC-13 để nghiệm thu.
- Trước release: bổ sung thông báo `SPDX-License-Identifier: AGPL-3.0-only` vào **từng tệp mã do nhóm viết**, kiểm tra giấy phép/quyền sở hữu tài sản và phụ thuộc, cung cấp liên kết mã nguồn cho người dùng qua mạng, duy trì changelog, có bug tracker, hướng dẫn build/deploy, CI và ít nhất một release.

Không đánh dấu AC nào đã hoàn thành chỉ dựa trên README, folder trống, interface TypeScript hoặc API health trả `ok` tĩnh.
