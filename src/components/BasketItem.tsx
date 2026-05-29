import type { Book } from '../domain/Book'

type Props = {
  book: Book
  quantity: number
  onRemove: (bookId: number) => void
}

export function BasketItem({ book, quantity, onRemove }: Props) {
  return (
    <li className="list-group-item d-flex align-items-center gap-2 px-3 py-2">
      <img
        src={book.coverUrl}
        alt=""
        aria-hidden="true"
        className="basket-thumbnail"
        style={{ background: book.coverColor }}
      />
      <div className="flex-grow-1 min-w-0">
        <div className="fw-semibold text-truncate small">{book.title}</div>
        <div className="text-success small">50 EUR</div>
      </div>
      <span className="badge bg-primary rounded-pill">{quantity}</span>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => onRemove(book.id)}
        aria-label={`Remove one copy of ${book.title}`}
      >
        ×
      </button>
    </li>
  )
}
