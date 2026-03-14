export function makeResponsiveEmbed(embedHtml: string): string {
  if (!embedHtml) return ""

  // Detect embed type:
  // - Album embeds: contain 'album=' in the iframe src
  // - Large track embeds: contain 'track=' AND 'size=large' (square artwork player)
  // - Small track embeds: contain 'track=' without 'size=large' (minimal row player)
  const isAlbum = /album=/i.test(embedHtml)
  const isLargeTrack = /track=/i.test(embedHtml) && /size=large/i.test(embedHtml)

  let paddingClass: string
  if (isAlbum) {
    paddingClass = "embed-responsive--album"
  } else if (isLargeTrack) {
    paddingClass = "embed-responsive--large-track"
  } else {
    paddingClass = "embed-responsive--track"
  }

  // Remove fixed width/height attributes and inline style attributes to avoid layout issues
  let sanitized = embedHtml
    .replace(/(width|height)=["']?\d+px?["']?/gi, "")
    .replace(/\s*style=(['\"])(.*?)\1/gi, "")

  // Ensure the iframe uses lazy loading and fills the wrapper
  sanitized = sanitized.replace(/<iframe\s+/i, '<iframe loading="lazy" style="border:0;width:100%;height:100%;" ')

  return `<div class="embed-responsive ${paddingClass}"><div class="embed-inner">${sanitized}</div></div>`
}

export default makeResponsiveEmbed
