"use client";

import { type JSX, type ReactNode, type Ref } from "react";
import {
  Checkbox as PrimitiveCheckbox,
  type CheckboxProps as PrimitiveCheckboxProps,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import {
  checkboxBoxVariants,
  checkboxHintVariants,
  checkboxIconVariants,
  checkboxLabelVariants,
  checkboxRootVariants,
  checkboxTextWrapperVariants,
} from "./checkbox.variants";

// ── CheckboxBase (purely presentational) ─────────────────────────────────────
// Renders the visual box + checkmark / indeterminate dash.
// No React Aria wrapping — usable in custom compositions.

export interface CheckboxBaseProps {
  /** Visual size of the box. Defaults to `"sm"`. */
  size?: "sm" | "md";
  className?: string;
  /** Whether the keyboard focus ring is visible. */
  isFocusVisible?: boolean;
  /** Whether the checkbox is in a checked state. */
  isSelected?: boolean;
  /** Whether the checkbox is non-interactive. */
  isDisabled?: boolean;
  /** Whether the checkbox shows the indeterminate (−) state. */
  isIndeterminate?: boolean;
  /** Whether the parent field is in an error/invalid state. */
  isInvalid?: boolean;
}

/**
 * Purely presentational checkbox indicator.
 * Renders the box, checkmark, and indeterminate dash via explicit state props.
 *
 * @example
 * ```tsx
 * <CheckboxBase isSelected />
 * <CheckboxBase isIndeterminate size="md" />
 * <CheckboxBase isInvalid />
 * ```
 */
export function CheckboxBase({
  className,
  isSelected = false,
  isDisabled = false,
  isIndeterminate = false,
  isInvalid = false,
  isFocusVisible = false,
  size = "sm",
}: CheckboxBaseProps): JSX.Element {
  return (
    <div
      className={cn(
        checkboxBoxVariants({ size, isSelected, isDisabled, isIndeterminate, isInvalid }),
        // Focus ring — applied here (not in CVA) to avoid ring-inset / ring-offset conflict.
        // ring-offset-2 resolves the conflict with ring-inset via tailwind-merge.
        isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
        className
      )}
    >
      {/* Indeterminate dash — visible when isIndeterminate */}
      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className={checkboxIconVariants({ size, isVisible: isIndeterminate, isDisabled })}
      >
        <path
          d="M2.91675 7H11.0834"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Checkmark — visible when isSelected and not isIndeterminate */}
      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className={checkboxIconVariants({
          size,
          isVisible: isSelected && !isIndeterminate,
          isDisabled,
        })}
      >
        <path
          d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
CheckboxBase.displayName = "CheckboxBase";

// ── Checkbox (full labeled compound) ─────────────────────────────────────────

export interface CheckboxProps extends PrimitiveCheckboxProps {
  ref?: Ref<HTMLLabelElement>;
  /** Visual size. Applies to box, label, and hint text. Defaults to `"sm"`. */
  size?: "sm" | "md";
  /** Label text rendered beside the checkbox. */
  label?: ReactNode;
  /** Supplementary hint text rendered below the label. */
  hint?: ReactNode;
}

/**
 * Accessible checkbox component built on React Aria.
 * Supports checked, indeterminate, disabled, and invalid states.
 * Accepts an optional label and hint text.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms and conditions" />
 * <Checkbox label="Subscribe" hint="You can unsubscribe anytime." defaultSelected />
 * <Checkbox isIndeterminate label="Select all" />
 * <Checkbox label="Required field" isInvalid />
 * ```
 */
export function Checkbox({
  label,
  hint,
  size = "sm",
  className,
  ...ariaCheckboxProps
}: CheckboxProps): JSX.Element {
  const hasText = (label !== null && label !== undefined) || (hint !== null && hint !== undefined);

  return (
    <PrimitiveCheckbox
      {...ariaCheckboxProps}
      className={(state) =>
        cn(
          checkboxRootVariants({ size, isDisabled: state.isDisabled }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {({ isSelected, isIndeterminate, isDisabled, isFocusVisible, isInvalid }) => (
        <>
          <CheckboxBase
            size={size}
            isSelected={isSelected}
            isIndeterminate={isIndeterminate}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            isInvalid={isInvalid}
            className={hasText ? "mt-0.5" : undefined}
          />
          {hasText && (
            <div className={checkboxTextWrapperVariants({ size })}>
              {label !== undefined && label !== null && (
                <p className={checkboxLabelVariants({ size })}>{label}</p>
              )}
              {hint !== undefined && hint !== null && (
                <span
                  className={checkboxHintVariants({ size })}
                  onClick={(event) => event.stopPropagation()}
                >
                  {hint}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </PrimitiveCheckbox>
  );
}
Checkbox.displayName = "Checkbox";
