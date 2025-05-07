
import { DiscountType } from "../../common/discount-type.enum";
import { BaseDiscount } from "./base-discount";

export abstract class BundleDiscount extends BaseDiscount {
    type = DiscountType.BUNDLE
}