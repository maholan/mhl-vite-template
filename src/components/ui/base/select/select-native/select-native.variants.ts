import { cva, type VariantProps } from "class-variance-authority";

export const nativeSelectVariants = cva(
  [
    "appearance-none rounded-lg bg-primary font-medium text-primary shadow-xs",
    "ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset",
    "placeholder:text-placeholder focus-visible:ring-2 focus-visible:ring-brand-500",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // InputGroup context
    "in-data-input-wrapper:flex in-data-input-wrapper:h-full in-data-input-wrapper:gap-1",
    "in-data-input-wrapper:bg-inherit in-data-input-wrapper:px-3 in-data-input-wrapper:py-2",
    "in-data-input-wrapper:font-normal in-data-input-wrapper:text-tertiary",
    "in-data-input-wrapper:shadow-none in-data-input-wrapper:ring-transparent",
    "in-data-input-wrapper:in-data-[size=sm]:text-sm",
    "in-data-input-wrapper:group-disabled:pointer-events-none in-data-input-wrapper:group-disabled:cursor-not-allowed in-data-input-wrapper:group-disabled:bg-transparent",
    "in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-trailing:rounded-l-none",
    "in-data-input-wrapper:in-data-[input-size=lg]:py-2.5 in-data-input-wrapper:in-data-[input-size=md]:py-2 in-data-input-wrapper:in-data-[input-size=md]:pl-3 in-data-input-wrapper:in-data-[input-size=sm]:text-sm",
    "in-data-input-wrapper:in-data-leading:pr-4.5 in-data-input-wrapper:in-data-leading:in-data-[input-size=lg]:pl-3.5 in-data-input-wrapper:in-data-leading:in-data-[input-size=md]:pr-4.5 in-data-input-wrapper:in-data-leading:in-data-[input-size=md]:pl-3 in-data-input-wrapper:in-data-leading:in-data-[input-size=sm]:pr-3.5",
    "in-data-input-wrapper:in-data-trailing:in-data-[input-size=lg]:pr-8 in-data-input-wrapper:in-data-trailing:in-data-[input-size=md]:pr-7.5 in-data-input-wrapper:in-data-trailing:in-data-[input-size=sm]:pr-6.5",
  ],
  {
    variants: {
      size: {
        sm: "py-2 pl-3 text-sm",
        md: "py-2 pl-3 text-md",
        lg: "py-2.5 px-3.5 text-md",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const nativeSelectIconVariants = cva(
  [
    "pointer-events-none absolute text-icon-quaternary",
    "in-data-input-wrapper:right-0 in-data-input-wrapper:size-4 in-data-input-wrapper:stroke-[2.625px]",
    "in-data-input-wrapper:in-data-trailing:in-data-[input-size=md]:right-3 in-data-input-wrapper:in-data-trailing:in-data-[input-size=sm]:right-3",
  ],
  {
    variants: {
      size: {
        sm: "size-4 right-2.5 stroke-[2.25px]",
        md: "size-4 stroke-[2.25px] right-3",
        lg: "size-5 right-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export type NativeSelectVariantProps = VariantProps<typeof nativeSelectVariants>;
export type NativeSelectIconVariantProps = VariantProps<typeof nativeSelectIconVariants>;
