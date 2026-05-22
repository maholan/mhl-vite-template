import { cva, type VariantProps } from "class-variance-authority";

// ── Slider variants (CVA) ─────────────────────────────────────────────────────
// All visual styles live here. slider.tsx contains only structure and behaviour.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind utility convention (Tailwind v4 property-specific namespaces):
//   --background-color-brand-solid → bg-brand-solid    (filled range)
//   --background-color-quaternary  → bg-quaternary     (inactive rail)
//   --border-color-brand-solid     → border-brand-solid (thumb border)
//   --ring-color-secondary-alt     → ring-secondary-alt (floating label border)
//
// React Aria writes data attributes on its elements — use data-[*]: selectors:
//   data-[focus-visible]: — keyboard focus ring on SliderThumb
//   data-[dragging]:      — cursor change while dragging
//   data-[disabled]:      — disabled opacity / cursor
//
// Focus ring pattern (consistent with Button, Checkbox, Radio):
//   data-[focus-visible]:ring-2
//   data-[focus-visible]:ring-brand-500
//   data-[focus-visible]:ring-offset-2

// ── Root wrapper ──────────────────────────────────────────────────────────────

export const sliderRootVariants = cva(["w-full"]);

export type SliderRootVariantProps = VariantProps<typeof sliderRootVariants>;

// ── Track container ───────────────────────────────────────────────────────────
// h-6 provides vertical space for the thumb (size-6) to sit inside.

export const sliderTrackVariants = cva([
  "relative h-6 w-full cursor-pointer",
  "data-[disabled]:cursor-not-allowed",
]);

export type SliderTrackVariantProps = VariantProps<typeof sliderTrackVariants>;

// ── Inactive rail (full-width background) ─────────────────────────────────────

export const sliderRailVariants = cva([
  "absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full",
  "bg-quaternary",
]);

export type SliderRailVariantProps = VariantProps<typeof sliderRailVariants>;

// ── Filled range (width/left set via inline style) ────────────────────────────
// No transition — live movement while dragging must feel instantaneous.

export const sliderFillVariants = cva([
  "absolute top-1/2 h-2 -translate-y-1/2 rounded-full",
  "bg-brand-solid",
]);

export type SliderFillVariantProps = VariantProps<typeof sliderFillVariants>;

// ── Thumb ─────────────────────────────────────────────────────────────────────
// bg-white is intentional (pure white in both modes) — thumb must contrast
// against the brand-coloured fill. shadow-md replaces the old ring-slider-handle-*
// tokens (which did not exist in mhl-tokens.css).
//
// All interactive states expressed via React Aria data attributes so className
// can be a plain string (no render-prop callback needed).

export const sliderThumbVariants = cva([
  // Shape + position
  "top-1/2 size-6 rounded-full",
  // Appearance — white fill + 2px brand border + shadow-md (Figma: slider-handle-color-bg/border)
  "bg-white border-2 border-brand-solid shadow-md",
  // Interaction
  "cursor-grab",
  "transition-shadow duration-100 ease-linear",
  // Dragging state (React Aria writes data-dragging)
  "data-[dragging]:cursor-grabbing data-[dragging]:shadow-lg",
  // Focus ring — 4px spread matches Figma focus-ring-shadow-sm spec (shadow-sm + 2px white + 4px brand)
  "data-[focus-visible]:ring-4 data-[focus-visible]:ring-brand-500 data-[focus-visible]:ring-offset-2",
  // Disabled state (React Aria writes data-disabled)
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
]);

export type SliderThumbVariantProps = VariantProps<typeof sliderThumbVariants>;

// ── Output / value label ──────────────────────────────────────────────────────
// Positioned relative to the thumb (which is a positioned element within the track).
// `labelPosition` variant controls visibility and placement.

export const sliderOutputVariants = cva(["whitespace-nowrap"], {
  variants: {
    labelPosition: {
      /** Hidden (default) — value is not shown. */
      default: "hidden",
      /** Below the thumb, centred horizontally. */
      bottom:
        "absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-center text-md font-medium text-primary",
      /** Floating tooltip above the thumb. */
      "top-floating": [
        "absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full",
        "rounded-md bg-primary-alt px-3 py-2",
        "text-center text-xs font-semibold text-secondary",
        "shadow-lg border border-secondary-alt",
      ],
    },
  },
  defaultVariants: {
    labelPosition: "default",
  },
});

export type SliderOutputVariantProps = VariantProps<typeof sliderOutputVariants>;
