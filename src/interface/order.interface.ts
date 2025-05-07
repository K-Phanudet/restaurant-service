import { OrderItem } from "../domain/order-item"
import { CustomerInterface } from "./customer.interface"


export interface OrderInterface {
    id: string
    customer: CustomerInterface
    orderItems: OrderItem[]
    addOrderItem(orderItem: OrderItem): void
    getTotalAmount(): number
}