import { cva } from "class-variance-authority";

// ── Popover panel ─────────────────────────────────────────────────────────────

export const datePickerPopoverVariants = cva(
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

export const datePickerDialogVariants = cva(
  "rounded-2xl bg-primary shadow-xl ring-1 ring-secondary-alt"
);

// ── Calendar wrapper inside dialog ────────────────────────────────────────────

export const datePickerCalendarWrapperVariants = cva("flex px-6 py-5");

// ── Footer ────────────────────────────────────────────────────────────────────

export const datePickerFooterVariants = cva("grid grid-cols-2 gap-3 border-t border-primary p-4");
