import { cva, type VariantProps } from "class-variance-authority";

// ── Size scale ────────────────────────────────────────────────────────────────
// Maps to the 6-tier scale from the original component.
// Figma primary sizes: sm (64 px), md (80 px), lg (96 px).
// xxxs / xxs / xs are compact variants below the Figma spec.

export type PinInputSize = "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg";

// Per-size style tokens used by both the slot and the caret.
export const pinInputSizes: Record<
  PinInputSize,
  { group: string; slot: string; caret: string; separator: string }
> = {
  xxxs: {
    group: "gap-1.5",
    slot: "size-9 rounded-lg text-sm font-medium",
    caret: "text-sm font-medium",
    separator: "text-sm",
  },
  xxs: {
    group: "gap-2",
    slot: "size-10 rounded-lg text-base font-medium",
    caret: "text-base font-medium",
    separator: "text-base",
  },
  xs: {
    group: "gap-2",
    slot: "size-11 rounded-lg text-base font-medium",
    caret: "text-base font-medium",
    separator: "text-base",
  },
  sm: {
    // Figma: 64 × 64 px, rounded-[10px], heading-lg (48 px / -0.96px tracking)
    group: "gap-2",
    slot: "size-16 rounded-[10px] text-display-lg font-medium",
    caret: "text-display-lg font-medium",
    separator: "text-display-lg",
  },
  md: {
    // Figma: 80 × 80 px, rounded-xl, heading-lg
    group: "gap-3",
    slot: "size-20 rounded-xl text-display-lg font-medium",
    caret: "text-display-lg font-medium",
    separator: "text-display-lg",
  },
  lg: {
    // Figma: 96 × 96 px, rounded-xl, heading-xl (60 px / -1.2px tracking)
    group: "gap-3",
    slot: "size-24 rounded-xl text-display-xl font-medium",
    caret: "text-display-xl font-medium",
    separator: "text-display-xl",
  },
};

// ── Slot variants ─────────────────────────────────────────────────────────────
//
// Figma node 270:928 — exact per-state spec:
//
// Placeholder → border: 1px border-primary, shadow-xs, text-disable-subtle
// Focused     → border: 2px border-brand, shadow-xs + 0 0 0 2px white + 0 0 0 4px brand
//               text: text-brand-tertiary-alt
// Filled      → border: 2px border-brand, shadow-xs only (no outer ring)
//               text: text-brand-tertiary-alt
// Disabled    → border: 1px border-disable, bg-disable-subtle, text-disable-subtle

export const pinInputSlotVariants = cva(
  [
    // Layout + transition only — no visual state here to avoid CVA/IntelliSense conflicts
    "relative flex items-center justify-center bg-primary",
    "transition-[border-color,border-width,box-shadow,background-color] duration-100 ease-linear",
  ],
  {
    variants: {
      // Each variant owns all visual properties for that state so there are no
      // cross-variant conflicts that confuse Tailwind IntelliSense.
      isActive: {
        // Focused (Figma 270:941-945): 2px brand border + focus-ring box-shadow
        // ring-2 ring-brand ring-offset-2 = 0 0 0 2px white + 0 0 0 4px brand
        // Combined with shadow-xs this matches Figma's focus-ring-shadow-xs effect.
        // Text: text-brand-tertiary-alt (#7f56d9)
        true: "border-2 border-brand shadow-xs ring-2 ring-brand ring-offset-2 text-brand-tertiary-alt",
        false: "",
      },
      hasChar: {
        // Filled (Figma 270:947-951): 2px brand border + shadow-xs, no outer ring.
        // Text: text-brand-tertiary-alt (#7f56d9)
        true: "border-2 border-brand shadow-xs text-brand-tertiary-alt",
        false: "",
      },
      isDefault: {
        // Placeholder (Figma 270:929-934): 1px border-primary + shadow-xs.
        // Text: text-disable-subtle (#c2c2c2)
        true: "border border-primary shadow-xs text-disable-subtle",
        false: "",
      },
      isDisabled: {
        // Disabled (Figma 270:935-940): 1px border-disable + bg-disable-subtle.
        // Text: text-disable-subtle — no pointer events.
        true: "cursor-not-allowed border border-disable bg-disable-subtle text-disable-subtle shadow-xs",
        false: "",
      },
      isInvalid: {
        // Error: brand ring swapped for error ring, error text color.
        true: "border-2 border-error shadow-xs ring-2 ring-error ring-offset-2 text-error-primary",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
      hasChar: false,
      isDefault: true,
      isDisabled: false,
      isInvalid: false,
    },
  }
);

export type PinInputSlotVariantProps = VariantProps<typeof pinInputSlotVariants>;
