import { cva, type VariantProps } from "class-variance-authority";

// ── Label variants (CVA) ──────────────────────────────────────────────────────
// All visual styles live here. label.tsx contains only structure.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind utility convention (Tailwind v4 @theme {} naming):
//   --color-fg-secondary          → text-secondary       (label text default)
//   --color-fg-brand-tertiary     → text-brand-tertiary  (required * indicator)
//   --color-fg-icon-quaternary    → text-icon-quaternary (tooltip icon default)
//   --color-fg-icon-quaternary-hover → text-icon-quaternary-hover (tooltip icon hover/focus)
//   --color-fg-disable-subtle     → text-disable-subtle  (parent disabled state)
//
// Parent-state selectors use data attributes set by React Aria:
//   group-data-[disabled] — parent Field is disabled (React Aria sets data-disabled)
//   group-data-[required] — parent Field is required (React Aria sets data-required)
//
export const labelVariants = cva(
  [
    // Layout — inline, vertically centered, with a small gap between children
    "flex cursor-default items-center gap-0.5",

    // Typography — matches the Untitled UI form label scale
    // leading-5 = 20px (line-height/font-line-height-body-sm)
    "text-sm font-medium leading-5",

    // Default color — fg-secondary resolves to:
    //   light: gray-light-700  |  dark: gray-dark-300
    "text-secondary",

    // Parent disabled state — React Aria writes data-disabled on the Field root.
    // Label dims to communicate non-interactive context.
    "group-data-[disabled]:text-disable-subtle",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export type LabelVariantProps = VariantProps<typeof labelVariants>;
