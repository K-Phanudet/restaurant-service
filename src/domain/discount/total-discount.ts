import { DiscountType } from "../../common/discount-type.enum";
import { BaseDiscount } from "./base-discount";

export abstract class TotalDiscount extends BaseDiscount {
    type = DiscountType.TOTAL
}