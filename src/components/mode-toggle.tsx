import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useT } from "@/i18n/react";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useT();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      aria-label={t("nav.theme")}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {/* Shows the theme you will switch to. The CSS `dark:` variant follows
          the <html class="dark"> set before first paint, so there is no flash. */}
      <SunIcon className="hidden h-full w-full dark:block" />
      <MoonIcon className="block h-full w-full dark:hidden" />
    </Button>
  );
}
