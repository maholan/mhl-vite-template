import React from "react";

import { Button, type LinkButtonProps } from "./button";

import type { Meta, StoryObj } from "@storybook/react";

// ── Inline placeholder icons — no external icon library required ──────────────
function PlusIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible button component rebuilt from Untitled UI with MHL design tokens.",
          "",
          "Built on **React Aria** for full keyboard and screen reader support.",
          "Supports 8 color variants, 5 sizes (sm → 2xl), library-agnostic icon slots,",
          "loading state, and href-based link rendering (renders as `<a>` when `href` is provided).",
          "",
          '`"use client"` is handled internally — safe to import in Next.js Server Components.',
          "",
          "**Key differences from Untitled UI source:**",
          "- Tokens replaced with MHL equivalents (`bg-brand-600` instead of `bg-brand-solid`)",
          "- `isFocusVisible` and `isPressed` via React Aria render props (keyboard ring + scale micro-interaction)",
          "- `2xl` size added to complete the MHL 5-size scale",
          "- `isReactComponent` inlined — no `@/utils/is-react-component` dependency",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "link-gray",
        "link-color",
        "primary-destructive",
        "secondary-destructive",
        "tertiary-destructive",
        "link-destructive",
      ],
      description: "Visual color variant following the Untitled UI button color system.",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      description: "Height and padding following the Untitled UI 4 px base grid.",
      table: { defaultValue: { summary: "sm" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disables all interactions and applies reduced-opacity disabled style.",
    },
    isLoading: {
      control: "boolean",
      description:
        "Shows a spinning loader replacing the leading icon slot and disables the button.",
    },
    showTextWhileLoading: {
      control: "boolean",
      description: "When `isLoading` is true, keeps the label visible beside the spinner.",
    },
    noTextPadding: {
      control: "boolean",
      description:
        "Removes horizontal padding from the inner text span. Set automatically for link variants.",
    },
    children: { control: "text" },
    iconLeading: { control: false },
    iconTrailing: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Color variants ────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { children: "Button CTA", size: "md" },
};

export const Secondary: Story = {
  args: { color: "secondary", children: "Button CTA", size: "md" },
};

export const Tertiary: Story = {
  args: { color: "tertiary", children: "Button CTA", size: "md" },
};

export const LinkGray: Story = {
  name: "Link (gray)",
  args: { color: "link-gray", children: "Learn more", size: "md" },
};

export const LinkColor: Story = {
  name: "Link (color)",
  args: { color: "link-color", children: "Learn more", size: "md" },
};

export const PrimaryDestructive: Story = {
  name: "Primary destructive",
  args: { color: "primary-destructive", children: "Delete account", size: "md" },
};

export const SecondaryDestructive: Story = {
  name: "Secondary destructive",
  args: { color: "secondary-destructive", children: "Delete account", size: "md" },
};

export const TertiaryDestructive: Story = {
  name: "Tertiary destructive",
  args: { color: "tertiary-destructive", children: "Delete account", size: "md" },
};

export const LinkDestructive: Story = {
  name: "Link destructive",
  args: { color: "link-destructive", children: "Delete account", size: "md" },
};

// ── States ────────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { children: "Button CTA", size: "md", isDisabled: true },
};

export const Loading: Story = {
  args: { children: "Saving…", size: "md", isLoading: true },
};

export const LoadingWithText: Story = {
  name: "Loading (text visible)",
  args: { children: "Saving…", size: "md", isLoading: true, showTextWhileLoading: true },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const SmallSize: Story = {
  args: { size: "sm", children: "Small" },
};

export const MediumSize: Story = {
  args: { size: "md", children: "Medium" },
};

export const LargeSize: Story = {
  args: { size: "lg", children: "Large" },
};

export const ExtraLarge: Story = {
  args: { size: "xl", children: "Extra Large" },
};

export const DoubleExtraLarge: Story = {
  name: "2XL size",
  args: { size: "2xl", children: "2XL — MHL addition" },
};

// ── Icon slots ────────────────────────────────────────────────────────────────

export const WithLeadingIconFC: Story = {
  name: "With leading icon (FC)",
  args: { children: "Add item", iconLeading: PlusIcon, size: "md" },
};

export const WithLeadingIconNode: Story = {
  name: "With leading icon (ReactNode)",
  args: { children: "Add item", iconLeading: <PlusIcon />, size: "md" },
};

export const WithTrailingIcon: Story = {
  args: {
    color: "secondary",
    children: "Continue",
    iconTrailing: ArrowRightIcon,
    size: "md",
  },
};

export const IconOnly: Story = {
  name: "Icon only",
  args: { iconLeading: PlusIcon, size: "md" },
};

// ── Link rendering ────────────────────────────────────────────────────────────

export const AsLink: StoryObj<LinkButtonProps> = {
  name: "Renders as <a>",
  args: { color: "link-color", children: "Go to dashboard", href: "#", size: "md" },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: "All colors",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", minWidth: 600 }}>
      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Standard
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button color="primary" size="md">
            Primary
          </Button>
          <Button color="secondary" size="md">
            Secondary
          </Button>
          <Button color="tertiary" size="md">
            Tertiary
          </Button>
          <Button color="link-gray" size="md">
            Link gray
          </Button>
          <Button color="link-color" size="md">
            Link color
          </Button>
        </div>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Destructive
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button color="primary-destructive" size="md">
            Primary
          </Button>
          <Button color="secondary-destructive" size="md">
            Secondary
          </Button>
          <Button color="tertiary-destructive" size="md">
            Tertiary
          </Button>
          <Button color="link-destructive" size="md">
            Link
          </Button>
        </div>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Sizes (primary)
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="2xl">2XL</Button>
        </div>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Icon slots & states
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button size="md" iconLeading={PlusIcon}>
            Add item
          </Button>
          <Button size="md" color="secondary" iconTrailing={ArrowRightIcon}>
            Continue
          </Button>
          <Button size="md" iconLeading={PlusIcon} />
          <Button size="md" isLoading>
            Saving…
          </Button>
          <Button size="md" isLoading showTextWhileLoading>
            Processing…
          </Button>
          <Button size="md" isDisabled>
            Disabled
          </Button>
        </div>
      </section>
    </div>
  ),
};
