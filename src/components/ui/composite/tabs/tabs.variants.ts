import { cva, type VariantProps } from "class-variance-authority";

// ── Tabs variants ──────────────────────────────────────────────────────────────
// All visual styles for the Tabs compound component live here.
// tabs.tsx contains only structure + logic.
//
// Figma ref: node-id=376-5225 (horizontal), 376-5440 (vertical), 376-5008 (tab button)

// ── Root ───────────────────────────────────────────────────────────────────────

export const tabsRootVariants = cva(["flex w-full"], {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// ── TabList wrapper ────────────────────────────────────────────────────────────
// The visual container that holds all tab triggers.

export const tabListVariants = cva(["group flex"], {
  variants: {
    type: {
      "button-brand": "gap-1",
      "button-gray": "gap-1",
      "button-border": "gap-1 rounded-[10px] bg-secondary p-1 ring-1 ring-primary ring-inset",
      "button-minimal": "gap-0.5 rounded-lg bg-secondary ring-1 ring-primary ring-inset",
      underline: "gap-3",
      line: "gap-1",
    },
    size: {
      sm: "",
      md: "data-[type=button-border]:rounded-xl data-[type=button-border]:p-1.5",
    },
    orientation: {
      horizontal: "",
      vertical: "w-max flex-col",
    },
    fullWidth: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [{ type: "underline", fullWidth: true, class: "w-full gap-4" }],
  defaultVariants: {
    type: "button-brand",
    size: "sm",
    orientation: "horizontal",
    fullWidth: false,
  },
});

// ── Tab trigger ────────────────────────────────────────────────────────────────
// Base shared classes for every tab trigger button.

export const tabVariants = cva(
  [
    "z-10 flex h-max cursor-pointer items-center justify-center",
    "rounded-md whitespace-nowrap",
    "font-semibold text-icon-quaternary",
    "transition-all duration-150 ease-linear",
    // vertical orientation: left-align content
    "group-orientation-vertical:justify-start",
  ],
  {
    variants: {
      size: {
        sm: "gap-1 text-sm",
        md: "gap-1.5 text-sm",
      },
      type: {
        "button-brand": "px-3 py-2",
        "button-gray": "px-3 py-2",
        "button-border": "px-3 py-2",
        "button-minimal": "px-3 py-2 rounded-lg",
        underline: "rounded-none px-1 pb-3 pt-0.5",
        line: "rounded-none pl-3 pr-3.5 py-0.5",
      },
      fullWidth: {
        true: "w-full flex-1",
        false: "",
      },
    },
    compoundVariants: [
      { size: "md", type: "button-brand", class: "py-2.5" },
      { size: "md", type: "button-gray", class: "py-2.5" },
      { size: "md", type: "button-border", class: "py-2.5" },
      { size: "md", type: "button-minimal", class: "py-2.5" },
      { size: "md", type: "underline", class: "pb-3 pt-0.5" },
      { size: "md", type: "line", class: "pl-3 pr-3.5 py-1" },
    ],
    defaultVariants: {
      size: "sm",
      type: "button-brand",
      fullWidth: false,
    },
  }
);

// ── Tab panel ──────────────────────────────────────────────────────────────────

export const tabPanelVariants = cva([
  "outline-none",
  "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
]);

// ── Exported types ─────────────────────────────────────────────────────────────

export type TabsRootVariantProps = VariantProps<typeof tabsRootVariants>;
export type TabListVariantProps = VariantProps<typeof tabListVariants>;
export type TabVariantProps = VariantProps<typeof tabVariants>;

export type TabOrientation = NonNullable<TabsRootVariantProps["orientation"]>;
export type TabSize = NonNullable<TabVariantProps["size"]>;

// Horizontal-only types
export type HorizontalTabType =
  | "button-brand"
  | "button-gray"
  | "button-border"
  | "button-minimal"
  | "underline";
// Vertical-only types
export type VerticalTabType =
  | "button-brand"
  | "button-gray"
  | "button-border"
  | "button-minimal"
  | "line";
// All types union
export type TabType = HorizontalTabType | VerticalTabType;
