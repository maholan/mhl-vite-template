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

import { InputBase } from "@/components/ui/base/input";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { Tag, TagGroup, TagList } from "@/components/ui/base/tags";
import { cn } from "@/libs/utils";

import { inputTagOuterSizes, type InputTagOuterSize } from "./input-tag-outer.variants";

// ── Types ──────────────────────────────────────────────────────────────────────

interface TagEntry {
  id: number;
  label: string;
}

export interface InputTagsOuterProps {
  /** Label text displayed above the input. */
  label?: string;
  /** Helper text displayed below the tag list. */
  hint?: ReactNode;
  /** Tooltip message shown via the trailing help icon inside the input. */
  tooltip?: string;
  /**
   * Input size variant.
   * @default "md"
   */
  size?: InputTagOuterSize;
  /** Placeholder text for the input field. */
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
 * Tag input with the tag list rendered **below** the input field — in contrast
 * to `InputTags` which renders tags inline inside the field.
 *
 * Supports both controlled (`value` / `onChange`) and uncontrolled
 * (`defaultValue`) modes, optional validation, duplicate prevention, and a
 * maximum tag count.
 *
 * Keyboard behaviour:
 * - **Enter** — confirm the current text as a new tag
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <InputTagsOuter label="Tags" placeholder="Add tag…" defaultValue={["react"]} />
 *
 * // Controlled
 * <InputTagsOuter
 *   label="Recipients"
 *   value={tags}
 *   onChange={setTags}
 *   validate={(v) => v.includes("@")}
 * />
 * ```
 */
export const InputTagsOuter = ({
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
}: InputTagsOuterProps): JSX.Element => {
  const isControlled = value !== undefined;
  const idCounter = useRef(0);
  const nextId = (): number => idCounter.current++;

  const inputRef = useRef<HTMLInputElement>(null);

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

  const tags = entries.map((e: TagEntry) => e.label);

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
      onChange?.(newEntries.map((e: TagEntry) => e.label));
      onTagAdded?.(trimmed);
      return true;
    },
    [tags, entries, isControlled, allowDuplicates, maxTags, validate, onChange, onTagAdded]
  );

  const removeTag = useCallback(
    (id: number): void => {
      const entry = entries.find((e: TagEntry) => e.id === id);
      if (!entry) return;

      const newEntries = entries.filter((e: TagEntry) => e.id !== id);
      if (!isControlled) setInternalEntries(newEntries);
      onChange?.(newEntries.map((e: TagEntry) => e.label));
      onTagRemoved?.(entry.label);
    },
    [entries, isControlled, onChange, onTagRemoved]
  );

  const handleRemove = useCallback(
    (keys: Set<Key>): void => {
      for (const key of keys) removeTag(key as number);
    },
    [removeTag]
  );

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const current = inputRef.current;
    if (!current) return;
    if (addTag(current.value)) current.value = "";
  };

  const cfg = inputTagOuterSizes[size];

  return (
    <div className={cn("flex flex-col", cfg.gap, className)}>
      <div className="flex flex-col gap-1.5">
        {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

        <InputBase
          ref={inputRef}
          size={size === "sm" ? "md" : size}
          tooltip={tooltip}
          placeholder={placeholder}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      {entries.length > 0 && (
        <TagGroup label={label ?? "Tags"} size={cfg.tagSize} onRemove={handleRemove}>
          <TagList className="flex flex-wrap gap-1.5 focus:outline-hidden" items={entries}>
            {(item: TagEntry) => (
              <Tag id={item.id} isDisabled={isDisabled}>
                {item.label}
              </Tag>
            )}
          </TagList>
        </TagGroup>
      )}

      {hint && (
        <HintText isInvalid={isInvalid} className={cn(size === "sm" && "text-xs")}>
          {hint}
        </HintText>
      )}
    </div>
  );
};

InputTagsOuter.displayName = "InputTagsOuter";
