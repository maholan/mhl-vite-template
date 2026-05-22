import { cva } from "class-variance-authority";

// ── Calendar root ─────────────────────────────────────────────────────────────

export const calendarRootVariants = cva("flex flex-col gap-3");

// ── Month navigation header ───────────────────────────────────────────────────

export const calendarHeaderVariants = cva("flex items-center justify-between");

export const calendarHeadingVariants = cva("text-sm font-semibold text-secondary");

// ── Weekday header row ────────────────────────────────────────────────────────

export const calendarGridHeaderVariants = cva("border-b-4 border-transparent");

export const calendarWeekdayLabelVariants = cva(
  "flex size-10 items-center justify-center text-sm font-medium text-secondary"
);

// ── Grid body (rows + row gap) ────────────────────────────────────────────────

export const calendarGridBodyVariants = cva(
  "[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none"
);

// ── Input + Today shortcut row ────────────────────────────────────────────────

export const calendarShortcutRowVariants = cva("flex gap-3");
