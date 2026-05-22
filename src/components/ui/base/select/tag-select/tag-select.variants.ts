import { cva, type VariantProps } from "class-variance-authority";

export const tagSelectGroupVariants = cva(
  [
    "relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset",
    "*:data-icon:shrink-0 *:data-icon:text-icon-quaternary",
  ],
  {
    variants: {
      isFocusWithin: {
        true: "ring-2 ring-brand",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: { isFocusWithin: false, isDisabled: false },
  }
);

export const tagSelectTagVariants = cva(
  "flex min-w-0 items-center rounded-md bg-primary ring-1 ring-primary ring-inset",
  {
    variants: {
      size: {
        sm: "px-1 py-0.75",
        md: "py-0.5 pr-1 pl-1.25",
        lg: "py-0.5 pr-1 pl-1.25",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

export const tagSelectTagLabelVariants = cva(
  "truncate font-medium whitespace-nowrap text-secondary select-none",
  {
    variants: {
      size: {
        sm: "ml-1 text-xs",
        md: "ml-1.25 text-sm",
        lg: "ml-1.25 text-sm",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

export const tagSelectInputVariants = cva(
  "w-full flex-[1_0_0] appearance-none bg-transparent text-ellipsis text-primary caret-alpha-black/90 outline-hidden placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-md",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

export type TagSelectGroupVariantProps = VariantProps<typeof tagSelectGroupVariants>;
export type TagSelectTagVariantProps = VariantProps<typeof tagSelectTagVariants>;
export type TagSelectInputVariantProps = VariantProps<typeof tagSelectInputVariants>;
