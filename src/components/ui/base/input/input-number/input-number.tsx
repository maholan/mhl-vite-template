"use client";

import { type JSX, type ReactNode, type Ref } from "react";
import {
  Button as PrimitiveButton,
  Group as PrimitiveGroup,
  Input as PrimitiveInput,
  NumberField as PrimitiveNumberField,
  type NumberFieldProps as PrimitiveNumberFieldProps,
} from "react-aria-components";

import { ChevronDown, ChevronUp, Minus, Plus } from "@/components/ui/assets";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import {
  inputNumberInputVariants,
  inputNumberSizes,
  inputNumberStepperButtonVariants,
  inputNumberWrapperVariants,
  type InputNumberSize,
  type InputNumberWrapperVariantProps,
} from "./input-number.variants";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface InputNumberBaseProps extends PrimitiveNumberFieldProps {
  /**
   * Input size.
   * @default "md"
   */
  size?: InputNumberSize;
  /** Placeholder text. */
  placeholder?: string;
  /** Additional CSS class names for the inner `<input>` element. */
  inputClassName?: string;
  /** Additional CSS class names for the Group wrapper. */
  wrapperClassName?: string;
  /**
   * Button layout for the stepper controls.
   * - `"vertical"` — stacked ▲ / ▼ chevrons on the trailing edge (default)
   * - `"horizontal"` — − button on the leading edge, + button on the trailing edge
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
  /** Ref forwarded to the underlying `<input>` DOM element. */
  ref?: Ref<HTMLInputElement>;
  /** Ref forwarded to the Group wrapper `<div>`. */
  groupRef?: Ref<HTMLDivElement>;
}

export interface InputNumberProps
  extends Omit<InputNumberBaseProps, "label" | "hint">, InputNumberWrapperVariantProps {
  /** Label text displayed above the input. */
  label?: string;
  /** Helper / error text displayed below the input. */
  hint?: ReactNode;
  /** When `true`, suppresses the required indicator on the label. */
  hideRequiredIndicator?: boolean;
}

// ── Sub-component ──────────────────────────────────────────────────────────────

/**
 * Low-level number input wrapper composing a React Aria `Group` + `NumberField`.
 *
 * Use `InputNumber` for the full label + hint composition.
 * Use `InputNumberBase` directly when embedding inside a custom field.
 */
export function InputNumberBase({
  ref,
  groupRef,
  size = "md",
  isInvalid,
  isDisabled,
  placeholder,
  wrapperClassName,
  inputClassName,
  orientation = "vertical",
}: Omit<InputNumberBaseProps, "label" | "hint">): JSX.Element {
  const cfg = inputNumberSizes[size];

  return (
    <PrimitiveGroup
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      ref={groupRef}
      className={({ isFocusWithin, isDisabled: groupDisabled, isInvalid: groupInvalid }) =>
        cn(
          inputNumberWrapperVariants(),
          !groupDisabled && groupInvalid && "ring-error-secondary",
          isFocusWithin &&
            !groupDisabled &&
            (groupInvalid ? "ring-error ring-2" : "ring-brand ring-2"),
          wrapperClassName
        )
      }
    >
      {orientation === "horizontal" && (
        <PrimitiveButton
          slot="decrement"
          className={cn(
            inputNumberStepperButtonVariants(),
            "border-primary rounded-l-lg border-r px-3"
          )}
        >
          <Minus className="size-4" />
        </PrimitiveButton>
      )}

      {/* PrimitiveInput inside PrimitiveNumberField receives value/formatting via React Aria context */}
      <PrimitiveInput
        ref={ref}
        disabled={isDisabled}
        placeholder={placeholder}
        className={cn(inputNumberInputVariants(), cfg.input, inputClassName)}
      />

      {orientation === "horizontal" && (
        <PrimitiveButton
          slot="increment"
          className={cn(
            inputNumberStepperButtonVariants(),
            "border-primary rounded-r-lg border-l px-3"
          )}
        >
          <Plus className="size-4" />
        </PrimitiveButton>
      )}

      {orientation === "vertical" && (
        <div className={cn("border-primary flex shrink-0 flex-col border-l", cfg.stepper)}>
          <PrimitiveButton
            slot="increment"
            className={cn(inputNumberStepperButtonVariants(), "rounded-tr-lg")}
          >
            <ChevronUp className={cfg.chevron} />
          </PrimitiveButton>
          <PrimitiveButton
            slot="decrement"
            className={cn(
              inputNumberStepperButtonVariants(),
              "border-primary rounded-br-lg border-t"
            )}
          >
            <ChevronDown className={cfg.chevron} />
          </PrimitiveButton>
        </div>
      )}
    </PrimitiveGroup>
  );
}

// ── Composed component ─────────────────────────────────────────────────────────

/**
 * Accessible number input with optional label, hint, and stepper controls.
 *
 * Built on React Aria `NumberField` — supports keyboard increment/decrement,
 * min/max/step constraints, and full screen-reader support.
 *
 * Two stepper orientations:
 * - `"vertical"` (default) — stacked ▲/▼ chevrons on the right edge
 * - `"horizontal"` — − / + buttons flanking the input
 *
 * @example
 * ```tsx
 * // Default (vertical steppers)
 * <InputNumber label="Quantity" placeholder="0" minValue={0} maxValue={99} />
 *
 * // Horizontal steppers
 * <InputNumber label="Amount" orientation="horizontal" step={5} />
 * ```
 */
export function InputNumber({
  size = "md",
  placeholder,
  label,
  hint,
  hideRequiredIndicator,
  className,
  ref,
  groupRef,
  inputClassName,
  wrapperClassName,
  orientation = "vertical",
  ...props
}: InputNumberProps): JSX.Element {
  return (
    <PrimitiveNumberField
      {...props}
      className={(state) =>
        cn(
          "flex h-max w-full flex-col items-start gap-1.5",
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {({ isInvalid, isRequired }) => (
        <>
          {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

          <InputNumberBase
            ref={ref}
            groupRef={groupRef}
            size={size}
            placeholder={placeholder}
            inputClassName={inputClassName}
            wrapperClassName={wrapperClassName}
            orientation={orientation}
          />

          {hint && (
            <HintText isInvalid={isInvalid} className={cn(size === "sm" && "text-xs")}>
              {hint}
            </HintText>
          )}
        </>
      )}
    </PrimitiveNumberField>
  );
}

InputNumberBase.displayName = "InputNumberBase";
InputNumber.displayName = "InputNumber";
