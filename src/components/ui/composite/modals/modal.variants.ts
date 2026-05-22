import { cva, type VariantProps } from "class-variance-authority";

// ── Modal variants ─────────────────────────────────────────────────────────────
// All visual styles for the Modal compound component live here.
// modal.tsx contains only structure + logic.
//
// Token conventions follow the post-May 2026 property-specific namespace.
// No `dark:` prefixes — semantic tokens resolve dark values automatically.
//
// Spec source: Figma Design-Master nodes 716:8829, 716:8743, 1061:13716, 1061:14545

// ── Overlay (backdrop) ─────────────────────────────────────────────────────────

export const modalOverlayVariants = cva(
  [
    "fixed inset-0 z-50",
    "flex w-full",
    "bg-overlay/70 backdrop-blur-[6px]",
    "outline-hidden",
    // Vertical padding via CSS custom properties — lets the Panel respect them
    // for max-height calculation without hard-coding pixel values.
    "pt-(--modal-pt) pb-(--modal-pb)",
    "[--modal-pt:16px] [--modal-pb:clamp(16px,8vh,64px)]",
    "sm:[--modal-pt:32px] sm:[--modal-pb:32px]",
  ],
  {
    variants: {
      placement: {
        center: "items-center justify-center px-4 sm:px-8",
        top: "items-start justify-center px-4 sm:px-8",
        bottom: "items-end justify-center px-4 sm:px-8",
        "drawer-right": "items-stretch justify-end",
        "drawer-left": "items-stretch justify-start",
      },
    },
    defaultVariants: {
      placement: "center",
    },
  }
);

// ── Panel (the white card) ─────────────────────────────────────────────────────
// Figma spec: radius-b-xl = 12px (rounded-xl) for both mobile and desktop.
// No `sm:rounded-2xl` — Figma uses the same radius at all breakpoints.
// Shadow: 3-layer shadow-xl (20/24/-4 + 8/8/-4 + 3/3/-1.5).

export const modalPanelVariants = cva(
  [
    "relative flex flex-col",
    "bg-primary",
    "outline-hidden",
    "max-h-[calc(var(--visual-viewport-height,100dvh)-var(--modal-pt,16px)-var(--modal-pb,16px))]",
  ],
  {
    variants: {
      size: {
        xs: "w-full sm:w-[22rem]",
        sm: "w-full sm:w-[25rem]",
        md: "w-full sm:w-[35rem]",
        lg: "w-full sm:w-[48rem]",
        xl: "w-full sm:w-[60rem]",
        "2xl": "w-full sm:w-[72rem]",
        full: "h-full w-full",
      },
      placement: {
        // Figma: radius-b-xl = 12px on all breakpoints (no larger radius on desktop).
        // Mobile bottom sheet: rounded top only, flat bottom.
        center: "rounded-xl shadow-xl max-sm:rounded-b-none",
        top: "rounded-xl shadow-xl",
        bottom: "rounded-t-xl shadow-xl",
        "drawer-right": "h-full rounded-l-2xl shadow-2xl",
        "drawer-left": "h-full rounded-r-2xl shadow-2xl",
      },
      scrollBehavior: {
        inside: "overflow-hidden",
        outside: "overflow-visible",
      },
    },
    defaultVariants: {
      size: "md",
      placement: "center",
      scrollBehavior: "inside",
    },
  }
);

// ── Header ─────────────────────────────────────────────────────────────────────
// Figma spec (node 716-8829):
//   Desktop: pt-24px pb-20px px-24px → pt-6 pb-5 sm:px-6
//   Mobile:  pt-20px pb-20px px-16px → pt-5 pb-5 px-4
// The pb-20px is a "Padding bottom" spacer Figma renders between the content
// block and the 1px Divider line. We replicate it as pb on the header content div.
// There is NO border-b — the <hr> sibling in modal.tsx IS the Figma "Divider" node.

