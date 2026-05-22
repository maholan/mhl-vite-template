"use client";

import React, { type RefAttributes } from "react";
import {
  type ButtonProps as AriaButtonProps,
  type MenuItemProps as AriaMenuItemProps,
  type MenuItemRenderProps,
  type MenuProps as AriaMenuProps,
  type PopoverProps as AriaPopoverProps,
  type SeparatorProps as AriaSeparatorProps,
  Button as AriaButton,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Separator as AriaSeparator,
  SubmenuTrigger as AriaSubmenuTrigger,
} from "react-aria-components";

import { Check, ChevronRight, DotsVertical } from "@/components/ui/assets/icons";
import { cn } from "@/libs/utils";

import {
  dropdownAccountHeaderVariants,
  dropdownDotsButtonVariants,
  dropdownItemInnerVariants,
  dropdownItemLabelVariants,
  dropdownItemOuterVariants,
  dropdownItemShortcutVariants,
  dropdownMenuHeaderVariants,
  dropdownMenuVariants,
  dropdownPopoverVariants,
  dropdownSectionHeaderVariants,
  dropdownSeparatorVariants,
} from "./dropdown.variants";
import { Avatar } from "../avatar/avatar";
import { CheckboxBase } from "../checkbox/checkbox";
import { RadioButtonBase } from "../radio";
import { ToggleBase } from "../toggle/toggle";

// ── Types ─────────────────────────────────────────────────────────────────────

type SelectionIndicator = "checkmark" | "checkbox" | "radio" | "toggle" | "none";

export interface DropdownItemProps extends AriaMenuItemProps {
  /** The label of the item to be displayed. */
  label?: string;
  /**
   * Keyboard shortcut badge displayed on the right side of the item.
   * Shown in a pill border: `⌘K`, `⌘S`, `⌥⇧Q` etc.
   */
  shortcut?: string;
  /** If true, the item renders without any default styles. */
  unstyled?: boolean;
  /** Icon component displayed on the left side of the item. */
  icon?: React.FC<{ className?: string }>;
  /** Avatar URL displayed on the left side of the item. */
  avatarUrl?: string;
  /** Selection indicator style to show when the item is selected. */
  selectionIndicator?: SelectionIndicator;
}

export interface DropdownMenuProps<T extends object> extends AriaMenuProps<T> {}

export interface DropdownPopoverProps extends AriaPopoverProps {}

export type DropdownSeparatorProps = AriaSeparatorProps;

export type DropdownDotsButtonProps = AriaButtonProps & RefAttributes<HTMLButtonElement>;

export interface DropdownMenuHeaderProps extends React.ComponentPropsWithRef<"div"> {
  /** The text displayed as the menu section title. */
  children: React.ReactNode;
}

export interface DropdownAccountHeaderProps extends React.ComponentPropsWithRef<"div"> {
  /** Full name shown as the primary line. */
  name: string;
  /** Email or supporting text shown below the name. */
  email: string;
  /** Avatar image URL. Falls back to initials if omitted. */
  avatarSrc?: string;
  /** Whether to show an online indicator dot on the avatar. */
  isOnline?: boolean;
}

// ── SelectionIndicator (internal) ─────────────────────────────────────────────

interface SelectionIndicatorProps extends MenuItemRenderProps {
  className?: string;
  type: SelectionIndicator;
}

function ItemSelectionIndicator({
  type,
  className,
  ...state
}: SelectionIndicatorProps): React.JSX.Element | null {
  if (type === "checkmark") {
    return (
      <Check
        aria-hidden="true"
        className={cn(
          "text-brand-primary size-4 shrink-0 stroke-[2.25px]",
          !state.isSelected && "invisible",
          className
        )}
      />
    );
  }
  if (type === "checkbox") {
    return (
      <CheckboxBase
        isSelected={state.isSelected && !state.hasSubmenu}
        isIndeterminate={state.isSelected && state.hasSubmenu}
        size="sm"
        className={cn("shrink-0", className)}
      />
    );
  }
  if (type === "radio") {
    return <RadioButtonBase isSelected={state.isSelected} className={cn("shrink-0", className)} />;
  }
  if (type === "toggle") {
    return (
      <ToggleBase
        slim
        size="sm"
        isSelected={state.isSelected}
        className={cn("shrink-0", className)}
      />
    );
  }
  return null;
}

