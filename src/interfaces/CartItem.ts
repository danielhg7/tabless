import { Item } from "./Item";

export interface CartItem extends Item {
  count: number;
  status?: string;
}
  