
import { ProgressBarCircle } from "./progress-circles";

import type { Meta, StoryObj } from "@storybook/react";

// ── ProgressBarCircle ─────────────────────────────────────────────────────────

const circleMeta = {
  title: "Base/Progress/ProgressBarCircle",
  component: ProgressBarCircle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Circular progress ring with a centered value label. " +
          "Supports 5 sizes (xxs–lg) and an optional sub-label. " +
          "For a fixed 64 px ring use `CircleProgressBar`.",
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
} satisfies Meta<typeof ProgressBarCircle>;

export default circleMeta;
type CircleStory = StoryObj<typeof circleMeta>;

// ── Individual size stories ───────────────────────────────────────────────────

export const Xxs: CircleStory = {
  name: "Size: xxs",
  args: { value: 65, size: "xxs", "aria-label": "Progress" },
};

export const Xs: CircleStory = {
  name: "Size: xs",
  args: { value: 65, size: "xs", "aria-label": "Progress" },
};

export const Sm: CircleStory = {
  name: "Size: sm",
  args: { value: 65, size: "sm", "aria-label": "Progress" },
};

export const Md: CircleStory = {
  name: "Size: md",
  args: { value: 65, size: "md", "aria-label": "Progress" },
};

export const Lg: CircleStory = {
  name: "Size: lg",
  args: { value: 65, size: "lg", "aria-label": "Progress" },
};

export const WithLabel: CircleStory = {
  args: { value: 65, size: "md", label: "Active users", "aria-label": "Active users" },
};

export const CustomRange: CircleStory = {
  name: "Custom range (3 of 10)",
  args: { value: 3, min: 0, max: 10, size: "md", label: "Steps", "aria-label": "Step 3 of 10" },
};

export const Empty: CircleStory = {
  args: { value: 0, size: "md", "aria-label": "No progress" },
};

export const Complete: CircleStory = {
  args: { value: 100, size: "md", "aria-label": "Complete" },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: CircleStory = {
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
            <ProgressBarCircle
              key={v}
              value={v}
              size={size}
              label={size !== "xxs" ? "Users" : undefined}
              aria-label={`${v}%`}
            />
          ))}
          <span style={{ fontSize: "0.75rem", color: "#9CA3AF", minWidth: "2rem" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