// ── DropdownItem ──────────────────────────────────────────────────────────────

/**
 * A single selectable item inside a `Dropdown.Menu`.
 *
 * Supports icons, avatars, keyboard shortcut badges (via `shortcut`), and four
 * selection indicator styles: checkmark, checkbox, radio, toggle.
 *
 * @example
 * ```tsx
 * <Dropdown.Item id="settings" label="Settings" icon={SettingsIcon} shortcut="⌘S" selectionIndicator="none" />
 * <Dropdown.Item id="delete" label="Delete" selectionIndicator="none" />
 * ```
 */
function DropdownItem({
  label,
  children,
  shortcut,
  icon: Icon,
  avatarUrl,
  unstyled,
  selectionIndicator = "checkmark",
  ...props
}: DropdownItemProps): React.JSX.Element {
  if (unstyled) {
    return <AriaMenuItem id={label} textValue={label} {...props} />;
  }

  return (
    <AriaMenuItem
      {...props}
      className={(state) =>
        cn(
          dropdownItemOuterVariants({ isDisabled: state.isDisabled }),
          typeof props.className === "function" ? props.className(state) : props.className
        )
      }
    >
      {(state) => (
        <div
          className={dropdownItemInnerVariants({
            isFocused: state.isFocused,
            isFocusVisible: state.isFocusVisible,
          })}
        >
          {/*
           * Figma layout: two flex children separated by gap-3
           *   Left:  [indicator?] [icon/avatar?] [label flex-1]
           *   Right: [shortcut badge] | [trailing indicator] | [submenu chevron]
           */}

          {/* Left block — flex-1 pushes right block to the far edge */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {state.selectionMode !== "none" && !avatarUrl && !Icon && (
              <ItemSelectionIndicator type={selectionIndicator} {...state} />
            )}

            {avatarUrl && (
              <Avatar
                aria-hidden="true"
                size="xs"
                src={avatarUrl}
                alt={label}
                className="size-5 shrink-0"
              />
            )}

            {Icon && (
              <Icon
                aria-hidden="true"
                className="text-icon-quaternary size-4 shrink-0 stroke-[2.25px]"
              />
            )}

            <span className={dropdownItemLabelVariants({ isFocused: state.isFocused })}>
              {label ?? (typeof children === "function" ? children(state) : children)}
            </span>
          </div>

          {/* Right block */}
          {shortcut && <span className={dropdownItemShortcutVariants()}>{shortcut}</span>}

          {state.selectionMode !== "none" && (avatarUrl ?? Icon) && (
            <ItemSelectionIndicator type={selectionIndicator} {...state} />
          )}

          {state.hasSubmenu && (
            <ChevronRight
              aria-hidden="true"
              className="text-icon-quaternary size-4 shrink-0 stroke-[2.25px]"
            />
          )}
        </div>
      )}
    </AriaMenuItem>
  );
}
DropdownItem.displayName = "Dropdown.Item";

// ── DropdownMenu ──────────────────────────────────────────────────────────────

/**
 * The scrollable menu list — place `Dropdown.Item` and `Dropdown.Separator` inside.
 * Supports `selectionMode` from React Aria: `"none"`, `"single"`, or `"multiple"`.
 *
 * @example
 * ```tsx
 * <Dropdown.Menu selectionMode="single" onAction={handleAction}>
 *   <Dropdown.Item id="edit" label="Edit" />
 *   <Dropdown.Item id="delete" label="Delete" />
 * </Dropdown.Menu>
 * ```
 */
function DropdownMenu<T extends object>({
  className,
  ...props
}: DropdownMenuProps<T>): React.JSX.Element {
  return (
    <AriaMenu
      {...props}
      className={(state) =>
        cn(dropdownMenuVariants(), typeof className === "function" ? className(state) : className)
      }
    />
  );
}
DropdownMenu.displayName = "Dropdown.Menu";

// ── DropdownPopover ───────────────────────────────────────────────────────────

/**
 * Floating panel that wraps the `Dropdown.Menu`.
 * Handles entrance/exit animations and placement.
 * Default width is `w-62` (248 px) matching the Figma spec.
 *
 * @example
 * ```tsx
 * <Dropdown.Popover placement="bottom left">
 *   <Dropdown.Menu>...</Dropdown.Menu>
 * </Dropdown.Popover>
 * ```
 */
function DropdownPopover({
  className,
  children,
  ...props
}: DropdownPopoverProps): React.JSX.Element {
  return (
    <AriaPopover
      placement="bottom right"
      {...props}
      className={(state) =>
        cn(
          dropdownPopoverVariants({
            isEntering: state.isEntering,
            isExiting: state.isExiting,
          }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {children}
    </AriaPopover>
  );
}
DropdownPopover.displayName = "Dropdown.Popover";

// ── DropdownSeparator ─────────────────────────────────────────────────────────

/**
 * Horizontal divider for grouping items visually without a section header.
 */
function DropdownSeparator({ className, ...props }: DropdownSeparatorProps): React.JSX.Element {
  return <AriaSeparator {...props} className={cn(dropdownSeparatorVariants(), className)} />;
}
DropdownSeparator.displayName = "Dropdown.Separator";

// ── DropdownSectionHeader (inline section group label) ────────────────────────

/**
 * Non-interactive group label rendered inside a `Dropdown.Section`.
 * Renders via React Aria `Header` — stays accessible in the section's group role.
 */
function DropdownSectionHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof AriaHeader>): React.JSX.Element {
  return <AriaHeader {...props} className={cn(dropdownSectionHeaderVariants(), className)} />;
}
DropdownSectionHeader.displayName = "Dropdown.SectionHeader";

// ── DropdownMenuHeader (top-level menu title) ─────────────────────────────────

/**
 * A non-interactive text header pinned to the top of the popover panel.
 * Renders as a plain `<div>` with a bottom border — place it before `Dropdown.Menu`.
 *
 * @example
 * ```tsx
 * <Dropdown.Popover>
 *   <Dropdown.MenuHeader>Dropdown menu</Dropdown.MenuHeader>
 *   <Dropdown.Menu>...</Dropdown.Menu>
 * </Dropdown.Popover>
 * ```
 */
function DropdownMenuHeader({
  className,
  children,
  ...props
}: DropdownMenuHeaderProps): React.JSX.Element {
  return (
    <div {...props} className={cn(dropdownMenuHeaderVariants(), className)}>
      {children}
    </div>
  );
}
DropdownMenuHeader.displayName = "Dropdown.MenuHeader";

// ── DropdownAccountHeader ─────────────────────────────────────────────────────

/**
 * Avatar + name + email header block pinned to the top of the popover panel.
 * Place it before `Dropdown.Menu`.
 *
 * @example
 * ```tsx
 * <Dropdown.Popover>
 *   <Dropdown.AccountHeader
 *     name="Cameron Yang"
 *     email="cameron@mhl.design"
 *     avatarSrc="/avatars/cameron.jpg"
 *     isOnline
 *   />
 *   <Dropdown.Menu>...</Dropdown.Menu>
 * </Dropdown.Popover>
 * ```
 */
function DropdownAccountHeader({
  name,
  email,
  avatarSrc,
  isOnline = false,
  className,
  ...props
}: DropdownAccountHeaderProps): React.JSX.Element {
  return (
    <div {...props} className={cn(dropdownAccountHeaderVariants(), className)}>
      <div className="relative shrink-0">
        <Avatar size="md" src={avatarSrc} alt={name} className="size-10" />
        {isOnline && (
          <span
            aria-label="Online"
            className="border-primary bg-success-solid absolute -right-px -bottom-px size-2.5 rounded-full border-[1.5px]"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-primary truncate text-sm font-semibold">{name}</span>
        <span className="text-tertiary truncate text-sm">{email}</span>
      </div>
    </div>
  );
}
DropdownAccountHeader.displayName = "Dropdown.AccountHeader";

// ── DropdownDotsButton ────────────────────────────────────────────────────────

/**
 * Pre-built trigger button showing a vertical kebab (⋮) icon.
 * Place inside `Dropdown.Root` as the trigger element.
 *
 * @example
 * ```tsx
 * <Dropdown.Root>
 *   <Dropdown.DotsButton />
 *   <Dropdown.Popover>...</Dropdown.Popover>
 * </Dropdown.Root>
 * ```
 */
function DropdownDotsButton({ className, ...props }: DropdownDotsButtonProps): React.JSX.Element {
  return (
    <AriaButton
      aria-label="Open menu"
      {...props}
      className={(state) =>
        cn(
          dropdownDotsButtonVariants({
            isHovered: state.isHovered,
            isPressed: state.isPressed,
            isFocusVisible: state.isFocusVisible,
          }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      <DotsVertical className="size-5" />
    </AriaButton>
  );
}
DropdownDotsButton.displayName = "Dropdown.DotsButton";

// ── Compound export ───────────────────────────────────────────────────────────

/**
 * Accessible dropdown / context-menu built on React Aria's `MenuTrigger`.
 *
 * Compose the sub-components to build any menu layout:
 * - `Dropdown.Root` — `MenuTrigger`, manages open/close state
 * - `Dropdown.DotsButton` — pre-built kebab (⋮) trigger
 * - `Dropdown.Popover` — floating panel with enter/exit animations (248 px wide)
 * - `Dropdown.MenuHeader` — plain text header pinned above the menu list
 * - `Dropdown.AccountHeader` — avatar + name + email header pinned above the menu list
 * - `Dropdown.Menu` — scrollable `<menu>` list with `selectionMode`
 * - `Dropdown.Section` — groups items under a logical heading
 * - `Dropdown.SectionHeader` — non-interactive inline group label
 * - `Dropdown.Item` — selectable row with icon/avatar/shortcut/selection-indicator
 * - `Dropdown.Separator` — horizontal divider
 *
 * @example
 * ```tsx
 * <Dropdown.Root>
 *   <Dropdown.DotsButton />
 *   <Dropdown.Popover>
 *     <Dropdown.AccountHeader name="Cameron Yang" email="cameron@mhl.design" isOnline />
 *     <Dropdown.Menu onAction={handleAction}>
 *       <Dropdown.Item id="profile" label="View profile" icon={UserIcon} shortcut="⌘K→P" selectionIndicator="none" />
 *       <Dropdown.Separator />
 *       <Dropdown.Item id="logout" label="Sign out" icon={LogOutIcon} shortcut="⌥⇧Q" selectionIndicator="none" />
 *     </Dropdown.Menu>
 *   </Dropdown.Popover>
 * </Dropdown.Root>
 * ```
 */
export const Dropdown = {
  Root: AriaMenuTrigger,
  SubmenuTrigger: AriaSubmenuTrigger,
  Popover: DropdownPopover,
  MenuHeader: DropdownMenuHeader,
  AccountHeader: DropdownAccountHeader,
  Menu: DropdownMenu,
  Section: AriaMenuSection,
  SectionHeader: DropdownSectionHeader,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  DotsButton: DropdownDotsButton,
};
