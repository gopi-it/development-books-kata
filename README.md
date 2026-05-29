# Development Books Kata

Book store pricing kata built with React + TypeScript + Bootstrap 5.

Based on: https://github.com/stephane-genicot/katas/blob/master/DevelopmentBooks.md

## The Problem

Five books in a series, each 50 EUR. Discounts apply when buying different titles together:

| Distinct titles | Discount |
|---|---|
| 2 | 5% |
| 3 | 10% |
| 4 | 20% |
| 5 | 25% |

The tricky part: a basket of `2×CleanCode + 2×CleanCoder + 2×CleanArchitecture + 1×TDD + 1×LegacyCode` should be **320 EUR**, not 322.50. Two groups of 4 beats one group of 5 + one group of 3.

## Stack

- Vite + React 18 + TypeScript
- Vitest + Testing Library
- Bootstrap 5

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # watch mode
npm run test:run  # single run
```

## Project Structure

```
src/
  domain/         # pure business logic, no React
  application/    # orchestration layer
  components/     # UI components
  hooks/          # React state wiring
  test/           # unit + component tests
```
