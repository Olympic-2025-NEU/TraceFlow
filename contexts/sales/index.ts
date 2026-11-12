export type { StockReservation } from "./application/ports";
export {
  actOnSalesOrder,
  createDraft,
  salesOrderActions,
  salesOrderConfirmed,
} from "./domain/sales-order";
export type {
  SalesOrder,
  SalesOrderLine,
  SalesOrderStatus,
} from "./domain/sales-order";
