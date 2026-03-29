interface Show {
  event: string
  date: string
  year: string
  url?: string
}

interface ShowGroup {
  year: string
  shows: { event: string, date: string }[]
}

/** Parse a show list string into { event, date, year } entries */
export function parseShows(raw: string): Show[] {
  if (!raw.trim()) return []

  const lines = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  const shows: Show[] = []

  for (const originalLine of lines) {
    // if the line is just a url, attach it to the previous show when possible
    const urlOnlyMatch = originalLine.match(/^https?:\/\/\S+$/)
    if (urlOnlyMatch) {
      const url = urlOnlyMatch[0]
      if (shows.length > 0 && !shows[shows.length - 1].url) {
        shows[shows.length - 1].url = url
        continue
      }
      // otherwise create a placeholder show with only url
      shows.push({ event: "", date: "", year: "", url })
      continue
    }

    // extract a single http(s) URL if present in the same line, and remove it
    let line = originalLine
    const urlMatch = line.match(/https?:\/\/\S+/)
    const url = urlMatch ? urlMatch[0] : undefined
    if (url) line = line.replace(url, "").trim()

    const lastComma = line.lastIndexOf(",")
    if (lastComma === -1) {
      shows.push({ event: line, date: "", year: "", url })
      continue
    }

    const event = line.slice(0, lastComma).trim()
    const date = line.slice(lastComma + 1).trim()
    const yearMatch = date.match(/\b(20\d{2})\b/) || line.match(/\b(20\d{2})\b/)
    const year = yearMatch ? yearMatch[1] : ""
    shows.push({ event, date, year, url })
  }

  return shows
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
