import { groupBasket } from '../domain/BasketGrouper'
import { DiscountPolicy } from '../domain/DiscountPolicy'
import { PricingCalculator } from '../domain/PricingCalculator'

const calculator = new PricingCalculator(new DiscountPolicy())

export function price(counts) {
  const groups = groupBasket(counts)
  const subtotal = calculator.subtotal(groups)
  const total = calculator.calculate(groups)
  const discount = subtotal - total
  return { groups, subtotal, discount, total }
}
