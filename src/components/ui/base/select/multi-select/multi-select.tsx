"use client";

import { useCallback, useRef, useState, type JSX, type ReactNode, type RefAttributes } from "react";
import { useFilter } from "react-aria";
import {
  Autocomplete as PrimitiveAutocomplete,
  Button as PrimitiveButton,
  Dialog as PrimitiveDialog,
  DialogTrigger as PrimitiveDialogTrigger,
  Input as PrimitiveInput,
  ListBox as PrimitiveListBox,
  Popover as PrimitivePopover,
  SearchField as PrimitiveSearchField,
  type Selection,
} from "react-aria-components";

import { Button } from "@/components/ui/base/buttons/button";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import {
  multiSelectListBoxVariants,
  multiSelectSearchInputVariants,
  multiSelectSearchRowVariants,
  multiSelectSearchWrapperVariants,
  multiSelectTriggerVariants,
} from "./multi-select.variants";
import { IconChevronDown, IconSearch } from "../base/icons";
import { SelectItem } from "../base/select-item";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "../select-context";

const footerButtonSize = {
  sm: "sm" as const,
  md: "sm" as const,
  lg: "md" as const,
};

interface MultiSelectFooterProps {
  size?: "sm" | "md" | "lg";
  onReset?: () => void;
  onSelectAll?: () => void;
  className?: string;
}

const MultiSelectFooter = ({
  size = "sm",
  onReset,
  onSelectAll,
  className,
}: MultiSelectFooterProps): JSX.Element => {
  const btnSize = footerButtonSize[size];

  return (
    <div
      className={cn("border-secondary flex items-center justify-between border-t p-3", className)}
    >
      <Button size={btnSize} color="secondary" onClick={onReset}>
        Reset
      </Button>
      <Button size={btnSize} color="secondary" onClick={onSelectAll}>
        Select all
      </Button>
    </div>
  );
};

interface MultiSelectEmptyStateProps {
  title?: string;
  description?: string;
  onClearSearch?: () => void;
  className?: string;
}

const MultiSelectEmptyState = ({
  title = "No results found",
  description = "Please try a different search term.",
  onClearSearch,
  className,
}: MultiSelectEmptyStateProps): JSX.Element => (
  <div className={cn("flex flex-col items-center gap-3 px-4 py-4", className)}>
    <div className="flex flex-col items-center gap-3">
      <div className="bg-secondary ring-secondary-alt flex size-9 items-center justify-center rounded-lg ring-1">
        <IconSearch className="text-icon-quaternary size-4" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-0.5 text-center text-sm">
        <p className="text-primary font-semibold">{title}</p>
        <p className="text-tertiary">{description}</p>
      </div>
    </div>
    {onClearSearch && (
      <Button size="sm" color="link-color" onClick={onClearSearch}>
        Clear search
      </Button>
    )}
  </div>
);

interface MultiSelectProps extends RefAttributes<HTMLDivElement>, CommonProps {
  items?: SelectItemType[];
  children?: ReactNode | ((item: SelectItemType) => ReactNode);
  selectedKeys?: Selection;
  defaultSelectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  popoverClassName?: string;
  className?: string;
  onReset?: () => void;
  onSelectAll?: () => void;
  showFooter?: boolean;
  showSearch?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  selectedCountFormatter?: (count: number) => ReactNode;
  supportingText?: ReactNode;
}

