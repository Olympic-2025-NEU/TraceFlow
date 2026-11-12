import type { TenantId } from "../kernel/id";

/** Ghi trong cùng giao dịch với thay đổi nghiệp vụ. Gửi đi sau khi commit. */
export type OutboxMessage<TPayload = unknown> = {
  tenantId: TenantId;
  type: string;
  payload: TPayload;
};

export type Outbox = {
  enqueue(message: OutboxMessage): Promise<void>;
};
