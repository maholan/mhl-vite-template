import { cva, type VariantProps } from "class-variance-authority";

/**
 * CVA definition for the tooltip content container.
 *
 * The `hasDescription` variant controls vertical padding:
 * - `false` (default) — title-only → compact `py-2`
 * - `true`            — title + description → comfortable `py-3`
 */
export const tooltipContentVariants = cva(
  [
    // Layout
    "z-50 flex max-w-xs flex-col items-start gap-1",
    // Appearance
    "rounded-lg bg-primary-solid px-3 shadow-lg",
    // Performance hint for transforms
    "origin-(--trigger-anchor-point) will-change-transform",
  ],
  {
    variants: {
      hasDescription: {
        true: "py-3",
        false: "py-2",
      },
    },
    defaultVariants: {
      hasDescription: false,
    },
  }
);

export type TooltipContentVariantProps = VariantProps<typeof tooltipContentVariants>;
