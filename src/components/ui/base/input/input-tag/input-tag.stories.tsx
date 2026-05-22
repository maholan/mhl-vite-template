"use client";

import { useState, type JSX } from "react";

import { InputTags, type InputTagsProps } from "./input-tag";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputTags> = {
  title: "Base/Inputs/InputTags",
  component: InputTags,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Inline tag input — users type and press Enter to create removable tag chips directly " +
          "inside the field. Supports controlled and uncontrolled modes, validation, duplicate " +
          "prevention, and a maximum tag count. Keyboard: Enter to add, Backspace/ArrowLeft to " +
          "focus last tag, ArrowRight to return to the input.",
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
    placeholder: { control: "text" },
    isDisabled: { control: "boolean" },
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
    allowDuplicates: { control: "boolean" },
    maxTags: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Controlled wrapper ────────────────────────────────────────────────────────

const ControlledDemo = ({
  initialTags = [],
  ...props
}: InputTagsProps & { initialTags?: string[] }): JSX.Element => {
  const [tags, setTags] = useState<string[]>(initialTags);
  return <InputTags {...props} value={tags} onChange={setTags} />;
};

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Empty field — type a value and press Enter. */
export const Default: Story = {
  args: { placeholder: "Add tag…" },
  render: (args) => <InputTags defaultValue={[]} {...args} />,
};

/** Label + hint displayed around the field. */
export const WithLabelAndHint: Story = {
  args: {
    label: "Topics",
    hint: "Press Enter to add a tag.",
    placeholder: "Add topic…",
  },
  render: (args) => <InputTags defaultValue={[]} {...args} />,
};

/** Pre-populated tags on mount (uncontrolled). */
export const WithPreselectedTags: Story = {
  args: { label: "Tags", placeholder: "Add tag…" },
  render: (args) => <InputTags {...args} defaultValue={["React", "TypeScript", "Design"]} />,
};

/** Controlled mode — parent owns the tag array. */
export const Controlled: Story = {
  args: { label: "Recipients", placeholder: "Add email…" },
  render: (args) => <ControlledDemo {...args} initialTags={["alice@example.com"]} />,
};

/** Field is disabled — tags are visible but not interactive. */
export const Disabled: Story = {
  args: { label: "Tags", isDisabled: true },
  render: (args) => <InputTags {...args} defaultValue={["React", "TypeScript"]} />,
};

/** Invalid / error state with error hint text. */
export const Invalid: Story = {
  args: {
    label: "Tags",
    hint: "At least one tag is required.",
    isInvalid: true,
    placeholder: "Add tag…",
  },
  render: (args) => <InputTags defaultValue={[]} {...args} />,
};

/** Tooltip help icon visible in the trailing slot. */
export const WithTooltip: Story = {
  args: {
    label: "Tags",
    placeholder: "Add tag…",
    tooltip: "Tags help categorise your content.",
  },
  render: (args) => <InputTags defaultValue={[]} {...args} />,
};

/** Duplicate tags are rejected. */
export const NoDuplicates: Story = {
  args: { label: "Tags", placeholder: 'Try adding "React" again…', allowDuplicates: false },
  render: (args) => <InputTags {...args} defaultValue={["React"]} />,
};

/** At most 3 tags — new tags are silently rejected once the limit is reached. */
export const MaxTags: Story = {
  args: { label: "Tags (max 3)", placeholder: "Add tag…", maxTags: 3 },
  render: (args) => <InputTags {...args} defaultValue={["One", "Two"]} />,
};

/** Only allows values containing "@" (basic email check). */
export const WithValidation: Story = {
  args: {
    label: "Email recipients",
    hint: "Only valid email addresses are accepted.",
    placeholder: "Add email…",
    validate: (v: string) => v.includes("@"),
  },
  render: (args) => <InputTags defaultValue={[]} {...args} />,
};

// ─── Size comparison ──────────────────────────────────────────────────────────

export const SizeSm: Story = {
  args: { size: "sm", label: "Size sm", placeholder: "Add tag…" },
  render: (args) => <InputTags {...args} defaultValue={["React"]} />,
};

export const SizeMd: Story = {
  args: { size: "md", label: "Size md", placeholder: "Add tag…" },
  render: (args) => <InputTags {...args} defaultValue={["React"]} />,
};

export const SizeLg: Story = {
  args: { size: "lg", label: "Size lg", placeholder: "Add tag…" },
  render: (args) => <InputTags {...args} defaultValue={["React"]} />,
};

// ─── All states showcase ──────────────────────────────────────────────────────

/** Full showcase — all states and configurations. */
export const AllStates: Story = {
  name: "All states",
  args: { placeholder: "" },
  render: (): JSX.Element => (
    <div className="flex w-96 flex-col gap-6">
      <InputTags label="Default (empty)" placeholder="Add tag…" defaultValue={[]} />

      <InputTags
        label="With tags"
        placeholder="Add tag…"
        defaultValue={["React", "TypeScript", "Design"]}
      />

      <InputTags
        label="Required"
        placeholder="Add tag…"
        isRequired
        hint="This field is required."
        defaultValue={[]}
      />

      <InputTags
        label="With hint"
        hint="Press Enter to add a tag."
        placeholder="Add tag…"
        defaultValue={[]}
      />

      <InputTags
        label="Invalid"
        isInvalid
        hint="At least one tag is required."
        placeholder="Add tag…"
        defaultValue={[]}
      />

      <InputTags
        label="Disabled"
        isDisabled
        defaultValue={["React", "TypeScript"]}
        placeholder="Add tag…"
      />

      <InputTags
        label="With tooltip"
        tooltip="Tags help categorise your content."
        placeholder="Add tag…"
        defaultValue={[]}
      />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Sizes</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <InputTags
            key={size}
            size={size}
            label={`Size: ${size}`}
            placeholder="Add tag…"
            defaultValue={["React"]}
          />
        ))}
      </div>
    </div>
  ),
};
