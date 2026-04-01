/**
 * Renders a markdown-like bio string into HTML with:
 * - HTML entity escaping
 * - Markdown-style *italic* converted to <em>
 * - Album/single titles auto-linked to Bandcamp/external URLs
 * - Localized "socials" label linked to Linktree
 * - Paragraph breaks preserved
 */
export function renderBio(bio: string, socialsLabel: string): string {
  let html = bio
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>")

  const linkClass =
    "text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"

  html = html.replace(
    /<em>Layers<\/em>/g,
    `<a href="https://lishkee.bandcamp.com/album/layers-2?t=2" target="_blank" rel="noopener noreferrer" aria-label="Layers" class="${linkClass}">\u{1D4DB}\u{1D4EA}\u{1D502}\u{1D4EE}\u{1D4FB}\u{1D4FC}</a>`,
  )
  html = html.replace(
    /<em>Distortions<\/em>/g,
    `<a href="https://lishkee.bandcamp.com/track/distortions" target="_blank" rel="noopener noreferrer" aria-label="Distortions" class="${linkClass}">\u{1D4D3}\u{1D4F2}\u{1D4FC}\u{1D4FD}\u{1D4F8}\u{1D4FB}\u{1D4FD}\u{1D4F2}\u{1D4F8}\u{1D4F7}\u{1D4FC}</a>`,
  )
  html = html.replace(
    /<em>Labyrint<\/em>/g,
    `<a href="https://kaznice.art/program/divadelni-svet-brno-labyrint/" target="_blank" rel="noopener noreferrer" class="${linkClass}"><em>Labyrint</em></a>`,
  )
  html = html.replace(
    /<em>Collections of Pink, Blue, and All the Other Colors, Too<\/em>/g,
    `<a href="https://lishkee.bandcamp.com/album/collections-of-pink-blue-all-the-other-colors-too" target="_blank" rel="noopener noreferrer" aria-label="Collections of Pink, Blue, and All the Other Colors, Too" class="${linkClass}">\u{1D4D2}\u{1D4F8}\u{1D4F5}\u{1D4F5}\u{1D4EE}\u{1D4EC}\u{1D4FD}\u{1D4F2}\u{1D4F8}\u{1D4F7}\u{1D4FC} \u{1D4F8}\u{1D4EF} \u{1D4DF}\u{1D4F2}\u{1D4F7}\u{1D4F4}, \u{1D4D1}\u{1D4F5}\u{1D4FE}\u{1D4EE}, \u{1D4EA}\u{1D4F7}\u{1D4ED} \u{1D4D0}\u{1D4F5}\u{1D4F5} \u{1D4FD}\u{1D4F1}\u{1D4EE} \u{1D4DE}\u{1D4FD}\u{1D4F1}\u{1D4EE}\u{1D4FB} \u{1D4D2}\u{1D4F8}\u{1D4F5}\u{1D4F8}\u{1D4FB}\u{1D4FC}, \u{1D4E3}\u{1D4F8}\u{1D4F8}</a>`,
  )

  const linkUrl = "https://linktr.ee/lishkee"
  const linkText = "linktr.ee/lishkee"

  // Convert explicit URL occurrences in the bio to a proper anchor
  html = html.replace(
    /linktr\.ee\/lishkee/g,
    `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${linkText}</a>`,
  )

  // Replace the localized socials label with the Linktree URL
  const escapedSocials = socialsLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const socialsRegex = new RegExp(escapedSocials, "g")
  html = html.replace(
    socialsRegex,
    `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${socialsLabel}</a>`,
  )

  // If neither the explicit URL nor the socials label was present, append a
  // fallback link so there is always at least one outbound reference
  if (!html.includes(linkText)) {
    html += `\n\n<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${linkText}</a>`
  }

  html = html
    .split("\n\n")
    .map((p) => `<p class="mb-6 leading-relaxed">${p.trim()}</p>`)
    .join("")

  return html
}
