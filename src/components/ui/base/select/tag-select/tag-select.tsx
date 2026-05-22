"use client";

import {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
  type FC,
  type FocusEventHandler,
  type JSX,
  type KeyboardEvent,
  type PointerEventHandler,
  type RefAttributes,
  type RefObject,
} from "react";
import { FocusScope, useFilter, useFocusManager } from "react-aria";
import {
  ComboBox as PrimitiveComboBox,
  ComboBoxStateContext,
  Group as PrimitiveGroup,
  Input as PrimitiveInput,
  ListBox as PrimitiveListBox,
  type ComboBoxProps as PrimitiveComboBoxProps,
  type GroupProps as PrimitiveGroupProps,
  type Key,
  type ListBoxProps as PrimitiveListBoxProps,
} from "react-aria-components";
import { useListData, type ListData } from "react-stately";

import { Avatar } from "@/components/ui/base/avatar";
import { HintText } from "@/components/ui/base/input";
import { Label } from "@/components/ui/base/input/label";
import { TagCloseX } from "@/components/ui/base/tags/tag-close";
import { useResizeObserver } from "@/libs/hooks/use-resize";
import { cn, isReactComponent } from "@/libs/utils";

import {
  tagSelectGroupVariants,
  tagSelectInputVariants,
  tagSelectTagLabelVariants,
  tagSelectTagVariants,
} from "./tag-select.variants";
import { IconSearch } from "../base/icons";
import { Popover } from "../base/popover";
import { SelectItem } from "../base/select-item";
import { type SelectItemType, sizes } from "../select-context";

interface TagSelectValueProps extends PrimitiveGroupProps {
  size: "sm" | "md" | "lg";
  shortcut?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  shortcutClassName?: string;
  icon?: FC<{ className?: string }> | null;
  ref?: RefObject<HTMLDivElement | null>;
  onFocus?: FocusEventHandler;
  onPointerEnter?: PointerEventHandler;
}

const TagSelectContext = createContext<{
  size: "sm" | "md" | "lg";
  selectedKeys: Key[];
  selectedItems: ListData<SelectItemType>;
  onRemove: (keys: Set<Key>) => void;
  onInputChange: (value: string) => void;
  valueFormatter?: (item: SelectItemType) => string;
}>({
  size: "sm",
  selectedKeys: [],
  selectedItems: {} as ListData<SelectItemType>,
  onRemove: () => {},
  onInputChange: () => {},
});

interface TagSelectProps
  extends
    Omit<PrimitiveComboBoxProps<SelectItemType>, "children" | "items">,
    RefAttributes<HTMLDivElement> {
  hint?: string;
  label?: string;
  tooltip?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  shortcut?: boolean;
  items?: SelectItemType[];
  popoverClassName?: string;
  shortcutClassName?: string;
  selectedItems: ListData<SelectItemType>;
  icon?: FC<{ className?: string }> | null;
  children: PrimitiveListBoxProps<SelectItemType>["children"];
  onItemCleared?: (key: Key) => void;
  onItemInserted?: (key: Key) => void;
  valueFormatter?: (item: SelectItemType) => string;
}

