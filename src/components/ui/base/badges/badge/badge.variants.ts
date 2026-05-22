import { cva, type VariantProps } from "class-variance-authority";

import type { BadgeColor } from "./badge.type";

// ── Badge variants (CVA) ──────────────────────────────────────────────────────
// All visual styles live here. badge.tsx contains only structure.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens.
//
// Variant → style guide:
//   soft    — coloured background (50) + text (700) + ring (200)
//   outline — transparent background + text (700) + ring (200)
//   solid   — filled background (500) + white text, no ring
//   modern  — bg-primary (theme white/dark) + text-secondary + ring-primary + shadow
//
// All colour-specific classes live in the BADGE_* record exports below.
// This two-layer architecture (CVA for structure + Records for colour) keeps
// each colour change to a single line without 50+ compound variants.
//
// Token → Tailwind utility convention:
//   --color-utility-gray-*         → bg/text/ring-utility-gray-*
//   --color-utility-brand-*        → bg/text/ring-utility-brand-*
//   --color-utility-alert-error-*  → bg/text/ring-utility-alert-error-*
//   --color-utility-alert-warning-* → bg/text/ring-utility-alert-warning-*
//   --color-utility-alert-success-* → bg/text/ring-utility-alert-success-*
//   --color-utility-indigo-*       → bg/text/ring-utility-indigo-*
//   --color-utility-purple-*       → bg/text/ring-utility-purple-*
//   --color-utility-pink-*         → bg/text/ring-utility-pink-*
//   --color-utility-orange-*       → bg/text/ring-utility-orange-*
//   --color-utility-cerulean-*     → bg/text/ring-utility-cerulean-*
//   --color-utility-fuchsia-*      → bg/text/ring-utility-fuchsia-*
//   --color-utility-green-*        → bg/text/ring-utility-green-*
//   --color-utility-yellow-*       → bg/text/ring-utility-yellow-*

// ── Root badge variants ───────────────────────────────────────────────────────

