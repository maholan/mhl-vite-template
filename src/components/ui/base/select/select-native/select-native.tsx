"use client";

import { useId, type JSX, type SelectHTMLAttributes } from "react";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import { nativeSelectIconVariants, nativeSelectVariants } from "./select-native.variants";
import { IconChevronDown } from "../base/icons";

interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  hint?: string;
  selectClassName?: string;
  size?: "sm" | "md" | "lg";
  options: { label: string; value: string; disabled?: boolean }[];
}

export const NativeSelect = ({
  label,
  hint,
  options,
  className,
  selectClassName,
  size = "md",
  ...props
}: NativeSelectProps): JSX.Element => {
  const id = useId();
  const selectId = `select-native-${id}`;
  const hintId = `select-native-hint-${id}`;

  return (
    <div className={cn("w-full in-data-input-wrapper:w-max", className)}>
      {label && (
        <Label htmlFor={selectId} id={selectId} className="mb-1.5">
          {label}
        </Label>
      )}

      <div className="relative grid w-full items-center">
        <select
          {...props}
          id={selectId}
          aria-describedby={hintId}
          aria-labelledby={selectId}
          className={cn(nativeSelectVariants({ size }), selectClassName)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <IconChevronDown aria-hidden="true" className={nativeSelectIconVariants({ size })} />
      </div>

      {hint && (
        <HintText className="mt-2" id={hintId}>
          {hint}
        </HintText>
      )}
    </div>
  );
};

NativeSelect.displayName = "NativeSelect";
