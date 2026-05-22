import { cva, type VariantProps } from "class-variance-authority";

// ── Loading variants ───────────────────────────────────────────────────────────
// All visual styles for the Loading compound component live here.
// loading.tsx contains only structure + logic.
//
// Token conventions follow the post-May 2026 property-specific namespace.
// No `dark:` prefixes — semantic tokens resolve dark values automatically.

// ── Root wrapper ───────────────────────────────────────────────────────────────

export const loadingRootVariants = cva(["flex flex-col items-center justify-center"], {
  variants: {
    size: {
      sm: "gap-4",
      md: "gap-4",
      lg: "gap-4",
      xl: "gap-5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// ── Spinner (SVG wrapper) ──────────────────────────────────────────────────────

export const loadingSpinnerVariants = cva(["animate-spin shrink-0"], {
  variants: {
    size: {
      sm: "size-8",
      md: "size-12",
      lg: "size-14",
      xl: "size-16",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// ── Label ──────────────────────────────────────────────────────────────────────

export const loadingLabelVariants = cva(["font-medium text-secondary"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-lg",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// ── Exported VariantProps ──────────────────────────────────────────────────────

export type LoadingRootVariantProps = VariantProps<typeof loadingRootVariants>;
export type LoadingSpinnerVariantProps = VariantProps<typeof loadingSpinnerVariants>;
export type LoadingLabelVariantProps = VariantProps<typeof loadingLabelVariants>;

export type LoadingSize = NonNullable<LoadingRootVariantProps["size"]>;
export type LoadingType = "line-simple" | "line-spinner" | "dot-circle";
