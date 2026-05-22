"use client";

import { type JSX, type ReactNode, type Ref } from "react";
import {
  TextArea as PrimitiveTextArea,
  TextField as PrimitiveTextField,
  type TextAreaProps as AriaTextAreaProps,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import {
  textAreaBaseVariants,
  textAreaRootVariants,
  type TextAreaBaseVariantProps,
} from "./textarea.variants";

// ── Resize handle ─────────────────────────────────────────────────────────────
// Rendered as a pointer-events-none overlay so native textarea resize behaviour
// is preserved without inline styles or dark: prefixes.

function ResizeHandle(): JSX.Element {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-0.5 bottom-2">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-icon-quaternary"
      >
        <path d="M7 1L1 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M8 5L5 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ── TextAreaBase ──────────────────────────────────────────────────────────────

export interface TextAreaBaseProps extends AriaTextAreaProps {
  ref?: Ref<HTMLTextAreaElement>;
  size?: TextAreaBaseVariantProps["size"];
}

/**
 * Low-level textarea element. Use `TextArea` (the compound component) in most
 * cases. Use this only when building a custom wrapper with its own layout.
 */
export const TextAreaBase = ({
  className,
  size = "md",
  ...props
}: TextAreaBaseProps): JSX.Element => {
  return (
    <div className="relative w-full">
      <PrimitiveTextArea
        {...props}
        className={(state) =>
          cn(
            textAreaBaseVariants({ size }),

            // Focus ring (non-error)
            state.isFocused && !state.isDisabled && !state.isInvalid && "ring-brand-600 ring-2",

            // Invalid unfocused
            !state.isFocused && state.isInvalid && "ring-error-secondary",

            // Invalid focused
            state.isFocused && !state.isDisabled && state.isInvalid && "ring-error ring-2",

            // Disabled
            state.isDisabled && "bg-disable-subtle cursor-not-allowed opacity-50",

            typeof className === "function" ? className(state) : className
          )
        }
      />
      <ResizeHandle />
    </div>
  );
};

TextAreaBase.displayName = "TextAreaBase";

// ── TextArea (compound) ───────────────────────────────────────────────────────

export interface TextAreaProps extends AriaTextFieldProps {
  /** Label text for the textarea. */
  label?: string;
  /** Helper or error text displayed below the textarea. */
  hint?: ReactNode;
  /** Tooltip message displayed after the label. */
  tooltip?: string;
  /** Textarea size. */
  size?: TextAreaBaseProps["size"];
  /** Class name applied to the `<textarea>` element itself. */
  textAreaClassName?: TextAreaBaseProps["className"];
  /** Ref forwarded to the outer `<div>` (TextField root). */
  ref?: Ref<HTMLDivElement>;
  /** Ref forwarded to the `<textarea>` element. */
  textAreaRef?: TextAreaBaseProps["ref"];
  /** When true, hides the required indicator (*) on the label. */
  hideRequiredIndicator?: boolean;
  /** Placeholder text. */
  placeholder?: string;
  /** Visible height of the textarea in rows. */
  rows?: number;
  /** Visible width of the textarea in columns. */
  cols?: number;
}

/**
 * Accessible textarea with label, hint, and validation support.
 * Built on React Aria's `TextField` + `TextArea` primitives.
 *
 * @example
 * ```tsx
 * <TextArea label="Message" placeholder="Write something…" />
 *
 * // With hint
 * <TextArea label="Bio" hint="Max 280 characters" rows={4} />
 *
 * // With error
 * <TextArea label="Description" isInvalid hint="This field is required." />
 * ```
 */
export const TextArea = ({
  label,
  hint,
  tooltip,
  textAreaRef,
  hideRequiredIndicator,
  textAreaClassName,
  placeholder,
  className,
  rows,
  cols,
  size = "md",
  ...props
}: TextAreaProps): JSX.Element => {
  return (
    <PrimitiveTextField
      {...props}
      className={(state): string =>
        cn(textAreaRootVariants(), typeof className === "function" ? className(state) : className)
      }
    >
      {({ isInvalid, isRequired }) => (
        <>
          {label && (
            <Label
              isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}
              tooltip={tooltip}
            >
              {label}
            </Label>
          )}

          <TextAreaBase
            placeholder={placeholder}
            className={textAreaClassName}
            ref={textAreaRef}
            rows={rows}
            cols={cols}
            size={size}
          />

          {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
        </>
      )}
    </PrimitiveTextField>
  );
};

TextArea.displayName = "TextArea";