const MultiSelectRoot = ({
  items,
  children,
  size = "md",
  selectedKeys: controlledKeys,
  defaultSelectedKeys,
  onSelectionChange: externalOnSelectionChange,
  isDisabled,
  isRequired,
  isInvalid,
  placeholder = "Select",
  label,
  hint,
  tooltip,
  hideRequiredIndicator,
  popoverClassName,
  className,
  onReset: externalOnReset,
  onSelectAll: externalOnSelectAll,
  showFooter = true,
  showSearch = true,
  emptyStateTitle,
  emptyStateDescription,
  selectedCountFormatter,
  supportingText,
}: MultiSelectProps): JSX.Element => {
  const isControlled = controlledKeys !== undefined;
  const [internalKeys, setInternalKeys] = useState<Selection>(defaultSelectedKeys ?? new Set());

  const selectedKeys = isControlled ? controlledKeys : internalKeys;

  const { contains } = useFilter({ sensitivity: "base" });
  const [searchValue, setSearchValue] = useState("");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState("");

  const onResize = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPopoverWidth(`${rect.width}px`);
  }, []);

  const selectedCount =
    selectedKeys instanceof Set
      ? selectedKeys.size
      : selectedKeys === "all"
        ? (items?.length ?? 0)
        : 0;
  const hasSelection = selectedCount > 0;

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
  }, []);

  const handleSelectionChange = (keys: Selection): void => {
    if (!isControlled) setInternalKeys(keys);
    externalOnSelectionChange?.(keys);
  };

  const handleReset = (): void => {
    if (!isControlled) setInternalKeys(new Set());
    externalOnReset?.();
  };

  const handleSelectAll = (): void => {
    if (!isControlled) setInternalKeys("all");
    externalOnSelectAll?.();
  };

  return (
    <SelectContext.Provider value={{ size }}>
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <Label isRequired={hideRequiredIndicator ? false : isRequired} tooltip={tooltip}>
            {label}
          </Label>
        )}

        <PrimitiveDialogTrigger>
          <PrimitiveButton
            ref={triggerRef}
            isDisabled={isDisabled}
            onClick={onResize}
            className={(state) =>
              multiSelectTriggerVariants({
                isFocused: state.isFocusVisible || state.isPressed,
                isDisabled: state.isDisabled,
              })
            }
          >
            <span
              className={cn(
                "flex w-full items-center truncate text-left",
                sizes[size].root,
                "*:data-icon:text-icon-quaternary *:data-icon:shrink-0"
              )}
            >
              {hasSelection ? (
                <span className={cn("flex items-center", sizes[size].textContainer)}>
                  <span className={cn("text-primary font-medium", sizes[size].text)}>
                    {selectedCountFormatter
                      ? selectedCountFormatter(selectedCount)
                      : `${selectedCount} selected`}
                  </span>
                  {supportingText && (
                    <span className={cn("text-tertiary", sizes[size].text)}>{supportingText}</span>
                  )}
                </span>
              ) : (
                <span className={cn("text-placeholder", sizes[size].text)}>{placeholder}</span>
              )}

              <IconChevronDown
                aria-hidden="true"
                className={cn(
                  "text-icon-quaternary ml-auto shrink-0",
                  size === "lg" ? "size-5" : "size-4 stroke-[2.25px]"
                )}
              />
            </span>
          </PrimitiveButton>

          <PrimitivePopover
            placement="bottom"
            offset={4}
            containerPadding={0}
            style={{ width: popoverWidth || undefined }}
            className={(state) =>
              cn(
                "bg-primary ring-secondary-alt w-(--trigger-width) origin-(--trigger-anchor-point) overflow-hidden rounded-lg shadow-lg ring-1 outline-hidden will-change-transform",
                state.isEntering &&
                  "animate-in fade-in placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 duration-150 ease-out",
                state.isExiting &&
                  "animate-out fade-out placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 duration-100 ease-in",
                popoverClassName
              )
            }
          >
            <PrimitiveDialog className="outline-hidden">
              <PrimitiveAutocomplete
                filter={contains}
                inputValue={searchValue}
                onInputChange={setSearchValue}
              >
                {showSearch && (
                  <div className={multiSelectSearchWrapperVariants({ size })}>
                    <PrimitiveSearchField
                      aria-label="Search"
                      value={searchValue}
                      onChange={setSearchValue}
                      autoFocus
                    >
                      <div className={multiSelectSearchRowVariants({ size })}>
                        <IconSearch
                          data-icon
                          aria-hidden="true"
                          className="text-icon-quaternary shrink-0"
                        />
                        <PrimitiveInput
                          placeholder="Search"
                          className={multiSelectSearchInputVariants({ size })}
                        />
                      </div>
                    </PrimitiveSearchField>
                  </div>
                )}

                <PrimitiveListBox
                  aria-label={label ?? "Options"}
                  items={items}
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={handleSelectionChange}
                  renderEmptyState={() => (
                    <MultiSelectEmptyState
                      title={emptyStateTitle}
                      description={emptyStateDescription}
                      onClearSearch={searchValue ? handleClearSearch : undefined}
                    />
                  )}
                  className={multiSelectListBoxVariants({ size })}
                >
                  {children}
                </PrimitiveListBox>
              </PrimitiveAutocomplete>

              {showFooter && (
                <MultiSelectFooter
                  size={size}
                  onReset={handleReset}
                  onSelectAll={handleSelectAll}
                />
              )}
            </PrimitiveDialog>
          </PrimitivePopover>
        </PrimitiveDialogTrigger>

        {hint && (
          <HintText isInvalid={isInvalid} className={cn(size === "sm" && "text-xs")}>
            {hint}
          </HintText>
        )}
      </div>
    </SelectContext.Provider>
  );
};

const MultiSelect = MultiSelectRoot as typeof MultiSelectRoot & {
  displayName?: string;
  Item: typeof SelectItem;
  Footer: typeof MultiSelectFooter;
  EmptyState: typeof MultiSelectEmptyState;
};

MultiSelect.displayName = "MultiSelect";
MultiSelect.Item = SelectItem;
MultiSelect.Footer = MultiSelectFooter;
MultiSelect.EmptyState = MultiSelectEmptyState;

export { MultiSelect };
