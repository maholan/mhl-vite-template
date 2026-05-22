import React from "react";

import { Badge, BadgeIcon, BadgeWithButton, BadgeWithDot, BadgeWithIcon } from "./badge";

import type { Meta, StoryObj } from "@storybook/react";

// ── Internal story icon ───────────────────────────────────────────────────────
// Simple inline SVG so stories have zero icon-library dependency.

function StarIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Badges/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible badge components for status indicators, tags, and labels.",
          "",
          "Five components cover the full Untitled UI badge pattern:",
          "- **`Badge`** — plain text badge",
          "- **`BadgeWithDot`** — badge with a leading status dot",
          "- **`BadgeWithIcon`** — badge with leading/trailing icon slots (any `ReactNode`)",
          "- **`BadgeWithButton`** — dismissible badge with close button",
          "- **`BadgeIcon`** — icon-only badge (requires `aria-label`)",
          "",
          "All components share the same `variant`, `color`, `size`, and `shape` props.",
          "",
          "**No `dark:` prefixes** — semantic `utility-*` tokens auto-handle dark mode.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["soft", "outline", "solid", "modern"],
      table: { defaultValue: { summary: "soft" } },
    },
    color: {
      control: "select",
      options: [
        "gray",
        "brand",
        "error",
        "warning",
        "success",
        "indigo",
        "purple",
        "pink",
        "orange",
        "cerulean",
        "fuchsia",
        "green",
        "yellow",
      ],
      table: { defaultValue: { summary: "gray" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    shape: {
      control: "select",
      options: ["pill", "badge"],
      table: { defaultValue: { summary: "pill" } },
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Badge ─────────────────────────────────────────────────────────────────────

export const Default: Story = { args: { children: "Badge" } };

export const SoftGray: Story = {
  name: "Soft / Gray",
  args: { variant: "soft", color: "gray", children: "Gray" },
};
export const SoftBrand: Story = {
  name: "Soft / Brand",
  args: { variant: "soft", color: "brand", children: "Brand" },
};
export const SoftError: Story = {
  name: "Soft / Error",
  args: { variant: "soft", color: "error", children: "Error" },
};
export const SoftWarning: Story = {
  name: "Soft / Warning",
  args: { variant: "soft", color: "warning", children: "Warning" },
};
export const SoftSuccess: Story = {
  name: "Soft / Success",
  args: { variant: "soft", color: "success", children: "Success" },
};

export const OutlineBrand: Story = {
  name: "Outline / Brand",
  args: { variant: "outline", color: "brand", children: "Brand" },
};
export const SolidBrand: Story = {
  name: "Solid / Brand",
  args: { variant: "solid", color: "brand", children: "Brand" },
};
export const ModernBadge: Story = {
  name: "Modern",
  args: { variant: "modern", color: "gray", children: "Modern" },
};

// ── All colours × variants ────────────────────────────────────────────────────

export const AllColors: Story = {
  name: "All colours (soft)",
  args: { children: "" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          "gray",
          "brand",
          "error",
          "warning",
          "success",
          "indigo",
          "purple",
          "pink",
          "orange",
          "cerulean",
          "fuchsia",
          "green",
          "yellow",
        ] as const
      ).map((color) => (
        <Badge key={color} color={color} variant="soft">
          {color}
        </Badge>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All variants (brand)",
  args: { children: "" },
  render: () => (
    <div className="flex items-center gap-3">
      <Badge color="brand" variant="soft">
        Soft
      </Badge>
      <Badge color="brand" variant="outline">
        Outline
      </Badge>
      <Badge color="brand" variant="solid">
        Solid
      </Badge>
      <Badge color="gray" variant="modern">
        Modern
      </Badge>
    </div>
  ),
};

// ── BadgeWithDot ──────────────────────────────────────────────────────────────

export const WithDot: Story = {
  name: "With dot (all colours)",
  args: { children: "" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["gray", "brand", "error", "warning", "success"] as const).map((color) => (
        <BadgeWithDot key={color} color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </BadgeWithDot>
      ))}
    </div>
  ),
};

// ── BadgeWithIcon ─────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: "With leading icon",
  args: { children: "" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["soft", "outline", "solid"] as const).map((variant) => (
        <BadgeWithIcon
          key={variant}
          color="brand"
          variant={variant}
          leadingIcon={<StarIcon className="size-3" />}
        >
          Featured
        </BadgeWithIcon>
      ))}
    </div>
  ),
};

