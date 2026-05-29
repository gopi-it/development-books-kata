import type { BasketState } from '../domain/Basket'
import { groupBasket } from '../domain/BasketGrouper'
import { DiscountPolicy } from '../domain/DiscountPolicy'
import { PricingCalculator } from '../domain/PricingCalculator'

export type PriceResult = {
  readonly groups: Set<number>[]
  readonly subtotal: number
  readonly discount: number
  readonly total: number
}

const calculator = new PricingCalculator(new DiscountPolicy())

export function price(counts: BasketState): PriceResult {
  const groups = groupBasket(counts)
  const subtotal = calculator.subtotal(groups)
  const total = calculator.calculate(groups)
  const discount = subtotal - total
  return { groups, subtotal, discount, total }
}
