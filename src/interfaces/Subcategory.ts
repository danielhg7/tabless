import { Item } from "./Item"

export interface Subcategory {
    id: string,
    name: string,
    type: string
    items: Item[]
}