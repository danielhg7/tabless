import { CategoryDocument } from "@/models/Category";
import { Restaurant } from "./Restaurant";
import { MenuItem } from "./MenuItem";

export interface MenuResponse {
    restaurant: Restaurant;
    categories: CategoryDocument[];
    items: MenuItem[];
}