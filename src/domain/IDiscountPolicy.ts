export interface IDiscountPolicy {
  discountFor(setSize: number): number
}
