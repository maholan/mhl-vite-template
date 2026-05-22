"use client";

import React, { type ComponentType, type HTMLAttributes, type ReactNode, useState } from "react";

import {
  AmexIcon,
  DiscoverIcon,
  GenericCardIcon,
  MastercardIcon,
  UnionPayIcon,
  VisaIcon,
} from "@/components/ui/assets/payment-icons";
import { InputBase, TextField } from "@/components/ui/base/input/base-input";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import { paymentIconVariants } from "./input-payment.variants";

// ── Card detection ─────────────────────────────────────────────────────────────

interface CardType {
  name: string;
  /** Regex tested against the cleaned numeric string (no spaces). */
  pattern: RegExp;
  icon: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
}

const CARD_TYPES: readonly CardType[] = [
  {
    name: "Visa",
    // Starts with 4, at least 6 digits so partial typing still matches at prefix
    pattern: /^4[0-9]{5,}$/,
    icon: VisaIcon,
  },
  {
    name: "Mastercard",
    // Starts with 51–55 or 2221–2720
    pattern: /^(5[1-5][0-9]{4,}|2(2[2-9][1-9]|[3-6][0-9]{3}|7[01][0-9]|720)[0-9]{2,})$/,
    icon: MastercardIcon,
  },
  {
    name: "American Express",
    // Starts with 34 or 37, at least 6 digits
    pattern: /^3[47][0-9]{4,}$/,
    icon: AmexIcon,
  },
  {
    name: "Discover",
    // Starts with 6011, 622126–622925, 644–649, or 65
    pattern:
      /^6(?:011|5[0-9]{2}|4[4-9][0-9]|22(?:1(?:2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9(?:[01][0-9]|2[0-5])))[0-9]{5,}$/,
    icon: DiscoverIcon,
  },
  {
    name: "UnionPay",
    // Starts with 62 or 88, at least 11 digits
    pattern: /^(62|88)[0-9]{9,}$/,
    icon: UnionPayIcon,
  },
];

/**
 * Detect the card brand from a cleaned numeric string.
 * Returns `null` when the prefix does not match any known brand yet.
 */
function detectCardType(numeric: string): CardType | null {
  if (numeric.length < 6) return null;
  return CARD_TYPES.find((ct) => ct.pattern.test(numeric)) ?? null;
}

// ── Number formatting ──────────────────────────────────────────────────────────

/**
 * Format a cleaned numeric card number into display groups separated by spaces.
 * - American Express: 4-6-5 (e.g. "3782 822463 10005")
 * - All others: 4-4-4-4 (e.g. "4111 1111 1111 1111")
 */
export function formatCardNumber(numeric: string): string {
  const cleaned = numeric.replace(/\D/g, "");

  // Amex — 4-6-5 grouping
  if (/^3[47]/.test(cleaned)) {
    const parts = [cleaned.slice(0, 4), cleaned.slice(4, 10), cleaned.slice(10, 15)].filter(
      Boolean
    );
    return parts.join(" ");
  }

  // Default — groups of 4
  const match = cleaned.match(/\d{1,4}/g);
  return match ? match.join(" ") : cleaned;
}

// ── Props ──────────────────────────────────────────────────────────────────────

export interface PaymentInputProps {
  /**
   * Controlled card number value.  Supply digits only (no spaces) — the
   * component formats the display automatically.
   */
  value?: string;
  /**
   * Default card number for uncontrolled usage.  Supply digits only.
   */
  defaultValue?: string;
  /**
   * Callback fired on every keystroke with the **cleaned numeric** value
   * (spaces stripped).  Never contains non-digit characters.
   */
  onChange?: (value: string) => void;
  /**
   * Maximum formatted string length (including spaces).
   * @default 19  (16-digit card + 3 spaces)
   */
  maxLength?: number;
  /** Input size. @default "md" */
  size?: "md" | "lg";
  /** Accessible placeholder text shown inside the input. */
  placeholder?: string;
  /** Label text rendered above the input. */
  label?: string;
  /** Hint / helper text rendered below the input. Used as error text when `isInvalid`. */
  hint?: ReactNode;
  /**
   * When `true`, the required `*` indicator is hidden even when the field is required.
   * @default false
   */
  hideRequiredIndicator?: boolean;
  /** Marks the field as required (adds ARIA attribute + `*` indicator). */
  isRequired?: boolean;
  /** Marks the field as invalid — applies error styling and reads `hint` as the error message. */
  isInvalid?: boolean;
  /** Disables all interaction. */
  isDisabled?: boolean;
  /** Additional CSS class names applied to the root `TextField` wrapper. */
  className?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * Accessible payment card number input that auto-detects the card brand and
 * shows the matching icon inside the field.  Handles formatting (groups of 4,
 * Amex 4-6-5), controlled / uncontrolled state, and full label + hint
 * composition.
 *
 * The `onChange` callback always receives the **raw numeric** value (no spaces)
 * so consumers can validate or store it directly.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <PaymentInput label="Card number" placeholder="1234 5678 9012 3456" />
 *
 * // Controlled with validation
 * <PaymentInput
 *   label="Card number"
 *   value={cardNumber}
 *   onChange={setCardNumber}
 *   isInvalid={!!error}
 *   hint={error ?? "Enter your 16-digit card number."}
 * />
 * ```
 */
export function PaymentInput({
  value,
  defaultValue,
  onChange,
  maxLength = 19,
  size = "md",
  placeholder = "1234 5678 9012 3456",
  label,
  hint,
  hideRequiredIndicator = false,
  isRequired,
  isInvalid,
  isDisabled,
  className,
}: PaymentInputProps): React.JSX.Element {
  // ── Controlled / uncontrolled state ──────────────────────────────────────
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    (defaultValue ?? "").replace(/\D/g, "")
  );

  // Single source of truth for the raw numeric card number
  const numericValue = isControlled ? (value ?? "").replace(/\D/g, "") : internalValue;

  const handleChange = (formatted: string): void => {
    const numeric = formatted.replace(/\D/g, "");
    if (!isControlled) setInternalValue(numeric);
    onChange?.(numeric);
  };

  // ── Card detection ────────────────────────────────────────────────────────
  const detectedCard = detectCardType(numericValue);
  const CardIcon = detectedCard?.icon ?? GenericCardIcon;

  // ── Icon slot sizing (from variants) ─────────────────────────────────────
  const iconSizeClass = paymentIconVariants({ size });

  // ── Extra leading padding to clear the wide card icon ────────────────────
  const inputPaddingClass = size === "lg" ? "pl-14" : "pl-13";

  return (
    <TextField
      value={formatCardNumber(numericValue)}
      onChange={handleChange}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      inputMode="numeric"
      maxLength={maxLength}
      aria-label={label}
      className={cn(className)}
    >
      {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

      <InputBase
        size={size}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        placeholder={placeholder}
        icon={CardIcon}
        iconClassName={cn("left-2.5", iconSizeClass)}
        inputClassName={inputPaddingClass}
      />

      {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
    </TextField>
  );
}

PaymentInput.displayName = "PaymentInput";
