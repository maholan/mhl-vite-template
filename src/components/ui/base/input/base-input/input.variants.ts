import { cva, type VariantProps } from "class-variance-authority";

// ── Input variants (CVA) ──────────────────────────────────────────────────────
// All visual styles live here. input.tsx contains only structure and behaviour.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind utility convention (Tailwind v4 property-specific namespaces):
//   --background-color-primary       → bg-primary            (input canvas fill)
//   --background-color-disable-subtle → bg-disable-subtle    (disabled fill)
//   --text-color-primary             → text-primary          (typed text)
//   --text-color-disable             → text-disable          (disabled text)
//   --text-color-placeholder         → text-placeholder      (placeholder text)
//   --text-color-quaternary          → text-quaternary       (decorative icons)
//   --text-color-disable-subtle      → text-disable-subtle   (dimmed when disabled)
//   --text-color-error-primary       → text-error-primary    (invalid indicator icon)
//   --text-color-icon-quaternary     → text-icon-quaternary  (tooltip icon)
//   --text-color-icon-quaternary-hover → text-icon-quaternary-hover
//   --ring-color-primary             → ring-primary          (default ring)
//   --ring-color-disable-subtle      → ring-disable-subtle   (disabled ring)
//   --ring-color-error-subtle        → ring-error-subtle     (invalid ring default)
//   --ring-color-error               → ring-error            (invalid ring focused)
//   --color-brand-600                → ring-brand-600        (focus brand ring, primitive)
//
// Parent-state selectors use data attributes set by React Aria:
//   group-data-[disabled] — parent Group/Field is disabled
//   group-data-[invalid]  — parent Group/Field is invalid
//   group-data-[focus-within] — Group has keyboard focus inside it
//
// ── Wrapper (Group) variants ──────────────────────────────────────────────────

export const inputWrapperVariants = cva(
  [
    // Layout — 'group' enables group-data-[*]: selectors on all child elements
    "group relative flex w-full flex-row items-center",

    // Shape + background
    "rounded-lg bg-primary shadow-xs",

    // Default border ring (ring-inset keeps it inside the box-model)
    "ring-1 ring-primary ring-inset",

    // Smooth border-color transition
    "transition-shadow duration-100 ease-linear",

    // ── Focus-within — brand ring ──────────────────────────────────────────
    // Applied via isFocusWithin render prop in the component (avoids conflict
    // with the disabled overrides below).

    // ── Disabled state ────────────────────────────────────────────────────
    "data-[disabled]:cursor-not-allowed data-[disabled]:bg-disable-subtle data-[disabled]:ring-disable-subtle",
    // Support being nested inside a disabled parent Field via group-data-[disabled]
    "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-disable-subtle group-data-[disabled]:ring-disable-subtle",

    // ── Invalid state ─────────────────────────────────────────────────────
    // Handled dynamically in the component render prop so the focused invalid
    // ring (ring-error) can override without specificity
    // conflicts from data-attribute selectors.
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

// ── Inner input element variants ──────────────────────────────────────────────

export const inputElementVariants = cva(
  [
    // Reset
    "m-0 w-full bg-transparent outline-hidden ring-0",

    // Typography — leading-6 (24px) matches body-md line-height; gives 40px/44px total height
    "text-sm leading-6 text-primary",

    // Placeholder
    "placeholder:text-placeholder",

    // Autofill — override UA yellow tint
    "autofill:rounded-lg autofill:text-primary",

    // Disabled
    "data-[disabled]:cursor-not-allowed data-[disabled]:text-disable",
    "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:text-disable",
  ],
  {
    variants: {
      // ── Size ──────────────────────────────────────────────────────────────
      // Padding only — layout-neutral.
      // Leading/trailing icon presence adjusts horizontal padding in the component.
      size: {
        md: "py-2 px-3",
        lg: "py-2.5 px-3.5",
      },
      // ── Password masking dots ─────────────────────────────────────────────
      // When type="password" the browser replaces typed characters with bullet
      // characters (•). Wider letter-spacing makes them more legible without
      // changing the font size. The placeholder reset ensures hint text (e.g.
      // "Enter password") stays at the normal compact spacing.
      isPassword: {
        true: ["tracking-widest ", "placeholder:tracking-normal"],
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      isPassword: false,
    },
  }
);

export type InputElementVariantProps = VariantProps<typeof inputElementVariants>;

// ── Decorative icon (leading/trailing static) variants ────────────────────────

export const inputIconVariants = cva(
  [
    "pointer-events-none absolute size-5 text-icon-quaternary",
    "group-data-[disabled]:text-disable-subtle",
  ],
  {
    variants: {
      placement: {
        leading: "",
        trailing: "",
      },
      size: {
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { placement: "leading", size: "md", className: "left-3" },
      { placement: "leading", size: "lg", className: "left-3.5" },
      { placement: "trailing", size: "md", className: "right-3" },
      { placement: "trailing", size: "lg", className: "right-3.5" },
    ],
    defaultVariants: {
      placement: "leading",
      size: "md",
    },
  }
);

export type InputIconVariantProps = VariantProps<typeof inputIconVariants>;

// ── Tooltip trigger variants ──────────────────────────────────────────────────

export const inputTooltipTriggerVariants = cva(
  [
    "absolute cursor-pointer text-icon-quaternary",
    "transition duration-200",
    "hover:text-icon-quaternary-hover focus-visible:text-icon-quaternary-hover",
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

// ── Shortcut badge variants ───────────────────────────────────────────────────

export const inputShortcutVariants = cva(
  [
    "pointer-events-none absolute inset-y-0.5 right-0.5 z-10",
    "flex items-center rounded-r-[inherit]",
    "bg-linear-to-r from-transparent to-primary to-40% pl-8",
  ],
  {
    variants: {
      size: {
        md: "pr-2.5",
        lg: "pr-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ── TextField root variants ───────────────────────────────────────────────────

export const textFieldVariants = cva([
  "group flex h-max w-full flex-col items-start justify-start gap-1.5",
]);
