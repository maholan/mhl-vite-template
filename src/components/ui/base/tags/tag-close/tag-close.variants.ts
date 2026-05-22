import { cva, type VariantProps } from "class-variance-authority";

// ── TagCloseX variants ────────────────────────────────────────────────────────
// All visual styles for the tag dismiss button live here.
// Token classes follow the post-May 2026 property-specific namespace refactor.

// ── Button wrapper ────────────────────────────────────────────────────────────

export const tagCloseVariants = cva(
  [
    // Base layout
    "flex cursor-pointer rounded-[2px]",
    // Icon colour token (--text-color-icon-quaternary)
    "text-icon-quaternary",
    // Transitions
    "transition duration-100 ease-linear",
    // Hover: background tint + icon colour shift
    "hover:bg-primary-hover hover:text-icon-quaternary-hover",
    // Disabled: no pointer, React Aria writes data-[disabled]
    "data-[disabled]:cursor-not-allowed",
    // Clear browser default outline — focus ring is added via isFocusVisible render prop
    "focus:outline-none",
  ],
  {
    variants: {
      size: {
        sm: "p-0.5",
        md: "p-0.5",
        lg: "p-0.75",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export type TagCloseVariantProps = VariantProps<typeof tagCloseVariants>;

// ── X icon inside the button ──────────────────────────────────────────────────

export const tagCloseIconVariants = cva(["transition-inherit-all"], {
  variants: {
    size: {
      sm: "size-2.5 stroke-[3.6px]",
      md: "size-3 stroke-[2.86px]",
      lg: "size-3.5 stroke-3",
    },
  },
  defaultVariants: { size: "md" },
});

export type TagCloseIconVariantProps = VariantProps<typeof tagCloseIconVariants>;
