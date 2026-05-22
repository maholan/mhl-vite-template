"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import React from "react";
import { useDateFormatter } from "react-aria";
import {
  DatePicker as PrimitiveDatePicker,
  Dialog as PrimitiveDialog,
  Group as PrimitiveGroup,
  Popover as PrimitivePopover,
  type DatePickerProps as PrimitiveDatePickerProps,
  type DateValue,
} from "react-aria-components";

import { Calendar as CalendarIcon } from "@/components/ui/assets";
import { Button, type ButtonProps } from "@/components/ui/base/buttons";
import { cn } from "@/libs";

import { Calendar } from "../calendar";
import {
  datePickerCalendarWrapperVariants,
  datePickerDialogVariants,
  datePickerFooterVariants,
  datePickerPopoverVariants,
} from "./date-picker.variants";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DatePickerProps extends PrimitiveDatePickerProps<DateValue> {
  /** Called after the user confirms their selection with the Apply button. */
  onApply?: (value: DateValue | null) => void;
  /** Called when the user dismisses the picker without applying. */
  onCancel?: () => void;
  /** Size of the trigger button. Defaults to "sm". */
  size?: ButtonProps["size"];
  /** Color variant of the trigger button. Defaults to "secondary". */
  color?: ButtonProps["color"];
  /** Extra class names for the trigger button. */
  triggerClassName?: string;
  /**
   * Dates to mark with a highlight dot inside the calendar.
   * Defaults to today's date.
   */
  highlightedDates?: DateValue[];
  /** Popover placement. Defaults to "bottom right". */
  placement?: React.ComponentProps<typeof PrimitivePopover>["placement"];
}

// ── DatePicker ────────────────────────────────────────────────────────────────

/**
 * Date picker that opens a Calendar in a popover with Apply / Cancel footer.
 * Built on React Aria's DatePicker primitive + the MHL Calendar component.
 *
 * @example
 * ```tsx
 * <DatePicker />
 * <DatePicker size="md" color="primary" onApply={(v) => console.log(v)} />
 * <DatePicker minValue={today(getLocalTimeZone())} />
 * ```
 */
export function DatePicker({
  value: valueProp,
  defaultValue,
  onChange,
  onApply,
  onCancel,
  size = "sm",
  color = "secondary",
  triggerClassName,
  highlightedDates,
  placement = "bottom right",
  className,
  ...props
}: DatePickerProps): React.JSX.Element {
  const formatter = useDateFormatter({
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [value, setValue] = useControlledState(valueProp, defaultValue ?? null, onChange);

  const defaultHighlights = React.useMemo(() => [today(getLocalTimeZone())], []);
  const resolvedHighlights = highlightedDates ?? defaultHighlights;

  const formattedDate = value ? formatter.format(value.toDate(getLocalTimeZone())) : "Select date";

  return (
    <PrimitiveDatePicker
      aria-label="Date picker"
      shouldCloseOnSelect={false}
      {...props}
      value={value}
      onChange={setValue}
      className={cn(typeof className === "function" ? undefined : className)}
    >
      <PrimitiveGroup>
        <Button size={size} color={color} iconLeading={CalendarIcon} className={triggerClassName}>
          {formattedDate}
        </Button>
      </PrimitiveGroup>

      <PrimitivePopover
        offset={8}
        placement={placement}
        className={({ isEntering, isExiting }) =>
          datePickerPopoverVariants({
            state: isEntering ? "entering" : isExiting ? "exiting" : "idle",
          })
        }
      >
        <PrimitiveDialog aria-label="Date picker" className={datePickerDialogVariants()}>
          {({ close }) => (
            <>
              <div className={datePickerCalendarWrapperVariants()}>
                <Calendar highlightedDates={resolvedHighlights}>{null}</Calendar>
              </div>
              <div className={datePickerFooterVariants()}>
                <Button
                  size="md"
                  color="secondary"
                  onPress={() => {
                    onCancel?.();
                    close();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="md"
                  color="primary"
                  onPress={() => {
                    onApply?.(value);
                    close();
                  }}
                >
                  Apply
                </Button>
              </div>
            </>
          )}
        </PrimitiveDialog>
      </PrimitivePopover>
    </PrimitiveDatePicker>
  );
}
