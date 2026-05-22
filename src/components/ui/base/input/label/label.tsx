"use client";

import React, { type ReactNode, type Ref } from "react";
import {
  Label as PrimitiveLabel,
  type LabelProps as PrimitiveLabelProps,
} from "react-aria-components";

import { Tooltip, TooltipTrigger } from "@/components/ui/base/tooltip/tooltip";
import { cn } from "@/libs/utils";

import { labelVariants, type LabelVariantProps } from "./label.variants";

// ── Internal icon ─────────────────────────────────────────────────────────────
// Inline HelpCircle SVG — not locked to any icon library.
// Only used internally for the tooltip trigger indicator.
//
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

// ── Props ─────────────────────────────────────────────────────────────────────

export interface LabelProps extends PrimitiveLabelProps, LabelVariantProps {
  children: ReactNode;
  /**
   * When `true`, always renders the `*` required indicator.
   * When `false`, always hides the `*` required indicator.
   * When `undefined` (default), the `*` shows automatically when the parent
   * React Aria Field receives `isRequired` — driven by `data-required` on
   * the Field root via `group-data-[required]:block`.
   */
  isRequired?: boolean;
  /**
   * Tooltip title text shown in the help tooltip next to the label.
   * When provided, a HelpCircle icon button is rendered to the right of
   * the label text. The tooltip is activated on hover/focus of the icon.
   */
  tooltip?: string;
  /**
   * Optional supporting description rendered inside the help tooltip body.
   * Only visible when `tooltip` is also provided.
   */
  tooltipDescription?: string;
  /** Ref forwarded to the underlying `<label>` DOM element. */
  ref?: Ref<HTMLLabelElement>;
  /** Additional CSS class names for consumer overrides. */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Accessible form label built on React Aria's `Label` primitive.
 *
 * Automatically associated with the nearest React Aria field when rendered
 * inside a `TextField`, `NumberField`, `Select`, or any React Aria field
 * wrapper — no `htmlFor` required.
 *
 * Supports an optional required indicator (`*`) and an optional help tooltip
 * icon that surfaces additional context on hover/focus.
 *
 * Automatically dims when the parent Field is disabled — no extra props needed.
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label>Email address</Label>
 *
 * // Explicit required indicator
 * <Label isRequired>Password</Label>
 *
 * // Auto required — shown when parent TextField has isRequired
 * <TextField isRequired>
 *   <Label>Email address</Label>
 * </TextField>
 *
 * // With help tooltip
 * <Label tooltip="We'll never share your email." tooltipDescription="Used only for account recovery.">
 *   Email address
 * </Label>
 * ```
 */
export function Label({
  isRequired,
  tooltip,
  tooltipDescription,
  className,
  children,
  ...props
}: LabelProps): React.JSX.Element {
  return (
    <PrimitiveLabel
      // Used for conditionally hiding/showing the label element via CSS:
      // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
      data-label="true"
      {...props}
      className={cn(labelVariants(), className)}
    >
      {children}

      {/* Required indicator — display is controlled by isRequired prop + parent data-required */}
      <span
        aria-hidden="true"
        className={cn(
          "text-brand-tertiary hidden group-data-[required]:block",
          isRequired === true && "block",
          isRequired === false && "!hidden"
        )}
      >
        *
      </span>

      {/* Help tooltip — only rendered when tooltip text is provided */}
      {tooltip && (
        <Tooltip title={tooltip} description={tooltipDescription} placement="top">
          {/* isDisabled={false} ensures the tooltip stays accessible even when
              the parent field is disabled — the icon only dims via CSS. */}
          <TooltipTrigger
            isDisabled={false}
            className="text-icon-quaternary hover:text-icon-quaternary-hover focus-visible:text-icon-quaternary-hover group-data-[disabled]:text-disable-subtle cursor-pointer transition duration-200 group-data-[disabled]:pointer-events-none"
            aria-label="More information"
          >
            <HelpCircleIcon />
          </TooltipTrigger>
        </Tooltip>
      )}
    </PrimitiveLabel>
  );
}

Label.displayName = "Label";
