import type { IDiscountPolicy } from './IDiscountPolicy'

export const DISCOUNT_RATES: ReadonlyMap<number, number> = new Map([
  [1, 0],
  [2, 0.05],
  [3, 0.10],
  [4, 0.20],
  [5, 0.25],
])

export class DiscountPolicy implements IDiscountPolicy {
  discountFor(setSize: number): number {
    return DISCOUNT_RATES.get(setSize) ?? 0
  }
}
