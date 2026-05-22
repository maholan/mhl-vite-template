"use client";

import { isValidElement, useContext, type JSX } from "react";
import {
  ListBoxItem as PrimitiveListBoxItem,
  Text as PrimitiveText,
  type ListBoxItemProps as PrimitiveListBoxItemProps,
} from "react-aria-components";

import { Avatar } from "@/components/ui/base/avatar/avatar";
import { CheckboxBase } from "@/components/ui/base/checkbox/checkbox";
import { cn, isReactComponent } from "@/libs/utils";

import { IconCheck } from "./icons";
import { SelectContext, type SelectItemType } from "../select-context";

const sizes = {
  sm: {
    root: "p-2 pr-2.5 gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]",
    text: "text-sm",
    textContainer: "gap-x-1.5",
    check: "size-4 stroke-[2.25px]",
    checkbox: "sm" as const,
  },
  md: {
    root: "p-2 pr-2.5 gap-2 *:data-icon:size-5",
    text: "text-md",
    textContainer: "gap-x-2",
    check: "size-5",
    checkbox: "sm" as const,
  },
  lg: {
    root: "p-2.5 pl-2 gap-2 *:data-icon:size-5",
    text: "text-md",
    textContainer: "gap-x-2",
    check: "size-5",
    checkbox: "md" as const,
  },
};

interface SelectItemProps
  extends Omit<PrimitiveListBoxItemProps<SelectItemType>, "id">, SelectItemType {
  selectionIndicator?: "checkmark" | "checkbox" | "none";
  selectionIndicatorAlign?: "left" | "right";
  /** Override React Aria's isSelected for external multi-select tracking (e.g. TagSelect). */
  forceSelected?: boolean;
}

export const SelectItem = ({
  label,
  id,
  value,
  avatarUrl,
  supportingText,
  isDisabled,
  icon: Icon,
  className,
  children,
  selectionIndicator = "checkmark",
  selectionIndicatorAlign = "left",
  forceSelected,
  ...props
}: SelectItemProps): JSX.Element => {
  const { size } = useContext(SelectContext);

  const labelOrChildren = label ?? (typeof children === "string" ? children : "");
  const textValue = supportingText ? `${labelOrChildren} ${supportingText}` : labelOrChildren;

  const isLeft = selectionIndicatorAlign === "left";

  return (
    <PrimitiveListBoxItem
      id={id}
      value={
        value ?? {
          id,
          label: labelOrChildren,
          avatarUrl,
          supportingText,
          isDisabled,
          icon: Icon,
        }
      }
      textValue={textValue}
      isDisabled={isDisabled}
      {...props}
      className={(state) =>
        cn(
          "w-full py-px outline-hidden",
          size === "sm" ? "px-1" : "px-1.5",
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {(state) => {
        const isItemSelected = forceSelected ?? state.isSelected;
        return (
          <div
            className={cn(
              "flex cursor-pointer items-center rounded-md outline-hidden select-none",
              (state.isFocused ||
                state.isHovered ||
                (isItemSelected && selectionIndicator !== "checkbox")) &&
                "bg-secondary",
              state.isDisabled && "cursor-not-allowed opacity-50",
              state.isFocusVisible && "ring-brand ring-2 ring-inset",

              "*:data-icon:text-icon-quaternary *:data-icon:shrink-0",

              sizes[size].root
            )}
          >
            {isLeft && selectionIndicator === "checkbox" && (
              <CheckboxBase
                size={sizes[size].checkbox}
                isSelected={isItemSelected}
                isDisabled={state.isDisabled}
              />
            )}

            {isLeft && selectionIndicator === "checkmark" && (
              <IconCheck
                aria-hidden="true"
                className={cn(
                  "text-brand-600 shrink-0",
                  sizes[size].check,
                  !isItemSelected && "opacity-0"
                )}
              />
            )}

            {avatarUrl ? (
              <Avatar
                aria-hidden="true"
                size="xs"
                src={avatarUrl}
                alt={label}
                className={cn(size === "sm" && "size-5")}
              />
            ) : isReactComponent(Icon) ? (
              <Icon data-icon aria-hidden="true" />
            ) : isValidElement(Icon) ? (
              Icon
            ) : null}

            <div className={cn("flex w-full min-w-0 flex-1 flex-wrap", sizes[size].textContainer)}>
              <PrimitiveText
                slot="label"
                className={cn(
                  "text-primary truncate font-medium whitespace-nowrap",
                  sizes[size].text
                )}
              >
                {label ?? (typeof children === "function" ? children(state) : children)}
              </PrimitiveText>

              {supportingText && (
                <PrimitiveText
                  slot="description"
                  className={cn("text-tertiary whitespace-nowrap", sizes[size].text)}
                >
                  {supportingText}
                </PrimitiveText>
              )}
            </div>

            {!isLeft && isItemSelected && selectionIndicator === "checkmark" && (
              <IconCheck
                aria-hidden="true"
                className={cn("text-brand-600 ml-auto", sizes[size].check)}
              />
            )}

            {!isLeft && selectionIndicator === "checkbox" && (
              <CheckboxBase
                size={sizes[size].checkbox}
                isSelected={isItemSelected}
                isDisabled={state.isDisabled}
                className="ml-auto"
              />
            )}
          </div>
        );
      }}
    </PrimitiveListBoxItem>
  );
};

SelectItem.displayName = "Select.Item";
