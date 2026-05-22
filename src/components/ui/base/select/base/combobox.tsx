"use client";

import {
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
  type FC,
  type FocusEventHandler,
  type JSX,
  type PointerEventHandler,
  type ReactNode,
  type Ref,
  type RefAttributes,
} from "react";
import {
  ComboBox as PrimitiveComboBox,
  ComboBoxStateContext,
  Group as PrimitiveGroup,
  Input as PrimitiveInput,
  ListBox as PrimitiveListBox,
  type ComboBoxProps as PrimitiveComboBoxProps,
  type GroupProps as PrimitiveGroupProps,
  type ListBoxProps as PrimitiveListBoxProps,
} from "react-aria-components";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { useResizeObserver } from "@/libs/hooks/use-resize";
import { cn, isReactComponent } from "@/libs/utils";

import { IconSearch } from "./icons";
import { Popover } from "./popover";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "../select-context";

interface ComboBoxProps
  extends
    Omit<PrimitiveComboBoxProps<SelectItemType>, "children" | "items">,
    RefAttributes<HTMLDivElement>,
    CommonProps {
  shortcut?: boolean;
  items?: SelectItemType[];
  popoverClassName?: string;
  shortcutClassName?: string;
  icon?: FC | ReactNode;
  children: PrimitiveListBoxProps<SelectItemType>["children"];
}

interface ComboBoxValueProps extends PrimitiveGroupProps {
  size: "sm" | "md" | "lg";
  shortcut: boolean;
  placeholder?: string;
  shortcutClassName?: string;
  icon?: FC | ReactNode;
  onFocus?: FocusEventHandler;
  onPointerEnter?: PointerEventHandler;
  ref?: Ref<HTMLDivElement>;
}

const ComboBoxValue = ({
  size,
  shortcut,
  placeholder,
  shortcutClassName,
  icon: IconProp,
  ref,
  ...otherProps
}: ComboBoxValueProps): JSX.Element => {
  const state = useContext(ComboBoxStateContext);

  const value = state?.selectedItem?.value ?? null;
  const inputValue = state?.inputValue ?? null;

  const first = inputValue?.split(value?.supportingText)?.[0] ?? "";
  const last = inputValue?.split(first)[1];

  return (
    <PrimitiveGroup
      ref={ref}
      {...otherProps}
      className={({ isFocusWithin, isDisabled }) =>
        cn(
          "bg-primary ring-primary relative flex w-full items-center gap-2 rounded-lg shadow-xs ring-1 outline-hidden transition-shadow duration-100 ease-linear ring-inset",
          isDisabled && "cursor-not-allowed opacity-50",
          isFocusWithin && "ring-brand ring-2",

          "*:data-icon:text-icon-quaternary *:data-icon:shrink-0",

          sizes[size].root
        )
      }
    >
      {isReactComponent(IconProp) ? (
        <IconProp data-icon className="pointer-events-none" aria-hidden="true" />
      ) : isValidElement(IconProp) ? (
        IconProp
      ) : (
        <IconSearch data-icon className="pointer-events-none" aria-hidden="true" />
      )}

      <div className="relative flex w-full items-center">
        {inputValue && (
          <span
            className={cn(
              "absolute top-1/2 z-0 inline-flex w-full -translate-y-1/2 truncate",
              sizes[size].textContainer
            )}
            aria-hidden="true"
          >
            <p className={cn("text-primary font-medium", sizes[size].text)}>{first}</p>
            {last && <p className={cn("text-tertiary -ml-0.75", sizes[size].text)}>{last}</p>}
          </span>
        )}

        <PrimitiveInput
          placeholder={placeholder}
          className={cn(
            "caret-alpha-black/90 placeholder:text-placeholder z-10 w-full appearance-none bg-transparent text-transparent focus:outline-hidden disabled:cursor-not-allowed",
            sizes[size].text
          )}
        />
      </div>

      {shortcut && (
        <div
          className={cn(
            "to-bg-primary absolute inset-y-0.5 right-0.5 z-10 hidden items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-40% pl-8 md:flex",
            sizes[size].shortcut,
            shortcutClassName
          )}
        >
          <span
            className="text-icon-quaternary ring-secondary pointer-events-none rounded px-1 py-px text-xs font-medium ring-1 select-none ring-inset"
            aria-hidden="true"
          >
            ⌘K
          </span>
        </div>
      )}
    </PrimitiveGroup>
  );
};

export const ComboBox = ({
  placeholder = "Search",
  shortcut = true,
  size = "md",
  children,
  items,
  shortcutClassName,
  icon,
  hideRequiredIndicator,
  ...otherProps
}: ComboBoxProps): JSX.Element => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState("");

  const onResize = useCallback(() => {
    if (!placeholderRef.current) return;
    const divRect = placeholderRef.current?.getBoundingClientRect();
    setPopoverWidth(`${divRect.width}px`);
  }, [placeholderRef, setPopoverWidth]);

  useResizeObserver({
    ref: placeholderRef,
    box: "border-box",
    onResize,
  });

  return (
    <SelectContext.Provider value={{ size }}>
      <PrimitiveComboBox menuTrigger="focus" {...otherProps}>
        {(state) => (
          <div className="flex flex-col gap-1.5">
            {otherProps.label && (
              <Label
                isRequired={hideRequiredIndicator ? false : state.isRequired}
                tooltip={otherProps.tooltip}
              >
                {otherProps.label}
              </Label>
            )}

            <ComboBoxValue
              ref={placeholderRef}
              placeholder={placeholder}
              shortcut={shortcut}
              shortcutClassName={shortcutClassName}
              icon={icon}
              size={size}
              onFocus={onResize}
              onPointerEnter={onResize}
            />

            <Popover
              size={size}
              triggerRef={placeholderRef}
              style={{ width: popoverWidth }}
              className={otherProps.popoverClassName}
            >
              <PrimitiveListBox items={items} className="size-full outline-hidden">
                {children}
              </PrimitiveListBox>
            </Popover>

            {otherProps.hint && (
              <HintText isInvalid={state.isInvalid} className={cn(size === "sm" && "text-xs")}>
                {otherProps.hint}
              </HintText>
            )}
          </div>
        )}
      </PrimitiveComboBox>
    </SelectContext.Provider>
  );
};

ComboBox.displayName = "Select.Search";
