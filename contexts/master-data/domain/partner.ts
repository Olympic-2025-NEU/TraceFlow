import { DomainError } from "@/platform/kernel/errors";
import type { TenantId } from "@/platform/kernel/id";

export type PartnerRole = "customer" | "supplier" | "both";

export type Partner = {
  id: string;
  tenantId: TenantId;
  code: string;
  name: string;
  role: PartnerRole;
};

export function createPartner(input: Partner): Partner {
  if (!input.code.trim() || !input.name.trim()) {
    throw new DomainError("PARTNER_IDENTITY_REQUIRED", 422);
  }
  return input;
}
