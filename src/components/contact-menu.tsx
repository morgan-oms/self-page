import { Contact } from "lucide-react";
import { DockMenu, dockMenuItemClass } from "@/components/dock-menu";
import { useResume, useT } from "@/i18n/react";
import { cn } from "@/lib/utils";

/**
 * Dock button that opens a menu with every contact channel from the resume
 * data (GitHub, LinkedIn, Instagram, e-mail).
 */
export function ContactMenu({ tooltipClassName }: { tooltipClassName?: string }) {
  const DATA = useResume();
  const t = useT();

  return (
    <DockMenu
      icon={<Contact className="size-full" />}
      label={t("nav.contact")}
      align="center"
      tooltipClassName={tooltipClassName}
    >
      {Object.values(DATA.contact.social).map((social) => {
        const Icon = social.icon;
        const external = social.url.startsWith("http");
        return (
          <a
            key={social.name}
            role="menuitem"
            href={social.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(dockMenuItemClass, "text-foreground")}
          >
            <Icon aria-hidden className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
            {social.name}
          </a>
        );
      })}
    </DockMenu>
  );
}
