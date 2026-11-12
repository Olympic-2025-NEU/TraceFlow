import { DomainError } from "@/platform/kernel/errors";
import type { TenantId } from "@/platform/kernel/id";

export type InvoiceSide = "receivable" | "payable";

export type InvoiceDraft = {
  id: string;
  tenantId: TenantId;
  side: InvoiceSide;
  sourceType: string;
  sourceId: string;
  partnerId: string;
  amount: number;
};

/** Finance tự lập hóa đơn từ sự kiện. Sales không ghi bảng công nợ. */
export function draftInvoice(input: InvoiceDraft): InvoiceDraft {
  if (input.amount <= 0) {
    throw new DomainError("AMOUNT_INVALID", 422);
  }
  if (!input.sourceType.trim() || !input.sourceId.trim()) {
    throw new DomainError("SOURCE_REQUIRED", 422);
  }
  return input;
}
