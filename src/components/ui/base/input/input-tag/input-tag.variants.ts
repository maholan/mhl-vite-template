import { cva, type VariantProps } from "class-variance-authority";

// ── Wrapper (Group) variants ───────────────────────────────────────────────────

export const inputTagWrapperVariants = cva(
  [
    // Layout — 'group' enables group-data-[*]: selectors on children
    "group relative flex w-full flex-row items-center",

    // Shape + background
    "rounded-lg bg-primary shadow-xs",

    // Default border ring
    "ring-1 ring-primary ring-inset",

    // Transition
    "outline-hidden transition-shadow duration-100 ease-linear",

    // Disabled
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export type InputTagWrapperVariantProps = VariantProps<typeof inputTagWrapperVariants>;

// ── Size configuration lookup ──────────────────────────────────────────────────
// Kept as a plain typed record (not CVA) because padding values depend on
// runtime state (hasTags, hasTrailingIcon) and are applied via cn() in the
// component.

export const inputTagSizes = {
  sm: {
    outer: "gap-2 px-3 py-2 text-sm",
    outerWithTags: "py-1.5 pl-2",
    inner: "gap-1.5",
    tagSize: "sm" as const,
    trailingRight: "right-3",
  },
  md: {
    outer: "gap-2 px-3 py-2 text-sm",
    outerWithTags: "pl-2",
    inner: "gap-1.5",
    tagSize: "md" as const,
    trailingRight: "right-3",
  },
  lg: {
    outer: "gap-2 px-3.5 py-2.5 text-base",
    outerWithTags: "pl-2.5",
    inner: "gap-2",
    tagSize: "md" as const,
    trailingRight: "right-3.5",
  },
} as const;

export type InputTagSize = keyof typeof inputTagSizes;

// ── Inner input element variants ───────────────────────────────────────────────

export const inputTagInputVariants = cva([
  "min-w-12 flex-1 appearance-none bg-transparent outline-hidden",
  // font-size must be ≥16px to prevent iOS Safari auto-zoom on focus
  "text-base text-primary caret-primary placeholder:text-placeholder",
  "disabled:cursor-not-allowed disabled:text-disable",
]);
