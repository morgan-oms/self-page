import { Check, Languages } from "lucide-react";
import { DockMenu, dockMenuItemClass } from "@/components/dock-menu";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** URL of the current page in each language. */
  alternates: Record<Locale, string>;
  tooltipClassName?: string;
}

/**
 * Globe button for the dock. Opens a menu with the three languages; each
 * option links to the same page in that language.
 */
export function LanguageSwitcher({ alternates, tooltipClassName }: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useT();

  // Keep the #hash so switching language on "/#projects" lands on the same section.
  const withHash = (href: string) =>
    typeof window !== "undefined" ? `${href}${window.location.hash}` : href;

  return (
    <DockMenu
      icon={<Languages className="size-full" />}
      label={t("nav.language")}
      buttonLabel={`${t("nav.language")}: ${LOCALE_META[locale].label}`}
      align="end"
      tooltipClassName={tooltipClassName}
    >
      {LOCALES.map((option) => {
        const active = option === locale;
        return (
          <a
            key={option}
            role="menuitem"
            href={alternates[option]}
            hrefLang={LOCALE_META[option].htmlLang}
            lang={LOCALE_META[option].htmlLang}
            aria-current={active ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              window.location.href = withHash(alternates[option]);
            }}
            className={cn(
              dockMenuItemClass,
              "justify-between",
              active ? "font-semibold text-foreground" : "text-muted-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <span className="w-6 font-mono text-xs text-muted-foreground">
                {LOCALE_META[option].short}
              </span>
              {LOCALE_META[option].label}
            </span>
            {active && <Check className="size-4" aria-hidden />}
          </a>
        );
      })}
    </DockMenu>
  );
}
