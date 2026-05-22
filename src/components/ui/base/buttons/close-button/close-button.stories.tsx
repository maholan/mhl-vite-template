
import { CloseButton } from "./close-button";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Buttons/CloseButton",
  component: CloseButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible close/dismiss button built on React Aria.",
          "",
          "Renders an inline SVG × icon (no icon library dependency).",
          "Supports 4 sizes (`xs` → `lg`) and 2 themes (`light` / `dark`).",
          "",
          '`"use client"` is handled internally — safe to import in Next.js Server Components.',
          "",
          "**Roadmap:** The inline SVG × will be replaced with `@maholan/icons` once that package is available.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Controls the button and icon dimensions.",
      table: { defaultValue: { summary: "sm" } },
    },
    theme: {
      control: "radio",
      options: ["light", "dark"],
      description: "Light uses gray tones; dark uses white/translucent tones for dark backgrounds.",
      table: { defaultValue: { summary: "light" } },
    },
    label: {
      control: "text",
      description: 'Accessible label for screen readers. Defaults to `"Close"`.',
    },
    isDisabled: {
      control: "boolean",
      description: "Disables all interactions.",
    },
  },
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Themes ────────────────────────────────────────────────────────────────────

export const Light: Story = {
  args: { size: "sm", theme: "light" },
};

export const Dark: Story = {
  args: { size: "sm", theme: "dark" },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-gray-900 p-4">
        <Story />
      </div>
    ),
  ],
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const CloseButtonSizeXs: Story = {
  name: "Size xs (28 px)",
  args: { size: "xs" },
};

export const CloseButtonSizeSm: Story = {
  name: "Size sm (36 px)",
  args: { size: "sm" },
};

export const CloseButtonSizeMd: Story = {
  name: "Size md (40 px)",
  args: { size: "md" },
};

export const CloseButtonSizeLg: Story = {
  name: "Size lg (44 px)",
  args: { size: "lg" },
};

// ── States ────────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { size: "sm", isDisabled: true },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", minWidth: 320 }}>
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
          Light theme — xs / sm / md / lg
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <CloseButton size="xs" theme="light" label="Close xs" />
          <CloseButton size="sm" theme="light" label="Close sm" />
          <CloseButton size="md" theme="light" label="Close md" />
          <CloseButton size="lg" theme="light" label="Close lg" />
        </div>
      </section>

      <section
        style={{
          background: "#1d2939",
          padding: "1rem",
          borderRadius: 8,
        }}
      >
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
            color: "white",
          }}
        >
          Dark theme — xs / sm / md / lg
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <CloseButton size="xs" theme="dark" label="Close xs" />
          <CloseButton size="sm" theme="dark" label="Close sm" />
          <CloseButton size="md" theme="dark" label="Close md" />
          <CloseButton size="lg" theme="dark" label="Close lg" />
        </div>
      </section>
    </div>
  ),
};
