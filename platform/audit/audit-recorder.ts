import type { TenantId, UserId } from "../kernel/id";

export type AuditEntry = {
  tenantId: TenantId;
  actorId: UserId;
  action: string;
  targetType: string;
  targetId: string;
};

export type AuditRecorder = {
  record(entry: AuditEntry): Promise<void>;
};
