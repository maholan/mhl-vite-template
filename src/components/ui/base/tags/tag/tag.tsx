"use client";

import React, {
  createContext,
  type ImgHTMLAttributes,
  type JSX,
  type PropsWithChildren,
  type RefAttributes,
  useContext,
  useState,
} from "react";
import {
  Tag as PrimitiveTag,
  TagGroup as PrimitiveTagGroup,
  type TagGroupProps as PrimitiveTagGroupProps,
  TagList as PrimitiveTagList,
  type TagProps as PrimitiveTagProps,
} from "react-aria-components";

import { Dot, User01 } from "@/components/ui/assets";
import { cn } from "@/libs/utils";

import { TagCheckbox } from "../tag-checkbox";
import { TagCloseX } from "../tag-close";
import {
  tagAvatarVariants,
  tagContentVariants,
  tagCountVariants,
  tagRootVariants,
} from "./tag.variants";

// ── TagGroupContext ────────────────────────────────────────────────────────────
// Shared context so child `Tag` components can read the group's size + selectionMode.

const TagGroupContext = createContext<{
  selectionMode: "none" | "single" | "multiple";
  size: "sm" | "md" | "lg";
  /** Keys currently selected — managed by `TagGroup`, not React Aria. */
  selectedKeys: Set<React.Key>;
  /** Toggle the selected state of one key (respects selectionMode). */
  toggleKey: (key: React.Key) => void;
}>({ selectionMode: "none", size: "sm", selectedKeys: new Set(), toggleKey: () => {} });

// ── TagAvatar ─────────────────────────────────────────────────────────────────

export interface TagAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Show a thin contrast border to separate the avatar from light/dark surfaces. */
  contrastBorder?: boolean;
  className?: string;
}

/**
 * Circular avatar image with a fallback user icon. Renders a 16 px circle.
 *
 * @example
 * ```tsx
 * <TagAvatar src="/avatars/alice.png" alt="Alice" />
 * <TagAvatar contrastBorder={false} />
 * ```
 */
export function TagAvatar({
  src,
  alt,
  contrastBorder = true,
  className,
  ...imgProps
}: TagAvatarProps): JSX.Element {
  const [isFailed, setIsFailed] = useState(false);

  return (
    <div className={cn(tagAvatarVariants({ contrastBorder }), className)}>
      {src && !isFailed ? (
        <img
          data-avatar-img
          className="size-full object-cover"
          src={src}
          alt={alt}
          onError={() => setIsFailed(true)}
          {...imgProps}
        />
      ) : (
        <User01 className="text-icon-quaternary size-3 stroke-[2.25px]" />
      )}
    </div>
  );
}
TagAvatar.displayName = "TagAvatar";

// ── TagItem (data shape helper) ────────────────────────────────────────────────

export interface TagItem {
  id: string;
  label: string;
  count?: number;
  avatarSrc?: string;
  avatarContrastBorder?: boolean;
  dot?: boolean;
  dotClassName?: string;
  isDisabled?: boolean;
  onClose?: (id: string) => void;
}

// ── TagGroup ──────────────────────────────────────────────────────────────────

export interface TagGroupProps
  extends
    Omit<
      PrimitiveTagGroupProps,
      "selectionMode" | "selectedKeys" | "defaultSelectedKeys" | "onSelectionChange"
    >,
    RefAttributes<HTMLDivElement> {
  /** Accessible label for the tag group (required for screen readers). */
  label: string;
  /** Visual size passed down to all child `Tag` components. */
  size?: "sm" | "md" | "lg";
  /**
   * Selection behaviour:
   * - `"none"` (default) — tags are not selectable.
   * - `"single"` — one tag selected at a time.
   * - `"multiple"` — any number of tags can be selected.
   *
   * Selection state is managed internally and is NOT delegated to React Aria,
   * so clicking the **tag body** has no effect on selection.
   * Only the `TagCheckbox` dot inside the tag responds to activation.
   */
  selectionMode?: "none" | "single" | "multiple";
  /** Initial selected keys (uncontrolled). */
  defaultSelectedKeys?: Iterable<React.Key>;
  /** Controlled selected keys. Pass `onSelectionChange` to keep in sync. */
  selectedKeys?: Iterable<React.Key>;
  /** Called with the full updated `Set` whenever selection changes. */
  onSelectionChange?: (keys: Set<React.Key>) => void;
}

/**
 * Wrapper that groups `Tag` components with shared selection and size context.
 * Built on React Aria's `TagGroup` — full keyboard navigation and ARIA handled.
 *
 * @example
 * ```tsx
 * <TagGroup label="Categories" size="md" selectionMode="multiple">
 *   <TagList>
 *     <Tag id="design">Design</Tag>
 *     <Tag id="eng">Engineering</Tag>
 *   </TagList>
 * </TagGroup>
 * ```
 */
