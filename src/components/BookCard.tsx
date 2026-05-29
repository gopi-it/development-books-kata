import type { Book } from '../domain/Book'

type Props = {
  book: Book
  quantity: number
  onAdd: (bookId: number) => void
}

export function BookCard({ book, quantity, onAdd }: Props) {
  return (
    <div className="card h-100 shadow-sm position-relative">
      {quantity > 0 && (
        <span
          className="badge bg-danger position-absolute top-0 end-0 m-2"
          style={{ zIndex: 1 }}
          aria-label={`${quantity} in basket`}
        >
          {quantity}
        </span>
      )}

      <img
        src={book.coverUrl}
        alt={`${book.title} cover`}
        className="card-img-top"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{book.title}</h5>
        <p className="text-success fw-semibold mb-1">50 EUR</p>
        <p className="card-text text-muted small flex-grow-1">{book.description}</p>
        <button
          className="btn btn-primary mt-auto d-flex align-items-center justify-content-center gap-2"
          onClick={() => onAdd(book.id)}
          aria-label={`Add ${book.title} to basket`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M5 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>
          Add to Basket
        </button>
      </div>
    </div>
  )
}
