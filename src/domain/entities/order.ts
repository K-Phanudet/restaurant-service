

import { OrderInterface } from "../../interface/order.interface"
import { Customer } from "./customer"
import { OrderItem } from "./order-item"

export class Order implements OrderInterface{
    id: string
    customer: Customer
    orderItems: OrderItem[]

    constructor(id: string, customer: Customer, orderItems?: OrderItem[]){
        this.id = id
        this.customer = customer
        this.orderItems = orderItems ?? []
    }

    addOrderItem(orderItem: OrderItem): void{
        this.orderItems.push(orderItem)
    }

    getTotalAmount(): number{
        return this.orderItems.reduce((total, orderItem)=> total + orderItem.getTotalPrice(), 0)
    }
}