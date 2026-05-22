import { cva, type VariantProps } from "class-variance-authority";

export const selectTriggerVariants = cva(
  [
    "relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs",
    "ring-1 outline-hidden transition duration-100 ease-linear",
    "*:data-icon:shrink-0 *:data-icon:text-icon-quaternary",
  ],
  {
    variants: {
      size: {
        sm: "py-2 pl-3 pr-2.5 gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]",
        md: "py-2 px-3 gap-2 *:data-icon:size-5",
        lg: "py-2.5 px-3.5 gap-2 *:data-icon:size-5",
      },
      isFocused: {
        true: "ring-2 ring-brand-500 ring-inset",
        false: "ring-inset ring-primary",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: { size: "md", isFocused: false, isDisabled: false },
  }
);

export const selectValueVariants = cva(
  "flex h-max w-full items-center justify-start truncate text-left align-middle",
  {
    variants: {
      size: {
        sm: "gap-x-1.5 text-sm",
        md: "gap-x-1.5 text-md",
        lg: "gap-x-1.5 text-md",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const selectChevronVariants = cva("ml-auto shrink-0 text-icon-quaternary", {
  variants: {
    size: {
      sm: "size-4 stroke-[2.25px]",
      md: "size-4 stroke-[2.25px]",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
});

export type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;
export type SelectValueVariantProps = VariantProps<typeof selectValueVariants>;
export type SelectChevronVariantProps = VariantProps<typeof selectChevronVariants>;
