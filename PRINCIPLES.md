# Design Principles Applied

## Test-Driven Development (TDD)

Tests were written **before** their corresponding implementations. Each test name is a
plain-English specification so the test suite acts as living documentation.

**TDD wave order:**

1. `DiscountPolicy.test.ts` → `DiscountPolicy.ts`
2. `Basket.test.ts` → `Basket.ts`
3. `BasketGrouper.test.ts` → `BasketGrouper.ts`
4. `PricingCalculator.test.ts` → `PricingCalculator.ts` + `BasketService.ts`
5. `BookCard.test.tsx` → `BookCard.tsx`
6. `BasketSidebar.test.tsx` → `BasketItem.tsx` + `BasketSidebar.tsx`

Run with: `npm test`

---

## SOLID Principles

### S — Single Responsibility
Every module has exactly one reason to change:

| File | Single responsibility |
|---|---|
| `BasketGrouper.ts` | Grouping books into discount sets |
| `PricingCalculator.ts` | Arithmetic — multiplying prices by discount factors |
| `BasketService.ts` | Orchestrating grouper + calculator |
| `useBasket.ts` | Bridging React state to pure domain functions |
| `BookCard.tsx` | Rendering one book card |
| `BasketSidebar.tsx` | Rendering basket state |

### O — Open/Closed
- **`Book.ts`**: add a sixth book to `CATALOGUE` — nothing in `BasketGrouper`, `PricingCalculator`, or any component changes.
- **`DiscountPolicy.ts`**: change a discount rate in `DISCOUNT_RATES` — `DiscountBanner` automatically reflects the new rate at runtime because it reads the same constant.

### L — Liskov Substitution
`PricingCalculator.test.ts` injects a `MockDiscountPolicy` that returns a flat 50% rate for
any set size. The calculator produces correct results with this stub, proving any conforming
`IDiscountPolicy` can substitute for `DiscountPolicy` without altering calculator behavior.

### I — Interface Segregation
`IDiscountPolicy` declares **one method**: `discountFor(setSize: number): number`.
`PricingCalculator` asks for nothing more — it doesn't receive book titles, basket state, or formatting.

### D — Dependency Inversion
`PricingCalculator` is constructed with `new PricingCalculator(policy: IDiscountPolicy)`.
The high-level calculation module depends on the `IDiscountPolicy` abstraction, not the concrete
`DiscountPolicy` class. This enables test substitution and future policy implementations.

---

## Clean Code

| Principle | Where it appears |
|---|---|
| **Meaningful names** | `greedyGroup`, `optimizePairs`, `groupBasket`, `BOOK_PRICE`, `DISCOUNT_RATES` — names explain intent without comments |
| **No magic numbers** | `BOOK_PRICE = 50` in `PricingCalculator.ts`; `DISCOUNT_RATES` map in `DiscountPolicy.ts` — values are defined once |
| **Small functions** | `greedyGroup` and `optimizePairs` in `BasketGrouper.ts` are each under 20 lines; `add`, `remove`, `clear` in `Basket.ts` are each 3–5 lines |
| **DRY** | `withUpdate` helper in `Basket.ts` removes duplication between `add` and `remove` |
| **Pure functions** | `Basket.ts` functions never mutate their input; they return new `Map` instances |
| **Tests as documentation** | Test names like `"produces two groups of size 4 for the kata example basket (not 5+3)"` describe behavior in plain English |
| **Layers of abstraction** | `App.tsx` contains layout only; `useBasket` contains state wiring; `BasketService` contains orchestration; domain files contain rules — each layer has one level of abstraction |
| **Extracted variables** | `hasItems`, `hasDiscount`, `booksInBasket` are named before JSX in `BasketSidebar.tsx` so the render is declarative and readable |

---

## Key Algorithm — Optimal Grouping

The naive greedy approach (take the largest distinct set each time) can produce a suboptimal result:

```
Basket: 2×CC, 2×CCo, 2×CA, 1×TDD, 1×LC

Greedy:
  Pass 1 → {CC, CCo, CA, TDD, LC}   size 5 → 5×50×0.75 = 187.50 EUR
  Pass 2 → {CC, CCo, CA}             size 3 → 3×50×0.90 = 135.00 EUR
  Total = 322.50 EUR  ← WRONG

Optimized (5+3 → 4+4):
  {CC, CCo, CA, TDD} + {CC, CCo, CA, LC}  two groups of 4
  4×50×0.80 + 4×50×0.80 = 160 + 160 = 320.00 EUR  ← CORRECT
```

`BasketGrouper.ts` runs the greedy pass first, then a post-optimization loop that converts every
`(5, 3)` pair into `(4, 4)` pairs until no such pairs remain.
