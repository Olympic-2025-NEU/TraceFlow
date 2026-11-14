# Phase 11 — Ứng dụng H-P-D-I và UX xuyên module

**Mục tiêu:** một ứng dụng tầng 2 dùng lõi headless thật qua gateway, hoàn thành luồng demo bằng UI. **Phụ thuộc:** G02–G10, D10. **AC:** UI cho AC-02…12, bằng chứng H-P-D-I.

## P11-T01 — Chốt ứng dụng tầng 2 và bản đồ service

- [ ] Định nghĩa **DX-Lab Operations Workspace** là một ứng dụng frontend/runtime riêng tầng 2 trong cùng monorepo theo D15; H = môi trường làm việc cá nhân/SSO/hồ sơ, P = giao nhận/phê duyệt, D = tồn/trace/impact, I = AI tra cứu/Draft. Không tuyên bố bốn sản phẩm độc lập.
- [ ] Vẽ route→gateway→core data/file API/ERP business API→DB/storage/Flowable map và chứng minh UI không cần gọi trực tiếp DB hay API admin của engine. Core vẫn chạy/được smoke test khi cả DX-Lab và ERP UI tắt.
- [ ] ADR D10 ghi user journey tối thiểu cho Admin, Staff, Approver, Viewer và public; chọn dữ liệu A/B/C để dùng xuyên màn hình.
- **Đầu ra:** app map + service call trace; **kiểm chứng:** headless API script chạy độc lập UI.

## P11-T02 — Shell, session và điều hướng theo quyền

- [ ] Build/deploy frontend tầng 2 độc lập (`apps/dx-lab/` cùng Next/React), OIDC login/logout/session refresh, org/role context từ server, navigation có quyền; CI/build image riêng, không dựa vào ẩn nút để bảo mật.
- [ ] Route bảo vệ phản hồi 401/403/session-expired rõ, preserve intended path nếu an toàn; token không lộ qua browser logs/URL.
- [ ] Keyboard focus, semantic labels, mobile navigation, dark/light nếu nằm trong design scope; test viewport mobile/desktop và screen reader cơ bản.
- **Đầu ra:** app shell; **kiểm chứng:** Admin/Staff/Approver/public nhìn đúng luồng, backend vẫn chặn đường vòng.

## P11-T03 — H: tổ chức và người dùng

- [ ] Trang công việc cá nhân có approval/receiving tasks, tệp/hồ sơ liên quan qua core file API, org profile, membership/role và partner connection dùng M01 API; trạng thái kết nối/rotation chỉ hiển thị metadata an toàn.
- [ ] Form validation, optimistic conflict, save/error/permission-denied; Admin có thể mời/disable, Staff không truy cập route admin.
- [ ] Handoff từ H sang P: actor và partner được chọn đúng trong giao dịch, không đổi org ID trong request.
- **Đầu ra:** H journey; **kiểm chứng:** AC-02 qua UI trên A/B/C.

## P11-T04 — P: giao dịch, nhận hàng và approval inbox

- [ ] Product/batch/warehouse picker, receipt/issue/transfer Draft editor; hiển thị quantity/unit/expiry/quality/balance và validation từ server.
- [ ] Approval inbox liên kết Flowable task; approve/reject trả `decision_pending` tới khi worker/poller đối soát, reject cần reason; sau đó người có quyền confirm; người tạo không tự duyệt theo D06 v1.
- [ ] Receiver thấy sent vs actual, discrepancy và technical ACK tách khỏi business receipt; UI retryable/offline/rejected states và lịch sử action.
- **Đầu ra:** P journey; **kiểm chứng:** AC-03/04/06/12 thực hiện được không mở DB/Flowable admin UI.

## P11-T05 — D: tồn, timeline và impact

- [ ] Dashboard tồn theo lô/kho, document history, A→B→C timeline với source/verification/gap/staleness; link tới bằng chứng clean có quyền.
- [ ] Backward và forward trace từ một lô, affected partner/document list, filters/pagination; dùng số liệu từ API, không hardcode fixture vào UI.
- [ ] Passport public mobile và QR scan có design dễ đọc, chỉ field allowlist; trường private không xuất hiện ở DOM/network response.
- **Đầu ra:** D journey; **kiểm chứng:** AC-07/08/09 UI và privacy snapshot.

## P11-T06 — I: AI panel và human-in-loop

