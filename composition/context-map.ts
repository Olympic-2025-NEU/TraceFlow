import { receiptPosted } from "@/contexts/procurement";
import { salesOrderConfirmed } from "@/contexts/sales";

/**
 * Hướng phụ thuộc giữa các context.
 * Downstream nghe sự kiện. Không context nào import domain của context khác.
 * Platform không được import file này.
 */
export const contextMap = [
  {
    event: salesOrderConfirmed,
    upstream: "sales",
    downstream: ["inventory", "finance"],
  },
  {
    event: receiptPosted,
    upstream: "procurement",
    downstream: ["inventory", "finance"],
  },
] as const;
