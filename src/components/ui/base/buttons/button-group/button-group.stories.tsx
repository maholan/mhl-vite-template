import { ButtonGroup, ButtonGroupItem } from "./button-group";

import type { Meta, StoryObj } from "@storybook/react";

// Minimal inline icons for stories — no icon library dependency
const BoldIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 12h8a4 4 0 0 0 0-8H6v8Zm0 0h9a4 4 0 0 1 0 8H6v-8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ItalicIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M19 4h-9M14 20H5M15 4 9 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UnderlineIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 4v6a6 6 0 0 0 12 0V4M4 20h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M19 12H5M5 12l7 7M5 12l7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: "Base/Buttons/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Segmented button group built on React Aria's ToggleButtonGroup. " +
          "Supports single and multiple selection, three sizes (sm/md/lg), " +
          "text-only, icon-leading, and icon-only item variants.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    selectionMode: {
      control: "select",
      options: ["single", "multiple"],
      table: { defaultValue: { summary: "single" } },
    },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Text only ────────────────────────────────────────────────────────────────

export const TextOnly: Story = {
  name: "Text only",
  args: { size: "md" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="day">Day</ButtonGroupItem>
      <ButtonGroupItem id="week">Week</ButtonGroupItem>
      <ButtonGroupItem id="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

// ─── Icon leading ─────────────────────────────────────────────────────────────

export const IconLeading: Story = {
  name: "Icon leading",
  args: { size: "md" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="bold" iconLeading={BoldIcon}>
        Bold
      </ButtonGroupItem>
      <ButtonGroupItem id="italic" iconLeading={ItalicIcon}>
        Italic
      </ButtonGroupItem>
      <ButtonGroupItem id="underline" iconLeading={UnderlineIcon}>
        Underline
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

// ─── Icon only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: "Icon only",
  args: { size: "md" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="prev" iconLeading={ArrowLeft} aria-label="Previous" />
      <ButtonGroupItem id="next" iconLeading={ArrowRight} aria-label="Next" />
    </ButtonGroup>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: "All sizes",
  args: { size: "md" },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ButtonGroup key={size} size={size}>
          <ButtonGroupItem id="day">Day</ButtonGroupItem>
          <ButtonGroupItem id="week">Week</ButtonGroupItem>
          <ButtonGroupItem id="month">Month</ButtonGroupItem>
        </ButtonGroup>
      ))}
    </div>
  ),
};

export const AllSizesIconLeading: Story = {
  name: "All sizes — icon leading",
  args: { size: "md" },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ButtonGroup key={size} size={size}>
          <ButtonGroupItem id="bold" iconLeading={BoldIcon}>
            Bold
          </ButtonGroupItem>
          <ButtonGroupItem id="italic" iconLeading={ItalicIcon}>
            Italic
          </ButtonGroupItem>
          <ButtonGroupItem id="underline" iconLeading={UnderlineIcon}>
            Underline
          </ButtonGroupItem>
        </ButtonGroup>
      ))}
    </div>
  ),
};

export const AllSizesIconOnly: Story = {
  name: "All sizes — icon only",
  args: { size: "md" },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ButtonGroup key={size} size={size}>
          <ButtonGroupItem id="prev" iconLeading={ArrowLeft} aria-label="Previous" />
          <ButtonGroupItem id="next" iconLeading={ArrowRight} aria-label="Next" />
        </ButtonGroup>
      ))}
    </div>
  ),
};

// ─── Selection modes ──────────────────────────────────────────────────────────

export const MultipleSelection: Story = {
  name: "Multiple selection",
  args: { size: "md", selectionMode: "multiple" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="bold" iconLeading={BoldIcon}>
        Bold
      </ButtonGroupItem>
      <ButtonGroupItem id="italic" iconLeading={ItalicIcon}>
        Italic
      </ButtonGroupItem>
      <ButtonGroupItem id="underline" iconLeading={UnderlineIcon}>
        Underline
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

// ─── With disabled items ──────────────────────────────────────────────────────

export const WithDisabledItem: Story = {
  name: "With disabled item",
  args: { size: "md" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="day">Day</ButtonGroupItem>
      <ButtonGroupItem id="week" isDisabled>
        Week
      </ButtonGroupItem>
      <ButtonGroupItem id="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const FullyDisabled: Story = {
  name: "Fully disabled",
  args: { size: "md", isDisabled: true },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="day">Day</ButtonGroupItem>
      <ButtonGroupItem id="week">Week</ButtonGroupItem>
      <ButtonGroupItem id="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { size: "md" },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Text only</p>
        <div className="flex flex-col items-start gap-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <ButtonGroup key={size} size={size}>
              <ButtonGroupItem id="day">Day</ButtonGroupItem>
              <ButtonGroupItem id="week">Week</ButtonGroupItem>
              <ButtonGroupItem id="month">Month</ButtonGroupItem>
            </ButtonGroup>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Icon leading</p>
        <div className="flex flex-col items-start gap-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <ButtonGroup key={size} size={size}>
              <ButtonGroupItem id="bold" iconLeading={BoldIcon}>
                Bold
              </ButtonGroupItem>
              <ButtonGroupItem id="italic" iconLeading={ItalicIcon}>
                Italic
              </ButtonGroupItem>
              <ButtonGroupItem id="underline" iconLeading={UnderlineIcon}>
                Underline
              </ButtonGroupItem>
            </ButtonGroup>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Icon only</p>
        <div className="flex flex-col items-start gap-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <ButtonGroup key={size} size={size}>
              <ButtonGroupItem id="prev" iconLeading={ArrowLeft} aria-label="Previous" />
              <ButtonGroupItem id="next" iconLeading={ArrowRight} aria-label="Next" />
            </ButtonGroup>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Multiple selection</p>
        <ButtonGroup size="md" selectionMode="multiple">
          <ButtonGroupItem id="bold" iconLeading={BoldIcon}>
            Bold
          </ButtonGroupItem>
          <ButtonGroupItem id="italic" iconLeading={ItalicIcon}>
            Italic
          </ButtonGroupItem>
          <ButtonGroupItem id="underline" iconLeading={UnderlineIcon}>
            Underline
          </ButtonGroupItem>
        </ButtonGroup>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Disabled</p>
        <ButtonGroup size="md" isDisabled>
          <ButtonGroupItem id="day">Day</ButtonGroupItem>
          <ButtonGroupItem id="week">Week</ButtonGroupItem>
          <ButtonGroupItem id="month">Month</ButtonGroupItem>
        </ButtonGroup>
      </section>
    </div>
  ),
};
