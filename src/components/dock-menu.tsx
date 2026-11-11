import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { DockIcon } from "@/components/magicui/dock";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Tooltip look shared by the toolbar and the contact icons. */
export const dockTooltipClass =
  "rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

/** Classes shared by every item inside a DockMenu, so all menus look alike. */
export const dockMenuItemClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none";

interface DockMenuProps {
  /** Icon shown on the dock button, e.g. <Languages className="size-full" />. */
  icon: ReactNode;
  /** Short name: tooltip text and accessible name of the menu. */
  label: string;
  /** Accessible name of the button, when it should say more than `label`. */
  buttonLabel?: string;
  /** Where the menu sits relative to the button. */
  align?: "center" | "end";
  tooltipClassName?: string;
  /** Menu entries. Each one must have role="menuitem" (see dockMenuItemClass). */
  children: ReactNode;
}

/**
 * A dock button that opens a small menu above it. Closes on outside click,
 * Escape or after choosing an item. Opens with focus on the first item and
 * supports ArrowUp/ArrowDown/Home/End.
 */
export function DockMenu({
  icon,
  label,
  buttonLabel,
  align = "center",
  tooltipClassName = dockTooltipClass,
  children,
}: DockMenuProps) {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const items = () =>
    Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);

  useEffect(() => {
    if (!open) return;
    items()[0]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
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

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % list.length;
    else if (event.key === "ArrowUp") next = (index - 1 + list.length) % list.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = list.length - 1;
    if (next >= 0) {
      event.preventDefault();
      list[next]?.focus();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <Tooltip open={tooltipOpen && !open} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
            <button
              ref={buttonRef}
              type="button"
              className="size-full flex items-center justify-center cursor-pointer"
              aria-label={buttonLabel ?? label}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              {icon}
            </button>
          </DockIcon>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8} className={tooltipClassName}>
          <p>{label}</p>
          <TooltipArrow className="fill-primary" />
        </TooltipContent>
      </Tooltip>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('[role="menuitem"]')) setOpen(false);
          }}
          className={cn(
            "absolute bottom-full mb-3 min-w-44 rounded-xl border border-border bg-card/95 backdrop-blur-xl p-1 shadow-lg",
            align === "center" ? "left-1/2 -translate-x-1/2" : "right-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
