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
    MailingListForm.astro  # Mailing list signup
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

## Deploying to GitHub Pages

This repository is set up to build and publish the site to GitHub Pages using a GitHub Actions workflow. Pushes to the `main` branch trigger the workflow at `.github/workflows/deploy.yml`, which installs dependencies, runs `npm run build`, and publishes the generated `dist/` output to GitHub Pages.

Key points:

- The CI workflow that performs the build + publish is at `.github/workflows/deploy.yml`.
- Push to `main` (or run the workflow manually from the Actions tab) to build and deploy.
- The production output is the `dist/` directory created by `npm run build`.
- To use a custom domain, either add a `CNAME` file to `public/` or configure the domain under the repository Settings → Pages.

If you prefer Netlify or another host, the project remains compatible — set the build command to `npm run build` and the publish directory to `dist` on your chosen platform.

## Mailing List / Form Handling

The site includes a simple HTML form (see `src/components/MailingListForm.astro`). The form markup contains Netlify-specific attributes (`data-netlify="true"` and `netlify-honeypot`) which only enable Netlify's built-in form handling when the site is deployed on Netlify.

Because this repository is configured to deploy to GitHub Pages by default, those Netlify form features will not collect submissions on the live site. Options to enable mailing-list collection when deploying to GitHub Pages:

1. Use a third‑party form backend (recommended) — e.g. Formspree, Getform, FormKeep. Replace the form `action` with the provider endpoint and keep `method="POST"`.
2. Use a serverless function or your own backend to receive and forward submissions.
3. Continue deploying to Netlify instead (Netlify will process the existing attributes automatically).

Example (Formspree):

```html
<form action="https://formspree.io/f/yourFormId" method="POST">
  <input type="email" name="email" required />
  <button type="submit">Sign Up</button>
</form>
```

For local development, the form will submit in the browser but no server-side storage is available unless you wire it to a backend or third-party service.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`          |
| `npm run build`   | Build static site to `./dist/`               |
| `npm run preview` | Preview production build locally             |
