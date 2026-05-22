import { cva } from "class-variance-authority";

// ── Calendar root ─────────────────────────────────────────────────────────────

export const rangeCalendarRootVariants = cva("flex items-start");

// ── Left / right panel wrapper ────────────────────────────────────────────────

export const rangeCalendarPanelVariants = cva("flex flex-col gap-3 px-6 py-5", {
  variants: {
    side: {
      left: "",
      right: "border-l border-primary",
    },
  },
  defaultVariants: {
    side: "left",
  },
});

// ── Month navigation header ───────────────────────────────────────────────────

export const rangeCalendarHeaderVariants = cva("relative flex items-center", {
  variants: {
    align: {
      between: "justify-between",
      start: "justify-start",
      end: "justify-end",
    },
  },
  defaultVariants: {
    align: "between",
  },
});

export const rangeCalendarHeadingVariants = cva(
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-secondary"
);

// ── Weekday header row ────────────────────────────────────────────────────────

export const rangeCalendarGridHeaderVariants = cva("border-b-4 border-transparent");

export const rangeCalendarWeekdayLabelVariants = cva(
  "flex size-10 items-center justify-center text-sm font-medium text-secondary"
);

// ── Grid body ─────────────────────────────────────────────────────────────────

export const rangeCalendarGridBodyVariants = cva(
  "[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none"
);

// ── Mobile date input row ─────────────────────────────────────────────────────

export const rangeCalendarInputRowVariants = cva("flex items-center gap-2 md:hidden");

export const rangeCalendarInputSeparatorVariants = cva("text-md text-quaternary");

// ── Preset buttons row ────────────────────────────────────────────────────────

export const rangeCalendarPresetsRowVariants = cva("mt-1 flex justify-between gap-3 px-2");

// ── Sidebar preset button ─────────────────────────────────────────────────────

export const rangePresetButtonVariants = cva(
  [
    "cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium",
    "outline-none transition duration-100 ease-linear",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
  ],
  {
    variants: {
      isSelected: {
        true: "bg-active text-secondary hover:bg-active",
        false: "text-secondary hover:bg-primary-hover hover:text-secondary",
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  }
);
