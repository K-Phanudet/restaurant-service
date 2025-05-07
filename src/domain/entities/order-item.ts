
import { OrderItemInterface } from "../../interface/order-item.interface"
import { AddOnItem } from "./add-on-item"
import { Item } from "./item"


export class OrderItem implements OrderItemInterface {
    id: string
    item: Item
    addOns: AddOnItem[]

    constructor(id: string, item: Item, addOns?: AddOnItem[]){
        this.id = id
        this.item = item
        this.addOns = addOns ?? []
    }

    getTotalPrice(): number{
        const basePrice = this.item.price
        const addOnsPrice = this.addOns.reduce( (total, addOn) => total + addOn.price, 0 )
        return basePrice +  addOnsPrice
    }
}