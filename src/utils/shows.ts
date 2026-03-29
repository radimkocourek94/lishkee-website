interface Show {
  event: string
  date: string
  year: string
}

interface ShowGroup {
  year: string
  shows: { event: string, date: string }[]
}

/** Parse a show list string into { event, date, year } entries */
export function parseShows(raw: string): Show[] {
  if (!raw.trim()) return []
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const lastComma = line.lastIndexOf(",")
      if (lastComma === -1) return { event: line, date: "", year: "" }
      const event = line.slice(0, lastComma).trim()
      const date = line.slice(lastComma + 1).trim()
      const yearMatch = date.match(/\b(20\d{2})\b/) || line.match(/\b(20\d{2})\b/)
      const year = yearMatch ? yearMatch[1] : ""
      return { event, date, year }
    })
}

/** Group shows by year, preserving original order within each year */
export function groupByYear(shows: Show[]): ShowGroup[] {
  const groups: ShowGroup[] = []
  const seen = new Map<string, number>()
  for (const show of shows) {
    const key = show.year || "Other"
    if (seen.has(key)) {
      groups[seen.get(key)!].shows.push({ event: show.event, date: show.date })
    } else {
      seen.set(key, groups.length)
      groups.push({ year: key, shows: [{ event: show.event, date: show.date }] })
    }
  }
  return groups
}
