import { cva, type VariantProps } from "class-variance-authority";

import { sortCx } from "@/libs/utils";

// ── Type definitions ──────────────────────────────────────────────────────────

/** Five core semantic colours supported by BadgeGroup. */
export type BadgeGroupColor = "gray" | "brand" | "error" | "warning" | "success";

/** Size scale: `md` (default) and `lg`. */
export type BadgeGroupSize = "md" | "lg";

/** Visual theme: coloured pill (`light`) or neutral with status dot (`modern`). */
export type BadgeGroupTheme = "light" | "modern";

/** Position of the addon pill relative to the children. */
export type BadgeGroupAlign = "leading" | "trailing";

// ── Root CVA ──────────────────────────────────────────────────────────────────
// Handles all structural classes on the outermost container.
// Colour-specific classes come from BADGE_GROUP_LIGHT_ROOT applied via cn().
//
// Padding strategy (compoundVariants):
//   leading           → py-1 pl-1 pr-2  (both themes)
//   trailing light    → py-1 pl-3 pr-1
//   trailing modern   → py-1 pl-2.5 pr-1  (status dot needs tighter left gap)

export const badgeGroupRootVariants = cva(
  [
    "inline-flex w-max cursor-pointer items-center",
    "font-medium",
    "transition duration-100 ease-linear",
  ],
  {
    variants: {
      theme: {
        light: "rounded-full ring-1 ring-inset",
        modern:
          "rounded-[10px] bg-primary text-secondary shadow-xs ring-1 ring-inset ring-primary hover:bg-secondary",
      },
      size: {
        md: "text-xs",
        lg: "text-sm",
      },
      align: {
        // padding set entirely via compoundVariants below
        leading: "",
        trailing: "",
      },
    },
    compoundVariants: [
      // leading — same for both themes
      { align: "leading", className: "py-1 pl-1 pr-2" },
      // trailing light
      { theme: "light", align: "trailing", className: "py-1 pl-3 pr-1" },
      // trailing modern — dot takes visual space, reduce left padding
      { theme: "modern", align: "trailing", className: "py-1 pl-2.5 pr-1" },
    ],
    defaultVariants: {
      theme: "light",
      size: "md",
      align: "leading",
    },
  }
);

export type BadgeGroupVariantProps = VariantProps<typeof badgeGroupRootVariants>;

// ── Addon pill CVA ────────────────────────────────────────────────────────────
// Handles structural classes on the inner addon pill.
// Ring colour is applied separately via BADGE_GROUP_LIGHT_ADDON.
//
// Modern: rounded-md, bg-primary, shadow-xs, ring-primary — self-contained.
// Light:  rounded-full, bg-primary — ring colour from the colour map.

export const badgeGroupAddonVariants = cva(["inline-flex items-center ring-1 ring-inset"], {
  variants: {
    theme: {
      light: "rounded-full bg-primary",
      modern: "rounded-md bg-primary shadow-xs ring-primary",
    },
    size: {
      // padding set entirely via compoundVariants below
      md: "",
      lg: "",
    },
    align: {
      leading: "",
      trailing: "",
    },
  },
  compoundVariants: [
    // light
    { theme: "light", align: "leading", size: "md", className: "px-2 py-0.5" },
    { theme: "light", align: "leading", size: "lg", className: "px-2.5 py-0.5" },
    { theme: "light", align: "trailing", size: "md", className: "py-0.5 pr-1.5 pl-2" },
    { theme: "light", align: "trailing", size: "lg", className: "py-0.5 pr-2 pl-2.5" },
    // modern
    { theme: "modern", align: "leading", size: "md", className: "gap-1 px-1.5 py-0.5" },
    { theme: "modern", align: "leading", size: "lg", className: "gap-1.5 px-2 py-0.5" },
    { theme: "modern", align: "trailing", size: "md", className: "py-0.5 pr-1.5 pl-2" },
    { theme: "modern", align: "trailing", size: "lg", className: "py-0.5 pr-1.5 pl-2" },
  ],
  defaultVariants: {
    theme: "light",
    size: "md",
    align: "leading",
  },
});

