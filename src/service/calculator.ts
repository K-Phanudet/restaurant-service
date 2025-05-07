
import { DiscountServiceInterface } from "../interface/discount.interface";
import { OrderInterface } from "../interface/order.interface";

export class CalculatorService {
    private discountService: DiscountServiceInterface

    constructor(discount: DiscountServiceInterface){
        this.discountService = discount
    }

    calculateTotalPrice(order: OrderInterface): number{
        return order.getTotalAmount()
    }

    calculateFinalPrice(order: OrderInterface): number{
        const orderTotalAmount = this.calculateTotalPrice(order)
        const bundleDiscountAmount = this.discountService.calculateBundleDiscount(order)
        const subTotal = orderTotalAmount - bundleDiscountAmount
        const totalDiscountAmount = this.discountService.calculateTotalDiscount(order, subTotal)

        return subTotal - totalDiscountAmount
    }
}