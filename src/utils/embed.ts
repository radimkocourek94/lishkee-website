export function makeResponsiveEmbed(embedHtml: string): string {
  if (!embedHtml) return ""

  // Detect Bandcamp album vs track by presence of 'album=' or 'track=' in the iframe src
  const isAlbum = /album=/i.test(embedHtml)
  const paddingClass = isAlbum ? "embed-responsive--album" : "embed-responsive--track"

  // Remove fixed width/height attributes and inline style attributes to avoid layout issues
  let sanitized = embedHtml
    .replace(/(width|height)=["']?\d+px?["']?/gi, "")
    .replace(/\s*style=(['\"])(.*?)\1/gi, "")

  // Ensure the iframe uses lazy loading and fills the wrapper
  sanitized = sanitized.replace(/<iframe\s+/i, '<iframe loading="lazy" style="border:0;width:100%;height:100%;" ')

  return `<div class="embed-responsive ${paddingClass}"><div class="embed-inner">${sanitized}</div></div>`
}

export default makeResponsiveEmbed
