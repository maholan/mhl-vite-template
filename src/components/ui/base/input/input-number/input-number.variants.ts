import { cva, type VariantProps } from "class-variance-authority";

// ── Wrapper (Group) variants ───────────────────────────────────────────────────

export const inputNumberWrapperVariants = cva(
  [
    "relative flex w-full flex-row items-stretch",
    "rounded-lg bg-primary shadow-xs overflow-hidden",
    "ring-1 ring-primary ring-inset",
    "outline-hidden transition-shadow duration-100 ease-linear",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ],
  { variants: {}, defaultVariants: {} }
);

export type InputNumberWrapperVariantProps = VariantProps<typeof inputNumberWrapperVariants>;

// ── Size configuration lookup ──────────────────────────────────────────────────

export const inputNumberSizes = {
  sm: { input: "px-3 py-2 text-sm", stepper: "w-7", chevron: "size-3 stroke-3" },
  md: { input: "px-3 py-2 text-sm", stepper: "w-7", chevron: "size-3 stroke-3" },
  lg: { input: "px-3.5 py-2.5 text-base", stepper: "w-7.5", chevron: "size-3.5 stroke-[2.57px]" },
} as const;

export type InputNumberSize = keyof typeof inputNumberSizes;

// ── Inner input element variants ───────────────────────────────────────────────

export const inputNumberInputVariants = cva([
  "m-0 w-full bg-transparent outline-hidden ring-0",
  // ≥16px prevents iOS Safari auto-zoom on focus
  "text-base text-primary placeholder:text-placeholder",
  "autofill:rounded-lg autofill:text-primary",
  "disabled:cursor-not-allowed disabled:text-disable",
]);

// ── Stepper button variants ────────────────────────────────────────────────────

export const inputNumberStepperButtonVariants = cva([
  "flex flex-1 cursor-pointer items-center justify-center",
  "text-icon-quaternary outline-hidden",
  "transition duration-100 ease-linear",
  " hover:text-icon-quaternary-hover",
  "focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[-2px]",
  "disabled:cursor-not-allowed disabled:opacity-50",
]);
