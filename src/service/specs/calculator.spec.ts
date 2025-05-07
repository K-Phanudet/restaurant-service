import { CalculatorService } from "../calculator";

describe('CalculatorService', () => {
    describe('GIVEN order have not applicable discount', () => {
        describe('WHEN calculate final price', () => {
            const order = {
                id: "mock-id",
                customer: {
                    id: "mock-customer-id",
                    isMembership: jest.fn().mockReturnValue(false)
                },
                orderItems: [],
                addOrderItem: jest.fn(),
                getTotalAmount: jest.fn().mockReturnValue(100)
            };
            const discountService = {
                calculateBundleDiscount: jest.fn().mockReturnValue(0),
                calculateTotalDiscount: jest.fn().mockReturnValue(0),
            }
            const calculator = new CalculatorService(discountService);
            const expected = 100
            it('THEN should return the total amount', () => {
                const finalPrice = calculator.calculateFinalPrice(order);
                expect(finalPrice).toBe(expected);
            });
        })
    });
    describe('GIVEN order applicable only total discount', () => {
        describe('WHEN calculate final price', () => {
            const order = {
                id: "mock-id",
                customer: {
                    id: "mock-customer-id",
                    isMembership: jest.fn().mockReturnValue(true)
                },
                orderItems: [],
                addOrderItem: jest.fn(),
                getTotalAmount: jest.fn().mockReturnValue(100)
            };
            const discount = {
                calculateBundleDiscount: jest.fn().mockReturnValue(0),
                calculateTotalDiscount: jest.fn().mockReturnValue(20)
            };
            const expected = 80
            const calculator = new CalculatorService(discount);

            it('THEN should return the total amount', () => {
                const finalPrice = calculator.calculateFinalPrice(order);
                expect(finalPrice).toBe(expected);
            });
        })
    })
    describe('GIVEN order applicable only bundle discount', () => {
        describe('WHEN calculate final price', () => {
            const order = {
                id: "mock-id",
                customer: {
                    id: "mock-customer-id",
                    isMembership: jest.fn().mockReturnValue(true)
                },
                orderItems: [],
                addOrderItem: jest.fn(),
                getTotalAmount: jest.fn().mockReturnValue(100)
            };
            const discount = {
                calculateBundleDiscount: jest.fn().mockReturnValue(10),
                calculateTotalDiscount: jest.fn().mockReturnValue(0)
            };
            const calculator = new CalculatorService(discount);
            const expected = 90
            it('THEN should return the total amount', () => {
                const finalPrice = calculator.calculateFinalPrice(order);
                expect(finalPrice).toBe(expected);
            });
        })
    })
    describe('GIVEN order have applicable bundle discount and total discount', () => {
        describe('WHEN calculate final price', () => {
            const order = {
                id: "mock-id",
                customer: {
                    id: "mock-customer-id",
                    isMembership: jest.fn().mockReturnValue(true)
                },
                orderItems: [],
                addOrderItem: jest.fn(),
                getTotalAmount: jest.fn().mockReturnValue(100)
            };
            const discount = {
                calculateBundleDiscount: jest.fn().mockReturnValue(10),
                calculateTotalDiscount: jest.fn().mockReturnValue(20)
            };
            const expected = 70
            const calculator = new CalculatorService(discount);
            it('THEN should return the total amount', () => {
                const finalPrice = calculator.calculateFinalPrice(order);
                expect(finalPrice).toBe(expected);
            });
        })
    })
})
