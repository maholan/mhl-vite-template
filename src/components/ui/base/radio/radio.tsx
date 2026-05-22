"use client";

import { createContext, type JSX, type ReactNode, type Ref, useContext } from "react";
import {
  Radio as PrimitiveRadio,
  RadioGroup as PrimitiveRadioGroup,
  type RadioGroupProps as PrimitiveRadioGroupProps,
  type RadioProps as PrimitiveRadioProps,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import {
  radioDotVariants,
  radioGroupVariants,
  radioHintVariants,
  radioIndicatorVariants,
  radioLabelVariants,
  radioRootVariants,
  radioTextWrapperVariants,
  type RadioGroupVariantProps,
} from "./radio.variants";

// ── Internal context ──────────────────────────────────────────────────────────
// Passes `size` from RadioGroup down to each RadioButton without prop-drilling.
// Not exported — consumers should not read this context directly.

interface RadioGroupContextValue {
  size: "sm" | "md";
}

const RadioGroupContext = createContext<RadioGroupContextValue>({ size: "sm" });

// ── RadioButtonBase (purely presentational) ───────────────────────────────────
// Renders the outer circle + inner dot via explicit state props.
// No React Aria wrapping — usable in custom compositions.

export interface RadioButtonBaseProps {
  /** Visual size. Defaults to `"sm"`. */
  size?: "sm" | "md";
  className?: string;
  /** Whether the keyboard focus ring is visible. */
  isFocusVisible?: boolean;
  /** Whether this radio option is selected. */
  isSelected?: boolean;
  /** Whether this radio option is non-interactive. */
  isDisabled?: boolean;
  /** Whether the parent group is in an error/invalid state (standalone use). */
  isInvalid?: boolean;
}

/**
 * Purely presentational radio indicator.
 * Renders the outer circle and inner dot via explicit state props.
 *
 * @example
 * ```tsx
 * <RadioButtonBase isSelected />
 * <RadioButtonBase isInvalid />
 * <RadioButtonBase size="md" isDisabled />
 * ```
 */
export function RadioButtonBase({
  className,
  isSelected = false,
  isDisabled = false,
  isInvalid = false,
  isFocusVisible = false,
  size = "sm",
}: RadioButtonBaseProps): JSX.Element {
  return (
    <div
      className={cn(
        radioIndicatorVariants({ size, isSelected, isDisabled, isInvalid }),
        // Focus ring applied here (not in CVA) to avoid ring-inset / ring-offset conflict.
        isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
        className
      )}
    >
      <div className={radioDotVariants({ size, isSelected, isDisabled })} />
    </div>
  );
}
RadioButtonBase.displayName = "RadioButtonBase";

// ── RadioButton (full labeled compound) ───────────────────────────────────────

export interface RadioButtonProps extends PrimitiveRadioProps {
  ref?: Ref<HTMLLabelElement>;
  /**
   * Visual size. Inherits from parent `RadioGroup` when used inside one.
   * Defaults to `"sm"`.
   */
  size?: "sm" | "md";
  /** Label text rendered beside the radio indicator. */
  label?: ReactNode;
  /** Supplementary hint text rendered below the label. */
  hint?: ReactNode;
}

/**
 * Accessible radio button built on React Aria.
 * Must be used inside a `RadioGroup`. Supports disabled and invalid states.
 * Inherits `size` from its parent `RadioGroup`.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Plan">
 *   <RadioButton value="free" label="Free" hint="Up to 3 projects." />
 *   <RadioButton value="pro" label="Pro" hint="Unlimited projects." />
 * </RadioGroup>
 * ```
 */
export function RadioButton({
  label,
  hint,
  size: sizeProp = "sm",
  className,
  ...ariaRadioProps
}: RadioButtonProps): JSX.Element {
  // Inherit size from RadioGroup context; prop overrides the context when set explicitly.
  const { size: contextSize } = useContext(RadioGroupContext);
  const size = sizeProp !== "sm" ? sizeProp : contextSize;

  const hasText = (label !== undefined && label !== null) || (hint !== undefined && hint !== null);

  return (
    <PrimitiveRadio
      {...ariaRadioProps}
      className={(state) =>
        cn(
          radioRootVariants({ size, isDisabled: state.isDisabled }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {({ isSelected, isDisabled, isFocusVisible }) => (
        <>
          <RadioButtonBase
            size={size}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            className={hasText ? "mt-0.5" : undefined}
          />
          {hasText && (
            <div className={radioTextWrapperVariants({ size })}>
              {label !== undefined && label !== null && (
                <p className={radioLabelVariants({ size })}>{label}</p>
              )}
              {hint !== undefined && hint !== null && (
                <span
                  className={radioHintVariants({ size })}
                  onClick={(event) => event.stopPropagation()}
                >
                  {hint}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </PrimitiveRadio>
  );
}
RadioButton.displayName = "RadioButton";

// ── RadioGroup ────────────────────────────────────────────────────────────────

export interface RadioGroupProps
  extends Omit<PrimitiveRadioGroupProps, "orientation">, RadioGroupVariantProps {
  children?: ReactNode;
  /** Visual size passed to all child RadioButtons. Defaults to `"sm"`. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Accessible radio group built on React Aria.
 * Wraps a set of `RadioButton` items and provides keyboard navigation,
 * group labelling, and invalid/disabled state propagation via data attributes.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Subscription plan" defaultValue="free">
 *   <RadioButton value="free" label="Free" hint="Up to 3 projects." />
 *   <RadioButton value="pro" label="Pro" hint="Unlimited projects." />
 *   <RadioButton value="enterprise" label="Enterprise" isDisabled />
 * </RadioGroup>
 *
 * // Horizontal layout
 * <RadioGroup label="Gender" orientation="horizontal">
 *   <RadioButton value="male" label="Male" />
 *   <RadioButton value="female" label="Female" />
 * </RadioGroup>
 * ```
 */
export function RadioGroup({
  children,
  className,
  size = "sm",
  orientation = "vertical",
  ...ariaRadioGroupProps
}: RadioGroupProps): JSX.Element {
  return (
    <RadioGroupContext.Provider value={{ size }}>
      <PrimitiveRadioGroup
        {...ariaRadioGroupProps}
        orientation={orientation ?? "vertical"}
        className={cn(radioGroupVariants({ orientation }), className)}
      >
        {children}
      </PrimitiveRadioGroup>
    </RadioGroupContext.Provider>
  );
}
RadioGroup.displayName = "RadioGroup";
