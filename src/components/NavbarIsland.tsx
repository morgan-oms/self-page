import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import type { Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/react";

interface NavbarIslandProps {
  locale: Locale;
  /** URL of the current page in each language, for the language switcher. */
  alternates: Record<Locale, string>;
}

export default function NavbarIsland({ locale, alternates }: NavbarIslandProps) {
  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider delayDuration={0}>
          <Navbar alternates={alternates} />
        </TooltipProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
