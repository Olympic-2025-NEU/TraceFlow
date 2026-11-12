import { DomainError } from "@/platform/kernel/errors";
import type { TenantId, UserId } from "@/platform/kernel/id";
import { applyAction, type ProcessAction } from "@/platform/workflow/process";

export const salesOrderActions = {
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

export type SalesOrderStatus = "draft" | "submitted" | "approved" | "rejected";

export type SalesOrderLine = {
  itemId: string;
  quantity: number;
};

export type SalesOrder = {
  id: string;
  tenantId: TenantId;
  customerId: string;
  createdBy: UserId;
  status: SalesOrderStatus;
  lines: readonly SalesOrderLine[];
};

export const salesOrderConfirmed = "sales.order.confirmed";

export function createDraft(input: {
  id: string;
  tenantId: TenantId;
  customerId: string;
  createdBy: UserId;
  lines: readonly SalesOrderLine[];
}): SalesOrder {
  if (input.lines.length === 0) {
    throw new DomainError("LINES_REQUIRED", 422);
  }
  if (input.lines.some((line) => line.quantity <= 0)) {
    throw new DomainError("QUANTITY_INVALID", 422);
  }
  return { ...input, status: "draft" };
}

export function actOnSalesOrder(
  order: SalesOrder,
  action: ProcessAction,
  actorId: UserId,
  reason?: string,
): SalesOrder {
  const status = applyAction({
    status: order.status,
    action,
    actorId,
    creatorId: order.createdBy,
    reason,
  }) as SalesOrderStatus;
  return { ...order, status };
}
