import { cva, type VariantProps } from "class-variance-authority";

// ── Wrapper ───────────────────────────────────────────────────────────────────

export const paginationDotWrapperVariants = cva("flex h-max w-max items-center justify-center", {
  variants: {
    size: {
      md: "",
      lg: "",
    },
    style: {
      Dot: "",
      Line: "",
    },
    framed: {
      true: "rounded-[20px] bg-[var(--color-alpha-white-70)] backdrop-blur-sm",
      false: "",
    },
  },
  compoundVariants: [
    // Gap — Dot
    { style: "Dot", size: "md", framed: false, class: "gap-3" },
    { style: "Dot", size: "lg", framed: false, class: "gap-4" },
    { style: "Dot", size: "md", framed: true, class: "gap-3 p-2" },
    { style: "Dot", size: "lg", framed: true, class: "gap-4 p-3" },
    // Gap + width — Line
    { style: "Line", size: "md", framed: false, class: "gap-2 w-36" },
    { style: "Line", size: "lg", framed: false, class: "gap-3 w-38" },
    { style: "Line", size: "md", framed: true, class: "gap-2 p-2 w-40" },
    { style: "Line", size: "lg", framed: true, class: "gap-3 p-3 w-44" },
  ],
  defaultVariants: {
    size: "md",
    style: "Dot",
    framed: false,
  },
});

export type PaginationDotWrapperVariantProps = VariantProps<typeof paginationDotWrapperVariants>;

// ── Dot indicator ─────────────────────────────────────────────────────────────

export const paginationDotIndicatorVariants = cva(
  [
    "relative overflow-hidden rounded-full shrink-0",
    "cursor-pointer transition-colors duration-100 ease-linear",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:z-10",
  ],
  {
    variants: {
      size: {
        md: "size-2",
        lg: "size-2.5",
      },
      isCurrent: {
        true: "bg-brand-600",
        false: "bg-quaternary",
      },
    },
    defaultVariants: {
      size: "md",
      isCurrent: false,
    },
  }
);

export type PaginationDotIndicatorVariantProps = VariantProps<
  typeof paginationDotIndicatorVariants
>;

// ── Line indicator ────────────────────────────────────────────────────────────

export const paginationLineIndicatorVariants = cva(
  [
    "relative overflow-hidden rounded-lg flex-1 min-w-px",
    "cursor-pointer transition-colors duration-100 ease-linear",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:z-10",
  ],
  {
    variants: {
      size: {
        md: "h-1.5",
        lg: "h-2",
      },
      isCurrent: {
        true: "bg-brand-600",
        false: "bg-quaternary",
      },
    },
    defaultVariants: {
      size: "md",
      isCurrent: false,
    },
  }
);

export type PaginationLineIndicatorVariantProps = VariantProps<
  typeof paginationLineIndicatorVariants
>;