// ── Dot CVA ───────────────────────────────────────────────────────────────────
// Handles the status dot shown in theme="modern".
// Colour + outline classes come from BADGE_GROUP_MODERN_DOT via cn().
//
// leading: inside addon pill — gap handles spacing, no margin needed.
// trailing: before label — margin-right provides the gap.

export const badgeGroupDotVariants = cva(["inline-block size-2 shrink-0 rounded-full"], {
  variants: {
    align: {
      leading: "",
      trailing: "",
    },
    size: {
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { align: "trailing", size: "md", className: "mr-1.5" },
    { align: "trailing", size: "lg", className: "mr-2" },
  ],
  defaultVariants: {
    align: "leading",
    size: "md",
  },
});

// ── Colour maps ───────────────────────────────────────────────────────────────
// Two-layer architecture: CVA for structure + Records for colour.
// Every colour change touches exactly one line.
// All records satisfy Record<BadgeGroupColor, string> for exhaustiveness.

/** Root classes for `theme="light"`. Handles background, text, ring, and hover. */
export const BADGE_GROUP_LIGHT_ROOT: Record<BadgeGroupColor, string> = sortCx({
  gray: "bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200 hover:bg-utility-gray-100",
  brand:
    "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200 hover:bg-utility-brand-100",
  error:
    "bg-utility-alert-error-50 text-utility-alert-error-700 ring-utility-alert-error-200 hover:bg-utility-alert-error-100",
  warning:
    "bg-utility-alert-warning-50 text-utility-alert-warning-700 ring-utility-alert-warning-200 hover:bg-utility-alert-warning-100",
  success:
    "bg-utility-alert-success-50 text-utility-alert-success-700 ring-utility-alert-success-200 hover:bg-utility-alert-success-100",
});

/** Addon pill ring colour for `theme="light"`. Structural bg/shape handled by CVA. */
export const BADGE_GROUP_LIGHT_ADDON: Record<BadgeGroupColor, string> = sortCx({
  gray: "ring-utility-gray-200",
  brand: "ring-utility-brand-200",
  error: "ring-utility-alert-error-200",
  warning: "ring-utility-alert-warning-200",
  success: "ring-utility-alert-success-200",
});

/**
 * Icon colour for `theme="light"`. Consumers apply this when constructing
 * the `iconTrailing` ReactNode.
 *
 * @example
 * ```tsx
 * import { BADGE_GROUP_LIGHT_ICON } from "@maholan/ui";
 *
 * <BadgeGroup color="brand" iconTrailing={<ArrowRight className={BADGE_GROUP_LIGHT_ICON.brand} />}>
 *   New feature
 * </BadgeGroup>
 * ```
 */
export const BADGE_GROUP_LIGHT_ICON: Record<BadgeGroupColor, string> = sortCx({
  gray: "text-utility-gray-500",
  brand: "text-utility-brand-500",
  error: "text-utility-alert-error-500",
  warning: "text-utility-alert-warning-500",
  success: "text-utility-alert-success-500",
});

// ── Colour records — modern theme ─────────────────────────────────────────────

/**
 * Status dot colour + outline ring for `theme="modern"`.
 * The outline creates a visual halo that separates the dot from the background.
 */
export const BADGE_GROUP_MODERN_DOT: Record<BadgeGroupColor, string> = sortCx({
  gray: "bg-utility-gray-500 outline-3 -outline-offset-1 outline-utility-gray-100",
  brand: "bg-utility-brand-500 outline-3 -outline-offset-1 outline-utility-brand-100",
  error: "bg-utility-alert-error-500 outline-3 -outline-offset-1 outline-utility-alert-error-100",
  warning:
    "bg-utility-alert-warning-500 outline-3 -outline-offset-1 outline-utility-alert-warning-100",
  success:
    "bg-utility-alert-success-500 outline-3 -outline-offset-1 outline-utility-alert-success-100",
});
