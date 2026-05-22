import { cva, type VariantProps } from "class-variance-authority";

// ── TagCheckbox variants ──────────────────────────────────────────────────────
// Purely presentational checkbox dot rendered inside a selectable Tag.
// Visual changes never touch component logic — all classes live here.

// ── Checkbox container (outer square) ────────────────────────────────────────

export const tagCheckboxVariants = cva(
  [
    // `relative` required so the absolutely-positioned checkmark SVG stays inside the box.
    "relative flex cursor-pointer appearance-none items-center justify-center rounded",
    "bg-primary ring-1 ring-inset ring-primary",
    "transition-all duration-150 ease-linear",
    // Focus ring (keyboard only) — element manages its own focus state via :focus-visible.
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-4.5",
      },
      isSelected: {
        true: "bg-brand-solid ring-brand-solid",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    compoundVariants: [
      // Disabled + unchecked: muted fill
      {
        isDisabled: true,
        isSelected: false,
        className: "bg-tertiary",
      },
    ],
    defaultVariants: {
      size: "sm",
      isSelected: false,
      isDisabled: false,
    },
  }
);

export type TagCheckboxVariantProps = VariantProps<typeof tagCheckboxVariants>;

// ── Checkmark icon (inner SVG) ────────────────────────────────────────────────

export const tagCheckboxIconVariants = cva(
  ["pointer-events-none absolute text-white opacity-0 transition-inherit-all"],
  {
    variants: {
      size: {
        sm: "size-2.5",
        md: "size-3",
        lg: "size-3.5",
      },
      isSelected: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      size: "sm",
      isSelected: false,
    },
  }
);

export type TagCheckboxIconVariantProps = VariantProps<typeof tagCheckboxIconVariants>;
