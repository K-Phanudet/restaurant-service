import { ItemName } from "./common/item-name.enum";
import { CalculatorService } from "./service/calculator";

import { OrderItem } from "./domain/entities/order-item";
import { Order } from "./domain/entities/order";
import { uuid } from "../node_modules/uuidv4/build/lib/uuidv4";
import { MembershipDiscount } from "./domain/discount/rules/membership-discount";
import { SpecialDoubleBundleDiscount } from "./domain/discount/rules/special-double-bundle-discount";
import { Customer } from "./domain/entities/customer";
import { Item } from "./domain/entities/item";
import { DiscountService } from "./service/discount";

// Defined items
const redSet = new Item(uuid(), ItemName.PINK_SET, 50)
const greenSet = new Item(uuid(), ItemName.PINK_SET, 40)
const blueSet = new Item(uuid(), ItemName.PINK_SET, 30)
const yellowSet = new Item(uuid(), ItemName.PINK_SET, 50)
const pinkSet = new Item(uuid(), ItemName.PINK_SET, 80)
const purpleSet = new Item(uuid(), ItemName.PINK_SET, 90)
const orangeSet = new Item(uuid(), ItemName.PINK_SET, 120)

// Defined special bundle discount
const eligibleItemIds = [orangeSet,pinkSet,greenSet].map(item => item.id)
const specialBundleDiscout = new SpecialDoubleBundleDiscount(eligibleItemIds)

// Defined membership discount
const membershipDiscount = new MembershipDiscount()

// Defined discount engine
const discountEngine = new DiscountService([specialBundleDiscout],[membershipDiscount])


// ---------------------------
const customer = new Customer(uuid(),"cus-1",new Date("2026-01-01"))

const firstOrderItem = new OrderItem(uuid(),pinkSet) 
const secoundOrderItem = new OrderItem(uuid(),pinkSet) 
const thirdOrderItem = new OrderItem(uuid(),purpleSet) 


console.log("Customer",customer)
console.log("Create order")
const firstOrder = new Order(uuid(),customer)

console.log("Add order items")
console.log("Order item 1",firstOrderItem)
firstOrder.addOrderItem(firstOrderItem)

console.log("Order item 2",secoundOrderItem)
firstOrder.addOrderItem(secoundOrderItem)

console.log("Order item 3",thirdOrderItem)
firstOrder.addOrderItem(thirdOrderItem)

console.log("Calulate total amount")
const calculator = new CalculatorService(discountEngine)
const price = calculator.calculateFinalPrice(firstOrder)
console.log("Total amount", price)
