import { CATALOGUE } from '../domain/Book'
import type { BasketState } from '../domain/Basket'
import type { PriceResult } from '../application/BasketService'
import { BasketItem } from './BasketItem'

type Props = {
  counts: BasketState
  priceResult: PriceResult
  onRemove: (bookId: number) => void
  onClear: () => void
}

export function BasketSidebar({ counts, priceResult, onRemove, onClear }: Props) {
  const booksInBasket = CATALOGUE.filter(book => (counts.get(book.id) ?? 0) > 0)
  const hasItems = booksInBasket.length > 0
  const hasDiscount = priceResult.discount > 0

  return (
    <div className="card shadow">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2 fw-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5"/>
          </svg>
          Your Basket
        </div>
        {hasItems && (
          <button className="btn btn-outline-danger btn-sm" onClick={onClear} aria-label="Clear basket">
            Clear Basket
          </button>
        )}
      </div>

      {!hasItems && (
        <div className="text-center text-muted py-4 px-3">
          <p className="mb-0">Your basket is empty.</p>
          <p className="small">Add books from the catalogue.</p>
        </div>
      )}

      {hasItems && (
        <>
          <ul className="list-group list-group-flush">
            {booksInBasket.map(book => (
              <BasketItem
                key={book.id}
                book={book}
                quantity={counts.get(book.id)!}
                onRemove={onRemove}
              />
            ))}
          </ul>

          <div className="card-body border-top pt-3">
            <div className="d-flex justify-content-between text-muted small mb-1">
              <span>Subtotal ({[...counts.values()].reduce((s, q) => s + q, 0)} books)</span>
              <span>{priceResult.subtotal.toFixed(2)} EUR</span>
            </div>

            {hasDiscount && (
              <div className="d-flex justify-content-between text-success fw-semibold mb-1">
                <span>Discount ({Math.round((priceResult.discount / priceResult.subtotal) * 100)}%)</span>
                <span>-{priceResult.discount.toFixed(2)} EUR</span>
              </div>
            )}

            <hr className="my-2" />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span className="text-success">{priceResult.total.toFixed(2)} EUR</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
