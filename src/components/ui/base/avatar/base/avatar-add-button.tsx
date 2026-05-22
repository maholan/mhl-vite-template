"use client";

import { type JSX } from "react";
import {
  Button as PrimitiveButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";

import { Tooltip } from "@/components/ui/base/tooltip/tooltip";
import { cn } from "@/libs/utils";

interface AvatarAddButtonProps extends Omit<AriaButtonProps, "className" | "aria-label"> {
  size: "xs" | "sm" | "md";
  title?: string;
  className?: string;
}

export const AvatarAddButton = ({
  size,
  className,
  title = "Add user",
  ...props
}: AvatarAddButtonProps): JSX.Element => (
  <Tooltip title={title}>
    <PrimitiveButton
      {...props}
      aria-label={title}
      className={(values) =>
        cn(
          "flex cursor-pointer items-center justify-center rounded-full",
          "border-primary bg-primary text-icon-quaternary border border-dashed",
          "transition duration-100 ease-linear",
          "hover:bg-secondary hover:text-icon-tertiary",
          "focus-visible:outline-focus-ring outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "xs" && "size-6",
          size === "sm" && "size-8",
          size === "md" && "size-10",
          values.isFocusVisible && "outline-focus-ring outline-2 outline-offset-2",
          className
        )
      }
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn("shrink-0", size === "md" ? "size-5" : "size-4")}
        aria-hidden="true"
      >
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </PrimitiveButton>
  </Tooltip>
);

AvatarAddButton.displayName = "AvatarAddButton";
