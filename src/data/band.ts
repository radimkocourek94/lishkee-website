export const band = {
  name: "Lishkee",
  logotype: "\u22C6\u208A\u22B9Lishkee\u22B9\u208A\u22C6",
  members: [
    {
      name: "Vikt\u00F3ria \u0160m\u00EDdov\u00E1",
      role: "Vocals, Production, Instrumentation, Songwriting",
      cs_role: "Zp\u011Bv, produkce, instrumentace, skladba p\u00EDsn\u00ED",
    },
    {
      name: "Radim Kocourek",
      role: "Production, Instrumentation, Songwriting",
      cs_role: "Produkce, instrumentace, skladba p\u00EDsn\u00ED",
    },
  ],
  location: "Brno, Czechia",
  photoCredit: "Tom\u00E1\u0161 \u0160koda",
  socials: {
    instagram: "https://instagram.com/lishkee.music",
    youtube: "https://www.youtube.com/@lishkee.",
    facebook: "https://www.facebook.com/lishkee",
    spotify: "https://open.spotify.com/artist/4zzh4IMB53iM7clh96dPZH?autoplay=true",
    soundcloud: "https://www.soundcloud.com/lishkee",
    bandcamp: "https://lishkee.bandcamp.com",
    tiktok: "https://www.tiktok.com/@lishkee.music",
  },
}

/** Streaming platform URLs for the "Listen anywhere" section on the music page */
export const streamingLinks: Record<string, string> = {
  spotify: band.socials.spotify,
  appleMusic: "https://geo.music.apple.com/us/artist/lishkee/1591479879?app=music&ls=1",
  youtubeMusic: "https://music.youtube.com/channel/UCzQJfbiLCFGrN1BBK2uKT8A",
  amazonMusic: "https://music.amazon.com/artists/B09K2MK1P2",
  tidal: "https://tidal.com/artist/28950563",
  bandcamp: band.socials.bandcamp,
  soundcloud: band.socials.soundcloud,
  youtube: band.socials.youtube,
}
