/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale, useResume, useT } from "@/i18n/react";
import type { Locale } from "@/i18n/config";
import { formatMonthYear, formatMonthYearShort } from "@/i18n/ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// The logo is 40px on phones and 44px from 640px up. Exact px values on purpose:
// the site raises the root font size (baseFontSize in config.ts), which would
// scale rem sizes and break the alignment of the indented description below.
const LOGO_CLASS = "size-[40px] sm:size-[44px] flex-none";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={cn(LOGO_CLASS, "p-1 border rounded-full shadow ring-2 ring-border bg-muted")} />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(LOGO_CLASS, "p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain")}
      onError={() => setImageError(true)}
    />
  );
}

/** A short labelled bullet list. Renders nothing when there are no items. */
function SkillList({ label, items }: { label: string; items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-foreground/70">
        {label}
      </p>
      <ul className="list-disc space-y-0.5 pl-4 marker:text-muted-foreground/50">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** "Jun 2022 - Aug 2025" / "Jun 2022 - Present". Short month names on phones so it fits one line. */
function Period({
  start,
  end,
  presentLabel,
  locale,
}: {
  start: string;
  end: string | undefined;
  presentLabel: string;
  locale: Locale;
}) {
  return (
    <>
      <span className="sm:hidden">
        {formatMonthYearShort(start, locale)} -{" "}
        {end ? formatMonthYearShort(end, locale) : presentLabel}
      </span>
      <span className="hidden sm:inline">
        {formatMonthYear(start, locale)} - {end ? formatMonthYear(end, locale) : presentLabel}
      </span>
    </>
  );
}

interface Position {
  title: string;
  start: string;
  end: string | undefined;
  hardSkills: readonly string[];
  softSkills: readonly string[];
}

/** Hard and soft skill lists of one position. */
function SkillBlocks({ position }: { position: Position }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-3">
      <SkillList label={t("work.hard")} items={position.hardSkills} />
      <SkillList label={t("work.soft")} items={position.softSkills} />
    </div>
  );
}

/**
 * LinkedIn-style timeline for a company with more than one position (a
 * promotion): a dot per position joined by a vertical line, newest first.
 * Sizes are exact px values, like the logo, so the line and dots stay aligned.
 */
function PositionTimeline({
  positions,
  presentLabel,
  locale,
}: {
  positions: readonly Position[];
  presentLabel: string;
  locale: Locale;
}) {
  return (
    <ol className="flex flex-col">
      {positions.map((position, index) => {
        const isLast = index === positions.length - 1;
        return (
          <li key={position.title} className={cn("relative pl-[24px]", !isLast && "pb-6")}>
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-[4px] top-[12px] -bottom-[12px] w-px bg-border"
              />
            )}
            <span
              aria-hidden
              className="absolute left-0 top-[8px] size-[9px] rounded-full bg-muted-foreground/60 ring-4 ring-background"
            />
            <div className="text-[0.9375rem] font-medium leading-snug text-foreground">
              {position.title}
            </div>
            <div className="mb-2 text-[0.8125rem] tabular-nums text-muted-foreground">
              <Period
                start={position.start}
                end={position.end}
                presentLabel={presentLabel}
                locale={locale}
              />
            </div>
            <SkillBlocks position={position} />
          </li>
        );
      })}
    </ol>
  );
}

export default function WorkSection() {
  const DATA = useResume();
  const locale = useLocale();
  const t = useT();
  // Every job starts collapsed; each one opens and closes on its own. The open
  // list is controlled so the button label can switch between "more" and "less".
  const [open, setOpen] = useState<string[]>([]);
  return (
    <Accordion type="multiple" value={open} onValueChange={setOpen} className="w-full grid gap-6">
      {DATA.work.map((work) => {
        const isOpen = open.includes(work.company);
        return (
          <AccordionItem
            key={work.company}
            value={work.company}
            className="w-full border-b-0 grid gap-2"
          >
            {/* The whole row is the trigger. Same layout on every screen: logo, a text
                column (name, period, role) and the "more details" button on the right. */}
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="flex w-full items-center justify-between gap-x-3 text-left">
                <div className="flex min-w-0 flex-1 items-center gap-x-3">
                  <LogoImage src={work.logoUrl} alt={work.company} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="text-[1.0625rem] font-semibold leading-snug">{work.company}</div>
                    <span className="text-[0.8125rem] tabular-nums text-muted-foreground">
                      <Period
                        start={work.start}
                        end={work.end}
                        presentLabel={DATA.sections.work.presentLabel}
                        locale={locale}
                      />
                    </span>
                    <div className="font-sans text-[0.9375rem] text-muted-foreground">
                      {work.positions[0].title}
                    </div>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="inline-flex size-[32px] flex-none items-center justify-center gap-1.5 rounded-full border border-border bg-background/60 text-[0.8125rem] font-medium text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground sm:size-auto sm:px-3 sm:py-1.5"
                >
                  <span className="hidden sm:inline">
                    {isOpen ? t("work.less") : t("work.more")}
                  </span>
                  <ChevronDown
                    className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
                  />
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-[calc(40px+0.75rem)] text-[0.875rem] text-muted-foreground sm:ml-[calc(44px+0.75rem)]">
              {work.positions.length > 1 ? (
                <PositionTimeline
                  positions={work.positions}
                  presentLabel={DATA.sections.work.presentLabel}
                  locale={locale}
                />
              ) : (
                <SkillBlocks position={work.positions[0]} />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
