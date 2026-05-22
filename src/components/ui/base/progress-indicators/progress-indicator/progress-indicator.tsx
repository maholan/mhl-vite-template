import { type CSSProperties, type JSX } from "react";

import { cn } from "@/libs/utils";

import {
  progressFillVariants,
  progressLabelVariants,
  progressTooltipTextVariants,
  progressTooltipVariants,
  progressTrackVariants,
} from "./progress-indicator.variants";

// ── Shared types ──────────────────────────────────────────────────────────────

export interface ProgressBarProps {
  /** Current progress value. */
  value: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Accessible label for screen readers. */
  "aria-label"?: string;
  /** Class name applied to the track container. */
  className?: string;
  /** Class name applied to the fill element. */
  progressClassName?: string;
  /** Custom formatter — receives raw value and percentage, returns display string. */
  valueFormatter?: (value: number, percentage: number) => string | number;
}

type LabelPosition = "right" | "bottom" | "top-floating" | "bottom-floating";

export interface ProgressIndicatorWithTextProps extends ProgressBarProps {
  /**
   * Controls where the value label is rendered relative to the bar.
   * - `right` — inline, to the right of the bar.
   * - `bottom` — below the bar, right-aligned.
   * - `top-floating` — tooltip pinned above the fill endpoint.
   * - `bottom-floating` — tooltip pinned below the fill endpoint.
   */
  labelPosition?: LabelPosition;
}

// ── ProgressBarBase ───────────────────────────────────────────────────────────

/**
 * Bare horizontal progress bar without a label.
 * `h-2` (8 px) track with `rounded-lg` ends — matches the Figma spec exactly.
 *
 * The fill width is driven by a `--progress` CSS custom property set on the
 * container so no imperative `style.width` is needed on the fill element.
 *
 * @example
 * ```tsx
 * <ProgressBarBase value={65} aria-label="Upload progress" />
 * ```
 */
export const ProgressBarBase = ({
  value,
  min = 0,
  max = 100,
  className,
  progressClassName,
  "aria-label": ariaLabel,
}: ProgressBarProps): JSX.Element => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={ariaLabel}
      // CSS custom property drives fill width via Tailwind arbitrary class.
      style={{ "--progress": `${percentage}%` } as CSSProperties}
      className={cn(progressTrackVariants(), className)}
    >
      <div className={cn(progressFillVariants(), progressClassName)} />
    </div>
  );
};

ProgressBarBase.displayName = "ProgressBarBase";

// ── ProgressBar ───────────────────────────────────────────────────────────────

/**
 * Horizontal progress bar with configurable label placement.
 *
 * @example
 * ```tsx
 * <ProgressBar value={40} labelPosition="right" />
 * <ProgressBar value={75} labelPosition="top-floating" />
 * ```
 */
export const ProgressBar = ({
  value,
  min = 0,
  max = 100,
  valueFormatter,
  labelPosition,
  className,
  progressClassName,
  "aria-label": ariaLabel,
}: ProgressIndicatorWithTextProps): JSX.Element => {
  const percentage = ((value - min) * 100) / (max - min);
  const formattedValue = valueFormatter
    ? valueFormatter(value, percentage)
    : `${percentage.toFixed(0)}%`;

  const bar = (
    <ProgressBarBase
      min={min}
      max={max}
      value={value}
      className={className}
      progressClassName={progressClassName}
      aria-label={ariaLabel}
    />
  );

  switch (labelPosition) {
    case "right":
      return (
        <div className="flex items-center gap-3">
          {bar}
          <span className={progressLabelVariants()}>{formattedValue}</span>
        </div>
      );

    case "bottom":
      return (
        <div className="flex flex-col items-end gap-2">
          {bar}
          <span className={progressLabelVariants()}>{formattedValue}</span>
        </div>
      );

    case "top-floating":
      return (
        <div className="relative" style={{ "--progress": `${percentage}%` } as CSSProperties}>
          {bar}
          <div
            className={cn(
              progressTooltipVariants(),
              "-top-2 left-[var(--progress)] -translate-y-full"
            )}
          >
            <div className={progressTooltipTextVariants()}>{formattedValue}</div>
          </div>
        </div>
      );

    case "bottom-floating":
      return (
        <div className="relative" style={{ "--progress": `${percentage}%` } as CSSProperties}>
          {bar}
          <div
            className={cn(progressTooltipVariants(), "top-4 left-[var(--progress)] translate-y-0")}
          >
            <div className={progressTooltipTextVariants()}>{formattedValue}</div>
          </div>
        </div>
      );

    default:
      return bar;
  }
};

ProgressBar.displayName = "ProgressBar";
