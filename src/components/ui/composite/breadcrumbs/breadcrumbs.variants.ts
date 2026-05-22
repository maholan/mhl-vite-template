import { cva, type VariantProps } from "class-variance-authority";

// ── Breadcrumbs variants ───────────────────────────────────────────────────────
// Figma ref: node-id=375-464

export const breadcrumbsRootVariants = cva(["flex items-center flex-wrap"], {
  variants: {
    type: {
      text: "gap-2",
      "text-with-line": "border-t border-b border-primary py-2 gap-2 pl-2",
      button: "gap-1",
    },
  },
  defaultVariants: {
    type: "text",
  },
});

export const breadcrumbItemVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-semibold text-sm leading-5",
    "transition-colors duration-150",
    "outline-none",
  ],
  {
    variants: {
      type: {
        text: "text-quaternary hover:text-secondary",
        "text-with-line": "text-quaternary hover:text-secondary",
        button: "text-quaternary hover:text-secondary px-2 py-1 rounded-md hover:bg-secondary",
      },
      isCurrent: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        type: "text",
        isCurrent: true,
        class: "text-brand-secondary hover:text-brand-secondary cursor-default pointer-events-none",
      },
      {
        type: "text-with-line",
        isCurrent: true,
        class: "text-brand-secondary hover:text-brand-secondary cursor-default pointer-events-none",
      },
      {
        type: "button",
        isCurrent: true,
        class:
          "bg-secondary text-secondary hover:text-secondary cursor-default pointer-events-none",
      },
    ],
    defaultVariants: {
      type: "text",
      isCurrent: false,
    },
  }
);

export const breadcrumbSeparatorVariants = cva(
  ["shrink-0 text-quaternary flex items-center justify-center"],
  {
    variants: {
      divider: {
        chevron: "size-4",
        slash: "size-5",
      },
    },
    defaultVariants: {
      divider: "chevron",
    },
  }
);

export const breadcrumbOverflowVariants = cva(
  [
    "inline-flex items-center justify-center",
    "outline-none transition-colors duration-150",
    "text-quaternary hover:text-secondary",
  ],
  {
    variants: {
      type: {
        text: "",
        "text-with-line": "",
        button: "p-1 rounded-md hover:bg-secondary",
      },
    },
    defaultVariants: {
      type: "text",
    },
  }
);

// ── Exported types ─────────────────────────────────────────────────────────────

export type BreadcrumbsRootVariantProps = VariantProps<typeof breadcrumbsRootVariants>;
export type BreadcrumbItemVariantProps = VariantProps<typeof breadcrumbItemVariants>;
export type BreadcrumbSeparatorVariantProps = VariantProps<typeof breadcrumbSeparatorVariants>;
export type BreadcrumbOverflowVariantProps = VariantProps<typeof breadcrumbOverflowVariants>;

export type BreadcrumbType = NonNullable<BreadcrumbsRootVariantProps["type"]>;
export type BreadcrumbDivider = NonNullable<BreadcrumbSeparatorVariantProps["divider"]>;
