import { Item } from "./Item";

export type CartItemStatus = 'ADDED' | 'ORDERED' | 'DELIVERED';

export interface CartItem extends Item {
  count: number;
  status: CartItemStatus;
}
  