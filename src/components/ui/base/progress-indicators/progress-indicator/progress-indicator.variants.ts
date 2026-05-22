import { cva, type VariantProps } from "class-variance-authority";

// ── Track (background bar) ────────────────────────────────────────────────────
// h-2 = 8 px (Figma spec). rounded-lg = 8 px border-radius (Figma spec).

export const progressTrackVariants = cva(["h-2 w-full overflow-hidden rounded-lg bg-quaternary"]);

export type ProgressTrackVariantProps = VariantProps<typeof progressTrackVariants>;

// ── Fill (foreground indicator) ───────────────────────────────────────────────
// Width is driven by the --progress CSS custom property set on the container.

export const progressFillVariants = cva([
  "h-full w-[var(--progress)] rounded-lg bg-brand-solid transition-[width] duration-300 ease-out",
]);

// ── Label text (Right / Bottom positions) ─────────────────────────────────────

export const progressLabelVariants = cva([
  "shrink-0 text-sm font-medium text-secondary tabular-nums",
]);

export type ProgressLabelVariantProps = VariantProps<typeof progressLabelVariants>;

// ── Floating tooltip (Top floating / Bottom floating positions) ───────────────

export const progressTooltipVariants = cva([
  "absolute -translate-x-1/2 rounded-lg bg-primary-alt px-3 py-2 shadow-lg ring-1 ring-secondary-alt",
]);

export const progressTooltipTextVariants = cva([
  "text-xs font-semibold text-secondary tabular-nums",
]);
