import { cva } from "class-variance-authority";

// ── Popover ───────────────────────────────────────────────────────────────────

export const dropdownPopoverVariants = cva(
  [
    "w-62 overflow-auto rounded-lg bg-primary shadow-lg ring-1 ring-secondary-alt",
    "origin-(--trigger-anchor-point) will-change-transform",
  ],
  {
    variants: {
      isEntering: {
        true: [
          "duration-150 ease-out animate-in fade-in",
          "placement-left:slide-in-from-right-0.5",
          "placement-right:slide-in-from-left-0.5",
          "placement-top:slide-in-from-bottom-0.5",
          "placement-bottom:slide-in-from-top-0.5",
        ],
        false: "",
      },
      isExiting: {
        true: [
          "duration-100 ease-in animate-out fade-out",
          "placement-left:slide-out-to-right-0.5",
          "placement-right:slide-out-to-left-0.5",
          "placement-top:slide-out-to-bottom-0.5",
          "placement-bottom:slide-out-to-top-0.5",
        ],
        false: "",
      },
    },
    defaultVariants: {
      isEntering: false,
      isExiting: false,
    },
  }
);

// ── Menu ──────────────────────────────────────────────────────────────────────

export const dropdownMenuVariants = cva("h-min overflow-y-auto py-1 outline-hidden select-none");

// ── Section header ────────────────────────────────────────────────────────────

export const dropdownSectionHeaderVariants = cva(
  "px-3.5 pb-1 pt-2 text-xs font-semibold text-tertiary"
);

// ── Item outer wrapper (AriaMenuItem className) ───────────────────────────────

export const dropdownItemOuterVariants = cva(
  "group block cursor-pointer px-1.5 py-px outline-hidden",
  {
    variants: {
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: { isDisabled: false },
  }
);

// ── Item inner content row ────────────────────────────────────────────────────
// Figma: flex items-center gap-3 px-[10px] py-2 rounded-[6px] (radius-f-sm)
// gap-3 separates the [icon+text block] from the [shortcut / trailing indicator]

export const dropdownItemInnerVariants = cva(
  [
    "relative flex items-center gap-3 rounded-[6px] px-[10px] py-2",
    "transition duration-100 ease-linear",
    "outline-hidden outline-2 -outline-offset-2",
  ],
  {
    variants: {
      isFocused: {
        true: "bg-primary-hover",
        false: "",
      },
      isFocusVisible: {
        true: "outline",
        false: "",
      },
    },
    defaultVariants: {
      isFocused: false,
      isFocusVisible: false,
    },
  }
);

// ── Item icon+text block (left flex child inside inner) ───────────────────────
// Figma: flex flex-1 gap-2 items-center min-w-0

export const dropdownItemContentVariants = cva("flex min-w-0 flex-1 items-center gap-2");

// ── Item label ────────────────────────────────────────────────────────────────

export const dropdownItemLabelVariants = cva(
  "min-w-0 flex-1 truncate text-sm font-semibold text-secondary",
  {
    variants: {
      isFocused: {
        true: "text-secondary-hover",
        false: "",
      },
    },
    defaultVariants: { isFocused: false },
  }
);

// ── Separator ─────────────────────────────────────────────────────────────────

export const dropdownSeparatorVariants = cva("my-1 h-px w-full bg-secondary");

// ── Item shortcut badge ───────────────────────────────────────────────────────

export const dropdownItemShortcutVariants = cva(
  "shrink-0 rounded-[4px] border border-secondary px-1 py-px text-xs font-medium text-quaternary"
);

// ── Menu header (text label) ──────────────────────────────────────────────────

export const dropdownMenuHeaderVariants = cva(
  "w-full border-b border-secondary px-4 py-3 text-sm font-semibold text-secondary"
);

// ── Account header ────────────────────────────────────────────────────────────

export const dropdownAccountHeaderVariants = cva(
  "flex w-full items-center gap-2 border-b border-secondary p-3"
);

// ── DotsButton (trigger) ──────────────────────────────────────────────────────

export const dropdownDotsButtonVariants = cva(
  [
    "cursor-pointer rounded-md text-icon-quaternary",
    "transition duration-100 ease-linear",
    "outline-hidden outline-2 outline-offset-2",
  ],
  {
    variants: {
      isHovered: {
        true: "text-icon-quaternary-hover",
        false: "",
      },
      isPressed: {
        true: "text-icon-quaternary-hover",
        false: "",
      },
      isFocusVisible: {
        true: "outline",
        false: "",
      },
    },
    defaultVariants: {
      isHovered: false,
      isPressed: false,
      isFocusVisible: false,
    },
  }
);
