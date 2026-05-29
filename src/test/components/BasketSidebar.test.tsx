// TDD: BasketSidebar specs written before the component was implemented.
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BasketSidebar } from '../../components/BasketSidebar'
import type { PriceResult } from '../../application/BasketService'

function emptyResult(): PriceResult {
  return { groups: [], subtotal: 0, discount: 0, total: 0 }
}

describe('BasketSidebar', () => {
  it('shows an empty state message when the basket is empty', () => {
    render(
      <BasketSidebar
        counts={new Map()}
        priceResult={emptyResult()}
        onRemove={vi.fn()}
        onClear={vi.fn()}
      />
    )
    expect(screen.getByText(/your basket is empty/i)).toBeInTheDocument()
  })

  it('renders a list item for each distinct book title in the basket', () => {
    const counts = new Map([[1, 2], [3, 1]])
    const result: PriceResult = { groups: [new Set([1, 3])], subtotal: 150, discount: 13.5, total: 136.5 }
    render(
      <BasketSidebar counts={counts} priceResult={result} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    // Each title appears in both the cover thumbnail and the text row
    expect(screen.getAllByText('Clean Code').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Clean Architecture').length).toBeGreaterThan(0)
  })

  it('displays the correct total price', () => {
    const counts = new Map([[1, 1]])
    const result: PriceResult = { groups: [new Set([1])], subtotal: 50, discount: 0, total: 50 }
    render(
      <BasketSidebar counts={counts} priceResult={result} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    // Both subtotal and total rows show "50.00 EUR" when there is no discount
    expect(screen.getAllByText('50.00 EUR').length).toBeGreaterThan(0)
  })

  it('shows the discount savings line when a discount is applied', () => {
    const counts = new Map([[1, 1], [2, 1]])
    const result: PriceResult = { groups: [new Set([1, 2])], subtotal: 100, discount: 5, total: 95 }
    render(
      <BasketSidebar counts={counts} priceResult={result} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    expect(screen.getByText(/-5\.00 EUR/)).toBeInTheDocument()
  })

  it('hides the discount savings line when there is no discount', () => {
    const counts = new Map([[1, 1]])
    const result: PriceResult = { groups: [new Set([1])], subtotal: 50, discount: 0, total: 50 }
    render(
      <BasketSidebar counts={counts} priceResult={result} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    expect(screen.queryByText(/-.*EUR/)).not.toBeInTheDocument()
  })

  it('calls onClear when the Clear Basket button is clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    const counts = new Map([[1, 1]])
    const result: PriceResult = { groups: [new Set([1])], subtotal: 50, discount: 0, total: 50 }
    render(
      <BasketSidebar counts={counts} priceResult={result} onRemove={vi.fn()} onClear={onClear} />
    )
    await user.click(screen.getByLabelText('Clear basket'))
    expect(onClear).toHaveBeenCalledOnce()
  })
})
