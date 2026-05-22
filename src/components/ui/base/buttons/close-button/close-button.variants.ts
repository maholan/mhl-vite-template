import { cva, type VariantProps } from "class-variance-authority";

// ── CloseButton variants (CVA) ─────────────────────────────────────────────────
// All visual styles live here. close-button.tsx contains only structure.
//
// NO `dark:` prefixes for the `light` theme — dark mode overrides are handled
// at the token layer via .dark {} in mhl-tokens.css.
//
// The `dark` theme is for placement on explicitly dark surfaces (e.g., toasts,
// dark card headers) regardless of the page-level color scheme. It intentionally
// uses white/alpha primitives because the surface itself provides the dark context.
//
export const closeButtonVariants = cva(
  [
    "flex cursor-pointer items-center justify-center rounded-lg p-2",
    "transition duration-100 ease-linear",
    // Focus reset — ring applied via React Aria `isFocusVisible` render prop
    "focus:outline-none",
  ],
  {
    variants: {
      // ── Theme ──────────────────────────────────────────────────────────────
      theme: {
        // Light theme — follows the page color scheme (light/dark mode via tokens).
        light: ["text-icon-quaternary", "hover:bg-primary-hover hover:text-icon-quaternary-hover"],
        // Dark theme — for use on dark surfaces; uses white/alpha primitives.
        dark: ["text-white/70", "hover:text-white hover:bg-white/20"],
      },

      // ── Size ───────────────────────────────────────────────────────────────
      size: {
        xs: "size-7",
        sm: "size-9",
        md: "size-10",
        lg: "size-11",
      },
    },

    defaultVariants: {
      theme: "light",
      size: "sm",
    },
  }
);

/** Maps size to the SVG icon class — used directly on the inline SVG element. */
export const closeButtonIconSize: Record<"xs" | "sm" | "md" | "lg", string> = {
  xs: "size-4",
  sm: "size-5",
  md: "size-5",
  lg: "size-6",
};

export type CloseButtonVariantProps = VariantProps<typeof closeButtonVariants>;
