// Greedy pass: repeatedly pull the largest possible distinct set until empty.
function greedyGroup(counts) {
  const working = new Map(counts)
  const groups = []

  while (working.size > 0) {
    const available = [...working.keys()]
    const group = new Set(available)
    groups.push(group)

    for (const id of available) {
      const remaining = (working.get(id) ?? 0) - 1
      if (remaining <= 0) {
        working.delete(id)
      } else {
        working.set(id, remaining)
      }
    }
  }

  return groups
}

// A (5-set + 3-set) costs more than two 4-sets — swap them out.
// 5×0.75 + 3×0.90 = 322.50 vs 4×0.80 + 4×0.80 = 320.00
function optimizePairs(groups) {
  const result = groups.map(g => new Set(g))

  let keepOptimizing = true
  while (keepOptimizing) {
    const idx5 = result.findIndex(g => g.size === 5)
    const idx3 = result.findIndex(g => g.size === 3)

    if (idx5 === -1 || idx3 === -1) {
      keepOptimizing = false
      break
    }

    const fiveGroup = result[idx5]
    const threeGroup = result[idx3]
    const extras = [...fiveGroup].filter(id => !threeGroup.has(id))
    const bookToMove = extras[0]

    result[idx5] = new Set([...fiveGroup].filter(id => id !== bookToMove))
    result[idx3] = new Set([...threeGroup, bookToMove])
  }

  return result
}

export function groupBasket(counts) {
  return optimizePairs(greedyGroup(counts))
}