export function TagGroup({
  label,
  selectionMode = "none",
  size = "sm",
  children,
  defaultSelectedKeys,
  selectedKeys: controlledKeys,
  onSelectionChange,
  ...otherProps
}: TagGroupProps): JSX.Element {
  // ── Own selection state ──────────────────────────────────────────────────
  // We manage selection ourselves so only the TagCheckbox dot area triggers
  // a change — clicking the tag body has no effect.
  // React Aria's TagGroup is rendered with selectionMode="none" so it does
  // not attach any press-to-select handler to the Tag elements.
  const [internalKeys, setInternalKeys] = useState<Set<React.Key>>(
    () => new Set(controlledKeys ?? defaultSelectedKeys ?? [])
  );

  const activeKeys: Set<React.Key> =
    controlledKeys !== undefined ? new Set(controlledKeys) : internalKeys;

  const toggleKey = (key: React.Key): void => {
    if (selectionMode === "none") return;
    const next = new Set(activeKeys);
    if (next.has(key)) {
      next.delete(key);
    } else {
      if (selectionMode === "single") next.clear();
      next.add(key);
    }
    setInternalKeys(next);
    onSelectionChange?.(next);
  };

  return (
    <TagGroupContext.Provider value={{ selectionMode, size, selectedKeys: activeKeys, toggleKey }}>
      {/* selectionMode="none" — prevents React Aria from making the whole Tag
          element a press target for selection toggling. */}
      <PrimitiveTagGroup aria-label={label} selectionMode="none" {...otherProps}>
        {children}
      </PrimitiveTagGroup>
    </TagGroupContext.Provider>
  );
}
TagGroup.displayName = "TagGroup";

// ── TagList ───────────────────────────────────────────────────────────────────
// Direct re-export of the React Aria primitive — consumers use it as a wrapper
// between TagGroup and the individual Tag items.

export const TagList = PrimitiveTagList;

// ── Tag ───────────────────────────────────────────────────────────────────────

export interface TagProps
  extends PrimitiveTagProps, RefAttributes<HTMLElement>, Omit<TagItem, "label" | "id"> {}

/**
 * Individual tag item. Must be rendered inside a `TagGroup` + `TagList`.
 * Supports avatar, dot indicator, count badge, and close button.
 *
 * @example
 * ```tsx
 * // Basic
 * <Tag id="react">React</Tag>
 *
 * // With count
 * <Tag id="issues" count={12}>Issues</Tag>
 *
 * // With close
 * <Tag id="label" onClose={(id) => removeTag(id)}>Closable</Tag>
 *
 * // With avatar
 * <Tag id="alice" avatarSrc="/avatars/alice.png">Alice</Tag>
 * ```
 */
export function Tag({
  id,
  avatarSrc,
  avatarContrastBorder = true,
  dot,
  dotClassName,
  isDisabled,
  count,
  className,
  children,
  onClose,
}: PropsWithChildren<TagProps>): JSX.Element {
  const { size, selectionMode, selectedKeys, toggleKey } = useContext(TagGroupContext);

  // Derive selection state from our own context (NOT from React Aria's render props)
  // because we pass selectionMode="none" to PrimitiveTagGroup.
  const isSelected = id !== undefined && selectedKeys.has(id);

  const hasAvatar = Boolean(avatarSrc);
  const hasDot = !hasAvatar && Boolean(dot);
  const hasCheckbox = selectionMode !== "none";
  const hasCount = typeof count === "number";

  return (
    <PrimitiveTag
      id={id}
      isDisabled={isDisabled}
      textValue={typeof children === "string" ? children : undefined}
      className={(state) =>
        cn(
          tagRootVariants({
            size,
            hasAvatar,
            hasDot,
            hasCheckbox,
            hasCount,
            hasClose: onClose !== undefined || state.allowsRemoving,
            isDisabled,
          }),
          state.isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {({ isDisabled: tagDisabled, allowsRemoving }) => (
        <>
          <div className={tagContentVariants({ size })}>
            {hasCheckbox && (
              <TagCheckbox
                size={size}
                isSelected={isSelected}
                isDisabled={tagDisabled}
                aria-label={typeof children === "string" ? `Select ${children}` : "Select"}
                onChange={() => {
                  if (id !== undefined) toggleKey(id);
                }}
              />
            )}

            {hasAvatar && (
              <TagAvatar src={avatarSrc} alt="Avatar" contrastBorder={avatarContrastBorder} />
            )}

            {hasDot && (
              <Dot size={size} className={cn("text-icon-success-secondary", dotClassName)} />
            )}

            {children}

            {hasCount && <span className={tagCountVariants({ size })}>{count}</span>}
          </div>

          {(onClose !== undefined || allowsRemoving) && (
            <TagCloseX
              size={size}
              excludeFromTabOrder={allowsRemoving}
              onPress={() => {
                if (id !== undefined) {
                  onClose?.(id.toString());
                }
              }}
            />
          )}
        </>
      )}
    </PrimitiveTag>
  );
}
Tag.displayName = "Tag";
