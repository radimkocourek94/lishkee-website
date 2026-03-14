export interface Release {
  title: string
  year: number
  coverArt: string // path to /public/images/
  albumEmbedHtml: string // full Bandcamp album embed iframe
  description?: string
}

export const releases: Release[] = [
  {
    title: "Collections of Pink, Blue, and All the Other Colors, Too",
    year: 2025,
    coverArt: "/images/collections-cover.jpg",
    albumEmbedHtml: "", // paste Bandcamp album embed here
    description: "A combination of dream pop and dark electronica.",
  },
]
