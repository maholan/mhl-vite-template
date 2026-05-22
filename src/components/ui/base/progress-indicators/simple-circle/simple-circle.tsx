import { type JSX } from "react";

import { cn } from "@/libs/utils";

import { simpleCircleRootVariants, simpleCircleValueVariants } from "./simple-circle.variants";

export interface CircleProgressBarProps {
  /** Current progress value. */
  value: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Accessible label for screen readers. */
  "aria-label"?: string;
  /** Class name applied to the outer container. */
  className?: string;
}

/**
 * Compact circular progress indicator — fixed 64 px ring with a centered
 * percentage label. Use `ProgressBarCircle` for the full 5-size variant.
 *
 * @example
 * ```tsx
 * <CircleProgressBar value={65} aria-label="Upload progress" />
 * <CircleProgressBar value={3} min={0} max={10} aria-label="Step 3 of 10" />
 * ```
 */
export const CircleProgressBar = ({
  value,
  min = 0,
  max = 100,
  className,
  "aria-label": ariaLabel,
}: CircleProgressBarProps): JSX.Element => {
  const percentage = Math.round(((value - min) * 100) / (max - min));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn(simpleCircleRootVariants(), className)}
    >
      <span className={simpleCircleValueVariants()}>{percentage}%</span>

      <svg className="size-16 -rotate-90" viewBox="0 0 60 60" aria-hidden="true">
        {/* Track */}
        <circle
          className="stroke-[var(--text-color-icon-surface-quaternary)]"
          cx="30"
          cy="30"
          r="26"
          fill="none"
          strokeWidth="6"
        />
        {/* Fill */}
        <circle
          className="stroke-[var(--text-color-icon-brand-primary)]"
          cx="30"
          cy="30"
          r="26"
          fill="none"
          strokeWidth="6"
          strokeDasharray="100"
          pathLength="100"
          strokeLinecap="round"
          strokeDashoffset={100 - percentage}
        />
      </svg>
    </div>
  );
};

CircleProgressBar.displayName = "CircleProgressBar";
