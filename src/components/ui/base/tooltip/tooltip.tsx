"use client";

import React, { type ReactNode } from "react";
import {
  Button as PrimitiveButton,
  OverlayArrow as PrimitiveOverlayArrow,
  Tooltip as PrimitiveTooltip,
  TooltipTrigger as PrimitiveTooltipTrigger,
  type ButtonProps as PrimitiveButtonProps,
  type TooltipProps as PrimitiveTooltipProps,
  type TooltipTriggerComponentProps as PrimitiveTooltipTriggerComponentProps,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import { tooltipContentVariants } from "./tooltip.variants";

export interface TooltipProps
  extends
    PrimitiveTooltipTriggerComponentProps,
    Omit<PrimitiveTooltipProps, "children" | "className"> {
  /** The title shown in the tooltip body. */
  title: ReactNode;
  /** Optional supporting description shown below the title. */
  description?: ReactNode;
  /**
   * Whether to render the directional arrow on the tooltip.
   *
   * @default false
   */
  arrow?: boolean;
  /**
   * Delay in milliseconds before the tooltip appears.
   *
   * @default 300
   */
  delay?: number;
  /** Additional CSS class names applied to the tooltip content container. */
  className?: string;
}

/**
 * Accessible tooltip built on React Aria's `TooltipTrigger` + `Tooltip` primitives.
 * Wraps any focusable element as the trigger via `children`.
 * Supports placement, an optional supporting description, a directional arrow,
 * and enter/exit animations that respect the computed placement axis.
 *
 * @example
 * ```tsx
 * <Tooltip title="Save file">
 *   <TooltipTrigger aria-label="Save"><SaveIcon /></TooltipTrigger>
 * </Tooltip>
 *
 * <Tooltip title="More info" description="Some supporting detail." arrow placement="bottom">
 *   <Button color="secondary">Hover me</Button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  title,
  description,
  children,
  arrow = false,
  delay = 300,
  closeDelay = 0,
  trigger,
  isDisabled,
  isOpen,
  defaultOpen,
  offset = 6,
  crossOffset,
  placement = "top",
  onOpenChange,
  className,
  ...tooltipProps
}: TooltipProps): React.JSX.Element {
  const resolvedCrossOffset = crossOffset ?? 0;

  return (
    <PrimitiveTooltipTrigger
      delay={delay}
      closeDelay={closeDelay}
      trigger={trigger}
      isDisabled={isDisabled}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}

      <PrimitiveTooltip
        {...tooltipProps}
        offset={offset}
        placement={placement}
        crossOffset={resolvedCrossOffset}
        className={({ isEntering, isExiting }) =>
          cn(isEntering && "animate-in ease-out", isExiting && "animate-out ease-in")
        }
      >
        {({ isEntering, isExiting }) => (
          <>
            {arrow && (
              <PrimitiveOverlayArrow>
                {/* Arrow must be a sibling of the content div — React Aria uses the
                    overlay positioning context here to place it at the correct edge. */}
                <svg
                  viewBox="0 0 100 100"
                  className="fill-primary-solid in-placement-left:-rotate-90 in-placement-right:rotate-90 in-placement-bottom:rotate-180 size-2.5"
                >
                  <path d="M0,0 L35.858,35.858 Q50,50 64.142,35.858 L100,0 Z" />
                </svg>
              </PrimitiveOverlayArrow>
            )}

            <div
              className={cn(
                tooltipContentVariants({ hasDescription: !!description }),
                isEntering &&
                  "animate-in fade-in zoom-in-95 in-placement-left:slide-in-from-right-0.5 in-placement-right:slide-in-from-left-0.5 in-placement-top:slide-in-from-bottom-0.5 in-placement-bottom:slide-in-from-top-0.5 ease-out",
                isExiting &&
                  "animate-out fade-out zoom-out-95 in-placement-left:slide-out-to-right-0.5 in-placement-right:slide-out-to-left-0.5 in-placement-top:slide-out-to-bottom-0.5 in-placement-bottom:slide-out-to-top-0.5 ease-in",
                className
              )}
            >
              <span className="text-xs font-semibold text-white">{title}</span>

              {description && (
                <span className="text-tooltip-color-text text-xs font-medium">{description}</span>
              )}
            </div>
          </>
        )}
      </PrimitiveTooltip>
    </PrimitiveTooltipTrigger>
  );
}

Tooltip.displayName = "Tooltip";

export interface TooltipTriggerProps extends PrimitiveButtonProps {}

/**
 * Unstyled wrapper button intended as a tooltip trigger for icon-only or custom elements.
 * Accepts all React Aria `Button` props and merges any consumer `className`.
 *
 * @example
 * ```tsx
 * <Tooltip title="Delete item">
 *   <TooltipTrigger aria-label="Delete"><TrashIcon /></TooltipTrigger>
 * </Tooltip>
 * ```
 */
export function TooltipTrigger({
  children,
  className,
  ...buttonProps
}: TooltipTriggerProps): React.JSX.Element {
  return (
    <PrimitiveButton
      {...buttonProps}
      className={(values) =>
        cn(
          "h-max w-max outline-hidden",
          typeof className === "function" ? className(values) : className
        )
      }
    >
      {children}
    </PrimitiveButton>
  );
}

TooltipTrigger.displayName = "TooltipTrigger";
