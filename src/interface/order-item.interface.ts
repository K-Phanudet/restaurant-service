import { AddOnItem } from "../domain/entities/add-on-item"
import { Item } from "../domain/entities/item"

export interface OrderItemInterface {
    id: string
    item: Item
    addOns: AddOnItem[]
    getTotalPrice(): number
}