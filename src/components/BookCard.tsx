import type { Book } from '../domain/Book'

type Props = {
  book: Book
  quantity: number
  onAdd: (bookId: number) => void
}

export function BookCard({ book, quantity, onAdd }: Props) {
  return (
    <div className="card h-100 shadow-sm position-relative book-card">
      {quantity > 0 && (
        <span className="qty-badge badge bg-danger" aria-label={`${quantity} in basket`}>
          {quantity}
        </span>
      )}

      <img
        src={book.coverUrl}
        alt={`${book.title} cover`}
        className="book-cover card-img-top"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{book.title}</h5>
        <p className="text-success fw-semibold mb-1">50 EUR</p>
        <p className="card-text text-muted small flex-grow-1">{book.description}</p>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => onAdd(book.id)}
          aria-label={`Add ${book.title} to basket`}
        >
          Add to Basket
        </button>
      </div>
    </div>
  )
}
