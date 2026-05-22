"use client";

import {
  isValidElement,
  type FC,
  type JSX,
  type ReactNode,
  type Ref,
  type RefAttributes,
} from "react";
import {
  Button as PrimitiveButton,
  ListBox as PrimitiveListBox,
  Select as PrimitiveSelect,
  SelectValue as PrimitiveSelectValue,
  type SelectProps as PrimitiveSelectProps,
} from "react-aria-components";

import { Avatar } from "@/components/ui/base/avatar/avatar";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn, isReactComponent } from "@/libs/utils";

import {
  selectChevronVariants,
  selectTriggerVariants,
  selectValueVariants,
  type SelectTriggerVariantProps,
} from "./select.variants";
import { ComboBox } from "../base/combobox";
import { IconChevronDown } from "../base/icons";
import { Popover } from "../base/popover";
import { SelectItem } from "../base/select-item";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "../select-context";

export type { SelectTriggerVariantProps };
export { selectTriggerVariants, selectValueVariants, selectChevronVariants };

export interface SelectProps
  extends
    Omit<PrimitiveSelectProps<SelectItemType>, "children" | "items">,
    RefAttributes<HTMLDivElement>,
    CommonProps {
  items?: SelectItemType[];
  popoverClassName?: string;
  icon?: FC | ReactNode;
  children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
  isOpen: boolean;
  size: "sm" | "md" | "lg";
  isFocusVisible: boolean;
  isDisabled: boolean;
  placeholder?: string;
  ref?: Ref<HTMLButtonElement>;
  icon?: FC | ReactNode;
}

const SelectValue = ({
  isOpen,
  isFocusVisible,
  isDisabled,
  size,
  placeholder,
  icon,
  ref,
}: SelectValueProps): JSX.Element => {
  return (
    <PrimitiveButton
      ref={ref}
      className={selectTriggerVariants({ size, isFocused: isFocusVisible || isOpen, isDisabled })}
    >
      <PrimitiveSelectValue<SelectItemType>
        className={(state) =>
          cn(
            selectValueVariants({ size }),
            (state.selectedItems[0]?.icon ?? icon) && sizes[size].withIcon
          )
        }
      >
        {(state) => {
          const selectedItem = state.selectedItems[0];
          const Icon = selectedItem?.icon ?? icon;

          return (
            <>
              {selectedItem?.avatarUrl ? (
                <Avatar
                  size="xs"
                  src={selectedItem.avatarUrl}
                  alt={selectedItem.label}
                  className={cn(size === "sm" && "size-5")}
                />
              ) : isReactComponent(Icon) ? (
                <Icon
                  aria-hidden="true"
                  className={cn(
                    "text-icon-quaternary shrink-0",
                    size === "sm" ? "size-4 stroke-[2.25px]" : "size-5"
                  )}
                />
              ) : isValidElement(Icon) ? (
                Icon
              ) : null}

              {selectedItem ? (
                <span className="flex w-full gap-x-1.5 truncate">
                  <span className={cn("text-primary truncate font-medium", sizes[size].text)}>
                    {selectedItem?.label}
                  </span>
                  {selectedItem?.supportingText && (
                    <span className={cn("text-tertiary", sizes[size].text)}>
                      {selectedItem?.supportingText}
                    </span>
                  )}
                </span>
              ) : (
                <span className={cn("text-placeholder", sizes[size].text)}>{placeholder}</span>
              )}

              <IconChevronDown aria-hidden="true" className={selectChevronVariants({ size })} />
            </>
          );
        }}
      </PrimitiveSelectValue>
    </PrimitiveButton>
  );
};

const SelectRoot = ({
  placeholder = "Select",
  icon,
  size = "md",
  children,
  items,
  label,
  hint,
  tooltip,
  hideRequiredIndicator,
  className,
  ...rest
}: SelectProps): JSX.Element => {
  return (
    <SelectContext.Provider value={{ size }}>
      <PrimitiveSelect
        {...rest}
        className={(state) =>
          cn(
            "flex flex-col gap-1.5",
            typeof className === "function" ? className(state) : className
          )
        }
      >
        {(state) => (
          <>
            {label && (
              <Label
                isRequired={hideRequiredIndicator ? false : state.isRequired}
                tooltip={tooltip}
              >
                {label}
              </Label>
            )}

            <SelectValue {...state} {...{ size, placeholder }} icon={icon} />

            <Popover size={size} className={rest.popoverClassName}>
              <PrimitiveListBox items={items} className="size-full outline-hidden">
                {children}
              </PrimitiveListBox>
            </Popover>

            {hint && (
              <HintText isInvalid={state.isInvalid} className={cn(size === "sm" && "text-xs")}>
                {hint}
              </HintText>
            )}
          </>
        )}
      </PrimitiveSelect>
    </SelectContext.Provider>
  );
};

const Select = SelectRoot as typeof SelectRoot & {
  displayName?: string;
  Search: typeof ComboBox;
  Item: typeof SelectItem;
};

Select.displayName = "Select";
Select.Search = ComboBox;
Select.Item = SelectItem;

export { Select };
