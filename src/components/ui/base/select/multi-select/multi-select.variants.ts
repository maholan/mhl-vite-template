import { cva, type VariantProps } from "class-variance-authority";

export const multiSelectTriggerVariants = cva(
  [
    "relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs",
    "ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset",
  ],
  {
    variants: {
      isFocused: {
        true: "ring-2 ring-brand",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: { isFocused: false, isDisabled: false },
  }
);

export const multiSelectSearchWrapperVariants = cva("border-b border-secondary", {
  variants: {
    size: {
      sm: "py-1",
      md: "py-0.5",
      lg: "py-0.5",
    },
  },
  defaultVariants: { size: "md" },
});

export const multiSelectSearchRowVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "px-3 py-2 gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]",
      md: "px-3 py-2 gap-2 *:data-icon:size-5",
      lg: "px-3.5 py-2.5 gap-2 *:data-icon:size-5",
    },
  },
  defaultVariants: { size: "md" },
});

export const multiSelectSearchInputVariants = cva(
  "w-full appearance-none bg-transparent text-primary caret-alpha-black/90 outline-hidden placeholder:text-placeholder",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-md",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const multiSelectListBoxVariants = cva("overflow-y-auto py-1 outline-hidden", {
  variants: {
    size: {
      sm: "max-h-68",
      md: "max-h-76",
      lg: "max-h-92",
    },
  },
  defaultVariants: { size: "md" },
});

export type MultiSelectTriggerVariantProps = VariantProps<typeof multiSelectTriggerVariants>;
export type MultiSelectSearchInputVariantProps = VariantProps<
  typeof multiSelectSearchInputVariants
>;
export type MultiSelectListBoxVariantProps = VariantProps<typeof multiSelectListBoxVariants>;
