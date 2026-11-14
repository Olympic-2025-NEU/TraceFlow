# DX-Lab UI và AI tool blueprint v1

Ứng dụng tầng 2 `apps/dx-lab/` dùng cùng stack Next/React/Tailwind của repo, build riêng, không DB credential. UI ERP trong `app/` có thể reuse component thuần hiển thị; mọi thao tác nghiệp vụ qua gateway API. Đây là route/component/state blueprint, không có mock được tính Done.

## Route và vai trò

| Vùng | Route đích trong DX-Lab | UI/state bắt buộc | API |
| --- | --- | --- | --- |
| H | `/work`, `/profile`, `/admin/members`, `/admin/partners` | Task inbox của tôi, org/role, partner connection metadata; Admin quản user/partner, không hiện secret | `/me`, organization/members/partners, core files |
| P | `/operations/receipts`, `/operations/issues`, `/operations/transfers`, `/operations/receivings`, `/work/approvals` | Draft forms có batch picker/quantity; sent-vs-actual; approver khác creator; pending/retry/dispute | M02/M03, Flowable bridge API |
| D | `/data/inventory`, `/data/lots/[id]`, `/data/impact/[id]` | balance theo lot/kho, timeline A→B→C, backward/forward, provenance/gap/asOf, document/attachment link | inventory, trace, core projections |
| I | `/assistant` và panel trên lot/document | Q&A nguồn, disambiguation lô, nguồn trích, AI Draft review, provider-down fallback | AI chat/drafts/tool calls |
| Public | `/passport/[token]` | QR mobile, public field allowlist, revoke/expired/unknown state | public Passport only |

`apps/dx-lab/app/(workspace)/...` tổ chức route group, `components/{shell,forms,tables,trace,ai}/` chỉ UI, `lib/api-client/` typed từ OpenAPI. Mỗi route có loading/empty/error/403/409/503; form disable double submit và giữ draft khi request retryable; ETag/version hiển thị conflict và reload. Keyboard focus/labels, mobile 360px, decimal/unit/timezone đúng. Route authorization ở server/API, ẩn navigation chỉ là UX.

## Component contract theo hành trình

- `BatchPicker`: tìm theo SKU/barcode/issuer/expiry, trả `{batchId,productId,unit,qualityStatus,availableQuantity}`; restricted/inspect hiển thị lý do và chặn Issue.
- `DocumentEditor`: lines có warehouse/batch/quantity/unit, validate tại client để phản hồi nhanh nhưng server vẫn quyết định; Draft save không đổi stock; Confirm yêu cầu ETag+Idempotency-Key và có UI state `submitting|pending_approval|approved|confirmed|conflict`.
- `ReceivingCompare`: cột sent/actual/difference và source transfer, required reason khi khác; technical ACK hiển thị trạng thái riêng, không tự điền actual=sent.
- `ApprovalInbox`: task Flowable qua backend, approve/reject reason, creator bị chặn server; engine down hiện chờ, không nút bypass.
- `TraceTimeline/ImpactGraph`: mỗi node có issuer/source ID/occurredAt/verificationState, gap/stale rõ; cycle/depth limit, không suy diễn A verified chỉ từ B assertion.
- `PassportView`: request public projection, không render field raw/private vào DOM/network; QR revoked → 404/expired message an toàn.
- `AiPanel/DraftReview`: sources có timestamp/verification, AI suggestion editable; Draft chỉ sau user review mới mở nút submit/confirm nghiệp vụ thường.

## AI tool registry và dữ liệu

`services/ai/` nhận `{actorDelegation,requestId,message}` từ backend; `actorDelegation` scoped, short-lived, không phải Admin token chung. Tools có JSON Schema `additionalProperties:false`, tối đa 1–20 records/response, timeout và ghi mỗi tool call vào `platform.audit_log` với action `ai.tool.<name>`/source IDs/outcome đã redacted; không đòi bảng `ai_tool_call` ngoài `database-schema-v1.md`.

| Tool | Input | Output | Side effect/quyền |
| --- | --- | --- | --- |
| `getLot` | `{batchId? , originIssuerId?, originLotId?}`; `batchId` **hoặc cặp** issuer+lot là bắt buộc | `{batchId,product,originLot,qualityStatus,sourceIds,asOf}` | read M02 theo user scope; ambiguous → hỏi lại |
| `getStock` | `{batchId,warehouseId?}` | `{balances:[{warehouseId,quantity}],visibleTotalQuantity,unit,asOf,sourceIds,truncated}` | read M02 theo warehouse scope; nếu >20 kho thì `truncated:true` và AI chỉ nói tổng của phần đã trả, không gọi là toàn instance; không trả kho ngoài quyền |
| `getTrace` | `{batchId,direction:'backward'|'forward',depth<=5}` | `{nodes,edges,gaps,verificationStates,sourceIds}` | read M04 theo sharing policy |
| `createReceiptDraft` | `{warehouseId,batchId,quantity,unit,note?}` | `{draftDocumentId,status:'draft',warnings}` | Backend tra productId/baseUnit từ batch, POST M03 với user quyền; idempotency; không movement |
| `createIssueDraft` | `{warehouseId,batchId,quantity,unit,purpose:'partner_transfer'|'sale'|'other',note?}` | `{draftDocumentId,status:'draft',warnings,purpose}` | Backend tra productId/baseUnit từ batch, kiểm quyền/stock nhưng chỉ tạo Draft; nếu AI chưa biết purpose, hỏi hoặc chọn `other` rõ ràng; không submit/confirm |

Không đăng ký `confirm`, `approve`, `changePolicy`, `retryFederation` hay SQL tool. Model output là **đề xuất**, số liệu lấy từ tool output; nếu source thiếu, trả `unknown`/gap thay vì tự tạo số. AI service down/quota hết → 503 an toàn + UI link tra cứu trực tiếp, ERP vẫn làm việc.

Risk rules deterministic v1: `expires_on <= today+30d` (near expiry), `quality_status != available` (restricted/inspect), receiving actual<sent (discrepancy), trace có gap/partner_asserted; mỗi alert có `{ruleId,ruleVersion,sourceIds,asOf,severity,explanation}`. Rule không tự đổi status/tồn. Test prompt injection nằm trong product description/partner payload/file text, user không quyền, same lot code khác issuer, provider timeout, AI yêu cầu confirm; output Draft vẫn chưa đổi stock.
