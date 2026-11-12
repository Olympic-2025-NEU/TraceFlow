import { DomainError } from "@/platform/kernel/errors";
import type { TenantId, UserId } from "@/platform/kernel/id";
import { applyAction, type ProcessAction } from "@/platform/workflow/process";

export const purchaseOrderActions = {
  submit: { name: "submit", from: ["draft"], to: "submitted" },
  approve: {
    name: "approve",
    from: ["submitted"],
    to: "approved",
    forbidSelfDecision: true,
  },
  reject: {
    name: "reject",
    from: ["submitted"],
    to: "rejected",
    requiresReason: true,
    forbidSelfDecision: true,
  },
} as const satisfies Record<string, ProcessAction>;

export type PurchaseOrderStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected";

export type PurchaseOrder = {
  id: string;
  tenantId: TenantId;
  supplierId: string;
  createdBy: UserId;
  status: PurchaseOrderStatus;
};

export const receiptPosted = "procurement.receipt.posted";

export function actOnPurchaseOrder(
  order: PurchaseOrder,
  action: ProcessAction,
  actorId: UserId,
  reason?: string,
): PurchaseOrder {
  if (!order.supplierId.trim()) {
    throw new DomainError("SUPPLIER_REQUIRED", 422);
  }
  const status = applyAction({
    status: order.status,
    action,
    actorId,
    creatorId: order.createdBy,
    reason,
  }) as PurchaseOrderStatus;
  return { ...order, status };
}
