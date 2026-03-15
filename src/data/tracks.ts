export interface Track {
  id: number
  title: string
  duration: string
  embedHtml: string // full iframe string from Bandcamp (or Spotify/SoundCloud)
  infoUrl?: string
}

export const tracks: Track[] = [
  {
    id: 0,
    title: "Nightmares",
    duration: "",
    embedHtml: `<iframe style="border: 0; width: 350px; height: 350px;" src="https://bandcamp.com/EmbeddedPlayer/track=389067325/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/" seamless><a href="https://lishkee.bandcamp.com/track/nightmares" target="_blank" rel="noopener noreferrer" aria-label="Nightmares" class="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">Nightmares</a></iframe>`,
    infoUrl: "https://lishkee.bandcamp.com/track/nightmares",
  },
  {
    id: 1,
    title: "Not Much Left to Be Worried About 2.0",
    duration: "3:05",
    embedHtml: "",
    infoUrl: "",
  },
  {
    id: 2,
    title: "Game of Darts 2.0",
    duration: "3:03",
    embedHtml: "",
  },
  {
    id: 3,
    title: "Free-Floating Birds",
    duration: "3:11",
    embedHtml: "",
  },
  {
    id: 4,
    title: "Distortions",
    duration: "4:41",
    // NOTE: The Bandcamp embedded player requires the track ID in the iframe src.
    // Replace `XXXXX` with the actual Bandcamp track ID if you want the inline
    // player to show. Leaving the anchor present ensures users can still reach
    // the track on Bandcamp even without the iframe working.
    embedHtml: `<iframe style="border: 0; width: 350px; height: 350px;" src="https://bandcamp.com/EmbeddedPlayer/track=XXXXX/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/" seamless><a href="https://lishkee.bandcamp.com/track/distortions" target="_blank" rel="noopener noreferrer" aria-label="Distortions" class="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">𝓓𝓲𝓼𝓽𝓸𝓻𝓽𝓲𝓸𝓷𝓼</a></iframe>`,
  },
  {
    id: 5,
    title: "Breaking the Illusion",
    duration: "3:09",
    embedHtml: "",
  },
  {
    id: 6,
    title: "In Case of Emergency",
    duration: "3:44",
    embedHtml: "",
  },
  {
    id: 7,
    title: "Late Night Dawnings",
    duration: "3:14",
    embedHtml: "",
  },
]
