// ── Badge type definitions ────────────────────────────────────────────────────
// All badge type aliases live here. Kept separate so variants.ts can import
// them without circular dependencies.

/** All visual style treatments available for every badge component. */
export type BadgeVariant = "soft" | "outline" | "solid" | "modern";

/**
 * All colour palette options.
 *
 * Core semantic colours (gray, brand, error, warning, success) cover the
 * Untitled UI standard palette. Extended colours (indigo → yellow) support
 * richer categorisation systems.
 *
 * Maps to `utility-*` tokens in `@maholan/tokens`.
 */
export type BadgeColor =
  | "gray"
  | "brand"
  | "error"
  | "warning"
  | "success"
  | "indigo"
  | "purple"
  | "pink"
  | "orange"
  | "cerulean"
  | "fuchsia"
  | "green"
  | "yellow";

/** Size scale matching the Untitled UI spacing grid. */
export type BadgeSize = "sm" | "md" | "lg";

/** Shape: pill (rounded-full) for tags, badge (rounded-md) for labels. */
export type BadgeShape = "pill" | "badge";
