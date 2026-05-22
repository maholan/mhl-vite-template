import React from "react";

import { Slider } from "./slider";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible single and range slider built on React Aria. " +
          "Supports hidden, below-thumb, and floating tooltip value labels. " +
          "Full keyboard navigation and screen-reader support via React Aria.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: "2rem 1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    labelPosition: {
      control: "select",
      options: ["default", "bottom", "top-floating"],
      table: { defaultValue: { summary: "default" } },
    },
    isDisabled: { control: "boolean" },
    minValue: { control: "number" },
    maxValue: { control: "number" },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { defaultValue: 40 },
};

export const LabelBottom: Story = {
  name: "Label: bottom",
  args: { defaultValue: 40, labelPosition: "bottom" },
};

export const LabelTopFloating: Story = {
  name: "Label: top-floating",
  args: { defaultValue: 40, labelPosition: "top-floating" },
};

export const Range: Story = {
  name: "Range (two thumbs)",
  args: { defaultValue: [20, 70] },
};

export const RangeWithFloatingLabel: Story = {
  name: "Range + floating label",
  args: { defaultValue: [20, 70], labelPosition: "top-floating" },
};

export const CustomFormatter: Story = {
  name: "Custom label formatter",
  args: {
    defaultValue: 256,
    minValue: 0,
    maxValue: 1024,
    labelPosition: "bottom",
    labelFormatter: (v) => `${v} px`,
  },
};

export const Disabled: Story = {
  args: { defaultValue: 40, isDisabled: true },
};

// ── AllVariants showcase ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: 320 }}>
      <section>
        <p style={labelStyle}>default (hidden label)</p>
        <Slider defaultValue={40} />
      </section>

      <section>
        <p style={labelStyle}>label: bottom</p>
        <Slider defaultValue={40} labelPosition="bottom" />
      </section>

      <section>
        <p style={labelStyle}>label: top-floating</p>
        <Slider defaultValue={40} labelPosition="top-floating" />
      </section>

      <section>
        <p style={labelStyle}>range (two thumbs)</p>
        <Slider defaultValue={[20, 70]} />
      </section>

      <section>
        <p style={labelStyle}>range + top-floating</p>
        <Slider defaultValue={[20, 70]} labelPosition="top-floating" />
      </section>

      <section>
        <p style={labelStyle}>custom formatter (px)</p>
        <Slider
          defaultValue={256}
          minValue={0}
          maxValue={1024}
          labelPosition="bottom"
          labelFormatter={(v) => `${v} px`}
        />
      </section>

      <section>
        <p style={labelStyle}>disabled</p>
        <Slider defaultValue={40} isDisabled />
      </section>
    </div>
  ),
};

const labelStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#9CA3AF",
};
