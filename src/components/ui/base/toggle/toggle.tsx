"use client";

import { type JSX, type ReactNode, type Ref } from "react";
import {
  Switch as PrimitiveSwitch,
  type SwitchProps as PrimitiveSwitchProps,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import {
  toggleHintVariants,
  toggleLabelVariants,
  toggleRootVariants,
  toggleTextWrapperVariants,
  toggleThumbVariants,
  toggleTrackVariants,
} from "./toggle.variants";

// ── ToggleBase (purely presentational) ───────────────────────────────────────
// Renders the outer track + inner thumb via explicit state props.
// No React Aria wrapping — usable in custom compositions.

export interface ToggleBaseProps {
  /** Visual size. Defaults to `"sm"`. */
  size?: "sm" | "md";
  /**
   * Slim variant: the thumb sits flush on the track edge, track has a
   * visible border that changes colour on checked state.
   */
  slim?: boolean;
  className?: string;
  /** Whether the keyboard focus ring is visible. */
  isFocusVisible?: boolean;
  /** Whether the toggle is hovered. Used to apply brand-solid-hover fill. */
  isHovered?: boolean;
  /** Whether the toggle is currently on. */
  isSelected?: boolean;
  /** Whether the toggle is non-interactive. */
  isDisabled?: boolean;
}

/**
 * Purely presentational toggle track + thumb.
 * Renders via explicit state props — no React Aria dependency.
 *
 * @example
 * ```tsx
 * <ToggleBase isSelected />
 * <ToggleBase size="md" slim />
 * <ToggleBase isDisabled />
 * ```
 */
export function ToggleBase({
  className,
  isFocusVisible = false,
  isHovered = false,
  isSelected = false,
  isDisabled = false,
  size = "sm",
  slim = false,
}: ToggleBaseProps): JSX.Element {
  return (
    <div
      className={cn(
        toggleTrackVariants({ size, slim, isSelected, isDisabled }),
        // Checked + hovered: darken the brand fill
        isSelected && isHovered && !isDisabled && "bg-brand-solid-hover",
        // Focus ring applied here (not in CVA) to avoid ring-inset / ring-offset conflict
        isFocusVisible && "ring-brand-500 ring-4 ring-offset-2",
        className
      )}
    >
      <div
        style={{
          transition:
            "translate 0.2s ease-in-out, border-color 0.2s ease-in-out, background-color 0.2s ease-in-out",
        }}
        className={cn(
          toggleThumbVariants({ size, slim, isSelected, isDisabled }),
          // Slim checked + hover: swap to hover border colour
          slim && isSelected && isHovered && !isDisabled && "border-toggle-color-border-hover"
        )}
      />
    </div>
  );
}
ToggleBase.displayName = "ToggleBase";

// ── Toggle (full labeled compound) ───────────────────────────────────────────

export interface ToggleProps extends PrimitiveSwitchProps {
  ref?: Ref<HTMLLabelElement>;
  /** Visual size. Defaults to `"sm"`. */
  size?: "sm" | "md";
  /** Label text rendered beside the toggle. */
  label?: ReactNode;
  /** Supplementary hint text rendered below the label. */
  hint?: ReactNode;
  /**
   * Slim variant: thinner track, flush thumb, border-based active indicator.
   */
  slim?: boolean;
}

/**
 * Accessible toggle (switch) built on React Aria.
 * Supports two sizes, a slim track variant, and optional label + hint text.
 *
 * @example
 * ```tsx
 * <Toggle label="Email notifications" defaultSelected />
 * <Toggle label="Dark mode" hint="Applies immediately." size="md" />
 * <Toggle slim label="Compact mode" />
 * ```
 */
export function Toggle({
  label,
  hint,
  className,
  size = "sm",
  slim = false,
  ...ariaSwitchProps
}: ToggleProps): JSX.Element {
  const hasText = (label !== undefined && label !== null) || (hint !== undefined && hint !== null);

  return (
    <PrimitiveSwitch
      {...ariaSwitchProps}
      className={(state) =>
        cn(
          toggleRootVariants({ size, isDisabled: state.isDisabled }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {({ isSelected, isDisabled, isFocusVisible, isHovered }) => (
        <>
          <ToggleBase
            slim={slim}
            size={size}
            isHovered={isHovered}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            isSelected={isSelected}
            className={hasText ? "mt-0.5" : undefined}
          />
          {hasText && (
            <div className={toggleTextWrapperVariants({ size })}>
              {label !== undefined && label !== null && (
                <p className={toggleLabelVariants({ size })}>{label}</p>
              )}
              {hint !== undefined && hint !== null && (
                <span
                  className={toggleHintVariants({ size })}
                  onClick={(event) => event.stopPropagation()}
                >
                  {hint}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </PrimitiveSwitch>
  );
}
Toggle.displayName = "Toggle";
