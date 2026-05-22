"use client";

import {
  endOfMonth,
  endOfWeek,
  getLocalTimeZone,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import React, { useMemo, useState } from "react";
import { useDateFormatter } from "react-aria";
import {
  DateRangePicker as PrimitiveDateRangePicker,
  Dialog as PrimitiveDialog,
  Group as PrimitiveGroup,
  Popover as PrimitivePopover,
  useLocale,
  type DateRangePickerProps as PrimitiveDateRangePickerProps,
  type DateValue,
} from "react-aria-components";

import { Calendar as CalendarIcon } from "@/components/ui/assets";
import { Button, type ButtonProps } from "@/components/ui/base/buttons";
import { InputDateBase } from "@/components/ui/base/input/input-date";
import { cn } from "@/libs";

import { RangeCalendar, RangePresetButton } from "../range-calendar";
import {
  dateRangePickerContentVariants,
  dateRangePickerDialogVariants,
  dateRangePickerFooterActionsVariants,
  dateRangePickerFooterVariants,
  dateRangePickerInputRowVariants,
  dateRangePickerInputSeparatorVariants,
  dateRangePickerPopoverVariants,
  dateRangePickerSidebarVariants,
} from "./date-range-picker.variants";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DateRangePickerProps extends PrimitiveDateRangePickerProps<DateValue> {
  /** Size of the trigger button. Defaults to "sm". */
  size?: ButtonProps["size"];
  /** Color variant of the trigger button. Defaults to "secondary". */
  color?: ButtonProps["color"];
  /** Extra class names for the trigger button. */
  triggerClassName?: string;
  /** Popover placement. Defaults to "bottom right". */
  placement?: React.ComponentProps<typeof PrimitivePopover>["placement"];
  /** Called after the user confirms their selection with the Apply button. */
  onApply?: (value: { start: DateValue; end: DateValue } | null) => void;
  /** Called when the user dismisses the picker without applying. */
  onCancel?: () => void;
}

// ── DateRangePicker ───────────────────────────────────────────────────────────

/**
 * Date range picker that opens a dual-month RangeCalendar in a popover.
 * Includes a sidebar of named presets, desktop date inputs, and Apply / Cancel footer.
 * Built on React Aria's DateRangePicker primitive + the MHL RangeCalendar component.
 *
 * @example
 * ```tsx
 * <DateRangePicker />
 * <DateRangePicker size="md" color="primary" onApply={(v) => console.log(v)} />
 * <DateRangePicker placement="bottom left" />
 * ```
 */
export function DateRangePicker({
  value: valueProp,
  defaultValue,
  onChange,
  onApply,
  onCancel,
  size = "sm",
  color = "secondary",
  triggerClassName,
  placement = "bottom right",
  className,
  ...props
}: DateRangePickerProps): React.JSX.Element {
  const { locale } = useLocale();

  const formatter = useDateFormatter({
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [value, setValue] = useControlledState(valueProp, defaultValue ?? null, onChange);
  const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

  const now = useMemo(() => today(getLocalTimeZone()), []);
  const defaultHighlights = useMemo(() => [today(getLocalTimeZone())], []);

  const presets = useMemo(
    () => ({
      today: { label: "Today", value: { start: now, end: now } },
      yesterday: {
        label: "Yesterday",
        value: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) },
      },
      thisWeek: {
        label: "This week",
        value: { start: startOfWeek(now, locale), end: endOfWeek(now, locale) },
      },
      lastWeek: {
        label: "Last week",
        value: {
          start: startOfWeek(now, locale).subtract({ weeks: 1 }),
          end: endOfWeek(now, locale).subtract({ weeks: 1 }),
        },
      },
      thisMonth: {
        label: "This month",
        value: { start: startOfMonth(now), end: endOfMonth(now) },
      },
      lastMonth: {
        label: "Last month",
        value: {
          start: startOfMonth(now).subtract({ months: 1 }),
          end: endOfMonth(now).subtract({ months: 1 }),
        },
      },
      thisYear: {
        label: "This year",
        value: {
          start: startOfMonth(now.set({ month: 1 })),
          end: endOfMonth(now.set({ month: 12 })),
        },
      },
      lastYear: {
        label: "Last year",
        value: {
          start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
          end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
        },
      },
      allTime: {
        label: "All time",
        value: { start: now.set({ year: 2000, month: 1, day: 1 }), end: now },
      },
    }),
    [locale, now]
  );

  const formattedStartDate = value?.start
    ? formatter.format(value.start.toDate(getLocalTimeZone()))
    : "Select date";
  const formattedEndDate = value?.end
    ? formatter.format(value.end.toDate(getLocalTimeZone()))
    : "Select date";

  return (
    <PrimitiveDateRangePicker
      aria-label="Date range picker"
      shouldCloseOnSelect={false}
      {...props}
      value={value}
      onChange={setValue}
      className={cn(typeof className === "function" ? undefined : className)}
    >
      <PrimitiveGroup>
        <Button size={size} color={color} iconLeading={CalendarIcon} className={triggerClassName}>
          {!value ? (
            <span className="text-placeholder">Select dates</span>
          ) : (
            `${formattedStartDate} – ${formattedEndDate}`
          )}
        </Button>
      </PrimitiveGroup>

      <PrimitivePopover
        offset={8}
        placement={placement}
        className={({ isEntering, isExiting }) =>
          dateRangePickerPopoverVariants({
            state: isEntering ? "entering" : isExiting ? "exiting" : "idle",
          })
        }
      >
        <PrimitiveDialog aria-label="Date range picker" className={dateRangePickerDialogVariants()}>
          {({ close }) => (
            <>
              {/* ── Preset sidebar (lg+) ─────────────────────────────────── */}
              <div className={dateRangePickerSidebarVariants()}>
                {Object.values(presets).map((preset) => (
                  <RangePresetButton
                    key={preset.label}
                    value={preset.value}
                    onClick={() => {
                      setValue(preset.value);
                      setFocusedValue(preset.value.start);
                    }}
                  >
                    {preset.label}
                  </RangePresetButton>
                ))}
              </div>

              {/* ── Calendar + footer ────────────────────────────────────── */}
              <div className={dateRangePickerContentVariants()}>
                <RangeCalendar
                  focusedValue={focusedValue ?? undefined}
                  onFocusChange={setFocusedValue}
                  highlightedDates={defaultHighlights}
                  presets={{
                    lastWeek: presets.lastWeek,
                    lastMonth: presets.lastMonth,
                    lastYear: presets.lastYear,
                  }}
                />

                <div className={dateRangePickerFooterVariants()}>
                  {/* Desktop date inputs */}
                  <div className={dateRangePickerInputRowVariants()}>
                    <InputDateBase slot="start" size="sm" />
                    <div className={dateRangePickerInputSeparatorVariants()}>–</div>
                    <InputDateBase slot="end" size="sm" />
                  </div>

                  {/* Action buttons */}
                  <div className={dateRangePickerFooterActionsVariants()}>
                    <Button
                      size="sm"
                      color="secondary"
                      onPress={() => {
                        onCancel?.();
                        close();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => {
                        onApply?.(value);
                        close();
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </PrimitiveDialog>
      </PrimitivePopover>
    </PrimitiveDateRangePicker>
  );
}
