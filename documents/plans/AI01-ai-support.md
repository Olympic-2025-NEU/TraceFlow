# Plan: AI01 — AI Support

> Plan tổng quan. DevOps bổ sung chi tiết hệ thống, giao diện, kiểm thử, kết nối trước khi code sâu.

## 1. Mục tiêu / phạm vi MVP

| Mã | Chức năng |
| --- | --- |
| NX-AI-01 | Product & Lot Query |
| NX-AI-02 | Traceability Assistant |
| NX-AI-03 | Document Draft Assistant |
| NX-AI-04 | Batch Risk Assistant |

Folder: `services/ai/`.

Ưu tiên MVP: tra cứu nguồn gốc một lô; tạo một loại chứng từ draft bằng ngôn ngữ tự nhiên; cảnh báo HSD / sự kiện bất thường theo quy tắc.

## 2. Ngoài phạm vi

- OCR hóa đơn
- AI tự confirm / phê duyệt
- Phân tích rủi ro nâng cao, kết luận hàng giả không căn cứ
- Điều phối đa nghiệp vụ tự động

## 3. Phụ thuộc / cung cấp

| Hướng | Nội dung |
| --- | --- |
| Phụ thuộc | Platform (authz), API M02/M03/M04 |
| Cung cấp | Chat UI tools; không sở hữu dữ liệu nghiệp vụ |

AI gọi tool = API đã phân quyền của user hiện tại.

## 4. Aggregate / sự kiện chính

- Không aggregate ERP mới bắt buộc
- Tool-call audit dùng `platform.audit_log` action `ai.tool.*`; MVP không bắt buộc bảng AI mới
- Risk rules: hết hạn, lệch số lượng receiving (rule-first; AI giải thích)

## 5. API bề mặt (dự kiến)

- `POST /api/v1/ai/chat` (hoặc service Python riêng được Next proxy)
- Tools nội bộ allowlist v1: `getLot`, `getStock`, `getTrace`, `createReceiptDraft`, `createIssueDraft`; rule hết hạn chạy deterministic trên dữ liệu M02, không có SQL/tool tự do

## 6. UI bề mặt

- AI Assistant panel trong workspace
- Hiển thị tool result + nút mở chứng từ draft để user confirm

## 7. Kiểm thử tối thiểu

- Tool không vượt quyền user
- Draft only: không confirm qua AI
- AC-10, AC-11
- Prompt injection cơ bản: từ chối lệnh ngoài tool allowlist

## 8. Tiêu chí Done

- [ ] AC-10, AC-11
- [ ] Allowlist tool rõ ràng trong code
- [ ] Tài liệu cấu hình LLM/API key không commit secret

## 9. Ghi chú DevOps

Chi tiết hóa: chọn model, host Python vs edge function, quota, logging PII, UX tiếng Việt, bộ rule cảnh báo HSD.
