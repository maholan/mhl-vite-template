"use client";

// "use client" is required because dot-circle uses useId() for unique SVG gradient IDs.

import { useId, type JSX } from "react";

import { cn } from "@/libs/utils";

import {
  loadingLabelVariants,
  loadingRootVariants,
  loadingSpinnerVariants,
  type LoadingSize,
  type LoadingType,
} from "./loading.variants";

// ── Spinner sub-components ─────────────────────────────────────────────────────

interface SpinnerProps {
  size: LoadingSize;
  className?: string;
}

function LineSimpleSpinner({ size, className }: SpinnerProps): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className={cn(loadingSpinnerVariants({ size }), className)}
      fill="none"
      viewBox="0 0 32 32"
    >
      {/* Track ring */}
      <circle
        className="text-icon-surface-tertiary"
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="4"
      />
      {/* Active arc */}
      <circle
        className="text-brand-600"
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeDasharray="100"
        strokeDashoffset="75"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function LineSpinner({ size, className }: SpinnerProps): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className={cn(loadingSpinnerVariants({ size }), className)}
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle
        className="text-brand-600"
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeDasharray="100"
        strokeDashoffset="40"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function DotCircleSpinner({ size, className }: SpinnerProps): JSX.Element {
  // Unique IDs prevent gradient cross-contamination when multiple instances render.
  const id = useId();
  const g0 = `${id}-g0`;
  const g1 = `${id}-g1`;

  return (
    <svg
      aria-hidden="true"
      className={cn("text-brand-600", loadingSpinnerVariants({ size }), className)}
      fill="none"
      viewBox="0 0 36 36"
    >
      <path
        d="M34 18C34 15.8989 33.5861 13.8183 32.7821 11.8771C31.978 9.93586 30.7994 8.17203 29.3137 6.68629C27.828 5.20055 26.0641 4.022 24.1229 3.21793C22.1817 2.41385 20.1011 2 18 2C15.8988 2 13.8183 2.41385 11.8771 3.21793C9.93585 4.022 8.17203 5.20055 6.68629 6.68629C5.20055 8.17203 4.022 9.93586 3.21793 11.8771C2.41385 13.8183 2 15.8989 2 18"
        stroke={`url(#${g0})`}
        strokeDasharray="0.1 8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M3.21793 24.1229C4.022 26.0641 5.20055 27.828 6.68629 29.3137C8.17203 30.7994 9.93585 31.978 11.8771 32.7821C13.8183 33.5861 15.8988 34 18 34C20.1011 34 22.1817 33.5861 24.1229 32.7821C26.0641 31.978 27.828 30.7994 29.3137 29.3137C30.7994 27.828 31.978 26.0641 32.7821 24.1229"
        stroke={`url(#${g1})`}
        strokeDasharray="0.1 8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id={g0} x1="34" x2="2" y1="18" y2="18">
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id={g1} x1="33" x2="3" y1="23.5" y2="24">
          <stop stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.48" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Loading ────────────────────────────────────────────────────────────────────

export interface LoadingProps {
  /**
   * Visual style of the spinner.
   *
   * - `line-simple` — two-arc ring (track + active arc)
   * - `line-spinner` — single-arc with dash offset
   * - `dot-circle` — dotted gradient arc pair
   *
   * @default "line-simple"
   */
  type?: LoadingType;
  /**
   * Size of the spinner and label text.
   * @default "sm"
   */
  size?: LoadingSize;
  /**
   * Optional text label displayed below the spinner.
   */
  label?: string;
  /**
   * Accessible label for the spinner. Used by screen readers.
   * @default "Loading"
   */
  "aria-label"?: string;
  /** Additional class names applied to the root wrapper. */
  className?: string;
  /** Additional class names applied to the SVG spinner. */
  spinnerClassName?: string;
}

/**
 * Loading indicator with three visual styles and four sizes.
 * Purely presentational — no interactive state, no React Aria primitive needed.
 *
 * @example
 * ```tsx
 * // Inline spinner
 * <Loading />
 *
 * // With label and larger size
 * <Loading size="lg" label="Saving changes…" />
 *
 * // Dot-circle style
 * <Loading type="dot-circle" size="md" />
 * ```
 */
export function Loading({
  type = "line-simple",
  size = "sm",
  label,
  "aria-label": ariaLabel = "Loading",
  className,
  spinnerClassName,
}: LoadingProps): JSX.Element {
  const spinnerProps: SpinnerProps = { size, className: spinnerClassName };

  return (
    <div
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn(loadingRootVariants({ size }), className)}
      role="status"
    >
      {type === "line-simple" && <LineSimpleSpinner {...spinnerProps} />}
      {type === "line-spinner" && <LineSpinner {...spinnerProps} />}
      {type === "dot-circle" && <DotCircleSpinner {...spinnerProps} />}

      {label && <span className={cn(loadingLabelVariants({ size }))}>{label}</span>}
      {!label && <span className="sr-only">{ariaLabel}</span>}
    </div>
  );
}

Loading.displayName = "Loading";
