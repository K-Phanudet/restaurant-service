import { DiscountType } from "../../common/discount-type.enum";
import { OrderItemInterface } from "../../interface/order-item.interface";
import { OrderInterface } from "../../interface/order.interface";
import { AppliedDiscount } from "../../value-objects/applied-discount";

export abstract class BaseDiscount {
    abstract type: DiscountType
    abstract isApplicable(order: OrderInterface, availableOrderItems?: OrderItemInterface[]): boolean
    abstract calculateDiscount(order: OrderInterface, availableOrderItems?: OrderItemInterface[]): AppliedDiscount
}