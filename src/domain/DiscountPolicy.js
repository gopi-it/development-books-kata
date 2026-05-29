export const DISCOUNT_RATES = new Map([
  [1, 0],
  [2, 0.05],
  [3, 0.10],
  [4, 0.20],
  [5, 0.25],
])

export class DiscountPolicy {
  discountFor(setSize) {
    return DISCOUNT_RATES.get(setSize) ?? 0
  }
}
