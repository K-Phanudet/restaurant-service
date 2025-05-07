import { DiscountService } from "../discount";

describe('DiscountService', () => {
    describe('calculateBundleDiscount', () => {
        describe('GIVEN no bundle discount applicable', () => {
            describe('WHEN calculate', () => {
                const mockOrder = { orderItems: [] } as any; 
                const discountService = new DiscountService([], []); 
                
                it('THEN should return 0', () => {
                    const result = discountService.calculateBundleDiscount(mockOrder);
                    expect(result).toBe(0);
                })
            });
        });
        
        describe('GIVEN 1 bundle discount applicable', () => {
            describe('WHEN calculate', () => {
                const mockOrder = { orderItems: [{ id: 'item1' }, { id: 'item2' }] } as any
                const expectDiscount = 10
                const mockBundleDiscount = {
                    isApplicable: jest.fn().mockReturnValueOnce(true).mockReturnValue(false),
                    calculateDiscount: jest.fn(() => ({
                        amount: expectDiscount,
                        usedItems: [{ id: 'item1' }]
                    }))
                } as any
        
                const discountService = new DiscountService([mockBundleDiscount], []);
                describe('THEN should return the discount amount', () => {
                    const result = discountService.calculateBundleDiscount(mockOrder);
                    expect(mockBundleDiscount.isApplicable).toHaveBeenCalledWith(mockOrder, mockOrder.orderItems);
                    expect(result).toBe(expectDiscount);
                })
            });
        })
        describe('GIVEN multiple bundle discounts applicable', () => {
            describe('WHEN calculate', () => {
                const mockOrder = { orderItems: [{ id: 'item1' }, { id: 'item2' }] } as any
                const expectDiscount = 20
                const mockBundleDiscount1 = {
                    isApplicable: jest.fn().mockReturnValueOnce(true).mockReturnValue(false),
                    calculateDiscount: jest.fn(() => ({
                        amount: expectDiscount,
                        usedItems: [{ id: 'item1' }]
                    }))
                } as any
        
                const mockBundleDiscount2 = {
                    isApplicable: jest.fn().mockReturnValueOnce(true).mockReturnValue(false),
                    calculateDiscount: jest.fn(() => ({
                        amount: expectDiscount,
                        usedItems: [{ id: 'item2' }]
                    }))
                } as any
        
                const discountService = new DiscountService([mockBundleDiscount1, mockBundleDiscount2], []);
        
                it('THEN should return the best discount amount', () => {
                    const result = discountService.calculateBundleDiscount(mockOrder);
                    expect(result).toBe(expectDiscount);
                })
            });
        });
    
        describe('GIVEN multiple bundle discounts applicable but not overlapping', () => {
            describe('WHEN calculate', () => {
                const mockOrder = { orderItems: [{ id: 'item1' }, { id: 'item2' }] } as any
                const expectDiscount = 20
                const mockBundleDiscount1 = {
                    isApplicable: jest.fn().mockReturnValueOnce(true).mockReturnValue(false),
                    calculateDiscount: jest.fn(() => ({
                        amount: expectDiscount,
                        usedItems: [{ id: 'item1' }]
                    }))
                } as any
        
                const mockBundleDiscount2 = {
                    isApplicable: jest.fn().mockReturnValueOnce(true).mockReturnValue(false),
                    calculateDiscount: jest.fn(() => ({
                        amount: expectDiscount,
                        usedItems: [{ id: 'item2' }]
                    }))
                } as any
        
                const discountService = new DiscountService([mockBundleDiscount1, mockBundleDiscount2], []);
        
                it('THEN should return the best discount amount', () => {
                    const result = discountService.calculateBundleDiscount(mockOrder);
                    expect(result).toBe(expectDiscount);
                })
            });
        
        })
    });
    
    describe('calculateTotalDiscount', () => {
        describe('GIVEN no total discounts applicable', () => {
            describe('WHEN calculate', () => {
                const mockOrder = {} as any;
                const subTotal = 100;
                const discountService = new DiscountService([], []);
    
                it('THEN should return 0', () => {
                    const result = discountService.calculateTotalDiscount(mockOrder, subTotal);
                    expect(result).toBe(0);
                });
            });
        });
    
        describe('GIVEN 1 total discount applicable', () => {
            describe('WHEN calculate', () => {
                const mockOrder = {} as any;
                const subTotal = 100;
                const expectedDiscount = 10;
                const mockTotalDiscount = {
                    isApplicable: jest.fn().mockReturnValue(true),
                    calculateDiscount: jest.fn(() => ({
                        getAmount: jest.fn(() => expectedDiscount)
                    }))
                } as any;
    
                const discountService = new DiscountService([], [mockTotalDiscount]);
    
                it('THEN should return the discount amount', () => {
                    const result = discountService.calculateTotalDiscount(mockOrder, subTotal);
                    expect(mockTotalDiscount.isApplicable).toHaveBeenCalledWith(mockOrder);
                    expect(result).toBe(expectedDiscount);
                });
            });
        });
    
        describe('GIVEN multiple total discounts applicable', () => {
            describe('WHEN calculate', () => {
                const mockOrder = {} as any;
                const subTotal = 100;
                const discount1 = 10;
                const discount2 = 5;
                const mockTotalDiscount1 = {
                    isApplicable: jest.fn().mockReturnValue(true),
                    calculateDiscount: jest.fn(() => ({
                        getAmount: jest.fn(() => discount1)
                    }))
                } as any;
    
                const mockTotalDiscount2 = {
                    isApplicable: jest.fn().mockReturnValue(true),
                    calculateDiscount: jest.fn(() => ({
                        getAmount: jest.fn(() => discount2)
                    }))
                } as any;
    
                const discountService = new DiscountService([], [mockTotalDiscount1, mockTotalDiscount2]);
    
                it('THEN should return the sum of all discount amounts', () => {
                    const result = discountService.calculateTotalDiscount(mockOrder, subTotal);
                    expect(result).toBe(discount1 + discount2);
                });
            });
        });
    
        describe('GIVEN total discounts that depend on remaining total', () => {
            describe('WHEN calculate', () => {
                const mockOrder = {} as any;
                const subTotal = 100;
                const discount1 = 10;
                const discount2 = 5;
                const mockTotalDiscount1 = {
                    isApplicable: jest.fn().mockReturnValue(true),
                    calculateDiscount: jest.fn(() => ({
                        getAmount: jest.fn((total: number) => (total >= 100 ? discount1 : 0))
                    }))
                } as any;
    
                const mockTotalDiscount2 = {
                    isApplicable: jest.fn().mockReturnValue(true),
                    calculateDiscount: jest.fn(() => ({
                        getAmount: jest.fn((total: number) => (total >= 90 ? discount2 : 0))
                    }))
                } as any;
    
                const discountService = new DiscountService([], [mockTotalDiscount1, mockTotalDiscount2]);
    
                it('THEN should calculate discounts sequentially based on remaining total', () => {
                    const result = discountService.calculateTotalDiscount(mockOrder, subTotal);
                    expect(result).toBe(discount1 + discount2);
                });
            });
        });
    });
});
