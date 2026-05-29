import type { BasketState } from '../domain/Basket'
import { groupBasket } from '../domain/BasketGrouper'
import { DiscountPolicy } from '../domain/DiscountPolicy'
import { PricingCalculator } from '../domain/PricingCalculator'

// SOLID (S): Orchestrates domain objects — no business logic lives here.
// CLEAN CODE: Named return type instead of a tuple; single level of abstraction.

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
