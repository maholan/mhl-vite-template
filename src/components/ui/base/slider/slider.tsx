"use client";

import { type JSX, type ReactNode } from "react";
import {
  Label as PrimitiveLabel,
  Slider as PrimitiveSlider,
  SliderOutput as PrimitiveSliderOutput,
  SliderThumb as PrimitiveSliderThumb,
  SliderTrack as PrimitiveSliderTrack,
  type SliderProps as PrimitiveSliderProps,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import {
  sliderFillVariants,
  sliderOutputVariants,
  sliderRailVariants,
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  type SliderOutputVariantProps,
} from "./slider.variants";

export interface SliderProps
  extends Omit<PrimitiveSliderProps, "className">, SliderOutputVariantProps {
  /** Additional CSS class names applied to the slider root element. */
  className?: string;
  /**
   * Visible label rendered above the slider track.
   * Pass a string or ReactNode. When omitted, provide `aria-label` or
   * `aria-labelledby` on the `<Slider>` for screen-reader accessibility.
   */
  label?: ReactNode;
  /**
   * Position of the value label relative to the thumb.
   * - `"default"` — hidden (no label shown)
   * - `"bottom"` — displayed below the thumb
   * - `"top-floating"` — floating tooltip above the thumb
   * @default "default"
   */
  labelPosition?: SliderOutputVariantProps["labelPosition"];
  /**
   * Custom formatter for the thumb value label.
   * Receives the raw numeric value and returns the display string.
   * When omitted the slider uses `formatOptions` (default: percent).
   */
  labelFormatter?: (value: number) => string;
}

/**
 * Accessible single and range slider built on React Aria.
 * Supports a hidden label (default), a below-thumb label, or a
 * floating tooltip-style label above the thumb.
 *
 * @example
 * ```tsx
 * // Single thumb, hidden label
 * <Slider defaultValue={40} />
 *
 * // Single thumb, label below
 * <Slider defaultValue={40} labelPosition="bottom" />
 *
 * // Single thumb, floating tooltip
 * <Slider defaultValue={40} labelPosition="top-floating" />
 *
 * // Range slider (two thumbs)
 * <Slider defaultValue={[20, 80]} />
 *
 * // Custom label formatter
 * <Slider defaultValue={40} labelPosition="bottom" labelFormatter={(v) => `${v}px`} />
 * ```
 */
export function Slider({
  label,
  labelPosition = "default",
  minValue = 0,
  maxValue = 100,
  labelFormatter,
  formatOptions,
  className,
  ...props
}: SliderProps): JSX.Element {
  // Default format options: display as percentage (e.g. 40 → "40%").
  // getFormattedValue() expects a 0–1 fraction when style is "percent",
  // so callers must divide the raw value by (maxValue - minValue).
  const defaultFormatOptions: Intl.NumberFormatOptions = {
    style: "percent",
    maximumFractionDigits: 0,
  };

  return (
    <PrimitiveSlider
      {...props}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={formatOptions ?? defaultFormatOptions}
      className={cn(sliderRootVariants(), className)}
    >
      {/* Label — rendered when provided; omit when consumer uses aria-label */}
      {label !== undefined && label !== null && <PrimitiveLabel>{label}</PrimitiveLabel>}

      <PrimitiveSliderTrack className={sliderTrackVariants()}>
        {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
          // Single thumb: fill starts at 0. Range: fill starts at first thumb.
          const left = values.length === 1 ? 0 : getThumbPercent(0);
          const width = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - left;

          return (
            <>
              {/* Inactive rail */}
              <span className={sliderRailVariants()} />

              {/* Filled range — position driven by inline styles */}
              <span
                className={sliderFillVariants()}
                style={{
                  left: `${left * 100}%`,
                  width: `${width * 100}%`,
                }}
              />

              {/* One thumb per value (range sliders have two) */}
              {values.map((_, index) => (
                <PrimitiveSliderThumb key={index} index={index} className={sliderThumbVariants()}>
                  <PrimitiveSliderOutput className={sliderOutputVariants({ labelPosition })}>
                    {labelFormatter
                      ? labelFormatter(getThumbValue(index))
                      : getFormattedValue(getThumbValue(index) / (maxValue - minValue))}
                  </PrimitiveSliderOutput>
                </PrimitiveSliderThumb>
              ))}
            </>
          );
        }}
      </PrimitiveSliderTrack>
    </PrimitiveSlider>
  );
}

Slider.displayName = "Slider";
