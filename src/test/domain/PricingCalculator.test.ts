import { describe, it, expect } from 'vitest'
import { PricingCalculator } from '../../domain/PricingCalculator'
import { DiscountPolicy } from '../../domain/DiscountPolicy'
import type { IDiscountPolicy } from '../../domain/IDiscountPolicy'

class MockDiscountPolicy implements IDiscountPolicy {
  constructor(private readonly fixedRate: number) {}
  discountFor(_setSize: number): number {
    return this.fixedRate
  }
}

describe('PricingCalculator', () => {
  const calculator = new PricingCalculator(new DiscountPolicy())

  it('prices one book at 50 EUR', () => {
    expect(calculator.calculate([new Set([1])])).toBe(50)
  })

  it('prices two different books at 95 EUR (5% discount)', () => {
    expect(calculator.calculate([new Set([1, 2])])).toBeCloseTo(95)
  })

  it('prices three different books at 135 EUR (10% discount)', () => {
    expect(calculator.calculate([new Set([1, 2, 3])])).toBeCloseTo(135)
  })

  it('prices four different books at 160 EUR (20% discount)', () => {
    expect(calculator.calculate([new Set([1, 2, 3, 4])])).toBeCloseTo(160)
  })

  it('prices all five different books at 187.50 EUR (25% discount)', () => {
    expect(calculator.calculate([new Set([1, 2, 3, 4, 5])])).toBeCloseTo(187.5)
  })

  it('prices the kata example basket at 320 EUR (two groups of 4)', () => {
    const groups = [new Set([1, 2, 3, 4]), new Set([1, 2, 3, 5])]
    expect(calculator.calculate(groups)).toBeCloseTo(320)
  })

  it('prices three copies of one title at 150 EUR (no discount applied)', () => {
    const groups = [new Set([1]), new Set([1]), new Set([1])]
    expect(calculator.calculate(groups)).toBe(150)
  })

  it('computes subtotal without applying any discount', () => {
    const groups = [new Set([1, 2, 3, 4, 5])]
    expect(calculator.subtotal(groups)).toBe(250)
  })

  describe('with a custom policy', () => {
    it('applies the injected rate instead of the default', () => {
      const calc = new PricingCalculator(new MockDiscountPolicy(0.5))
      expect(calc.calculate([new Set([1, 2])])).toBeCloseTo(50)
    })
  })
})
