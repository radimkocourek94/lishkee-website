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
    albumEmbedHtml: `<iframe style="border: 0; width: 400px; height: 472px;" src="https://bandcamp.com/EmbeddedPlayer/album=408392112/size=large/bgcol=333333/linkcol=ffffff/artwork=small/transparent=true/" seamless><a href="https://lishkee.bandcamp.com/album/collections-of-pink-blue-all-the-other-colors-too" target="_blank" rel="noopener noreferrer" aria-label="Collections of Pink, Blue, and All the Other Colors, Too" class="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">𝓒𝓸𝓵𝓵𝓮𝓬𝓽𝓲𝓸𝓷𝓼 𝓸𝓯 𝓟𝓲𝓷𝓴, 𝓑𝓵𝓾𝓮, 𝓪𝓷𝓭 𝓐𝓵𝓵 𝓽𝓱𝓮 𝓞𝓽𝓱𝓮𝓻 𝓒𝓸𝓵𝓸𝓻𝓼, 𝓣𝓸𝓸</a></iframe>`,
    description: "A combination of dream pop and dark electronica.",
  },
]
