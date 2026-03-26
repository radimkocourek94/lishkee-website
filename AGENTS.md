# AGENTS.md

Agent instructions for the **Lishkee Website** repository — an Astro 6 static site
with Tailwind CSS v4, TypeScript, and i18n (English + Czech).

---

## Build / Dev / Deploy Commands

| Command             | Purpose                                        |
| :------------------ | :--------------------------------------------- |
| `npm install`       | Install dependencies                           |
| `npm run dev`       | Start Astro dev server at `localhost:4321`      |
| `npm run build`     | Production build to `./dist/`                   |
| `npm run preview`   | Preview the production build locally            |

- **Node requirement:** >=22.12.0 (set in `package.json` `engines`).
- **No linter or formatter** is configured (no ESLint, Prettier, or Biome).
  Follow the style conventions below manually.
- **No test framework** is configured. There are no tests in this repo.
- CI runs via GitHub Actions (`.github/workflows/deploy.yml`): push to `main`
  triggers `npm ci` then `astro build` on Node 22, then deploys to GitHub Pages.

After making changes, always verify with `npm run build` to catch TypeScript
errors, broken imports, and Astro template issues.

---

## Project Structure

```
src/
  pages/            # Route files — one .astro per page
    index.astro     # English homepage
    about.astro     # English about
    music.astro     # English music
    cs/             # Czech locale mirror (same structure)
  layouts/
    BaseLayout.astro  # Shared HTML shell (head, nav, footer)
  components/       # Reusable .astro components (PascalCase filenames)
  data/             # Static data modules (.ts) — tracks, releases, band info
  i18n/             # Locale strings and translation helpers
  utils/            # Utility functions
  styles/
    global.css      # Tailwind v4 config + custom theme + utility classes
  assets/           # Self-hosted fonts and optimised images (use astro:assets)
  drafts/           # Work-in-progress pages (not linked in nav)
public/
  images/           # Unprocessed static images served as-is
```

---

## Code Style

### TypeScript

- **Quotes:** Double quotes (`"`) everywhere — imports, strings, types.
- **Semicolons:** None. Rely on ASI. Never add semicolons.
- **Indentation:** 2 spaces. No tabs.
- **Trailing commas:** Always on the last item in objects and arrays.
- **Variables/functions:** `camelCase` (`useTranslations`, `getLocaleFromUrl`).
- **Interfaces and types:** `PascalCase` (`Track`, `Release`, `Locale`).
- **`interface` vs `type`:** Use `interface` for data shapes (objects). Use `type`
  for aliases and unions.
- **Exports:** Named exports only. Avoid `export default` (one legacy exception
  in `utils/embed.ts`).
- **Imports:** Named imports for values. Use `import type { X }` for type-only
  imports. Relative paths with `"./"` or `"../"`. No path aliases.

### Astro Components

- **Filenames:** PascalCase (`HeroSlider.astro`, `MailingListForm.astro`).
- **Frontmatter ordering:**
  1. Framework/Astro imports (`astro:assets`, `astro:transitions`)
  2. Component imports (default import for `.astro` files)
  3. Data / utility / i18n imports (named imports)
  4. Type imports (`import type { ... }`)
  5. Asset imports (images, fonts)
  6. `interface Props { ... }` definition
  7. Local logic (locale detection, translations, computed values)
- **Props:** Define with `interface Props { ... }` in frontmatter. Access via
  `const { title, description = "default" } = Astro.props`. Use `?` for optional
  props. Use `[key: string]: unknown` for rest/pass-through props.
- **Default imports** are used only for `.astro` component imports. Everything
  else uses named imports.

### CSS / Styling

- **Tailwind v4** utility-first. Import via `@import "tailwindcss"` in `global.css`.
- Custom theme lives in the `@theme` block of `global.css` — semantic color tokens
  (`--color-bg`, `--color-accent`, `--color-text`, `--color-muted`, etc.) and font
  families (`--font-body`, `--font-display`).
- Use Tailwind utility classes in templates. Reference semantic tokens as
  `text-accent`, `bg-bg`, `text-muted`, `bg-accent/10`, etc.
- Use `class:list={[...]}` for conditional classes.
- **No component-scoped `<style>` blocks.** All shared styles go in `global.css`.
- Custom utility classes (`.glass-card`, `.btn-gradient`, `.gradient-text`,
  `.accent-line`, `.section-divider`, animations) are defined in `global.css`.
- Self-hosted fonts via `@font-face` with `font-display: swap` and unicode-range
  subsetting. Display font is preloaded in `BaseLayout.astro`.

### HTML / Templates

- Use `{/* JSX comments */}` in Astro templates.
- Render raw HTML with `set:html={variable}`.
- Iterate with `.map()` and arrow functions.
- Conditional rendering with ternary: `{condition ? <El /> : null}`.
- Responsive design via Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`).

---

## Internationalisation (i18n)

- **Default locale:** English (`en`) — no prefix in URL paths.
- **Additional locale:** Czech (`cs`) — pages under `src/pages/cs/`.
- Translation strings live in `src/i18n/en.ts` and `src/i18n/cs.ts`, keyed by
  dot-notation strings (e.g., `"meta.home.title"`).
- Use `useTranslations(locale)` to get a `t()` function in frontmatter.
- Helper functions in `src/i18n/index.ts`: `getLocaleFromUrl(url)`,
  `localePath(locale, path)`, `getAlternateLocalePath(url)`.
- When adding a new page, create both `src/pages/<page>.astro` and
  `src/pages/cs/<page>.astro`. Add translation keys to both locale files.

---

## Accessibility

- Skip-to-content link in `BaseLayout.astro`.
- `aria-label`, `aria-hidden`, and `sr-only` classes for screen readers.
- `:focus-visible` outline styling in `global.css`.
- `@media (prefers-reduced-motion: reduce)` disables all animations and smooth
  scrolling.
- All interactive elements must be keyboard-accessible and have visible focus
  indicators.

---

## View Transitions

- Astro `ClientRouter` is used for SPA-like page transitions.
- `transition:animate="fade"` on content sections; `transition:name` on nav/footer
  to pin them during transitions.
- Client-side scripts must listen for `astro:after-swap` to reinitialise after
  navigation. Use `AbortController` for listener cleanup.

---

## Data Management

- Band info, members, socials: `src/data/band.ts`
- Track metadata and Bandcamp embeds: `src/data/tracks.ts`
- Album/release metadata and embeds: `src/data/releases.ts`
- Social link labels and icons: `src/data/socials.ts`
- Bandcamp embed iframes use dark theme params: `bgcol=000000`,
  `linkcol=c9a84c`, `transparent=true`.
- If a track's `embedHtml` is empty, a placeholder is shown automatically.

---

## Deployment

- **Target:** GitHub Pages at `https://radimkocourek94.github.io/lishkee-website`.
- **Base path:** `/lishkee-website` (set in `astro.config.mjs`).
- All asset references must work with this base path. Use Astro's asset handling
  (`astro:assets`, `import` for images) rather than hardcoded absolute paths.
- Push to `main` triggers the deploy workflow automatically.
