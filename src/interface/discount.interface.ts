import { OrderInterface } from "./order.interface"

export interface DiscountServiceInterface {
    calculateBundleDiscount(order: OrderInterface): number
    calculateTotalDiscount(order: OrderInterface, subTotal: number): number
}