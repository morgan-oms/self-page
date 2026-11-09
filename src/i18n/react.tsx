import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { useTranslations } from "./ui";
import { getResume } from "@/data/resume";

// React islands don't have access to Astro.currentLocale, so pages pass the
// locale down once and components read it from this context.
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Translate function for the current locale: t("nav.home"). */
export function useT() {
  const locale = useLocale();
  return useMemo(() => useTranslations(locale), [locale]);
}

/** Resume data already resolved to the current locale. */
export function useResume() {
  return getResume(useLocale());
}
