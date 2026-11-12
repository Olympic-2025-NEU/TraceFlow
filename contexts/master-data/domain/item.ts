import { DomainError } from "@/platform/kernel/errors";
import type { TenantId } from "@/platform/kernel/id";

export type Item = {
  id: string;
  tenantId: TenantId;
  sku: string;
  name: string;
  unitCode: string;
};

export function createItem(input: Item): Item {
  if (!input.sku.trim() || !input.name.trim() || !input.unitCode.trim()) {
    throw new DomainError("ITEM_IDENTITY_REQUIRED", 422);
  }
  return input;
}
