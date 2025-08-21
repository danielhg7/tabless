import { CategoryDocument } from "@/models/Category";
import { Restaurant } from "./Restaurant";
import { Item } from "./Item";

export interface MenuResponse {
    restaurant: Restaurant;
    categories: CategoryDocument[];
    items: Item[];
}