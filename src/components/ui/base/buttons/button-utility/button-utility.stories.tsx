import { type FC, type SVGProps } from "react";

import { ButtonUtility } from "./button-utility";

import type { Meta, StoryObj } from "@storybook/react";

// ── Placeholder icons — replace with @maholan/icons when available ────────────────

const CopyIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3 11H2.5A1.5 1.5 0 0 1 1 9.5v-7A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5V3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EditIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path
      d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13l-4 1 1-4L11.5 2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path
      d="M2 4h12M5.5 4V2.5A1.5 1.5 0 0 1 7 1h2a1.5 1.5 0 0 1 1.5 1.5V4M13 4l-.75 9A1.5 1.5 0 0 1 10.75 14.5H5.25A1.5 1.5 0 0 1 3.75 13L3 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Buttons/ButtonUtility",
  component: ButtonUtility,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Small icon-only utility button built on React Aria.",
          "",
          "Renders any icon component or `ReactNode` passed to the `icon` prop.",
          "Supports `xs` / `sm` sizes and `secondary` / `tertiary` color variants.",
          "",
          "**Tooltip:** The `tooltip` and `tooltipPlacement` props are scaffolded and will activate",
          "once the `Tooltip` component is built. Currently the `tooltip` value is used as `aria-label`.",
          "",
          "Renders as `<button>` by default; renders as `<a>` when `href` is provided.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    color: {
      control: "radio",
      options: ["secondary", "tertiary"],
      description: "Visual color variant.",
      table: { defaultValue: { summary: "secondary" } },
    },
    size: {
      control: "radio",
      options: ["xs", "sm"],
      description: "Controls the button and icon dimensions.",
      table: { defaultValue: { summary: "sm" } },
    },
    tooltip: {
      control: "text",
      description:
        "Tooltip text shown on hover. Used as `aria-label` until the Tooltip component is available.",
    },
    isDisabled: {
      control: "boolean",
      description: "Disables all interactions.",
    },
    icon: { control: false },
  },
} satisfies Meta<typeof ButtonUtility>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Color variants ────────────────────────────────────────────────────────────

export const Secondary: Story = {
  args: { icon: CopyIcon, size: "sm", color: "secondary", tooltip: "Copy" },
};

export const Tertiary: Story = {
  args: { icon: CopyIcon, size: "sm", color: "tertiary", tooltip: "Copy" },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const UtilitySizeSm: Story = {
  name: "Size sm (36 px)",
  args: { icon: CopyIcon, size: "sm", tooltip: "Copy" },
};

export const UtilitySizeXs: Story = {
  name: "Size xs (28 px)",
  args: { icon: CopyIcon, size: "xs", tooltip: "Copy" },
};

// ── States ────────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { icon: CopyIcon, size: "sm", isDisabled: true },
};

export const AsLink: Story = {
  name: "Renders as <a>",
  args: { icon: CopyIcon, size: "sm", tooltip: "Open link", href: "#" } as Story["args"],
};

// ── Showcase ──────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", minWidth: 320 }}>
      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Secondary — sm / xs
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <ButtonUtility icon={CopyIcon} size="sm" color="secondary" tooltip="Copy (sm)" />
          <ButtonUtility icon={EditIcon} size="sm" color="secondary" tooltip="Edit (sm)" />
          <ButtonUtility icon={TrashIcon} size="sm" color="secondary" tooltip="Delete (sm)" />
          <ButtonUtility icon={CopyIcon} size="xs" color="secondary" tooltip="Copy (xs)" />
          <ButtonUtility icon={EditIcon} size="xs" color="secondary" tooltip="Edit (xs)" />
        </div>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Tertiary — sm / xs
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <ButtonUtility icon={CopyIcon} size="sm" color="tertiary" tooltip="Copy (sm)" />
          <ButtonUtility icon={EditIcon} size="sm" color="tertiary" tooltip="Edit (sm)" />
          <ButtonUtility icon={TrashIcon} size="sm" color="tertiary" tooltip="Delete (sm)" />
          <ButtonUtility icon={CopyIcon} size="xs" color="tertiary" tooltip="Copy (xs)" />
          <ButtonUtility icon={EditIcon} size="xs" color="tertiary" tooltip="Edit (xs)" />
        </div>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            opacity: 0.5,
          }}
        >
          Disabled
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <ButtonUtility icon={CopyIcon} size="sm" color="secondary" isDisabled tooltip="Copy" />
          <ButtonUtility icon={CopyIcon} size="sm" color="tertiary" isDisabled tooltip="Copy" />
        </div>
      </section>
    </div>
  ),
};
