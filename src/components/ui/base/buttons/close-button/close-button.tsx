"use client";

// TODO: Replace inline SVG × with @maholan/icons when the icon package is available.
import { type ReactElement } from "react";
import {
  Button as PrimitiveButton,
  type ButtonProps as PrimitiveButtonProps,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import {
  closeButtonVariants,
  closeButtonIconSize,
  type CloseButtonVariantProps,
} from "./close-button.variants";

export interface CloseButtonProps extends PrimitiveButtonProps, CloseButtonVariantProps {
  label?: string;
}

export const CloseButton = ({
  label,
  className,
  size = "sm",
  theme = "light",
  ...otherProps
}: CloseButtonProps): ReactElement => {
  return (
    <PrimitiveButton
      {...otherProps}
      aria-label={label ?? "Close"}
      className={(state) =>
        cn(
          closeButtonVariants({ theme, size }),
          state.isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {/* TODO: Replace with MHL icon when available: <CloseIcon aria-hidden="true" className={cn("shrink-0 transition-all", closeButtonIconSize[size])} /> */}
      <svg
        aria-hidden="true"
        className={cn("shrink-0 transition-all", closeButtonIconSize[size ?? "sm"])}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </PrimitiveButton>
  );
};

CloseButton.displayName = "CloseButton";
