export interface Track {
  id: number
  title: string
  duration: string
  embedHtml: string // full iframe string from Bandcamp (or Spotify/SoundCloud)
  infoUrl?: string
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Not Much Left to Be Worried About 2.0",
    duration: "3:05",
    embedHtml: "", // paste Bandcamp iframe embed code here
    infoUrl: "",
  },
  {
    id: 2,
    title: "Game of Darts 2.0",
    duration: "3:03",
    embedHtml: "", // paste Bandcamp iframe embed code here
  },
  {
    id: 3,
    title: "Free-Floating Birds",
    duration: "3:11",
    embedHtml: "", // paste Bandcamp iframe embed code here
  },
  {
    id: 4,
    title: "Distortions",
    duration: "4:41",
    embedHtml: "", // paste Bandcamp iframe embed code here
  },
  {
    id: 5,
    title: "Breaking the Illusion",
    duration: "3:09",
    embedHtml: "", // paste Bandcamp iframe embed code here
  },
  {
    id: 6,
    title: "In Case of Emergency",
    duration: "3:44",
    embedHtml: "", // paste Bandcamp iframe embed code here
  },
  {
    id: 7,
    title: "Late Night Dawnings",
    duration: "3:14",
    embedHtml: "", // paste Bandcamp iframe embed code here
  },
]
