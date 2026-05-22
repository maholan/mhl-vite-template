"use client";

import { type JSX, type RefAttributes } from "react";
import {
  Button as PrimitiveButton,
  type ButtonProps as PrimitiveButtonProps,
} from "react-aria-components";

import { XClose } from "@/components/ui/assets";
import { cn } from "@/libs/utils";

import {
  tagCloseIconVariants,
  tagCloseVariants,
  type TagCloseVariantProps,
} from "./tag-close.variants";

export interface TagCloseXProps
  extends PrimitiveButtonProps, RefAttributes<HTMLButtonElement>, TagCloseVariantProps {
  className?: string;
}

/**
 * Dismiss button rendered inside a `Tag`. Uses React Aria's `slot="remove"` so
 * the TagGroup handles accessible removal automatically.
 *
 * @example
 * ```tsx
 * <TagCloseX size="sm" onPress={() => removeTag(id)} />
 * ```
 */
export function TagCloseX({ size = "md", className, ...otherProps }: TagCloseXProps): JSX.Element {
  return (
    <PrimitiveButton
      slot="remove"
      aria-label="Remove this tag"
      className={(renderProps) =>
        cn(
          tagCloseVariants({ size }),
          renderProps.isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
          className
        )
      }
      {...otherProps}
    >
      <XClose className={tagCloseIconVariants({ size })} />
    </PrimitiveButton>
  );
}
TagCloseX.displayName = "TagCloseX";
