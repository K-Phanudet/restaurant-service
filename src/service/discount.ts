
import { AppliedDiscount } from "../value-objects/applied-discount";
import { BundleDiscount } from "../domain/discount/bundle-discount";
import { TotalDiscount } from "../domain/discount/total-discount";

import { DiscountServiceInterface } from "../interface/discount.interface";
import { OrderInterface } from "../interface/order.interface";
import { OrderItemInterface } from "../interface/order-item.interface";

export class DiscountService implements DiscountServiceInterface {
    private bundleDiscounts: BundleDiscount[]
    private totalDiscounts: TotalDiscount[]

    constructor(bundleDiscounts: BundleDiscount[], totalDiscounts: TotalDiscount[]) {
        this.bundleDiscounts = bundleDiscounts
        this.totalDiscounts = totalDiscounts
    }

    private getApplicableBundleDiscounts(order: OrderInterface, orderItems: OrderItemInterface[]) {
        return this.bundleDiscounts.filter(bundleDiscount => bundleDiscount.isApplicable(order, orderItems))
    }

    private getApplicableTotalDiscounts(order: OrderInterface) {
        return this.totalDiscounts.filter(totalDiscount => totalDiscount.isApplicable(order))
    }

    public findBestBundleDiscounts(order: OrderInterface): AppliedDiscount[] {
        const result = this.dfsBackTrack(order, order.orderItems, []);
        return result.bestPath
    }

    private getTotalDiscountAmount(currentPath: AppliedDiscount[]) {
        return currentPath.reduce((acc, val) => val.amount + acc, 0)
    }

    private dfsBackTrack(order: OrderInterface, availableItems: OrderItemInterface[], currentPath: AppliedDiscount[]): { bestPath: AppliedDiscount[]; bestAmount: number } {
        let bestPath = currentPath;
        let bestAmount = this.getTotalDiscountAmount(currentPath);
        const bundleDiscounts = this.getApplicableBundleDiscounts(order, availableItems)

        for (let bundle of bundleDiscounts) {
            const appliedDiscount = bundle.calculateDiscount(order, availableItems);
            if (!appliedDiscount) continue;
            const usedItemIds = appliedDiscount.usedItems.map(item => item.id);
            const remainingItems = availableItems.filter(item => !usedItemIds.includes(item.id));
            const result = this.dfsBackTrack(order, remainingItems, [...currentPath, appliedDiscount]);
            if (result.bestAmount > bestAmount) {
                bestAmount = result.bestAmount;
                bestPath = result.bestPath;
            }
        }
        return { bestPath, bestAmount };
    }

    calculateBundleDiscount(order: OrderInterface): number {
        const appliedDiscounts = this.findBestBundleDiscounts(order)
        return this.getTotalDiscountAmount(appliedDiscounts)
    }

    calculateTotalDiscount(order: OrderInterface, subTotal: number): number {
        let total = subTotal
        let totalDiscountAmount = 0;
        const applicableTotalDiscounts = this.getApplicableTotalDiscounts(order)
        for (let discount of applicableTotalDiscounts) {
            const applied = discount.calculateDiscount(order);
            const amount = applied.getAmount(total);
            totalDiscountAmount += amount;
            total -= amount;
        }

        return totalDiscountAmount
    }

}