export const modalHeaderVariants = cva(
  ["relative flex shrink-0 items-start gap-4 px-4 pt-5 pb-5 sm:px-6 sm:pt-6"],
  {
    variants: {
      size: {
        xs: "px-4 pt-5 pb-5 sm:px-5 sm:pt-5",
        sm: "px-4 pt-5 pb-5 sm:px-6 sm:pt-6",
        md: "px-4 pt-5 pb-5 sm:px-6 sm:pt-6",
        lg: "px-4 pt-5 pb-5 sm:px-6 sm:pt-6",
        xl: "px-4 pt-5 pb-5 sm:px-8 sm:pt-6",
        "2xl": "px-4 pt-5 pb-5 sm:px-8 sm:pt-6",
        full: "px-4 pt-5 pb-5 sm:px-8 sm:pt-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ── Body ───────────────────────────────────────────────────────────────────────
// Figma spec:
//   Desktop: pt-20px pb-20px px-24px
//   Mobile:  pt-20px pb-20px px-16px
// The 32px gap before the footer divider is provided by mt-8 on the <hr>
// in ModalFooter, NOT by body bottom padding. This ensures the gap is visible
// even when body content is short (avoids padding collapse inside overflow-y-auto).

export const modalBodyVariants = cva(["min-h-0 flex-1 overflow-y-auto"], {
  variants: {
    size: {
      xs: "px-4 pt-5 pb-5 sm:px-5",
      sm: "px-4 pt-5 pb-5 sm:px-6",
      md: "px-4 pt-5 pb-5 sm:px-6",
      lg: "px-4 pt-5 pb-5 sm:px-6",
      xl: "px-4 pt-5 pb-5 sm:px-8",
      "2xl": "px-4 pt-5 pb-5 sm:px-8",
      full: "px-4 pt-5 pb-5 sm:px-8",
    },
    noPadding: {
      true: "px-0 py-0",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    noPadding: false,
  },
});

// ── Footer ─────────────────────────────────────────────────────────────────────
// Figma spec (node 716-8743):
//   Desktop: pt-24px pb-24px px-24px
//   Mobile:  pt-24px pb-16px px-16px
// pt-6 on the action row creates the gap between divider and buttons.
// The <hr> mt-6/sm:mt-8 above provides the gap between body content and divider.

export const modalFooterVariants = cva(
  ["flex shrink-0 items-center gap-3 px-4 py-6 sm:px-6 sm:py-6"],
  {
    variants: {
      size: {
        xs: "px-4 py-4 sm:px-5 sm:py-5",
        sm: "px-4 py-4 sm:px-6 sm:py-6",
        md: "px-4 py-4 sm:px-6 sm:py-6",
        lg: "px-4 py-4 sm:px-6 sm:py-6",
        xl: "px-4 py-4 sm:px-8 sm:py-6",
        "2xl": "px-4 py-4 sm:px-8 sm:py-6",
        full: "px-4 py-4 sm:px-8 sm:py-6",
      },
      align: {
        right: "justify-end",
        left: "justify-start",
        "space-between": "justify-between",
        center: "justify-center",
      },
    },
    defaultVariants: {
      size: "md",
      align: "right",
    },
  }
);

// ── Exported VariantProps ──────────────────────────────────────────────────────

export type ModalOverlayVariantProps = VariantProps<typeof modalOverlayVariants>;
export type ModalPanelVariantProps = VariantProps<typeof modalPanelVariants>;
export type ModalHeaderVariantProps = VariantProps<typeof modalHeaderVariants>;
export type ModalBodyVariantProps = VariantProps<typeof modalBodyVariants>;
export type ModalFooterVariantProps = VariantProps<typeof modalFooterVariants>;

export type ModalSize = NonNullable<ModalPanelVariantProps["size"]>;
export type ModalPlacement = NonNullable<ModalOverlayVariantProps["placement"]>;
export type ModalScrollBehavior = NonNullable<ModalPanelVariantProps["scrollBehavior"]>;
export type ModalFooterAlign = NonNullable<ModalFooterVariantProps["align"]>;