export const TagSelectBase = ({
  items,
  children,
  size = "sm",
  selectedItems,
  onItemCleared,
  onItemInserted,
  valueFormatter,
  shortcut,
  placeholder = "Search",
  icon,
  className,
  ...props
}: TagSelectProps): JSX.Element => {
  const { contains } = useFilter({ sensitivity: "base" });
  const selectedKeys = selectedItems.items.map((item) => item.id);

  const filter = useCallback(
    (item: SelectItemType, filterText: string): boolean =>
      contains(item.label ?? item.supportingText ?? "", filterText),
    [contains]
  );

  const accessibleList = useListData({
    initialItems: items,
    filter,
  });

  const onRemove = useCallback(
    (keys: Set<Key>) => {
      const key = keys.values().next().value;
      if (!key) return;
      selectedItems.remove(key);
      onItemCleared?.(key);
    },
    [selectedItems, onItemCleared]
  );

  const onSelectionChange = (id: Key | null): void => {
    if (!id) return;

    if (selectedKeys.includes(id)) {
      selectedItems.remove(id);
      onItemCleared?.(id);
    } else {
      const item = accessibleList.getItem(id);
      if (!item) return;
      selectedItems.append(item);
      onItemInserted?.(id);
    }

    accessibleList.setFilterText("");
  };

  const onInputChange = (value: string): void => {
    accessibleList.setFilterText(value);
  };

  const placeholderRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState("");

  const onResize = useCallback(() => {
    if (!placeholderRef.current) return;
    const divRect = placeholderRef.current?.getBoundingClientRect();
    setPopoverWidth(`${divRect.width}px`);
  }, [placeholderRef, setPopoverWidth]);

  useResizeObserver({
    ref: placeholderRef,
    onResize: onResize,
    box: "border-box",
  });

  return (
    <TagSelectContext.Provider
      value={{ size, selectedKeys, selectedItems, onInputChange, onRemove, valueFormatter }}
    >
      <PrimitiveComboBox
        allowsEmptyCollection
        menuTrigger="focus"
        items={accessibleList.items}
        onInputChange={onInputChange}
        inputValue={accessibleList.filterText}
        value={null}
        onChange={onSelectionChange}
        className={(state) =>
          cn(
            "flex flex-col gap-1.5",
            typeof className === "function" ? className(state) : className
          )
        }
        {...props}
      >
        {(state) => (
          <>
            {props.label && (
              <Label isRequired={state.isRequired} tooltip={props.tooltip}>
                {props.label}
              </Label>
            )}

            <TagSelectTagsValue
              size={size}
              shortcut={shortcut}
              ref={placeholderRef}
              placeholder={placeholder}
              icon={icon}
              onFocus={onResize}
              onPointerEnter={onResize}
            />

            <Popover
              size={size}
              triggerRef={placeholderRef}
              style={{ width: popoverWidth }}
              className={props?.popoverClassName}
            >
              <PrimitiveListBox selectionMode="multiple" className="size-full outline-hidden">
                {children}
              </PrimitiveListBox>
            </Popover>

            {props.hint && (
              <HintText isInvalid={state.isInvalid} className={cn(size === "sm" && "text-xs")}>
                {props.hint}
              </HintText>
            )}
          </>
        )}
      </PrimitiveComboBox>
    </TagSelectContext.Provider>
  );
};

