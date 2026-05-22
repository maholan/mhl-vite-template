
import { ProgressBarHalfCircle } from "./progress-circles";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Progress/ProgressBarHalfCircle",
  component: ProgressBarHalfCircle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Half-circle (semicircle) progress indicator with a bottom-anchored value label. " +
          "Supports 5 sizes (xxs–lg) and an optional sub-label. " +
          "For a full ring use `ProgressBarCircle`.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: "select", options: ["xxs", "xs", "sm", "md", "lg"] },
    label: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof ProgressBarHalfCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual size stories ───────────────────────────────────────────────────

export const Xxs: Story = {
  name: "Size: xxs",
  args: { value: 65, size: "xxs", "aria-label": "Progress" },
};

export const Xs: Story = {
  name: "Size: xs",
  args: { value: 65, size: "xs", "aria-label": "Progress" },
};

export const Sm: Story = {
  name: "Size: sm",
  args: { value: 65, size: "sm", "aria-label": "Progress" },
};

export const Md: Story = {
  name: "Size: md",
  args: { value: 65, size: "md", "aria-label": "Progress" },
};

export const Lg: Story = {
  name: "Size: lg",
  args: { value: 65, size: "lg", "aria-label": "Progress" },
};

export const WithLabel: Story = {
  args: { value: 65, size: "md", label: "CPU usage", "aria-label": "CPU usage" },
};

export const CustomRange: Story = {
  name: "Custom range (3 of 10)",
  args: { value: 3, min: 0, max: 10, size: "md", label: "Steps", "aria-label": "Step 3 of 10" },
};

export const Empty: Story = {
  args: { value: 0, size: "md", "aria-label": "No progress" },
};

export const Complete: Story = {
  args: { value: 100, size: "md", "aria-label": "Complete" },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  args: { value: 0, size: "xxs" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(["xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}
        >
          {[0, 25, 50, 75, 100].map((v) => (
            <ProgressBarHalfCircle
              key={v}
              value={v}
              size={size}
              label={size !== "xxs" ? "Usage" : undefined}
              aria-label={`${v}%`}
            />
          ))}
          <span style={{ fontSize: "0.75rem", color: "#9CA3AF", minWidth: "2rem" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