export const WithTrailingIcon: Story = {
  name: "With trailing icon",
  args: { children: "" },
  render: () => (
    <BadgeWithIcon color="success" variant="soft" trailingIcon={<CheckIcon className="size-3" />}>
      Verified
    </BadgeWithIcon>
  ),
};

// ── BadgeWithButton ───────────────────────────────────────────────────────────

export const Dismissible: Story = {
  name: "Dismissible (all variants)",
  args: { children: "" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["soft", "outline", "solid", "modern"] as const).map((variant) => (
        <BadgeWithButton key={variant} color="brand" variant={variant} buttonLabel="Remove badge">
          New feature
        </BadgeWithButton>
      ))}
    </div>
  ),
};

// ── BadgeIcon ─────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: "Icon only (all variants)",
  args: { children: "" },
  render: () => (
    <div className="flex gap-2">
      {(["soft", "outline", "solid"] as const).map((variant) => (
        <BadgeIcon
          key={variant}
          color="brand"
          variant={variant}
          icon={<StarIcon className="size-3" />}
          aria-label="Featured"
        />
      ))}
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: "All sizes",
  args: { children: "" },
  render: () => (
    <div className="flex items-center gap-3">
      <Badge color="brand" size="sm">
        Small
      </Badge>
      <Badge color="brand" size="md">
        Medium
      </Badge>
      <Badge color="brand" size="lg">
        Large
      </Badge>
    </div>
  ),
};

// ── Shapes ────────────────────────────────────────────────────────────────────

export const Shapes: Story = {
  name: "Pill vs Badge shape",
  args: { children: "" },
  render: () => (
    <div className="flex gap-3">
      <Badge color="brand" shape="pill">
        Pill
      </Badge>
      <Badge color="brand" shape="badge">
        Badge
      </Badge>
    </div>
  ),
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Variants */}
      <div>
        <p className="mb-2 text-xs font-medium text-tertiary">Variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge color="brand" variant="soft">
            Soft
          </Badge>
          <Badge color="brand" variant="outline">
            Outline
          </Badge>
          <Badge color="brand" variant="solid">
            Solid
          </Badge>
          <Badge color="gray" variant="modern">
            Modern
          </Badge>
        </div>
      </div>

      {/* Semantic colours */}
      <div>
        <p className="mb-2 text-xs font-medium text-tertiary">Semantic colours (soft)</p>
        <div className="flex flex-wrap gap-2">
          <Badge color="gray">Gray</Badge>
          <Badge color="brand">Brand</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="success">Success</Badge>
        </div>
      </div>

      {/* Extended colours */}
      <div>
        <p className="mb-2 text-xs font-medium text-tertiary">Extended colours (soft)</p>
        <div className="flex flex-wrap gap-2">
          <Badge color="indigo">Indigo</Badge>
          <Badge color="purple">Purple</Badge>
          <Badge color="pink">Pink</Badge>
          <Badge color="orange">Orange</Badge>
          <Badge color="cerulean">Cerulean</Badge>
          <Badge color="fuchsia">Fuchsia</Badge>
          <Badge color="green">Green</Badge>
          <Badge color="yellow">Yellow</Badge>
        </div>
      </div>

      {/* Composition patterns */}
      <div>
        <p className="mb-2 text-xs font-medium text-tertiary">Composition</p>
        <div className="flex flex-wrap items-center gap-2">
          <BadgeWithDot color="success">Active</BadgeWithDot>
          <BadgeWithDot color="error">Offline</BadgeWithDot>
          <BadgeWithIcon color="brand" leadingIcon={<StarIcon className="size-3" />}>
            Featured
          </BadgeWithIcon>
          <BadgeWithButton color="brand" buttonLabel="Remove tag">
            New feature
          </BadgeWithButton>
          <BadgeIcon
            color="success"
            icon={<CheckIcon className="size-3" />}
            aria-label="Verified"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-xs font-medium text-tertiary">Sizes</p>
        <div className="flex items-center gap-2">
          <Badge color="brand" size="sm">
            Small
          </Badge>
          <Badge color="brand" size="md">
            Medium
          </Badge>
          <Badge color="brand" size="lg">
            Large
          </Badge>
        </div>
      </div>
    </div>
  ),
};
