import type { IDiscountPolicy } from './IDiscountPolicy'

// SOLID (D): Depends on IDiscountPolicy abstraction — inject any conforming implementation.
// SOLID (S): Does arithmetic only — no grouping, no state.
// CLEAN CODE: BOOK_PRICE appears once; small focused methods; constructor injection is self-documenting.

const BOOK_PRICE = 50

export class PricingCalculator {
  constructor(private readonly policy: IDiscountPolicy) {}

  calculate(groups: Set<number>[]): number {
    return groups.reduce((total, group) => {
      const discount = this.policy.discountFor(group.size)
      return total + group.size * BOOK_PRICE * (1 - discount)
    }, 0)
  }

  subtotal(groups: Set<number>[]): number {
    return groups.reduce((total, group) => total + group.size * BOOK_PRICE, 0)
  }
}
