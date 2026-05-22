"use client";

import React, {
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
} from "react";
import {
  Button as PrimitiveButton,
  Group as PrimitiveGroup,
  Input as PrimitiveInput,
  TextField as PrimitiveTextField,
  type GroupProps as PrimitiveGroupProps,
  type TextFieldProps as PrimitiveTextFieldProps,
} from "react-aria-components";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import { inputPasswordToggleVariants } from "./input-password.variants";
import {
  inputElementVariants,
  inputIconVariants,
  inputWrapperVariants,
  textFieldVariants,
} from "../base-input/input.variants";

// ── Internal icons ─────────────────────────────────────────────────────────────
// 20 × 20 px inline SVGs — library-agnostic, no external dependency.

function EyeIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

export interface InputPasswordProps
  extends
    Omit<PrimitiveTextFieldProps, "children" | "className">,
    Pick<PrimitiveGroupProps, "isDisabled" | "isInvalid"> {
  /** Label text rendered above the input. */
  label?: string;
  /** Hint / helper text rendered below the input. Also used as error message when `isInvalid`. */
  hint?: ReactNode;
  /**
   * When `true`, suppresses the required `*` indicator even if the field is required.
   */
  hideRequiredIndicator?: boolean;
  /**
   * Input size.
   * @default "md"
   */
  size?: "md" | "lg";
  /** Placeholder text for the underlying `<input>`. */
  placeholder?: string;
  /** Optional leading icon component (20 × 20 px). Accepts any React component — not locked to one icon library. */
  icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
  /**
   * Initial visibility state for the **uncontrolled** pattern.
   * When `isVisible` is provided, this prop is ignored.
   * @default false
   */
  defaultIsVisible?: boolean;
  /**
   * Controls whether the password is visible (controlled pattern).
   * Pair with `onVisibilityChange` to handle updates.
   */
  isVisible?: boolean;
  /** Called when the user presses the visibility toggle. Receives the next visibility state. */
  onVisibilityChange?: (isVisible: boolean) => void;
  /** Additional CSS class names for the `TextField` root wrapper. */
  className?: string;
  /** Additional CSS class names for the `Group` input wrapper. */
  wrapperClassName?: string;
  /** Additional CSS class names for the inner `<input>` element. */
  inputClassName?: string;
  /** Additional CSS class names for the leading icon. */
  iconClassName?: string;
  /** Additional CSS class names for the visibility toggle button. */
  toggleClassName?: string;
  /** Ref forwarded to the underlying `<input>` DOM element. */
  ref?: Ref<HTMLInputElement>;
  /** Ref forwarded to the `Group` wrapper `<div>`. */
  groupRef?: Ref<HTMLDivElement>;
}

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * Accessible password input with a visibility toggle built on React Aria.
 *
 * Supports both uncontrolled (`defaultIsVisible`) and controlled (`isVisible` +
 * `onVisibilityChange`) visibility patterns. When visible, `tracking-widest`
 * letter-spacing is automatically removed so text reads naturally.
 *
 * The toggle button is keyboard-accessible (Space / Enter) and its `aria-label`
 * updates to reflect the action that will occur on the next press
 * ("Show password" / "Hide password").
 *
 * @example
 * ```tsx
 * // Uncontrolled — simplest use
 * <InputPassword label="Password" placeholder="Min 8 characters" isRequired />
 *
 * // With validation
 * <InputPassword
 *   label="Password"
 *   isRequired
 *   isInvalid={hasError}
 *   hint={hasError ? "Incorrect password." : "Min 8 characters."}
 * />
 *
 * // Controlled visibility
 * const [visible, setVisible] = useState(false);
 * <InputPassword
 *   label="Password"
 *   isVisible={visible}
 *   onVisibilityChange={setVisible}
 * />
 *
 * // With leading icon
 * <InputPassword label="Password" icon={KeyIcon} size="lg" />
 * ```
 */
export function InputPassword({
  ref,
  groupRef,
  size = "md",
  icon: Icon,
  label,
  hint,
  hideRequiredIndicator,
  placeholder,
  defaultIsVisible = false,
  isVisible: isVisibleProp,
  onVisibilityChange,
  className,
  wrapperClassName,
  inputClassName,
  iconClassName,
  toggleClassName,
  isRequired,
  isInvalid,
  isDisabled,
  ...props
}: InputPasswordProps): React.JSX.Element {
  // ── Visibility state (uncontrolled / controlled) ───────────────────────────
  const [internalVisible, setInternalVisible] = useState(defaultIsVisible);
  const isControlled = isVisibleProp !== undefined;
  const isVisible = isControlled ? isVisibleProp : internalVisible;

  const handleToggle = (): void => {
    const next = !isVisible;
    if (!isControlled) setInternalVisible(next);
    onVisibilityChange?.(next);
  };

  const hasLeadingIcon = Boolean(Icon);

  return (
    <PrimitiveTextField
      {...props}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      // Suppress native "password" autoComplete to avoid conflicting with
      // the custom toggle; consumers should pass autoComplete explicitly.
      data-input-wrapper
      className={cn(textFieldVariants(), className)}
    >
      {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

      <PrimitiveGroup
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        ref={groupRef}
        className={({ isFocusWithin, isDisabled: groupDisabled, isInvalid: groupInvalid }) =>
          cn(
            inputWrapperVariants(),
            // Invalid ring (unfocused)
            !groupDisabled && groupInvalid && "ring-error-secondary",
            // Focus ring — brand for valid, error-primary for invalid
            isFocusWithin &&
              !groupDisabled &&
              (groupInvalid ? "ring-error ring-2" : "ring-brand-600 ring-2"),
            wrapperClassName
          )
        }
      >
        {/* Leading icon */}
        {Icon && (
          <Icon className={cn(inputIconVariants({ placement: "leading", size }), iconClassName)} />
        )}

        {/* Password / text input */}
        <PrimitiveInput
          ref={ref}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className={cn(
            inputElementVariants({ size, isPassword: !isVisible }),
            // Leading icon offset
            hasLeadingIcon && (size === "md" ? "pl-10" : "pl-10.5"),
            // Trailing toggle always occupies the trailing slot
            size === "md" ? "pr-9" : "pr-9.5",
            inputClassName
          )}
        />

        {/* Visibility toggle button */}
        <PrimitiveButton
          type="button"
          isDisabled={isDisabled}
          onPress={handleToggle}
          // aria-label describes the action that will occur on press (WCAG 2.1 §4.1.2)
          aria-label={isVisible ? "Hide password" : "Show password"}
          className={({ isFocusVisible }) =>
            cn(
              inputPasswordToggleVariants({ size }),
              isFocusVisible && "ring-brand-600 rounded-sm ring-2 ring-offset-1",
              toggleClassName
            )
          }
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </PrimitiveButton>
      </PrimitiveGroup>

      {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
    </PrimitiveTextField>
  );
}

InputPassword.displayName = "InputPassword";
