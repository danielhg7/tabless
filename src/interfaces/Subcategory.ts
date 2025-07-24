import { MenuItem } from "./MenuItem"

export interface Subcategory {
    id: string,
    name: string,
    type: string
    items: MenuItem[]
}