import { CATALOGUE } from './domain/Book'
import { useBasket } from './hooks/useBasket'
import { BookCard } from './components/BookCard'
import { BasketSidebar } from './components/BasketSidebar'
import { DiscountBanner } from './components/DiscountBanner'

function App() {
  const { counts, totalItems, addBook, removeBook, clearBasket, priceResult } = useBasket()

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-dark px-3 py-3" style={{ background: 'linear-gradient(135deg, #6610f2, #0d6efd)' }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
            </svg>
            Book Store
          </span>

          <div className="position-relative" aria-label={`${totalItems} items in basket`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M5 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            {totalItems > 0 && (
              <span
                className="badge bg-danger position-absolute rounded-pill"
                style={{ top: '-6px', right: '-8px', fontSize: '0.65rem' }}
              >
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </nav>

      <main className="container-fluid py-4 flex-grow-1">
        <div className="row g-4">
          <div className="col-lg-8">
            <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0d6efd" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
              </svg>
              Available Books
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
              {CATALOGUE.map(book => (
                <div key={book.id} className="col">
                  <BookCard
                    book={book}
                    quantity={counts.get(book.id) ?? 0}
                    onAdd={addBook}
                  />
                </div>
              ))}
            </div>
            <DiscountBanner />
          </div>

          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '1rem' }}>
              <BasketSidebar
                counts={counts}
                priceResult={priceResult}
                onRemove={removeBook}
                onClear={clearBasket}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
