import { cva, type VariantProps } from "class-variance-authority";

// ── Tag variants ──────────────────────────────────────────────────────────────
// All visual styles for the Tag compound component live here.
// Token classes follow the post-May 2026 property-specific namespace refactor.

// ── Tag root (the React Aria Tag element) ─────────────────────────────────────
// Base padding comes from the `size` variant.
// Leading / trailing content compound variants override the relevant side.

export const tagRootVariants = cva(
  [
    "flex cursor-default items-center rounded-md",
    "bg-primary text-secondary",
    "ring-1 ring-inset ring-primary",
    "transition duration-50 ease-linear",
    // Focus ring via isFocusVisible render prop applied outside CVA
  ],
  {
    variants: {
      size: {
        sm: "gap-0.75 px-2 py-0.75 text-xs font-medium leading-[18px]",
        md: "gap-0.75 px-2.25 py-0.5 text-sm font-medium",
        lg: "gap-0.75 px-2.5 py-1 text-sm font-medium",
      },
      hasAvatar: { true: "", false: "" },
      hasDot: { true: "", false: "" },
      hasCheckbox: { true: "", false: "" },
      hasCount: { true: "", false: "" },
      hasClose: { true: "", false: "" },
      isDisabled: { true: "cursor-not-allowed", false: "" },
    },
    compoundVariants: [
      // sm — left padding overrides
      { size: "sm", hasAvatar: true, className: "pl-1" },
      { size: "sm", hasDot: true, className: "pl-1.5" },
      { size: "sm", hasCheckbox: true, className: "pl-1.25" },
      // sm — right padding overrides
      { size: "sm", hasCount: true, className: "pr-1" },
      { size: "sm", hasClose: true, className: "pr-1" },
      // md — left padding overrides
      { size: "md", hasAvatar: true, className: "pl-1.25" },
      { size: "md", hasDot: true, className: "pl-1.75" },
      { size: "md", hasCheckbox: true, className: "pl-1" },
      // md — right padding overrides
      { size: "md", hasCount: true, className: "pr-0.75" },
      { size: "md", hasClose: true, className: "pr-1" },
      // lg — left padding overrides
      { size: "lg", hasAvatar: true, className: "pl-1.75" },
      { size: "lg", hasDot: true, className: "pl-2.25" },
      { size: "lg", hasCheckbox: true, className: "pl-1.25" },
      // lg — right padding overrides
      { size: "lg", hasCount: true, className: "pr-1" },
      { size: "lg", hasClose: true, className: "pr-1" },
    ],
    defaultVariants: {
      size: "sm",
      hasAvatar: false,
      hasDot: false,
      hasCheckbox: false,
      hasCount: false,
      hasClose: false,
      isDisabled: false,
    },
  }
);

export type TagRootVariantProps = VariantProps<typeof tagRootVariants>;

// ── Tag content wrapper (inner flex row with leading icon + label) ─────────────

export const tagContentVariants = cva(["flex items-center"], {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1.25",
      lg: "gap-1.5",
    },
  },
  defaultVariants: { size: "sm" },
});

export type TagContentVariantProps = VariantProps<typeof tagContentVariants>;

// ── Tag count badge ───────────────────────────────────────────────────────────

export const tagCountVariants = cva(
  ["flex items-center justify-center rounded-sm bg-tertiary text-center text-quaternary"],
  {
    variants: {
      size: {
        sm: "px-1 text-xs font-medium",
        md: "px-1.25 text-xs font-medium",
        lg: "px-1.5 text-sm font-medium",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

export type TagCountVariantProps = VariantProps<typeof tagCountVariants>;

// ── TagAvatar container ───────────────────────────────────────────────────────

export const tagAvatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
    "bg-tertiary",
    // Fixed size — avatar is always 16px inside a tag regardless of tag size
    "size-4",
  ],
  {
    variants: {
      contrastBorder: {
        true: "outline-[0.5px] -outline-offset-[0.5px] outline-black/16",
        false: "",
      },
    },
    defaultVariants: { contrastBorder: true },
  }
);

export type TagAvatarVariantProps = VariantProps<typeof tagAvatarVariants>;
