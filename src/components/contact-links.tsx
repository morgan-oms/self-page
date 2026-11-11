import BlurFade from "@/components/magicui/blur-fade";
import { dockTooltipClass } from "@/components/dock-menu";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResume, useT } from "@/i18n/react";
import { cn } from "@/lib/utils";

interface ContactLinksProps {
  align?: "start" | "center";
  /** Delay of the entrance animation, to follow the rest of the page. */
  delay?: number;
  className?: string;
}

/**
 * Row of round icon buttons for the contact channels (GitHub, LinkedIn,
 * Instagram, e-mail). No visible text: each one has an accessible name and a
 * tooltip. Sizes are exact px values on purpose, because the site raises the
 * root font size (baseFontSize in config.ts) and rem-based sizes would grow.
 */
export function ContactLinks({ align = "start", delay = 0, className }: ContactLinksProps) {
  const DATA = useResume();
  const t = useT();

  return (
    <TooltipProvider delayDuration={0}>
      <BlurFade delay={delay} className={className}>
        <ul
          aria-label={t("contact.links")}
          className={cn(
            "flex flex-wrap gap-[10px]",
            align === "center" ? "justify-center" : "justify-start",
          )}
        >
          {Object.values(DATA.contact.social).map((social) => {
            const Icon = social.icon;
            const external = social.url.startsWith("http");
            return (
              <li key={social.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      aria-label={social.name}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex size-[44px] items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {/* The icons carry an inner <title>; hiding them from assistive tech and
                          pointer events avoids a doubled name and a native tooltip. */}
                      <Icon aria-hidden className="pointer-events-none size-[20px]" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8} className={dockTooltipClass}>
                    <p>{social.name}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </BlurFade>
    </TooltipProvider>
  );
}
