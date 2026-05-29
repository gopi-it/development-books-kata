// SOLID (I): One method — consumers ask only for what they need.
// SOLID (D): PricingCalculator depends on this abstraction, not a concrete class.
export interface IDiscountPolicy {
  discountFor(setSize: number): number
}
