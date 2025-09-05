export type OrderStatus = "PENDING" | "IN_PREPARATION" | "READY" | "PAID";

export interface Order {
  id: string | null;
  tableId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}