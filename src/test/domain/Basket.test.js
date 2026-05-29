import { describe, it, expect } from 'vitest'
import { add, remove, clear } from '../../domain/Basket'

describe('Basket', () => {
  const empty = new Map()

  describe('add', () => {
    it('sets quantity to 1 when adding a new book', () => {
      const basket = add(empty, 1)
      expect(basket.get(1)).toBe(1)
    })

    it('increments quantity when adding a book already in the basket', () => {
      const basket = add(add(empty, 1), 1)
      expect(basket.get(1)).toBe(2)
    })

    it('does not mutate the original basket', () => {
      add(empty, 1)
      expect(empty.size).toBe(0)
    })
  })

  describe('remove', () => {
    it('decrements quantity', () => {
      const basket = remove(add(add(empty, 1), 1), 1)
      expect(basket.get(1)).toBe(1)
    })

    it('removes the book entirely when quantity reaches zero', () => {
      const basket = remove(add(empty, 1), 1)
      expect(basket.has(1)).toBe(false)
    })

    it('leaves the basket unchanged when removing a book that is not present', () => {
      const basket = remove(empty, 99)
      expect(basket.size).toBe(0)
    })
  })

  describe('clear', () => {
    it('returns an empty basket', () => {
      const basket = clear()
      expect(basket.size).toBe(0)
    })
  })
})
