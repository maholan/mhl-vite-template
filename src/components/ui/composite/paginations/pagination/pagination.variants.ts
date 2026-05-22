import { cva, type VariantProps } from "class-variance-authority";

// ── Page item ─────────────────────────────────────────────────────────────────

export const paginationPageItemVariants = cva(
  [
    "flex size-10 cursor-pointer items-center justify-center text-sm font-medium",
    "transition-all duration-100 ease-linear",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:z-10",
  ],
  {
    variants: {
      rounded: {
        true: "rounded-full",
        false: "rounded-lg",
      },
      isCurrent: {
        true: "bg-primary-hover text-secondary-hover",
        false: "text-icon-quaternary hover:bg-primary-hover hover:text-secondary",
      },
    },
    defaultVariants: {
      rounded: false,
      isCurrent: false,
    },
  }
);

export type PaginationPageItemVariantProps = VariantProps<typeof paginationPageItemVariants>;

// ── Ellipsis ──────────────────────────────────────────────────────────────────

export const paginationEllipsisVariants = cva(
  "flex size-10 shrink-0 items-center justify-center text-sm text-tertiary"
);

// ── Mobile label ──────────────────────────────────────────────────────────────

export const paginationMobileLabelVariants = cva(
  "flex justify-center text-sm whitespace-pre text-secondary"
);

// ── Page root (border-top layouts) ───────────────────────────────────────────

export const paginationPageRootVariants = cva(
  "flex w-full items-center justify-between gap-3 border-t border-primary",
  {
    variants: {
      spacing: {
        page: "pt-4 md:pt-5",
        card: "px-4 py-3 md:px-6 md:pt-3 md:pb-4",
      },
    },
    defaultVariants: {
      spacing: "page",
    },
  }
);

// ── Button-group item (pagination strip) ─────────────────────────────────────

export const paginationButtonGroupWrapperVariants = cva(
  "flex border-t border-primary px-4 py-3 md:px-6 md:pt-3 md:pb-4",
  {
    variants: {
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
    },
    defaultVariants: {
      align: "left",
    },
  }
);

// ── Card minimal / advanced outer wrapper ─────────────────────────────────────

export const paginationCardWrapperVariants = cva(
  "border-t border-primary px-4 py-3 md:px-6 md:pt-3 md:pb-4"
);
