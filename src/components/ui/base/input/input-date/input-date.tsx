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
  DateField as PrimitiveDateField,
  DateInput as PrimitiveDateInput,
  DateSegment as PrimitiveDateSegment,
  Group as PrimitiveGroup,
  type DateFieldProps as PrimitiveDateFieldProps,
  type DateInputProps as PrimitiveDateInputProps,
  type DateValue,
} from "react-aria-components";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { Tooltip, TooltipTrigger } from "@/components/ui/base/tooltip/tooltip";
import { cn } from "@/libs/utils";

import {
  dateFieldVariants,
  dateInputElementVariants,
  dateInputIconVariants,
  dateInputShortcutVariants,
  dateInputTooltipTriggerVariants,
  dateInputWrapperVariants,
  dateSegmentVariants,
} from "./input-date.variants";

// ── Internal icons ────────────────────────────────────────────────────────────

function HelpCircleIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
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

function InfoCircleIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ── DateField context ─────────────────────────────────────────────────────────
// Allows InputDateBase to inherit size + class overrides from an ancestor
// DateField without prop-drilling.

interface DateFieldContextValue {
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  iconClassName?: string;
  tooltipClassName?: string;
  inputClassName?: string;
}

const DateFieldContext = createContext<DateFieldContextValue>({});

// ── InputDateBase ─────────────────────────────────────────────────────────────

export interface InputDateBaseProps extends Omit<PrimitiveDateInputProps, "children"> {
  /** Tooltip message shown on the trailing HelpCircle icon. */
  tooltip?: string;
  /**
   * Input size.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /** Icon component rendered on the leading (left) side. */
  icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
  /** Keyboard shortcut badge displayed at the trailing edge. */
  shortcut?: string | boolean;
  /** Ref forwarded to the Group wrapper `<div>`. */
  groupRef?: Ref<HTMLDivElement>;
  /** Additional CSS class names for the Group wrapper. */
  wrapperClassName?: string;
  /** Additional CSS class names for the leading icon. */
  iconClassName?: string;
  /** Additional CSS class names for the tooltip trigger. */
  tooltipClassName?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

/**
 * Low-level date input wrapper that composes a React Aria `Group` + `DateInput`.
 *
 * Use `InputDate` for the full label + hint + error composition.
 * Use `InputDateBase` directly when embedding the raw date input inside a
 * custom field or compound component.
 *
 * @example
 * ```tsx
 * <DateField>
 *   <InputDateBase size="md" />
 * </DateField>
 * ```
 */
export function InputDateBase({
  tooltip,
  shortcut,
  groupRef,
  size = "md",
  isInvalid,
  isDisabled,
  icon: Icon,
  wrapperClassName,
  tooltipClassName,
  iconClassName,
  className,
  ...inputProps
}: Omit<InputDateBaseProps, "label" | "hint">): React.JSX.Element {
  const context = useContext(DateFieldContext);

  const resolvedSize = context.size ?? size;
  const hasLeadingIcon = Boolean(Icon);
  const hasTrailingIcon = Boolean(tooltip) || Boolean(isInvalid);

  return (
    <PrimitiveGroup
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      ref={groupRef}
      className={({ isFocusWithin, isDisabled: groupDisabled, isInvalid: groupInvalid }) =>
        cn(
          dateInputWrapperVariants(),
          // Invalid ring (unfocused)
          !groupDisabled && groupInvalid && "ring-error-subtle",
          // Focus ring — brand for valid, error for invalid; skipped when disabled
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
            dateInputIconVariants({ size: resolvedSize }),
            cn(context.iconClassName, iconClassName)
          )}
        />
      )}

      {/* Date input — renders individual editable segments */}
      <PrimitiveDateInput
        {...inputProps}
        className={cn(
          dateInputElementVariants({
            size: resolvedSize,
            hasLeadingIcon,
            hasTrailingIcon,
          }),
          typeof className === "string" ? className : undefined
        )}
      >
        {(segment) => (
          <PrimitiveDateSegment
            segment={segment}
            className={cn(
              dateSegmentVariants(),
              // Placeholder segments (e.g. "mm", "dd", "yyyy")
              segment.isPlaceholder && "text-placeholder uppercase",
              // Literal separators (e.g. "/")
              segment.type === "literal" && "text-icon-quaternary"
            )}
          />
        )}
      </PrimitiveDateInput>

