"use client";

import React, { type ReactNode, type Ref } from "react";
import { type TextProps, Text } from "react-aria-components";

import { cn } from "@/libs/utils";

import { hintTextVariants, type HintTextVariantProps } from "./hint-text.variants";

// ── Props ─────────────────────────────────────────────────────────────────────

export interface HintTextProps extends Omit<TextProps, "slot">, HintTextVariantProps {
  /**
   * Marks this text as an error message.
   *
   * When `true`:
   * - Sets `slot="errorMessage"` so React Aria automatically shows this text
   *   only when the parent field is in an invalid state and hides it otherwise.
   * - Applies `text-error-primary` color.
   *
   * When `false` (default):
   * - Sets `slot="description"` — always visible below the field.
   * - Applies `text-tertiary` color; tints to `text-error-primary` when
   *   the parent Field becomes invalid via `group-data-[invalid]:`.
   */
  isInvalid?: boolean;
  /**
   * Override the rendered HTML element.
   * Accepts native HTML tag strings only (React Aria constraint).
   * Defaults to `"p"` (React Aria `Text` default).
   * @example elementType="span"
   */
  elementType?: string;
  /** Ref forwarded to the underlying DOM element. */
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Accessible hint / helper text for form fields, built on React Aria's `Text`.
 *
 * Renders as `slot="description"` (always visible) by default, or
 * `slot="errorMessage"` (visible only when the parent field is invalid)
 * when `isInvalid` is set.
 *
 * Automatically dims when the parent Field is disabled and turns red when it
 * is invalid — no extra wiring required when used inside a React Aria Field.
 *
 * @example
 * ```tsx
 * // Description — always visible
 * <HintText>Use at least 8 characters.</HintText>
 *
 * // Error message — shown only when the parent TextField is invalid
 * <HintText isInvalid>Password is required.</HintText>
 *
 * // Consumer className override (still token-consistent)
 * <HintText className="mt-1">Enter your work email.</HintText>
 * ```
 */
export function HintText({
  isInvalid = false,
  elementType,
  className,
  children,
  ...props
}: HintTextProps): React.JSX.Element {
  return (
    <Text
      elementType={elementType}
      {...props}
      slot={isInvalid ? "errorMessage" : "description"}
      className={cn(hintTextVariants({ isInvalid }), className)}
    >
      {children}
    </Text>
  );
}

HintText.displayName = "HintText";
