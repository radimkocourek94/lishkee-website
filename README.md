# Lishkee Website

Official website for **Lishkee** — an indie alt-pop project from Brno, Czechia.

Built with Astro, Tailwind CSS, and TypeScript. Static output, no CMS, no database.

## Quick Start

```bash
npm install
npm run dev
```

The dev server starts at **http://localhost:4321**.

To build for production:

```bash
npm run build
```

The static output is written to `./dist/` and can be deployed anywhere.

## Project Structure

```
src/
  pages/
    index.astro        # Homepage: hero slideshow, track list, mailing list CTA
    music.astro        # Music page: releases + track list
    about.astro        # About page: bio, members, socials
  layouts/
    BaseLayout.astro   # Shared HTML shell, fonts, nav, footer
  components/
    Nav.astro          # Sticky nav bar with mobile hamburger menu
    Footer.astro       # Site footer with photo credit
    HeroSlider.astro   # Full-width CSS fade slideshow
    TrackList.astro    # Track list with Bandcamp embeds
    MailingListForm.astro  # Mailing list signup (Netlify Forms)
  data/
    tracks.ts          # Track metadata + Bandcamp embed codes
    releases.ts        # Album/release metadata + embed codes
    band.ts            # Band info, bio, members, socials
  styles/
    global.css         # Tailwind config + custom animations
public/
  images/              # Band photos, cover art (drop files here)
```

## How to Add Bandcamp Embed Codes

1. Go to your Bandcamp track/album page
2. Click "Share / Embed" and select the embed option
3. Copy the `<iframe>` code

**For individual tracks** — open `src/data/tracks.ts` and paste the iframe string into the `embedHtml` field for the corresponding track:

```ts
{
  id: 1,
  title: "Not Much Left to Be Worried About 2.0",
  duration: "3:05",
  embedHtml: '<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/..." seamless></iframe>',
},
```

For the dark theme, include these URL parameters in the Bandcamp embed src:
- `bgcol=000000`
- `linkcol=c9a84c`
- `transparent=true`

**For full album embeds** — open `src/data/releases.ts` and paste into `albumEmbedHtml`.

If a track's `embedHtml` is empty, a "Streaming link coming soon" placeholder is shown automatically.

## How to Add Band Photos

1. Drop your image files into `public/images/`
2. Open `src/components/HeroSlider.astro`
3. Replace the placeholder URLs with paths like `/images/hero-1.jpg`
4. For the About page photo, edit the `<img>` src in `src/pages/about.astro`
5. For album cover art, update the `coverArt` path in `src/data/releases.ts`

## How to Update Bio, Members, and Socials

All band content lives in `src/data/band.ts`:

- **Bio**: Edit the `bio` string. Use `*text*` for italic (album/single titles).
- **Members**: Add or remove entries in the `members` array.
- **Socials**: Fill in URLs for `instagram`, `facebook`, `bandcamp`, `spotify`. Only non-empty values are rendered on the About page.
- **Logotype**: The decorative name `band.logotype` is used in the nav bar.

## Deploying to Netlify

Push this repo to GitHub, then connect it to Netlify:

1. Go to [app.netlify.com](https://app.netlify.com) and click "Add new site" > "Import an existing project"
2. Select your GitHub repo
3. Set **Build command** to `npm run build` and **Publish directory** to `dist`
4. Click "Deploy site"

Netlify will automatically build and deploy on every push to your main branch.

## Netlify Forms (Mailing List)

The mailing list form uses Netlify Forms. Once deployed to Netlify, form submissions are automatically collected in your Netlify dashboard under **Forms**. No additional configuration is needed — the `data-netlify="true"` attribute on the form handles it.

For local development, the form submits without error but data is not stored anywhere.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`          |
| `npm run build`   | Build static site to `./dist/`               |
| `npm run preview` | Preview production build locally             |