      {/* Tooltip trigger — hidden when in invalid state */}
      {tooltip && !isInvalid && (
        <Tooltip title={tooltip} placement="top">
          <TooltipTrigger
            className={cn(
              dateInputTooltipTriggerVariants({ size: resolvedSize }),
              cn(context.tooltipClassName, tooltipClassName)
            )}
            aria-label="More information"
          >
            <HelpCircleIcon />
          </TooltipTrigger>
        </Tooltip>
      )}

      {/* Invalid state indicator — replaces tooltip slot */}
      {isInvalid && (
        <InfoCircleIcon
          className={cn(
            "text-error-primary pointer-events-none absolute size-4 opacity-70",
            "group-data-[focus-within]:opacity-100",
            resolvedSize === "lg" ? "right-3.5" : "right-3"
          )}
        />
      )}

      {/* Keyboard shortcut badge */}
      {shortcut && (
        <div className={cn(dateInputShortcutVariants({ size: resolvedSize }))} aria-hidden="true">
          <span className="text-quaternary ring-primary group-data-[disabled]:text-disable-subtle pointer-events-none rounded px-1 py-px text-xs font-medium ring-1 select-none ring-inset">
            {typeof shortcut === "string" ? shortcut : "⌘K"}
          </span>
        </div>
      )}
    </PrimitiveGroup>
  );
}

InputDateBase.displayName = "InputDateBase";

// ── InputDate ─────────────────────────────────────────────────────────────────

export interface InputDateProps
  extends
    PrimitiveDateFieldProps<DateValue>,
    Pick<
      InputDateBaseProps,
      | "size"
      | "icon"
      | "shortcut"
      | "tooltip"
      | "groupRef"
      | "iconClassName"
      | "wrapperClassName"
      | "tooltipClassName"
    > {
  /** Label text for the field. */
  label?: string;
  /** Helper or error text displayed below the input. */
  hint?: ReactNode;
  /** When `true`, hides the required asterisk from the label. */
  hideRequiredIndicator?: boolean;
  /** Additional CSS class names for the inner `DateInput` element. */
  inputClassName?: string;
}

/**
 * Accessible date field with label, input, and hint/error text.
 * Built on React Aria's `DateField` + `DateInput` + `DateSegment` primitives.
 *
 * @example
 * ```tsx
 * <InputDate label="Start date" hint="mm/dd/yyyy" />
 * <InputDate label="Due date" isInvalid hint="Date is required." />
 * <InputDate label="Event date" size="lg" icon={CalendarIcon} />
 * ```
 */
export function InputDate({
  size = "md",
  icon: Icon,
  label,
  hint,
  shortcut,
  hideRequiredIndicator,
  className,
  groupRef,
  tooltip,
  iconClassName,
  inputClassName,
  wrapperClassName,
  tooltipClassName,
  ...props
}: InputDateProps): React.JSX.Element {
  return (
    <PrimitiveDateField
      {...props}
      className={(state) =>
        cn(dateFieldVariants(), typeof className === "function" ? className(state) : className)
      }
    >
      {({ isInvalid, state }) => (
        <>
          {label && (
            <Label isRequired={hideRequiredIndicator ? false : state.isRequired}>{label}</Label>
          )}

          <InputDateBase
            className={inputClassName}
            groupRef={groupRef}
            size={size}
            icon={Icon}
            shortcut={shortcut}
            tooltip={tooltip}
            iconClassName={iconClassName}
            wrapperClassName={wrapperClassName}
            tooltipClassName={tooltipClassName}
            isInvalid={isInvalid}
          />

          {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
        </>
      )}
    </PrimitiveDateField>
  );
}

InputDate.displayName = "InputDate";
