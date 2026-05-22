import { cva, type VariantProps } from "class-variance-authority";

// ── HintText variants (CVA) ───────────────────────────────────────────────────
// All visual styles live here. hint-text.tsx contains only structure.
//
// NO `dark:` prefixes — every class references a semantic token from @maholan/tokens
// that resolves the correct value in both light and dark mode automatically.
//
// Token → Tailwind utility convention (Tailwind v4 @theme {} naming):
//   --color-fg-tertiary          → text-tertiary       (hint / description text)
//   --color-fg-error-primary     → text-error-primary  (error / invalid state)
//   --color-fg-disable-subtle    → text-disable-subtle (disabled state)
//
// Parent-state selectors use data attributes set by React Aria:
//   group-data-[invalid]  — parent Field is invalid  (React Aria sets data-invalid)
//   group-data-[disabled] — parent Field is disabled (React Aria sets data-disabled)
//
export const hintTextVariants = cva(
  [
    // Typography — matches the Untitled UI input hint scale
    // font-normal = weight/font-weight-regular; leading-5 = line-height/font-line-height-body-sm
    "text-sm font-normal leading-5",

    // Default color — fg-tertiary resolves to:
    //   light: gray-light-600  |  dark: gray-dark-400
    "text-tertiary",

    // Parent disabled state — React Aria writes data-disabled on the Field root.
    // Hint text dims to communicate non-interactive context.
    "group-data-[disabled]:text-disable-subtle",

    // Parent invalid state — React Aria writes data-invalid on the Field root.
    // Description-slot hint text tints red to reinforce the error context even
    // when it does not carry the error message itself.
    // (Error-message-slot text also inherits this via isInvalid → slot="errorMessage".)
    "group-data-[invalid]:text-error-primary",
  ],
  {
    variants: {
      // isInvalid drives both the React Aria slot AND the explicit color override.
      // When true the class is redundant with group-data-[invalid]:, but provides
      // correct color when HintText is rendered outside a React Aria Field wrapper.
      isInvalid: {
        true: "text-error-primary",
        false: "",
      },
    },
    defaultVariants: {
      isInvalid: false,
    },
  }
);

export type HintTextVariantProps = VariantProps<typeof hintTextVariants>;
