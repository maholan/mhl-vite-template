// "use client" — this component is interactive (onClick / onKeyDown handlers).
"use client";

import React, { type JSX } from "react";

import { cn } from "@/libs/utils";

import {
  tagCheckboxIconVariants,
  tagCheckboxVariants,
  type TagCheckboxVariantProps,
} from "./tag-checkbox.variants";

export interface TagCheckboxProps extends TagCheckboxVariantProps {
  className?: string;
  /** Accessible name for the checkbox — should describe what is being selected (e.g. the tag label). */
  "aria-label"?: string;
  /**
   * Called when the checkbox is activated (click or Space key).
   * Click propagation is stopped internally so the tag body does NOT
   * also respond to the same interaction.
   */
  onChange?: () => void;
}

/**
 * Interactive checkbox dot rendered inside a selectable `Tag`.
 * Only this element toggles selection — clicking the tag body has no effect.
 *
 * @example
 * ```tsx
 * <TagCheckbox size="md" isSelected onChange={() => toggle(id)} />
 * ```
 */
export function TagCheckbox({
  className,
  isDisabled = false,
  isSelected = false,
  size = "sm",
  "aria-label": ariaLabel = "Select",
  onChange,
}: TagCheckboxProps): JSX.Element {
  const handleActivate = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    if (!isDisabled) onChange?.();
  };

  return (
    <div
      role="checkbox"
      aria-label={ariaLabel}
      aria-checked={Boolean(isSelected)}
      aria-disabled={isDisabled ? true : undefined}
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          handleActivate(e);
        }
      }}
      className={cn(tagCheckboxVariants({ size, isSelected, isDisabled }), className)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className={tagCheckboxIconVariants({ size, isSelected })}
      >
        <path
          d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
TagCheckbox.displayName = "TagCheckbox";
