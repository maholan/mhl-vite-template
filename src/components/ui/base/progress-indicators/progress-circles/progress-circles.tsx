import { type JSX } from "react";

import { cn } from "@/libs/utils";

import {
  CIRCLE_SIZE_CONFIG,
  HALF_CIRCLE_TEXT_POSITION,
  circleLabelVariants,
  circleValueVariants,
  type CircleSize,
} from "./progress-circles.variants";

// ── Shared props ──────────────────────────────────────────────────────────────

export interface ProgressCircleProps {
  /** Current progress value. */
  value: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Visual size of the circle. @default "xxs" */
  size: CircleSize;
  /** Optional sub-label rendered below the value (e.g. "Active users"). */
  label?: string;
  /** Custom formatter — receives raw value and percentage, returns display string. */
  valueFormatter?: (value: number, percentage: number) => string | number;
  /** Accessible label for screen readers. */
  "aria-label"?: string;
}

// ── ProgressBarCircle — full ring ─────────────────────────────────────────────

/**
 * Circular progress ring with a centered value label. Supports 5 sizes and
 * an optional sub-label.
 *
 * @example
 * ```tsx
 * <ProgressBarCircle size="md" value={65} label="Active users" />
 * <ProgressBarCircle size="xxs" value={40} />
 * ```
 */
export const ProgressBarCircle = ({
  value,
  min = 0,
  max = 100,
  size,
  label,
  valueFormatter,
  "aria-label": ariaLabel,
}: ProgressCircleProps): JSX.Element => {
  const percentage = Math.round(((value - min) * 100) / (max - min));
  const { strokeWidth, radius } = CIRCLE_SIZE_CONFIG[size];

  const diameter = 2 * (radius + strokeWidth / 2);
  const cx = diameter / 2;
  const cy = diameter / 2;
  const strokeDashoffset = 100 - percentage;
  const displayValue = valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        className="relative flex w-max items-center justify-center"
      >
        <svg
          className="-rotate-90"
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            className="stroke-[var(--text-color-icon-surface-quaternary)]"
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeLinecap="round"
          />
          {/* Fill */}
          <circle
            className="stroke-[var(--text-color-icon-brand-primary)]"
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeLinecap="round"
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {label && size !== "xxs" ? (
          <div className="absolute text-center">
            <div className={circleLabelVariants({ size })}>{label}</div>
            <div className={circleValueVariants({ size })}>{displayValue}</div>
          </div>
        ) : (
          <span className={cn("absolute text-center", circleValueVariants({ size }))}>
            {displayValue}
          </span>
        )}
      </div>

      {label && size === "xxs" && <div className={circleLabelVariants({ size })}>{label}</div>}
    </div>
  );
};

ProgressBarCircle.displayName = "ProgressBarCircle";

// ── ProgressBarHalfCircle — semicircle ────────────────────────────────────────

/**
 * Half-circle (semicircle) progress indicator with a bottom-anchored value
 * label. Supports 5 sizes and an optional sub-label.
 *
 * @example
 * ```tsx
 * <ProgressBarHalfCircle size="md" value={65} label="CPU usage" />
 * ```
 */
export const ProgressBarHalfCircle = ({
  value,
  min = 0,
  max = 100,
  size,
  label,
  valueFormatter,
  "aria-label": ariaLabel,
}: ProgressCircleProps): JSX.Element => {
  const percentage = Math.round(((value - min) * 100) / (max - min));
  const { strokeWidth, radius } = CIRCLE_SIZE_CONFIG[size];

  const width = 2 * (radius + strokeWidth / 2);
  const height = radius + strokeWidth;
  const cy = radius + strokeWidth / 2;
  const strokeDashoffset = -50 - (100 - percentage) / 2;
  const displayValue = valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`;
  const textPosition = HALF_CIRCLE_TEXT_POSITION[size];

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        className="relative flex w-max items-center justify-center"
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
          {/* Track */}
          <circle
            className="stroke-[var(--text-color-icon-surface-quaternary)]"
            cx="50%"
            cy={cy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="-50"
            strokeLinecap="round"
          />
          {/* Fill */}
          <circle
            className="origin-center -scale-x-100 stroke-[var(--text-color-icon-brand-primary)]"
            cx="50%"
            cy={cy}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {label && size !== "xxs" ? (
          <div className={textPosition}>
            <div className={circleLabelVariants({ size })}>{label}</div>
            <div className={circleValueVariants({ size })}>{displayValue}</div>
          </div>
        ) : (
          <span className={cn(textPosition, circleValueVariants({ size }))}>{displayValue}</span>
        )}
      </div>

      {label && size === "xxs" && <div className={circleLabelVariants({ size })}>{label}</div>}
    </div>
  );
};

ProgressBarHalfCircle.displayName = "ProgressBarHalfCircle";
