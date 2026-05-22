"use client";

import React, {
  createContext,
  useContext,
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import {
  Group as PrimitiveGroup,
  Input as PrimitiveInput,
  TextField as PrimitiveTextField,
  type GroupProps as PrimitiveGroupProps,
  type InputProps as PrimitiveInputProps,
  type TextFieldProps as PrimitiveTextFieldProps,
} from "react-aria-components";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { Tooltip, TooltipTrigger } from "@/components/ui/base/tooltip/tooltip";
import { cn } from "@/libs/utils";

import {
  inputElementVariants,
  inputIconVariants,
  inputShortcutVariants,
  inputTooltipTriggerVariants,
  inputWrapperVariants,
  textFieldVariants,
} from "./input.variants";

// ── Internal icons ────────────────────────────────────────────────────────────
// Inline SVGs — not locked to any icon library.

function HelpCircleIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function InfoCircleIcon({ className, ...props }: React.SVGProps<SVGSVGElement>): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ── TextField context ─────────────────────────────────────────────────────────
// Allows InputBase to inherit size + class overrides from an ancestor TextField
// without prop-drilling.

interface TextFieldContextValue {
  size?: "md" | "lg";
  wrapperClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const TextFieldContext = createContext<TextFieldContextValue>({});

// ── InputBase ─────────────────────────────────────────────────────────────────

export interface InputBaseProps
  extends
    Omit<PrimitiveTextFieldProps, "children" | "className">,
    Pick<PrimitiveGroupProps, "isDisabled" | "isInvalid"> {
  /** Additional CSS class names forwarded to the underlying `<input>` element via spread. */
  className?: string;
  /**
   * Input size.
   * @default "sm"
   */
  size?: "md" | "lg";
  /** Placeholder text. */
  placeholder?: string;
  /** Icon component rendered on the leading (left) side of the input. */
  icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
  /** Tooltip title shown on hover of the trailing HelpCircle icon. */
  tooltip?: string;
  /** Keyboard shortcut badge displayed at the trailing edge. */
  shortcut?: string | boolean;
  /** Additional CSS class names for the Group wrapper. */
  wrapperClassName?: string;
  /** Additional CSS class names for the inner `<input>` element. */
  inputClassName?: string;
  /** Additional CSS class names for the leading icon. */
  iconClassName?: string;
  /** Additional CSS class names for the tooltip trigger. */
  tooltipClassName?: string;
  /** Ref forwarded to the underlying `<input>` DOM element. */
  ref?: Ref<HTMLInputElement>;
  /** Ref forwarded to the Group wrapper `<div>`. */
  groupRef?: Ref<HTMLDivElement>;
}

/**
 * Low-level input wrapper that composes a React Aria `Group` + `Input`.
 *
 * Use `Input` for the full label + hint + error composition.
 * Use `InputBase` directly when you need to embed the raw input inside a
 * custom field (e.g. inside a `SearchField` or a custom compound).
 *
 * @example
 * ```tsx
 * <TextField>
 *   <InputBase placeholder="Search…" />
 * </TextField>
 * ```
 */
export function InputBase({
  ref,
  groupRef,
  size = "md",
  isInvalid,
  isDisabled,
  icon: Icon,
  placeholder,
  tooltip,
  shortcut,
  wrapperClassName,
  inputClassName,
  iconClassName,
  tooltipClassName,
  // Strip isRequired — it is an invalid HTML attribute on <div> (Group renders a div).
  // Destructure and discard so it never reaches the ...inputProps spread.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isRequired: _isRequired,
  ...inputProps
}: Omit<InputBaseProps, "label" | "hint">): React.JSX.Element {
  const context = useContext(TextFieldContext);

  const resolvedSize = context.size ?? size;
  const hasLeadingIcon = Boolean(Icon);
  const hasTrailingIcon = Boolean(tooltip) || Boolean(isInvalid);

  // Horizontal padding adjustments when icons occupy leading / trailing slots
  const leadingPadding = hasLeadingIcon ? (resolvedSize === "md" ? "pl-10" : "pl-10.5") : undefined;
  const trailingPadding = hasTrailingIcon ? (resolvedSize === "md" ? "pr-9" : "pr-9.5") : undefined;

  return (
    <PrimitiveGroup
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      ref={groupRef}
      className={({ isFocusWithin, isDisabled: groupDisabled, isInvalid: groupInvalid }) =>
        cn(
          inputWrapperVariants(),
          // Invalid ring (unfocused) — plain class so tailwind-merge can override it on focus
          !groupDisabled && groupInvalid && "ring-error-secondary",
          // Focus ring — brand for valid, error-primary for invalid; skipped when disabled
          isFocusWithin &&
            !groupDisabled &&
            (groupInvalid ? "ring-error ring-2" : "ring-brand-600 ring-2"),
          cn(context.wrapperClassName, wrapperClassName)
        )
      }
    >
      {/* Leading icon */}
      {Icon && (
        <Icon
          className={cn(
            inputIconVariants({ placement: "leading", size: resolvedSize }),
            cn(context.iconClassName, iconClassName)
          )}
        />
      )}

      {/* Input element */}
      <PrimitiveInput
        {...(inputProps as PrimitiveInputProps)}
        ref={ref}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(
          inputElementVariants({
            size: resolvedSize,
            isPassword: (inputProps as { type?: string }).type === "password",
          }),
          leadingPadding,
          trailingPadding,
          cn(context.inputClassName, inputClassName)
        )}
      />

      {/* Tooltip trigger — hidden when in invalid state */}
      {tooltip && !isInvalid && (
        <Tooltip title={tooltip} placement="top">
          <TooltipTrigger
            className={cn(
              inputTooltipTriggerVariants({ size: resolvedSize }),
              cn(context.tooltipClassName, tooltipClassName)
            )}
            aria-label="More information"
          >
            <HelpCircleIcon />
          </TooltipTrigger>
        </Tooltip>
      )}

      {/* Invalid state indicator icon — replaces tooltip slot */}
      {/* Color matches the ring: opacity-70 at rest (secondary weight), full on focus-within (primary weight) */}
      {isInvalid && (
        <InfoCircleIcon
          aria-hidden="true"
          className={cn(
            "text-icon-alert-error-secondary pointer-events-none absolute size-4 opacity-70",
            "group-data-[focus-within]:opacity-100",
            resolvedSize === "md" ? "right-3" : "right-3.5"
          )}
        />
      )}

      {/* Keyboard shortcut badge */}
      {shortcut && (
        <div className={cn(inputShortcutVariants({ size: resolvedSize }))} aria-hidden="true">
          <span className="text-quaternary ring-primary group-data-[disabled]:text-disable-subtle pointer-events-none rounded px-1 py-px text-xs font-medium ring-1 select-none ring-inset">
            {typeof shortcut === "string" ? shortcut : "⌘K"}
          </span>
        </div>
      )}
    </PrimitiveGroup>
  );
}

InputBase.displayName = "InputBase";

// ── TextField ─────────────────────────────────────────────────────────────────

export interface TextFieldProps
  extends Omit<PrimitiveTextFieldProps, "children" | "className">, TextFieldContextValue {
  children?: ReactNode;
  /** Additional CSS class names for the root Field wrapper. */
  className?: string;
  /** Ref forwarded to the underlying `<div>` wrapper. */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Accessible text field wrapper built on React Aria's `TextField`.
 *
 * Provides the React Aria field context (label association, validation state,
 * required state) to all child components (`Label`, `InputBase`, `HintText`).
 *
 * @example
 * ```tsx
 * <TextField isRequired isInvalid>
 *   <Label>Email</Label>
 *   <InputBase placeholder="you@example.com" />
 *   <HintText isInvalid>Enter a valid email.</HintText>
 * </TextField>
 * ```
 */
export function TextField({
  className,
  size,
  wrapperClassName,
  inputClassName,
  iconClassName,
  tooltipClassName,
  children,
  ...props
}: TextFieldProps): React.JSX.Element {
  return (
    <TextFieldContext.Provider
      value={{ size, wrapperClassName, inputClassName, iconClassName, tooltipClassName }}
    >
      <PrimitiveTextField
        {...props}
        data-input-wrapper
        className={cn(textFieldVariants(), className)}
      >
        {children}
      </PrimitiveTextField>
    </TextFieldContext.Provider>
  );
}

TextField.displayName = "TextField";

// ── Input (full composition) ──────────────────────────────────────────────────

export interface InputProps extends InputBaseProps {
  /** Label text rendered above the input. */
  label?: string;
  /** Hint / helper text rendered below the input. Also used as error message when invalid. */
  hint?: ReactNode;
  /**
   * When `true`, the required `*` indicator is always hidden even if the field
   * is required.
   */
  hideRequiredIndicator?: boolean;
}

/**
 * Full-composition input: `Label` + `InputBase` + `HintText`.
 *
 * Handles the most common single-line text input pattern in one component.
 * For custom layouts, compose `TextField` + `Label` + `InputBase` + `HintText`
 * directly.
 *
 * @example
 * ```tsx
 * // Minimal
 * <Input label="Email" placeholder="you@example.com" />
 *
 * // Required with validation
 * <Input
 *   label="Password"
 *   placeholder="••••••••"
 *   isRequired
 *   isInvalid={hasError}
 *   hint={hasError ? "Password is required." : "At least 8 characters."}
 * />
 *
 * // With leading icon, tooltip, and shortcut
 * <Input
 *   label="Search"
 *   placeholder="Find anything…"
 *   icon={SearchIcon}
 *   tooltip="Use quotes for exact match."
 *   shortcut="⌘K"
 * />
 * ```
 */
export function Input({
  size = "md",
  placeholder,
  icon,
  label,
  hint,
  shortcut,
  hideRequiredIndicator,
  className,
  ref,
  groupRef,
  tooltip,
  iconClassName,
  inputClassName,
  wrapperClassName,
  tooltipClassName,
  isRequired,
  isInvalid,
  isDisabled,
  ...props
}: InputProps): React.JSX.Element {
  return (
    <TextField
      aria-label={!label ? placeholder : undefined}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      size={size}
      wrapperClassName={wrapperClassName}
      inputClassName={inputClassName}
      iconClassName={iconClassName}
      tooltipClassName={tooltipClassName}
      className={className}
      {...props}
    >
      {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

      <InputBase
        ref={ref}
        groupRef={groupRef}
        size={size}
        placeholder={placeholder}
        icon={icon}
        shortcut={shortcut}
        tooltip={tooltip}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      />

      {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
    </TextField>
  );
}

Input.displayName = "Input";