export const badgeVariants = cva(["inline-flex items-center whitespace-nowrap font-medium"], {
  variants: {
    // ── Visual style ───────────────────────────────────────────────────────
    // Colour-specific classes are handled by the BADGE_* record maps below.
    variant: {
      soft: "ring-1 ring-inset",
      outline: "bg-transparent ring-1 ring-inset",
      solid: "",
      modern: "ring-1 ring-inset bg-primary text-secondary ring-primary shadow-xs",
    },
    // ── Size ──────────────────────────────────────────────────────────────
    size: {
      sm: "gap-1 py-0.5 px-2 text-xs",
      md: "gap-1.5 py-0.5 px-2.5 text-sm",
      lg: "gap-1.5 py-1 px-3 text-sm",
    },
    // ── Shape ─────────────────────────────────────────────────────────────
    shape: {
      pill: "rounded-full",
      badge: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "soft",
    size: "md",
    shape: "pill",
  },
});

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

// ── Size-adjusted padding for dot / icon / button slots ───────────────────────
// Leading dot adjusts left padding; trailing button adjusts right padding.

export const badgeDotSizeVariants = cva("", {
  variants: {
    size: {
      sm: "pl-1.5",
      md: "pl-2",
      lg: "pl-2.5",
    },
    shape: {
      pill: "",
      badge: "",
    },
  },
  defaultVariants: { size: "md", shape: "pill" },
});

export const badgeLeadingIconSizeVariants = cva("", {
  variants: {
    size: {
      sm: "pl-1.5",
      md: "pl-2",
      lg: "pl-2.5",
    },
    shape: {
      pill: "",
      badge: "",
    },
  },
  defaultVariants: { size: "md", shape: "pill" },
});

export const badgeTrailingIconSizeVariants = cva("", {
  variants: {
    size: {
      sm: "pr-1.5",
      md: "pr-2",
      lg: "pr-2.5",
    },
  },
  defaultVariants: { size: "md" },
});

export const badgeButtonSizeVariants = cva("", {
  variants: {
    size: {
      sm: "pr-0.75",
      md: "pr-1",
      lg: "pr-1.5",
    },
  },
  defaultVariants: { size: "md" },
});

// ── Icon-only badge padding ───────────────────────────────────────────────────

export const badgeIconOnlyVariants = cva(
  ["inline-flex items-center justify-center whitespace-nowrap font-medium"],
  {
    variants: {
      size: {
        sm: "p-1.25",
        md: "p-1.5",
        lg: "p-2",
      },
      shape: {
        pill: "rounded-full",
        badge: "rounded-md",
      },
      variant: {
        soft: "ring-1 ring-inset",
        outline: "bg-transparent ring-1 ring-inset",
        solid: "",
        modern: "ring-1 ring-inset bg-primary text-secondary ring-primary shadow-xs",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "pill",
      variant: "soft",
    },
  }
);

// ── Colour maps ───────────────────────────────────────────────────────────────
// Every colour change lives in exactly one line here.
// Records are `satisfies Record<BadgeColor, string>` to enforce exhaustiveness.

/** Root classes for `variant="soft"` */
export const BADGE_SOFT_COLORS = {
  gray: "bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200",
  brand: "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200",
  error: "bg-utility-alert-error-50 text-utility-alert-error-700 ring-utility-alert-error-200",
  warning:
    "bg-utility-alert-warning-50 text-utility-alert-warning-700 ring-utility-alert-warning-200",
  success:
    "bg-utility-alert-success-50 text-utility-alert-success-700 ring-utility-alert-success-200",
  indigo: "bg-utility-indigo-50 text-utility-indigo-700 ring-utility-indigo-200",
  purple: "bg-utility-purple-50 text-utility-purple-700 ring-utility-purple-200",
  pink: "bg-utility-pink-50 text-utility-pink-700 ring-utility-pink-200",
  orange: "bg-utility-orange-50 text-utility-orange-700 ring-utility-orange-200",
  cerulean: "bg-utility-cerulean-50 text-utility-cerulean-700 ring-utility-cerulean-200",
  fuchsia: "bg-utility-fuchsia-50 text-utility-fuchsia-700 ring-utility-fuchsia-200",
  green: "bg-utility-green-50 text-utility-green-700 ring-utility-green-200",
  yellow: "bg-utility-yellow-50 text-utility-yellow-700 ring-utility-yellow-200",
} as const satisfies Record<BadgeColor, string>;

/** Root classes for `variant="outline"` — transparent background */
export const BADGE_OUTLINE_COLORS = {
  gray: "text-utility-gray-700 ring-utility-gray-200",
  brand: "text-utility-brand-700 ring-utility-brand-200",
  error: "text-utility-alert-error-700 ring-utility-alert-error-200",
  warning: "text-utility-alert-warning-700 ring-utility-alert-warning-200",
  success: "text-utility-alert-success-700 ring-utility-alert-success-200",
  indigo: "text-utility-indigo-700 ring-utility-indigo-200",
  purple: "text-utility-purple-700 ring-utility-purple-200",
  pink: "text-utility-pink-700 ring-utility-pink-200",
  orange: "text-utility-orange-700 ring-utility-orange-200",
  cerulean: "text-utility-cerulean-700 ring-utility-cerulean-200",
  fuchsia: "text-utility-fuchsia-700 ring-utility-fuchsia-200",
  green: "text-utility-green-700 ring-utility-green-200",
  yellow: "text-utility-yellow-700 ring-utility-yellow-200",
} as const satisfies Record<BadgeColor, string>;

/** Root classes for `variant="solid"` — filled background, white text */
export const BADGE_SOLID_COLORS = {
  gray: "bg-utility-gray-500 text-white",
  brand: "bg-utility-brand-500 text-white",
  error: "bg-utility-alert-error-500 text-white",
  warning: "bg-utility-alert-warning-500 text-white",
  success: "bg-utility-alert-success-500 text-white",
  indigo: "bg-utility-indigo-500 text-white",
  purple: "bg-utility-purple-500 text-white",
  pink: "bg-utility-pink-500 text-white",
  orange: "bg-utility-orange-500 text-white",
  cerulean: "bg-utility-cerulean-500 text-white",
  fuchsia: "bg-utility-fuchsia-500 text-white",
  green: "bg-utility-green-500 text-white",
  yellow: "bg-utility-yellow-500 text-white",
} as const satisfies Record<BadgeColor, string>;

// ── Dot indicator colours ─────────────────────────────────────────────────────

/** Dot background for `variant="soft"` or `"outline"` */
export const BADGE_DOT_COLORS_LIGHT = {
  gray: "bg-utility-gray-500",
  brand: "bg-utility-brand-500",
  error: "bg-utility-alert-error-500",
  warning: "bg-utility-alert-warning-500",
  success: "bg-utility-alert-success-500",
  indigo: "bg-utility-indigo-500",
  purple: "bg-utility-purple-500",
  pink: "bg-utility-pink-500",
  orange: "bg-utility-orange-500",
  cerulean: "bg-utility-cerulean-500",
  fuchsia: "bg-utility-fuchsia-500",
  green: "bg-utility-green-500",
  yellow: "bg-utility-yellow-500",
} as const satisfies Record<BadgeColor, string>;

// ── Addon icon text colours ───────────────────────────────────────────────────

/** Icon text colour for `variant="soft"` or `"outline"` — dimmer than label */
export const BADGE_ICON_COLORS_LIGHT = {
  gray: "text-utility-gray-500",
  brand: "text-utility-brand-500",
  error: "text-utility-alert-error-500",
  warning: "text-utility-alert-warning-500",
  success: "text-utility-alert-success-500",
  indigo: "text-utility-indigo-500",
  purple: "text-utility-purple-500",
  pink: "text-utility-pink-500",
  orange: "text-utility-orange-500",
  cerulean: "text-utility-cerulean-500",
  fuchsia: "text-utility-fuchsia-500",
  green: "text-utility-green-500",
  yellow: "text-utility-yellow-500",
} as const satisfies Record<BadgeColor, string>;

// ── Dismiss button colours ────────────────────────────────────────────────────

/** Dismiss button classes for `variant="soft"` or `"outline"` */
export const BADGE_DISMISS_COLORS_LIGHT = {
  gray: "text-utility-gray-400 hover:text-utility-gray-500 hover:bg-utility-gray-100",
  brand: "text-utility-brand-400 hover:text-utility-brand-500 hover:bg-utility-brand-100",
  error:
    "text-utility-alert-error-400 hover:text-utility-alert-error-500 hover:bg-utility-alert-error-100",
  warning:
    "text-utility-alert-warning-400 hover:text-utility-alert-warning-500 hover:bg-utility-alert-warning-100",
  success:
    "text-utility-alert-success-400 hover:text-utility-alert-success-500 hover:bg-utility-alert-success-100",
  indigo: "text-utility-indigo-400 hover:text-utility-indigo-500 hover:bg-utility-indigo-100",
  purple: "text-utility-purple-400 hover:text-utility-purple-500 hover:bg-utility-purple-100",
  pink: "text-utility-pink-400 hover:text-utility-pink-500 hover:bg-utility-pink-100",
  orange: "text-utility-orange-400 hover:text-utility-orange-500 hover:bg-utility-orange-100",
  cerulean:
    "text-utility-cerulean-400 hover:text-utility-cerulean-500 hover:bg-utility-cerulean-100",
  fuchsia: "text-utility-fuchsia-400 hover:text-utility-fuchsia-500 hover:bg-utility-fuchsia-100",
  green: "text-utility-green-400 hover:text-utility-green-500 hover:bg-utility-green-100",
  yellow: "text-utility-yellow-400 hover:text-utility-yellow-500 hover:bg-utility-yellow-100",
} as const satisfies Record<BadgeColor, string>;

// solid dismiss button — all colours share the same white-on-colour treatment
export const BADGE_DISMISS_COLOR_SOLID = "text-white/50 hover:text-white/80 hover:bg-white/20";

// modern dismiss button — neutral treatment on theme background
export const BADGE_DISMISS_COLOR_MODERN = "text-quaternary hover:text-tertiary hover:bg-secondary";
