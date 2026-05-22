import { cva, type VariantProps } from "class-variance-authority";

export const buttonGroupItemVariants = cva(
  [
    "group/item relative inline-flex cursor-pointer items-center justify-center",
    "bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeuomorphic",
    "ring-1 ring-primary ring-inset transition duration-100 ease-linear",
    "first:rounded-l-lg last:rounded-r-lg",
    "hover:z-10 hover:bg-secondary hover:text-primary",
    "focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "selected:bg-secondary selected:text-primary",
    "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "min-h-9 gap-1.5 px-3.5 text-sm",
        md: "min-h-10 gap-1.5 px-4 text-sm",
        lg: "min-h-11 gap-2 px-4.5 text-md",
      },
      iconOnly: {
        true: "",
        false: "",
      },
      hasIconLeading: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { size: "sm", iconOnly: true, className: "px-2.5" },
      { size: "md", iconOnly: true, className: "px-3" },
      { size: "lg", iconOnly: true, className: "px-3.5" },
      { size: "sm", hasIconLeading: true, className: "pl-3" },
      { size: "md", hasIconLeading: true, className: "pl-3.5" },
      { size: "lg", hasIconLeading: true, className: "pl-4" },
    ],
    defaultVariants: {
      size: "md",
      iconOnly: false,
      hasIconLeading: false,
    },
  }
);

export const buttonGroupItemIconVariants = cva(
  "pointer-events-none text-icon-quaternary transition-[inherit] group-hover/item:text-icon-tertiary group-selected/item:text-icon-tertiary",
  {
    variants: {
      size: {
        sm: "size-5",
        md: "size-5",
        lg: "size-5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export type ButtonGroupItemVariantProps = VariantProps<typeof buttonGroupItemVariants>;
export type ButtonGroupItemIconVariantProps = VariantProps<typeof buttonGroupItemIconVariants>;
