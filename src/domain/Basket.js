function withUpdate(basket, bookId, quantity) {
  const next = new Map(basket)
  if (quantity <= 0) {
    next.delete(bookId)
  } else {
    next.set(bookId, quantity)
  }
  return next
}

export function add(basket, bookId) {
  return withUpdate(basket, bookId, (basket.get(bookId) ?? 0) + 1)
}

export function remove(basket, bookId) {
  const current = basket.get(bookId) ?? 0
  return withUpdate(basket, bookId, current - 1)
}

export function clear() {
  return new Map()
}
