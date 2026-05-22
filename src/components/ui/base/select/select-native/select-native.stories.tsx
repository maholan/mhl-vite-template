import { NativeSelect } from "./select-native";

import type { Meta, StoryObj } from "@storybook/react";

const options = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de", disabled: true },
];

const meta: Meta<typeof NativeSelect> = {
  title: "Base/Selects/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Native HTML select element with MHL styling. Useful for mobile-native UX or when React Aria's ComboBox is overkill. Supports label, hint, and size variants.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    label: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { options },
};

export const WithLabel: Story = {
  args: { label: "Country", options },
};

export const WithHint: Story = {
  args: { label: "Country", hint: "Select your country of residence.", options },
};

export const Disabled: Story = {
  args: { label: "Country", options, disabled: true },
};

export const SizeSm: Story = {
  args: { label: "Country", size: "sm", options },
};

export const SizeLg: Story = {
  args: { label: "Country", size: "lg", options },
};

export const AllStates: Story = {
  name: "All states",
  args: { options },
  render: () => (
    <div className="flex flex-col gap-6 w-72">
      <NativeSelect options={options} />
      <NativeSelect label="With label" options={options} />
      <NativeSelect label="With hint" hint="Helpful text below." options={options} />
      <NativeSelect label="Disabled" options={options} disabled />
      <div className="flex gap-2">
        {(["sm", "md", "lg"] as const).map((size) => (
          <NativeSelect key={size} size={size} options={options} />
        ))}
      </div>
    </div>
  ),
};
