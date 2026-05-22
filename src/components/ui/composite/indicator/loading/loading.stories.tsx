import { Loading } from "./loading";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Composite/Indicator/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loading indicator with three visual styles (line-simple, line-spinner, dot-circle) and four sizes. " +
          "Purely presentational — no interactive state.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["line-simple", "line-spinner", "dot-circle"],
      table: { defaultValue: { summary: "line-simple" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      table: { defaultValue: { summary: "sm" } },
    },
    label: { control: "text" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Loading…" },
};

export const LineSimple: Story = {
  args: { type: "line-simple" },
};

export const LineSpinner: Story = {
  args: { type: "line-spinner" },
};

export const DotCircle: Story = {
  args: { type: "dot-circle" },
};

export const SizeSmall: Story = {
  name: "Size — sm",
  args: { size: "sm", label: "Loading…" },
};

export const SizeMedium: Story = {
  name: "Size — md",
  args: { size: "md", label: "Loading…" },
};

export const SizeLarge: Story = {
  name: "Size — lg",
  args: { size: "lg", label: "Loading…" },
};

export const SizeXL: Story = {
  name: "Size — xl",
  args: { size: "xl", label: "Loading…" },
};

export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => (
    <div className="flex flex-col gap-12">
      {/* Types */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary">Types</p>
        <div className="flex items-center gap-10">
          <Loading type="line-simple" label="line-simple" />
          <Loading type="line-spinner" label="line-spinner" />
          <Loading type="dot-circle" label="dot-circle" />
        </div>
      </div>

      {/* Sizes × line-simple */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary">Sizes (line-simple)</p>
        <div className="flex items-end gap-10">
          <Loading size="sm" label="sm" />
          <Loading size="md" label="md" />
          <Loading size="lg" label="lg" />
          <Loading size="xl" label="xl" />
        </div>
      </div>

      {/* Sizes × dot-circle */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary">Sizes (dot-circle)</p>
        <div className="flex items-end gap-10">
          <Loading type="dot-circle" size="sm" label="sm" />
          <Loading type="dot-circle" size="md" label="md" />
          <Loading type="dot-circle" size="lg" label="lg" />
          <Loading type="dot-circle" size="xl" label="xl" />
        </div>
      </div>

      {/* Without label */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary">
          Without label (sr-only accessible text)
        </p>
        <div className="flex items-center gap-10">
          <Loading type="line-simple" />
          <Loading type="line-spinner" />
          <Loading type="dot-circle" />
        </div>
      </div>
    </div>
  ),
};
