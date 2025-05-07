import { AppliedDiscountType } from "../../../interface/applied-discount.interface"
import { OrderInterface } from "../../../interface/order.interface"
import { AppliedDiscount } from "../../../value-objects/applied-discount"
import { TotalDiscount } from "../total-discount"


export class MembershipDiscount extends TotalDiscount {
    id = "MEMBERSHIP_DISCOUNT"

    constructor() {
        super()
    }

    isApplicable(order: OrderInterface): boolean {
        return order.customer.isMembership()
    }

    calculateDiscount(order: OrderInterface): AppliedDiscount {
        if (!this.isApplicable(order)) {
            return new AppliedDiscount({
                discountId: this.id,
                amount: 0,
                usedItems: [],
                description: "Not applicable",
                type: AppliedDiscountType.FIXED
            })
        }
        return new AppliedDiscount({
            discountId: this.id,
            amount: 10,
            usedItems: [],
            description: "merbership discount 10%",
            type: AppliedDiscountType.PERCENTAGE
        })
    }
}