import { cva, type VariantProps } from "class-variance-authority";

// ── Toggle variants (CVA) ─────────────────────────────────────────────────────
// All visual styles live here. toggle.tsx contains only structure and behaviour.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind class convention (Tailwind v4 property-specific namespaces):
//   --background-color-tertiary        → bg-tertiary         (unchecked track fill)
//   --background-color-brand-solid     → bg-brand-solid      (checked track fill)
//   --background-color-brand-solid-hover → bg-brand-solid-hover (checked + hovered)
//   --ring-color-secondary             → ring-secondary      (default track ring)
//   --color-toggle-color-border        → border-toggle-color-border (slim unchecked)
//   --color-toggle-color-border-pressed → border-toggle-color-border-pressed (slim checked)
//   --color-toggle-color-border-hover  → border-toggle-color-border-hover (slim checked+hover)
//
// Focus ring is applied outside CVA in ToggleBase via the isFocusVisible prop
// (same pattern as CheckboxBase and RadioButtonBase).

// ── Track (outer pill) ────────────────────────────────────────────────────────

export const toggleTrackVariants = cva(
  [
    // Shape + layout
    "relative cursor-pointer rounded-full",
    // Default (unchecked) surface + ring
    "bg-tertiary ring-inset ring-secondary",
    // Smooth state transitions
    "transition-all duration-200 ease-in-out",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9 p-0.5",
        md: "h-6 w-11 p-0.5",
      },
      slim: {
        true: "ring-1",
        false: "ring-[0.5px]",
      },
      isSelected: {
        true: "bg-brand-solid ring-0",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    compoundVariants: [
      // ── slim sizing overrides (no padding — thumb sits on the edge) ────────
      {
        slim: true,
        size: "sm",
        className: "h-4 w-8 p-0",
      },
      {
        slim: true,
        size: "md",
        className: "h-5 w-10 p-0",
      },
      // ── checked hover (enabled only) ─────────────────────────────────────
      // Handled in component via isHovered prop (see toggle.tsx).

      // ── slim checked: ring becomes transparent ────────────────────────────
      {
        slim: true,
        isSelected: true,
        className: "ring-transparent",
      },
    ],
    defaultVariants: {
      size: "sm",
      slim: false,
      isSelected: false,
      isDisabled: false,
    },
  }
);

export type ToggleTrackVariantProps = VariantProps<typeof toggleTrackVariants>;

// ── Thumb (inner knob) ────────────────────────────────────────────────────────
// Transitions: translateX drives the checked ↔ unchecked movement.

export const toggleThumbVariants = cva(
  [
    "rounded-full bg-white",
    // Shadow: full shadow-sm for default, shadow-xs for slim
    "shadow-sm",
    // CSS transition applied via style prop to allow browser-native smoothness
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
      },
      slim: {
        // Slim thumb has a visible border
        true: "border border-toggle-color-border",
        false: "",
      },
      isSelected: {
        // Translate distance = track width - thumb size - 2×padding
        // sm: 36 - 16 - 4 = 16px → translate-x-4
        // md: 44 - 20 - 4 = 20px → translate-x-5
        true: "",
        false: "",
      },
      isDisabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // ── slim shadow override ───────────────────────────────────────────────
      {
        slim: true,
        className: "shadow-xs",
      },
      // ── slim checked border ───────────────────────────────────────────────
      {
        slim: true,
        isSelected: true,
        className: "border-toggle-color-border-pressed",
      },
      // ── sm translate ──────────────────────────────────────────────────────
      {
        size: "sm",
        isSelected: true,
        className: " translate-x-4",
      },
      // ── md translate ──────────────────────────────────────────────────────
      {
        size: "md",
        isSelected: true,
        className: "translate-x-5",
      },
    ],
    defaultVariants: {
      size: "sm",
      slim: false,
      isSelected: false,
      isDisabled: false,
    },
  }
);

export type ToggleThumbVariantProps = VariantProps<typeof toggleThumbVariants>;

// ── Root (outer label element rendered by AriaSwitch) ─────────────────────────

export const toggleRootVariants = cva(["flex w-max cursor-pointer items-start"], {
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

export type ToggleRootVariantProps = VariantProps<typeof toggleRootVariants>;

// ── Text wrapper (label + hint column) ────────────────────────────────────────

export const toggleTextWrapperVariants = cva(["flex flex-col"], {
  variants: {
    size: {
      sm: "",
      md: "gap-0.5",
    },
  },
  defaultVariants: { size: "sm" },
});

export type ToggleTextWrapperVariantProps = VariantProps<typeof toggleTextWrapperVariants>;

// ── Label text ────────────────────────────────────────────────────────────────

export const toggleLabelVariants = cva(
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

export type ToggleLabelVariantProps = VariantProps<typeof toggleLabelVariants>;

// ── Hint text ─────────────────────────────────────────────────────────────────

export const toggleHintVariants = cva(["text-tertiary group-data-[disabled]:text-disable-subtle"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
    },
  },
  defaultVariants: { size: "sm" },
});

export type ToggleHintVariantProps = VariantProps<typeof toggleHintVariants>;
