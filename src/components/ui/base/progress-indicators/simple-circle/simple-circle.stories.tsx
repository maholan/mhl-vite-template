
import { CircleProgressBar } from "./simple-circle";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Progress/SimpleCircle",
  component: CircleProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compact 64 px circular progress indicator with a centered percentage label. " +
          "For a multi-size variant with sub-labels use `ProgressBarCircle`.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    min: { control: "number" },
    max: { control: "number" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof CircleProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { value: 40, "aria-label": "Progress" },
};

export const Empty: Story = {
  args: { value: 0, "aria-label": "No progress" },
};

export const Half: Story = {
  args: { value: 50, "aria-label": "Half complete" },
};

export const Complete: Story = {
  args: { value: 100, "aria-label": "Complete" },
};

export const CustomRange: Story = {
  name: "Custom range (3 of 10)",
  args: { value: 3, min: 0, max: 10, "aria-label": "Step 3 of 10" },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  args: { value: 0 },
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div
          key={v}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <CircleProgressBar value={v} aria-label={`${v}%`} />
          <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{v}%</span>
        </div>
      ))}
    </div>
  ),
};
