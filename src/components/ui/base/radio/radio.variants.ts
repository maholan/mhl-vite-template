import { cva, type VariantProps } from "class-variance-authority";

// ── Radio variants (CVA) ──────────────────────────────────────────────────────
// All visual styles live here. radio.tsx contains only structure and behaviour.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind utility convention (Tailwind v4 property-specific namespaces):
//   --background-color-primary       → bg-primary           (unchecked fill)
//   --background-color-primary-hover → bg-primary-hover     (unchecked hover fill)
//   --background-color-disable-subtle → bg-disable-subtle   (disabled unchecked fill)
//   --background-color-brand-solid   → bg-brand-solid       (selected fill)
//   --background-color-brand-solid-hover → bg-brand-solid-hover (selected hover fill)
//   --ring-color-primary             → ring-primary         (unchecked border)
//   --ring-color-disable-subtle      → ring-disable-subtle  (disabled border)
//   --ring-color-error               → ring-error           (invalid border)
//   --text-color-secondary           → text-secondary       (label text)
//   --text-color-tertiary            → text-tertiary        (hint text)
//   --text-color-disable-subtle      → text-disable-subtle  (disabled text)
//
// Focus ring (ring-2 ring-brand-500 ring-offset-2) is applied in the component
// via isFocusVisible render prop — same pattern as Button and Checkbox.
//
// Invalid state: RadioGroup writes data-invalid on its root element when
// isInvalid={true}. group-data-[invalid]: selectors on children react to it.
// The optional `isInvalid` CVA variant covers standalone RadioButtonBase use.
//
// ── Indicator (outer circle) ──────────────────────────────────────────────────

export const radioIndicatorVariants = cva(
  [
    // Layout
    "flex shrink-0 cursor-pointer items-center justify-center rounded-full",
    // Default background + ring (unchecked state)
    "bg-primary ring-1 ring-inset ring-primary",
    // Smooth state transitions
    "transition-all duration-100 ease-linear",
    // Invalid state from parent RadioGroup (group-data-[invalid]: fires on RadioGroup root)
    "group-data-[invalid]:ring-error",
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
      },
      isSelected: {
        true: "bg-brand-solid ring-0",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
      isInvalid: {
        // Used for standalone RadioButtonBase; group-data-[invalid]: covers RadioGroup use
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // ── Hover (enabled, unchecked) ─────────────────────────────────────────
      {
        isDisabled: false,
        isSelected: false,
        className: "hover:bg-primary-hover",
      },
      // ── Hover (enabled, selected) ──────────────────────────────────────────
      {
        isDisabled: false,
        isSelected: true,
        className: "hover:bg-brand-solid-hover",
      },
      // ── Disabled (all states) ─────────────────────────────────────────────
      // Muted surface regardless of selected state — brand fill is suppressed.
      {
        isDisabled: true,
        isSelected: false,
        className: "bg-disable-subtle ring-disable-subtle",
      },
      {
        isDisabled: true,
        isSelected: true,
        className: "bg-disable-subtle ring-disable-subtle",
      },
      // ── Invalid + unchecked (standalone, no group parent) ─────────────────
      {
        isInvalid: true,
        isSelected: false,
        className: "ring-error",
      },
    ],
    defaultVariants: {
      size: "sm",
      isSelected: false,
      isDisabled: false,
      isInvalid: false,
    },
  }
);

export type RadioIndicatorVariantProps = VariantProps<typeof radioIndicatorVariants>;

// ── Inner dot ─────────────────────────────────────────────────────────────────
// Centred inside the outer circle. Always white — visible via opacity toggle.
// Uses bg-white (pure white) so it contrasts against the brand-solid fill.

export const radioDotVariants = cva(
  ["rounded-full bg-white", "opacity-0 transition-all duration-100 ease-linear"],
  {
    variants: {
      size: {
        sm: "size-1.5",
        md: "size-2",
      },
      isSelected: {
        true: "opacity-100",
        false: "opacity-0",
      },
      isDisabled: {
        // Disabled selected dot: muted tint instead of white
        true: "bg-icon-disable",
        false: "bg-white",
      },
    },
    defaultVariants: {
      size: "sm",
      isSelected: false,
      isDisabled: false,
    },
  }
);

export type RadioDotVariantProps = VariantProps<typeof radioDotVariants>;

// ── Root (outer label element) ────────────────────────────────────────────────
// React Aria renders <Radio> as a <label>. The root handles layout + gap.

export const radioRootVariants = cva(["group flex cursor-pointer items-start"], {
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

export type RadioRootVariantProps = VariantProps<typeof radioRootVariants>;

// ── Text wrapper (label + hint column) ────────────────────────────────────────

export const radioTextWrapperVariants = cva(["inline-flex flex-col"], {
  variants: {
    size: {
      sm: "",
      md: "gap-0.5",
    },
  },
  defaultVariants: { size: "sm" },
});

export type RadioTextWrapperVariantProps = VariantProps<typeof radioTextWrapperVariants>;

// ── Label text ────────────────────────────────────────────────────────────────

export const radioLabelVariants = cva(
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

export type RadioLabelVariantProps = VariantProps<typeof radioLabelVariants>;

// ── Hint text ─────────────────────────────────────────────────────────────────

export const radioHintVariants = cva(["text-tertiary group-data-[disabled]:text-disable-subtle"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
    },
  },
  defaultVariants: { size: "sm" },
});

export type RadioHintVariantProps = VariantProps<typeof radioHintVariants>;

// ── RadioGroup container ──────────────────────────────────────────────────────
// Wraps the list of RadioButton items.

export const radioGroupVariants = cva(["flex"], {
  variants: {
    orientation: {
      vertical: "flex-col gap-3",
      horizontal: "flex-row flex-wrap gap-x-6 gap-y-3",
    },
  },
  defaultVariants: { orientation: "vertical" },
});

export type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;
