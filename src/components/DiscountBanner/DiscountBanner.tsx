import './DiscountBanner.css'
import { DISCOUNT_RATES } from '../../domain/DiscountPolicy'

export function DiscountBanner() {
  const entries = [...DISCOUNT_RATES.entries()].filter(([, rate]) => rate > 0)

  return (
    <div className="discount-banner d-flex align-items-center gap-2">
      <span>ℹ️</span>
      <span>
        <strong>Discounts: </strong>
        {entries.map(([size, rate], i) => (
          <span key={size}>
            {size} books ({Math.round(rate * 100)}%)
            {i < entries.length - 1 && ' • '}
          </span>
        ))}
      </span>
    </div>
  )
}
