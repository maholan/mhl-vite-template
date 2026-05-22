import { cva, type VariantProps } from "class-variance-authority";

// ── InputPassword variants (CVA) ──────────────────────────────────────────────
// Only the toggle button is defined here.
// The wrapper, input element, and icon variants are imported directly from
// ../base-input/input.variants to avoid duplication.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens.
//
// Token → Tailwind utility convention (Tailwind v4 @theme {} naming):
//   --color-fg-icon-quaternary        → text-icon-quaternary       (default icon)
//   --color-fg-icon-quaternary-hover  → text-icon-quaternary-hover (hover/focus)
//   --color-fg-disable-subtle         → text-disable-subtle        (parent disabled)
//   --color-brand-600                 → ring-brand-600                (keyboard focus ring)
//
export const inputPasswordToggleVariants = cva(
  [
    // Layout — absolutely positioned at the vertical center of the input wrapper
    "absolute top-1/2 -translate-y-1/2",

    // Reset browser button defaults
    "cursor-pointer appearance-none bg-transparent p-0 border-0",

    // Icon color
    "text-icon-quaternary transition-colors duration-200",
    "hover:text-icon-quaternary-hover",

    // Parent disabled state — React Aria writes data-disabled on the Group root.
    "group-data-[disabled]:pointer-events-none group-data-[disabled]:text-disable-subtle",
  ],
  {
    variants: {
      size: {
        md: "right-3",
        lg: "right-3.5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export type InputPasswordToggleVariantProps = VariantProps<typeof inputPasswordToggleVariants>;
