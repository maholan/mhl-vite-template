import { cva, type VariantProps } from "class-variance-authority";

// ── Base icon class ────────────────────────────────────────────────────────────
// Shared across the leading icon, trailing icon, and loading spinner slots.
export const iconBaseClass = "pointer-events-none size-5 shrink-0 transition-all";

// ── Button variants (CVA) ──────────────────────────────────────────────────────
// All visual styles live here. button.tsx contains only structure and behaviour.
//
// NO `dark:` prefixes. Every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically —
// identical to how the original Untitled UI source works. Dark mode overrides
// live in `@layer base { .dark { ... } }` inside mhl-tokens.css.
//
// Token → Tailwind utility convention (Tailwind v4 property-specific namespaces):
//   --background-color-primary    → bg-primary           (canvas background)
//   --background-color-brand-solid → bg-brand-solid      (brand CTA fill)
//   --text-color-secondary        → text-secondary       (body text)
//   --text-color-icon-quaternary  → text-icon-quaternary (icon tint)
//   --ring-color-primary          → ring-primary         (default ring/border)
//   --ring-color-error            → ring-error           (invalid ring focused)
//   --color-btn-icon-primary      → text-btn-icon-primary (button icon tint)
//
export const buttonVariants = cva(
  [
    // Layout & cursor
    "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap",
    // Transition
    "transition duration-100 ease-linear before:absolute",
    // Focus reset — ring applied via React Aria `isFocusVisible` render prop
    "focus:outline-none",
    // InputGroup slot integration (ButtonGroup / InputGroup)
    "in-data-input-wrapper:shadow-xs",
    "in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none",
    "in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none",
    // Disabled — fg-disable resolves to gray-500 light / gray-dark-500 dark via token
    "disabled:cursor-not-allowed disabled:text-disable-subtle",
    // Icon defaults applied to all [data-icon] children
    "disabled:*:data-icon:text-icon-disable",
    "*:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-all",
  ],
  {
    variants: {
      // ── Size ────────────────────────────────────────────────────────────────
      // Follows the Untitled UI 5-step scale on a 4 px base grid.
      // Sizes contain no color — fully theme-neutral.
      size: {
        sm: [
          "gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2",
          "in-data-input-wrapper:px-3.5 in-data-input-wrapper:py-2.5 in-data-input-wrapper:data-icon-only:p-2.5",
        ],
        md: [
          "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5",
          "in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:data-icon-only:p-3",
        ],
        lg: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3",
        xl: "gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-3.5",
        "2xl":
          "gap-2 rounded-xl px-5.5 py-4 text-lg font-semibold before:rounded-[9px] data-icon-only:p-4",
      },

      // ── Color ────────────────────────────────────────────────────────────────
      // 8 variants matching Untitled UI. All tokens are semantic aliases from
      // @maholan/tokens — dark mode is handled at the token layer, not here.
      color: {
        // ── Primary ────────────────────────────────────────────────────────────
        primary: [
          "bg-brand-solid text-white shadow-xs ring-1 ring-transparent ring-inset",
          "hover:bg-brand-solid-hover data-[loading]:bg-brand-solid-hover",
          "before:absolute before:inset-px before:border before:border-white/10 before:mask-b-from-0%",
          "disabled:bg-disable disabled:shadow-xs disabled:ring-disable-subtle",
          "*:data-icon:text-btn-icon-primary hover:*:data-icon:text-btn-icon-primary-hover",
        ],

        // ── Secondary ──────────────────────────────────────────────────────────
        secondary: [
          "bg-primary text-secondary shadow-xs ring-1 ring-primary ring-inset",
          "hover:bg-primary-hover hover:text-secondary-hover data-[loading]:bg-primary-hover",
          "disabled:shadow-xs disabled:ring-disable-subtle",
          "*:data-icon:text-icon-quaternary hover:*:data-icon:text-icon-quaternary-hover",
        ],

        // ── Tertiary ───────────────────────────────────────────────────────────
        tertiary: [
          "text-tertiary hover:bg-primary-hover hover:text-tertiary-hover data-[loading]:bg-primary-hover",
          "*:data-icon:text-icon-quaternary hover:*:data-icon:text-icon-quaternary-hover",
        ],

        // ── Link (gray) ────────────────────────────────────────────────────────
        "link-gray": [
          "justify-normal rounded p-0! text-tertiary hover:text-tertiary-hover",
          "*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current",
          "*:data-icon:text-icon-quaternary hover:*:data-icon:text-icon-quaternary-hover",
        ],

        // ── Link (brand color) ─────────────────────────────────────────────────
        "link-color": [
          "justify-normal rounded p-0! text-brand-secondary hover:text-brand-secondary-hover",
          "*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current",
          "*:data-icon:text-icon-brand-secondary-alt hover:*:data-icon:text-icon-brand-secondary-hover",
        ],

        // ── Primary destructive ────────────────────────────────────────────────
        "primary-destructive": [
          "bg-error-solid text-white shadow-xs ring-1 ring-transparent ring-inset",
          "hover:bg-error-solid-hover data-[loading]:bg-error-solid-hover",
          "before:absolute before:inset-px before:border before:border-white/10 before:mask-b-from-0%",
          "disabled:bg-disable disabled:shadow-xs disabled:ring-disable-subtle",
          "*:data-icon:text-btn-icon-destructive hover:*:data-icon:text-btn-icon-destructive-hover",
        ],

        // ── Secondary destructive ──────────────────────────────────────────────
        "secondary-destructive": [
          "bg-primary text-error-primary shadow-xs ring-1 ring-error-secondary ring-inset",
          "hover:bg-error-primary hover:text-error-primary-hover data-[loading]:bg-error-primary",
          "disabled:bg-primary disabled:shadow-xs disabled:ring-disable-subtle",
          "*:data-icon:text-icon-error-secondary hover:*:data-icon:text-icon-error-primary",
        ],

        // ── Tertiary destructive ───────────────────────────────────────────────
        "tertiary-destructive": [
          "text-error-primary hover:bg-error-primary hover:text-error-primary-hover data-[loading]:bg-error-primary",
          "*:data-icon:text-icon-error-secondary hover:*:data-icon:text-icon-error-primary",
        ],

        // ── Link destructive ───────────────────────────────────────────────────
        "link-destructive": [
          "justify-normal rounded p-0! text-error-primary hover:text-error-primary-hover",
          "*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current",
          "*:data-icon:text-icon-error-secondary hover:*:data-icon:text-icon-error-primary",
        ],
      },
    },

    defaultVariants: {
      size: "sm",
      color: "primary",
    },
  }
);

// ── Exported types ─────────────────────────────────────────────────────────────
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonSize = NonNullable<ButtonVariantProps["size"]>;
export type ButtonColor = NonNullable<ButtonVariantProps["color"]>;
