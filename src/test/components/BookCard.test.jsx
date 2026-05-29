import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookCard } from '../../components/BookCard/BookCard'

const mockBook = {
  id: 1,
  title: 'Clean Code',
  author: 'Robert C. Martin',
  year: 2008,
  description: 'A Handbook of Agile Software Craftsmanship',
  coverUrl: 'https://example.com/cover.png',
  coverColor: '#1a3a5c',
}

describe('BookCard', () => {
  it('renders the book title', () => {
    render(<BookCard book={mockBook} quantity={0} onAdd={vi.fn()} />)
    expect(screen.getAllByText('Clean Code').length).toBeGreaterThan(0)
  })

  it('renders the book price as 50 EUR', () => {
    render(<BookCard book={mockBook} quantity={0} onAdd={vi.fn()} />)
    expect(screen.getByText('50 EUR')).toBeInTheDocument()
  })

  it('renders the Add to basket button', () => {
    render(<BookCard book={mockBook} quantity={0} onAdd={vi.fn()} />)
    expect(screen.getByRole('button', { name: /add clean code to basket/i })).toBeInTheDocument()
  })

  it('calls onAdd with the correct book id when the button is clicked', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<BookCard book={mockBook} quantity={0} onAdd={onAdd} />)
    await user.click(screen.getByRole('button', { name: /add clean code to basket/i }))
    expect(onAdd).toHaveBeenCalledWith(1)
  })

  it('shows the quantity badge when quantity is greater than 0', () => {
    render(<BookCard book={mockBook} quantity={3} onAdd={vi.fn()} />)
    expect(screen.getByLabelText('3 in basket')).toBeInTheDocument()
  })

  it('hides the quantity badge when quantity is 0', () => {
    render(<BookCard book={mockBook} quantity={0} onAdd={vi.fn()} />)
    expect(screen.queryByLabelText(/in basket/)).not.toBeInTheDocument()
  })
})
