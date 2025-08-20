import { CategoryDocument } from "@/models/Category";
import { Restaurant } from "./Restaurant";
import { MenuItem } from "./Item";

export interface MenuResponse {
    restaurant: Restaurant;
    categories: CategoryDocument[];
    items: MenuItem[];
}