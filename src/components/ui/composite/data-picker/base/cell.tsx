"use client";

import { getDayOfWeek, getLocalTimeZone, isToday } from "@internationalized/date";
import React from "react";
import {
  CalendarCell as PrimitiveCalendarCell,
  RangeCalendarContext,
  useLocale,
  useSlottedContext,
  type CalendarCellProps as PrimitiveCalendarCellProps,
} from "react-aria-components";

import { cn } from "@/libs";

interface CalendarCellProps extends PrimitiveCalendarCellProps {
  /** Whether the cell carries a highlight dot (e.g. has events). */
  isHighlighted?: boolean;
  /** Whether to render out-of-month dates; hidden by default in range calendars. */
  showOutOfRangeDates?: boolean;
}

export function CalendarCell({
  date,
  isHighlighted,
  showOutOfRangeDates = false,
  ...props
}: CalendarCellProps): React.JSX.Element {
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const rangeCalendarContext = useSlottedContext(RangeCalendarContext);

  const isRangeCalendar = !!rangeCalendarContext;

  const start = rangeCalendarContext?.value?.start;
  const end = rangeCalendarContext?.value?.end;

  // Range position helpers
  const isAfterStart = start ? date.compare(start) > 0 : true;
  const isBeforeEnd = end ? date.compare(end) < 0 : true;
  const isInRange =
    (start ? date.compare(start) >= 0 : false) && (end ? date.compare(end) <= 0 : false);

  // Month-boundary helpers for range gradient overflow
  const lastDayOfMonth = new Date(date.year, date.month, 0).getDate();
  const isLastDayOfMonth = date.day === lastDayOfMonth;
  const isFirstDayOfMonth = date.day === 1;

  const isTodayDate = isToday(date, getLocalTimeZone());

  return (
    <PrimitiveCalendarCell
      {...props}
      date={date}
      className={({
        isDisabled,
        isFocusVisible,
        isSelectionStart,
        isSelectionEnd,
        isSelected,
        isOutsideMonth,
      }) => {
        // Figma align prop: Left = selection start or week start, Right = selection end or week end
        const isRoundedLeft = isSelectionStart || dayOfWeek === 0;
        const isRoundedRight = isSelectionEnd || dayOfWeek === 6;

        return cn(
          // Base — 40×40 cell, stacking context for pseudo-elements
          "relative size-10 cursor-pointer focus:outline-hidden",

          // Range background — fills the full cell width
          isSelected && isRangeCalendar && !isDisabled && "bg-active",
          isInRange && isDisabled && "bg-disable-subtle",
          isSelected && isRangeCalendar && isDisabled && "bg-disable-subtle",

          // Corner rounding for range ends and week boundaries (Figma align=Left/Right)
          isRoundedLeft && "rounded-l-full",
          isRoundedRight && "rounded-r-full",

          isTodayDate && !isSelected && "bg-brand-primary rounded-full",

          // Interaction states for focus z-ordering
          isFocusVisible ? "z-10" : "z-0",

          // Out-of-month fading
          isOutsideMonth && "opacity-50",
          isRangeCalendar && isOutsideMonth && !showOutOfRangeDates && "hidden",
          isDisabled && "pointer-events-none",

          // Month-boundary gradient — smooths range background across page edges
          isLastDayOfMonth &&
            isSelected &&
            isBeforeEnd &&
            isRangeCalendar &&
            "after:to-active after:absolute after:inset-0 after:translate-x-full after:bg-gradient-to-l after:from-transparent in-[[role=gridcell]:last-child]:after:hidden",

          isFirstDayOfMonth &&
            isSelected &&
            isAfterStart &&
            isRangeCalendar &&
            "after:to-active after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent in-[[role=gridcell]:first-child]:after:hidden"
        );
      }}
    >
      {({
        isDisabled,
        isFocusVisible,
        isSelectionStart,
        isSelectionEnd,
        isSelected,
        formattedDate,
      }) => {
        // "Selected" in Figma = selection start or end dot (brand-solid fill)
        const isSelectionEdge =
          isSelectionStart || isSelectionEnd || (isSelected && !isDisabled && !isRangeCalendar);

        // "Active" in Figma = in-range but not an edge
        const isActive = isSelected && isRangeCalendar && !isSelectionStart && !isSelectionEnd;

        return (
          <div
            className={cn(
              // Inner circle — always full-round
              "relative flex size-full items-center justify-center rounded-full text-sm",

              // Focus ring — keyboard only (React Aria isFocusVisible)
              isFocusVisible && "outline-brand-500 outline-2 outline-offset-2",

              // Default text color (Figma text/secondary)
              "text-secondary",

              // Disabled — muted text, no pointer
              isDisabled && "text-disable opacity-50",

              // Active (in-range) — medium weight, secondary-hover text on hover
              isActive && !isDisabled && "font-medium",

              // Hover for non-selected, non-today cells
              !isSelected &&
                !isDisabled &&
                !isTodayDate &&
                "hover:bg-primary-hover hover:font-medium",

              // Today's date — brand-primary bg when not selected; hover uses brand-secondary
              !isSelected && isTodayDate && "text-secondary hover:bg-brand-secondary font-medium",

              // Selection edge (start / end / single) — brand-solid fill, white text
              isSelectionEdge && [
                "bg-brand-solid text-on-brand-primary font-medium",
                "hover:bg-brand-solid-hover",
              ]
            )}
          >
            {formattedDate}

            {/* Highlight / today dot */}
            {(isHighlighted === true || isTodayDate) && (
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full",
                  isSelectionEdge ? "bg-white" : "bg-icon-brand-primary",
                  isDisabled && "opacity-50"
                )}
              />
            )}
          </div>
        );
      }}
    </PrimitiveCalendarCell>
  );
}
