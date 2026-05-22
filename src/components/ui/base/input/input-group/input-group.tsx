"use client";

import React, { type HTMLAttributes, type ReactNode } from "react";

import { TextField, type InputBaseProps } from "@/components/ui/base/input/base-input";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import {
  inputAddonVariants,
  inputGroupFieldVariants,
  inputPrefixVariants,
  type InputPrefixVariantProps,
} from "./input-group.variants";

// ── InputPrefix ───────────────────────────────────────────────────────────────

export interface InputPrefixProps
  extends HTMLAttributes<HTMLSpanElement>, InputPrefixVariantProps {}

/**
 * Content element for leading / trailing addons inside an `InputGroup`.
 *
 * Render this as the value of `leadingAddon` or `trailingAddon`.  The addon
 * wrapper div (styled by `inputAddonVariants`) handles the visual border,
 * sizing, and positioning; `InputPrefix` provides only the text colour.
 *
 * @example
 * ```tsx
 * <InputGroup leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
 *   <InputBase placeholder="yoursite.com" />
 * </InputGroup>
 * ```
 */
export function InputPrefix({
  isDisabled,
  className,
  children,
  ...props
}: InputPrefixProps): React.JSX.Element {
  return (
    <span {...props} className={cn(inputPrefixVariants({ isDisabled }), className)}>
      {children}
    </span>
  );
}

InputPrefix.displayName = "InputPrefix";

// ── InputGroup ────────────────────────────────────────────────────────────────

export interface InputGroupProps extends Omit<
  InputBaseProps,
  | "type"
  | "icon"
  | "placeholder"
  | "tooltip"
  | "shortcut"
  | "ref"
  | "groupRef"
  | `${string}ClassName`
> {
  /** Label text rendered above the input group. */
  label?: string;
  /** Hint / helper text rendered below the input group. Also used as error message when `isInvalid`. */
  hint?: ReactNode;
  /**
   * When `true`, hides the required `*` indicator even when the field is required.
   * @default false
   */
  hideRequiredIndicator?: boolean;
  /**
   * Short text displayed **inside** the input box before the typing cursor
   * (e.g. `"$"`, `"https://"`).  Rendered adjacent to the left edge of the
   * input area, visually part of the same bordered box.
   */
  prefix?: string;
  /**
   * Leading addon rendered as a separate bordered element attached to the
   * **left** of the input box (e.g. a currency symbol pill or country selector).
   * Use `<InputGroup.Prefix>` for plain text.
   */
  leadingAddon?: ReactNode;
  /**
   * Trailing addon rendered as a separate bordered element attached to the
   * **right** of the input box (e.g. a unit label or icon button).
   * Use `<InputGroup.Prefix>` for plain text.
   */
  trailingAddon?: ReactNode;
  /** Additional CSS class names applied to the root `TextField` wrapper. */
  className?: string;
  /** The input element — usually `<InputBase>`. */
  children?: ReactNode;
}

/**
 * Accessible input group that wraps `InputBase` with optional leading / trailing
 * addons and an inline text prefix.  Handles label, hint/error, and required
 * indicator composition automatically.
 *
 * **Layout:**
 * ```
 * [Leading Addon] | [ prefix  <InputBase> ] | [Trailing Addon]
 *  separate box      inner field box (owns   separate box
 *  (own border)      the visual ring)        (own border)
 * ```
 *
 * Use `InputGroup.Prefix` for text addons.  Pass any element to `leadingAddon`
 * / `trailingAddon` for richer content (dropdowns, icon buttons).
 *
 * @example
 * ```tsx
 * // Leading text addon
 * <InputGroup label="Website" leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
 *   <InputBase placeholder="yoursite.com" />
 * </InputGroup>
 *
 * // Inline prefix + trailing addon
 * <InputGroup
 *   size="lg"
 *   label="Amount"
 *   hint="Enter amount in USD"
 *   prefix="$"
 *   trailingAddon={<InputGroup.Prefix>USD</InputGroup.Prefix>}
 * >
 *   <InputBase placeholder="0.00" type="number" />
 * </InputGroup>
 * ```
 */
function InputGroupBase({
  size = "md",
  label,
  hint,
  hideRequiredIndicator = false,
  prefix,
  leadingAddon,
  trailingAddon,
  isRequired,
  isInvalid,
  isDisabled,
  className,
  children,
  ...props
}: InputGroupProps): React.JSX.Element {
  const hasLeading = Boolean(leadingAddon);
  const hasTrailing = Boolean(trailingAddon);

  return (
    <TextField
      size={size}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      aria-label={label}
      // Suppress InputBase's own visual border so the inner field div is the
      // sole source of ring / shadow / background.
      wrapperClassName={cn(
        "ring-0 shadow-none bg-transparent",
        // Also suppress the data-attr-driven state styles InputBase would apply
        "data-[disabled]:bg-transparent data-[disabled]:ring-0 data-[disabled]:shadow-none",
        "group-data-[disabled]:bg-transparent group-data-[disabled]:ring-0 group-data-[disabled]:shadow-none",
        "data-[invalid]:ring-0",
        "group-data-[invalid]:ring-0"
      )}
      // When a prefix is shown, reduce the input's left padding so the cursor
      // appears immediately after the prefix text.
      inputClassName={cn(prefix ? (size === "lg" ? "pl-1.5" : "pl-1") : undefined)}
      className={className}
      {...props}
    >
      {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

      {/* Outer row: [leading addon][inner field][trailing addon] */}
      <div className="flex w-full flex-row">
        {/* ── Leading addon ── */}
        {leadingAddon && (
          <div className={inputAddonVariants({ position: "leading", size })}>{leadingAddon}</div>
        )}

        {/* ── Inner field — owns the visual border and focus ring ── */}
        <div
          data-input-size={size}
          className={inputGroupFieldVariants({ hasLeading, hasTrailing })}
        >
          {/* Inline prefix — rendered INSIDE the bordered box, before the input */}
          {prefix && (
            <span
              className={cn(
                "text-tertiary shrink-0 text-sm leading-6 select-none",
                size === "md" ? "pl-3" : "pl-3.5",
                "in-data-[disabled]:text-disable"
              )}
            >
              {prefix}
            </span>
          )}

          {children}
        </div>

        {/* ── Trailing addon ── */}
        {trailingAddon && (
          <div className={inputAddonVariants({ position: "trailing", size })}>{trailingAddon}</div>
        )}
      </div>

      {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
    </TextField>
  );
}

InputGroupBase.displayName = "InputGroup";

export const InputGroup = Object.assign(InputGroupBase, {
  Prefix: InputPrefix,
});
