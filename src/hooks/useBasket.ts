import { useState } from 'react'
import * as Basket from '../domain/Basket'
import type { BasketState } from '../domain/Basket'
import { price } from '../application/BasketService'
import type { PriceResult } from '../application/BasketService'

// SOLID (S): Bridges React state and pure domain functions — no business logic here.
// CLEAN CODE: Components receive stable callbacks; they never call Basket.* directly.

export type UseBasketReturn = {
  counts: BasketState
  totalItems: number
  addBook: (bookId: number) => void
  removeBook: (bookId: number) => void
  clearBasket: () => void
  priceResult: PriceResult
}

export function useBasket(): UseBasketReturn {
  const [counts, setCounts] = useState<BasketState>(Basket.clear())

  const addBook = (bookId: number) => setCounts(prev => Basket.add(prev, bookId))
  const removeBook = (bookId: number) => setCounts(prev => Basket.remove(prev, bookId))
  const clearBasket = () => setCounts(Basket.clear())

  const totalItems = [...counts.values()].reduce((sum, qty) => sum + qty, 0)
  const priceResult = price(counts)

  return { counts, totalItems, addBook, removeBook, clearBasket, priceResult }
}
