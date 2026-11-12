import type { Actor } from "../identity/actor";

/** Phạm vi dòng, cùng nghĩa với DX-OS: all, read, own, unit, assigned. */
export const rowScopes = ["all", "read", "own", "unit", "assigned"] as const;

export type RowScope = (typeof rowScopes)[number];

export type RowAccess = {
  createdBy: string;
  unitId: string | null;
  assigneeId: string | null;
};

export function canTouch(
  actor: Actor,
  scopes: readonly RowScope[],
  row: RowAccess,
  write: boolean,
): boolean {
  return scopes.some((scope) => {
    if (write && scope === "read") return false;
    if (scope === "all" || scope === "read") return true;
    if (scope === "own") return row.createdBy === actor.userId;
    if (scope === "unit") {
      return row.unitId !== null && actor.unitIds.includes(row.unitId);
    }
    return row.assigneeId === actor.userId;
  });
}
