import { AppliedDiscountType } from "../../../interface/applied-discount.interface"
import { OrderItemInterface } from "../../../interface/order-item.interface"
import { OrderInterface } from "../../../interface/order.interface"
import { AppliedDiscount } from "../../../value-objects/applied-discount"
import { OrderItem } from "../../order-item"
import { BundleDiscount } from "../bundle-discount"



export class SpecialDoubleBundleDiscount extends BundleDiscount {
    discountItemIds: string[]
    id = "SPECIAL_DOUBLE_BUNDLE_DISCOUNT"

    constructor(discountItemIds: string[]) {
        super()
        this.discountItemIds = discountItemIds
    }

    isApplicable(order: OrderInterface, availableOrderItems?: OrderItemInterface[]): boolean {
        const orderItems = availableOrderItems ?? []
        const matchingItems = orderItems
            .map(orderItem => orderItem.item)
            .filter(orderItem => this.discountItemIds.includes(orderItem.id))

        const store = new Map<string, number>()
        for (let { id } of matchingItems) {
            const quantity = store.get(id)
            if (!quantity) {
                store.set(id, 1)
                continue
            }
            if (quantity >= 1) {
                return true
            }
            store.set(id, quantity + 1)
        }
        return false
    }

    calculateDiscount(order: OrderInterface, availableOrderItems?: OrderItemInterface[]): AppliedDiscount {
        if (!this.isApplicable(order,availableOrderItems)) {
            return new AppliedDiscount({
                discountId: this.id,
                amount: 0,
                usedItems: [],
                description: "Not applicable",
                type: AppliedDiscountType.FIXED
            })
        }
        const orderItems = availableOrderItems ?? []

        const matchingItems = orderItems.filter(orderItem =>
            this.discountItemIds.includes(orderItem.item.id)
        )

        const countMap = new Map<string, OrderItem[]>()
        for (const orderItem of matchingItems) {
            const list = countMap.get(orderItem.item.id) ?? []
            list.push(orderItem)
            countMap.set(orderItem.item.id, list)
        }

        let usedItems: OrderItem[] = []
        for (const [_, items] of countMap.entries()) {
            if (items.length >= 2) {
                usedItems = items.slice(0, 2)
                break
            }
        }

        if (usedItems.length < 2) {
            return new AppliedDiscount({
                discountId: this.id,
                amount: 0,
                usedItems: [],
                description: "Not applicable",
                type: AppliedDiscountType.FIXED
            })
        }
        const totalAmount = usedItems.reduce((acc, item) => acc + item.getTotalPrice(), 0)
        return new AppliedDiscount({
            discountId: this.id,
            amount: totalAmount * 0.05,
            usedItems: usedItems,
            description: "bundle discount 5%",
            type: AppliedDiscountType.FIXED
        })
    }
}