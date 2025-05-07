
import { AppliedDiscountInterface, AppliedDiscountType } from "../interface/applied-discount.interface";
import { OrderItem } from "../domain/entities/order-item";


export class AppliedDiscount implements AppliedDiscountInterface {
    discountId: string
    amount: number
    usedItems: OrderItem[]
    type: AppliedDiscountType
    description?: string | undefined

    constructor({ discountId, amount, type = AppliedDiscountType.FIXED, usedItems, description }: {
        discountId: string;
        amount: number;
        type?: AppliedDiscountType;
        usedItems: OrderItem[];
        description?: string;
    }) {
        this.discountId = discountId;
        this.amount = amount;
        this.type = type;
        this.usedItems = usedItems;
        this.description = description;
    }
    
    getAmount(total?: number): number {
        if (this.type === AppliedDiscountType.PERCENTAGE) {
            if (typeof total !== "number") throw new Error("Total required for percentage discount");
            return Math.floor(total * this.amount / 100)
        }
        return this.amount;
    }
}