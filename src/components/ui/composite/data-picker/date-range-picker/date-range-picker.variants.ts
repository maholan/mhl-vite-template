import { cva } from "class-variance-authority";

// ── Popover panel ─────────────────────────────────────────────────────────────

export const dateRangePickerPopoverVariants = cva(
  "origin-(--trigger-anchor-point) will-change-transform",
  {
    variants: {
      state: {
        entering: [
          "duration-150 ease-out animate-in fade-in",
          "placement-right:slide-in-from-left-0.5",
          "placement-top:slide-in-from-bottom-0.5",
          "placement-bottom:slide-in-from-top-0.5",
        ],
        exiting: [
          "duration-100 ease-in animate-out fade-out",
          "placement-right:slide-out-to-left-0.5",
          "placement-top:slide-out-to-bottom-0.5",
          "placement-bottom:slide-out-to-top-0.5",
        ],
        idle: "",
      },
    },
    defaultVariants: {
      state: "idle",
    },
  }
);

// ── Dialog container ──────────────────────────────────────────────────────────

export const dateRangePickerDialogVariants = cva(
  "flex rounded-2xl bg-primary shadow-xl ring-1 ring-secondary-alt focus:outline-hidden"
);

// ── Sidebar (preset list) ─────────────────────────────────────────────────────

export const dateRangePickerSidebarVariants = cva(
  "hidden w-38 flex-col gap-0.5 border-r border-primary p-3 lg:flex"
);

// ── Main content column ───────────────────────────────────────────────────────

export const dateRangePickerContentVariants = cva("flex flex-col");

// ── Footer ────────────────────────────────────────────────────────────────────

export const dateRangePickerFooterVariants = cva(
  "flex justify-between gap-3 border-t border-primary p-4"
);

// ── Desktop date input row inside footer ──────────────────────────────────────

export const dateRangePickerInputRowVariants = cva("hidden items-center gap-2 md:flex");

export const dateRangePickerInputSeparatorVariants = cva("text-md text-quaternary");

// ── Footer action buttons wrapper ─────────────────────────────────────────────

export const dateRangePickerFooterActionsVariants = cva(
  "grid w-full grid-cols-2 gap-3 md:flex md:w-auto"
);
