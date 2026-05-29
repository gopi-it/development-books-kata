import { describe, it, expect } from 'vitest'
import { DiscountPolicy } from '../../domain/DiscountPolicy'

describe('DiscountPolicy', () => {
  const policy = new DiscountPolicy()

  it('returns no discount for a single book', () => {
    expect(policy.discountFor(1)).toBe(0)
  })

  it('returns 5% discount for 2 different books', () => {
    expect(policy.discountFor(2)).toBe(0.05)
  })

  it('returns 10% discount for 3 different books', () => {
    expect(policy.discountFor(3)).toBe(0.10)
  })

  it('returns 20% discount for 4 different books', () => {
    expect(policy.discountFor(4)).toBe(0.20)
  })

  it('returns 25% discount for all 5 different books', () => {
    expect(policy.discountFor(5)).toBe(0.25)
  })

  it('returns no discount for an unknown set size', () => {
    expect(policy.discountFor(0)).toBe(0)
    expect(policy.discountFor(6)).toBe(0)
  })
})
