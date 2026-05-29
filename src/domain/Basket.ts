export type BasketState = ReadonlyMap<number, number>

function withUpdate(basket: BasketState, bookId: number, quantity: number): BasketState {
  const next = new Map(basket)
  if (quantity <= 0) {
    next.delete(bookId)
  } else {
    next.set(bookId, quantity)
  }
  return next
}

export function add(basket: BasketState, bookId: number): BasketState {
  return withUpdate(basket, bookId, (basket.get(bookId) ?? 0) + 1)
}

export function remove(basket: BasketState, bookId: number): BasketState {
  const current = basket.get(bookId) ?? 0
  return withUpdate(basket, bookId, current - 1)
}

export function clear(): BasketState {
  return new Map()
}
