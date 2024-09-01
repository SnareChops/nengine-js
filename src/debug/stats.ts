export const stats: stat[] = []

export interface stat {
  label: string
  value: () => string
}

// TODO: Add fps stats
export function enableStats(enabled: boolean) {
  // Enable default stats and early exit
  if (enabled) {
    return
  }
  // Disable default stats

}

export function debugStat(label: string, value: () => string) {
  for (let i = 0; i < stats.length; i++) {
    if (stats[i].label == label) {
      stats[i].value = value
      return
    }
  }
  stats.push({ label, value })
}

export function removeStat(label: string) {
  for (const [i, stat] of stats.entries()) {
    if (stat.label == label) {
      stats.splice(i, 1)
    }
  }
}
