// Languages supported by the site. The default locale has no URL prefix
// ("/blog"), the others are prefixed ("/pt-br/blog", "/es/blog").
// Keep this list in sync with `i18n.locales` in astro.config.mjs.
export const LOCALES = ["en", "pt-br", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  {
    /** Name of the language written in that language (used in the switcher). */
    label: string;
    /** Short code shown in compact places. */
    short: string;
    /** Value for <html lang> and hreflang. */
    htmlLang: string;
    /** Value for og:locale. */
    ogLocale: string;
  }
> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
  "pt-br": { label: "Português", short: "PT", htmlLang: "pt-BR", ogLocale: "pt_BR" },
  es: { label: "Español", short: "ES", htmlLang: "es", ogLocale: "es_ES" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Detects the locale from a pathname such as "/pt-br/blog/post". */
export function getLocaleFromPath(pathname: string): Locale {
  const [first] = pathname.split("/").filter(Boolean);
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/** Removes the locale prefix: "/pt-br/blog" -> "/blog". */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0]) && segments[0] !== DEFAULT_LOCALE) segments.shift();
  const path = "/" + segments.join("/");
  return pathname.endsWith("/") && path !== "/" ? `${path}/` : path;
}

/** Adds the locale prefix to a locale-less path: ("/blog", "es") -> "/es/blog". */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
}

/** URL of the same page in every language, keyed by locale. */
export function getAlternatePaths(pathname: string): Record<Locale, string> {
  const base = stripLocale(pathname);
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, localizePath(base, locale)]),
  ) as Record<Locale, string>;
}
