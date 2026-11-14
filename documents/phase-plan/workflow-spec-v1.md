# Workflow `goods-issue-approval` v1 — Flowable OSS

Tài liệu này định nghĩa quy trình **một phiếu GoodsIssue** để AI viết `deploy/flowable/processes/goods-issue-approval.bpmn20.xml` và adapter. Flowable engine chỉ quyết định duyệt/từ chối; M03 `confirm` của người dùng mới trừ tồn. Đây là đề xuất v1 phải được spike D06 trên Flowable OSS REST + PG riêng trước khi đóng ADR.

## BPMN và biến

```text
start(issue submitted) → userTask Approve Goods Issue (candidateGroup=approver)
    → exclusiveGateway(decision)
       approved → end Approved
       rejected → end Rejected
```

Process key `goods-issue-approval`; businessKey = `approval_request.id` UUID (một process/request). Biến start: `approvalRequestId`, `documentId`, `creatorSub`, `warehouseIds`, `submittedAt`, `submittedDocumentVersion`, `lineSnapshotSha256`. Hash là JCS UTF-8 SHA-256 của các line `{lineNo,warehouseId,productId,batchId,quantity,unit}` sắp theo `lineNo`, lưu cùng local `approval_request`. Biến complete: `decision='approved'|'rejected'`, `decisionReason`, `approverSub`, `decidedAt`. Không đưa token, file private, buyer PII hoặc full chứng từ vào Flowable variables. `rejected` bắt reason nonblank; `approved` cho reason tùy chọn. Task candidate group `approver` nhưng **application** xác thực membership role/scope của **mọi warehouse trong issue** và `approverSub != creatorSub` trước khi gọi engine; engine REST chỉ nội bộ.

## Luồng tích hợp không distributed transaction

1. `POST /issues/{id}/submit` cần `If-Match` + `Idempotency-Key`, kiểm Draft/version/quyền/line/lot, trong **một app PG transaction** set `pending_approval`, tính/stash line hash và submitted document version, insert `approval_request(state=requested)` và outbox `workflow.approval.requested.v1`. Retry cùng key/body trả kết quả cũ, không tạo request/process thứ hai. Line bất biến từ submit trở đi; status có thể đổi và tăng document version.
2. Worker claim outbox/approval row, query Flowable `GET runtime/process-instances?businessKey=<approvalRequestId>`; nếu chưa có, `POST runtime/process-instances` với `processDefinitionKey`/businessKey/variables. Lưu `flowable_process_id`, state `pending`. BusinessKey Flowable không được giả định unique ở engine; local unique + một worker lease + reconciliation tránh double start. Nếu phát hiện >1 process cho businessKey, dừng confirm và alert operator.
3. App hiển thị task inbox từ adapter `GET runtime/tasks` lọc group/process. Approver gửi quyết định qua **ERP API** (không trực tiếp Flowable) với `If-Match` của approval + `Idempotency-Key`; app kiểm actor/role/toàn bộ warehouse scope/self-decision/version, trong app PG transaction ghi `decision_intent`, `decision_requested_by_sub/at`, `flowable_task_id`, state `decision_pending`, audit và outbox `workflow.approval.decision_requested.v1`. Trả `202 decision_pending`, không giữ PG transaction trong lúc gọi Flowable. Quyết định khác khi intent còn pending trả 409.
4. Worker claim outbox, recheck approval/task/process/actor scope và line hash; adapter `POST runtime/tasks/{taskId}` action `complete` với decision variables. Nếu response mất, query task/history/process theo businessKey/task ID trước retry; không complete task khác. Poller/reconciler đọc history/process state và đồng bộ local approval `approved|rejected` idempotent; không tin callback không xác thực. Document giữ `pending_approval` khi intent còn pending, rồi sang `approved|rejected` theo transaction local. Engine down giữ `decision_pending` + retry/alert; role bị thu hồi **trước dispatch** thì reset intent fields về NULL, approval về `pending`, ghi audit lý do, không complete. Đến muộn sau cancel/re-submit phải reject/correlation không khớp.
5. `POST /issues/{id}/confirm` chỉ khi local approval approved, **line hash hiện tại trùng snapshot đã duyệt**, request `If-Match` trùng document version hiện tại và actor có quyền **hiện tại**. Không so current document version với submitted version vì transition approve cũng tăng version. Confirm mới gọi Inventory port, audit, outbox. Đổi line sau submit bị chặn; muốn thay phải clone sang document ID mới, hủy process/request cũ.

## State/exception matrix

| Tình huống | Trạng thái local | Hành động hợp lệ |
| --- | --- | --- |
| Flowable down lúc start | `requested/starting` + outbox retry | UI “đang chờ engine”, không approve/confirm |
| Worker crash sau Flowable start trước lưu ID | `starting` | Query businessKey, gắn process đã có; không khởi động vô điều kiện |
| Task complete response mất | `decision_pending` tạm thời | Poll engine/history, đồng bộ đúng một decision; không hoàn thành task khác |
| Engine down sau quyết định | `decision_pending` + outbox retry | UI hiển thị chờ engine, không cho confirm/đổi quyết định |
| Creator tự approve | `pending` | 403, không tạo intent/outbox |
| Reject | `rejected` + reason/audit | không confirm; clone sang **document ID mới** rồi submit mới vì `approval_request.document_id` unique |
| Approve rồi sửa line/role bị thu hồi | `approved` cũ không đủ | 409/403; line sau submit bất biến, muốn thay phải clone document ID mới và submit lại; role hiện thời vẫn bị kiểm |
| Engine restart | Không mất process/task vì PG | Poller tiếp tục, process ID giữ |

Gate AC-12 cần Flowable deployment ID/version, process instance/task/history từ engine, local approval/document state, balance trước/sau và tests restart/retry/self-approval/reject. [Flowable REST official](https://www.flowable.com/open-source/docs/bpmn/ch14-REST) xác nhận endpoint start process, query businessKey và task action; pin version thực tế trong D06.
