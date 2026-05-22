import { type FC, type SVGProps } from "react";

import { Tooltip, TooltipTrigger } from "./tooltip";

import type { Meta, StoryObj } from "@storybook/react";

// ── Placeholder icons — replace with @maholan/icons when available ────────────

const InfoIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="8" cy="8" r="7" />
    <path d="M8 7v4M8 5.5v.5" />
  </svg>
);

const HelpCircleIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="8" cy="8" r="7" />
    <path d="M6 6a2 2 0 1 1 2 2v1M8 12v.5" />
  </svg>
);

const TrashIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M2 4h12M5.5 4V2.5A1.5 1.5 0 0 1 7 1h2a1.5 1.5 0 0 1 1.5 1.5V4M13 4l-.75 9A1.5 1.5 0 0 1 10.75 14.5H5.25A1.5 1.5 0 0 1 3.75 13L3 4" />
  </svg>
);

const SaveIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M13 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h8l3 3v8a1 1 0 0 1-1 1Z" />
    <path d="M11 14v-5H5v5M5 2v4h5V2" />
  </svg>
);

const SettingsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="8" cy="8" r="2" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tooltip> = {
  title: "Base/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible tooltip built on React Aria's `TooltipTrigger` + `Tooltip` primitives. " +
          "Wraps any focusable element as the trigger. Supports placement, optional description, " +
          "directional arrow, and enter/exit animations.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    arrow: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    delay: {
      control: "number",
      table: { defaultValue: { summary: "300" } },
    },
    placement: {
      control: "select",
      options: [
        "top",
        "top left",
        "top right",
        "bottom",
        "bottom left",
        "bottom right",
        "left",
        "left top",
        "left bottom",
        "right",
        "right top",
        "right bottom",
      ],
      table: { defaultValue: { summary: "top" } },
    },
    isDisabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "6rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Individual stories ───────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "More information",
    children: (
      <TooltipTrigger aria-label="More information">
        <InfoIcon />
      </TooltipTrigger>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    title: "Help",
    description: "This field is required. Enter at least 8 characters.",
    children: (
      <TooltipTrigger aria-label="Help">
        <HelpCircleIcon />
      </TooltipTrigger>
    ),
  },
};

export const WithArrow: Story = {
  args: {
    title: "Settings",
    arrow: true,
    children: (
      <TooltipTrigger aria-label="Settings">
        <SettingsIcon />
      </TooltipTrigger>
    ),
  },
};

export const WithArrowAndDescription: Story = {
  args: {
    title: "Delete item",
    description: "This action cannot be undone.",
    arrow: true,
    children: (
      <TooltipTrigger aria-label="Delete">
        <TrashIcon />
      </TooltipTrigger>
    ),
  },
};

export const PlacementBottom: Story = {
  args: {
    title: "Save changes",
    placement: "bottom",
    arrow: true,
    children: (
      <TooltipTrigger aria-label="Save">
        <SaveIcon />
      </TooltipTrigger>
    ),
  },
};

export const PlacementLeft: Story = {
  args: {
    title: "More information",
    placement: "left",
    arrow: true,
    children: (
      <TooltipTrigger aria-label="Info">
        <InfoIcon />
      </TooltipTrigger>
    ),
  },
};

export const PlacementRight: Story = {
  args: {
    title: "More information",
    placement: "right",
    arrow: true,
    children: (
      <TooltipTrigger aria-label="Info">
        <InfoIcon />
      </TooltipTrigger>
    ),
  },
};

export const WithTextTrigger: Story = {
  args: {
    title: "More information",
    children: <TooltipTrigger>Hover me</TooltipTrigger>,
  },
};

export const WithTextTriggerAndDescription: Story = {
  args: {
    title: "Help",
    description: "This field is required. Enter at least 8 characters.",
    arrow: true,
    children: <TooltipTrigger>Hover me</TooltipTrigger>,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled tooltip",
    isDisabled: true,
    children: (
      <TooltipTrigger aria-label="Info (disabled)">
        <InfoIcon />
      </TooltipTrigger>
    ),
  },
};

// ─── All placements showcase ──────────────────────────────────────────────────

type PlacementRow = {
  label: string;
  placement:
    | "top left"
    | "top"
    | "top right"
    | "left"
    | "right"
    | "bottom left"
    | "bottom"
    | "bottom right";
};

