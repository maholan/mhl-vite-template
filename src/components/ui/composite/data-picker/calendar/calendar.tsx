"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import React, { Fragment, useState, type PropsWithChildren, type ReactNode } from "react";
import {
  Calendar as PrimitiveCalendar,
  CalendarContext as PrimitiveCalendarContext,
  CalendarGrid as PrimitiveCalendarGrid,
  CalendarGridBody as PrimitiveCalendarGridBody,
  CalendarGridHeader as PrimitiveCalendarGridHeader,
  CalendarHeaderCell as PrimitiveCalendarHeaderCell,
  Heading as PrimitiveHeading,
  useSlottedContext,
  type CalendarProps as PrimitiveCalendarProps,
  type DateValue,
} from "react-aria-components";

import { ChevronLeft, ChevronRight } from "@/components/ui/assets";
import { Button } from "@/components/ui/base/buttons/button";
import { InputDateBase } from "@/components/ui/base/input/input-date";
import { cn } from "@/libs";

import { CalendarCell } from "../base";
import {
  calendarGridBodyVariants,
  calendarGridHeaderVariants,
  calendarHeaderVariants,
  calendarHeadingVariants,
  calendarRootVariants,
  calendarShortcutRowVariants,
  calendarWeekdayLabelVariants,
} from "./calendar.variants";

// ── Context provider ──────────────────────────────────────────────────────────

export function CalendarContextProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [value, onChange] = useState<DateValue | null>(null);
  const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

  return (
    <PrimitiveCalendarContext.Provider value={{ value, onChange, focusedValue, onFocusChange }}>
      {children}
    </PrimitiveCalendarContext.Provider>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CalendarProps extends PrimitiveCalendarProps<DateValue> {
  /** Dates to mark with a highlight dot (e.g. events). */
  highlightedDates?: DateValue[];
  /**
   * Slot rendered between the month header and the grid.
   * Defaults to a date input + "Today" button row.
   */
  children?: ReactNode;
}

// ── Calendar ──────────────────────────────────────────────────────────────────

export function Calendar({
  highlightedDates,
  className,
  children,
  ...props
}: CalendarProps): React.JSX.Element {
  const context = useSlottedContext(PrimitiveCalendarContext);

  // Auto-wrap with a context provider when no parent has already provided one
  const ContextWrapper = context ? Fragment : CalendarContextProvider;

  return (
    <ContextWrapper>
      <PrimitiveCalendar
        {...props}
        className={(state) =>
          cn(calendarRootVariants(), typeof className === "function" ? className(state) : className)
        }
      >
        {({ state }) => (
          <>
            {/* ── Month navigation header ─────────────────────────────────── */}
            <div className={calendarHeaderVariants()}>
              <Button
                slot="previous"
                iconLeading={ChevronLeft}
                size="sm"
                color="tertiary"
                className="size-8"
              />
              <PrimitiveHeading className={calendarHeadingVariants()} />
              <Button
                slot="next"
                iconLeading={ChevronRight}
                size="sm"
                color="tertiary"
                className="size-8"
              />
            </div>

            {/* ── Input + Today row (or consumer-provided children) ───────── */}
            {children !== undefined ? (
              children
            ) : (
              <div className={calendarShortcutRowVariants()}>
                <InputDateBase aria-label="Date" size="sm" className="flex-1" />
                <Button
                  slot={null}
                  size="sm"
                  color="secondary"
                  onPress={() => {
                    const todayDate = today(getLocalTimeZone());
                    state.setValue(todayDate);
                    state.setFocusedDate(todayDate);
                  }}
                >
                  Today
                </Button>
              </div>
            )}

            {/* ── Calendar grid ───────────────────────────────────────────── */}
            <PrimitiveCalendarGrid weekdayStyle="short" className="w-max">
              <PrimitiveCalendarGridHeader className={calendarGridHeaderVariants()}>
                {(day) => (
                  <PrimitiveCalendarHeaderCell className="p-0">
                    <div className={calendarWeekdayLabelVariants()}>{day.slice(0, 2)}</div>
                  </PrimitiveCalendarHeaderCell>
                )}
              </PrimitiveCalendarGridHeader>

              <PrimitiveCalendarGridBody className={calendarGridBodyVariants()}>
                {(date) => (
                  <CalendarCell
                    date={date}
                    isHighlighted={highlightedDates?.some((d) => date.compare(d) === 0)}
                  />
                )}
              </PrimitiveCalendarGridBody>
            </PrimitiveCalendarGrid>
          </>
        )}
      </PrimitiveCalendar>
    </ContextWrapper>
  );
}
