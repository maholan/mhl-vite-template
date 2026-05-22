import { cva, type VariantProps } from "class-variance-authority";

// ── Carousel variants ──────────────────────────────────────────────────────────
// All visual styles for the Carousel compound component live here.
// carousel.tsx contains only structure + logic.
//
// Token conventions follow the post-May 2026 property-specific namespace.
// No `dark:` prefixes — semantic tokens resolve dark values automatically.

// ── Root ───────────────────────────────────────────────────────────────────────

export const carouselRootVariants = cva(["relative w-full"], {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// ── Content (Embla viewport + track) ──────────────────────────────────────────

export const carouselContentVariants = cva(["flex"], {
  variants: {
    orientation: {
      horizontal: "-ml-4",
      vertical: "-mt-4 flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// ── Item ───────────────────────────────────────────────────────────────────────

export const carouselItemVariants = cva(["min-w-0 shrink-0 grow-0 basis-full"], {
  variants: {
    orientation: {
      horizontal: "pl-4",
      vertical: "pt-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// ── Navigation button (prev / next) ───────────────────────────────────────────
// Figma: 40×40px circle, bg-primary, shadow-md, absolute outside the track.

export const carouselNavButtonVariants = cva(
  [
    "absolute z-10",
    "flex size-10 items-center justify-center rounded-full",
    "bg-primary shadow-md",
    "border border-primary",
    "text-icon-quaternary",
    "transition-all duration-150",
    "hover:bg-secondary hover:text-secondary hover:cursor-pointer ",
    "focus:outline-none",
    "disabled:hover:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      orientation: {
        horizontal: "-translate-y-1/2 top-1/2",
        vertical: "-translate-x-1/2 left-1/2",
      },
      direction: {
        prev: "",
        next: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", direction: "prev", class: "-left-5" },
      { orientation: "horizontal", direction: "next", class: "-right-5" },
      { orientation: "vertical", direction: "prev", class: "-top-5" },
      { orientation: "vertical", direction: "next", class: "-bottom-5" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      direction: "prev",
    },
  }
);

// ── Dot indicator ─────────────────────────────────────────────────────────────
// Active dot is wider (w-4) — a subtle pill expansion to signal position.

export const carouselDotVariants = cva(
  [
    "h-1.5 rounded-full transition-all duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      isSelected: {
        true: "w-4 bg-brand-600",
        false: "w-1.5 bg-secondary hover:bg-tertiary",
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  }
);

// ── Exported VariantProps ──────────────────────────────────────────────────────

export type CarouselRootVariantProps = VariantProps<typeof carouselRootVariants>;
export type CarouselContentVariantProps = VariantProps<typeof carouselContentVariants>;
export type CarouselItemVariantProps = VariantProps<typeof carouselItemVariants>;
export type CarouselNavButtonVariantProps = VariantProps<typeof carouselNavButtonVariants>;
export type CarouselDotVariantProps = VariantProps<typeof carouselDotVariants>;

export type CarouselOrientation = NonNullable<CarouselRootVariantProps["orientation"]>;
