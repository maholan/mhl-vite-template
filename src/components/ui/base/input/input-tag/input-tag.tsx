"use client";

import {
  useCallback,
  useRef,
  useState,
  type JSX,
  type Key,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from "react";
import { Group as PrimitiveGroup, Input as PrimitiveInput } from "react-aria-components";

import { HelpCircle, InfoCircle } from "@/components/ui/assets";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { Tag, TagGroup, TagList } from "@/components/ui/base/tags";
import { Tooltip, TooltipTrigger } from "@/components/ui/base/tooltip/tooltip";
import { cn } from "@/libs/utils";

import {
  inputTagInputVariants,
  inputTagSizes,
  inputTagWrapperVariants,
  type InputTagSize,
} from "./input-tag.variants";

// ── Types ──────────────────────────────────────────────────────────────────────

interface TagEntry {
  id: number;
  label: string;
}

export interface InputTagsProps {
  /** Label text displayed above the input. */
  label?: string;
  /** Helper / error text displayed below the input. */
  hint?: ReactNode;
  /** Tooltip message shown via the trailing help icon. */
  tooltip?: string;
  /**
   * Input size variant.
   * @default "md"
   */
  size?: InputTagSize;
  /** Placeholder text shown when no tags are present. */
  placeholder?: string;
  /** Whether the field is required. */
  isRequired?: boolean;
  /** Whether the field is disabled. */
  isDisabled?: boolean;
  /** Whether the field is in an invalid / error state. */
  isInvalid?: boolean;
  /**
   * Whether duplicate tag values are allowed.
   * @default false
   */
  allowDuplicates?: boolean;
  /** Maximum number of tags. When reached, new tags are silently rejected. */
  maxTags?: number;
  /** Controlled tag array. */
  value?: string[];
  /** Initial tags for uncontrolled mode. */
  defaultValue?: string[];
  /** Called whenever the tag array changes. */
  onChange?: (tags: string[]) => void;
  /** Called when a tag is added. */
  onTagAdded?: (tag: string) => void;
  /** Called when a tag is removed. */
  onTagRemoved?: (tag: string) => void;
  /**
   * Custom validation for new tags.
   * Return `true` to accept, `false` to reject silently.
   */
  validate?: (value: string) => boolean;
  /** Additional CSS class names for the outer container. */
  className?: string;
  /** When `true`, suppresses the required indicator on the label. */
  hideRequiredIndicator?: boolean;
  /** Ref forwarded to the outer container div. */
  ref?: Ref<HTMLDivElement>;
}

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * Inline tag input — users type and press Enter to create removable tag chips
 * directly inside the field.
 *
 * Supports both controlled (`value` / `onChange`) and uncontrolled
 * (`defaultValue`) modes, optional validation, duplicate prevention, and a
 * maximum tag count.
 *
 * Keyboard behaviour:
 * - **Enter** — confirm the current text as a new tag
 * - **Backspace / ArrowLeft** at caret start — move focus to the last tag
 * - **ArrowRight** from the last tag — return focus to the input
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <InputTags label="Tags" placeholder="Add tag…" defaultValue={["react"]} />
 *
 * // Controlled
 * <InputTags
 *   label="Recipients"
 *   value={tags}
 *   onChange={setTags}
 *   validate={(v) => v.includes("@")}
 * />
 * ```
 */
export const InputTags = ({
  size = "md",
  label,
  hint,
  tooltip,
  placeholder,
  isRequired,
  isDisabled,
  isInvalid,
  allowDuplicates = false,
  maxTags,
  value,
  defaultValue,
  onChange,
  onTagAdded,
  onTagRemoved,
  validate,
  className,
  hideRequiredIndicator,
}: InputTagsProps): JSX.Element => {
  const isControlled = value !== undefined;
  const idCounter = useRef(0);
  const nextId = (): number => idCounter.current++;

  const inputRef = useRef<HTMLInputElement>(null);
  const tagGroupRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [internalEntries, setInternalEntries] = useState<TagEntry[]>(() =>
    (defaultValue ?? []).map((text) => ({ id: nextId(), label: text }))
  );

  // Stable ID reconciliation for controlled mode — prevents key churn when the
  // parent re-renders with the same tags in the same order.
  const prevControlledValue = useRef<string[]>([]);
  const controlledEntries = useRef<TagEntry[]>([]);

  const entries = (() => {
    if (!isControlled) return internalEntries;

    const prev = prevControlledValue.current;
    if (prev === value) return controlledEntries.current;

    const oldEntries = controlledEntries.current;
    const newEntries: TagEntry[] = [];
    const usedOldIndices = new Set<number>();

    for (const text of value) {
      const oldIndex = oldEntries.findIndex((e, i) => e.label === text && !usedOldIndices.has(i));
      if (oldIndex !== -1) {
        usedOldIndices.add(oldIndex);
        newEntries.push(oldEntries[oldIndex]);
      } else {
        newEntries.push({ id: nextId(), label: text });
      }
    }

    prevControlledValue.current = value;
    controlledEntries.current = newEntries;
    return newEntries;
  })();

  const tags = entries.map((e) => e.label);

  const addTag = useCallback(
    (text: string): boolean => {
      const trimmed = text.trim();
      if (!trimmed) return false;
      if (!allowDuplicates && tags.includes(trimmed)) return false;
      if (maxTags !== undefined && tags.length >= maxTags) return false;
      if (validate && !validate(trimmed)) return false;

      const newEntry: TagEntry = { id: nextId(), label: trimmed };
      const newEntries = [...entries, newEntry];

      if (!isControlled) setInternalEntries(newEntries);
      onChange?.(newEntries.map((e) => e.label));
      onTagAdded?.(trimmed);
      return true;
    },
    [tags, entries, isControlled, allowDuplicates, maxTags, validate, onChange, onTagAdded]
  );

  const removeTag = useCallback(
    (id: number): void => {
      const entry = entries.find((e) => e.id === id);
      if (!entry) return;

      const newEntries = entries.filter((e) => e.id !== id);
      if (!isControlled) setInternalEntries(newEntries);
      onChange?.(newEntries.map((e) => e.label));
      onTagRemoved?.(entry.label);
    },
    [entries, isControlled, onChange, onTagRemoved]
  );

  const handleRemove = useCallback(
    (keys: Set<Key>): void => {
      for (const key of keys) removeTag(key as number);
      if (entries.length - keys.size <= 0) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    },
    [removeTag, entries.length]
  );

  const focusLastTag = useCallback((): void => {
    const tagEls = tagGroupRef.current?.querySelectorAll<HTMLElement>('[role="row"]');
    tagEls?.[tagEls.length - 1]?.focus();
  }, []);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const input = event.currentTarget;
    const isCaretAtStart = input.selectionStart === 0 && input.selectionEnd === 0;

    switch (event.key) {
      case "Enter":
        event.preventDefault();
        if (addTag(inputValue)) setInputValue("");
        break;
      case "Backspace":
        if (isCaretAtStart && inputValue === "") {
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) removeTag(lastEntry.id);
        }
        break;
      case "ArrowLeft":
        if (isCaretAtStart) focusLastTag();
        break;
    }
  };

  const handleTagGroupKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== "ArrowRight") return;
    const tagEls = tagGroupRef.current?.querySelectorAll<HTMLElement>('[role="row"]');
    if (!tagEls?.length) return;
    const lastTag = tagEls[tagEls.length - 1];
    if (document.activeElement === lastTag || lastTag.contains(document.activeElement)) {
      inputRef.current?.focus();
    }
  };

  const isEmpty = entries.length === 0;
  const cfg = inputTagSizes[size];

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

      <PrimitiveGroup
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={({ isFocusWithin, isDisabled: groupDisabled, isInvalid: groupInvalid }) =>
          cn(
            inputTagWrapperVariants(),
            cfg.outer,
            !isEmpty && cfg.outerWithTags,
            // Invalid ring (unfocused)
            !groupDisabled && groupInvalid && "ring-error-secondary",
            // Focus ring — brand for valid, error for invalid
            isFocusWithin &&
              !groupDisabled &&
              (groupInvalid ? "ring-error ring-2" : "ring-brand ring-2")
          )
        }
      >
        {({ isDisabled: groupDisabled, isInvalid: groupInvalid }) => (
          <>
            {/* ── Tags + input row ── */}
            <div
              className={cn(
                "relative flex min-w-0 flex-1 flex-row flex-wrap items-center justify-start",
                cfg.inner
              )}
            >
              {!isEmpty && (
                <div ref={tagGroupRef} onKeyDown={handleTagGroupKeyDown} className="contents">
                  <TagGroup
                    label={label ?? "Tags"}
                    size={cfg.tagSize}
                    onRemove={handleRemove}
                    className="contents"
                  >
                    <TagList
                      className="flex flex-wrap gap-1.5 focus:outline-hidden"
                      items={entries}
                    >
                      {(item) => (
                        <Tag
                          id={item.id}
                          isDisabled={groupDisabled}
                          className="focus-visible:ring-brand focus-visible:ring-2 focus-visible:ring-offset-[-2px] focus-visible:outline-hidden"
                        >
                          {item.label}
                        </Tag>
                      )}
                    </TagList>
                  </TagGroup>
                </div>
              )}

              <PrimitiveInput
                ref={inputRef}
                type="text"
                value={inputValue}
                disabled={groupDisabled}
                aria-label={label ?? placeholder ?? "Add tag"}
                placeholder={isEmpty ? placeholder : undefined}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className={inputTagInputVariants()}
              />
            </div>

            {/* ── Trailing icon — tooltip (hidden when invalid) ── */}
            {tooltip && !groupInvalid && (
              <Tooltip title={tooltip} placement="top">
                <TooltipTrigger
                  className={cn(
                    "text-icon-quaternary shrink-0 cursor-pointer",
                    "transition duration-200",
                    "hover:text-icon-quaternary-hover focus-visible:text-icon-quaternary-hover",
                    "group-data-[disabled]:text-disable-subtle group-data-[disabled]:pointer-events-none"
                  )}
                  aria-label="More information"
                >
                  <HelpCircle className="size-4" />
                </TooltipTrigger>
              </Tooltip>
            )}

            {/* ── Trailing icon — error indicator ── */}
            {groupInvalid && (
              <span className="text-error-primary pointer-events-none shrink-0">
                <InfoCircle className="size-4" />
              </span>
            )}
          </>
        )}
      </PrimitiveGroup>

      {hint && (
        <HintText isInvalid={isInvalid} className={cn(size === "sm" && "text-xs")}>
          {hint}
        </HintText>
      )}
    </div>
  );
};

InputTags.displayName = "InputTags";
