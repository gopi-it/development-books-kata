import './BasketSidebar.css'
import { CATALOGUE } from '../../domain/Book'
import { BasketItem } from '../BasketItem/BasketItem'

export function BasketSidebar({ counts, priceResult, onRemove, onClear }) {
  const booksInBasket = CATALOGUE.filter(book => (counts.get(book.id) ?? 0) > 0)
  const hasItems = booksInBasket.length > 0
  const totalQty = [...counts.values()].reduce((s, q) => s + q, 0)
  const discountPct = Math.round((priceResult.discount / priceResult.subtotal) * 100)

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Your Basket</span>
        {hasItems && (
          <button className="btn btn-outline-danger btn-sm" onClick={onClear} aria-label="Clear basket">
            Clear Basket
          </button>
        )}
      </div>

      {!hasItems && (
        <div className="empty-basket">
          <p className="mb-1">Your basket is empty.</p>
          <p className="small mb-0">Add books from the catalogue.</p>
        </div>
      )}

      {hasItems && (
        <>
          <ul className="list-group list-group-flush">
            {booksInBasket.map(book => (
              <BasketItem
                key={book.id}
                book={book}
                quantity={counts.get(book.id)}
                onRemove={onRemove}
              />
            ))}
          </ul>

          <div className="card-body">
            <div className="price-row text-muted small">
              <span>Subtotal ({totalQty} books)</span>
              <span>{priceResult.subtotal.toFixed(2)} EUR</span>
            </div>

            {priceResult.discount > 0 && (
              <div className="price-row price-savings">
                <span>Discount ({discountPct}%)</span>
                <span>-{priceResult.discount.toFixed(2)} EUR</span>
              </div>
            )}

            <div className="price-row total">
              <span>Total</span>
              <span className="text-success">{priceResult.total.toFixed(2)} EUR</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
