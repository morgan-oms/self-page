import { useEffect, useId, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import { DockIcon } from "@/components/magicui/dock";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** URL of the current page in each language. */
  alternates: Record<Locale, string>;
  tooltipClassName?: string;
}

/**
 * Globe button for the dock. Opens a small menu above it with the three
 * languages; each option links to the same page in that language.
 */
export function LanguageSwitcher({ alternates, tooltipClassName }: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Keep the #hash so switching language on "/#projects" lands on the same section.
  const withHash = (href: string) =>
    typeof window !== "undefined" ? `${href}${window.location.hash}` : href;

  return (
    <div ref={rootRef} className="relative">
      <Tooltip open={tooltipOpen && !open} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
            <button
              ref={buttonRef}
              type="button"
              className="size-full flex items-center justify-center cursor-pointer"
              aria-label={`${t("nav.language")}: ${LOCALE_META[locale].label}`}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <Languages className="size-full" />
            </button>
          </DockIcon>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8} className={tooltipClassName}>
          <p>{t("nav.language")}</p>
          <TooltipArrow className="fill-primary" />
        </TooltipContent>
      </Tooltip>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={t("nav.language")}
          className="absolute bottom-full right-0 mb-3 min-w-40 rounded-xl border border-border bg-card/95 backdrop-blur-xl p-1 shadow-lg"
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
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
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
        </div>
      )}
    </div>
  );
}