const PLACEMENTS: (PlacementRow | null)[] = [
  { label: "top-left", placement: "top left" },
  { label: "top", placement: "top" },
  { label: "top-right", placement: "top right" },
  { label: "left", placement: "left" },
  null, // center cell — visual reference
  { label: "right", placement: "right" },
  { label: "bottom-left", placement: "bottom left" },
  { label: "bottom", placement: "bottom" },
  { label: "bottom-right", placement: "bottom right" },
];

export const AllPlacements: Story = {
  name: "All placements",
  args: { title: "", children: null },
  parameters: { layout: "centered" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 8rem)",
        gridTemplateRows: "repeat(3, 8rem)",
        gap: "0",
        padding: "5rem",
      }}
    >
      {PLACEMENTS.map((item, i) =>
        item === null ? (
          // Center reference cell
          <div
            key="center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1.5px dashed var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-fg-tertiary)",
                fontSize: 10,
              }}
            >
              ●
            </div>
          </div>
        ) : (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
            }}
          >
            <Tooltip title={item.label} placement={item.placement} arrow defaultOpen delay={0}>
              <TooltipTrigger aria-label={`${item.label} placement example`}>
                <InfoIcon />
              </TooltipTrigger>
            </Tooltip>
            <span
              style={{
                fontSize: 10,
                color: "var(--color-fg-tertiary)",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
              }}
            >
              {item.label}
            </span>
          </div>
        )
      )}
    </div>
  ),
};

// ─── All states showcase ──────────────────────────────────────────────────────

// Column headers shared across both rows
const STATE_LABELS = [
  "title only",
  "with description",
  "with arrow",
  "arrow + description",
  "bottom",
  "disabled",
];

export const AllStates: Story = {
  name: "All states",
  args: { title: "", children: null },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "4rem" }}>
      {/* ── Column headers ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7rem repeat(6, 1fr)",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <span />
        {STATE_LABELS.map((label) => (
          <span
            key={label}
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "var(--color-fg-tertiary)",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* ── Icon trigger row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7rem repeat(6, 1fr)",
          gap: "2rem",
          alignItems: "end",
          justifyItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--color-fg-secondary)",
            fontFamily: "monospace",
            alignSelf: "center",
          }}
        >
          icon trigger
        </span>

        <Tooltip title="More info" defaultOpen delay={0}>
          <TooltipTrigger aria-label="Info">
            <InfoIcon />
          </TooltipTrigger>
        </Tooltip>

        <Tooltip title="Help" description="This field is required." defaultOpen delay={0}>
          <TooltipTrigger aria-label="Help">
            <HelpCircleIcon />
          </TooltipTrigger>
        </Tooltip>

        <Tooltip title="Settings" arrow defaultOpen delay={0}>
          <TooltipTrigger aria-label="Settings">
            <SettingsIcon />
          </TooltipTrigger>
        </Tooltip>

        <Tooltip
          title="Delete"
          description="This action cannot be undone."
          arrow
          defaultOpen
          delay={0}
        >
          <TooltipTrigger aria-label="Delete">
            <TrashIcon />
          </TooltipTrigger>
        </Tooltip>

        <Tooltip title="Save" placement="bottom" arrow defaultOpen delay={0}>
          <TooltipTrigger aria-label="Save">
            <SaveIcon />
          </TooltipTrigger>
        </Tooltip>

        <Tooltip title="Disabled" isDisabled>
          <TooltipTrigger aria-label="Info (disabled)" isDisabled>
            <InfoIcon style={{ opacity: 0.4 }} />
          </TooltipTrigger>
        </Tooltip>
      </div>

      {/* ── Text trigger row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7rem repeat(6, 1fr)",
          gap: "2rem",
          alignItems: "end",
          justifyItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--color-fg-secondary)",
            fontFamily: "monospace",
            alignSelf: "center",
          }}
        >
          text trigger
        </span>

        <Tooltip title="More info" defaultOpen delay={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>

        <Tooltip title="Help" description="This field is required." defaultOpen delay={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>

        <Tooltip title="Settings" arrow defaultOpen delay={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>

        <Tooltip
          title="Delete"
          description="This action cannot be undone."
          arrow
          defaultOpen
          delay={0}
        >
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>

        <Tooltip title="Save" placement="bottom" arrow defaultOpen delay={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>

        <Tooltip title="Disabled" isDisabled>
          <TooltipTrigger isDisabled style={{ opacity: 0.4 }}>
            Hover me
          </TooltipTrigger>
        </Tooltip>
      </div>
    </div>
  ),
};
