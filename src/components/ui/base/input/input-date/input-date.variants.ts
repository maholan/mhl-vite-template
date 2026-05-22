import { cva } from "class-variance-authority";

// ── InputDate variants (CVA) ───────────────────────────────────────────────────
// All visual styles live here. input-date.tsx contains only structure and behaviour.
//
// Token → Tailwind utility convention (Tailwind v4 property-specific namespaces):
//   --background-color-primary         → bg-primary
//   --background-color-disable-subtle  → bg-disable-subtle
//   --text-color-primary               → text-primary
//   --text-color-placeholder           → text-placeholder
//   --text-color-icon-quaternary       → text-icon-quaternary
//   --text-color-icon-quaternary-hover → text-icon-quaternary-hover
//   --ring-color-primary               → ring-primary
//   --ring-color-disable-subtle        → ring-disable-subtle
//   --ring-color-error-subtle          → ring-error-subtle (renamed from ring-error_subtle)
//   --ring-color-error                 → ring-error
//   --color-brand-600                  → ring-brand-600

// ── Group (wrapper) ───────────────────────────────────────────────────────────

export const dateInputWrapperVariants = cva([
  // Layout — 'group' enables group-data-[*]: selectors on all child elements
  "group/input relative flex w-full flex-row items-center",

  // Shape + background
  "rounded-lg bg-primary shadow-xs",

  // Default border ring
  "ring-1 ring-primary ring-inset",

  // Smooth transition
  "transition-shadow duration-100 ease-linear",

  // ── Disabled state ────────────────────────────────────────────────────────
  "data-[disabled]:cursor-not-allowed data-[disabled]:bg-disable-subtle data-[disabled]:ring-disable-subtle",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-disable-subtle group-data-[disabled]:ring-disable-subtle",
]);

// ── DateInput (the flex row of segments) ─────────────────────────────────────

export const dateInputElementVariants = cva(["flex w-full"], {
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-3 py-2 text-md",
      lg: "px-3.5 py-2.5 text-md",
    },
    hasLeadingIcon: {
      true: "",
      false: "",
    },
    hasTrailingIcon: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // Leading icon padding
    { size: "sm", hasLeadingIcon: true, className: "pl-8.5" },
    { size: "md", hasLeadingIcon: true, className: "pl-10" },
    { size: "lg", hasLeadingIcon: true, className: "pl-10.5" },
    // Trailing icon padding
    { size: "sm", hasTrailingIcon: true, className: "pr-9" },
    { size: "md", hasTrailingIcon: true, className: "pr-9" },
    { size: "lg", hasTrailingIcon: true, className: "pr-9.5" },
  ],
  defaultVariants: {
    size: "md",
    hasLeadingIcon: false,
    hasTrailingIcon: false,
  },
});

// ── DateSegment ───────────────────────────────────────────────────────────────

export const dateSegmentVariants = cva([
  "rounded px-0.5 text-primary tabular-nums caret-transparent",
  "focus:bg-brand-solid focus:font-medium focus:text-white focus:outline-hidden",
  "data-[disabled]:cursor-not-allowed data-[disabled]:text-disable",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:text-disable",
]);

// ── Leading icon ──────────────────────────────────────────────────────────────

export const dateInputIconVariants = cva(
  [
    "pointer-events-none absolute text-icon-quaternary",
    "group-data-[disabled]:text-disable-subtle",
  ],
  {
    variants: {
      size: {
        sm: "left-3 size-4 stroke-[2.25px]",
        md: "left-3 size-5",
        lg: "left-3.5 size-5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ── Tooltip trigger ───────────────────────────────────────────────────────────

export const dateInputTooltipTriggerVariants = cva(
  [
    "absolute cursor-pointer text-icon-quaternary",
    "transition duration-200",
    "hover:text-icon-quaternary-hover focus-visible:text-icon-quaternary-hover",
    "group-data-[disabled]:pointer-events-none group-data-[disabled]:text-disable-subtle",
  ],
  {
    variants: {
      size: {
        sm: "right-3",
        md: "right-3",
        lg: "right-3.5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ── Shortcut badge ────────────────────────────────────────────────────────────

export const dateInputShortcutVariants = cva(
  [
    "pointer-events-none absolute inset-y-0.5 right-0.5 z-10",
    "flex items-center rounded-r-[inherit]",
    "bg-linear-to-r from-transparent to-primary to-40% pl-8",
  ],
  {
    variants: {
      size: {
        sm: "pr-2.5",
        md: "pr-2.5",
        lg: "pr-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ── DateField root ────────────────────────────────────────────────────────────

export const dateFieldVariants = cva([
  "group flex h-max w-full flex-col items-start justify-start gap-1.5",
]);
