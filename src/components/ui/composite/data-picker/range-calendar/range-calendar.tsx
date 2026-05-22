"use client";

import React, { Fragment, useState, type HTMLAttributes, type PropsWithChildren } from "react";
import { useDateFormatter } from "react-aria";
import {
  CalendarGrid as PrimitiveCalendarGrid,
  CalendarGridBody as PrimitiveCalendarGridBody,
  CalendarGridHeader as PrimitiveCalendarGridHeader,
  CalendarHeaderCell as PrimitiveCalendarHeaderCell,
  RangeCalendar as PrimitiveRangeCalendar,
  RangeCalendarContext,
  RangeCalendarStateContext,
  useSlottedContext,
  type DateValue,
  type RangeCalendarProps as PrimitiveRangeCalendarProps,
} from "react-aria-components";

import { ChevronLeft, ChevronRight } from "@/components/ui/assets";
import { Button } from "@/components/ui/base/buttons/button";
import { InputDateBase } from "@/components/ui/base/input/input-date";
import { cn, useBreakpoint } from "@/libs";

import { CalendarCell } from "../base";
import {
  rangeCalendarGridBodyVariants,
  rangeCalendarGridHeaderVariants,
  rangeCalendarHeaderVariants,
  rangeCalendarHeadingVariants,
  rangeCalendarInputRowVariants,
  rangeCalendarInputSeparatorVariants,
  rangeCalendarPanelVariants,
  rangeCalendarPresetsRowVariants,
  rangeCalendarRootVariants,
  rangeCalendarWeekdayLabelVariants,
  rangePresetButtonVariants,
} from "./range-calendar.variants";

import type { CalendarDate } from "@internationalized/date";
import type { VariantProps } from "class-variance-authority";

// ── Context provider ──────────────────────────────────────────────────────────

export function RangeCalendarContextProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [value, onChange] = useState<{ start: DateValue; end: DateValue } | null>(null);
  const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

  return (
    <RangeCalendarContext.Provider value={{ value, onChange, focusedValue, onFocusChange }}>
      {children}
    </RangeCalendarContext.Provider>
  );
}

// ── Internal heading (reads from RangeCalendarStateContext) ───────────────────

function RangeCalendarTitle({ part }: { part: "start" | "end" }): React.JSX.Element {
  const context = React.useContext(RangeCalendarStateContext);

  if (!context) {
    throw new Error("<RangeCalendarTitle /> must be used within a <RangeCalendar />.");
  }

  const formatter = useDateFormatter({
    month: "long",
    year: "numeric",
    calendar: context.visibleRange.start.calendar.identifier,
    timeZone: context.timeZone,
  });

  const date =
    part === "start"
      ? context.visibleRange.start.toDate(context.timeZone)
      : context.visibleRange.end.toDate(context.timeZone);

  return <>{formatter.format(date)}</>;
}

// ── Shared CalendarGrid ───────────────────────────────────────────────────────

function RangeCalendarGrid({
  offset,
  showOutOfRangeDates,
  highlightedDates,
}: {
  offset?: { months: number };
  showOutOfRangeDates?: boolean;
  highlightedDates?: DateValue[];
}): React.JSX.Element {
  return (
    <PrimitiveCalendarGrid weekdayStyle="short" offset={offset} className="w-max">
      <PrimitiveCalendarGridHeader className={rangeCalendarGridHeaderVariants()}>
        {(day) => (
          <PrimitiveCalendarHeaderCell className="p-0">
            <div className={rangeCalendarWeekdayLabelVariants()}>{day.slice(0, 2)}</div>
          </PrimitiveCalendarHeaderCell>
        )}
      </PrimitiveCalendarGridHeader>

      <PrimitiveCalendarGridBody className={rangeCalendarGridBodyVariants()}>
        {(date) => (
          <CalendarCell
            date={date}
            showOutOfRangeDates={showOutOfRangeDates}
            isHighlighted={highlightedDates?.some((d) => date.compare(d) === 0)}
          />
        )}
      </PrimitiveCalendarGridBody>
    </PrimitiveCalendarGrid>
  );
}

// ── Preset button (sidebar / desktop) ────────────────────────────────────────

export interface RangePresetButtonProps
  extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof rangePresetButtonVariants> {
  /** The date range this preset sets when clicked. */
  value: { start: DateValue; end: DateValue };
}

export function RangePresetButton({
  value,
  className,
  children,
  ...props
}: RangePresetButtonProps): React.JSX.Element {
  const context = useSlottedContext(RangeCalendarContext);

  const isSelected =
    context?.value?.start?.compare(value.start) === 0 &&
    context?.value?.end?.compare(value.end) === 0;

  return (
    <button {...props} className={cn(rangePresetButtonVariants({ isSelected }), className)}>
      {children}
    </button>
  );
}

// ── Mobile-only preset button (uses RangeCalendarStateContext to setValue) ────

