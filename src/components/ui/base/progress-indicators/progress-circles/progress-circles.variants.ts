import { cva, type VariantProps } from "class-variance-authority";

// ── SVG geometry ──────────────────────────────────────────────────────────────
// Raw numeric values used for SVG math (not CSS classes — CVA doesn't apply).

export const CIRCLE_SIZE_CONFIG = {
  xxs: { strokeWidth: 6, radius: 29 },
  xs: { strokeWidth: 16, radius: 72 },
  sm: { strokeWidth: 20, radius: 90 },
  md: { strokeWidth: 24, radius: 108 },
  lg: { strokeWidth: 28, radius: 126 },
} as const;

export type CircleSize = keyof typeof CIRCLE_SIZE_CONFIG;

// ── Value label (percentage / formatted number) ───────────────────────────────
// xxs uses body text scale (fits the 64 px ring); xs–lg step through the display scale.

export const circleValueVariants = cva(["font-semibold text-primary"], {
  variants: {
    size: {
      xxs: "text-sm",
      xs: "text-display-xs",
      sm: "text-display-sm",
      md: "text-display-md tracking-[-0.72px]",
      lg: "text-display-lg tracking-[-0.96px]",
    },
  },
  defaultVariants: { size: "xxs" },
});

export type CircleValueVariantProps = VariantProps<typeof circleValueVariants>;

// ── Sub-label (e.g. "Active users") ──────────────────────────────────────────
// xxs uses xs text since the ring is only 64 px; all other sizes use sm.

export const circleLabelVariants = cva(["font-medium text-tertiary"], {
  variants: {
    size: {
      xxs: "text-xs",
      xs: "text-sm",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-sm",
    },
  },
  defaultVariants: { size: "xxs" },
});

export type CircleLabelVariantProps = VariantProps<typeof circleLabelVariants>;

// ── Half-circle text position (absolute, bottom-anchored) ─────────────────────
// Keeps value + sub-label centred at the mouth of the arc.

export const HALF_CIRCLE_TEXT_POSITION: Record<CircleSize, string> = {
  xxs: "absolute bottom-0.5 text-center",
  xs: "absolute bottom-0.5 text-center",
  sm: "absolute bottom-2 text-center",
  md: "absolute bottom-1 text-center",
  lg: "absolute bottom-0 text-center",
};
