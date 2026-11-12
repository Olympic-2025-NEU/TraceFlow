import type { TenantId } from "@/platform/kernel/id";

/**
 * Cổng do sales sở hữu.
 * Inventory hiện thực cổng này. Sales không import context inventory.
 */
export type StockReservation = {
  reserve(input: {
    tenantId: TenantId;
    orderId: string;
    lines: readonly { itemId: string; quantity: number }[];
  }): Promise<void>;
};
