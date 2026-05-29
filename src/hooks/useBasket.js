import { useState } from 'react'
import * as Basket from '../domain/Basket'
import { price } from '../application/BasketService'

export function useBasket() {
  const [counts, setCounts] = useState(Basket.clear())

  const addBook = (bookId) => setCounts(prev => Basket.add(prev, bookId))
  const removeBook = (bookId) => setCounts(prev => Basket.remove(prev, bookId))
  const clearBasket = () => setCounts(Basket.clear())

  const totalItems = [...counts.values()].reduce((sum, qty) => sum + qty, 0)
  const priceResult = price(counts)

  return { counts, totalItems, addBook, removeBook, clearBasket, priceResult }
}