- [ ] Panel hỏi lot có disambiguation, source citations, trạng thái thiếu dữ liệu và quyền; loading/timeout/fallback truy vấn trực tiếp.
- [ ] Draft suggestion mở form M03 với dữ liệu AI đề xuất, người dùng xem/sửa và thực hiện action riêng; UI không tự confirm khi model trả “đã xong”.
- [ ] Thể hiện AI source/time và cảnh báo giới hạn trong ngữ cảnh, không che giấu trạng thái partner-asserted.
- **Đầu ra:** I journey; **kiểm chứng:** AC-10/11 qua UI với role ít quyền và provider down.

## P11-T07 — Luồng xuyên module và trạng thái lỗi

- [ ] Tạo navigation/notification link từ transfer tới receiver inbox, từ receipt tới trace, từ risk insight tới batch/document; URL an toàn và permission check ở từng đích.
- [ ] Empty/loading/error/409 conflict/429 rate limit/503 core down/retry states có thông điệp hành động được, không làm người dùng double-submit.
- [ ] Dữ liệu A/B/C được tạo bằng seed/API; test e2e bằng browser cho kịch bản chính và ít nhất một kịch bản lỗi mạng.
- **Đầu ra:** UX e2e suite; **kiểm chứng:** người ngoài nhóm chạy được kịch bản bằng runbook.

## P11-T08 — Khả dụng, đo lường và gate G11

- [ ] Kiểm tra keyboard/tab order, labels, contrast, responsive, long strings, timezone/decimal, QR trên điện thoại; sửa blocker demo.
- [ ] Ghi service-call trace cho từng vùng H/P/D/I và test tắt cả DX-Lab/ERP UI vẫn gọi được core API qua gateway. Không dùng mock làm bằng chứng gate.
- **Bằng chứng:** e2e run/video đã redacted, accessibility checklist, gateway traces, UI screenshots trên mobile/desktop.

## Hồ sơ giao AI theo từng task

| Task | Tệp/đầu ra cụ thể | Điều kiện kiểm chứng trước khi đóng |
| --- | --- | --- |
| P11-T01 | `apps/dx-lab/` Next frontend riêng + `ui-ai-spec-v1.md` route map H/P/D/I; diagram gateway→core/ERP services. | Tắt DX-Lab/ERP UI vẫn smoke core SSO/gateway/data/file/Flowable; app tầng 2 không DB credential. |
| P11-T02 | `apps/dx-lab/app/(workspace)/layout.tsx`, auth callback/session/nav, typed `lib/api-client` từ OpenAPI. | Login/logout/expiry/deep link, 401/403 và role nav; cookie/token không log/URL/localStorage trái ADR. |
| P11-T03 | `/work`, `/profile`, `/admin/members`, `/admin/partners`; `ApprovalInbox` preview, org/user/partner forms theo API spec. | Admin edit, Staff 403; secretRef write-only; A/B/C org context đúng, empty/error/409 states. |
| P11-T04 | `/operations/{receipts,issues,transfers,receivings}`, `/work/approvals`; `BatchPicker`, `DocumentEditor`, `ReceivingCompare`, `ApprovalInbox`. | UI làm AC-03/04/06/12, sent vs actual tách ACK, reject/self-approve/server 403, double submit không nhân movement. |
| P11-T05 | `/data/inventory`, `/data/lots/[id]`, `/data/impact/[id]`, `/passport/[token]`; `TraceTimeline/ImpactGraph/PassportView`. | AC-07/08/09 qua UI, mobile QR, gap/source/asOf/verification rõ; DOM/network public không private fields. |
| P11-T06 | `/assistant` + `AiPanel/DraftReview`, tool source list và editable Draft link. | AC-10/11 UI; provider down fallback, user thiếu quyền tool 403, AI không tự confirm. |
| P11-T07 | Navigation/notification cross-link, loading/empty/409/429/503 states, Playwright A/B/C fixtures. | Người không viết UI hoàn thành A→B→C bằng browser, lỗi mạng không mất Draft hoặc double confirm. |
| P11-T08 | `evidence/G11.md` viewport 360px/desktop, keyboard/labels/contrast, e2e logs, gateway trace theo H/P/D/I. | DX-Lab build/run riêng và gọi core/ERP thật; mock/screenshot không đủ gate. |
