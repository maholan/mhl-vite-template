import React from "react";

import { RadioButton, RadioButtonBase, RadioGroup } from "./radio";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible radio group built on React Aria. " +
          "Wraps `RadioButton` items and provides keyboard navigation, " +
          "group labelling, and invalid/disabled state propagation. " +
          "Supports vertical (default) and horizontal orientations, two sizes.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "sm" } },
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      table: { defaultValue: { summary: "vertical" } },
    },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { "aria-label": "Subscription plan", defaultValue: "free" },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="free" label="Free" hint="Up to 3 projects." />
      <RadioButton value="pro" label="Pro" hint="Unlimited projects." />
      <RadioButton value="enterprise" label="Enterprise" hint="Custom limits." />
    </RadioGroup>
  ),
};

export const SizeMd: Story = {
  name: "Size: md",
  args: { "aria-label": "Plan", size: "md", defaultValue: "free" },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="free" label="Free" hint="Up to 3 projects." />
      <RadioButton value="pro" label="Pro" hint="Unlimited projects." />
      <RadioButton value="enterprise" label="Enterprise" hint="Custom limits." />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: { "aria-label": "Gender", orientation: "horizontal", defaultValue: "male" },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="male" label="Male" />
      <RadioButton value="female" label="Female" />
      <RadioButton value="other" label="Other" />
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  args: { "aria-label": "Plan", isInvalid: true },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="free" label="Free" />
      <RadioButton value="pro" label="Pro" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { "aria-label": "Plan", isDisabled: true, defaultValue: "free" },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="free" label="Free" />
      <RadioButton value="pro" label="Pro" />
    </RadioGroup>
  ),
};

export const PartiallyDisabled: Story = {
  name: "Partially disabled",
  args: { "aria-label": "Plan", defaultValue: "free" },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="free" label="Free" hint="Up to 3 projects." />
      <RadioButton value="pro" label="Pro (unavailable)" hint="Contact sales." isDisabled />
      <RadioButton value="enterprise" label="Enterprise" hint="Custom limits." />
    </RadioGroup>
  ),
};

export const NoLabel: Story = {
  name: "No label / hint (indicators only)",
  args: { "aria-label": "Option", defaultValue: "a" },
  render: (args) => (
    <RadioGroup {...args} orientation="horizontal">
      <RadioButton value="a" aria-label="Option A" />
      <RadioButton value="b" aria-label="Option B" />
      <RadioButton value="c" aria-label="Option C" />
    </RadioGroup>
  ),
};

// ── AllVariants showcase ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
        minWidth: 380,
      }}
    >
      {/* Size sm — vertical */}
      <section>
        <p style={headingStyle}>sm / vertical (default)</p>
        <RadioGroup aria-label="Plan sm" defaultValue="free">
          <RadioButton value="free" label="Free" hint="Up to 3 projects." />
          <RadioButton value="pro" label="Pro" hint="Unlimited projects." />
          <RadioButton value="enterprise" label="Enterprise" hint="Custom limits." />
        </RadioGroup>
      </section>

      {/* Size md — vertical */}
      <section>
        <p style={headingStyle}>md / vertical</p>
        <RadioGroup aria-label="Plan md" defaultValue="free" size="md">
          <RadioButton value="free" label="Free" hint="Up to 3 projects." />
          <RadioButton value="pro" label="Pro" hint="Unlimited projects." />
          <RadioButton value="enterprise" label="Enterprise" hint="Custom limits." />
        </RadioGroup>
      </section>

      {/* Horizontal */}
      <section>
        <p style={headingStyle}>horizontal</p>
        <RadioGroup aria-label="Gender" defaultValue="male" orientation="horizontal">
          <RadioButton value="male" label="Male" />
          <RadioButton value="female" label="Female" />
          <RadioButton value="other" label="Other" />
        </RadioGroup>
      </section>

      {/* Invalid */}
      <section>
        <p style={headingStyle}>invalid</p>
        <RadioGroup aria-label="Plan invalid" isInvalid>
          <RadioButton value="free" label="Free" />
          <RadioButton value="pro" label="Pro" />
        </RadioGroup>
      </section>

      {/* Disabled group */}
      <section>
        <p style={headingStyle}>disabled group</p>
        <RadioGroup aria-label="Plan disabled" isDisabled defaultValue="free">
          <RadioButton value="free" label="Free" />
          <RadioButton value="pro" label="Pro" />
        </RadioGroup>
      </section>

      {/* RadioButtonBase standalone */}
      <section>
        <p style={headingStyle}>RadioButtonBase (standalone)</p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <RadioButtonBase />
          <RadioButtonBase isSelected />
          <RadioButtonBase isInvalid />
          <RadioButtonBase isDisabled />
          <RadioButtonBase isDisabled isSelected />
          <RadioButtonBase size="md" />
          <RadioButtonBase size="md" isSelected />
        </div>
      </section>
    </div>
  ),
};

const headingStyle: React.CSSProperties = {
  marginBottom: "0.75rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#9CA3AF",
};
