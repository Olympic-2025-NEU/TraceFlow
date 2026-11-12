import { DomainError } from "../kernel/errors";

export type ProcessAction = {
  name: string;
  from: readonly string[];
  to: string;
  requiresReason?: boolean;
  forbidSelfDecision?: boolean;
};

export type ActionInput = {
  status: string;
  action: ProcessAction;
  actorId: string;
  creatorId: string;
  reason?: string;
};

/**
 * Trạng thái chỉ đổi qua hành động.
 * Người tạo không tự quyết định khi cờ forbidSelfDecision bật.
 * Từ chối và trả lại bắt buộc có lý do.
 */
export function applyAction(input: ActionInput): string {
  if (!input.action.from.includes(input.status)) {
    throw new DomainError("WRONG_STATE");
  }
  if (input.action.requiresReason && !input.reason?.trim()) {
    throw new DomainError("REASON_REQUIRED", 422);
  }
  if (input.action.forbidSelfDecision && input.actorId === input.creatorId) {
    throw new DomainError("SELF_DECISION", 403);
  }
  return input.action.to;
}
