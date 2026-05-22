import { cva, type VariantProps } from "class-variance-authority";

// ── Checkbox variants (CVA) ───────────────────────────────────────────────────
// All visual styles live here. checkbox.tsx contains only structure and behaviour.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind utility convention (Tailwind v4 property-specific namespaces):
//   --background-color-primary      → bg-primary          (unchecked fill)
//   --background-color-disable-subtle → bg-disable-subtle (disabled unchecked fill)
//   --background-color-brand-solid  → bg-brand-solid      (checked / indeterminate fill)
//   --ring-color-primary            → ring-primary        (unchecked border)
//   --ring-color-error              → ring-error          (invalid border)
//   --text-color-white              → text-white          (icon stroke colour)
//   --text-color-secondary          → text-secondary      (label text)
//   --text-color-tertiary           → text-tertiary       (hint text)
//   --text-color-disable-subtle     → text-disable-subtle (disabled text)
//
// Focus ring (ring-2 ring-brand-500 ring-offset-2) is applied in the component
// via isFocusVisible render prop — same pattern as Button.
//
// ── Box ───────────────────────────────────────────────────────────────────────
// The visual checkbox indicator: box + checkmark / indeterminate dash.

export const checkboxBoxVariants = cva(
  [
    // Layout
    "relative flex shrink-0 cursor-pointer items-center justify-center",
    // Default background + ring (unchecked state)
    "bg-primary ring-1 ring-inset ring-primary",
    // Smooth state transitions
    "transition-all duration-100 ease-linear",
  ],
  {
    variants: {
      size: {
        sm: "size-4 rounded",
        md: "size-5 rounded-md",
      },
      isSelected: {
        true: "bg-brand-solid ring-brand-solid",
        false: "",
      },
      isIndeterminate: {
        true: "bg-brand-solid ring-brand-solid",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
      isInvalid: {
        // Applied via compoundVariants — only when unchecked
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // ── Hover (enabled only) ─────────────────────────────────────────────────
      {
        isDisabled: false,
        isSelected: false,
        isIndeterminate: false,
        className: "hover:bg-primary-hover",
      },
      {
        isDisabled: false,
        isSelected: true,
        isIndeterminate: false,
        className: "hover:bg-brand-solid-hover",
      },
      {
        isDisabled: false,
        isIndeterminate: true,
        className: "hover:bg-brand-solid-hover",
      },
      // ── Disabled ──────────────────────────────────────────────────────────────
      // Unchecked: muted surface + faded.
      // Checked / indeterminate: brand fill stays but faded (opacity-50 only).
      {
        isDisabled: true,
        isSelected: false,
        isIndeterminate: false,
        className: "bg-disable-subtle ring-disable-subtle opacity-50",
      },
      {
        isDisabled: true,
        isSelected: true,
        isIndeterminate: false,
        className: "opacity-50",
      },
      {
        isDisabled: true,
        isIndeterminate: true,
        className: "opacity-50",
      },
      // ── Invalid + unchecked → error ring ─────────────────────────────────────
      {
        isInvalid: true,
        isSelected: false,
        isIndeterminate: false,
        className: "ring-error",
      },
    ],
    defaultVariants: {
      size: "sm",
      isSelected: false,
      isIndeterminate: false,
      isDisabled: false,
      isInvalid: false,
    },
  }
);

export type CheckboxBoxVariantProps = VariantProps<typeof checkboxBoxVariants>;

// ── Icon (checkmark / indeterminate dash) ─────────────────────────────────────
// Positioned absolutely inside the box. Toggled via opacity.
// text-white maps to --text-color-white (always white regardless of theme).

export const checkboxIconVariants = cva(
  ["pointer-events-none absolute", "opacity-0 transition-all duration-100 ease-linear"],
  {
    variants: {
      size: {
        sm: "size-3",
        md: "size-3.5",
      },
      isVisible: {
        true: "opacity-100",
        false: "opacity-0",
      },
      isDisabled: {
        true: "text-icon-disable",
        false: "text-white",
      },
    },
    defaultVariants: {
      size: "sm",
      isVisible: false,
      isDisabled: false,
    },
  }
);

export type CheckboxIconVariantProps = VariantProps<typeof checkboxIconVariants>;

// ── Root (outer label element) ────────────────────────────────────────────────
// React Aria renders <Checkbox> as a <label>. The root handles layout + gap.

export const checkboxRootVariants = cva(["group flex cursor-pointer items-start"], {
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-3",
    },
    isDisabled: {
      true: "cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    size: "sm",
    isDisabled: false,
  },
});

export type CheckboxRootVariantProps = VariantProps<typeof checkboxRootVariants>;

// ── Text wrapper (label + hint column) ───────────────────────────────────────

export const checkboxTextWrapperVariants = cva(["inline-flex flex-col"], {
  variants: {
    size: {
      sm: "",
      md: "gap-0.5",
    },
  },
  defaultVariants: { size: "sm" },
});

export type CheckboxTextWrapperVariantProps = VariantProps<typeof checkboxTextWrapperVariants>;

// ── Label text ────────────────────────────────────────────────────────────────

export const checkboxLabelVariants = cva(
  ["select-none text-secondary group-data-[disabled]:text-disable-subtle"],
  {
    variants: {
      size: {
        sm: "text-sm font-medium",
        md: "text-md font-medium",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

export type CheckboxLabelVariantProps = VariantProps<typeof checkboxLabelVariants>;

// ── Hint text ─────────────────────────────────────────────────────────────────

export const checkboxHintVariants = cva(
  ["text-tertiary group-data-[disabled]:text-disable-subtle"],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

export type CheckboxHintVariantProps = VariantProps<typeof checkboxHintVariants>;