const InnerTagSelect = ({
  isDisabled,
  shortcut,
  shortcutClassName,
  placeholder,
  size = "sm",
}: Omit<TagSelectProps, "selectedItems" | "children">): JSX.Element => {
  const focusManager = useFocusManager();
  const tagSelectContext = useContext(TagSelectContext);
  const comboBoxStateContext = useContext(ComboBoxStateContext);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isCaretAtStart =
      event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === 0;

    if (!isCaretAtStart && event.currentTarget.value !== "") return;

    switch (event.key) {
      case "Backspace":
      case "ArrowLeft":
        focusManager?.focusPrevious({ wrap: false, tabbable: false });
        break;
      case "ArrowRight":
        focusManager?.focusNext({ wrap: false, tabbable: false });
        break;
    }
  };

  const handleInputMouseDown = (): void => {
    if (comboBoxStateContext && !comboBoxStateContext.isOpen) {
      comboBoxStateContext.open();
    }
  };

  const handleTagKeyDown = (event: KeyboardEvent<HTMLButtonElement>, value: Key): void => {
    if (event.key === "Tab") return;
    event.preventDefault();

    const isFirstTag = tagSelectContext?.selectedItems?.items?.[0]?.id === value;

    switch (event.key) {
      case " ":
      case "Enter":
      case "Backspace":
        if (isFirstTag) {
          focusManager?.focusNext({ wrap: false, tabbable: false });
        } else {
          focusManager?.focusPrevious({ wrap: false, tabbable: false });
        }
        tagSelectContext.onRemove(new Set([value]));
        break;
      case "ArrowLeft":
        focusManager?.focusPrevious({ wrap: false, tabbable: false });
        break;
      case "ArrowRight":
        focusManager?.focusNext({ wrap: false, tabbable: false });
        break;
      case "Escape":
        comboBoxStateContext?.close();
        break;
    }
  };

  const isSelectionEmpty = tagSelectContext?.selectedItems?.items?.length === 0;

  return (
    <div className="relative flex w-full min-w-0 flex-1 flex-row flex-wrap items-center justify-start gap-1.5">
      {!isSelectionEmpty &&
        tagSelectContext?.selectedItems?.items?.map((value) => (
          <span key={value.id} className={tagSelectTagVariants({ size })}>
            {value?.avatarUrl ? (
              <Avatar size="xs" alt={value?.label} src={value?.avatarUrl} className="size-4" />
            ) : isReactComponent(value?.icon) ? (
              <value.icon aria-hidden="true" className="text-icon-quaternary size-4 shrink-0" />
            ) : isValidElement(value?.icon) ? (
              value.icon
            ) : null}

            <p className={tagSelectTagLabelVariants({ size })}>
              {tagSelectContext.valueFormatter
                ? tagSelectContext.valueFormatter(value)
                : value?.label}
            </p>

            <TagCloseX
              size={size === "sm" ? "sm" : "md"}
              isDisabled={isDisabled}
              className="ml-0.75"
              onKeyDown={(event) => handleTagKeyDown(event, value.id)}
              onPress={() => tagSelectContext.onRemove(new Set([value.id]))}
            />
          </span>
        ))}

      <div
        className={cn(
          "relative flex min-w-12 flex-1 flex-row items-center",
          !isSelectionEmpty && "ml-0.5",
          shortcut && "min-w-[30%]"
        )}
      >
        <PrimitiveInput
          placeholder={placeholder}
          onKeyDown={handleInputKeyDown}
          onMouseDown={handleInputMouseDown}
          className={tagSelectInputVariants({ size })}
        />

        {shortcut && (
          <div
            aria-hidden="true"
            className={cn(
              "to-bg-primary absolute inset-y-0.5 right-0.5 z-10 hidden items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-40% pl-8 md:flex",
              shortcutClassName,
              sizes[size].shortcut
            )}
          >
            <span
              className={cn(
                "text-icon-quaternary ring-secondary pointer-events-none rounded px-1 py-px text-xs font-medium ring-1 select-none ring-inset",
                isDisabled && "bg-transparent"
              )}
            >
              ⌘K
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const TagSelectTagsValue = ({
  size = "sm",
  shortcut,
  placeholder,
  shortcutClassName,
  icon: Icon = IconSearch,
  ...otherProps
}: TagSelectValueProps): JSX.Element => {
  const tagSelectContext = useContext(TagSelectContext);
  const selectedItemsCount = tagSelectContext.selectedKeys.length;

  return (
    <PrimitiveGroup
      {...otherProps}
      className={({ isFocusWithin, isDisabled }) =>
        cn(
          tagSelectGroupVariants({ isFocusWithin, isDisabled }),
          sizes[size].root,
          size === "sm" && selectedItemsCount > 0 && "py-1.5"
        )
      }
    >
      {({ isDisabled }) => (
        <>
          {Icon && <Icon data-icon className="pointer-events-none" />}
          <FocusScope contain={false} autoFocus={false} restoreFocus={false}>
            <InnerTagSelect
              isDisabled={isDisabled}
              size={size}
              shortcut={shortcut}
              shortcutClassName={shortcutClassName}
              placeholder={placeholder}
            />
          </FocusScope>
        </>
      )}
    </PrimitiveGroup>
  );
};

type TagSelectItemProps = Parameters<typeof SelectItem>[0];

const TagSelectItem = (props: TagSelectItemProps): JSX.Element => {
  const { selectedKeys } = useContext(TagSelectContext);
  return <SelectItem {...props} forceSelected={selectedKeys.includes(props.id)} />;
};

const TagSelect = TagSelectBase as typeof TagSelectBase & {
  displayName?: string;
  Item: typeof TagSelectItem;
};

TagSelect.displayName = "TagSelect";
TagSelect.Item = TagSelectItem;
TagSelectItem.displayName = "TagSelect.Item";

export { TagSelect };