function MobilePresetButton({
  value,
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  value: { start: DateValue; end: DateValue };
}): React.JSX.Element {
  const context = React.useContext(RangeCalendarStateContext);

  return (
    <Button
      {...props}
      slot={null}
      size="sm"
      color="link-color"
      onPress={() => {
        context?.setValue(value);
        context?.setFocusedDate(value.start as CalendarDate);
      }}
    >
      {children}
    </Button>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RangeCalendarProps extends PrimitiveRangeCalendarProps<DateValue> {
  /** Dates to mark with a highlight dot (e.g. events). */
  highlightedDates?: DateValue[];
  /**
   * Named presets displayed as quick-select buttons.
   * On mobile they appear inline below the date inputs.
   * On desktop they are hidden unless `showPresetsOnDesktop` is true.
   */
  presets?: Record<string, { label: string; value: { start: DateValue; end: DateValue } }>;
  /** Whether to render dates outside the current month. Defaults to `false`. */
  showOutOfRangeDates?: boolean;
  /**
   * Show preset buttons on desktop as well as mobile.
   * Useful when the calendar is embedded inline (not inside a date-range picker).
   */
  showPresetsOnDesktop?: boolean;
}

// ── RangeCalendar ─────────────────────────────────────────────────────────────

/**
 * Accessible range calendar built on React Aria.
 * Shows one month on mobile and two months side-by-side on desktop.
 * Supports highlight dots, named presets, and controlled/uncontrolled modes.
 *
 * @example
 * ```tsx
 * <RangeCalendar aria-label="Select date range" />
 *
 * <RangeCalendar
 *   presets={{
 *     week: { label: "This week", value: { start: weekStart, end: weekEnd } },
 *   }}
 * />
 * ```
 */
export function RangeCalendar({
  presets,
  visibleDuration,
  showOutOfRangeDates = false,
  showPresetsOnDesktop = false,
  highlightedDates,
  className,
  ...props
}: RangeCalendarProps): React.JSX.Element {
  const isDesktop = useBreakpoint("md");
  const context = useSlottedContext(RangeCalendarContext);

  const ContextWrapper = context ? Fragment : RangeCalendarContextProvider;

  const visibleMonths = visibleDuration?.months ?? (isDesktop ? 2 : 1);
  const isDualPane = visibleMonths > 1;

  return (
    <ContextWrapper>
      <PrimitiveRangeCalendar
        {...props}
        visibleDuration={{ months: visibleMonths }}
        className={(state) =>
          cn(
            rangeCalendarRootVariants(),
            typeof className === "function" ? className(state) : className
          )
        }
      >
        {/* ── Left / single panel ─────────────────────────────────────────── */}
        <div className={rangeCalendarPanelVariants({ side: "left" })}>
          {/* Nav header — prev button always here; next button here only for single-month */}
          <div
            className={rangeCalendarHeaderVariants({
              align: isDualPane ? "start" : "between",
            })}
          >
            <Button
              slot="previous"
              iconLeading={ChevronLeft}
              size="sm"
              color="tertiary"
              className="size-8"
            />
            <span className={rangeCalendarHeadingVariants()}>
              <RangeCalendarTitle part="start" />
            </span>
            {!isDualPane && (
              <Button
                slot="next"
                iconLeading={ChevronRight}
                size="sm"
                color="tertiary"
                className="size-8"
              />
            )}
          </div>

          {/* Mobile date inputs */}
          {!isDesktop && (
            <div className={rangeCalendarInputRowVariants()}>
              <InputDateBase slot="start" size="sm" className="flex-1" />
              <div className={rangeCalendarInputSeparatorVariants()}>–</div>
              <InputDateBase slot="end" size="sm" className="flex-1" />
            </div>
          )}

          {/* Preset buttons (mobile always; desktop only if showPresetsOnDesktop) */}
          {(showPresetsOnDesktop || !isDesktop) && presets && (
            <div className={rangeCalendarPresetsRowVariants()}>
              {Object.values(presets).map((preset) => (
                <MobilePresetButton key={preset.label} value={preset.value}>
                  {preset.label}
                </MobilePresetButton>
              ))}
            </div>
          )}

          <RangeCalendarGrid
            showOutOfRangeDates={showOutOfRangeDates}
            highlightedDates={highlightedDates}
          />
        </div>

        {/* ── Right panel (dual-pane only) ─────────────────────────────────── */}
        {isDualPane && (
          <div className={rangeCalendarPanelVariants({ side: "right" })}>
            <div className={rangeCalendarHeaderVariants({ align: "end" })}>
              <span className={rangeCalendarHeadingVariants()}>
                <RangeCalendarTitle part="end" />
              </span>
              <Button
                slot="next"
                iconLeading={ChevronRight}
                size="sm"
                color="tertiary"
                className="size-8"
              />
            </div>

            <RangeCalendarGrid
              offset={{ months: 1 }}
              showOutOfRangeDates={showOutOfRangeDates}
              highlightedDates={highlightedDates}
            />
          </div>
        )}
      </PrimitiveRangeCalendar>
    </ContextWrapper>
  );
}
