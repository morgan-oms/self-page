import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactMenu } from "@/components/contact-menu";
import { dockTooltipClass } from "@/components/dock-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { localizePath, type Locale } from "@/i18n/config";
import { useLocale, useResume, useT } from "@/i18n/react";

/**
 * Bottom toolbar: Home, Blog, Contact (menu), Theme and Language (menu).
 * One group, no dividers.
 */
export default function Navbar({ alternates }: { alternates: Record<Locale, string> }) {
  const DATA = useResume();
  const locale = useLocale();
  const t = useT();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(12px,env(safe-area-inset-bottom))] z-30 px-[6px] sm:bottom-4 sm:px-0">
      <Dock className="z-50 pointer-events-auto relative h-auto items-center p-[6px] gap-[6px] sm:h-14 sm:p-2 sm:gap-2 w-fit max-w-full mx-auto flex border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={isExternal ? item.href : localizePath(item.href, locale)}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={t(item.labelKey)}
                >
                  <DockIcon className="rounded-2xl cursor-pointer size-full bg-background p-0 text-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className={dockTooltipClass}>
                <p>{t(item.labelKey)}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <ContactMenu />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className={dockTooltipClass}>
            <p>{t("nav.theme")}</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        <LanguageSwitcher alternates={alternates} />
      </Dock>
    </div>
  );
}
