import { OrderInterface } from "./order.interface"

export interface CalculatorInterface {
    calculateTotalPrice(order: OrderInterface): number
    calculateFinalPrice(order: OrderInterface): number
}