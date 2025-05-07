import { OrderItem } from "../domain/order-item";


export enum AppliedDiscountType {
  FIXED,
  PERCENTAGE
}

export interface AppliedDiscountInterface {
    discountId: string
    description?: string
    type: AppliedDiscountType;
    usedItems: OrderItem[];
  }