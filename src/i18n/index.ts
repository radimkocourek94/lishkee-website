import type { Locale, Translations } from "./types"
import { en } from "./en"
import { cs } from "./cs"

const translations: Record<Locale, Translations> = { en, cs }

/** The Astro base path, without a trailing slash (empty string when "/"). */
const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")

/**
 * Returns a translation function for the given locale.
 * Falls back to English if the key is missing in the target locale.
 */
export function useTranslations(locale: Locale) {
  const dict = translations[locale]
  return function t(key: string): string {
    return dict[key] ?? en[key] ?? key
  }
}

/**
 * Derive the locale from an Astro URL pathname.
 * Strips the base prefix first, then checks for /cs/.
 */
export function getLocaleFromUrl(pathname: string): Locale {
  // Remove the base prefix so locale detection works regardless of deployment path
  const rel = base ? pathname.replace(new RegExp(`^${base}`), "") || "/" : pathname
  if (rel.startsWith("/cs/") || rel === "/cs") return "cs"
  return "en"
}

/**
 * Build a localised, base-aware path.
 *   localePath("/music", "cs")  →  "{base}/cs/music"
 *   localePath("/music", "en")  →  "{base}/music"
 *   localePath("/", "cs")       →  "{base}/cs"
 *   localePath("/", "en")       →  "{base}/"
 */
export function localePath(path: string, locale: Locale): string {
  const localePart = locale === "en" ? "" : "/cs"
  const pagePart = path === "/" ? "" : path
  const full = `${base}${localePart}${pagePart}`
  return full || "/"
}

/**
 * Return the equivalent path in the *other* locale (for the language switcher).
 */
export function getAlternateLocalePath(pathname: string): {
  locale: Locale
  path: string
} {
  const currentLocale = getLocaleFromUrl(pathname)
  // Strip base to get the relative portion
  const rel = base ? pathname.replace(new RegExp(`^${base}`), "") || "/" : pathname

  if (currentLocale === "cs") {
    // Strip the /cs prefix to get the English path
    const enRel = rel.replace(/^\/cs\/?/, "/") || "/"
    return { locale: "en", path: `${base}${enRel === "/" ? "/" : enRel}` }
  }
  // English → Czech
  const csRel = rel === "/" ? "/cs" : `/cs${rel}`
  return { locale: "cs", path: `${base}${csRel}` }
}

export type { Locale }
