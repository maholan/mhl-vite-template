import { cva, type VariantProps } from "class-variance-authority";

// ── ButtonUtility variants (CVA) ───────────────────────────────────────────────
// All visual styles live here. button-utility.tsx contains only structure.
//
// NO `dark:` prefixes — dark mode handled at the token layer automatically.
// Token → Tailwind utility convention (property-specific namespaces):
//   --background-color-primary       → bg-primary
//   --background-color-primary-hover → bg-primary-hover
//   --text-color-icon-quaternary     → text-icon-quaternary
//   --ring-color-primary             → ring-primary
//
export const buttonUtilityVariants = cva(
  [
    // Layout & cursor
    "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5",
    // Transition
    "transition duration-100 ease-linear",
    // Focus reset — ring applied via React Aria `isFocusVisible` render prop
    "focus:outline-none",
    // Disabled
    "disabled:cursor-not-allowed disabled:text-icon-disable",
    // Icon defaults applied to all [data-icon] children
    "*:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-all",
  ],
  {
    variants: {
      // ── Color ──────────────────────────────────────────────────────────────
      color: {
        secondary: [
          "bg-primary text-icon-quaternary shadow-xs ring-1 ring-primary ring-inset",
          "hover:bg-primary-hover hover:text-icon-quaternary-hover",
          "disabled:shadow-xs disabled:ring-disable-subtle",
        ],
        tertiary: [
          "text-icon-quaternary",
          "hover:bg-primary-hover hover:text-icon-quaternary-hover",
        ],
      },

      // ── Size ───────────────────────────────────────────────────────────────
      // Only affects icon dimensions — the wrapper uses p-1.5 for all sizes.
      size: {
        xs: "*:data-icon:size-4",
        sm: "*:data-icon:size-5",
      },
    },

    defaultVariants: {
      color: "secondary",
      size: "sm",
    },
  }
);

export type ButtonUtilityVariantProps = VariantProps<typeof buttonUtilityVariants>;
