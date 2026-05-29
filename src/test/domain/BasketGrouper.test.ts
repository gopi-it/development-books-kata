// TDD: Grouping algorithm specs — written before BasketGrouper was implemented.
import { describe, it, expect } from 'vitest'
import { groupBasket } from '../../domain/BasketGrouper'

function basket(entries: [number, number][]): Map<number, number> {
  return new Map(entries)
}

describe('BasketGrouper', () => {
  it('groups a single copy of one book into one group of size 1', () => {
    const groups = groupBasket(basket([[1, 1]]))
    expect(groups).toHaveLength(1)
    expect(groups[0].size).toBe(1)
  })

  it('groups two copies of the same book into two groups of size 1', () => {
    const groups = groupBasket(basket([[1, 2]]))
    expect(groups).toHaveLength(2)
    expect(groups.every(g => g.size === 1)).toBe(true)
  })

  it('groups two different books into one group of size 2', () => {
    const groups = groupBasket(basket([[1, 1], [2, 1]]))
    expect(groups).toHaveLength(1)
    expect(groups[0].size).toBe(2)
  })

  it('groups all five different books into one group of size 5', () => {
    const groups = groupBasket(basket([[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]]))
    expect(groups).toHaveLength(1)
    expect(groups[0].size).toBe(5)
  })

  it('produces two groups of size 4 for the kata example basket (not 5+3)', () => {
    // 2×book1, 2×book2, 2×book3, 1×book4, 1×book5
    const groups = groupBasket(basket([[1, 2], [2, 2], [3, 2], [4, 1], [5, 1]]))
    const sizes = groups.map(g => g.size).sort((a, b) => a - b)
    expect(sizes).toEqual([4, 4])
  })

  it('produces three groups of size 1 for three copies of the same book', () => {
    const groups = groupBasket(basket([[1, 3]]))
    expect(groups).toHaveLength(3)
    expect(groups.every(g => g.size === 1)).toBe(true)
  })
})
