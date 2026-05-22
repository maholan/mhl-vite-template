
import { ProgressBar, ProgressBarBase } from "./progress-indicator";

import type { Meta, StoryObj } from "@storybook/react";

// ── ProgressBar ───────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Progress/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Horizontal progress bar with configurable label placement. " +
          "Use `ProgressBarBase` for the bare track without a label.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    min: { control: "number" },
    max: { control: "number" },
    labelPosition: {
      control: "select",
      options: [undefined, "right", "bottom", "top-floating", "bottom-floating"],
    },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Label position stories ────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: "No label (default)",
  args: { value: 40, "aria-label": "Progress" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelRight: Story = {
  name: "Label: right",
  args: { value: 40, labelPosition: "right", "aria-label": "Progress" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelBottom: Story = {
  name: "Label: bottom",
  args: { value: 40, labelPosition: "bottom", "aria-label": "Progress" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelTopFloating: Story = {
  name: "Label: top-floating",
  args: { value: 40, labelPosition: "top-floating", "aria-label": "Progress" },
  decorators: [
    (Story) => (
      <div style={{ width: 320, paddingTop: "3rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelBottomFloating: Story = {
  name: "Label: bottom-floating",
  args: { value: 40, labelPosition: "bottom-floating", "aria-label": "Progress" },
  decorators: [
    (Story) => (
      <div style={{ width: 320, paddingBottom: "3rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: { value: 0, labelPosition: "right", "aria-label": "No progress" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Complete: Story = {
  args: { value: 100, labelPosition: "right", "aria-label": "Complete" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomRange: Story = {
  name: "Custom range (3 of 10)",
  args: { value: 3, min: 0, max: 10, labelPosition: "right", "aria-label": "Step 3 of 10" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomFormatter: Story = {
  name: "Custom formatter",
  args: {
    value: 3,
    min: 0,
    max: 10,
    labelPosition: "right",
    "aria-label": "Steps",
    valueFormatter: (v: number) => `${v} / 10 steps`,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  args: { value: 0 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: 320 }}>
      {(["right", "bottom", "top-floating", "bottom-floating"] as const).map((pos) => (
        <div
          key={pos}
          style={{
            paddingTop: pos === "top-floating" ? "2.5rem" : 0,
            paddingBottom: pos === "bottom-floating" ? "2.5rem" : 0,
          }}
        >
          <ProgressBar value={65} labelPosition={pos} aria-label={`${pos} label`} />
        </div>
      ))}
      <ProgressBarBase value={65} aria-label="Bare track" />
    </div>
  ),
};
