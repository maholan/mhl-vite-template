"use client";

import {
  type FC,
  type JSX,
  type PropsWithChildren,
  type ReactNode,
  type RefAttributes,
  createContext,
  isValidElement,
  useContext,
} from "react";
import {
  ToggleButton as PrimitiveToggleButton,
  ToggleButtonGroup as PrimitiveToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";

import { cn, isReactComponent } from "@/libs/utils";

import {
  buttonGroupItemIconVariants,
  buttonGroupItemVariants,
  type ButtonGroupItemVariantProps,
} from "./button-group.variants";

type ButtonGroupSize = "sm" | "md" | "lg";

const ButtonGroupContext = createContext<{ size: ButtonGroupSize }>({ size: "md" });

export interface ButtonGroupItemProps
  extends
    ToggleButtonProps,
    RefAttributes<HTMLButtonElement>,
    Omit<ButtonGroupItemVariantProps, "size" | "iconOnly" | "hasIconLeading"> {
  /**
   * Icon rendered before the label. Accepts a component or element.
   */
  iconLeading?: FC<{ className?: string }> | ReactNode;
  /**
   * Icon rendered after the label.
   */
  iconTrailing?: FC<{ className?: string }> | ReactNode;
  className?: string;
}

export const ButtonGroupItem = ({
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonGroupItemProps>): JSX.Element => {
  const { size } = useContext(ButtonGroupContext);

  const iconOnly = !!(IconLeading ?? IconTrailing) && !children;
  const hasIconLeading = !!IconLeading && !iconOnly;

  return (
    <PrimitiveToggleButton
      {...props}
      className={cn(buttonGroupItemVariants({ size, iconOnly, hasIconLeading }), className)}
    >
      {isReactComponent(IconLeading) && (
        <IconLeading className={buttonGroupItemIconVariants({ size })} />
      )}
      {isValidElement(IconLeading) && IconLeading}

      {children}

      {isReactComponent(IconTrailing) && (
        <IconTrailing className={buttonGroupItemIconVariants({ size })} />
      )}
      {isValidElement(IconTrailing) && IconTrailing}
    </PrimitiveToggleButton>
  );
};

export interface ButtonGroupProps
  extends Omit<ToggleButtonGroupProps, "orientation">, RefAttributes<HTMLDivElement> {
  /**
   * Size applied to all child ButtonGroupItem elements.
   * @default "md"
   */
  size?: ButtonGroupSize;
  className?: string;
}

/**
 * Segmented button group built on React Aria's ToggleButtonGroup.
 * Supports single and multiple selection, three sizes, icon-leading and icon-only items.
 *
 * @example
 * ```tsx
 * <ButtonGroup size="md">
 *   <ButtonGroupItem id="day">Day</ButtonGroupItem>
 *   <ButtonGroupItem id="week">Week</ButtonGroupItem>
 *   <ButtonGroupItem id="month">Month</ButtonGroupItem>
 * </ButtonGroup>
 *
 * <ButtonGroup selectionMode="multiple">
 *   <ButtonGroupItem id="bold" iconLeading={BoldIcon} />
 *   <ButtonGroupItem id="italic" iconLeading={ItalicIcon} />
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = ({
  children,
  size = "md",
  className,
  ...props
}: ButtonGroupProps): JSX.Element => (
  <ButtonGroupContext.Provider value={{ size }}>
    <PrimitiveToggleButtonGroup
      selectionMode="single"
      className={cn(
        "inline-flex w-max -space-x-px overflow-hidden rounded-lg shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveToggleButtonGroup>
  </ButtonGroupContext.Provider>
);

ButtonGroupItem.displayName = "ButtonGroupItem";
ButtonGroup.displayName = "ButtonGroup";
