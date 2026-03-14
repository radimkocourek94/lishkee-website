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
    embedHtml: `<iframe style="border: 0; width: 350px; height: 350px;" src="https://bandcamp.com/EmbeddedPlayer/track=389067325/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/" seamless><a href="https://lishkee.bandcamp.com/track/nightmares">Nightmares by Lishkee</a></iframe>`,
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
    embedHtml: "",
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
