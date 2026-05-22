import { cva, type VariantProps } from "class-variance-authority";

export const avatarRootVariants = cva("relative inline-flex shrink-0 rounded-[7px]", {
  variants: {
    size: {
      xxs: "size-4",
      xs: "size-6",
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
      xl: "size-14",
      "2xl": "size-16",
    },
    rounded: {
      true: "rounded-full",
      false: "",
    },
    border: {
      true: "ring-1 ring-secondary-alt",
      false: "",
    },
    focusable: {
      true: "outline-transparent group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-focus-ring",
      false: "",
    },
  },
  compoundVariants: [
    { size: "xxs", border: true, className: "p-px" },
    { size: "xs", border: true, className: "p-px" },
    { size: "sm", border: true, className: "p-px" },
    { size: "md", border: true, className: "p-px" },
    { size: "lg", border: true, className: "p-[1.5px]" },
    { size: "xl", border: true, className: "p-0.5" },
    { size: "2xl", border: true, className: "p-0.5" },
  ],
  defaultVariants: {
    size: "md",
    rounded: true,
    border: false,
    focusable: false,
  },
});

export const avatarContentVariants = cva(
  [
    "relative inline-flex size-full shrink-0 items-center justify-center",
    "overflow-hidden rounded-md bg-tertiary",
    "outline-[0.5px] -outline-offset-[0.5px] outline-black/16",
  ],
  {
    variants: {
      rounded: {
        true: "rounded-full",
        false: "",
      },
      withImage: {
        true: "before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/32 before:mask-[linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)]",
        false: "",
      },
    },
    defaultVariants: {
      rounded: true,
      withImage: false,
    },
  }
);

export const avatarInitialsVariants = cva("text-quaternary", {
  variants: {
    size: {
      xxs: "text-[7px] font-bold leading-none",
      xs: "text-xs font-semibold",
      sm: "text-sm font-semibold",
      md: "text-md font-semibold",
      lg: "text-lg font-semibold",
      xl: "text-xl font-semibold",
      "2xl": "text-display-xs font-semibold",
    },
  },
  defaultVariants: { size: "md" },
});

export const avatarIconVariants = cva("text-icon-quaternary", {
  variants: {
    size: {
      xxs: "size-2.5",
      xs: "size-4",
      sm: "size-5",
      md: "size-6",
      lg: "size-7",
      xl: "size-8",
      "2xl": "size-8",
    },
  },
  defaultVariants: { size: "md" },
});

export type AvatarRootVariantProps = VariantProps<typeof avatarRootVariants>;
export type AvatarContentVariantProps = VariantProps<typeof avatarContentVariants>;
export type AvatarInitialsVariantProps = VariantProps<typeof avatarInitialsVariants>;
export type AvatarIconVariantProps = VariantProps<typeof avatarIconVariants>;
