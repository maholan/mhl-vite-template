import { cva, type VariantProps } from "class-variance-authority";

// ── Payment input icon container variants ─────────────────────────────────────
// Controls the size of the card brand icon slot inside the input.
//
// The icon is rendered inside InputBase's leading icon slot.
// InputBase applies `inputIconVariants` (absolute positioning) to it;
// these variants only need to override the dimensions.
//
// NO `dark:` prefixes — semantic tokens handle dark mode automatically.

export const paymentIconVariants = cva(
  [
    // Position is handled by InputBase (absolute, left-*)
    // We only control dimensions here
    "pointer-events-none",
  ],
  {
    variants: {
      size: {
        // md input: 34 × 24 px payment card icon
        md: "h-6 w-8.5",
        // lg input: slightly larger at 36 × 25.5 px
        lg: "h-6.5 w-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type PaymentIconVariantProps = VariantProps<typeof paymentIconVariants>;
