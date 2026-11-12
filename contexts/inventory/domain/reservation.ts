import { DomainError } from "@/platform/kernel/errors";

export type ReservationRequest = {
  capacity: number;
  alreadyReserved: number;
  requested: number;
};

/** Cùng vai trò BookingGuard của DX-OS: không giữ quá sức chứa đang có. */
export function assertCanReserve(input: ReservationRequest): void {
  if (input.requested <= 0) {
    throw new DomainError("QUANTITY_INVALID", 422);
  }
  if (input.alreadyReserved + input.requested > input.capacity) {
    throw new DomainError("CAPACITY_EXCEEDED");
  }
}
